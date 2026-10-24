import { LabAnalysisItem, LabAnalysisResult } from '../types/ai';
import { DoctorSpecialty } from '../types';

export interface ReferenceTestDefinition {
  code: string;
  nameUz: string;
  unit: string;
  min: number;
  max: number;
  category: 'Umumiy qon tahlili' | 'Biokimyoviy tahlil' | 'Gormonlar va vitaminlar';
  descriptionUz: string;
  lowExplanationUz: string;
  highExplanationUz: string;
  recommendedSpecialty: DoctorSpecialty;
}

export const LAB_REFERENCE_DATABASE: ReferenceTestDefinition[] = [
  {
    code: 'hb',
    nameUz: 'Gemoglobin (Hb)',
    unit: 'g/l',
    min: 120,
    max: 160,
    category: 'Umumiy qon tahlili',
    descriptionUz: 'Qondagi kislorod tashuvchi asosiy oqsil miqdori.',
    lowExplanationUz:
      'Gemoglobin me\'yordan pastligi ko\'pincha anemiya (kamqonlik), temir tanqisligi yoki toliqish bilan bog\'liq bo\'lishi mumkin.',
    highExplanationUz:
      'Gemoglobin me\'yordan yuqoriligi organizm suvsizlanishi (degidratatsiya), chekish yoki o\'pka faoliyati o\'zgarishlarida kuzatilishi mumkin.',
    recommendedSpecialty: 'Terapevt',
  },
  {
    code: 'wbc',
    nameUz: 'Leykotsitlar (WBC)',
    unit: '10^9/l',
    min: 4.0,
    max: 9.0,
    category: 'Umumiy qon tahlili',
    descriptionUz: 'Organizmning immun himoyasi va infeksiyalarga qarshi oq qon tanachalari.',
    lowExplanationUz:
      'Leykotsitlar me\'yordan pastligi immunitet pasayishi yoki yaqinda o\'tkazilgan virusli infeksiya oqibati bo\'lishi mumkin.',
    highExplanationUz:
      'Leykotsitlar yuqoriligi odatda organizmda o\'tkir yoki surunkali yallig\'lanish yoki bakterial infeksiya borligidan darak beradi.',
    recommendedSpecialty: 'Terapevt',
  },
  {
    code: 'plt',
    nameUz: 'Trombotsitlar (PLT)',
    unit: '10^9/l',
    min: 150,
    max: 400,
    category: 'Umumiy qon tahlili',
    descriptionUz: 'Qonning ivish tizimi va tomirlar yaxlitligini ta\'minlovchi hujayralar.',
    lowExplanationUz:
      'Trombotsitlar pastligi qon ivishi sekinlashuvi va qonashga moyillik xavfini ko\'rsatadi.',
    highExplanationUz:
      'Trombotsitlar yuqoriligi qon quyuqlashishi yoki yallig\'lanish reaksiyalarida kuzatiladi.',
    recommendedSpecialty: 'Terapevt',
  },
  {
    code: 'esr',
    nameUz: 'ECHT (SOE)',
    unit: 'mm/soat',
    min: 2,
    max: 15,
    category: 'Umumiy qon tahlili',
    descriptionUz: 'Eritrotsitlarning cho\'kish tezligi — yallig\'lanishning noaniq belgisi.',
    lowExplanationUz: 'ECHT pastligi kamdan-kam holatlarda klinik ahamiyatga ega.',
    highExplanationUz:
      'ECHT oshishi organizmda faol yallig\'lanish yoki infeksiya jarayoni kechayotganini ko\'rsatadi.',
    recommendedSpecialty: 'Terapevt',
  },
  {
    code: 'glucose',
    nameUz: 'Glyukoza (Qon shakari)',
    unit: 'mmol/l',
    min: 3.9,
    max: 5.9,
    category: 'Biokimyoviy tahlil',
    descriptionUz: 'Organizmning asosiy energiya manbai bo\'lgan qondagi shakar darajasi.',
    lowExplanationUz:
      'Gipoglikemiya (shakar pastligi) holsizlik, titroq va bosh aylanishiga sabab bo\'lishi mumkin.',
    highExplanationUz:
      'Giperglikemiya (shakar yuqoriligi) prediabet yoki qandli diabet xavfini ko\'rsatishi mumkin. Qayta tekshiruv va endokrinolog maslahati zarur.',
    recommendedSpecialty: 'Terapevt',
  },
  {
    code: 'cholesterol',
    nameUz: 'Umumiy xolesterin',
    unit: 'mmol/l',
    min: 3.2,
    max: 5.2,
    category: 'Biokimyoviy tahlil',
    descriptionUz: 'Qon tomirlar va hujayra pardalarini tashkil etuvchi yog\'simon modda.',
    lowExplanationUz: 'Xolesterin haddan tashqari pastligi jigar faoliyati susayganida uchrashi mumkin.',
    highExplanationUz:
      'Xolesterin yuqoriligi tomirlarda ateroskleroz pilakchalari va yurak-qon tomir kasalliklari xavfini oshiradi.',
    recommendedSpecialty: 'Kardiolog',
  },
  {
    code: 'alt',
    nameUz: 'ALT (Alaninaminotransferaza)',
    unit: 'B/l',
    min: 7,
    max: 40,
    category: 'Biokimyoviy tahlil',
    descriptionUz: 'Jigar hujayralarining holati va shikastlanishini ko\'rsatuvchi ferment.',
    lowExplanationUz: 'Klinik jihatdan xavf tug\'dirmaydi.',
    highExplanationUz:
      'ALT me\'yordan balandligi jigar to\'qimalarining zo\'riqishi, yog\' bosishi yoki dori vositalari ta\'sirini ko\'rsatishi mumkin.',
    recommendedSpecialty: 'Terapevt',
  },
  {
    code: 'ast',
    nameUz: 'AST (Aspartataminotransferaza)',
    unit: 'B/l',
    min: 10,
    max: 40,
    category: 'Biokimyoviy tahlil',
    descriptionUz: 'Yurak muskullari va jigar to\'qimalarida mavjud ferment.',
    lowExplanationUz: 'Klinik jihatdan xavfli emas.',
    highExplanationUz:
      'AST ko\'tarilishi yurak yoki jigar hujayralarining shikastlanishida kuzatilishi mumkin.',
    recommendedSpecialty: 'Kardiolog',
  },
  {
    code: 'creatinine',
    nameUz: 'Kreatinin',
    unit: 'mkmol/l',
    min: 60,
    max: 110,
    category: 'Biokimyoviy tahlil',
    descriptionUz: 'Buyraklarning filtrlash qobiliyatini baholovchi asosiy ko\'rsatkich.',
    lowExplanationUz: 'Mushak massasi kamayishi yoki kam ovqatlanishda kuzatiladi.',
    highExplanationUz:
      'Kreatinin balandligi buyraklarning tozalash faoliyati sekinlashganini yoki suvsizlanishni ko\'rsatishi mumkin.',
    recommendedSpecialty: 'Terapevt',
  },
];

export const labExplainerService = {
  // Get all predefined test templates
  getAvailableTests(): ReferenceTestDefinition[] {
    return LAB_REFERENCE_DATABASE;
  },

  // Analyze a specific set of raw inputs
  analyzeResults(
    inputs: { testCode: string; value: number }[],
    patientConsent: boolean
  ): LabAnalysisResult {
    const items: LabAnalysisItem[] = [];
    const abnormalItems: { testName: string; status: 'low' | 'high'; diff: string }[] = [];
    let primarySpecialty: DoctorSpecialty = 'Terapevt';

    inputs.forEach((input) => {
      const def = LAB_REFERENCE_DATABASE.find(
        (d) => d.code.toLowerCase() === input.testCode.toLowerCase()
      );
      if (!def) return;

      let status: 'normal' | 'low' | 'high' | 'critical' = 'normal';
      let explanationUz = 'Ko\'rsatkich standart me\'yor chegarasida.';
      let clinicalSignificanceUz =
        'Ushbu parametr optimal holatda, hozircha qo\'shimcha chora talab qilinmaydi.';

      if (input.value < def.min) {
        status = 'low';
        explanationUz = def.lowExplanationUz;
        clinicalSignificanceUz = `Qiymat me'yordan ${(def.min - input.value).toFixed(1)} ${def.unit} ga past.`;
        abnormalItems.push({ testName: def.nameUz, status: 'low', diff: `Past: ${input.value} ${def.unit}` });
        primarySpecialty = def.recommendedSpecialty;
      } else if (input.value > def.max) {
        status = 'high';
        explanationUz = def.highExplanationUz;
        clinicalSignificanceUz = `Qiymat me'yordan ${(input.value - def.max).toFixed(1)} ${def.unit} ga yuqori.`;
        abnormalItems.push({ testName: def.nameUz, status: 'high', diff: `Yuqori: ${input.value} ${def.unit}` });
        primarySpecialty = def.recommendedSpecialty;
      }

      items.push({
        id: `lab-${def.code}-${Date.now()}`,
        testName: def.nameUz,
        value: input.value,
        unit: def.unit,
        referenceRange: {
          min: def.min,
          max: def.max,
          label: `${def.min} - ${def.max} ${def.unit}`,
        },
        status,
        explanationUz,
        clinicalSignificanceUz,
      });
    });

    let overallSummaryUz = '';
    if (abnormalItems.length === 0) {
      overallSummaryUz =
        'Kiritilgan barcha tahlil ko\'rsatkichlari laboratoriya standart me\'yorlari doirasida joylashgan.';
    } else {
      const names = abnormalItems.map((a) => `${a.testName} (${a.diff})`).join(', ');
      overallSummaryUz = `Diqqat: Quyidagi ${abnormalItems.length} ta ko'rsatkich me'yordan farq qilmoqda: ${names}. Bu ko'rsatkichlar shifokor bilan qo'shimcha maslahatlashishni talab qiladi.`;
    }

    return {
      analyzedAt: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      patientConsentObtained: patientConsent,
      items,
      overallSummaryUz,
      recommendedSpecialistUz: abnormalItems.length > 0 ? primarySpecialty : undefined,
      disclaimerUz:
        '⚠️ MUHIM TIBBIY OGOHLANTIRISH: Ushbu tahliliy tushuntirish faqat axborot maqsadida berilgan bo\'lib, yakuniy tashxis hisoblanmaydi. Chetga chiqqan ko\'rsatkichlar bemorning umumiy klinik holati bilan birgalikda malakali shifokor tomonidan baholanishi shart. O\'zboshimchalik bilan dori vositalarini qabul qilmang.',
    };
  },

  // Parse text or OCR-extracted simulated lab report lines
  parseLabText(text: string): { testCode: string; value: number }[] {
    const results: { testCode: string; value: number }[] = [];
    const lower = text.toLowerCase();

    LAB_REFERENCE_DATABASE.forEach((def) => {
      // Look for code or name followed by a number
      const regex = new RegExp(`(?:${def.code}|${def.nameUz.toLowerCase().split(' ')[0]})[:\\s=]+([0-9]+(?:\\.[0-9]+)?)`, 'i');
      const match = lower.match(regex);
      if (match && match[1]) {
        const val = parseFloat(match[1]);
        if (!isNaN(val)) {
          results.push({ testCode: def.code, value: val });
        }
      }
    });

    return results;
  },
};
