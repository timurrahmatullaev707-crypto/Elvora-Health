import { Doctor, Appointment } from '../types';
import { storageService } from './storage';

export const doctorService = {
  getAll(): Doctor[] {
    return storageService.getDoctors();
  },

  getById(id: string): Doctor | undefined {
    return storageService.getDoctors().find((d) => d.id === id);
  },

  create(data: Omit<Doctor, 'id'>): Doctor {
    const list = storageService.getDoctors();
    const newDoc: Doctor = {
      ...data,
      id: `doc-${Date.now()}`,
    };
    list.push(newDoc);
    storageService.setDoctors(list);
    return newDoc;
  },

  update(id: string, updates: Partial<Doctor>): Doctor | null {
    const list = storageService.getDoctors();
    const index = list.findIndex((d) => d.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    storageService.setDoctors(list);
    return list[index];
  },

  // Helper to convert "HH:mm" to minutes from midnight
  timeToMinutes(timeStr: string): number {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  },

  minutesToTime(totalMins: number): string {
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  },

  // Calculate doctor occupancy for a given date based on actual appointments
  calculateOccupancy(
    doctor: Doctor,
    appointmentsOnDate: Appointment[]
  ): {
    totalWorkingMinutes: number;
    bookedMinutes: number;
    occupancyPercent: number;
    slotsCount: number;
    bookedSlotsCount: number;
  } {
    const startMins = this.timeToMinutes(doctor.startHour);
    const endMins = this.timeToMinutes(doctor.endHour);
    const breakStartMins = this.timeToMinutes(doctor.breakStart);
    const breakEndMins = this.timeToMinutes(doctor.breakEnd);

    const breakDuration = Math.max(0, breakEndMins - breakStartMins);
    const totalWorkingMinutes = Math.max(0, endMins - startMins - breakDuration);

    const activeApts = appointmentsOnDate.filter(
      (a) => a.doctorId === doctor.id && a.status !== 'bekor_qilindi'
    );

    let bookedMinutes = 0;
    activeApts.forEach((a) => {
      const s = this.timeToMinutes(a.startTime);
      const e = this.timeToMinutes(a.endTime);
      bookedMinutes += Math.max(0, e - s);
    });

    const occupancyPercent =
      totalWorkingMinutes > 0
        ? Math.min(100, Math.round((bookedMinutes / totalWorkingMinutes) * 100))
        : 0;

    const slotDuration = doctor.appointmentDurationMinutes || 30;
    const slotsCount = Math.floor(totalWorkingMinutes / slotDuration);
    const bookedSlotsCount = activeApts.length;

    return {
      totalWorkingMinutes,
      bookedMinutes,
      occupancyPercent,
      slotsCount,
      bookedSlotsCount,
    };
  },

  // Check if a proposed time slot conflicts with doctor's working hours, breaks, or existing appointments
  checkSlotAvailability(
    doctor: Doctor,
    date: string,
    startTime: string,
    endTime: string,
    existingAppointments: Appointment[],
    excludeAppointmentId?: string
  ): { available: boolean; reason?: string } {
    const startMins = this.timeToMinutes(startTime);
    const endMins = this.timeToMinutes(endTime);

    if (endMins <= startMins) {
      return { available: false, reason: 'Tugash vaqti boshlanish vaqtidan keyin bo\'lishi kerak' };
    }

    // Check doctor's working days
    if (date && doctor.workingDays) {
      const d = new Date(date + 'T00:00:00');
      const dayOfWeek = d.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
      const normalizedDay = dayOfWeek === 0 ? 7 : dayOfWeek;
      if (!doctor.workingDays.includes(normalizedDay) && !doctor.workingDays.includes(dayOfWeek)) {
        return {
          available: false,
          reason: 'Ushbu sana shifokorning dam olish kuniga to\'g\'ri keladi',
        };
      }
    }

    const docStartMins = this.timeToMinutes(doctor.startHour);
    const docEndMins = this.timeToMinutes(doctor.endHour);

    if (startMins < docStartMins || endMins > docEndMins) {
      return {
        available: false,
        reason: `Qabul vaqti shifokor ish soatlari oralig'ida bo'lishi kerak (${doctor.startHour} - ${doctor.endHour})`,
      };
    }

    const breakStartMins = this.timeToMinutes(doctor.breakStart);
    const breakEndMins = this.timeToMinutes(doctor.breakEnd);

    // Check overlap with break
    if (startMins < breakEndMins && endMins > breakStartMins) {
      return {
        available: false,
        reason: `Ushbu vaqt shifokorning tushlik tanaffusiga to'g'ri keladi (${doctor.breakStart} - ${doctor.breakEnd})`,
      };
    }

    // Check overlap with other active appointments
    const conflicts = existingAppointments.filter((a) => {
      if (a.doctorId !== doctor.id) return false;
      if (a.date !== date) return false;
      if (a.status === 'bekor_qilindi') return false;
      if (excludeAppointmentId && a.id === excludeAppointmentId) return false;

      const aStart = this.timeToMinutes(a.startTime);
      const aEnd = this.timeToMinutes(a.endTime);
      return startMins < aEnd && endMins > aStart;
    });

    if (conflicts.length > 0) {
      const conflict = conflicts[0];
      return {
        available: false,
        reason: `Shifokorda bu vaqtda boshqa qabul mavjud: ${conflict.startTime} - ${conflict.endTime} (${conflict.patientName})`,
      };
    }

    return { available: true };
  },

  // Generate available time slots for booking dropdown
  getAvailableSlots(
    doctor: Doctor,
    date: string,
    existingAppointments: Appointment[]
  ): string[] {
    const slots: string[] = [];
    const docStartMins = this.timeToMinutes(doctor.startHour);
    const docEndMins = this.timeToMinutes(doctor.endHour);
    const slotDuration = doctor.appointmentDurationMinutes || 30;

    for (let current = docStartMins; current + slotDuration <= docEndMins; current += slotDuration) {
      const slotStart = this.minutesToTime(current);
      const slotEnd = this.minutesToTime(current + slotDuration);

      const check = this.checkSlotAvailability(
        doctor,
        date,
        slotStart,
        slotEnd,
        existingAppointments
      );

      if (check.available) {
        slots.push(slotStart);
      }
    }

    return slots;
  },
};
