// Vercel Serverless Function: /api/reminders/process
// Automated Persistent Appointment Reminders Processor (Asia/Tashkent Timezone)

import { getLinkingStore } from '../telegram/link.ts';

declare global {
  // eslint-disable-next-line no-var
  var __processedRemindersRegistry: Set<string> | undefined;
}

if (!global.__processedRemindersRegistry) {
  global.__processedRemindersRegistry = new Set<string>();
}

const sentRemindersRegistry = global.__processedRemindersRegistry;

export function getSentRemindersRegistry() {
  return sentRemindersRegistry;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Clinic local time in Tashkent (UTC+5)
  const nowUtc = Date.now();
  const tashkentOffsetMs = 5 * 60 * 60 * 1000;
  const tashkentNow = new Date(nowUtc + tashkentOffsetMs);

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const { appointments = [], dryRun = false } = req.body || {};

  const results: {
    appointmentId: string;
    patientName: string;
    type: 'confirmation' | 'reminder_24h' | 'reminder_2h';
    status: 'sent' | 'skipped' | 'already_sent' | 'no_telegram';
    reason?: string;
  }[] = [];

  const linkingStore = getLinkingStore();

  for (const apt of appointments) {
    if (!apt || apt.status !== 'kutilmoqda') continue;

    // Parse appointment date and time in Tashkent time
    // format YYYY-MM-DD and HH:mm
    const [year, month, day] = (apt.date || '').split('-').map(Number);
    const [hour, minute] = (apt.startTime || '').split(':').map(Number);

    if (!year || !month || !day || isNaN(hour) || isNaN(minute)) continue;

    // Create target time in Tashkent representation
    const appointmentDateTashkent = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const nowTashkentTime = new Date(Date.UTC(
      tashkentNow.getUTCFullYear(),
      tashkentNow.getUTCMonth(),
      tashkentNow.getUTCDate(),
      tashkentNow.getUTCHours(),
      tashkentNow.getUTCMinutes()
    ));

    const diffHours = (appointmentDateTashkent.getTime() - nowTashkentTime.getTime()) / (1000 * 60 * 60);

    // 1. Resolve patient telegram chat ID
    const cleanPhone = (apt.patientPhone || '').replace(/\D/g, '');
    let targetChatId: string | undefined;
    for (const entry of Array.from(linkingStore.values()).reverse()) {
      const entryPhone = entry.patientPhone.replace(/\D/g, '');
      if (entryPhone === cleanPhone && entry.status === 'linked' && entry.linkedChatId) {
        targetChatId = entry.linkedChatId;
        break;
      }
    }

    // Check Reminder 1: 24h before (between 20 and 28 hours prior)
    if (diffHours >= 20 && diffHours <= 28) {
      const key = `${apt.id}:reminder_24h`;
      if (sentRemindersRegistry.has(key)) {
        results.push({ appointmentId: apt.id, patientName: apt.patientName, type: 'reminder_24h', status: 'already_sent' });
      } else {
        if (!targetChatId) {
          results.push({ appointmentId: apt.id, patientName: apt.patientName, type: 'reminder_24h', status: 'no_telegram', reason: 'Telegram ulanmagan' });
        } else {
          sentRemindersRegistry.add(key);
          if (!dryRun && botToken) {
            try {
              const text = `⏰ <b>ERTANGI QABUL ESLATMASI (Elvora Health)</b>\n\n` +
                `Hurmatli <b>${apt.patientName}</b>!\n` +
                `Ertaga, <b>${apt.date}</b> kuni soat <b>${apt.startTime}</b> da <b>${apt.doctorName}</b> (${apt.doctorSpecialty}) qabuliga yozilgansiz.\n\n` +
                `📍 Manzil: Toshkent sh., Bunyodkor shox ko'chasi, 42-uy\n` +
                `📞 Ma'lumot: +998 (71) 200-45-45\n\n` +
                `<i>Iltimos, o'z vaqtida kelishingizni so'raymiz.</i>`;

              await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: targetChatId, text, parse_mode: 'HTML' }),
              });
            } catch (err: any) {
              console.error('Reminder 24h send error:', err.message);
            }
          }
          results.push({ appointmentId: apt.id, patientName: apt.patientName, type: 'reminder_24h', status: 'sent' });
        }
      }
    }

    // Check Reminder 2: 2h before (between 1 and 3 hours prior)
    if (diffHours >= 1 && diffHours <= 3) {
      const key = `${apt.id}:reminder_2h`;
      if (sentRemindersRegistry.has(key)) {
        results.push({ appointmentId: apt.id, patientName: apt.patientName, type: 'reminder_2h', status: 'already_sent' });
      } else {
        if (!targetChatId) {
          results.push({ appointmentId: apt.id, patientName: apt.patientName, type: 'reminder_2h', status: 'no_telegram', reason: 'Telegram ulanmagan' });
        } else {
          sentRemindersRegistry.add(key);
          if (!dryRun && botToken) {
            try {
              const text = `🔔 <b>2 SOATDAN SO'NG QABUL (Elvora Health)</b>\n\n` +
                `Hurmatli <b>${apt.patientName}</b>!\n` +
                `Bugun soat <b>${apt.startTime}</b> da <b>${apt.doctorName}</b> ko'rigingiz boshlanadi.\n` +
                `Klinikaga yetib kelishingizni kutmoqdamiz.`;

              await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: targetChatId, text, parse_mode: 'HTML' }),
              });
            } catch (err: any) {
              console.error('Reminder 2h send error:', err.message);
            }
          }
          results.push({ appointmentId: apt.id, patientName: apt.patientName, type: 'reminder_2h', status: 'sent' });
        }
      }
    }
  }

  return res.status(200).json({
    success: true,
    timezone: 'Asia/Tashkent (UTC+5)',
    serverTimeTashkent: tashkentNow.toISOString(),
    processedCount: results.length,
    results,
  });
}
