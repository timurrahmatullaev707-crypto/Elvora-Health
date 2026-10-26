// Vercel Serverless Function: /api/chat
// Elvora AI™ Advanced Clinical Intelligence Engine
// Supports Gemini API, OpenAI API, and Natural Multilingual Healthcare Reasoning

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, limit = 40, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) {
    return false;
  }
  entry.count += 1;
  return true;
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Only POST is accepted.' });
  }

  // Rate Limiting by IP
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
  if (!checkRateLimit(String(clientIp))) {
    return res.status(429).json({
      error: 'Rate limit oshib ketdi. Iltimos, 1 daqiqadan so\'ng qayta urinib ko\'ring.',
    });
  }

  try {
    const { message, history, clinicContext, patientConsent = true, language = 'uz' } = req.body || {};
    // Track patient consent and language preference
    const _sessionMeta = { patientConsent, language };
    if (!_sessionMeta.patientConsent) {
      // Keep consent awareness
    }

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Xabar matni talab qilinadi.' });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    // Build comprehensive, verified clinic facts
    const clinicName = clinicContext?.clinicName || 'Elvora Health';
    const clinicAddress = clinicContext?.address || 'Toshkent sh., Bunyodkor shox ko\'chasi, 42-uy';
    const clinicPhone = clinicContext?.phone || '+998 71 200 45 45';
    const workingHours = clinicContext?.workingHours || '08:00 - 20:00';
    const workingDays = clinicContext?.workingDays || 'Dushanba - Shanba';
    const activeDoctorsList = JSON.stringify(clinicContext?.activeDoctors || [], null, 2);
    const servicesList = JSON.stringify(clinicContext?.servicesList || [], null, 2);

    const systemPrompt = `Siz "Elvora Health" zamonaviy tibbiyot platformasining sertifikatlangan, nihoyatda bilimdon, muloyim va professional sun'iy intellekt yordamchisisiz (Elvora AI™).

SIZNING ASOSIY VAZIFALARINGIZ VA TAMOYILLARINGIZ:
1. TABIIY VA INTELLEKTUAL MULOQOT:
   - Foydalanuvchi qaysi tilda yozsa, o'sha tilda (O'zbek, Rus yoki Ingliz) ravon, boy lug'at bilan, hurmat bilan javob bering. Asosiy til — O'zbek tili.
   - Quruq shablonlardan qoching. Bemorga samimiy g'amxo'rlik ko'rsating.
   - Bemor holatini chuqur tushunish uchun kerak bo'lsa o'rinli 1-2 ta aniqlashtiruvchi savol bering (masalan: "Bu og'riq qachon boshlandi?", "Tana haroratingizni o'lchadingizmi?").

2. TIBBIY XAVFSIZLIK VA PROTOKOLLAR (QAT'IY QOIDALAR):
   - HECH QACHON qat'iy tashxis qo'ymang. Bemorga "Sizda falon kasallik" demang, balki "Katta ehtimol bilan ... alomatlari bo'lishi mumkin" deb tushuntiring.
   - HECH QACHON retseptli dorilarni, ayniqsa ANTIBIOTIKLAR va GORMONAL vositalarni yozmang va tavsiya qilmang! Faqat uy sharoitidagi xavfsiz birinchi yordam choralarini (iliq suyuqlik, dam olish, tuzli g'arg'ara, 38.5°C dan yuqori isitmada paratsetamol/ibuprofen) aytishingiz mumkin.
   - HAR BIR javobda sun'iy intellekt maslahati malakali shifokor ko'rigi o'rnini bosa olmasligini muloyim eslatib turing.

3. FAVQULODDA HOLATLAR (RED-FLAG TRIAGE):
   - Agar bemor o'tkir yurak/ko'krak og'rig'i, nafas yetishmovchiligi, insult belgilari (yuz qiyshayishi, til aylanmasligi, bir tomonlama zaiflik), to'xtovsiz qon ketishi yoki hushdan ketishni bildirsa — zudlik bilan "103 TEZ TIBBIY YORDAM" chaqirishni qat'iy buyuring va 1-yordam qoidasini bering!

4. HAQIQIY KLINIKA BAZASI BILAN ISHLASH (YOLG'ON VA TO'QIMA MA'LUMOT TAQIQLANADI):
   - Faqat quyida berilgan real klinika faktlaridan foydalaning. Shifokorlar va vaqtlarni aslo to'qimang!
   - Klinika nomi: ${clinicName}
   - Manzil: ${clinicAddress}
   - Telefon: ${clinicPhone}
   - Ish tartibi: ${workingHours}, ${workingDays}
   - Haqiqiy faol shifokorlar:
${activeDoctorsList}
   - Narxlar va xizmatlar:
${servicesList}

5. MUTAXASSIS TAVSIYASI VA QABULGA YOZISH:
   - Bemor shikoyatiga ko'ra mos mutaxassislikni (Kardiolog, Terapevt, Nevropatolog, Pediatr, Jarroh, LOR, Ginekolog, Oftalmolog, Urolog, Dermatolog, Endokrinolog, Gastroenterolog, Stomatolog) aniqlang va nega aynan shu mutaxassis zarurligini sodda tilda tushuntiring.
   - Bazadagi mos shifokorning ismi, mutaxassisligi, xonasi va ko'rik narxini ko'rsating.
   - Bemorga sayt orqali to'g'ridan-to'g'ri qabulga yozilish yoki Telegram orqali chipta olish imkoniyati borligini bildiring.`;

    // 1. Google Gemini Integration
    if (geminiKey) {
      // Use modern Gemini endpoint
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

      const contents = [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'Tushundim. Men Elvora AI™ — Elvora Health klinikasining sertifikatlangan, tibbiy xavfsiz va aqlli yordamchisiman. Bemorlar bilan ravon, muloyim va klinik protokollar asosida muloqot qilaman.' }],
        },
        ...(history || []).slice(-8).map((h: any) => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }],
        })),
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ];

      const aiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.35,
            topP: 0.9,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (aiResponse.ok) {
        const geminiData = (await aiResponse.json()) as any;
        const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return res.status(200).json({
            isDemo: false,
            provider: 'gemini',
            reply,
          });
        }
      }
    }

    // 2. OpenAI Integration
    if (openAiKey) {
      const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...(history || []).slice(-8).map((h: any) => ({ role: h.role, content: h.content })),
            { role: 'user', content: message },
          ],
          temperature: 0.35,
          max_tokens: 1000,
        }),
      });

      if (openAiResponse.ok) {
        const openAiData = (await openAiResponse.json()) as any;
        const reply = openAiData.choices?.[0]?.message?.content;
        if (reply) {
          return res.status(200).json({
            isDemo: false,
            provider: 'openai',
            reply,
          });
        }
      }
    }

    // 3. Fallback when keys are not configured
    return res.status(200).json({
      isDemo: true,
      reply: null,
      status: 'demo_mode',
      note: 'Tashqi AI API kaliti (.env) o\'rnatilmagan. Elvora Avtonom Klinik Dvigateli faollashdi.',
    });
  } catch (err: any) {
    console.error('AI API Handler Error:', err.message);
    return res.status(200).json({
      isDemo: true,
      reply: null,
      error: 'Tashqi AI xizmatiga ulanib bo\'lmadi. Avtonom klinik dvigatel ishga tushdi.',
    });
  }
}
