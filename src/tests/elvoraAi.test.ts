import { describe, it, expect, beforeEach } from 'vitest';
import { detectEmergency, sanitizeTextForAi, aiService } from '../services/aiService';
import { labExplainerService } from '../services/labExplainerService';
import { reminderService } from '../services/reminderService';
import { Appointment } from '../types';

describe('Elvora AI™ Clinical Module Tests', () => {
  describe('Emergency Symptoms Detection', () => {
    it('should detect acute heart/respiratory emergency and advise calling 103', () => {
      const emergency = detectEmergency('Ko\'kragim qisilyapti va nafas ololmayapman, chap qo\'lim uvishyapti');
      expect(emergency).not.toBeNull();
      expect(emergency?.isEmergency).toBe(true);
      expect(emergency?.emergencyNumber).toBe('103');
      expect(emergency?.immediateActionUz).toContain('103 Tez tibbiy yordam');
    });

    it('should detect stroke / neurological emergency warning signs', () => {
      const emergency = detectEmergency('Yuzim qiyshayib qoldi va tilim aylanmayapti');
      expect(emergency).not.toBeNull();
      expect(emergency?.isEmergency).toBe(true);
      expect(emergency?.immediateActionUz).toContain('FAST');
    });

    it('should NOT trigger emergency for non-critical routine symptoms', () => {
      const emergency = detectEmergency('Boshim biroz og\'riyapti, qaysi shifokorga borsam bo\'ladi?');
      expect(emergency).toBeNull();
    });
  });

  describe('Medical Specialty Recommendations', () => {
    it('should recommend Nevropatolog for headache and insomnia complaints', () => {
      const rec = aiService.findMatchingSpecialty('Boshim tez-tez og\'riyapti va uyqusizlik bezovta qilyapti');
      expect(rec).not.toBeNull();
      expect(rec?.specialty).toBe('Nevropatolog');
      expect(rec?.clarifyingQuestions?.length).toBeGreaterThan(0);
      expect(rec?.disclaimerUz).toContain('aniq tashxis faqat malakali shifokor');
    });

    it('should recommend Kardiolog for blood pressure and palpitations', () => {
      const rec = aiService.findMatchingSpecialty('Qon bosimim baland va puls tezlashib ketyapti');
      expect(rec).not.toBeNull();
      expect(rec?.specialty).toBe('Kardiolog');
    });

    it('should recommend Stomatolog for tooth pain', () => {
      const rec = aiService.findMatchingSpecialty('Tish og\'rig\'i va milk qonashi bor');
      expect(rec).not.toBeNull();
      expect(rec?.specialty).toBe('Stomatolog');
    });
  });

  describe('PII Sanitization & Data Privacy', () => {
    it('should mask phone numbers before sending to AI', () => {
      const input = 'Mening raqamim +998 90 123 45 67, qabulga yozmoqchiman';
      const sanitized = sanitizeTextForAi(input);
      expect(sanitized).not.toContain('+998 90 123 45 67');
      expect(sanitized).toContain('[TELEFON_MAXFIY]');
    });

    it('should mask passport series and numbers', () => {
      const input = 'Pasportim AA 1234567';
      const sanitized = sanitizeTextForAi(input);
      expect(sanitized).not.toContain('AA 1234567');
      expect(sanitized).toContain('[PASSPORT_MAXFIY]');
    });
  });

  describe('Laboratory Results Explainer', () => {
    it('should identify normal lab parameters correctly', () => {
      const result = labExplainerService.analyzeResults(
        [
          { testCode: 'hb', value: 140 },
          { testCode: 'glucose', value: 4.8 },
        ],
        true
      );

      expect(result.items.length).toBe(2);
      expect(result.items[0].status).toBe('normal');
      expect(result.items[1].status).toBe('normal');
      expect(result.overallSummaryUz).toContain('standart me\'yorlari doirasida');
    });

    it('should flag abnormal low hemoglobin and suggest Terapevt consultation', () => {
      const result = labExplainerService.analyzeResults(
        [{ testCode: 'hb', value: 95 }], // Normal is 120-160
        true
      );

      expect(result.items[0].status).toBe('low');
      expect(result.items[0].explanationUz).toContain('anemiya');
      expect(result.recommendedSpecialistUz).toBe('Terapevt');
      expect(result.disclaimerUz).toContain('MUHIM TIBBIY OGOHLANTIRISH');
    });
  });

  describe('Appointment Reminders & Consent Handling', () => {
    it('should schedule reminder and handle patient opt-out consent', () => {
      const mockAppointment: Appointment = {
        id: `test-apt-${Date.now()}`,
        patientId: 'pat-1',
        patientName: 'Dilshod Aliyev',
        patientPhone: '+998 90 111 22 33',
        doctorId: 'doc-1',
        doctorName: 'Dr. Usmonov',
        doctorSpecialty: 'Kardiolog',
        date: '2026-10-25',
        startTime: '10:00',
        endTime: '10:30',
        serviceName: 'Konsultatsiya',
        fee: 180000,
        status: 'kutilmoqda',
        queueNumber: 1,
        reminderSent: false,
        createdAt: '2026-10-24 10:00',
      };

      const reminder = reminderService.scheduleReminderForAppointment(mockAppointment, 'telegram');
      expect(reminder).toBeDefined();
      expect(reminder.status).toBe('rejalashtirilgan');
      expect(reminder.consentObtained).toBe(true);

      // Toggle opt-out
      const updated = reminderService.toggleOptOut(reminder.id, true);
      expect(updated?.consentObtained).toBe(false);
      expect(updated?.status).toBe('rad_etildi');
    });
  });
});
