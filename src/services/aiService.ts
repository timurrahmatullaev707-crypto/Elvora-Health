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
  let sanitized = text.replace(/(?:\+?998[\s-]?)?(?:\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2})/g, '[TELEFON_MAXFIY]');
  sanitized = sanitized.replace(/[A-Z]{2}\s?\d{7}/gi, '[PASSPORT_MAXFIY]');
  return sanitized;
}

// Emergency red-flag symptom detectors (Level 1 Triage)
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
      'Zudlik bilan 103 Tez tibbiy yordam chaqiring! Bemorni yarim o\'tirgan holatda tinchlantiring, tor kiyimlarni yeching va xonaga toza havo kiriting. Hech qanday jismoniy harakat qilmang.',
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

// Symptom -> Specialty recommendation mapping with comprehensive clinical guidelines
export interface SymptomSpecialtyGuide {
  specialty: DoctorSpecialty;
  keywords: string[];
  conditionNameUz: string;
  reasoning: string;
  immediateActionsUz: string[];
  forbiddenActionsUz?: string[];
  dangerFlagsUz: string;
  questions: string[];
}

const SYMPTOM_SPECIALTY_MAP: SymptomSpecialtyGuide[] = [
  {
    specialty: 'Terapevt',
    keywords: [
      'grip', 'gripp', 'grippman', 'istma', 'istmam', 'isitma', 'isitmayapman', 'harorat', 'temperatura',
      'shamollash', 'shamollab', 'shamollaganman', 'sovqotdim', 'sovqotib', 'yo\'tal', 'yotal', 'yo\'talyapman',
      'tomoq', 'tomog\'im', 'tomoq og\'ri', 'balg\'am', 'angina', 'bronxit', 'pnevmoniya', 'zotiljam',
      'holsizlik', 'holsiz', 'charchoq', 'titroq', 'qaltirash', 'suyaklarim qaqshab', 'suyaklar qaqshashi',
      'kasalman', 'kasal bo\'lib', 'og\'rib qoldim', 'mazam yo\'q', 'davolanish', 'tavsiya', 'limfa', 'bo\'yinda shish',
      'anemiya', 'qon kamlik', 'gemoglobin', 'immunitet', 'charchash'
    ],
    conditionNameUz: 'O\'tkir respirator infeksiya (Grip/Shamollash) yoki umumiy intoksikatsiya',
    reasoning:
      'Tana harorati ko\'tarilishi, holsizlik, shamollash, yo\'tal yoki intoksikatsiya umumiy terapevtik ko\'rik va stetoskop bilan o\'pka/bronxlarni eshitishni talab qiladi.',
    immediateActionsUz: [
      'Ko\'p miqdorda iliq suyuqlik iching (limonli ko\'k choy, na\'matak damlamasi, malina va iliq suv) — kuniga kamida 2.5–3 litr. Bu organizmdagi virusli intoksikatsiyani yuvib chiqaradi.',
      'Qat\'iy yotoq rejimi: barcha og\'ir jismoniy harakatlar va zo\'riqishlarni to\'xtating, organizm kuchini infeksiyani yengishga qaratishi zarur.',
      'Harorat nazorati: Agar tana harorati 38.5°C dan yuqori bo\'lsa, 500 mg Paratsetamol yoki 400 mg Ibuprofen qabul qiling. 38.5°C gacha bo\'lsa organizm tabiiy immunitet ishlab chiqarayotgani sababli tushirish shart emas.',
      'Tomoq va burun gigiyenasi: Tomoqni iliq sho\'r suv (1 stakan iliq suvga 1 choy qoshiq tuz) yoki furasilin eritmasi bilan kuniga 4-5 marta g\'arg\'ara qilib chayib turing.',
    ],
    forbiddenActionsUz: [
      'Shifokor ko\'rigisiz va retseptisiz o\'zboshimchalik bilan antibiotik ichmang! Antibiotiklar viruslarga ta\'sir qilmaydi va immunitetni tushiradi.',
      'Aspirin (atsetilsalitsil kislotasi) ichish tavsiya etilmaydi, ayniqsa bolalarga.',
      'Qorin sohasida og\'riq bo\'lsa, aslo unga issiq grelka qo\'ymang.',
    ],
    dangerFlagsUz:
      'Agar nafas qisishi, ko\'krakda og\'riq, lablarning ko\'karishi yoki tana harorati 3 kundan ortiq 39°C dan tushmasa — zudlik bilan 103 Tez yordam chaqiring!',
    questions: [
      'Tana haroratingiz hozir aynan necha darajada?',
      'Yo\'tal quruqmi yoki balg\'am bormi?',
      'Necha kundan beri bezovta qilyapti?',
    ],
  },
  {
    specialty: 'Kardiolog',
    keywords: [
      'yurak', 'yuragim', 'yurakda', 'yuragim sanchyapti', 'yurak sanchishi', 'bosim', 'bosimim', 'davleniya',
      'davlenya', 'davleniyam', 'gipertoniya', 'gipotoniya', 'puls', 'yurak urishi', 'yurak tez uryapti',
      'taxikardiya', 'aritmiya', 'hansirash', 'nafas qisishi', 'ko\'krak', 'ko\'kragim', 'ko\'krak qafasida',
      'ko\'kragim qis', 'yurak xuruji', 'varikoz', 'tromboz', 'yurak og\'rig\'i'
    ],
    conditionNameUz: 'Yurak-qon tomir tizimi funksional buzilishi (Arterial gipertoniya / Taxikardiya / Aritmiya)',
    reasoning:
      'Qon bosimi oshishi, yurakning notekis yoki tez urishi hamda ko\'krak qafasidagi bosim kardiolog shifokori ko\'rigi va EKG apparat tekshiruvini talab etadi.',
    immediateActionsUz: [
      'Darhol yarim o\'tirgan yoki qulay holatda tinchlaning. Har qanday jismoniy zo\'riqishni mutlaqo to\'xtating.',
      'Xona derazasini ochib toza havo kiriting, tor yoqa, galstuk va kiyimlarni yeching.',
      'Tonometr bilan qon bosimingiz va pulsingizni o\'lchab, ko\'rsatkichni yozib boring.',
      'Agar avval kardiolog tayinlagan bosim tushiruvchi dorilaringiz bo\'lsa, qabul qiling.',
    ],
    forbiddenActionsUz: [
      'Qahva, energetik ichimliklar va chekish qat\'iyan man etiladi.',
      'Issiq dush yoki issiq vanna qabul qilmang (yurakka xavfli yuk tushadi).',
      'Shifokor ko\'rsatmasisiz kuchli yurak dorilarini o\'zboshimchalik bilan ichmang.',
    ],
    dangerFlagsUz:
      'Agar ko\'krakda kuchli siquvchi, kuydiruvchi og\'riq chap qo\'lga yoki jag\'ga tarqalsa, sovuq ter bosishi kuzatilsa — bu infarkt xavfi, zudlik bilan 103 Tez yordam chaqiring!',
    questions: [
      'Hozirgi qon bosimingiz va pulsingiz nechada?',
      'Ko\'krak sohasida siqilish hissi bormi?',
      'Yurak kasalliklari bo\'yicha avval davolanganmisiz?',
    ],
  },
  {
    specialty: 'Nevropatolog',
    keywords: [
      'bosh', 'boshim', 'bosh og\'r', 'boshim og\'ri', 'boshim og\'riyapti', 'migren', 'uyqusizlik', 'uyqum',
      'uyqum qochgan', 'bosh aylanishi', 'boshim aylanyapti', 'asab', 'asabiylash', 'nerv', 'depressiya',
      'stress', 'panik', 'vahima', 'qo\'l uvishishi', 'oyoq uvishishi', 'ense', 'peshona', 'chakka',
      'bel og\'r', 'belim', 'umurtqa', 'grija', 'churra', 'osteoxondroz', 'radikulit', 'nerv shamollashi', 'titrash'
    ],
    conditionNameUz: 'Bosh miya qon-tomir spazmi, migren yoki umurtqa-nerv kompressiyasi',
    reasoning:
      'Bosh og\'rig\'i, bosh aylanishi, uyqusizlik yoki qo\'l-oyoq uvishishi asab tizimi va qon tomir disfunksiyasiga bog\'liq bo\'lib, nevropatolog tekshiruvini talab qiladi.',
    immediateActionsUz: [
      'Qorong\'i, sokin va salqin xonada 30-40 daqiqa yotib dam oling.',
      'Peshona va chakka sohasiga salqin nam sochiq qo\'ying, chakkalarni yengil barmoqlar bilan uqalang.',
      'Qon bosimingizni o\'lchang (bosh og\'rig\'i bosim o\'zgarishi bilan to\'g\'ridan-to\'g\'ri bog\'liq bo\'lishi mumkin).',
      'Smartfon, kompyuter va televizor ekranlaridan butunlay chetlaning.',
      'Iliq moychechak (romashka) yoki yalpizli choy iching.',
    ],
    forbiddenActionsUz: [
      'Kuchli og\'riq qoldiruvchi dorilarni dozasidan oshirib ichmang.',
      'Bosh aylanganda keskin o\'rningizdan turmang.',
    ],
    dangerFlagsUz:
      'Agar yuzingizda qiyshayish, qo\'l yoki oyoqda to\'satdan zaiflik, tilda gapira olmaslik paydo bo\'lsa — bu insult xavfi, darhol 103 ga qo\'ng\'iroq qiling!',
    questions: [
      'Og\'riq bosuvchi, uruvchi (pulsatsiya) yoki sanchuvchi xarakterdami?',
      'Ko\'ngil aynishi yoki yorug\'likka sezgirlik bormi?',
      'Oxirgi marta qon bosimingiz qanday bo\'ldi?',
    ],
  },
  {
    specialty: 'Gastroenterolog',
    keywords: [
      'oshqozon', 'oshqozonim', 'qorin', 'qornim', 'hazm', 'ich ketishi', 'ichim ketdi', 'diareya',
      'ko\'ngil aynishi', 'qusish', 'zaharlanish', 'otravleniye', 'zarda', 'jigar', 'jigarim', 'safro',
      'gastrit', 'yara', 'yazva', 'pankreatit', 'o\'t qopi', 'o\'t toshi', 'kolit', 'ich qotishi',
      'qabziyat', 'meteorizm', 'qorin dam', 'gemorroy', 'bavosil', 'qorin sanchishi'
    ],
    conditionNameUz: 'Oshqozon-ichak trakti patologiyasi (Gastrit / Pankreatit / Dispepsiya / Toksikoinfeksiya)',
    reasoning:
      'Qorin og\'rig\'i, ko\'ngil aynishi, zarda, ich buzilishi yoki jigardagi og\'irlik gastroenterolog ko\'rigi va UZI tekshiruvini talab qiladi.',
    immediateActionsUz: [
      'Ko\'p miqdorda toza iliq suv yoki retsidron eritmasini oz-ozdan tez-tez iching (suvsizlanishning oldini olish).',
      'Toksinlarni bog\'lash uchun Smekta yoki Faollashtirilgan ko\'mir (har 10 kg vaznga 1 tabletka) qabul qiling.',
      'Yog\'li, qovurilgan, achchiq, sho\'r taomlar va gazlangan ichimliklardan butunlay tiyiling.',
      'Kuchli spazmda No-shpa (drotaverin) qabul qilish mumkin.',
    ],
    forbiddenActionsUz: [
      'Qorin sohasiga aslo issiq grelka qo\'ymang (ichki yallig\'lanishni kuchaytirib yuboradi).',
      'Shifokor ko\'rmaguncha o\'zboshimchalik bilan kuchli analgetiklar ichmang (appenditsit manzarasini yashirishi mumkin).',
    ],
    dangerFlagsUz:
      'Agar o\'ng biqinda to\'xtovsiz o\'tkir og\'riq (appenditsit xavfi), qon aralash qusish yoki qora najas kuzatilsa — darhol 103 Tez yordam chaqiring!',
    questions: [
      'Og\'riq ovqatdan oldinmi yoki ovqatdan keyin kuchayadimi?',
      'Ko\'ngil aynishi yoki tana harorati bormi?',
    ],
  },
  {
    specialty: 'Endokrinolog',
    keywords: [
      'qand', 'saxar', 'diabet', 'qandli diabet', 'shakar', 'chanqash', 'doim chanqayapman', 'og\'iz qurishi',
      'vazn yo\'qotish', 'semizlik', 'qalqonsimon', 'qalqonsimon bez', 'zob', 'bo\'qoq', 'gormon', 'gormonlar',
      'terlash', 'ko\'p terlash', 'soch to\'kilishi', 'podagra', 'tuz yig\'ilishi'
    ],
    conditionNameUz: 'Endokrin tizim va modda almashinuvi buzilishi (Qandli diabet / Tireoid disfunksiya)',
    reasoning:
      'Qon shakarining ko\'tarilishi, chanqoqlik, keskin vazn o\'zgarishi yoki bo\'qoq belgilari endokrinolog tekshiruvi va gormonal tahlillarni talab qiladi.',
    immediateActionsUz: [
      'Glyukometr yordamida qon shakari miqdorini zudlik bilan o\'lchang va qayd qiling.',
      'Shirinliklar, xamir ovqatlar, shakarli ichimliklar va tez hazm bo\'luvchi uglevodlardan butunlay tiyiling.',
      'Ko\'p miqdorda toza gazsiz suv iching.',
      'Tinchlaning va jismoniy zo\'riqishlardan saqlaning.',
    ],
    forbiddenActionsUz: [
      'Shifokor ko\'rsatmasisiz o\'zboshimchalik bilan insulin yoki gormon dozalarini o\'zgartirmang.',
    ],
    dangerFlagsUz:
      'Agar qon shakari 15 mmol/l dan oshsa, og\'izdan atseton hidi kelsa yoki hush chalkashligi kuzatilsa — zudlik bilan 103 Tez yordam chaqiring!',
    questions: [
      'Oxirgi marta qon shakaringiz necha chiqdi?',
      'Qalqonsimon bez bo\'yicha avval tekshirilganmisiz?',
    ],
  },
  {
    specialty: 'Urolog',
    keywords: [
      'buyrak', 'buyragim', 'buyrak sanchishi', 'belim og\'riyapti', 'peshob', 'siydik', 'sistit', 'tsistit',
      'siyganda achishish', 'tez-tez siyish', 'qonli siydik', 'prostata', 'prostatit', 'tosh', 'buyrakda tosh',
      'siydik qistashi', 'enurez'
    ],
    conditionNameUz: 'Siydik-tanosil tizimi yallig\'lanishi (Piyelonefrit / Tsistit / Siydik-tosh kasalligi)',
    reasoning:
      'Bel sohasidagi sanchiq, siydik chiqarishda og\'riq yoki buyrak bezovtaligi urolog-nefrolog ko\'rigi va buyraklar UZIsini talab qiladi.',
    immediateActionsUz: [
      'Ko\'p miqdorda iliq suyuqlik (brusnika, klyukva morsi, toza suv) iching.',
      'Bel va chov sohasini issiq tuting, oyoqlarni sovuqdan asrang.',
      'Sanchiq og\'rig\'ida spazmolitik (No-shpa / Drotaverin) qabul qilish mumkin.',
    ],
    forbiddenActionsUz: [
      'O\'zboshimchalik bilan kuchli siydik haydovchi dorilar ichmang (tosh siljib siydik yo\'lini to\'sib qo\'yishi mumkin).',
    ],
    dangerFlagsUz:
      'Agar siydik kelishi butunlay to\'xtasa, kuchli qon kelsa yoki 39°C titroq bilan chidab bo\'lmas og\'riq bo\'lsa — darhol 103 Tez yordam chaqiring!',
    questions: [
      'Siydik chiqarishda achishish yoki og\'riq bormi?',
      'Tana haroratingiz ko\'tarilganmi?',
    ],
  },
  {
    specialty: 'Dermatolog',
    keywords: [
      'teri', 'terim', 'toshma', 'toshmalar', 'qichishish', 'qichima', 'qizarish', 'allergiya', 'allergik',
      'dog\'', 'qizil dog\'', 'ekzema', 'psoriaz', 'temiratki', 'akne', 'husnbuzar', 'qavariq', 'zamburug\'',
      'gribok', 'tirnoq', 'eshakemi', 'krapivnitsa', 'kuyish', 'quyoshda kuyish'
    ],
    conditionNameUz: 'Dermatologik yoki allergik teri patologiyasi (Allergik dermatit / Ekzema / Psoriaz)',
    reasoning:
      'Teridagi toshmalar, qichishish, qizarish yoki zamburug\'li o\'zgarishlar dermatolog shifokori dermatoskopik ko\'rigini talab etadi.',
    immediateActionsUz: [
      'Ehtimoliy allergen bilan aloqani darhol to\'xtating (yangi kosmetika, taom, kimyoviy vosita).',
      'Qichishishni kamaytirish uchun antigistamin dori (Tsetirizin, Suprastin yoki Loratadin) qabul qiling.',
      'Terini sovuq suv bilan yuvib, toza paxta mato bilan ehtiyotkorlik bilan quriting.',
      'Qichiyotgan joyni qashlamang (infeksiya tushishining oldini olish uchun).',
    ],
    forbiddenActionsUz: [
      'Toshmalarni siqmang, igna bilan teshmang.',
      'Toshmalar ustiga yod, zelenka yoki spirt surtmang (teri kuyishi va shifokor tashxisiga to\'sqinlik qiladi).',
    ],
    dangerFlagsUz:
      'Agar toshma bilan birga tomoq yoki yuzda shish, nafas qisishi paydo bo\'lsa (Kvinke shishi) — zudlik bilan 103 Tez yordam chaqiring!',
    questions: [
      'Toshma qachon paydo bo\'ldi va qaysi sohalarga tarqaldi?',
      'Yaqinda yangi dori yoki noodatiy ovqat yedingizmi?',
    ],
  },
  {
    specialty: 'Jarroh',
    keywords: [
      'jarohat', 'kesilish', 'travma', 'singan', 'suyak', 'bo\'g\'im', 'chiqiq', 'lat yeyish', 'churra',
      'grija', 'jarroh', 'yara', 'qon ketishi', 'appenditsit', 'biqin', 'pay cho\'zilishi', 'tizza',
      'tovon', 'shpor', 'shishib ketdi', 'bukilmayapti', 'artroz', 'artrit', 'sinish', 'pay'
    ],
    conditionNameUz: 'Travmatologik, ortopedik yoki jarrohlik patologiyasi (Jarohat / Bo\'g\'im artrozi / Churra)',
    reasoning:
      'Bo\'g\'imdagi og\'riq, shish, suyak sinishi, lat yeyish yoki churra belgilari jarroh-travmatolog ko\'rigi va rentgen/UZI tekshiruvini talab qiladi.',
    immediateActionsUz: [
      'Shikastlangan sohani to\'liq harakatsiz holatda saqlang (fiksatsiya qiling, oyoqqa/qo\'lga yuk tushirmang).',
      'Yopiq jarohat yoki shishda sochiqqa o\'ralgan muz yoki sovuq kompress qo\'ying (15-20 daqiqa).',
      'Ochiq yara bo\'lsa, toza bint bilan bog\'lang.',
      'Bo\'g\'imni elastik bint bilan qon aylanishini to\'xtatmagan holda yengil fiksatsiya qiling.',
    ],
    forbiddenActionsUz: [
      'Chiqqan bo\'g\'im yoki singan suyakni o\'zboshimchalik bilan to\'g\'irlashga urinmang.',
      'Yangi jarohatga yoki shishga issiq kompress qo\'ymang.',
    ],
    dangerFlagsUz:
      'Agar to\'xtovsiz kuchli qon ketishi, o\'ng biqinda to\'xtovsiz o\'tkir og\'riq yoki suyak qiyshayishi bo\'lsa — zudlik bilan 103 Tez yordam chaqiring!',
    questions: [
      'Jarohat qachon yuz berdi va suyak harakatlanadimi?',
      'Bo\'g\'imda qizish yoki qizarish bormi?',
    ],
  },
  {
    specialty: 'LOR',
    keywords: [
      'quloq', 'qulog\'im', 'eshitish', 'otit', 'burun', 'burnim', 'gaymorit', 'sinusit', 'burun bitishi',
      'tumov', 'ovozim bo\'g\'ildi', 'ovoz yo\'qolishi', 'tomoq og\'riyapti', 'yiring', 'faringit', 'laringit',
      'quloq og\'ri', 'quloq shang\'illashi'
    ],
    conditionNameUz: 'Quloq-burun-tomoq a\'zolarining o\'tkir yallig\'lanishi (Gaymorit / Otit / Tonzillit)',
    reasoning:
      'Quloq sanchishi, burun orqali nafas olish to\'xtashi yoki surunkali tomoq og\'rig\'i LOR mutaxassisi (Otorinolaringolog) asbobiy ko\'rigini talab qiladi.',
    immediateActionsUz: [
      'Burunni dengiz tuzi asosidagi sprey (akvamaris) yoki iliq sho\'r suv bilan tozalab turing.',
      'Tomoqni iliq moychechak damlamasi yoki furasilin bilan kuniga 4-5 marta chayib turing.',
      'Iliq suyuqliklar iching, quloq va bo\'yin sohasini sovuq shamoldan asrang.',
    ],
    forbiddenActionsUz: [
      'Quloqqa o\'zboshimchalik bilan qizdiruvchi spirt, kerosin yoki yog\' tomizmang.',
      'Burunni kuch bilan qattiq qoqmang (infeksiya o\'rta quloqqa o\'tib ketishi mumkin).',
    ],
    dangerFlagsUz:
      'Agar quloqdan qon yoki yiring kelsa, yuz suyagida kuchli lo\'qillovchi og\'riq bo\'lsa — darhol LOR shifokoriga ko\'rining!',
    questions: [
      'Quloq ichida sanchiq yoki eshitish pasayishi bormi?',
      'Burundan ajralma qanday rangda (tiniq, sarg\'ish, yashil)?',
    ],
  },
  {
    specialty: 'Stomatolog',
    keywords: [
      'tish', 'tishim', 'tishim og\'riyapti', 'milk', 'milklarim', 'flyus', 'karies', 'plomba', 'jag\'',
      'og\'iz', 'tish og\'rig\'i', 'tish chirishi', 'stomatit', 'og\'izda yara'
    ],
    conditionNameUz: 'O\'tkir stomatologik yallig\'lanish (Karies / Pulpit / Milk yallig\'lanishi / Stomatit)',
    reasoning:
      'Tishdagi og\'riq, milk shishi yoki og\'iz shilliq qavati yaralari stomatolog ko\'rigi va professional davolashini talab qiladi.',
    immediateActionsUz: [
      'Og\'iz bo\'shlig\'ini iliq sho\'r suv (1 stakan iliq suvga 1 choy qoshiq tuz + soda) bilan chayib turing.',
      'Og\'riqni yengillatish uchun Ibuprofen (400 mg) yoki Paratsetamol qabul qiling.',
      'Og\'riyotgan tish bilan qattiq va shirin ovqat chaynamang.',
    ],
    forbiddenActionsUz: [
      'Yuzning og\'riyotgan tashqi tomoniga issiq grelka qo\'ymang (yiring tarqalishi xavfi bor).',
      'Tish ustiga to\'g\'ridan-to\'g\'ri aspirin tabletkasini qo\'ymang (milk shilliq qavatini kuydiradi).',
    ],
    dangerFlagsUz:
      'Agar yuzingizda yoki bo\'yningizda sezilarli shish paydo bo\'lsa, tana harorati ko\'tarilsa — darhol shoshilinch stomatologik yordamga boring!',
    questions: [
      'Og\'riq sovuq yoki issiq taomdan keyin kuchayadimi?',
      'Milk sohasida shish yoki qonash bormi?',
    ],
  },
  {
    specialty: 'Pediatr',
    keywords: [
      'bola', 'bolam', 'go\'dak', 'chaqaloq', 'o\'g\'lim', 'qizim', 'farzandim', 'bolalar', 'pediatr', 'bolada isitma'
    ],
    conditionNameUz: 'Bolalar organizmi infeksion yoki somatik holati',
    reasoning:
      'Bolalar anatomiyasi va fiziologiyasi o\'ziga xos bo\'lib, har qanday shikoyatlarda bolalar shifokori (pediatr) tekshiruvi shart.',
    immediateActionsUz: [
      'Bolaga oz-ozdan tez-tez iliq suyuqlik ichiring (suvsizlanishning oldini olish uchun).',
      'Agar isitma 38.5°C dan oshsa, faqat bolalar uchun mo\'ljallangan paratsetamol yoki ibuprofen siropini (bolaning vazniga mos dozada) bering.',
      'Bolani qalin kiyintirmang, xonani har 2 soatda shamollatib turing.',
    ],
    forbiddenActionsUz: [
      'Bolalarga mutlaqo Aspirin (atsetilsalitsil kislotasi) yoki analgin bermang (Reye sindromi xavfi)!',
      'Bolani spirt yoki sirka bilan ishqalamang (teri orqali intoksikatsiya xavfi bor).',
    ],
    dangerFlagsUz:
      'Agar bola holsiz bo\'lib ko\'p uxlasa, ovqat va suvdan butunlay bosh tortsa yoki talvasa (sudorogi) kuzatilsa — darhol 103 Tez yordam chaqiring!',
    questions: [
      'Bolaning yoshi va oxirgi tana harorati nechada?',
      'Emizish yoki ovqatlanish holati qanday?',
    ],
  },
  {
    specialty: 'Ginekolog',
    keywords: [
      'homilador', 'homiladorlik', 'hayz', 'ginekolog', 'kista', 'bachadon', 'toksikoz', 'ayollar', 'ayol', 'ajralma', 'homila'
    ],
    conditionNameUz: 'Ginekologik holat yoki homiladorlik davri kuzatuvi',
    reasoning:
      'Ayollar reproduktiv salomatligi, hayz sikli o\'zgarishlari yoki homiladorlikdagi shikoyatlar ginekolog ko\'rigi va UZI tekshiruvini talab qiladi.',
    immediateActionsUz: [
      'To\'liq dam oling, og\'ir jismoniy zo\'riqishlardan va yuk ko\'tarishdan saqlaning.',
      'Qorin sohasini sovuqdan asrang, iliq kiyining.',
      'Spazm bo\'lsa, No-shpa qabul qilish mumkin.',
    ],
    forbiddenActionsUz: [
      'Issiq vanna yoki saunaga borish qat\'iyan taqiqlanadi.',
      'O\'zboshimchalik bilan gormonal yoki qon to\'xtatuvchi dorilar ichmang.',
    ],
    dangerFlagsUz:
      'Agar homiladorlikda qonli ajralma yoki qorin pastida to\'xtovsiz o\'tkir og\'riq paydo bo\'lsa — darhol 103 Tez yordam chaqiring!',
    questions: [
      'Homiladorlik ehtimoli bormi?',
      'Oxirgi hayz qaysi sanada bo\'lgan?',
    ],
  },
  {
    specialty: 'Oftalmolog',
    keywords: [
      'ko\'z', 'ko\'zim', 'ko\'zlarim', 'ko\'rish', 'ko\'rishim', 'xiralashish', 'ko\'z qizarishi', 'arpa', 'konyunktivit', 'oftalmolog', 'ko\'zoynak'
    ],
    conditionNameUz: 'Ko\'rish a\'zolari yallig\'lanishi (Konyunktivit / Arpa donasi / Ko\'z zo\'riqishi)',
    reasoning:
      'Ko\'zdagi qizarish, og\'riq, yiringlash yoki ko\'rish xiralashuvi oftalmolog asbobiy tekshiruvini talab qiladi.',
    immediateActionsUz: [
      'Ko\'zlarni toza qaynatilgan iliq suv yoki damlangan qora choy paxtasi bilan artib tozalang.',
      'Kontakt linzalardan foydalanayotgan bo\'lsangiz, zudlik bilan yeching.',
      'Ko\'zni yorug\'likdan quyosh ko\'zoynagi bilan himoyalang.',
    ],
    forbiddenActionsUz: [
      'Ko\'zni iflos qo\'llar bilan ishqalamang.',
      'Shifokor retseptisiz gormonal yoki kuchli antibiotik tomchilarni tomizmang.',
    ],
    dangerFlagsUz:
      'Agar ko\'rish keskin yo\'qolsa yoki ko\'z ichida kuchli o\'tkir og\'riq paydo bo\'lsa — darhol oftalmologga shoshilinch boring!',
    questions: [
      'Ko\'zda yiring yoki yosh oqishi bormi?',
      'Ko\'rish ravshanligi pasaydimi?',
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
        { name: 'Birlamchi kardiolog ko\'rigi va EKG', category: 'Kardiologiya', price: 150000 },
        { name: 'Terapevt umumiy profilaktik ko\'rigi', category: 'Terapiya', price: 120000 },
        { name: 'Nevropatolog konsultatsiyasi', category: 'Nevrologiya', price: 160000 },
        { name: 'Pediatr birlamchi ko\'rigi', category: 'Pediatriya', price: 110000 },
        { name: 'Jarroh ko\'rigi va bog\'lov', category: 'Xirurgiya', price: 180000 },
        { name: 'Ginekolog maslahati va UZI', category: 'Ginekologiya', price: 140000 },
        { name: 'LOR konsultatsiyasi', category: 'LOR', price: 130000 },
        { name: 'Stomatolog ko\'rigi', category: 'Stomatologiya', price: 140000 },
        { name: 'Oftalmolog ko\'z tekshiruvi', category: 'Oftalmologiya', price: 135000 },
        { name: 'Urolog ko\'rigi va UZI', category: 'Urologiya', price: 160000 },
        { name: 'Dermatolog ko\'rigi', category: 'Dermatologiya', price: 130000 },
        { name: 'Endokrinolog konsultatsiyasi', category: 'Endokrinologiya', price: 145000 },
        { name: 'Gastroenterolog qabuli', category: 'Gastroenterologiya', price: 140000 },
        { name: 'Umumiy qon tahlili (kengaytirilgan)', category: 'Laboratoriya', price: 65000 },
      ],
    };
  },

  // Check booking intent
  detectBookingIntent(text: string): { wantsBooking: boolean; specialty?: DoctorSpecialty; doctorName?: string } {
    const lower = text.toLowerCase();
    const bookingWords = [
      'yozilish', 'qabul', 'uchrashuv', 'bron', 'vaqt bormi', 'shifokorga yozilmoqchiman',
      'ko\'rikka yozilish', 'qabuliga yozib qo\'y', 'qabulga yozmoqchiman', 'yozib qo\'ying'
    ];
    const wantsBooking = bookingWords.some((w) => lower.includes(w));

    let detectedSpecialty: DoctorSpecialty | undefined;
    const specialties: DoctorSpecialty[] = [
      'Kardiolog', 'Terapevt', 'Nevropatolog', 'Pediatr', 'Stomatolog', 'Ginekolog',
      'Jarroh', 'Oftalmolog', 'LOR', 'Urolog', 'Dermatolog', 'Endokrinolog', 'Gastroenterolog'
    ];

    for (const spec of specialties) {
      if (lower.includes(spec.toLowerCase())) {
        detectedSpecialty = spec;
        break;
      }
    }

    return { wantsBooking, specialty: detectedSpecialty };
  },

  // Hybrid AI responder: calls real /api/chat endpoint, falls back to Universal Clinical AI Engine
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

    // 2. Try calling backend /api/chat if configured with external LLM
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
      // Backend not running, proceed to universal autonomous engine
    }

    // 3. Universal Clinical Autonomous Engine (Universal Medical AI)
    return this.generateAutonomousClinicalResponse(sanitizedPrompt);
  },

  // Helper to find matching symptom guide
  findMatchingGuide(text: string): SymptomSpecialtyGuide | null {
    const lower = text.toLowerCase();
    let bestMatch: SymptomSpecialtyGuide | null = null;
    let maxMatchCount = 0;

    for (const mapping of SYMPTOM_SPECIALTY_MAP) {
      let matches = 0;
      for (const kw of mapping.keywords) {
        if (lower.includes(kw)) {
          matches += 1;
        }
      }
      if (matches > maxMatchCount) {
        maxMatchCount = matches;
        bestMatch = mapping;
      }
    }

    return bestMatch;
  },

  // Dynamic universal anatomical condition analyzer
  analyzeUniversalCondition(text: string): SymptomSpecialtyGuide {
    const lower = text.toLowerCase();

    // Organ and symptom detectors
    const hasHeart = lower.includes('yurak') || lower.includes('ko\'krak') || lower.includes('puls') || lower.includes('davleniya');
    const hasHead = lower.includes('bosh') || lower.includes('asab') || lower.includes('nerv') || lower.includes('uyqu') || lower.includes('ense');
    const hasStomach = lower.includes('qorin') || lower.includes('oshqozon') || lower.includes('jigar') || lower.includes('ich') || lower.includes('zarda') || lower.includes('qusish');
    const hasThroatEarNose = lower.includes('tomoq') || lower.includes('quloq') || lower.includes('burun') || lower.includes('gaymorit') || lower.includes('ovoz');
    const hasTooth = lower.includes('tish') || lower.includes('milk') || lower.includes('jag\'') || lower.includes('plomba');
    const hasEye = lower.includes('ko\'z') || lower.includes('ko\'rish') || lower.includes('qovog\'');
    const hasKidney = lower.includes('buyrak') || lower.includes('siydik') || lower.includes('peshob') || lower.includes('prostata');
    const hasJointBone = lower.includes('suyak') || lower.includes('bo\'g\'im') || lower.includes('tizza') || lower.includes('to\'piq') || lower.includes('tovon') || lower.includes('jarohat') || lower.includes('singan') || lower.includes('lat');
    const hasSkin = lower.includes('teri') || lower.includes('toshma') || lower.includes('qichish') || lower.includes('dog\'') || lower.includes('qizarish');
    const hasSugarEndo = lower.includes('qand') || lower.includes('saxar') || lower.includes('diabet') || lower.includes('zob') || lower.includes('shakar');
    const hasPregnancy = lower.includes('homilador') || lower.includes('hayz') || lower.includes('bachadon') || lower.includes('ayol');
    const hasChild = lower.includes('bola') || lower.includes('chaqaloq') || lower.includes('go\'dak') || lower.includes('farzand');

    let targetSpec: DoctorSpecialty = 'Terapevt';
    let conditionTitle = 'Funksional salomatlik buzilishi va klinik alomatlar';

    if (hasChild) {
      targetSpec = 'Pediatr';
      conditionTitle = 'Bolalar organizmi alomatlari va profilaktikasi';
    } else if (hasPregnancy) {
      targetSpec = 'Ginekolog';
      conditionTitle = 'Ginekologik holat yoki homiladorlik davri kuzatuvi';
    } else if (hasTooth) {
      targetSpec = 'Stomatolog';
      conditionTitle = 'Stomatologik yoki og\'iz bo\'shlig\'i yallig\'lanishi';
    } else if (hasEye) {
      targetSpec = 'Oftalmolog';
      conditionTitle = 'Ko\'rish a\'zolari disfunksiyasi yoki yallig\'lanishi';
    } else if (hasThroatEarNose) {
      targetSpec = 'LOR';
      conditionTitle = 'Yuqori nafas yo\'llari va LOR a\'zolari bezovtaligi';
    } else if (hasHeart) {
      targetSpec = 'Kardiolog';
      conditionTitle = 'Yurak-qon tomir tizimi funksional zo\'riqishi';
    } else if (hasStomach) {
      targetSpec = 'Gastroenterolog';
      conditionTitle = 'Hazm trakti, jigar yoki oshqozon-ichak buzilishi';
    } else if (hasKidney) {
      targetSpec = 'Urolog';
      conditionTitle = 'Siydik-tanosil yoki buyrak tizimi bezovtaligi';
    } else if (hasJointBone) {
      targetSpec = 'Jarroh';
      conditionTitle = 'Tayanch-harakat a\'zolari (bo\'g\'im, suyak, pay) shikastlanishi yoki artrozi';
    } else if (hasSkin) {
      targetSpec = 'Dermatolog';
      conditionTitle = 'Dermatologik yoki allergik teri reaksiyasi';
    } else if (hasSugarEndo) {
      targetSpec = 'Endokrinolog';
      conditionTitle = 'Modda almashinuvi yoki endokrin tizim buzilishi';
    } else if (hasHead) {
      targetSpec = 'Nevropatolog';
      conditionTitle = 'Bosh miya tomirlari spazmi yoki asab-mushak zo\'riqishi';
    }

    return {
      specialty: targetSpec,
      keywords: [],
      conditionNameUz: conditionTitle,
      reasoning: `Siz ta'riflagan alomatlar ${targetSpec} shifokori tomonidan batafsil klinik ko'rik, laboratoriya va asbobiy diagnostikani talab qiladi.`,
      immediateActionsUz: [
        'Zudlik bilan jismoniy zo\'riqishlarni to\'xtatib, tinch va qulay holatda dam oling.',
        'Organizm intoksikatsiyasini kamaytirish uchun yetarli miqdorda iliq toza suv iching.',
        'Bezovta qilayotgan sohani ortiqcha bosim, sovuq urishi yoki zo\'riqishdan asrang.',
        'Holatingiz dinamikasini (harorat, bosim, og\'riq xarakteri) kuzatib boring.',
      ],
      forbiddenActionsUz: [
        'Shifokor ko\'rigisiz va retseptsiz o\'zboshimchalik bilan antibiotiklar yoki kuchli gormonlarni qabul qilmang.',
        'Noma\'lum og\'riqlarda issiq grelka yoki kuchli qizdiruvchi vositalarni qo\'llamang.',
      ],
      dangerFlagsUz:
        'Agar og\'riq chidab bo\'lmas darajada kuchaysa, nafas qisishi, hush chalkashligi yoki yuqori isitma kuzatilsa — darhol 103 Tez tibbiy yordam chaqiring!',
      questions: [
        'Ushbu alomatlar aynan qachon boshlandi?',
        'Ilgari ushbu holat bo\'yicha shifokorga murojaat qilganmisiz?',
      ],
    };
  },

  // Helper to find matching specialty based on user text
  findMatchingSpecialty(text: string): DoctorRecommendation | null {
    const guide = this.findMatchingGuide(text) || this.analyzeUniversalCondition(text);
    const docs = doctorService.getAll().filter((d) => d.isActive && d.specialty === guide.specialty);
    const fallbackDocs = doctorService.getAll().filter((d) => d.isActive);
    return {
      specialty: guide.specialty,
      recommendedDoctors: docs.length ? docs : fallbackDocs.slice(0, 1),
      urgencyLevel: 'routine',
      reasoningUz: guide.reasoning,
      clarifyingQuestions: guide.questions,
      disclaimerUz:
        'Tibbiy ogohlantirish: Ushbu tavsiya dastlabki axborot xarakteriga ega bo\'lib, aniq tashxis faqat malakali shifokor tekshiruvidan so\'ng belgilanadi.',
    };
  },

  // Generate autonomous clinical response in natural conversational Uzbek like ChatGPT
  generateAutonomousClinicalResponse(prompt: string): AiMessage {
    const lower = prompt.toLowerCase();
    const context = this.getClinicContext();
    const nowTime = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

    // 1. Clinic info questions: hours, location, prices
    if (lower.includes('vaqt') || lower.includes('ish vaqti') || lower.includes('qachon ochiq')) {
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        timestamp: nowTime,
        type: 'clinic_info',
        isDemo: true,
        content: `🏥 **${context.clinicName} ish tartibi:**\n\n• **Ish kunlari:** ${context.workingDays}\n• **Ish soatlari:** ${context.workingHours}\n• **Manzil:** ${context.address}\n• **Bog'lanish:** ${context.phone}\n\nQaysi shifokorimiz qabuliga yozilmoqchisiz?`,
        suggestedFollowUps: ['Shifokorlar ro\'yxati', 'Xizmatlar narxi', 'Terapevt qabuliga yozilish'],
      };
    }

    if (
      lower.includes('narx') ||
      lower.includes('qancha') ||
      lower.includes('to\'lov') ||
      lower.includes('xizmatlar') ||
      lower.includes('narxi')
    ) {
      const servicesListText = context.servicesList
        .map((s) => `• **${s.name}**: ${s.price.toLocaleString('uz-UZ')} UZS`)
        .join('\n');
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        timestamp: nowTime,
        type: 'clinic_info',
        isDemo: true,
        content: `💳 **${context.clinicName} asosiy tibbiy xizmatlar narxlari:**\n\n${servicesListText}\n\nBarcha shifokorlarimiz qabul narxlari va xonalari haqida to'liq ma'lumot olishingiz yoki qabulga yozilishingiz mumkin.`,
        suggestedFollowUps: ['Terapevt qabuliga yozilish', 'Kardiolog qabuliga yozilish', 'Laboratoriya tahlillari'],
      };
    }

    // 2. Direct booking request
    const bookingIntent = this.detectBookingIntent(lower);
    if (bookingIntent.wantsBooking) {
      const spec = bookingIntent.specialty || 'Terapevt';
      const availableDocs = doctorService.getAll().filter((d) => d.isActive && d.specialty === spec);
      const chosenDoc = availableDocs[0] || doctorService.getAll()[0];

      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        timestamp: nowTime,
        type: 'booking_action',
        isDemo: true,
        content: `📅 Sizni **${chosenDoc.fullName}** (${chosenDoc.specialty}) qabuliga yozishimiz mumkin.\n\n• **Xona:** ${chosenDoc.roomNumber}\n• **Qabul narxi:** ${chosenDoc.consultationFee.toLocaleString('uz-UZ')} UZS\n\nQuyidagi interaktiv kartadan qulay sana va vaqtni tanlang, so'ngra qabulni tasdiqlang:`,
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

    // 3. Question about medication advice ("qanday dori ichsam bo'ladi", "dori tavsiya qil")
    if (
      lower.includes('qanday dori') ||
      lower.includes('dori tavsiya') ||
      lower.includes('dori nima ichay') ||
      lower.includes('qaysi dori')
    ) {
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        timestamp: nowTime,
        type: 'text',
        isDemo: true,
        content: `Tibbiy xavfsizlik talablariga ko'ra, aniq retseptli dorilarni shifokor ko'rigisiz va tahlillarsiz qabul qilish sog'liq uchun jiddiy xavf tug'diradi.\n\nBiroq alomatlaringizga qarab quyidagi **xavfsiz birinchi yordam vositalari** mavjud:\n\n• **Tana harorati 38.5°C dan oshganda:** Paratsetamol (500 mg) yoki Ibuprofen (400 mg).\n• **Tomoq og'rig'ida:** Furasilin yoki iliq sho'r suv bilan g'arg'ara qilish, septolete shimiluvchi pastilkalari.\n• **Oshqozon buzilishi / zaharlanishda:** Smekta yoki Faollashtirilgan ko'mir (suvsizlanishning oldini olish uchun ko'p suyuqlik).\n• **Allergiyada:** Tsetirizin yoki Loratadin.\n\n⛔ **Muhim eslatma:** Hech qachon o'zboshimchalik bilan **antibiotiklar** qabul qilmang! Antibiotiklar faqat shifokor ko'rigi va retsepti asosida buyuriladi.\n\nAynan qaysi alomatlar sizni bezovta qilayotganini yozsangiz, mos shifokorimiz ko'rigiga yo'naltiraman.`,
        suggestedFollowUps: [
          'Meni istmam chiqib grip bo\'ldim',
          'Terapevt qabuliga yozilish',
          'Boshim og\'riyapti',
          'Klinika narxlari',
        ],
      };
    }

    // 4. Universal Illness & Symptom Matcher (Covers ALL diseases)
    const guide = this.findMatchingGuide(lower) || this.analyzeUniversalCondition(prompt);
    const docs = doctorService.getAll().filter((d) => d.isActive && d.specialty === guide.specialty);
    const chosenDoc = docs[0] || doctorService.getAll().find((d) => d.isActive) || doctorService.getAll()[0];
    const docNames = (docs.length ? docs : [chosenDoc])
      .map(
        (d) =>
          `• **${d.fullName}** — ${d.specialty} (${d.roomNumber}, ${d.consultationFee.toLocaleString('uz-UZ')} UZS)`
      )
      .join('\n');

    const immediateActionsList = guide.immediateActionsUz.map((a, i) => `${i + 1}. ${a}`).join('\n\n');
    const forbiddenText = guide.forbiddenActionsUz?.length
      ? `\n\n⛔ **Nima qilish QAT'IYAN TAQIQLANADI:**\n` +
        guide.forbiddenActionsUz.map((f) => `• ${f}`).join('\n')
      : '';

    const content = `Assalomu alaykum! Siz ta'riflagan holatni diqqat bilan o'rganib chiqdim.

🩺 **Klinik Xulosa va Ehtimoliy Holat:**
Sizda katta ehtimol bilan **${guide.conditionNameUz}** belgilari kuzatilmoqda. ${guide.reasoning}

⚡ **Darhol nima qilish kerak (Uy sharoitida 1-yordam):**
${immediateActionsList}${forbiddenText}

👨‍⚕️ **Qaysi shifokorga uchrashish zarur:**
Sizga zudlik bilan umumiy amaliyot shifokori — **${guide.specialty}** ko'rigidan o'tishni qat'iy tavsiya qilaman. Shifokor asbobiy va klinik tekshiruvlar orqali aniq holatni baholaydi va asoratlarning oldini oladi.

🏥 **Klinikamizdagi qabulga tayyor mutaxassis:**
${docNames}

🚨 **Diqqat (103 Tez Yordam chaqirish mezonlari):**
${guide.dangerFlagsUz}

⚠️ *Eslatma: Elvora AI dastlabki klinik triage vositasidir. Aniq tashxis faqat malakali shifokor ko'rigi orqali belgilanadi.*`;

    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      timestamp: nowTime,
      type: 'doctor_recommendation',
      isDemo: true,
      recommendation: {
        specialty: guide.specialty,
        recommendedDoctors: docs.length ? docs : [chosenDoc],
        urgencyLevel: 'routine',
        reasoningUz: guide.reasoning,
        clarifyingQuestions: guide.questions,
        disclaimerUz: 'Aniq tashxis faqat malakali shifokor ko\'rigi orqali belgilanadi.',
      },
      content,
      suggestedFollowUps: [
        `${chosenDoc.fullName} (${guide.specialty}) qabuliga yozilish`,
        'Uy sharoitida yana nima qilsam bo\'ladi?',
        'Klinika manzili va telefonlari',
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
    if (lower.includes('grip') || lower.includes('istma') || lower.includes('isitma')) {
      return ['Terapevt qabuliga yozilish', 'Isitmani tushirish choralari', 'Klinika telefoni'];
    }
    return [
      'Shifokorga yozilish',
      'Klinika manzili va telefonlari',
      'Tahlillar bo\'yicha savol',
    ];
  },
};
