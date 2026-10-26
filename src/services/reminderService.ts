import { AiReminder } from '../types/ai';
import { Appointment } from '../types';
import { storageService } from './storage';
import { telegramService } from './telegramService';

const REMINDERS_STORAGE_KEY = 'elvora_ai_reminders_registry';

let inMemoryReminders: ScheduledReminderJob[] = [];

export interface ScheduledReminderJob extends AiReminder {
  reminderType?: 'confirmation' | 'reminder_24h' | 'reminder_2h' | 'cancellation' | 'reschedule';
  dispatchedAt?: string;
  errorMessage?: string;
  enabled?: boolean;
  message?: string;
}

export const reminderService = {
  getAll(): ScheduledReminderJob[] {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(REMINDERS_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      }
    } catch {
      // Fallback
    }
    return inMemoryReminders;
  },

  saveAll(reminders: ScheduledReminderJob[]): void {
    inMemoryReminders = [...reminders];
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(reminders));
      }
    } catch {
      // Storage unavailable
    }
  },

  // Calculate Tashkent-based trigger times for an appointment
  calculateScheduledTimes(dateStr: string, timeStr: string): {
    scheduled24h: string;
    scheduled2h: string;
  } {
    const [year, month, day] = (dateStr || '').split('-').map(Number);
    const [hours, minutes] = (timeStr || '').split(':').map(Number);

    if (!year || !month || !day || isNaN(hours) || isNaN(minutes)) {
      return {
        scheduled24h: `${dateStr} ${timeStr}`,
        scheduled2h: `${dateStr} ${timeStr}`,
      };
    }

    const aptDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));

    // 24 hours prior
    const date24h = new Date(aptDate.getTime() - 24 * 60 * 60 * 1000);
    // 2 hours prior
    const date2h = new Date(aptDate.getTime() - 2 * 60 * 60 * 1000);

    const pad = (n: number) => String(n).padStart(2, '0');
    const formatDt = (d: Date) =>
      `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;

    return {
      scheduled24h: formatDt(date24h),
      scheduled2h: formatDt(date2h),
    };
  },

  // Schedule automated multi-stage reminders for an appointment
  scheduleReminderForAppointment(
    appointment: Appointment,
    channel: 'telegram' | 'sms' = 'telegram'
  ): ScheduledReminderJob[] & ScheduledReminderJob {
    const list = this.getAll();
    const existing = list.find((r) => r.appointmentId === appointment.id);
    if (existing) {
      const emptyRes = [] as any;
      Object.assign(emptyRes, existing);
      return emptyRes;
    }

    const { scheduled24h, scheduled2h } = this.calculateScheduledTimes(
      appointment.date,
      appointment.startTime
    );

    const reminder24h: ScheduledReminderJob = {
      id: `rem-24h-${appointment.id}`,
      appointmentId: appointment.id,
      patientName: appointment.patientName,
      patientPhone: appointment.patientPhone,
      doctorName: appointment.doctorName,
      specialty: appointment.doctorSpecialty,
      date: appointment.date,
      time: appointment.startTime,
      channel,
      scheduledFor: scheduled24h,
      status: 'rejalashtirilgan',
      consentObtained: true,
      enabled: true,
      reminderType: 'reminder_24h',
      message: `Hurmatli ${appointment.patientName}! 24 soatdan so'ng ${appointment.doctorName} qabulingiz bor.`,
      textUz: `Hurmatli ${appointment.patientName}! Ertaga, ${appointment.date} soat ${appointment.startTime} da Elvora Health klinikasida ${appointment.doctorName} qabuliga yozilgansiz.`,
    };

    const reminder2h: ScheduledReminderJob = {
      id: `rem-2h-${appointment.id}`,
      appointmentId: appointment.id,
      patientName: appointment.patientName,
      patientPhone: appointment.patientPhone,
      doctorName: appointment.doctorName,
      specialty: appointment.doctorSpecialty,
      date: appointment.date,
      time: appointment.startTime,
      channel,
      scheduledFor: scheduled2h,
      status: 'rejalashtirilgan',
      consentObtained: true,
      enabled: true,
      reminderType: 'reminder_2h',
      message: `Hurmatli ${appointment.patientName}! 2 soatdan so'ng ${appointment.doctorName} qabulingiz boshlanadi.`,
      textUz: `Hurmatli ${appointment.patientName}! Bugun 2 soatdan so'ng, soat ${appointment.startTime} da ${appointment.doctorName} qabulingiz boshlanadi.`,
    };

    list.unshift(reminder2h);
    list.unshift(reminder24h);
    this.saveAll(list);
    const result = [reminder24h, reminder2h] as any;
    Object.assign(result, reminder24h);
    return result;
  },

  // Notify patient when appointment is canceled
  async notifyCancellation(
    appointment: Appointment,
    reasonOrRoom = 'Bemor iltimosiga ko‘ra'
  ): Promise<ScheduledReminderJob> {
    const list = this.getAll();
    for (const item of list) {
      if (item.appointmentId === appointment.id) {
        item.status = 'bekor_qilingan';
      }
    }
    const cancelRecord: ScheduledReminderJob = {
      id: `cancel-${appointment.id}-${Date.now()}`,
      appointmentId: appointment.id,
      patientName: appointment.patientName,
      patientPhone: appointment.patientPhone,
      doctorName: appointment.doctorName,
      specialty: appointment.doctorSpecialty,
      date: appointment.date,
      time: appointment.startTime,
      channel: 'telegram',
      scheduledFor: appointment.date,
      status: 'bekor_qilingan',
      consentObtained: true,
      enabled: true,
      reminderType: 'cancellation',
      message: `Qabul bekor qilindi. Sabab: ${reasonOrRoom}`,
      textUz: `Hurmatli ${appointment.patientName}! ${appointment.doctorName} qabulingiz bekor qilindi (${reasonOrRoom}).`,
    };
    list.unshift(cancelRecord);
    this.saveAll(list);

    // Send Telegram cancellation notice
    await telegramService.sendNotification(appointment, 'cancellation');
    return cancelRecord;
  },

  // Notify patient when appointment is rescheduled
  async notifyReschedule(
    appointment: Appointment,
    newDate?: string,
    newTime?: string,
    reason = 'Jadval o‘zgarishi'
  ): Promise<ScheduledReminderJob> {
    const targetDate = newDate || appointment.date;
    const targetTime = newTime || appointment.startTime;
    const list = this.getAll();
    const { scheduled24h, scheduled2h } = this.calculateScheduledTimes(
      targetDate,
      targetTime
    );

    for (const item of list) {
      if (item.appointmentId === appointment.id) {
        item.date = targetDate;
        item.time = targetTime;
        item.status = 'rejalashtirilgan';
        if (item.reminderType === 'reminder_24h') {
          item.scheduledFor = scheduled24h;
        } else if (item.reminderType === 'reminder_2h') {
          item.scheduledFor = scheduled2h;
        }
      }
    }

    const rescheduleRecord: ScheduledReminderJob = {
      id: `resched-${appointment.id}-${Date.now()}`,
      appointmentId: appointment.id,
      patientName: appointment.patientName,
      patientPhone: appointment.patientPhone,
      doctorName: appointment.doctorName,
      specialty: appointment.doctorSpecialty,
      date: targetDate,
      time: targetTime,
      channel: 'telegram',
      scheduledFor: scheduled24h,
      status: 'rejalashtirilgan',
      consentObtained: true,
      enabled: true,
      reminderType: 'reschedule',
      message: `Qabul vaqti ko‘chirildi: ${targetDate} ${targetTime}. Sabab: ${reason}`,
      textUz: `Hurmatli ${appointment.patientName}! ${appointment.doctorName} qabulingiz yangi vaqtga (${targetDate} ${targetTime}) ko'chirildi.`,
    };
    list.unshift(rescheduleRecord);
    this.saveAll(list);

    // Send Telegram reschedule notice
    await telegramService.sendNotification({ ...appointment, date: targetDate, startTime: targetTime }, 'reschedule');
    return rescheduleRecord;
  },

  // Dispatch reminder manually or through scheduler
  async dispatchReminder(id: string): Promise<{ success: boolean; status: AiReminder['status']; note: string }> {
    const list = this.getAll();
    const index = list.findIndex((r) => r.id === id);
    if (index === -1) {
      return { success: false, status: 'rad_etildi', note: 'Eslatma topilmadi' };
    }

    const item = list[index];
    if (!item.consentObtained || item.enabled === false) {
      return { success: false, status: 'rad_etildi', note: 'Bemor eslatmalarni bekor qilgan (Opt-out).' };
    }

    item.status = 'yuborildi';
    this.saveAll(list);

    const apt = storageService.getAppointments().find((a) => a.id === item.appointmentId);
    let deliverySuccess = true;

    if (apt && item.channel === 'telegram') {
      const type =
        item.reminderType === 'cancellation'
          ? 'cancellation'
          : item.reminderType === 'reschedule'
          ? 'reschedule'
          : item.reminderType === 'reminder_2h'
          ? 'reminder_2h'
          : 'reminder_24h';
      const res = await telegramService.sendNotification(apt, type);
      deliverySuccess = res.delivered || res.success;
    }

    item.status = deliverySuccess ? 'yetkazildi' : 'rad_etildi';
    item.deliveryConfirmedAt = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    this.saveAll(list);

    return {
      success: deliverySuccess,
      status: item.status,
      note: deliverySuccess
        ? `Telegram orqali tasdiqlangan yetkazilish qayd etildi (${item.deliveryConfirmedAt}).`
        : 'Xabar yetkazishda xatolik yuz berdi.',
    };
  },

  // Process all due reminders against current Tashkent time
  async processDueReminders(customNowStr?: string): Promise<ScheduledReminderJob[]> {
    const list = this.getAll();
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const nowStr =
      customNowStr ||
      `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

    const dispatched: ScheduledReminderJob[] = [];
    for (const item of list) {
      if (
        item.status === 'rejalashtirilgan' &&
        item.consentObtained !== false &&
        item.enabled !== false &&
        item.scheduledFor &&
        item.scheduledFor <= nowStr
      ) {
        item.status = 'yuborildi';
        item.dispatchedAt = nowStr;
        dispatched.push(item);
      }
    }
    this.saveAll(list);
    return dispatched;
  },

  // Toggle patient opt-out
  toggleOptOut(id: string, optOut: boolean): ScheduledReminderJob | null {
    const list = this.getAll();
    const index = list.findIndex((r) => r.id === id);
    if (index === -1) return null;

    list[index].consentObtained = !optOut;
    list[index].enabled = !optOut;
    list[index].status = optOut ? 'rad_etildi' : 'rejalashtirilgan';
    this.saveAll(list);
    return list[index];
  },

  // Toggle reminder enabled status
  toggleReminder(id: string, enabled: boolean): ScheduledReminderJob | null {
    return this.toggleOptOut(id, !enabled);
  },
};
