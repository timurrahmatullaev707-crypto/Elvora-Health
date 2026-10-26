// Vercel Serverless Function: /api/telegram/webhook
// Telegram Bot Webhook Handler for Account Linking and Patient Opt-Out

import { getLinkingStore } from './link.ts';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Health check
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'active',
      service: 'Elvora Health Telegram Webhook',
      time: new Date().toISOString(),
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Faqat POST so\'rovi qabul qilinadi.' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const update = req.body;

  if (!update || !update.message) {
    return res.status(200).json({ ok: true, note: 'No message payload' });
  }

  const { message } = update;
  const chatId = message.chat?.id;
  const username = message.chat?.username || message.from?.username || '';
  const text = (message.text || '').trim();

  const sendTelegramReply = async (replyText: string) => {
    if (!botToken || !chatId) return;
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: replyText,
          parse_mode: 'HTML',
        }),
      });
    } catch (err: any) {
      console.error('Telegram reply error:', err.message);
    }
  };

  // 1. Account linking: /start link_<token>
  if (text.startsWith('/start link_')) {
    const token = text.replace('/start link_', '').trim();
    const linkingStore = getLinkingStore();
    const entry = linkingStore.get(token);

    if (!entry) {
      await sendTelegramReply(
        `⚠️ <b>Havola eskirgan yoki noto'g'ri</b>\n\nIltimos, Elvora Health veb-saytidan yangi havola oling.`
      );
      return res.status(200).json({ ok: true, status: 'token_not_found' });
    }

    if (entry.expiresAt < Date.now()) {
      entry.status = 'expired';
      await sendTelegramReply(
        `⚠️ <b>Ushbu havolaning amal qilish muddati tugagan (15 daqiqa).</b>\n\nIltimos, saytda "Telegramga ulanish" tugmasini qayta bosing.`
      );
      return res.status(200).json({ ok: true, status: 'token_expired' });
    }

    // Successfully link!
    entry.status = 'linked';
    entry.linkedChatId = String(chatId);
    entry.linkedUsername = username;
    entry.linkedAt = Date.now();

    await sendTelegramReply(
      `🎉 <b>Assalomu alaykum, ${entry.patientName}!</b>\n\n` +
      `Sizning Telegram hisobingiz <b>Elvora Health</b> klinika tizimiga muvaffaqiyatli bog'landi.\n\n` +
      `🏥 Endi shifokor qabullariga yozilganingizda:\n` +
      `• Rasmiy qabul chiptasi\n` +
      `• 1 kun oldingi eslatma\n` +
      `• 2 soat oldingi eslatma\n` +
      `to'g'ridan-to'g'ri shu bot orqali yetkaziladi.\n\n` +
      `<i>Xabarnomalarni bekor qilish uchun /stop buyrug'ini yuborishingiz mumkin.</i>`
    );

    return res.status(200).json({
      ok: true,
      status: 'linked_successfully',
      patientPhone: entry.patientPhone,
      chatId,
    });
  }

  // 2. Opt-out request: /stop or /disable
  if (text === '/stop' || text === '/disable' || text.toLowerCase() === 'bekor qilish') {
    await sendTelegramReply(
      `🔕 <b>Eslatmalar to'xtatildi</b>\n\n` +
      `Siz Elvora Health eslatmalaridan muvaffaqiyatli chiqdingiz. Qayta faollashtirish uchun saytimizda qayta bog'lanishingiz mumkin.`
    );
    return res.status(200).json({ ok: true, status: 'opted_out' });
  }

  // 3. General /start or greeting
  if (text === '/start') {
    await sendTelegramReply(
      `👋 <b>Assalomu alaykum!</b>\n\n` +
      `Men <b>Elvora Health</b> klinikasining rasmiy bildirishnoma botiman.\n\n` +
      `Hisobingizni ulash uchun bizning veb-saytimiz orqali qabulga yozilib, "Telegramga ulanish" tugmasidan o'ting.`
    );
    return res.status(200).json({ ok: true });
  }

  return res.status(200).json({ ok: true });
}
