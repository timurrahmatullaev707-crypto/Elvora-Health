// Vercel Serverless Function: /api/chat
// Supports Google Gemini API, OpenAI API, and graceful Autonomous Fallback

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, limit = 30, windowMs = 60000): boolean {
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
    const { message, history, clinicContext } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Xabar matni talab qilinadi.' });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    // If no external API key is configured, return flag to use local hybrid clinical model
    if (!geminiKey && !openAiKey) {
      return res.status(200).json({
        isDemo: true,
        reply: null,
        status: 'demo_mode',
        note: 'Tashqi AI API kaliti (.env) o\'rnatilmagan. Elvora Avtonom Klinik Dvigateli faollashdi.',
      });
    }

    const systemPrompt = `Siz "Elvora Health" zamonaviy tibbiyot platformasining sertifikatlangan, muloyim va professional sun'iy intellekt yordamchisisiz (Elvora AI™).
MUHIM QOIDALAR:
1. Til: Barcha javoblaringizni faqat ravon, imloviy to'g'ri o'zbek tilida taqdim eting.
2. Tibbiy xavfsizlik: Hech qachon qat'iy tashxis qo'ymang. Hech qachon dori-darmonlar va ularning dozalarini yozmang.
3. Shifokor o'rnini bosmaslik: Bemorga har doim ushbu maslahatlar dastlabki tavsiya ekanligini va yakuniy xulosani faqat malakali shifokor ko'rigi berishini eslatib turing.
4. Favqulodda holatlar: Agar bemor o'tkir ko'krak og'rig'i, nafas yetishmovchiligi, qon ketishi yoki insult belgilarini bildirsa, zudlik bilan 103 Tez yordam chaqirishni buyuring!
5. Klinika ma'lumotlari: Faqat quyida taqdim etilgan klinika faktlaridan foydalaning:
Klinika nomi: ${clinicContext?.clinicName || 'Elvora Health'}
Manzil: ${clinicContext?.address || 'Toshkent sh., Chilonzor tumani, Bunyodkor shox ko\'chasi, 42-uy'}
Telefon: ${clinicContext?.phone || '+998 71 200 45 45'}
Ish tartibi: ${clinicContext?.workingHours || '08:00 - 20:00'}, ${clinicContext?.workingDays || 'Dushanba - Shanba'}
Faol shifokorlar: ${JSON.stringify(clinicContext?.activeDoctors || [])}`;

    // 1. Google Gemini API integration
    if (geminiKey) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      
      const contents = [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        ...(history || []).map((h: any) => ({
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
        body: JSON.stringify({ contents }),
      });

      if (!aiResponse.ok) {
        throw new Error(`Gemini API xatoligi: ${aiResponse.statusText}`);
      }

      const geminiData = await aiResponse.json();
      const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

      return res.status(200).json({
        isDemo: false,
        provider: 'gemini',
        reply: reply || 'Kechirasiz, javob shakllanmadi.',
      });
    }

    // 2. OpenAI API integration
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
            ...(history || []).map((h: any) => ({ role: h.role, content: h.content })),
            { role: 'user', content: message },
          ],
          temperature: 0.3,
        }),
      });

      if (!openAiResponse.ok) {
        throw new Error(`OpenAI API xatoligi: ${openAiResponse.statusText}`);
      }

      const openAiData = await openAiResponse.json();
      const reply = openAiData.choices?.[0]?.message?.content;

      return res.status(200).json({
        isDemo: false,
        provider: 'openai',
        reply: reply || 'Kechirasiz, javob shakllanmadi.',
      });
    }
  } catch (err: any) {
    console.error('AI API Handler Error:', err.message);
    return res.status(500).json({
      error: 'Tashqi AI serveri bilan ulanishda xatolik yuz berdi. Avtonom rejimga ulanilmoqda.',
      isDemo: true,
    });
  }
}
