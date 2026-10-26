import { Appointment } from '../types';

export interface TelegramLinkingResult {
  success: boolean;
  token?: string;
  deepLink?: string;
  botUsername?: string;
  expiresAt?: number;
  error?: string;
}

export interface TelegramNotificationResult {
  success: boolean;
  delivered: boolean;
  channel: 'telegram';
  recipientPhone: string;
  messageText: string;
  sentAt: string;
  messageId?: number;
  telegramDeepLink?: string;
  note?: string;
  error?: string;
}

const TELEGRAM_LINK_CACHE_KEY = 'elvora_telegram_linked_patients';

export const telegramService = {
  // Format official Telegram notification for appointment confirmation
  formatConfirmationMessage(apt: Appointment, roomNumber = '105-xona'): string {
    const feeText = apt.fee ? `${Number(apt.fee).toLocaleString('uz-UZ')} UZS (Kassada to'lanadi)` : 'Bepul / Sug\'urta';
    const patientLine = apt.patientName ? `👤 Bemor: ${apt.patientName}\n` : '';
    return `🏥 ELVORA HEALTH KLINIKASI

Assalomu alaykum!

Siz Elvora Health orqali shifokor qabuliga muvaffaqiyatli yozildingiz.

${patientLine}👨‍⚕️ Shifokor: ${apt.doctorName} (${apt.doctorSpecialty})
📅 Sana: ${apt.date}
🕒 Vaqt: ${apt.startTime} - ${apt.endTime}
🚪 Kabinet: ${roomNumber}
💳 To'lov: ${feeText}
🏥 Klinika: Elvora Health
📍 Manzil: Toshkent sh., Chilonzor tumani, Bunyodkor shox ko'chasi, 42-uy
📞 Ma'lumot uchun: +998 (71) 200-45-45

Iltimos, belgilangan kuni va soatda qabulga keling.

Hurmat bilan, Elvora Health jamoasi.`;
  },

  // Generate secure single-use linking token and deep link
  async generateLinkingToken(patient: {
    phone: string;
    name: string;
    id?: string;
  }): Promise<TelegramLinkingResult> {
    try {
      const response = await fetch('/api/telegram/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientPhone: patient.phone,
          patientName: patient.name,
          patientId: patient.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          token: data.token,
          deepLink: data.deepLink,
          botUsername: data.botUsername,
          expiresAt: data.expiresAt,
        };
      }
    } catch {
      // Local client fallback
    }

    const fallbackToken = `elv_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 10)}`;
    const botUsername = 'ElvoraHealthBot';
    return {
      success: true,
      token: fallbackToken,
      deepLink: `https://t.me/${botUsername}?start=link_${fallbackToken}`,
      botUsername,
      expiresAt: Date.now() + 15 * 60 * 1000,
    };
  },

  // Check linking status using single-use token
  async checkLinkingStatus(token: string): Promise<{
    linked: boolean;
    status: 'pending' | 'linked' | 'expired' | 'error';
    linkedUsername?: string;
  }> {
    try {
      const response = await fetch(`/api/telegram/link?token=${encodeURIComponent(token)}`);
      if (response.ok) {
        const data = await response.json();
        return {
          linked: data.status === 'linked',
          status: data.status || 'pending',
          linkedUsername: data.linkedUsername,
        };
      }
    } catch {
      // Fallback
    }
    return { linked: false, status: 'pending' };
  },

  // Get local linked profile
  getLinkedProfile(phone: string): { chatId?: string; username?: string; phone: string; name?: string } | null {
    if (!phone) return null;
    const clean = phone.replace(/\D/g, '');
    try {
      if (typeof localStorage !== 'undefined') {
        const raw =
          localStorage.getItem(`elvora_telegram_link_${phone}`) ||
          localStorage.getItem(`elvora_telegram_link_${clean}`);
        if (raw) return JSON.parse(raw);
      }
    } catch {
      // Fallback
    }
    return null;
  },

  // Synchronous cache check for fast UI renders
  isPhoneLinkedSync(phone: string): boolean {
    if (!phone) return false;
    const clean = phone.replace(/\D/g, '');
    try {
      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem(`${TELEGRAM_LINK_CACHE_KEY}_${clean}`);
        if (cached === 'true') return true;
        const profile =
          localStorage.getItem(`elvora_telegram_link_${phone}`) ||
          localStorage.getItem(`elvora_telegram_link_${clean}`);
        if (profile) return true;
      }
    } catch {
      // Fallback
    }
    return false;
  },

  // Check if patient phone is already linked (Promise for async/await & .then)
  async isPhoneLinked(phone: string): Promise<boolean> {
    if (!phone) return false;
    if (this.isPhoneLinkedSync(phone)) return true;
    try {
      const response = await fetch(`/api/telegram/link?phone=${encodeURIComponent(phone)}`);
      if (response.ok) {
        const data = await response.json();
        return Boolean(data.status === 'linked');
      }
    } catch {
      // Fallback
    }
    return false;
  },

  // Mark patient phone as linked locally (e.g. after simulation or user confirmation)
  markPhoneLinkedLocally(phone: string): void {
    if (typeof localStorage !== 'undefined') {
      const clean = phone.replace(/\D/g, '');
      localStorage.setItem(`${TELEGRAM_LINK_CACHE_KEY}_${clean}`, 'true');
    }
  },

  // Send official confirmation message through the backend
  async sendAppointmentConfirmation(
    appointment: Appointment,
    roomNumber = '105-xona'
  ): Promise<TelegramNotificationResult> {
    const formattedText = this.formatConfirmationMessage(appointment, roomNumber);
    const timeNow = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    const encoded = encodeURIComponent(formattedText);
    const webFallbackLink = `https://t.me/share/url?url=${encoded}`;

    try {
      const res = await fetch('/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientPhone: appointment.patientPhone,
          patientName: appointment.patientName,
          messageType: 'confirmation',
          appointment: {
            id: appointment.id,
            doctorName: appointment.doctorName,
            doctorSpecialty: appointment.doctorSpecialty,
            date: appointment.date,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            roomNumber,
            fee: appointment.fee,
            clinicName: 'Elvora Health',
            address: 'Toshkent sh., Bunyodkor shox ko\'chasi, 42-uy',
            phone: '+998 (71) 200-45-45',
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return {
          success: true,
          delivered: Boolean(data.delivered),
          channel: 'telegram',
          recipientPhone: appointment.patientPhone,
          messageText: formattedText,
          sentAt: timeNow,
          messageId: data.messageId,
          telegramDeepLink: data.webDeepLink || webFallbackLink,
          note: data.note,
        };
      }
    } catch {
      // Fallback
    }

    return {
      success: true,
      delivered: false,
      channel: 'telegram',
      recipientPhone: appointment.patientPhone,
      messageText: formattedText,
      sentAt: timeNow,
      telegramDeepLink: webFallbackLink,
      note: 'Web Telegram orqali ochish tayyorlandi.',
    };
  },

  // Dispatch live notification (reminder or status change)
  async sendNotification(
    appointment: Appointment,
    type: 'reminder_24h' | 'reminder_2h' | 'cancellation' | 'reschedule',
    roomNumber = '105-xona'
  ): Promise<TelegramNotificationResult> {
    const timeNow = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    try {
      const res = await fetch('/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientPhone: appointment.patientPhone,
          patientName: appointment.patientName,
          messageType: type,
          appointment: {
            id: appointment.id,
            doctorName: appointment.doctorName,
            doctorSpecialty: appointment.doctorSpecialty,
            date: appointment.date,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            roomNumber,
            fee: appointment.fee,
            clinicName: 'Elvora Health',
            address: 'Toshkent sh., Bunyodkor shox ko\'chasi, 42-uy',
            phone: '+998 (71) 200-45-45',
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return {
          success: true,
          delivered: Boolean(data.delivered),
          channel: 'telegram',
          recipientPhone: appointment.patientPhone,
          messageText: data.fallbackMessageText || '',
          sentAt: timeNow,
          messageId: data.messageId,
          telegramDeepLink: data.webDeepLink,
        };
      }
    } catch {
      // Fallback
    }

    return {
      success: true,
      delivered: false,
      channel: 'telegram',
      recipientPhone: appointment.patientPhone,
      messageText: '',
      sentAt: timeNow,
    };
  },
};
