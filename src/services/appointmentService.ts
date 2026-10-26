import { Appointment, AppointmentStatus } from '../types';
import { storageService } from './storage';
import { doctorService } from './doctorService';
import { patientService } from './patientService';
import { getTodayDateString } from './seedData';
import { telegramService } from './telegramService';
import { reminderService } from './reminderService';

export const appointmentService = {
  getAll(): Appointment[] {
    return storageService.getAppointments();
  },

  getByDate(date: string): Appointment[] {
    return this.getAll().filter((a) => a.date === date);
  },

  getById(id: string): Appointment | undefined {
    return this.getAll().find((a) => a.id === id);
  },

  getByPatientId(patientId: string): Appointment[] {
    return this.getAll().filter((a) => a.patientId === patientId);
  },

  create(
    data: Omit<Appointment, 'id' | 'queueNumber' | 'createdAt' | 'reminderSent'>
  ): { success: boolean; appointment?: Appointment; error?: string } {
    const list = storageService.getAppointments();
    const doctor = doctorService.getById(data.doctorId);

    if (!doctor) {
      return { success: false, error: 'Tanlangan shifokor topilmadi' };
    }

    // Availability validation to prevent double-booking
    const check = doctorService.checkSlotAvailability(
      doctor,
      data.date,
      data.startTime,
      data.endTime,
      list
    );

    if (!check.available) {
      return { success: false, error: check.reason || 'Shifokor ushbu vaqtda band' };
    }

    // Ensure patient exists in the patients registry
    const existingPatient = patientService.getById(data.patientId);
    if (!existingPatient) {
      patientService.create({
        fullName: data.patientName,
        phone: data.patientPhone,
        birthDate: '1995-01-01',
        gender: 'erkak',
        notes: `Onlayn/AI orqali qabulga yozildi (${data.serviceName})`,
      });
    }

    const sameDayAppointments = list.filter((a) => a.date === data.date);
    const queueNumber = sameDayAppointments.length + 1;

    const timeNow = new Date().toTimeString().slice(0, 5);
    const newAppointment: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      queueNumber,
      reminderSent: true,
      telegramSent: true,
      telegramSentAt: timeNow,
      createdAt: `${getTodayDateString()} ${timeNow}`,
    };

    // Dispatch Telegram confirmation
    telegramService.sendAppointmentConfirmation(newAppointment, doctor.roomNumber);

    // Schedule automated multi-stage reminders (24h, 2h before)
    reminderService.scheduleReminderForAppointment(newAppointment, 'telegram');

    list.unshift(newAppointment);
    storageService.setAppointments(list);

    return { success: true, appointment: newAppointment };
  },

  updateStatus(id: string, status: AppointmentStatus): Appointment | null {
    const list = storageService.getAppointments();
    const index = list.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const current = list[index];
    list[index] = { ...current, status };
    storageService.setAppointments(list);

    // If marked completed, update patient visit count
    if (status === 'yakunlandi') {
      patientService.recordVisit(current.patientId);
    }

    // If canceled, dispatch notification and update reminder status
    if (status === 'bekor_qilindi') {
      const doctor = doctorService.getById(current.doctorId);
      reminderService.notifyCancellation(current, doctor?.roomNumber);
    }

    return list[index];
  },

  reschedule(
    id: string,
    newDate: string,
    newStartTime: string,
    newEndTime: string
  ): { success: boolean; appointment?: Appointment; error?: string } {
    const list = storageService.getAppointments();
    const index = list.findIndex((a) => a.id === id);
    if (index === -1) {
      return { success: false, error: 'Qabul topilmadi' };
    }

    const apt = list[index];
    const doctor = doctorService.getById(apt.doctorId);
    if (!doctor) {
      return { success: false, error: 'Shifokor topilmadi' };
    }

    const check = doctorService.checkSlotAvailability(
      doctor,
      newDate,
      newStartTime,
      newEndTime,
      list,
      id
    );

    if (!check.available) {
      return { success: false, error: check.reason };
    }

    list[index] = {
      ...apt,
      date: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
      status: 'kutilmoqda',
    };

    storageService.setAppointments(list);

    // Dispatch reschedule notification and recalculate reminders
    reminderService.notifyReschedule(list[index], doctor.roomNumber);

    return { success: true, appointment: list[index] };
  },

  delete(id: string): boolean {
    const list = storageService.getAppointments();
    const filtered = list.filter((a) => a.id !== id);
    if (filtered.length !== list.length) {
      storageService.setAppointments(filtered);
      return true;
    }
    return false;
  },

  // Live waiting queue for a date (defaults to today)
  getLiveQueue(date: string = getTodayDateString()): {
    waiting: Appointment[];
    inProgress: Appointment[];
    completedToday: Appointment[];
    missedToday: Appointment[];
  } {
    const dayApts = this.getByDate(date);
    return {
      waiting: dayApts.filter((a) => a.status === 'kutilmoqda').sort((a, b) => a.queueNumber - b.queueNumber),
      inProgress: dayApts.filter((a) => a.status === 'qabulda'),
      completedToday: dayApts.filter((a) => a.status === 'yakunlandi'),
      missedToday: dayApts.filter((a) => a.status === 'kelmagan'),
    };
  },

  // Calculate estimated wait time based on queue position
  calculateEstimatedWaitTime(appointment: Appointment, waitingQueue: Appointment[]): number {
    const index = waitingQueue.findIndex((a) => a.id === appointment.id);
    if (index === -1) return 0;
    // Assume average 15-20 min consultation per preceding waiting patient
    return (index + 1) * 15;
  },

  // Simulated Reminder Workflow
  simulateReminder(
    id: string,
    channel: 'SMS' | 'Telegram'
  ): {
    success: boolean;
    channel: string;
    messageText: string;
    recipient: string;
    time: string;
    isSimulated: boolean;
  } {
    const apt = this.getById(id);
    if (!apt) {
      return {
        success: false,
        channel,
        messageText: '',
        recipient: '',
        time: '',
        isSimulated: true,
      };
    }

    const messageText = `Hurmatli ${apt.patientName}! Sizning "Shifo Med Premium" klinikasida ${apt.doctorName} (${apt.doctorSpecialty}) qabuliga yozilishingiz: Sana: ${apt.date}, Soat: ${apt.startTime}. Navbat raqami: #${apt.queueNumber}. Iltimos, 10 daqiqa oldin kelishingizni so'raymiz. Tel: +998 (71) 200-45-45`;

    // Mark appointment as reminderSent
    const list = storageService.getAppointments();
    const idx = list.findIndex((a) => a.id === id);
    if (idx !== -1) {
      list[idx].reminderSent = true;
      storageService.setAppointments(list);
    }

    return {
      success: true,
      channel,
      messageText,
      recipient: apt.patientPhone,
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      isSimulated: true,
    };
  },
};
