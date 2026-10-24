import {
  AiMessage,
  EmergencyAlert,
  DoctorRecommendation,
  ClinicAiContext,
} from '../types/ai';
import { DoctorSpecialty, Doctor } from '../types';
import { doctorService } from './doctorService';
import { storageService } from './storage';
import { appointmentService } from './appointmentService';

// Redact PII (Personally Identifiable Information) before sending to external AI
export function sanitizeTextForAi(text: string): string {
  // Mask phone numbers: +998 90 123 45 67 -> [TELEFON_RAQAMI]
  let sanitized = text.replace(/(?:\+?998[\s-]?)?(?:\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2})/g, '[TELEFON_MAXFIY]');
  // Mask passport / ID numbers: AA 1234567
  sanitized = sanitized.replace(/[A-Z]{2}\s?\d{7}/gi, '[PASSPORT_MAXFIY]');
  return sanitized;
}

// Emergency red-flag symptom detectors
const EMERGENCY_TRIGGERS: { keywords: string[]; title: string; immediateAdvice: string }[] = [
  {
    keywords: [
      'yuragim qisilyapti',
      'yurak sanchyapti',
      'ko\'kragim qisilyapti',
      'ko\'krak qafasida og\'riq',
      'chap qo\'lim uvishyapti',
      'nafas ololmayapman',
      'nafas qisyapti',
      'nafas yetmayapti',
      'yurak xuruji',
      'infarkt',
    ],
    title: 'O\'tkir yurak-qon tomir yoki nafas yetishmovchiligi xavfi',
    immediateAdvice:
      'Zudlik bilan 103 Tez tibbiy yordam chaqiring! Bemorni o\'tiring, tor kiyimlarni yeching va xonaga toza havo kiriting. Hech qanday jismoniy harakat qilmang.',
  },
  {
    keywords: [
      'yuzim qiyshayib qoldi',
      'yuz qiyshayishi',
      'gapira olmayapman',
      'tilim aylanmayapti',
      'qo\'lim ishlamay qoldi',
      'falaj',
      'insult',
      'bir tomonlama zaiflik',
    ],
    title: 'Bosh miya qon aylanishining o\'tkir buzilishi (Insult) ehtimoli',
    immediateAdvice:
      'Zudlik bilan 103 Tez yordam chaqiring! FAST qoidasi: Yuz tabassumi, qo\'llarni ko\'tarish va nutqni tekshiring. Har bir daqiqa hayotiy ahamiyatga ega.',
  },
  {
    keywords: [
      'qon to\'xtamayapti',
      'kuchli qon ketishi',
      'og\'ir jarohat',
      'boshdan qattiq jarohat',
      'hushidan ketdi',
      'hushimni yo\'qotdim',
      'tutqanoq',
      'sudorogi',
    ],
    title: 'Shoshilinch travma yoki hayotiy xavfli vaziyat',
    immediateAdvice:
      'Darhol 103 Tez tibbiy yordam chaqiring! Bemor hushsiz bo\'lsa, uni yonboshlab yotqizing va nafas yo\'llarini ochiq tuting.',
  },
];

export function detectEmergency(text: string): EmergencyAlert | null {
  const lower = text.toLowerCase();
  for (const trigger of EMERGENCY_TRIGGERS) {
    const matched = trigger.keywords.some((kw) => lower.includes(kw));
    if (matched) {
      return {
        isEmergency: true,
        detectedSymptoms: trigger.keywords.filter((kw) => lower.includes(kw)),
        immediateActionUz: trigger.immediateAdvice,
        emergencyNumber: '103',
        hospitalGuidanceUz:
          'Ushbu alomatlar shoshilinch tibbiy yordamni talab qiladi. Rejali qabulga yozilish vaqtini kutmang!',
      };
    }
  }
  return null;
}

// Symptom -> Specialty recommendation mapping
const SYMPTOM_SPECIALTY_MAP: {
  specialty: DoctorSpecialty;
  keywords: string[];
  reasoning: string;
  questions: string[];
}[] = [
  {
    specialty: 'Kardiolog',
    keywords: [
      'yurak',
      'bosim',
      'davleniya',
      'davlenya',
      'puls',
      'yurak urishi',
      'gipertoniya',
      'aritmiya',
      'taxikardiya',
      'nafas qisishi',
    ],
    reasoning:
      'Qon bosimi o\'zgarishlari, yurak urish tezligi yoki yurak sohasidagi noqulayliklar kardiolog mutaxassisi ko\'rigini talab qiladi.',
    questions: [
      'Qon bosimingizni o\'lchadingizmi (oxirgi ko\'rsatkich nechida)?',
      'Og\'riq yoki bezovtalik jismoniy yuklama paytida kuchayadimi?',
      'Oyoqlarda shish yoki ertalabki bosh og\'rig\'i kuzatiladimi?',
    ],
  },
  {
    specialty: 'Nevropatolog',
    keywords: [
      'bosh og\'r',
      'boshim og\'ri',
      'migren',
      'uyqusizlik',
      'asab',
      'bel og\'r',
      'umurtqa',
      'grija',
      'oyoq uvishishi',
      'qo\'l uvishishi',
      'bosh aylanishi',
    ],
    reasoning:
      'Bosh og\'riqlari, bosh aylanishi, umurtqa pog\'onasi va oyoq-qo\'llar uvishishi asab tizimi faoliyatiga bog\'liq bo\'lib, nevropatolog ko\'rigi maqsadga muvofiq.',
    questions: [
      'Bosh og\'rig\'i qaysi sohada (peshona, chakka, ensa) va qanday xarakterda (bosuvchi, uruvchi)?',
      'Ko\'ngil aynishi, yorug\'likka yoki tovushga ta\'sirchanlik bormi?',
      'Og\'riq uyqudan keyin yengillashadimi yoki kuchayadimi?',
    ],
  },
  {
    specialty: 'Terapevt',
    keywords: [
      'shamollash',
      'isitma',
      'harorat',
      'temperatura',
      'yo\'tal',
      'tomoq',
      'holsizlik',
      'charchoq',
      'oshqozon',
      'qorin og\'rig\'i',
      'hazm',
      'ich ketishi',
      'ko\'ngil aynishi',
    ],
    reasoning:
      'Umumiy holsizlik, tana harorati ko\'tarilishi, yo\'tal yoki hazm a\'zolari faoliyati buzilishida dastlab umumiy amaliyot shifokori (terapevt) birlamchi ko\'rik o\'tkazishi tavsiya etiladi.',
    questions: [
      'Tana haroratingiz nechagacha ko\'tarildi va necha kundan beri davom etmoqda?',
      'Boshqa qo\'shimcha belgilar (yo\'tal, burun oqishi, qorin sohasida og\'riq) bormi?',
      'Surunkali kasalliklaringiz mavjudmi?',
    ],
  },
  {
    specialty: 'Pediatr',
    keywords: ['bola', 'go\'dak', 'farzand', 'chaqaloq', 'o\'g\'lim', 'qizim', 'pediatr'],
    reasoning:
      'Bolalar organizmi o\'ziga xos fiziologiyaga ega bo\'lgani sababli, har qanday shikoyatlarda bolalar shifokori (pediatr) tekshiruvi zarur.',
    questions: [
      'Bolaning yoshi nechada?',
      'Isitma yoki injiqlik, ovqatdan bosh tortish belgilari bormi?',
      'Vaktsinatsiya jadvali to\'liq bajarilganmi?',
    ],
  },
  {
    specialty: 'Stomatolog',
    keywords: ['tish', 'milk', 'tishim', 'tish og\'rig\'i', 'plomba', 'tish chirishi', 'karies'],
    reasoning:
      'Tish og\'rig\'i, milk qonashi yoki stomatologik bezovtaliklarda stomatolog ko\'rigi talab etiladi.',
    questions: [
      'Og\'riq issiq yoki sovuqqa javoban paydo bo\'ladimi?',
      'Milkda shish yoki qonash alomatlari bormi?',
    ],
  },
  {
    specialty: 'LOR',
    keywords: ['quloq', 'burun', 'gaymorit', 'eshitish', 'burun bitishi', 'angina', 'ovoz bo\'g\'ilishi'],
    reasoning:
      'Quloq og\'rig\'i, burun orqali nafas olish qiyinligi yoki ovoz bo\'g\'ilishida LOR shifokori (otorinolaringolog) ko\'rigi zarur.',
    questions: [
      'Quloqdan oqma kelishi yoki eshitish pasayishi bormi?',
      'Burun bitishi necha kundan buyon davom etmoqda?',
    ],
  },
  {
    specialty: 'Oftalmolog',
    keywords: ['ko\'z', 'ko\'rish', 'ko\'z og\'rig\'i', 'ko\'z qizarishi', 'xiralashish', 'ko\'z yoshlanishi'],
    reasoning:
      'Ko\'rish xiralashishi, ko\'z qizarishi yoki og\'riqlarda ko\'z shifokori (oftalmolog) asbobiy tekshiruvi shart.',
    questions: [
      'Ko\'rish o\'tkirligi to\'satdan pasaydimi yoki asta-sekinmi?',
      'Ko\'zda yot jism sezgisi yoki ajralma bormi?',
    ],
  },
  {
    specialty: 'Ginekolog',
    keywords: ['homiladorlik', 'hayz', 'ayollar', 'kista', 'bachadon', 'ginekolog'],
    reasoning:
      'Ayollar reproduktiv salomatligi bo\'yicha barcha masalalarda ginekolog qabuliga yozilish lozim.',
    questions: [
      'Oxirgi hayz sikli muntazam bo\'lganmi?',
      'Qorin pastki qismida og\'riqlar bezovta qiladimi?',
    ],
  },
  {
    specialty: 'Jarroh',
    keywords: ['jarohat', 'kesilish', 'pay cho\'zilishi', 'singan', 'shish', 'chiqiq', 'jarroh'],
    reasoning:
      'Ochiq jarohatlar, gematomalar yoki o\'tkir jarrohlik patologiyalari bo\'yicha jarroh tekshiruvi o\'tkaziladi.',
    questions: [
      'Jarohat qachon sodir bo\'ldi?',
      'Suyak yoki bo\'g\'imlarda harakat cheklanishi bormi?',
    ],
  },
];

export const aiService = {
  // Build real-time clinic context for the prompt
  getClinicContext(): ClinicAiContext {
    const settings = storageService.getSettings();
    const doctors = doctorService.getAll().filter((d) => d.isActive);
    return {
      clinicName: settings.clinicName,
      address: settings.address,
      phone: settings.phone,
      workingHours: settings.workingHours,
      workingDays: settings.workingDays,
      activeDoctors: doctors.map((d) => ({
        id: d.id,
        fullName: d.fullName,
        specialty: d.specialty,
        roomNumber: d.roomNumber,
        consultationFee: d.consultationFee,
        workingDays: d.workingDays,
        startHour: d.startHour,
        endHour: d.endHour,
      })),
      servicesList: [
        { name: 'Birlamchi kardiolog ko\'rigi va EKG', category: 'Kardiologiya', price: 180000 },
        { name: 'Terapevt umumiy profilaktik ko\'rigi', category: 'Terapiya', price: 120000 },
        { name: 'Nevropatolog konsultatsiyasi', category: 'Nevrologiya', price: 150000 },
        { name: 'Umumiy qon tahlili (kengaytirilgan)', category: 'Laboratoriya', price: 65000 },
        { name: 'Biokimyoviy qon tahlili (standart panel)', category: 'Laboratoriya', price: 140000 },
        { name: 'Ultratovush tekshiruvi (UZI qorin bo\'shlig\'i)', category: 'Diagnostika', price: 120000 },
      ],
    };
  },

  // Check booking intent
  detectBookingIntent(text: string): { wantsBooking: boolean; specialty?: DoctorSpecialty; doctorName?: string } {
    const lower = text.toLowerCase();
    const bookingWords = ['yozilish', 'qabul', 'uchrashuv', 'bron', 'vaqt bormi', 'shifokorga yozilmoqchiman', 'ko\'rikka yozilish'];
    const wantsBooking = bookingWords.some((w) => lower.includes(w));

    let detectedSpecialty: DoctorSpecialty | undefined;
    const specialties: DoctorSpecialty[] = [
      'Kardiolog',
      'Terapevt',
      'Nevropatolog',
      'Pediatr',
      'Stomatolog',
      'Ginekolog',
      'Jarroh',
      'Oftalmolog',
      'LOR',
    ];

    for (const spec of specialties) {
      if (lower.includes(spec.toLowerCase())) {
        detectedSpecialty = spec;
        break;
      }
    }

    return { wantsBooking, specialty: detectedSpecialty };
  },

  // Hybrid AI responder: calls real /api/chat endpoint, falls back to rich clinical rule engine
  async sendMessage(params: {
    message: string;
    conversationHistory: AiMessage[];
    patientConsent: boolean;
  }): Promise<AiMessage> {
    const { message, conversationHistory, patientConsent } = params;
    const sanitizedPrompt = sanitizeTextForAi(message);

    // 1. First priority: Check for emergency warning signs
    const emergency = detectEmergency(sanitizedPrompt);
    if (emergency) {
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
        type: 'emergency_alert',
        emergency,
        content: `🚨 **DIQQAT: SHOSHILINCH TIBBIY YORDAM ZARUR!**\n\nSiz ta'riflagan holat (${emergency.detectedSymptoms.join(', ')}) hayot uchun xavfli bo'lishi mumkin.\n\n👉 **${emergency.immediateActionUz}**\n\nKlinikaga odatiy qabulga yozilish vaqtini kutmang. Iltimos, darhol 103 ga qo'ng'iroq qiling!`,
        suggestedFollowUps: ['103 Tez yordam chaqirish', 'Yaqin shifoxonaga borish', 'Favqulodda birinchi yordam qoidalari'],
      };
    }

    // 2. Try calling the backend /api/chat (real AI) endpoint
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: sanitizedPrompt,
          history: conversationHistory.slice(-8).map((m) => ({ role: m.role, content: m.content })),
          clinicContext: this.getClinicContext(),
          patientConsent,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.reply) {
          // Check if AI response recommended a specialty
          const rec = this.findMatchingSpecialty(sanitizedPrompt);
          return {
            id: `msg-${Date.now()}`,
            role: 'assistant',
            timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
            type: rec ? 'doctor_recommendation' : 'text',
            content: data.reply,
            isDemo: Boolean(data.isDemo),
            recommendation: rec || undefined,
            suggestedFollowUps: data.suggestedFollowUps || this.generateFollowUps(sanitizedPrompt),
          };
        }
      }
    } catch {
      // Backend not running or unreachable, seamlessly proceed to clinical rule engine
    }

    // 3. Clinical Autonomous Engine (Offline/Demo Mode)
    return this.generateAutonomousClinicalResponse(sanitizedPrompt);
  },

  // Helper to find matching specialty based on user text
  findMatchingSpecialty(text: string): DoctorRecommendation | null {
    const lower = text.toLowerCase();
    for (const mapping of SYMPTOM_SPECIALTY_MAP) {
      const matches = mapping.keywords.some((k) => lower.includes(k));
      if (matches) {
        const docs = doctorService.getAll().filter((d) => d.isActive && d.specialty === mapping.specialty);
        return {
          specialty: mapping.specialty,
          recommendedDoctors: docs,
          urgencyLevel: 'routine',
          reasoningUz: mapping.reasoning,
          clarifyingQuestions: mapping.questions,
          disclaimerUz:
            'Tibbiy ogohlantirish: Ushbu tavsiya dastlabki axborot xarakteriga ega bo\'lib, aniq tashxis faqat malakali shifokor tekshiruvidan so\'ng belgilanadi.',
        };
      }
    }
    return null;
  },

  // Generate autonomous clinical response in Uzbek
  generateAutonomousClinicalResponse(prompt: string): AiMessage {
    const lower = prompt.toLowerCase();
    const context = this.getClinicContext();
    const nowTime = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

    // Check clinic info questions: hours, location, prices
    if (lower.includes('vaqt') || lower.includes('ish vaqti') || lower.includes('qachon ochiq')) {
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        timestamp: nowTime,
        type: 'clinic_info',
        isDemo: true,
        content: `🏥 **${context.clinicName} ish tartibi:**\n\n• **Ish kunlari:** ${context.workingDays}\n• **Ish soatlari:** ${context.workingHours}\n• **Manzil:** ${context.address}\n• **Bog'lanish:** ${context.phone}\n\nQaysi shifokorimiz qabuliga yozilmoqchisiz?`,
        suggestedFollowUps: ['Shifokorlar ro\'yxati', 'Xizmatlar narxi', 'Qabulga yozilish'],
      };
    }

    if (lower.includes('narx') || lower.includes('qancha') || lower.includes('to\'lov') || lower.includes('xizmatlar')) {
      const servicesListText = context.servicesList
        .map((s) => `• **${s.name}**: ${s.price.toLocaleString('uz-UZ')} UZS`)
        .join('\n');
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        timestamp: nowTime,
        type: 'clinic_info',
        isDemo: true,
        content: `💳 **${context.clinicName} asosiy tibbiy xizmatlar narxlari:**\n\n${servicesListText}\n\nBarcha shifokorlarimiz qabul narxlari va xonalari haqida batafsil ma'lumot olishingiz mumkin.`,
        suggestedFollowUps: ['Shifokorlar ro\'yxatini ko\'rish', 'Kardiolog qabuliga yozilish', 'Tahlillar bo\'yicha savol'],
      };
    }

    // Check booking request
    const bookingIntent = this.detectBookingIntent(lower);
    if (bookingIntent.wantsBooking || lower.includes('yozilish')) {
      const spec = bookingIntent.specialty || 'Terapevt';
      const availableDocs = doctorService.getAll().filter((d) => d.isActive && d.specialty === spec);
      const chosenDoc = availableDocs[0] || doctorService.getAll()[0];

      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        timestamp: nowTime,
        type: 'booking_action',
        isDemo: true,
        content: `📅 Sizni **${chosenDoc.fullName}** (${chosenDoc.specialty}) qabuliga yozishimiz mumkin.\n\nQuyidagi interaktiv kartadan qulay sana va vaqtni tanlang, so'ngra qabulni tasdiqlang:`,
        bookingDraft: {
          doctorId: chosenDoc.id,
          doctorName: chosenDoc.fullName,
          specialty: chosenDoc.specialty,
          date: new Date().toISOString().slice(0, 10),
          timeSlot: chosenDoc.startHour || '09:00',
          patientName: '',
          patientPhone: '',
          fee: chosenDoc.consultationFee,
          confirmed: false,
        },
        suggestedFollowUps: ['Boshqa shifokor tanlash', 'Klinika manzili', 'Bekor qilish'],
      };
    }

    // Check symptom matching
    const recommendation = this.findMatchingSpecialty(lower);
    if (recommendation) {
      const docNames = recommendation.recommendedDoctors.map((d) => `• **${d.fullName}** (${d.specialty}, Xona ${d.roomNumber}, ${d.consultationFee.toLocaleString('uz-UZ')} UZS)`).join('\n');
      const questionsText = recommendation.clarifyingQuestions?.map((q) => `— ${q}`).join('\n') || '';

      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        timestamp: nowTime,
        type: 'doctor_recommendation',
        isDemo: true,
        recommendation,
        content: `Siz aytgan shikoyatlar bo'yicha **${recommendation.specialty}** shifokoriga murojaat qilishni tavsiya qilaman.\n\n💡 **Nima uchun:** ${recommendation.reasoningUz}\n\n🔍 **Vaziyatni aniqroq tushunish uchun:**\n${questionsText}\n\n👨‍⚕️ **Klinikamizdagi mos mutaxassislar:**\n${docNames}\n\n⚠️ *Eslatma: Bu dastlabki yo'naltirish xolos. AI aniq tashxis qo'ymaydi va dori-darmon buyurmaydi.*`,
        suggestedFollowUps: [
          `${recommendation.specialty} qabuliga yozilish`,
          'Boshqa alomatlarim ham bor',
          'Tahlil natijalarini ko\'rsatish',
        ],
      };
    }

    // General helpful answer in Uzbek
    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      timestamp: nowTime,
      type: 'text',
      isDemo: true,
      content: `Assalomu alaykum! Men **Elvora AI™** — klinikaning aqlli tibbiy yordamchisiman.\n\nSizga qanday yordam bera olaman?\n\n• Qaysi mutaxassisga uchrashishni bilmayotgan bo'lsangiz — **alomatlaringizni yozing**\n• Shifokor qabuliga — **to'g'ridan-to'g'ri yoziling**\n• Laboratoriya tahlil ko'rsatkichlarini — **soddaroq tushunib oling**\n• Klinika ish vaqtlari va xizmat narxlarini — **bilib oling**`,
      suggestedFollowUps: [
        'Bosh og\'rig\'i bo\'yicha qaysi shifokorga boray?',
        'Kardiolog ko\'rigiga yozilish',
        'Tahlil natijalarini tushuntirish',
        'Klinika ish vaqti va narxlar',
      ],
    };
  },

  generateFollowUps(prompt: string): string[] {
    const lower = prompt.toLowerCase();
    if (lower.includes('bosh') || lower.includes('og\'r')) {
      return ['Nevropatolog qabuliga yozilish', 'Bosim o\'lchash tavsiyalari', 'Tahlillar topshirish'];
    }
    if (lower.includes('yurak') || lower.includes('bosim')) {
      return ['Kardiolog ko\'rigiga yozilish', 'EKG tahlili narxi', 'Qon bosimi kundaligi'];
    }
    return [
      'Shifokorga yozilish',
      'Klinika manzili va telefonlari',
      'Tahlillar bo\'yicha savol',
    ];
  },
};
