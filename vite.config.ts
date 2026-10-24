import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Local development middleware plugin to handle /api/chat seamlessly in Vite dev
function localAiApiPlugin(): Plugin {
  return {
    name: 'local-ai-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/chat' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });
          req.on('end', async () => {
            res.setHeader('Content-Type', 'application/json');
            try {
              const body = JSON.parse(bodyStr || '{}');
              const { message, history, clinicContext } = body;

              const geminiKey = process.env.GEMINI_API_KEY;
              const openAiKey = process.env.OPENAI_API_KEY;

              if (!geminiKey && !openAiKey) {
                res.statusCode = 200;
                res.end(
                  JSON.stringify({
                    isDemo: true,
                    reply: null,
                    status: 'demo_mode',
                    note: 'Tashqi AI API kaliti (.env) o\'rnatilmagan. Elvora Avtonom Klinik Dvigateli faollashdi.',
                  })
                );
                return;
              }

              const systemPrompt = `Siz "Elvora Health" zamonaviy tibbiyot platformasining sertifikatlangan, muloyim va professional sun'iy intellekt yordamchisisiz (Elvora AI™).
MUHIM QOIDALAR:
1. Til: Barcha javoblaringizni faqat ravon, imloviy to'g'ri o'zbek tilida taqdim eting.
2. Tibbiy xavfsizlik: Hech qachon qat'iy tashxis qo'ymang. Hech qachon dori-darmonlar va ularning dozalarini yozmang.
3. Shifokor o'rnini bosmaslik: Bemorga har doim ushbu maslahatlar dastlabki tavsiya ekanligini va yakuniy xulosani faqat malakali shifokor ko'rigi berishini eslatib turing.
4. Favqulodda holatlar: Agar bemor o'tkir ko'krak og'rig'i, nafas yetishmovchiligi, qon ketishi yoki insult belgilarini bildirsa, zudlik bilan 103 Tez yordam chaqirishni buyuring!
5. Klinika ma'lumotlari: Faqat quyida taqdim etilgan klinika faktlaridan foydalaning:
Klinika nomi: ${clinicContext?.clinicName || 'Elvora Health'}
Manzil: ${clinicContext?.address || 'Toshkent sh., Bunyodkor shox ko\'chasi, 42-uy'}
Telefon: ${clinicContext?.phone || '+998 71 200 45 45'}
Ish tartibi: ${clinicContext?.workingHours || '08:00 - 20:00'}, ${clinicContext?.workingDays || 'Dushanba - Shanba'}
Faol shifokorlar: ${JSON.stringify(clinicContext?.activeDoctors || [])}`;

              if (geminiKey) {
                const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
                const contents = [
                  { role: 'user', parts: [{ text: systemPrompt }] },
                  ...(history || []).map((h: any) => ({
                    role: h.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: h.content }],
                  })),
                  { role: 'user', parts: [{ text: message }] },
                ];

                const aiResponse = await fetch(geminiUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ contents }),
                });

                if (aiResponse.ok) {
                  const data: any = await aiResponse.json();
                  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
                  res.statusCode = 200;
                  res.end(JSON.stringify({ isDemo: false, provider: 'gemini', reply }));
                  return;
                }
              }

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

                if (openAiResponse.ok) {
                  const data: any = await openAiResponse.json();
                  const reply = data.choices?.[0]?.message?.content;
                  res.statusCode = 200;
                  res.end(JSON.stringify({ isDemo: false, provider: 'openai', reply }));
                  return;
                }
              }

              res.statusCode = 200;
              res.end(JSON.stringify({ isDemo: true, reply: null }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message, isDemo: true }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localAiApiPlugin()],
  server: {
    host: true,
    port: 3000,
  },
});
