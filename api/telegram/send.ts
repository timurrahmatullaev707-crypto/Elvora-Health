// Vercel Serverless Function: /api/telegram/send
// Server-side Official Telegram Bot API Dispatcher with Delivery Verification

import { getLinkingStore } from './link.ts';

interface SendNotificationBody {
  patientPhone: string;
  patientName?: string;
  chatId?: string;
  messageType?: 'confirmation' | 'reminder_24h' | 'reminder_2h' | 'cancellation' | 'reschedule' | 'custom';
  appointment?: {
    id: string;
    doctorName: string;
    doctorSpecialty: string;
    date: string;
    startTime: string;
    endTime?: string;
    roomNumber?: string;
    fee?: number;
    clinicName?: string;
    address?: string;
    phone?: string;
  };
  customText?: string;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Faqat POST so\'rovi qabul qilinadi.' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const body: SendNotificationBody = req.body || {};
  const { patientPhone, patientName, messageType = 'confirmation', appointment, customText } = body;

  if (!patientPhone && !body.chatId) {
    return res.status(400).json({ error: 'patientPhone yoki chatId ko\'rsatilishi lozim.' });
  }

  // 1. Resolve Telegram chat ID
  let targetChatId = body.chatId;

  if (!targetChatId && patientPhone) {
    const cleanTarget = patientPhone.replace(/\D/g, '');
    const linkingStore = getLinkingStore();
    for (const entry of Array.from(linkingStore.values()).reverse()) {
      const entryPhone = entry.patientPhone.replace(/\D/g, '');
      if (entryPhone === cleanTarget && entry.status === 'linked' && entry.linkedChatId) {
        targetChatId = entry.linkedChatId;
        break;
      }
    }
  }

  // Format message text in beautiful, fluent Uzbek
  let formattedText = customText || '';

  if (!formattedText && appointment) {
    const docName = appointment.doctorName;
    const spec = appointment.doctorSpecialty;
    const date = appointment.date;
    const time = appointment.startTime;
    const room = appointment.roomNumber || '105-xona';
    const clinic = appointment.clinicName || 'Elvora Health';
    const address = appointment.address || 'Toshkent sh., Bunyodkor shox ko\'chasi, 42-uy';
    const phone = appointment.phone || '+998 (71) 200-45-45';
    const name = patientName || 'Hurmatli bemor';
    const feeText = appointment.fee ? `${Number(appointment.fee).toLocaleString('uz-UZ')} UZS` : '';

    if (messageType === 'confirmation') {
      formattedText = `Assalomu alaykum, ${name}!\n\n` +
        `Siz <b>${clinic}</b> orqali shifokor qabuliga muvaffaqiyatli yozildingiz.\n\n` +
        `👨‍⚕️ <b>Shifokor:</b> ${docName} (${spec})\n` +
        `📅 <b>Sana:</b> ${date}\n` +
        `🕒 <b>Vaqt:</b> ${time}\n` +
        `🚪 <b>Kabinet:</b> ${room}\n` +
        (feeText ? `💳 <b>Ko'rik narxi:</b> ${feeText}\n` : '') +
        `🏥 <b>Klinika:</b> ${clinic}\n` +
        `📍 <b>Manzil:</b> ${address}\n` +
        `📞 <b>Telefon:</b> ${phone}\n\n` +
        `<i>Iltimos, belgilangan vaqtdan 10 daqiqa oldin qabulga keling.</i>\n\n` +
        `Hurmat bilan,\n<b>${clinic} jamoasi</b>`;
    } else if (messageType === 'reminder_24h') {
      formattedText = `⏰ <b>ERTANGI QABUL ESLATMASI</b>\n\n` +
        `Hurmatli ${name}!\n` +
        `Ertaga, <b>${date}</b> kuni soat <b>${time}</b> da <b>${clinic}</b> klinikasida ${docName} (${spec}) qabuliga yozilgansiz.\n\n` +
        `🚪 Kabinet: ${room}\n` +
        `📍 Manzil: ${address}\n` +
        `📞 Aloqa: ${phone}\n\n` +
        `<i>Agar tashrifingiz bekor bo'ladigan bo'lsa, iltimos oldindan qo'ng'iroq qilib ogohlantiring.</i>`;
    } else if (messageType === 'reminder_2h') {
      formattedText = `🔔 <b>2 SOATDAN SO'NG QABUL</b>\n\n` +
        `Hurmatli ${name}!\n` +
        `Bugun soat <b>${time}</b> da ${docName} ko'rigingiz boshlanadi.\n` +
        `Klinikaga yetib kelishingizni kutmoqdamiz. (${room})`;
    } else if (messageType === 'cancellation') {
      formattedText = `❌ <b>QABUL BEKOR QILINDI</b>\n\n` +
        `Hurmatli ${name}!\n` +
        `Sizning ${date} soat ${time} dagi (${docName}) qabulingiz bekor qilindi.\n` +
        `Qayta yozilish uchun: ${phone}`;
    } else if (messageType === 'reschedule') {
      formattedText = `🔄 <b>QABUL VAQTI O'ZGARTIRILDI</b>\n\n` +
        `Hurmatli ${name}!\n` +
        `Sizning qabul vaqtingiz yangilandi:\n` +
        `📅 Yangi sana: <b>${date}</b>\n` +
        `🕒 Yangi vaqt: <b>${time}</b>\n` +
        `👨‍⚕️ Shifokor: ${docName}\n` +
        `🚪 Kabinet: ${room}`;
    }
  }

  // 2. If no Telegram Bot token is configured, return graceful fallback details
  if (!botToken) {
    const cleanPhone = (patientPhone || '').replace(/\D/g, '');
    const encoded = encodeURIComponent(formattedText.replace(/<[^>]+>/g, ''));
    return res.status(200).json({
      success: false,
      delivered: false,
      reason: 'bot_token_not_configured',
      note: 'Serverda TELEGRAM_BOT_TOKEN o\'rnatilmagan. Web fallback faol.',
      webDeepLink: `https://t.me/share/url?url=${encoded}`,
      fallbackMessageText: formattedText,
      recipientPhone: cleanPhone,
    });
  }

  // 3. If patient Telegram is not linked yet
  if (!targetChatId) {
    const encoded = encodeURIComponent(formattedText.replace(/<[^>]+>/g, ''));
    return res.status(200).json({
      success: false,
      delivered: false,
      reason: 'patient_not_linked',
      note: 'Bemor Telegram hisobini hali ulamagan. Sayt orqali bog\'lanish taklif etildi.',
      webDeepLink: `https://t.me/share/url?url=${encoded}`,
      fallbackMessageText: formattedText,
    });
  }

  // 4. Send via official Telegram Bot API
  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: targetChatId,
        text: formattedText,
        parse_mode: 'HTML',
      }),
    });

    const telegramData: any = await telegramRes.json();

    if (!telegramRes.ok || !telegramData.ok) {
      return res.status(200).json({
        success: false,
        delivered: false,
        error: telegramData.description || 'Telegram API xatoligi',
        fallbackMessageText: formattedText,
      });
    }

    return res.status(200).json({
      success: true,
      delivered: true,
      messageId: telegramData.result?.message_id,
      chatId: targetChatId,
      sentAt: new Date().toISOString(),
      recipientPhone: patientPhone,
    });
  } catch (err: any) {
    console.error('Telegram dispatch error:', err.message);
    return res.status(500).json({
      success: false,
      delivered: false,
      error: err.message,
      fallbackMessageText: formattedText,
    });
  }
}
