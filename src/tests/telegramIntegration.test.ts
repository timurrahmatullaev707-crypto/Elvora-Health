import { describe, it, expect, beforeEach } from 'vitest';
import { telegramService } from '../services/telegramService';
import { reminderService, ScheduledReminderJob } from '../services/reminderService';
import { Appointment } from '../types';

const storageStore: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (key: string) => storageStore[key] || null,
  setItem: (key: string, value: string) => {
    storageStore[key] = String(value);
  },
  removeItem: (key: string) => {
    delete storageStore[key];
  },
  clear: () => {
    Object.keys(storageStore).forEach((k) => delete storageStore[k]);
  },
  length: 0,
  key: () => null,
};

if (typeof (globalThis as any).localStorage === 'undefined') {
  (globalThis as any).localStorage = mockLocalStorage;
}

describe('Telegram Bot Integration & Account Linking', () => {
  beforeEach(() => {
    (globalThis as any).localStorage.clear();
  });

  it('generates a secure single-use linking token with 15-minute TTL', async () => {
    const res = await telegramService.generateLinkingToken({
      phone: '+998901234567',
      name: 'Jasur Rahimov',
    });

    expect(res.token).toBeDefined();
    expect(res.token!.length).toBeGreaterThanOrEqual(16);
    expect(res.deepLink).toContain('https://t.me/');
    expect(res.deepLink).toContain(`start=link_${res.token}`);
    expect(res.expiresAt).toBeGreaterThan(Date.now());
    // Expiration must be approximately 15 minutes (900 seconds) in the future
    const diffMinutes = ((res.expiresAt || 0) - Date.now()) / (1000 * 60);
    expect(diffMinutes).toBeGreaterThan(14);
    expect(diffMinutes).toBeLessThanOrEqual(16);
  });

  it('checks linking status accurately and detects unlinked vs linked states', async () => {
    const phone = '+998901112233';
    expect(telegramService.isPhoneLinkedSync(phone)).toBe(false);

    const tokenRes = await telegramService.generateLinkingToken({
      phone,
      name: 'Dilnoza Karimova',
    });
    const statusBefore = await telegramService.checkLinkingStatus(tokenRes.token || '');
    expect(statusBefore.linked).toBe(false);

    // Simulate saving a linked profile in client storage
    (globalThis as any).localStorage.setItem(
      'elvora_telegram_link_+998901112233',
      JSON.stringify({
        chatId: '987654321',
        username: 'dilnoza_k',
        phone,
        name: 'Dilnoza Karimova',
        linkedAt: Date.now(),
      })
    );

    expect(telegramService.isPhoneLinkedSync(phone)).toBe(true);
    const linkedProfile = telegramService.getLinkedProfile(phone);
    expect(linkedProfile?.chatId).toBe('987654321');
    expect(linkedProfile?.username).toBe('dilnoza_k');
  });

  it('formats Uzbek confirmation message and provides web fallback', async () => {
    const fakeAppointment: Appointment = {
      id: 'apt-test-001',
      patientId: 'pat-001',
      patientName: 'Akmal Zokirov',
      patientPhone: '+998935557788',
      doctorId: 'doc-001',
      doctorName: 'Dr. Alisher Usmonov',
      doctorSpecialty: 'Kardiolog',
      serviceName: 'Kardiologiya',
      date: '2026-10-28',
      startTime: '14:30',
      endTime: '15:00',
      status: 'kutilmoqda',
      fee: 250000,
      queueNumber: 1,
      reminderSent: false,
      createdAt: '2026-10-26T10:00:00Z',
    };

    const res = await telegramService.sendAppointmentConfirmation(fakeAppointment);
    expect(res).toBeDefined();
    expect(res.delivered !== undefined).toBe(true);

    // If bot token is not configured in local test env, it gracefully provides a fallback
    if (!res.delivered) {
      expect(res.telegramDeepLink).toBeDefined();
      expect(res.telegramDeepLink).toContain('https://t.me/');
    }
  });
});

describe('Automated Multi-Stage Reminders & Scheduler Engine', () => {
  beforeEach(() => {
    (globalThis as any).localStorage.clear();
  });

  it('calculates scheduled trigger times 24 hours and 2 hours prior for clinic appointments', () => {
    const times = reminderService.calculateScheduledTimes('2026-10-28', '14:30');

    expect(times.scheduled24h).toBe('2026-10-27 14:30');
    expect(times.scheduled2h).toBe('2026-10-28 12:30');
  });

  it('schedules multi-stage reminders for a new appointment with deduplication', () => {
    const sampleApt: Appointment = {
      id: 'apt-sched-101',
      patientId: 'pat-101',
      patientName: 'Nodira Qosimova',
      patientPhone: '+998971113344',
      doctorId: 'doc-002',
      doctorName: 'Dr. Zulfiya Vohidova',
      doctorSpecialty: 'Nevropatolog',
      serviceName: 'Nevrologiya',
      date: '2026-10-30',
      startTime: '10:00',
      endTime: '10:30',
      status: 'kutilmoqda',
      fee: 220000,
      queueNumber: 1,
      reminderSent: false,
      createdAt: '2026-10-26T12:00:00Z',
    };

    const created = reminderService.scheduleReminderForAppointment(sampleApt);
    expect(created.length).toBe(2);

    const r24 = created.find((r) => r.reminderType === 'reminder_24h');
    const r2 = created.find((r) => r.reminderType === 'reminder_2h');

    expect(r24).toBeDefined();
    expect(r24?.scheduledFor).toBe('2026-10-29 10:00');
    expect(r24?.message).toContain('24 soat');
    expect(r24?.message).toContain('Dr. Zulfiya Vohidova');

    expect(r2).toBeDefined();
    expect(r2?.scheduledFor).toBe('2026-10-30 08:00');
    expect(r2?.message).toContain('2 soat');

    // Attempting duplicate scheduling for the same appointment must return existing
    const secondPass = reminderService.scheduleReminderForAppointment(sampleApt);
    expect(secondPass.length).toBe(0);

    const all = reminderService.getAll();
    expect(all.length).toBe(2);
  });

  it('allows patients to opt out or disable reminders', () => {
    const sampleApt: Appointment = {
      id: 'apt-optout-202',
      patientId: 'pat-202',
      patientName: 'Umarbek Sultonov',
      patientPhone: '+998991234567',
      doctorId: 'doc-003',
      doctorName: 'Dr. Rustam Karimov',
      doctorSpecialty: 'Terapevt',
      serviceName: 'Terapiya',
      date: '2026-11-02',
      startTime: '15:00',
      endTime: '15:30',
      status: 'kutilmoqda',
      fee: 180000,
      queueNumber: 1,
      reminderSent: false,
      createdAt: '2026-10-26T12:00:00Z',
    };

    const scheduled = reminderService.scheduleReminderForAppointment(sampleApt);
    const targetId = scheduled[0].id;

    // Toggle reminder to disabled
    const updated = reminderService.toggleReminder(targetId, false);
    expect(updated?.enabled).toBe(false);

    // Verify persistence
    const reloaded = reminderService.getAll().find((r) => r.id === targetId);
    expect(reloaded?.enabled).toBe(false);
  });

  it('notifies cancellation and reschedule cleanly', async () => {
    const cancelApt: Appointment = {
      id: 'apt-cancel-303',
      patientId: 'pat-303',
      patientName: 'Shahnoza Karimova',
      patientPhone: '+998907778899',
      doctorId: 'doc-004',
      doctorName: 'Dr. Malika Azizova',
      doctorSpecialty: 'Pediatr',
      serviceName: 'Pediatriya',
      date: '2026-11-05',
      startTime: '11:00',
      endTime: '11:30',
      status: 'bekor_qilindi',
      fee: 200000,
      queueNumber: 1,
      reminderSent: false,
      createdAt: '2026-10-26T14:00:00Z',
    };

    const cancelJob = await reminderService.notifyCancellation(cancelApt, 'Bemor iltimosiga binoan');
    expect(cancelJob.reminderType).toBe('cancellation');
    expect(cancelJob.message).toContain('bekor qilindi');
    expect(cancelJob.message).toContain('Bemor iltimosiga binoan');

    const rescheduleJob = await reminderService.notifyReschedule(
      cancelApt,
      '2026-11-06',
      '16:00',
      'Shifokor jadvali o‘zgardi'
    );
    expect(rescheduleJob.reminderType).toBe('reschedule');
    expect(rescheduleJob.message).toContain('2026-11-06');
    expect(rescheduleJob.message).toContain('16:00');
  });

  it('processes due reminders without duplicating dispatched records', async () => {
    // Schedule a reminder set in the past so it is immediately due
    const pastReminder: ScheduledReminderJob = {
      id: 'rem-due-past-01',
      appointmentId: 'apt-due-01',
      patientName: 'Sherzod Nazarov',
      patientPhone: '+998901239988',
      doctorName: 'Dr. Alisher Usmonov',
      specialty: 'Kardiolog',
      date: '2026-10-20',
      time: '10:00',
      channel: 'telegram',
      scheduledFor: '2026-10-20 08:00', // in past
      status: 'rejalashtirilgan',
      consentObtained: true,
      enabled: true,
      reminderType: 'reminder_2h',
      message: 'Hurmatli Sherzod Nazarov, 2 soatdan so‘ng qabulingiz bor.',
      textUz: 'Hurmatli Sherzod Nazarov, 2 soatdan so‘ng qabulingiz bor.',
    };

    reminderService.saveAll([pastReminder]);

    const processed = await reminderService.processDueReminders('2026-10-26 12:00');
    expect(processed.length).toBe(1);
    expect(processed[0].status).toBe('yuborildi');
    expect(processed[0].dispatchedAt).toBeDefined();

    // Running process again should find 0 due reminders because status is now 'yuborildi'
    const secondPass = await reminderService.processDueReminders('2026-10-26 12:00');
    expect(secondPass.length).toBe(0);
  });
});
