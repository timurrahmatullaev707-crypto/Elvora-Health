import { describe, it, expect, beforeEach } from 'vitest';
import { detectEmergency, sanitizeTextForAi, aiService } from '../services/aiService';
import { labExplainerService } from '../services/labExplainerService';
import { reminderService } from '../services/reminderService';
import { telegramService } from '../services/telegramService';
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

    it('should recommend Terapevt and provide immediate advice for grip and fever', () => {
      const rec = aiService.findMatchingSpecialty('meni istmam chiqib grip bolib qolganman qanday tavsiya berasan');
      expect(rec).not.toBeNull();
      expect(rec?.specialty).toBe('Terapevt');

      const response = aiService.generateAutonomousClinicalResponse('meni istmam chiqib grip bolib qolganman qanday tavsiya berasan');
      expect(response.content).toContain('Terapevt');
      expect(response.content).toContain('Darhol nima qilish kerak');
      expect(response.content).toContain('suyuqlik');
    });

    it('should recommend Pediatr for child fever', () => {
      const rec = aiService.findMatchingSpecialty('bolamning isitmasi tushmayapti pediatr kerak');
      expect(rec).not.toBeNull();
      expect(rec?.specialty).toBe('Pediatr');
    });

    it('should recommend LOR for earache and sinusitis', () => {
      const rec = aiService.findMatchingSpecialty('qulog\'im sanchib burnim bitib qolgan gaymorit');
      expect(rec).not.toBeNull();
      expect(rec?.specialty).toBe('LOR');
    });

    it('should recommend Ginekolog for pregnancy issues', () => {
      const rec = aiService.findMatchingSpecialty('homiladorman qorin pastida og\'riq bor');
      expect(rec).not.toBeNull();
      expect(rec?.specialty).toBe('Ginekolog');
    });

    it('should provide clear, safe advice when user asks about medication', () => {
      const response = aiService.generateAutonomousClinicalResponse('qanday dori ichsam bo\'ladi');
      expect(response.content).toContain('xavfsiz birinchi yordam vositalari');
      expect(response.content).toContain('antibiotiklar');
    });

    it('should universally recognize joint/knee trauma and recommend Jarroh', () => {
      const rec = aiService.findMatchingSpecialty('tizzam shishib ketdi bukilmayapti zinadan tusholmayapman');
      expect(rec).not.toBeNull();
      expect(rec?.specialty).toBe('Jarroh');
    });

    it('should universally recognize high sugar/diabetes and recommend Endokrinolog', () => {
      const rec = aiService.findMatchingSpecialty('qandim 14 ga chiqib ketdi doim chanqayapman og\'zim quriyapti');
      expect(rec).not.toBeNull();
      expect(rec?.specialty).toBe('Endokrinolog');
    });

    it('should universally recognize kidney/urinary symptoms and recommend Urolog', () => {
      const rec = aiService.findMatchingSpecialty('buyragim sanchib siyganda qattiq achishyapti');
      expect(rec).not.toBeNull();
      expect(rec?.specialty).toBe('Urolog');
    });

    it('should universally recognize skin rashes/allergies and recommend Dermatolog', () => {
      const rec = aiService.findMatchingSpecialty('terimga qizil toshmalar toshib qattiq qichishyapti');
      expect(rec).not.toBeNull();
      expect(rec?.specialty).toBe('Dermatolog');
    });
  });

  describe('Telegram Confirmation Service', () => {
    it('should format clean, informative Telegram message for the patient', () => {
      const testApt: Appointment = {
        id: 'apt-test-tg',
        patientId: 'pat-1',
        patientName: 'Jasur Bekmurodov',
        patientPhone: '+998 90 123 45 67',
        doctorId: 'doc-1',
        doctorName: 'Dr. Alisher Usmonov',
        doctorSpecialty: 'Kardiolog',
        date: '2026-10-26',
        startTime: '10:00',
        endTime: '10:30',
        serviceName: 'Kardiolog birlamchi ko\'rigi',
        fee: 150000,
        status: 'kutilmoqda',
        queueNumber: 1,
        reminderSent: true,
        createdAt: '2026-10-25 22:30',
      };

      const msg = telegramService.formatConfirmationMessage(testApt, '102-xona');
      expect(msg).toContain('ELVORA HEALTH KLINIKASI');
      expect(msg).toContain('Jasur Bekmurodov');
      expect(msg).toContain('Dr. Alisher Usmonov');
      expect(msg).toContain('2026-10-26');
      expect(msg).toContain('10:00');
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
