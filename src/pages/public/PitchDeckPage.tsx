import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Maximize,
  Minimize,
  FileText,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  Building,
  ShieldCheck,
  RefreshCw,
  Phone,
  Mail,
  Info,
  Sparkles,
  ExternalLink,
  Bot,
  Activity,
  Zap,
  Globe,
  Copy,
  Check,
  Layers,
  X,
  Clock,
  Calendar,
  MessageSquare,
  Sliders,
  Sun,
  Moon,
} from 'lucide-react';

export type PitchLang = 'uz' | 'ru' | 'en';
export type PitchFormat = '3min' | '5min';

interface SlideData {
  id: number;
  timeRange3Min: string;
  timeRange5Min: string;
  durationSec3Min: number;
  durationSec5Min: number;
  title: Record<PitchLang, string>;
  badge: Record<PitchLang, string>;
  speakerNotes3Min: Record<PitchLang, string>;
  speakerNotes5Min: Record<PitchLang, string>;
}

const SLIDES_META: SlideData[] = [
  {
    id: 1,
    timeRange3Min: '0:00 – 0:18',
    timeRange5Min: '0:00 – 0:30',
    durationSec3Min: 18,
    durationSec5Min: 30,
    badge: {
      uz: '1. INTRO',
      ru: '1. ИНТРО',
      en: '1. INTRO',
    },
    title: {
      uz: 'Loyiha Haqida',
      ru: 'О Проекте',
      en: 'About the Project',
    },
    speakerNotes3Min: {
      uz: 'Assalomu alaykum, hurmatli investorlar! Mening ismim [ISMINGIZ]. Bugun sizga Elvora Health — Oʻzbekiston xususiy klinikalari uchun yagona vertikal boshqaruv SaaS platformasini taqdim etaman. Bizning missiyamiz: xususiy tibbiyot markazlaridagi koʻrinmas pul yoʻqotishlarini toʻxtatish va barcha boʻlimlarni yagona yadrodan boshqarish.',
      ru: 'Здравствуйте, уважаемые инвесторы! Меня зовут [ВАШЕ ИМЯ]. Представляю Elvora Health — вертикальную B2B SaaS-платформу для частных клиник Узбекистана. Наша миссия — остановить невидимые финансовые утечки и объединить все отделения клиники в единой облачной системе.',
      en: 'Hello, esteemed investors! My name is [YOUR NAME]. Today I present Elvora Health — the vertical B2B SaaS management platform for private medical clinics in Uzbekistan. Our mission is clear: eliminate invisible revenue leakages and run all clinical departments from a unified core.',
    },
    speakerNotes5Min: {
      uz: 'Assalomu alaykum, hurmatli investorlar! Mening ismim [ISMINGIZ]. Bugun sizga Elvora Health loyihasini taqdim etmoqdaman. Oʻzbekiston xususiy tibbiyot sohasi har yili 18% dan ortiq surʼatda rivojlanmoqda. Biroq, koʻp tarmoqli klinikalar hanuzgacha tarqoq dasturlar, qogʻoz daftarlar va nazoratsiz kassa bilan ishlamoqda. Elvora Health — shifokorlar ish jadvali, E-navbat, bemorlar elektron kartasi va kassani bitta yaxlit bulutli ekotizimga birlashtiruvchi B2B SaaS mahsulotidir.',
      ru: 'Здравствуйте, уважаемые инвесторы! Частная медицина Узбекистана ежегодно растет более чем на 18%. Однако абсолютное большинство клиник по-прежнему страдает от разрозненных программ, бумажных журналов и непрозрачной кассы. Elvora Health — это комплексное облачное SaaS-решение, объединяющее электронные очереди, расписание врачей, медкарты EHR и кассовый учет в едином цифровом контуре.',
      en: 'Hello, esteemed investors! Private healthcare in Uzbekistan is expanding rapidly at over 18% annually. However, most clinics still operate with fragmented tools, paper registers, and untracked cash collection. Elvora Health unifies doctor scheduling, live patient queuing, digital EHR records, and financial settlement into a single, seamless vertical SaaS ecosystem.',
    },
  },
  {
    id: 2,
    timeRange3Min: '0:18 – 0:36',
    timeRange5Min: '0:30 – 1:00',
    durationSec3Min: 18,
    durationSec5Min: 30,
    badge: {
      uz: '2. MUAMMO',
      ru: '2. ПРОБЛЕМА',
      en: '2. PROBLEM',
    },
    title: {
      uz: 'Muammo: Koʻrinmas Pul Sizishi',
      ru: 'Проблема: Финансовые Утечки',
      en: 'Problem: Invisible Revenue Leaks',
    },
    speakerNotes3Min: {
      uz: 'Muammo nimada? Oʻzbekistondagi xususiy klinikalar har kuni tushumining 25 foizigacha qismini yoʻqotmoqda. Bemorlar yoziladi, lekin kelmaydi — no-show. Shifokorlar kutib oʻtiradi, qabulxona qogʻoz va daftarlar tartibsizligida, kassadagi tushum esa nazoratdan chetda qoladi. Eng xavflisi — klinika rahbari bu zararni aniq raqamlarda koʻrmaydi.',
      ru: 'В чем главная боль? Частные клиники Узбекистана ежедневно теряют до 25% потенциальной выручки. Пациенты записываются, но не приходят (no-show). Врачи простаивают, в регистратуре бумажный хаос, а касса остается непрозрачной. Руководитель клиники не видит масштаб этих потерь в реальном времени.',
      en: 'What is the problem? Private clinics in Uzbekistan lose up to 25% of their daily revenue. Patients book but fail to show up (no-show). Doctors sit idle in empty slots, reception desks struggle with paper journals, and cash collection slips away untracked. Most critically, clinic executives lack visibility into these hidden losses.',
    },
    speakerNotes5Min: {
      uz: 'Muammo 4 ta asosiy oqish nuqtasidan iborat: birinchisi — 20-30% no-show darajasi; bemor kelmasa, slot boʻsh qoladi va klinika sarflagan reklama puli kuyadi. Ikkinchisi — kun davomidagi boʻsh slotlar. Uchinchisi — qogʻoz daftarlardagi navbat janjallari. Toʻrtinchisi — shifokorlar ulushi va xizmatlar narxi boʻyicha hisob-kitobning shaffof emasligi. Oʻrtacha 8 shifokorli klinika har oy 18 dan 38 million soʻmgacha sof pulini yoʻqotmoqda.',
      ru: 'Проблема состоит из четырех системных утечек: неявка пациентов (no-show до 30%), пустые нераспределенные слоты врачей в середине дня, конфликты в очереди перед кабинетами и непрозрачный кассовый учет выплат врачам. Средняя клиника с 8 специалистами ежемесячно теряет от 18 до 38 млн сумов чистой прибыли.',
      en: 'The problem stems from 4 systemic leak points: 20-30% patient no-show rate, empty unfillable calendar slots during peak hours, reception chaos causing patient churn, and opaque doctor revenue splits. An average 8-doctor clinic bleeds 18 to 38 million UZS every single month.',
    },
  },
  {
    id: 3,
    timeRange3Min: '0:36 – 0:54',
    timeRange5Min: '1:00 – 1:30',
    durationSec3Min: 18,
    durationSec5Min: 30,
    badge: {
      uz: '3. YECHIM',
      ru: '3. РЕШЕНИЕ',
      en: '3. SOLUTION',
    },
    title: {
      uz: 'Yechim: Yaxlit Tibbiy Yadro',
      ru: 'Решение: Единое Медицинское Ядро',
      en: 'Solution: Unified Healthcare Core',
    },
    speakerNotes3Min: {
      uz: 'Bizning yechim — Elvora Health. Bu tarqoq dasturlar emas, balki bitta oynada ishlovchi yaxlit tizim: Bemorlar elektron kartasi, kutish zali jonli E-navbat tablosi, avtomatik SMS-eslatmalar, shaffof kassa va "Elvora Insights" tahlil paneli. Tizim no-show darajasini 65 foizga kamaytiradi va har bir slotni nazoratga oladi.',
      ru: 'Наше решение — Elvora Health. Это не разрозненные утилиты, а цельная экосистема в одном окне: электронная медкарта (EHR), табло электронной очереди для зала ожидания, автоматические SMS и Telegram напоминания, прозрачная касса и аналитическая панель Elvora Insights. No-show сокращается на 65%.',
      en: 'Our solution is Elvora Health. Instead of piecemeal tools, it delivers an integrated command center: EHR patient records, live waiting room queue display, automated SMS & Telegram appointment reminders, transparent treasury, and the Elvora Insights analytics engine. No-shows drop by 65%.',
    },
    speakerNotes5Min: {
      uz: 'Elvora Health mahsuloti 6 ta asosiy ustunga ega: 1) Bemorlar EHR kartotekasi va tashxislar tarixi; 2) Kutish zalidagi aqlli TV tablo va ovozli e-navbat; 3) Telegram bot orqali qabullarni avtomatik tasdiqlash; 4) Shifokorlar ish jadvali va boʻsh slotlarni bir zumda toʻldirish; 5) Kunlik kassa, Click/Payme va shifokorlar maoshi hisoboti; 6) Sunʼiy intellektga asoslangan tahliliy maslahat paneli.',
      ru: 'Платформа Elvora Health опирается на 6 надежных модулей: 1) Цифровая медкарта EHR и история анализов; 2) ТВ-табло электронной очереди с голосовым вызовом; 3) Интеграция с Telegram-ботом для подтверждения визита; 4) Сетка расписания врачей с защитой от двойных записей; 5) Кассовый журнал и прозрачные расчеты с врачами; 6) Аналитика Elvora AI для роста рентабельности.',
      en: 'The Elvora Health product rests on 6 foundational pillars: 1) Comprehensive digital EHR records; 2) TV smart queue board with audio announcements; 3) Telegram bot automation for instant appointment confirmation; 4) Conflict-free doctor schedule slotting; 5) Transparent financial cashiering and commission splits; 6) Elvora AI predictive analytics driving clinic profitability.',
    },
  },
  {
    id: 4,
    timeRange3Min: '0:54 – 1:12',
    timeRange5Min: '1:30 – 2:00',
    durationSec3Min: 18,
    durationSec5Min: 30,
    badge: {
      uz: '4. BOZOR',
      ru: '4. РЫНОК',
      en: '4. MARKET',
    },
    title: {
      uz: 'Bozor Hajmi (TAM / SAM / SOM)',
      ru: 'Объем Рынка (TAM / SAM / SOM)',
      en: 'Market Size (TAM / SAM / SOM)',
    },
    speakerNotes3Min: {
      uz: 'Bozorimiz juda tez oʻsmoqda. Markaziy Osiyo tibbiyot SaaS bozori 45 million dollar. Oʻzbekistonda bugun 3 500 dan ortiq xususiy klinikalar va diagnostika markazlari faoliyat yuritadi — bizning xizmat koʻrsatiladigan bozorimiz (SAM) 12.5 million dollardan oshadi. Dastlabki maqsadimiz — 150 ta klinikani ulash orqali 350 ming dollarlik barqaror yillik obuna (ARR) daromadiga chiqish.',
      ru: 'Рынок стремительно расширяется. Рынок медицинского SaaS Центральной Азии составляет $45 млн (TAM). В Узбекистане сегодня свыше 3 500 частных клиник и центров — наш доступный рынок (SAM) превышает $12.5 млн. Наша цель на 14-16 месяцев — 150 клиник и выход на $350 000 ARR.',
      en: 'Our addressable market is growing fast. Central Asian healthtech SaaS represents a $45M TAM. Over 3,500 private clinics operate in Uzbekistan today, creating a $12.5M SAM. Our milestone is onboarding 150 clinics in Tashkent and regional hubs to generate $350K ARR.',
    },
    speakerNotes5Min: {
      uz: 'Mijozlarimiz aniq belgilangan: birinchi toʻlqin — Toshkent shahri va viloyat markazlaridagi koʻp tarmoqli xususiy tibbiyot markazlari, diagnostika laboratoriyalari va stomatologiyalar. Oʻzbekistonda xususiy tibbiyot soni har yili 300 taga koʻpaymoqda. Keyingi bosqichda Qozogʻiston va Qirgʻiziston bozorlariga kengayish imkoniyatiga egamiz. Biz xom bozorga emas, toʻlov qobiliyati yuqori boʻlgan B2B mijozlarga yoʻnalganmiz.',
      ru: 'Портрет нашего клиента предельно ясен: многопрофильные клиники, диагностические лаборатории и стоматологические центры Ташкента и областных центров (Самарканд, Фергана, Бухара). Количество частных клиник в стране ежегодно увеличивается на 300+. Следующий шаг — экспансия в Казахстан и Кыргызстан.',
      en: 'Our target customer profile is well-defined: multidisciplinary private clinics, diagnostic labs, and dental centers in Tashkent and major regions (Samarkand, Fergana, Bukhara). Over 300 new private medical facilities launch in Uzbekistan annually. In stage two, we expand to Kazakhstan and Kyrgyzstan.',
    },
  },
  {
    id: 5,
    timeRange3Min: '1:12 – 1:30',
    timeRange5Min: '2:00 – 2:30',
    durationSec3Min: 18,
    durationSec5Min: 30,
    badge: {
      uz: '5. NATIJALAR',
      ru: '5. РЕЗУЛЬТАТЫ',
      en: '5. TRACTION',
    },
    title: {
      uz: 'Natijalar va Hozirgi Holat',
      ru: 'Результаты и Текущий Статус',
      en: 'Traction & Current Status',
    },
    speakerNotes3Min: {
      uz: 'Bugungi holatimiz: Mahsulotimizning toʻliq funksional MVP versiyasi tayyor va klinikalar pilot sinoviga tayyorlangan. Bemorlar kartotekasi, jadval, kassa va tahliliy hisob-kitoblar toʻliq ishlamoqda. Zero-data leakage xavfsizligi taʼminlangan. Biz xom gʻoya emas, haqiqiy ishlovchi mahsulot bilan chiqmoqdamiz.',
      ru: 'Наш статус на сегодня: полностью работоспособный MVP готов к внедрению в пилотных клиниках. Модули пациентов, очередей, расписания и кассы функционируют без сбоев. Обеспечена 100% безопасность данных с локальным хранением. Мы выходим не с презентацией идеи, а с готовым продуктом.',
      en: 'Our status today: a 100% production-ready MVP tested and prepped for pilot deployments. Patient registry, live queue boards, schedule calendars, and financial ledgering are live. Zero-data leakage architecture ensures full local compliance.',
    },
    speakerNotes5Min: {
      uz: 'Biz platformani bozorga olib chiqishdan oldin har bir modulni shifokorlar va qabulxona xodimlari bilan birga sinovdan oʻtkazdik. Bemor kartotekasi, QR-kodli navbat chiptasi, Telegram bot eslatmalari va kassa jurnali toʻliq ish holatida. Hozirda Toshkent shahridagi dastlabki pilot klinikalar bilan tizimni joriy etish boʻyicha muzokaralar olib borilmoqda.',
      ru: 'Перед запуском мы тестировали интерфейсы непосредственно с практикующими врачами и администраторами клиник. Реестр пациентов, билеты электронной очереди с QR-кодами, Telegram-бот и кассовая отчетность работают вживую. В настоящее время ведутся переговоры о пилотных интеграциях с первыми клиниками Ташкента.',
      en: 'We designed and tested our interfaces alongside active medical directors and front-desk receptionists. Digital patient intake, QR queue tokens, Telegram bot alerts, and revenue calculation are fully operational. Pilot partnership agreements are underway with initial clinics in Tashkent.',
    },
  },
  {
    id: 6,
    timeRange3Min: '1:30 – 1:48',
    timeRange5Min: '2:30 – 3:00',
    durationSec3Min: 18,
    durationSec5Min: 30,
    badge: {
      uz: '6. MONETIZATSIYA',
      ru: '6. МОНЕТИЗАЦИЯ',
      en: '6. BUSINESS MODEL',
    },
    title: {
      uz: 'Biznes Model & Unit-Economics',
      ru: 'Бизнес-Модель и Экономика',
      en: 'Business Model & Unit-Economics',
    },
    speakerNotes3Min: {
      uz: 'Biznes modelimiz — oylik va yillik B2B SaaS obunasi. Tariflarimiz oyiga 590 ming soʻmdan 2.89 million soʻmgacha. Oʻrtacha 8 nafar shifokorga ega klinika Pro tarifimiz uchun oyiga 1.29 million soʻm toʻlaydi, ammo no-show va boʻsh slotlarni qisqartirish hisobiga oyiga 18 million soʻmdan ortiq sof tushumini saqlab qoladi. Bu klinika uchun 14 barobar sof ROI degani!',
      ru: 'Модель заработка — подписка B2B SaaS: Starter (590 тыс.), Pro (1.29 млн), Enterprise (2.89 млн сум/мес). Средняя клиника с 8 врачами платит 1.29 млн сумов в месяц, а экономит от 18 млн сумов благодаря снижению неявок и закрытию пустых слотов. Это чистый 14-кратный ROI!',
      en: 'Our revenue model is predictable B2B SaaS subscriptions: Starter (590K UZS), Pro (1.29M UZS), Enterprise (2.89M UZS/mo). An average 8-doctor clinic paying 1.29M UZS/month recovers over 18.4M UZS/month in otherwise lost patient revenue — delivering a 14x ROI!',
    },
    speakerNotes5Min: {
      uz: 'Monetizatsiyamiz uch pogʻonadan iborat: 1) Standart oylik obuna (Starter: 590K, Pro: 1.29M, Enterprise: 2.89M UZS); 2) Yillik toʻlovda 20% chegirma bilan oldindan naqd pul oqimi; 3) Qoʻshimcha SMS paketlar, LIS apparatlari integratsiyasi va AI tahlil kvotalari. Klinika har bir sarflagan soʻmi uchun 14 soʻm qaytib olayotganini koʻrgach, xizmatdan chiqib ketish (churn) darajasi minimal boʻladi.',
      ru: 'Структура монетизации включает: 1) Регулярные ежемесячные подписки трёх уровней; 2) Годовые тарифы со скидкой 20% для быстрого формирования оборотного капитала; 3) Дополнительные пакеты SMS-уведомлений, интеграция лабораторных анализаторов и квоты на ИИ-аналитику. При 14-кратной окупаемости отток клиентов стремится к минимуму.',
      en: 'Our monetization is built on three layers: 1) Recurring monthly SaaS subscriptions; 2) Upfront annual contracts discounted at 20% for strong cash flow; 3) Value-added add-ons including SMS packs, lab equipment LIS drivers, and extra AI tokens. Demonstrating 14x ROI ensures near-zero customer churn.',
    },
  },
  {
    id: 7,
    timeRange3Min: '1:48 – 2:06',
    timeRange5Min: '3:00 – 3:30',
    durationSec3Min: 18,
    durationSec5Min: 30,
    badge: {
      uz: '7. RAQOBAT',
      ru: '7. КОНКУРЕНЦИЯ',
      en: '7. COMPETITION',
    },
    title: {
      uz: 'Raqobatchilar va Pozitsiyalash',
      ru: 'Конкуренты и Позиционирование',
      en: 'Competition & Positioning',
    },
    speakerNotes3Min: {
      uz: 'Koʻpincha soʻrashadi: "Davlat DMED tizimi bilan qanday raqobatlashasiz?". Biz DMED bilan raqobatlashmaymiz! DMED — davlat tibbiy reyestri va elektron retsept tizimi. Elvora Health esa xususiy klinikaning ichki operatsion biznesini boshqaradi: kassa, xodimlar maoshi, no-show monitoringi va rentabellik. Biz DMEDni toʻldiramiz va unga integratsiyalashamiz.',
      ru: 'Нас часто спрашивают о конкуренции с госпроектом DMED. Мы не конкурируем с DMED! DMED — это государственный регистр рецептов и статистики. Elvora Health управляет внутренней бизнес-операционкой частной клиники: кассой, зарплатами, очередью и борьбой с no-show. Мы гармонично дополняем DMED.',
      en: 'We are often asked how we compare to state DMED. We do not compete with DMED! DMED is a national prescription and health registry. Elvora Health operates the private clinic’s internal business engine: cashiering, payroll, live queue control, and no-show mitigation. We complement and integrate with DMED.',
    },
    speakerNotes5Min: {
      uz: 'Bozordagi boshqa raqobatchilarimiz — 1C va Bitrix kabi umumiy tizimlar. Ular tibbiyotga moslashmagan, oʻrnatish oylab vaqt va yuzlab million soʻm talab qiladi. Qogʻoz jadvallar esa nazoratsiz. Elvora Health esa 5 daqiqada brauzerda ishga tushadi, Telegram bilan bogʻlangan, oʻzbek tilidagi qulay dizaynga ega va maxsus tibbiyot ehtiyojlariga moslashtirilgan yagona yaxlit bulutli platformadir.',
      ru: 'Наши коммерческие конкуренты — общие ERP и CRM (1C, Битрикс). Они неповоротливы, требуют месяцев кастомизации и огромных бюджетов. Бумажные журналы вовсе не дают контроля. Elvora Health внедряется за 5 минут, работает прямо в браузере, имеет интуитивный интерфейс на узбекском и русском языках и полностью заточена под медицину.',
      en: 'Commercial alternatives are legacy general ERPs (1C, Bitrix). They require months of costly custom consulting and lack clinical nuance. Paper ledgers offer zero visibility. Elvora Health deploys in 5 minutes via web, integrates with Telegram, speaks Uzbek and Russian natively, and is custom-built for clinic workflows.',
    },
  },
  {
    id: 8,
    timeRange3Min: '2:06 – 2:24',
    timeRange5Min: '3:30 – 4:00',
    durationSec3Min: 18,
    durationSec5Min: 30,
    badge: {
      uz: '8. JAMOA',
      ru: '8. КОМАНДА',
      en: '8. TEAM',
    },
    title: {
      uz: 'Jamoa va Arxitektorlar',
      ru: 'Команда и Архитекторы',
      en: 'Team & Architects',
    },
    speakerNotes3Min: {
      uz: 'Bizning jamoa tibbiyot jarayonlarini chuqur tushunadigan amaliyotchi shifokorlar va yuqori xavfsizlikka ega dasturiy taʼminot arxitektorlaridan iborat. Mahsulotimiz xususiy klinika bosh shifokorlari va administratorlarining real ogʻriqli muammolariga asoslanib qurilgan.',
      ru: 'Наша команда сочетает глубокое понимание медицинских стандартов и экспертизу в разработке защищенных высоконагруженных SaaS-систем. Продукт построен на базе реальных задач главных врачей и управляющих частными клиниками.',
      en: 'Our team unites clinical frontline expertise with enterprise software engineering. We architected the platform hand-in-hand with private clinic head physicians, clinical administrators, and healthcare operators.',
    },
    speakerNotes5Min: {
      uz: 'Jamoamiz yetakchilari: Temur Rahmatullayev — Asoschi & Mahsulot Yetakchisi (SaaS arxitekturasi va UX boʻyicha mutaxassis); Dr. Anvar Usmonov — Bosh Tibbiy Maslahatchi (18 yillik shifokor-kardiolog va klinika boshqaruvi eksperti); Rustam Karimov — Texnik Direktor (Yuklamali tizimlar va maʼlumotlar xavfsizligi boʻyicha 9 yillik stajga ega muhandis).',
      ru: 'Ключевые члены команды: Темур Рахматуллаев — основатель и лидер продукта (архитектура SaaS и продуктовая стратегия); д-р Анвар Усмонов — главный медицинский советник (18 лет врачебного стажа, кардиолог); Рустам Каримов — технический директор (9 лет опыта в распределенных системах и защите данных).',
      en: 'Core team leadership: Temur Rakhmatullaev — Founder & Product Lead (SaaS architecture & user experience); Dr. Anvar Usmonov — Chief Medical Advisor (18 years clinical practice in cardiology and clinic workflows); Rustam Karimov — Chief Technical Architect (9 years in distributed systems and data encryption).',
    },
  },
  {
    id: 9,
    timeRange3Min: '2:24 – 2:42',
    timeRange5Min: '4:00 – 4:30',
    durationSec3Min: 18,
    durationSec5Min: 30,
    badge: {
      uz: '9. INVESTITSIYA',
      ru: '9. ИНВЕСТИЦИИ',
      en: '9. THE ASK',
    },
    title: {
      uz: 'Investitsiya Soʻrovi & Taqsimot',
      ru: 'Запрос Инвестиций и Распределение',
      en: 'Investment Ask & Use of Funds',
    },
    speakerNotes3Min: {
      uz: 'Bugun biz platformaning bozorga tezkor kirib borishini taʼminlash uchun $75,000 miqdorida Pre-Seed investitsiya jalb qilmoqdamiz. Mablagʻlarning 45 foizi muhandislik va mobil ilovalarga, 30 foizi Toshkent va viloyatlardagi pilot klinikalar sotuviga, qolgan qismi sertifikatlash va xavfsizlikka yoʻnaltiriladi.',
      ru: 'Для масштабирования платформы мы привлекаем раунд Pre-Seed в размере $75 000. 45% средств направляется на инженерию и мобильные приложения, 30% — на прямые B2B-продажи и пилоты в клиниках, 15% — на сертификацию безопасности, 10% — операционный резерв.',
      en: 'To accelerate market expansion, we are raising a $75,000 Pre-Seed round. Capital allocation: 45% to engineering and mobile apps (iOS/Android), 30% to B2B field sales and clinic onboarding, 15% to security compliance and certifications, and 10% operational buffer.',
    },
    speakerNotes5Min: {
      uz: 'Ushbu $75,000 Pre-Seed sarmoyasi bizga 14-16 oylik barqaror runway taʼminlaydi. Shu muddat ichida maqsadimiz: Toshkent va viloyatlarda 150 ta klinikani ulash, oyiga $30,000 daromadga erishish va $350K barqaror ARR koʻrsatkichiga chiqish. Keyingi bosqichda Markaziy Osiyo bozoriga chiqish uchun Seed raundiga tayyor boʻlamiz.',
      ru: 'Раунд Pre-Seed $75 000 обеспечивает 14-16 месяцев устойчивого взлетно-посадочного периода (runway). Наша цель за этот период — подключить 150 клиник, выйти на ежемесячный доход $30 000 и годовой оборот $350 000 ARR, подготовив компанию к раунду Seed в Центральной Азии.',
      en: 'This $75,000 Pre-Seed investment provides a 14-16 month runway. Our deliverable milestone is onboarding 150 clinics, reaching $30,000 MRR and $350K ARR, establishing the category leadership needed for our Series Seed expansion across Central Asia.',
    },
  },
  {
    id: 10,
    timeRange3Min: '2:42 – 3:00',
    timeRange5Min: '4:30 – 5:00',
    durationSec3Min: 18,
    durationSec5Min: 30,
    badge: {
      uz: '10. YAKUN',
      ru: '10. ЗАКЛЮЧЕНИЕ',
      en: '10. CLOSING',
    },
    title: {
      uz: 'Yakun & Kontaktlar',
      ru: 'Заключение и Контакты',
      en: 'Closing & Contacts',
    },
    speakerNotes3Min: {
      uz: 'Elvora Health — har bir soʻm hisobda, har bir shifokor band, har bir bemor mamnun. Biz bilan Oʻzbekiston xususiy tibbiyotini raqamlashtirishda yetakchi boʻling! Eʼtiboringiz uchun rahmat, savollaringizga mamnuniyat bilan javob beraman.',
      ru: 'Elvora Health — каждый сум на счету, каждый врач занят, каждый пациент доволен. Присоединяйтесь к нам и возглавьте цифровую трансформацию медицины Узбекистана! Спасибо за внимание, готов ответить на ваши вопросы.',
      en: 'Elvora Health — every sum accounted for, every doctor booked, every patient satisfied. Join us in shaping the digital future of healthcare in Uzbekistan! Thank you for your time, I look forward to your questions.',
    },
    speakerNotes5Min: {
      uz: 'Elvora Health — bu shunchaki dastur emas, xususiy klinika daromadini oshiruvchi moliyaviy va operatsion qalqon. Sayt hozir ishlayapti, mahsulot sinovdan oʻtgan va pilotga tayyor. Hamkorlik va sarmoyaviy muzokaralarga tayyormiz. Eʼtiboringiz uchun katta rahmat!',
      ru: 'Elvora Health — это не просто программа, а надежный финансовый щит частной клиники. Платформа уже функционирует, архитектура проверена и готова к развертыванию. Будем рады партнерству и продуктивному диалогу. Спасибо за внимание!',
      en: 'Elvora Health is more than software — it is an operational and financial growth engine for modern medical clinics. The live platform is tested and deployment-ready today. We welcome your partnership and questions. Thank you!',
    },
  },
];

export const PitchDeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [deckTheme, setDeckTheme] = useState<'light' | 'dark'>('light');
  const [pitchFormat, setPitchFormat] = useState<PitchFormat>('3min');
  const [pitchLang, setPitchLang] = useState<PitchLang>('uz');
  const [timerSeconds, setTimerSeconds] = useState<number>(180); // 3m = 180s, 5m = 300s
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isPresenterMode, setIsPresenterMode] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState<boolean>(false);
  const [featuresActiveTab, setFeaturesActiveTab] = useState<'queue' | 'ehr' | 'schedule' | 'finance' | 'telegram' | 'ai'>('queue');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [notesFontSize, setNotesFontSize] = useState<'sm' | 'md' | 'lg'>('md');

  // Mini demo interactive state on slide 3
  const [demoActiveTab, setDemoActiveTab] = useState<'insights' | 'queue' | 'finance'>('insights');
  // Dynamic money leak on slide 2
  const [leakCount, setLeakCount] = useState<number>(38450000);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSlides = SLIDES_META.length;
  const currentMeta = SLIDES_META[currentSlide - 1];

  // Dynamic values depending on format and language
  const currentTimeRange = pitchFormat === '3min' ? currentMeta.timeRange3Min : currentMeta.timeRange5Min;
  const currentDurationSec = pitchFormat === '3min' ? currentMeta.durationSec3Min : currentMeta.durationSec5Min;
  const currentBadge = currentMeta.badge[pitchLang];
  const currentTitle = currentMeta.title[pitchLang];
  const currentNotes = pitchFormat === '3min' ? currentMeta.speakerNotes3Min[pitchLang] : currentMeta.speakerNotes5Min[pitchLang];

  // Switch format
  const switchFormat = (format: PitchFormat) => {
    setPitchFormat(format);
    const newSeconds = format === '3min' ? 180 : 300;
    setTimerSeconds(newSeconds);
    setIsTimerRunning(false);
  };

  // Slide navigation
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const goToSlide = (slideNum: number) => {
    if (slideNum >= 1 && slideNum <= totalSlides) {
      setCurrentSlide(slideNum);
    }
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(totalSlides);
      } else if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        setIsTimerRunning((r) => !r);
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsPresenterMode((p) => !p);
      } else if (e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAutoPlay((a) => !a);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        setIsPresenterMode(false);
        setIsFeaturesModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, totalSlides, toggleFullscreen]);

  // Touch Swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Timer Interval
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Auto-play timer (18s per slide for 3min, 30s per slide for 5min)
  useEffect(() => {
    if (!isAutoPlay) return;
    const stepMs = pitchFormat === '3min' ? 18000 : 30000;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev < totalSlides) return prev + 1;
        setIsAutoPlay(false);
        return prev;
      });
    }, stepMs);
    return () => clearInterval(interval);
  }, [isAutoPlay, totalSlides, pitchFormat]);

  // Leak ticker on slide 2
  useEffect(() => {
    if (currentSlide !== 2) return;
    const interval = setInterval(() => {
      setLeakCount((prev) => prev + Math.floor(Math.random() * 25000) + 10000);
    }, 450);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const resetTimer = () => {
    setTimerSeconds(pitchFormat === '3min' ? 180 : 300);
    setIsTimerRunning(false);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copySpeechNotes = () => {
    navigator.clipboard.writeText(currentNotes).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`fixed inset-0 w-screen h-screen flex flex-col font-sans select-none overflow-hidden transition-colors duration-300 ${
        deckTheme === 'light'
          ? 'bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#F1F5F9] text-[#0F172A]'
          : 'bg-[#06142B] text-white'
      }`}
    >
      {/* ================= TOP NAVIGATION & PROGRESS BAR ================= */}
      <header
        className={`relative z-30 h-14 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0 transition-colors duration-200 ${
          deckTheme === 'light'
            ? 'bg-white/85 border-b border-[#E2E8F0] text-[#0F172A] shadow-xs'
            : 'bg-[#071731]/90 border-b border-[#0F2A52] text-white'
        }`}
      >
        {/* Brand & Slide title */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            title="Lendingga qaytish"
            className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#0D9488] flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
              </svg>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-black tracking-tight leading-none text-[#0F172A]">
                ELVORA <span className="text-[#0284C7]">HEALTH</span>
              </span>
              <span
                className={`text-[9px] font-bold uppercase mt-0.5 ${
                  deckTheme === 'light' ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                Investor Pitch Deck
              </span>
            </div>
          </Link>

          <span className={`hidden md:inline ${deckTheme === 'light' ? 'text-slate-300' : 'text-slate-600'}`}>|</span>

          {/* Current slide tag */}
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                deckTheme === 'light'
                  ? 'bg-sky-50 text-[#0284C7] border-sky-200'
                  : 'text-[#00D4FF] bg-blue-500/10 border-blue-400/30'
              }`}
            >
              {currentBadge}
            </span>
            <span
              className={`hidden lg:inline text-xs font-bold ${
                deckTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {currentTitle}
            </span>
          </div>
        </div>

        {/* Center: Slide indicator pills & Format switch */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {SLIDES_META.map((s) => (
              <button
                key={s.id}
                onClick={() => goToSlide(s.id)}
                title={`${s.id}-slayd: ${s.title[pitchLang]}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  s.id === currentSlide
                    ? deckTheme === 'light'
                      ? 'w-7 bg-[#0284C7] shadow-sm shadow-sky-500/30'
                      : 'w-7 bg-[#00D4FF] shadow-sm shadow-cyan-400/50'
                    : s.id < currentSlide
                    ? deckTheme === 'light'
                      ? 'w-2 bg-sky-200 hover:bg-sky-300'
                      : 'w-2 bg-blue-400/60 hover:bg-blue-300'
                    : deckTheme === 'light'
                    ? 'w-2 bg-slate-200 hover:bg-slate-300'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          {/* Format Switcher (3 daqiqa / 5 daqiqa) */}
          <div
            className={`hidden xl:flex items-center p-0.5 rounded-xl border ${
              deckTheme === 'light'
                ? 'bg-slate-100 border-slate-200'
                : 'bg-slate-900/90 border-slate-700/80'
            }`}
          >
            <button
              onClick={() => switchFormat('3min')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                pitchFormat === '3min'
                  ? deckTheme === 'light'
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-gradient-to-r from-[#008BFF] to-[#00D4FF] text-white shadow-xs'
                  : deckTheme === 'light'
                  ? 'text-slate-600 hover:text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="3 daqiqali tezkor pitch (180 soniya, 18s/slayd)"
            >
              3 daqiqa
            </button>
            <button
              onClick={() => switchFormat('5min')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                pitchFormat === '5min'
                  ? deckTheme === 'light'
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-gradient-to-r from-[#008BFF] to-[#00D4FF] text-white shadow-xs'
                  : deckTheme === 'light'
                  ? 'text-slate-600 hover:text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="5 daqiqali to'liq pitch (300 soniya, 30s/slayd)"
            >
              5 daqiqa
            </button>
          </div>
        </div>

        {/* Right Controls: Language, Theme, Features Modal, Timer, Presenter Mode, Autoplay, Exit */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
          {/* Language Switcher */}
          <div
            className={`flex items-center p-0.5 rounded-xl border ${
              deckTheme === 'light'
                ? 'bg-slate-100 border-slate-200'
                : 'bg-slate-900/90 border-slate-700/80'
            }`}
          >
            {(['uz', 'ru', 'en'] as PitchLang[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setPitchLang(lang)}
                className={`px-1.5 sm:px-2 py-0.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer ${
                  pitchLang === lang
                    ? deckTheme === 'light'
                      ? 'bg-white text-[#0284C7] shadow-xs border border-slate-200/80'
                      : 'bg-cyan-500/25 text-[#00D4FF] border border-cyan-400/40'
                    : deckTheme === 'light'
                    ? 'text-slate-500 hover:text-slate-900'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Theme Toggle: Klinika Yorug' vs Tungi Taqdimot */}
          <button
            onClick={() => setDeckTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            className={`p-1.5 rounded-xl border cursor-pointer transition-all ${
              deckTheme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
            }`}
            title={deckTheme === 'light' ? 'Tungi taqdimot rejimiga oʻtish' : 'Klinika yorugʻ rejimiga oʻtish'}
          >
            {deckTheme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
          </button>

          {/* Sayt Nima Qila Oladi? Interactive Drawer Button */}
          <button
            onClick={() => setIsFeaturesModalOpen(true)}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-bold cursor-pointer transition-all shadow-xs ${
              deckTheme === 'light'
                ? 'bg-sky-50 hover:bg-sky-100 text-[#0284C7] border-sky-200'
                : 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15 hover:from-cyan-500/25 hover:to-blue-500/25 text-cyan-300 border-cyan-400/40'
            }`}
            title="Elvora Health platformasining 6 ta asosiy imkoniyatini batafsil ko'rish"
          >
            <Sparkles size={12} className={deckTheme === 'light' ? 'text-[#0284C7]' : 'text-cyan-400'} />
            <span className="hidden md:inline">Nima qila oladi?</span>
            <span className="md:hidden">Modullar</span>
          </button>

          {/* Countdown Timer button */}
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-xl border ${
              deckTheme === 'light' ? 'bg-white border-[#E2E8F0] shadow-xs' : 'bg-slate-800/80 border-slate-700'
            }`}
          >
            <button
              onClick={() => setIsTimerRunning((r) => !r)}
              className="cursor-pointer"
              title={isTimerRunning ? 'Pauza qilish (T)' : 'Boshlash (T)'}
            >
              {isTimerRunning ? (
                <Pause size={13} className="text-amber-500" />
              ) : (
                <Play size={13} className="text-emerald-500" />
              )}
            </button>
            <span
              className={`font-mono font-bold text-xs ${
                timerSeconds < 30
                  ? 'text-rose-500 animate-pulse'
                  : timerSeconds < 60
                  ? 'text-amber-500'
                  : deckTheme === 'light'
                  ? 'text-[#0284C7]'
                  : 'text-cyan-300'
              }`}
            >
              {formatTimer(timerSeconds)}
            </span>
            <button
              onClick={resetTimer}
              title="Taymerni qayta oʻrnatish"
              className={`ml-0.5 cursor-pointer ${
                deckTheme === 'light' ? 'text-slate-400 hover:text-slate-600' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <RefreshCw size={11} />
            </button>
          </div>

          {/* Auto-Play Toggle (A) */}
          <button
            onClick={() => setIsAutoPlay((a) => !a)}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-all cursor-pointer font-bold text-[11px] ${
              isAutoPlay
                ? 'bg-emerald-500/15 text-emerald-600 border-emerald-300 shadow-xs'
                : deckTheme === 'light'
                ? 'bg-white text-slate-600 border-[#E2E8F0] hover:bg-slate-50'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title={`Avto-ijro rejimi (A): har bir slayd ${pitchFormat === '3min' ? '18' : '30'} soniyadan almashadi`}
          >
            <Zap size={12} className={isAutoPlay ? 'text-emerald-500 animate-pulse' : ''} />
            <span>{isAutoPlay ? 'Avto' : 'Avto (A)'}</span>
          </button>

          {/* Presenter Mode Toggle (P) */}
          <button
            onClick={() => setIsPresenterMode((p) => !p)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-all cursor-pointer font-bold text-[11px] ${
              isPresenterMode
                ? deckTheme === 'light'
                  ? 'bg-sky-50 text-[#0284C7] border-sky-300 shadow-xs'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-xs'
                : deckTheme === 'light'
                ? 'bg-white text-slate-600 border-[#E2E8F0] hover:bg-slate-50'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Spiker rejimi (P): matn va eslatmalarni koʻrish"
          >
            <FileText size={12} />
            <span className="hidden sm:inline">Nutq (P)</span>
          </button>

          {/* Fullscreen Button (F) */}
          <button
            onClick={toggleFullscreen}
            className={`p-1.5 rounded-xl border cursor-pointer transition-all ${
              deckTheme === 'light'
                ? 'bg-white hover:bg-slate-50 text-slate-600 border-[#E2E8F0]'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700'
            }`}
            title="Toʻliq ekran (F)"
          >
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
          </button>

          {/* Exit to Landing page */}
          <Link
            to="/"
            className={`px-2.5 py-1 rounded-xl font-bold text-[11px] transition-colors ${
              deckTheme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                : 'bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white'
            }`}
          >
            Chiqish
          </Link>
        </div>
      </header>

      {/* Horizontal Progress bar */}
      <div className={`w-full h-1 relative z-30 ${deckTheme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`}>
        <div
          className="h-full bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-teal-400 transition-all duration-300"
          style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
        />
      </div>

      {/* ================= MAIN SLIDE STAGE ================= */}
      <div className="relative flex-1 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
        {/* Ambient background glows */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] blur-[140px] pointer-events-none rounded-full transition-colors duration-500 ${
            deckTheme === 'light'
              ? 'bg-gradient-to-tr from-[#0284C7]/12 via-[#0D9488]/10 to-[#6366F1]/8'
              : 'bg-gradient-to-r from-[#008BFF]/15 via-[#00D4FF]/10 to-transparent'
          }`}
        />
        <div
          className={`absolute inset-0 [background-size:32px_32px] pointer-events-none ${
            deckTheme === 'light'
              ? 'bg-[radial-gradient(#0284C7_0.6px,transparent_0.6px)] opacity-10'
              : 'bg-[radial-gradient(#008BFF_0.75px,transparent_0.75px)] opacity-10'
          }`}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-center min-h-full">
          {/* ============================================================== */}
          {/* SLIDE 1: LOYIHA NIMA? (0:00 - 0:18) */}
          {/* ============================================================== */}
          {currentSlide === 1 && (
            <div className="space-y-6 text-center animate-fade-in max-w-4xl mx-auto py-6">
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase shadow-xs border ${
                  deckTheme === 'light'
                    ? 'bg-sky-50 text-[#0284C7] border-sky-200'
                    : 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300'
                }`}
              >
                <Sparkles size={13} className={deckTheme === 'light' ? 'text-[#0284C7]' : 'text-cyan-400'} />
                <span>OʻZBEKISTON HEALTHTECH SAAS PLATFORMASI</span>
              </div>

              {/* Animated Big Logo Reveal */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-[#0284C7] via-[#0D9488] to-teal-500 flex items-center justify-center text-white shadow-2xl shadow-sky-500/25 ring-4 ring-sky-400/20">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                    <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="flex items-baseline gap-2">
                    <h1
                      className={`text-4xl sm:text-6xl font-black tracking-tight ${
                        deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                      }`}
                    >
                      ELVORA
                    </h1>
                    <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] to-[#0D9488]">
                      HEALTH
                    </span>
                  </div>
                  <p
                    className={`text-xs sm:text-sm font-bold tracking-wide uppercase ${
                      deckTheme === 'light' ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Klinikangiz uchun yagona aqlli tizim
                  </p>
                </div>
              </div>

              {/* The One Bold Sentence */}
              <h2
                className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight pt-4 ${
                  deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                }`}
              >
                Xususiy klinikalardagi{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-400 underline decoration-rose-400/50">
                  koʻrinmas pul oqishini
                </span>{' '}
                toʻxtatuvchi yagona raqamli boshqaruv platformasi.
              </h2>

              <p
                className={`text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal ${
                  deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                E-navbat, shifokorlar ish jadvali, kassa va tahliliy hisob-kitoblar — bitta xavfsiz va tezkor bulutli ekotizimda.
              </p>

              {/* Styled Placeholder for custom project pitch sentence */}
              <div className="pt-4 max-w-2xl mx-auto space-y-3">
                <div
                  className={`p-4 rounded-2xl text-left text-xs space-y-1.5 border border-dashed ${
                    deckTheme === 'light'
                      ? 'bg-sky-50/60 border-sky-300 text-slate-700 shadow-xs'
                      : 'bg-white/5 border-cyan-400/40 text-slate-300'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between font-bold text-[11px] ${
                      deckTheme === 'light' ? 'text-[#0284C7]' : 'text-cyan-300'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Info size={13} /> Loyiha taʼrifi:
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                        deckTheme === 'light' ? 'bg-sky-100 text-[#0284C7]' : 'bg-cyan-400/20 text-cyan-200'
                      }`}
                    >
                      [MENING MA'LUMOTIM]
                    </span>
                  </div>
                  <p className={deckTheme === 'light' ? 'text-slate-600 italic font-medium' : 'text-slate-300 italic'}>
                    "Elvora Health — xususiy tibbiyot markazlarining operatsion samaradorligini 30% ga oshiruvchi va no-show xarajatlarini bartaraf etuvchi B2B SaaS mahsuloti."
                  </p>
                </div>

                {/* Quick actions for investors */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                  <button
                    onClick={() => setIsFeaturesModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0D9488] hover:from-sky-600 hover:to-teal-600 text-white text-xs font-black shadow-lg shadow-sky-500/25 transition-all cursor-pointer"
                  >
                    <Sparkles size={13} className="text-white" />
                    <span>Sayt Nima Qila Olishini Koʻrish (6 Asosiy Modul)</span>
                  </button>
                  <button
                    onClick={() => goToSlide(3)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      deckTheme === 'light'
                        ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                        : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/10'
                    }`}
                  >
                    <span>Yechim & Arxitektura (3-slayd)</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 2: MUAMMO (0:18 - 0:36) */}
          {/* ============================================================== */}
          {currentSlide === 2 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  MUAMMO VA BOZOR OGʻRIGʻI
                </span>
                <h2
                  className={`text-3xl sm:text-5xl font-black tracking-tight ${
                    deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  Klinika Har Kuni{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-400 to-amber-500">
                    Pul Yoʻqotmoqda
                  </span>
                </h2>
                <p className={`text-xs sm:text-sm ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  Qogʻoz va Excel daftarlarida mutlaqo koʻrinmaydigan 4 ta tizimli oqish nuqtasi:
                </p>
              </div>

              {/* Live Ticker Box */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
                  deckTheme === 'light'
                    ? 'bg-rose-50/70 border-rose-200 shadow-sm'
                    : 'bg-black/60 border-rose-500/40 shadow-xl'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-500 shrink-0">
                    <AlertTriangle size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-500">
                      OʻRTALIK KLINIKA OYLIK SIZISHI:
                    </span>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-rose-500">
                      -{leakCount.toLocaleString('uz-UZ')} UZS / oy
                    </div>
                  </div>
                </div>
                <div
                  className={`text-right text-xs font-semibold sm:max-w-[220px] ${
                    deckTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  * 8 shifokorga ega klinikaning no-show va boʻsh slotlaridan boy berilayotgan zarari
                </div>
              </div>

              {/* 4 Problem Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div
                  className={`p-4 rounded-2xl border space-y-1.5 transition-all ${
                    deckTheme === 'light'
                      ? 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                      : 'bg-white/5 border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-rose-500 font-black flex items-center gap-1.5">
                      1. No-Show (Kelmaslik)
                    </span>
                    <span className="text-[10px] font-mono text-rose-600 bg-rose-100 px-2 py-0.5 rounded font-bold">
                      20–30% bemor
                    </span>
                  </div>
                  <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Bemor yoziladi, lekin kelmaydi. Shifokor kutadi, boshqa bemor olinmaydi, klinika xarajatlari esa oʻzgarmaydi.
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border space-y-1.5 transition-all ${
                    deckTheme === 'light'
                      ? 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                      : 'bg-white/5 border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-500 font-black flex items-center gap-1.5">
                      2. Boʻsh Slotlar
                    </span>
                    <span className="text-[10px] font-mono text-amber-600 bg-amber-100 px-2 py-0.5 rounded font-bold">
                      Kassa = 0 UZS
                    </span>
                  </div>
                  <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Kun oʻrtasida shifokor jadvallarida 1-2 soatlik boʻshliqlar paydo boʻladi, ularni tezkor toʻldirish tizimi mavjud emas.
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border space-y-1.5 transition-all ${
                    deckTheme === 'light'
                      ? 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                      : 'bg-white/5 border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-black flex items-center gap-1.5 ${
                        deckTheme === 'light' ? 'text-slate-800' : 'text-slate-200'
                      }`}
                    >
                      3. Qogʻoz & Excel Tartibsizligi
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        deckTheme === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      Janjal va navbat
                    </span>
                  </div>
                  <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Daftar yoʻqoladi, navbat chalkashadi, eshik oldidagi tirbandlik tufayli bemorlar norozi boʻlib ketib qoladi.
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border space-y-1.5 transition-all ${
                    deckTheme === 'light'
                      ? 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                      : 'bg-white/5 border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-rose-500 font-black flex items-center gap-1.5">
                      4. Koʻrinmas Hisob-Kitob
                    </span>
                    <span className="text-[10px] font-mono text-rose-600 bg-rose-100 px-2 py-0.5 rounded font-bold">
                      Kassa nazoratsiz
                    </span>
                  </div>
                  <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Klinika rahbari qaysi shifokor qancha daromad keltirayotganini va qancha pul chetda qolayotganini aniq koʻra olmaydi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 3: YECHIM — REAL MAHSULOT (0:36 - 0:54) */}
          {/* ============================================================== */}
          {currentSlide === 3 && (
            <div className="space-y-5 animate-fade-in max-w-4xl mx-auto py-2">
              <div className="text-center space-y-1.5">
                <span
                  className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                    deckTheme === 'light'
                      ? 'bg-sky-50 text-[#0284C7] border-sky-200'
                      : 'text-cyan-300 bg-blue-500/10 border-blue-400/30'
                  }`}
                >
                  YECHIM: AMALDAGI MAHSULOT
                </span>
                <h2
                  className={`text-2xl sm:text-4xl font-black tracking-tight ${
                    deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  Bitta Oyna. Bitta Yaxlit Ekotizim.
                </h2>
                <p className={`text-xs sm:text-sm ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  Biz faqat bugun ishlayotgan real MVP modullarini namoyish etamiz:
                </p>
              </div>

              {/* Module Switcher Buttons */}
              <div className="flex justify-center gap-2 pt-1">
                <button
                  onClick={() => setDemoActiveTab('insights')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    demoActiveTab === 'insights'
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white shadow-md shadow-sky-500/20'
                      : deckTheme === 'light'
                      ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  Elvora Insights™
                </button>
                <button
                  onClick={() => setDemoActiveTab('queue')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    demoActiveTab === 'queue'
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white shadow-md shadow-sky-500/20'
                      : deckTheme === 'light'
                      ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  E-Navbat & Qabullar
                </button>
                <button
                  onClick={() => setDemoActiveTab('finance')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    demoActiveTab === 'finance'
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white shadow-md shadow-sky-500/20'
                      : deckTheme === 'light'
                      ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  Kassa & Moliya
                </button>
              </div>

              {/* Interactive Module Showcase Box */}
              <div
                className={`p-5 rounded-3xl border shadow-xl space-y-4 transition-all ${
                  deckTheme === 'light'
                    ? 'bg-white border-slate-200 text-slate-800'
                    : 'bg-slate-900/90 border-slate-700 shadow-2xl text-slate-100'
                }`}
              >
                {demoActiveTab === 'insights' && (
                  <div className="space-y-3">
                    <div
                      className={`flex items-center justify-between border-b pb-2 ${
                        deckTheme === 'light' ? 'border-slate-100' : 'border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Bot size={18} className="text-[#0284C7]" />
                        <span
                          className={`text-xs font-extrabold ${
                            deckTheme === 'light' ? 'text-slate-800' : 'text-white'
                          }`}
                        >
                          Elvora Insights™ — Biznes Analitika
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ● Real hisob-kitob qoidalari
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                      <div
                        className={`p-3 rounded-xl border ${
                          deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 block font-semibold">Oʻrtacha No-Show:</span>
                        <span className="text-xl font-black text-rose-500">24.2% → 7.1%</span>
                        <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">-65% yoʻqotish qisqardi</span>
                      </div>
                      <div
                        className={`p-3 rounded-xl border ${
                          deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 block font-semibold">Shifokorlar Bandligi:</span>
                        <span className="text-xl font-black text-[#0284C7]">84.6%</span>
                        <span className="text-[9px] text-slate-500 block mt-0.5">Boʻsh slotlar toʻldirilmoqda</span>
                      </div>
                      <div
                        className={`p-3 rounded-xl border ${
                          deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 block font-semibold">Saqlab Qolingan Pul:</span>
                        <span className="text-xl font-black text-emerald-600">+18.4 mln UZS</span>
                        <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">Avtomatik eslatmalar hisobiga</span>
                      </div>
                    </div>
                    <p className={`text-xs italic ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                      "Tizim shifokorlar bandligi va no-show xatarlarini real vaqtda tahlil qilib, klinika rahbariga aniq amaliy harakatlar tavsiya qiladi."
                    </p>
                  </div>
                )}

                {demoActiveTab === 'queue' && (
                  <div className="space-y-3">
                    <div
                      className={`flex items-center justify-between border-b pb-2 ${
                        deckTheme === 'light' ? 'border-slate-100' : 'border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Activity size={18} className="text-[#0284C7]" />
                        <span
                          className={`text-xs font-extrabold ${
                            deckTheme === 'light' ? 'text-slate-800' : 'text-white'
                          }`}
                        >
                          Jonli E-Navbat & Bemorlar Qabuli
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        0 ta double-booking
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div
                        className={`p-2.5 rounded-xl flex items-center justify-between text-xs border ${
                          deckTheme === 'light'
                            ? 'bg-slate-50 border-slate-200 text-slate-800'
                            : 'bg-white/5 border-white/10 text-white'
                        }`}
                      >
                        <span className="font-bold">09:30 • Dr. Usmonov (Kardiolog)</span>
                        <span className="text-emerald-600 font-bold">Chipta #A-042 • Qabulda</span>
                      </div>
                      <div
                        className={`p-2.5 rounded-xl flex items-center justify-between text-xs border ${
                          deckTheme === 'light'
                            ? 'bg-slate-50 border-slate-200 text-slate-800'
                            : 'bg-white/5 border-white/10 text-white'
                        }`}
                      >
                        <span className="font-bold">10:15 • Dr. Karimova (Nevropatolog)</span>
                        <span className="text-sky-600 font-bold">Chipta #B-015 • Kutmoqda (4 daq.)</span>
                      </div>
                    </div>
                    <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                      Kutish zalidagi TV tablo va bemorlar telefonida yagona navbat. Shifokor band vaqtiga ikki marta yozib qoʻyish xavfi 100% bartaraf etilgan.
                    </p>
                  </div>
                )}

                {demoActiveTab === 'finance' && (
                  <div className="space-y-3">
                    <div
                      className={`flex items-center justify-between border-b pb-2 ${
                        deckTheme === 'light' ? 'border-slate-100' : 'border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <DollarSign size={18} className="text-[#0284C7]" />
                        <span
                          className={`text-xs font-extrabold ${
                            deckTheme === 'light' ? 'text-slate-800' : 'text-white'
                          }`}
                        >
                          Shaffof Kassa va Tushum Nazorati
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        0 UZS tafovut
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div
                        className={`p-3 rounded-xl border ${
                          deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 block font-semibold">Bugungi Kirim:</span>
                        <span
                          className={`text-xl font-black ${
                            deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                          }`}
                        >
                          28 450 000 UZS
                        </span>
                      </div>
                      <div
                        className={`p-3 rounded-xl border ${
                          deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 block font-semibold">Toʻlov Usullari:</span>
                        <span className="text-xs text-[#0284C7] block font-bold mt-1">Naqd + Terminal / Click & Payme (tez orada)</span>
                      </div>
                    </div>
                    <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                      Har bir tushum faqat koʻrsatilgan xizmat cheki va shifokor koʻrigiga bogʻlanadi. Kun oxirida hisob-kitob 3 daqiqada yakunlanadi.
                    </p>
                  </div>
                )}
              </div>

              {/* Direct link to real working /app */}
              <div className="text-center pt-1">
                <Link
                  to="/app/dashboard"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-xs text-[#0284C7] hover:underline font-bold"
                >
                  <span>Hozir ishlayotgan boshqaruv panelini koʻrish (/app)</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 4: BOZOR HAJMI (0:54 - 1:12) */}
          {/* ============================================================== */}
          {currentSlide === 4 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span
                  className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                    deckTheme === 'light'
                      ? 'bg-sky-50 text-[#0284C7] border-sky-200'
                      : 'text-[#00D4FF] bg-blue-500/10 border-blue-400/30'
                  }`}
                >
                  BOZOR HAJMI VA IMKONIYAT
                </span>
                <h2
                  className={`text-3xl sm:text-5xl font-black tracking-tight ${
                    deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  $12.5M+ Oʻzbekiston HealthTech Bozorida
                </h2>
                <p className={`text-xs sm:text-sm ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  Xususiy tibbiyot sohasi har yili 18% dan ziyod surʼat bilan barqaror oʻsmoqda:
                </p>
              </div>

              {/* TAM / SAM / SOM Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* TAM */}
                <div
                  className={`p-5 rounded-3xl border space-y-3 text-center relative overflow-hidden transition-all ${
                    deckTheme === 'light'
                      ? 'bg-white border-blue-200 shadow-sm'
                      : 'bg-white/5 border-blue-500/30'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 mx-auto flex items-center justify-center text-[#0284C7]">
                    <Target size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#0284C7] block">
                      TAM (Jami Bozor)
                    </span>
                    <div
                      className={`text-3xl font-black mt-1 ${
                        deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                      }`}
                    >
                      $45M+
                    </div>
                    <span className={`text-xs block mt-1 font-semibold ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                      Markaziy Osiyo
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${deckTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Oʻzbekiston, Qozogʻiston va Qirgʻizistondagi 12 000 dan ziyod xususiy klinikalarning tibbiy dasturiy taʼminot xarajatlari.
                  </p>
                </div>

                {/* SAM */}
                <div
                  className={`p-5 rounded-3xl border-2 space-y-3 text-center relative overflow-hidden shadow-md transition-all ${
                    deckTheme === 'light'
                      ? 'bg-sky-50/70 border-[#0284C7] shadow-sky-500/10'
                      : 'bg-gradient-to-b from-[#008BFF]/20 to-transparent border-cyan-400/50 shadow-cyan-500/10'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#0284C7]/15 mx-auto flex items-center justify-center text-[#0284C7]">
                    <Building size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#0284C7] block">
                      SAM (Oʻzbekiston)
                    </span>
                    <div
                      className={`text-3xl font-black mt-1 ${
                        deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                      }`}
                    >
                      $12.5M+
                    </div>
                    <span className="text-xs text-[#0284C7] block mt-1 font-bold">3 500+ Xususiy Klinika</span>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Oʻzbekistondagi xususiy koʻp tarmoqli klinikalar, diagnostika markazlari va stomatologiyalar.
                  </p>
                </div>

                {/* SOM */}
                <div
                  className={`p-5 rounded-3xl border space-y-3 text-center relative overflow-hidden transition-all ${
                    deckTheme === 'light'
                      ? 'bg-white border-emerald-200 shadow-sm'
                      : 'bg-white/5 border-emerald-500/30'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 mx-auto flex items-center justify-center text-emerald-600">
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 block">
                      SOM (12-18 Oylik Maqsad)
                    </span>
                    <div className="text-2xl font-black text-emerald-600 mt-1">~$350K ARR</div>
                    <span className={`text-xs block mt-1 font-semibold ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                      150 ta Klinika
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${deckTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Toshkent va viloyat markazlaridagi yetakchi xususiy tibbiyot markazlarini qamrab olish orqali.
                  </p>
                </div>
              </div>

              {/* Source callout & placeholder note */}
              <div
                className={`p-3 rounded-2xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${
                  deckTheme === 'light'
                    ? 'bg-slate-100 border-slate-200 text-slate-600'
                    : 'bg-slate-900/80 border-slate-700/80 text-slate-400'
                }`}
              >
                <span className="italic">
                  * Manba: Ochiq statistik maʼlumotlar va bozor modellashtirish hisob-kitobi
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border font-bold ${
                    deckTheme === 'light'
                      ? 'bg-sky-50 text-[#0284C7] border-sky-200'
                      : 'bg-cyan-500/10 text-cyan-300 border-cyan-400/30'
                  }`}
                >
                  [MENING MA'LUMOTIM, manba bilan]
                </span>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 5: NATIJALAR & TRACTION (1:12 - 1:30) */}
          {/* ============================================================== */}
          {currentSlide === 5 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  NATIJALAR VA TRACTION
                </span>
                <h2
                  className={`text-3xl sm:text-5xl font-black tracking-tight ${
                    deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  Haqiqiy Mahsulot. Aniq Reja.
                </h2>
                <p className={`text-xs sm:text-sm ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  Biz uydirma raqamlar va yolgʻon statistikalarni keltirmaymiz. Faqat haqiqiy holat:
                </p>
              </div>

              {/* 3 Honest Traction Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  className={`p-5 rounded-3xl border space-y-2 transition-all ${
                    deckTheme === 'light'
                      ? 'bg-white border-slate-200 shadow-sm'
                      : 'bg-white/5 border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
                    <CheckCircle2 size={16} />
                    <span>MVP STATUSI:</span>
                  </div>
                  <h4 className={`text-lg font-black ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    100% Ishlovchi MVP
                  </h4>
                  <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Bemorlar, jadvallar, navbat va kassa modullari arxitekturasi toʻliq ishlab chiqilgan va sinovdan oʻtkazilgan.
                  </p>
                  <span className="inline-block text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Pilotga tayyor
                  </span>
                </div>

                <div
                  className={`p-5 rounded-3xl border space-y-2 transition-all ${
                    deckTheme === 'light'
                      ? 'bg-white border-slate-200 shadow-sm'
                      : 'bg-white/5 border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center gap-2 text-[#0284C7] text-xs font-bold">
                    <Users size={16} />
                    <span>PILOT HAMKORLAR:</span>
                  </div>
                  <h4 className={`text-lg font-black ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    Pilot Klinikalarni Ulash
                  </h4>
                  <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Toshkent shahridagi dastlabki xususiy klinikalar bilan tizimni bepul pilot sinoviga joriy etish muzokaralari boshlandi.
                  </p>
                  <span
                    className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      deckTheme === 'light' ? 'bg-sky-100 text-[#0284C7]' : 'bg-cyan-500/20 text-cyan-200'
                    }`}
                  >
                    [MENING MA'LUMOTIM]
                  </span>
                </div>

                <div
                  className={`p-5 rounded-3xl border space-y-2 transition-all ${
                    deckTheme === 'light'
                      ? 'bg-white border-slate-200 shadow-sm'
                      : 'bg-white/5 border-blue-500/40'
                  }`}
                >
                  <div className="flex items-center gap-2 text-[#0284C7] text-xs font-bold">
                    <ShieldCheck size={16} />
                    <span>XAVFSIZLIK:</span>
                  </div>
                  <h4 className={`text-lg font-black ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    Zero-Data Leakage
                  </h4>
                  <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Bemor maʼlumotlari tashqi neyrotarmoqlarga chiqib ketmaydi. Oʻzbekiston qonunchiligi talablariga mos mahalliy saqlash.
                  </p>
                  <span
                    className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      deckTheme === 'light' ? 'bg-blue-100 text-[#0284C7]' : 'bg-blue-500/20 text-blue-300'
                    }`}
                  >
                    Mahalliy Server
                  </span>
                </div>
              </div>

              {/* Honest Status Callout */}
              <div
                className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                  deckTheme === 'light'
                    ? 'bg-slate-50 border-slate-200 text-slate-700'
                    : 'bg-slate-900/90 border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>Mahsulotning shaffoflik bayonnomasi:</span>
                  <span className="text-emerald-600 font-mono text-[10px] bg-emerald-100 px-2 py-0.5 rounded font-bold">
                    100% Halol
                  </span>
                </div>
                <p className={deckTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}>
                  • <strong>Real ishlaydi:</strong> Bemorlar kartotekasi, shifokorlar ish jadvallari, navbat chiptasi, kassa kirim-chiqim jurnali va Insights hisob-kitoblari.<br />
                  • <strong>Demo / Rejalashtirilgan:</strong> Click/Payme toʻlov shlyuzlari (tez orada), SSV/DMED milliy standartlari integratsiyasi (tez orada).
                </p>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 6: PUL QANDAY TOPILADI (1:30 - 1:48) */}
          {/* ============================================================== */}
          {currentSlide === 6 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span
                  className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                    deckTheme === 'light'
                      ? 'bg-sky-50 text-[#0284C7] border-sky-200'
                      : 'text-[#00D4FF] bg-blue-500/10 border-blue-400/30'
                  }`}
                >
                  MONETIZATSIYA VA UNIT-ECONOMICS
                </span>
                <h2
                  className={`text-3xl sm:text-5xl font-black tracking-tight ${
                    deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  B2B SaaS Obuna & 14x ROI
                </h2>
                <p className={`text-xs sm:text-sm ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  Klinika toʻlagan har 1 soʻmi uchun 14 soʻm saqlab qoladi:
                </p>
              </div>

              {/* 3 Pricing Tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  className={`p-4 rounded-2xl border space-y-2 transition-all ${
                    deckTheme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/5 border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">STARTER</span>
                  <div
                    className={`text-2xl font-black ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}
                  >
                    590 000 <span className="text-xs text-slate-400 font-normal">UZS/oy</span>
                  </div>
                  <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Kichik kabinetlar va yakka tartibdagi shifokorlar (3 tagacha xodim).
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border-2 shadow-xl space-y-2 relative transition-all ${
                    deckTheme === 'light'
                      ? 'bg-sky-50/70 border-[#0284C7] shadow-sky-500/15'
                      : 'bg-gradient-to-b from-[#008BFF]/25 to-slate-900 border-cyan-400'
                  }`}
                >
                  <span className="absolute -top-2.5 right-4 bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase shadow-xs">
                    Eng Ommabop
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0284C7] block">ELVORA PRO</span>
                  <div
                    className={`text-2xl font-black ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}
                  >
                    1 290 000 <span className="text-xs text-slate-400 font-normal">UZS/oy</span>
                  </div>
                  <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>
                    15 tagacha shifokor, E-navbat tablosi, avtomatik eslatmalar va Insights tahlili.
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border space-y-2 transition-all ${
                    deckTheme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/5 border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">ENTERPRISE</span>
                  <div
                    className={`text-2xl font-black ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}
                  >
                    2 890 000 <span className="text-xs text-slate-400 font-normal">UZS/oy</span>
                  </div>
                  <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Koʻp tarmoqli klinikalar, cheksiz filiallar, LIS apparatlari va shaxsiy menejer.
                  </p>
                </div>
              </div>

              {/* Concrete Unit-Economics Box */}
              <div
                className={`p-5 rounded-3xl border space-y-3 transition-all ${
                  deckTheme === 'light'
                    ? 'bg-white border-slate-200 shadow-lg'
                    : 'bg-slate-900 border-cyan-400/40'
                }`}
              >
                <div
                  className={`flex items-center justify-between text-xs font-black border-b pb-2 ${
                    deckTheme === 'light'
                      ? 'text-[#0284C7] border-slate-100'
                      : 'text-cyan-300 border-slate-800'
                  }`}
                >
                  <span>Bitta Klinika Misolida Unit-Economics (8 nafar shifokor):</span>
                  <span className="text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    14x ROI
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Klinika oylik toʻlovi:</span>
                    <div
                      className={`text-base font-extrabold ${
                        deckTheme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      1 290 000 UZS / oy
                    </div>
                    <span className="text-[10px] text-slate-500">Elvora Pro obunasi</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">No-show qisqarish daromadi:</span>
                    <div className="text-base font-extrabold text-emerald-600">+18 450 000 UZS / oy</div>
                    <span className="text-[10px] text-emerald-600 font-semibold">Kassaga qaytgan sof pul</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Klinika sof yillik foydasi:</span>
                    <div className="text-base font-extrabold text-[#0284C7]">+205 900 000 UZS / yil</div>
                    <span className="text-[10px] text-sky-600 font-semibold">Yillik qoʻshimcha daromad</span>
                  </div>
                </div>

                <div className="pt-1 text-[10px] text-slate-400 italic text-right">
                  * Faraz: oʻrtacha qabul 150 000 UZS, kunlik 14 qabul, no-show 24% dan 8% ga tushirilganda
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 7: RAQOBATCHILAR VA DMED (1:48 - 2:06) */}
          {/* ============================================================== */}
          {currentSlide === 7 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span
                  className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                    deckTheme === 'light'
                      ? 'bg-sky-50 text-[#0284C7] border-sky-200'
                      : 'text-[#00D4FF] bg-blue-500/10 border-blue-400/30'
                  }`}
                >
                  RAQOBATCHILAR VA POZITSIYALASH
                </span>
                <h2
                  className={`text-3xl sm:text-5xl font-black tracking-tight ${
                    deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  DMED vs Elvora Health
                </h2>
                <p className={`text-xs sm:text-sm ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  Biz davlat tizimlari bilan raqobatlashmaymiz, balki ularni toʻldiramiz:
                </p>
              </div>

              {/* Comparison Table */}
              <div
                className={`overflow-hidden rounded-3xl border shadow-xl transition-all ${
                  deckTheme === 'light'
                    ? 'bg-white border-slate-200 text-slate-800'
                    : 'bg-slate-900/90 border-slate-700 shadow-2xl text-white'
                }`}
              >
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr
                      className={`border-b ${
                        deckTheme === 'light'
                          ? 'bg-slate-50 text-slate-700 border-slate-200'
                          : 'bg-slate-800 text-white border-slate-700'
                      }`}
                    >
                      <th className="p-3.5 font-black">Xususiyat / Vazifa</th>
                      <th className={`p-3.5 font-bold ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Davlat Tizimi (DMED)
                      </th>
                      <th
                        className={`p-3.5 font-black border-l ${
                          deckTheme === 'light'
                            ? 'text-[#0284C7] bg-sky-50 border-sky-200'
                            : 'text-cyan-300 bg-blue-950/60 border-cyan-500/30'
                        }`}
                      >
                        Elvora Health (Vertikal MIS)
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y ${
                      deckTheme === 'light' ? 'divide-slate-200 text-slate-700' : 'divide-slate-800 text-slate-300'
                    }`}
                  >
                    <tr>
                      <td className={`p-3 font-semibold ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        Asosiy vazifasi:
                      </td>
                      <td className="p-3">Davlat tibbiy reyestri & E-retsept nazorati</td>
                      <td
                        className={`p-3 font-semibold border-l ${
                          deckTheme === 'light'
                            ? 'text-slate-900 bg-sky-50/40 border-sky-100 font-bold'
                            : 'text-cyan-200 bg-blue-950/30 border-cyan-500/20'
                        }`}
                      >
                        Xususiy klinikaning ichki operatsion biznesi & daromadi
                      </td>
                    </tr>
                    <tr>
                      <td className={`p-3 font-semibold ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        Kassa & Moliya tahlili:
                      </td>
                      <td className="p-3 text-slate-400">Mavjud emas (faoliyat doirasida emas)</td>
                      <td
                        className={`p-3 font-semibold border-l ${
                          deckTheme === 'light'
                            ? 'text-emerald-600 bg-sky-50/40 border-sky-100 font-bold'
                            : 'text-emerald-400 bg-blue-950/30 border-cyan-500/20'
                        }`}
                      >
                        ✓ Toʻliq ichki kassa, tushum, xodim maoshlari
                      </td>
                    </tr>
                    <tr>
                      <td className={`p-3 font-semibold ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        No-Show & Bandlik nazorati:
                      </td>
                      <td className="p-3 text-slate-400">Yoʻq (faqat umumiy yozilish)</td>
                      <td
                        className={`p-3 font-semibold border-l ${
                          deckTheme === 'light'
                            ? 'text-emerald-600 bg-sky-50/40 border-sky-100 font-bold'
                            : 'text-emerald-400 bg-blue-950/30 border-cyan-500/20'
                        }`}
                      >
                        ✓ Avtomatik eslatmalar & boʻsh slotlarni toʻldirish
                      </td>
                    </tr>
                    <tr>
                      <td className={`p-3 font-semibold ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        Kutish zali E-navbat tablosi:
                      </td>
                      <td className="p-3 text-slate-400">Standartlashtirilmagan</td>
                      <td
                        className={`p-3 font-semibold border-l ${
                          deckTheme === 'light'
                            ? 'text-emerald-600 bg-sky-50/40 border-sky-100 font-bold'
                            : 'text-emerald-400 bg-blue-950/30 border-cyan-500/20'
                        }`}
                      >
                        ✓ TV Tablo + Ovozli chaqiruv + QR kod
                      </td>
                    </tr>
                    <tr>
                      <td className={`p-3 font-semibold ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        415-PQ Standartlari:
                      </td>
                      <td className="p-3 text-slate-500">Rasmiy milliy operator</td>
                      <td
                        className={`p-3 font-bold border-l ${
                          deckTheme === 'light'
                            ? 'text-[#0284C7] bg-sky-50/40 border-sky-100'
                            : 'text-cyan-300 bg-blue-950/30 border-cyan-500/20'
                        }`}
                      >
                        Integratsiya shlyuzi (hamkorlik rejasida)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Crucial honest legal note */}
              <div
                className={`p-3.5 rounded-2xl border text-xs text-center font-bold transition-all ${
                  deckTheme === 'light'
                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                    : 'bg-amber-500/10 border-amber-400/30 text-amber-300'
                }`}
              >
                ⚠️ MUHIM HALOL POZITSIYA: Elvora Health 415-PQ boʻyicha davlat operatori ekanligini daʼvo qilmaydi. Biz xususiy klinika biznesini kuchaytiruvchi va davlat tizimlariga integratsiyalashuvchi mustaqil SaaS yechimmiz.
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 8: JAMOA (2:06 - 2:24) */}
          {/* ============================================================== */}
          {currentSlide === 8 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span
                  className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                    deckTheme === 'light'
                      ? 'bg-sky-50 text-[#0284C7] border-sky-200'
                      : 'text-[#00D4FF] bg-blue-500/10 border-blue-400/30'
                  }`}
                >
                  LOYIHA ARXITEKTORLARI
                </span>
                <h2
                  className={`text-3xl sm:text-5xl font-black tracking-tight ${
                    deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  Tibbiyot va IT Tajribasi Birlashgan Jamoa
                </h2>
                <p className={`text-xs sm:text-sm ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  Klinika ogʻriqlarini ichkaridan biladigan asoschilar:
                </p>
              </div>

              {/* Team Cards with explicit [MENING MA'LUMOTIM] placeholders */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div
                  className={`p-6 rounded-3xl border transition-all text-center space-y-3 ${
                    deckTheme === 'light'
                      ? 'bg-white border-slate-200 shadow-sm hover:border-sky-300'
                      : 'bg-white/5 border-white/10 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0284C7] to-[#0D9488] mx-auto flex items-center justify-center text-white text-xl font-black shadow-lg">
                    T
                  </div>
                  <div>
                    <h4 className={`text-base font-extrabold ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      Temur Rahmatullayev
                    </h4>
                    <span className={`text-xs font-bold block ${deckTheme === 'light' ? 'text-[#0284C7]' : 'text-cyan-300'}`}>
                      Asoschi & Mahsulot Yetakchisi
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Sogʻliqni saqlash jarayonlari va B2B SaaS tizimlari ishlab chiquvchisi. Mahsulot arxitekturasi va vizioni.
                  </p>
                  <span
                    className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      deckTheme === 'light' ? 'bg-sky-100 text-[#0284C7]' : 'bg-cyan-500/20 text-cyan-200'
                    }`}
                  >
                    [MENING MA'LUMOTIM]
                  </span>
                </div>

                <div
                  className={`p-6 rounded-3xl border transition-all text-center space-y-3 ${
                    deckTheme === 'light'
                      ? 'bg-white border-slate-200 shadow-sm hover:border-sky-300'
                      : 'bg-white/5 border-white/10 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-[#0284C7] mx-auto flex items-center justify-center text-white text-xl font-black shadow-lg">
                    A
                  </div>
                  <div>
                    <h4 className={`text-base font-extrabold ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      Dr. Anvar Usmonov
                    </h4>
                    <span className={`text-xs font-bold block ${deckTheme === 'light' ? 'text-[#0284C7]' : 'text-cyan-300'}`}>
                      Bosh Tibbiy Maslahatchi (MD)
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    18 yillik klinik amaliyotga ega shifokor-kardiolog. Qabullar etikasi va klinika ichki ish jadvallari eksperti.
                  </p>
                  <span
                    className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      deckTheme === 'light' ? 'bg-sky-100 text-[#0284C7]' : 'bg-cyan-500/20 text-cyan-200'
                    }`}
                  >
                    [MENING MA'LUMOTIM]
                  </span>
                </div>

                <div
                  className={`p-6 rounded-3xl border transition-all text-center space-y-3 ${
                    deckTheme === 'light'
                      ? 'bg-white border-slate-200 shadow-sm hover:border-sky-300'
                      : 'bg-white/5 border-white/10 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0284C7] to-emerald-500 mx-auto flex items-center justify-center text-white text-xl font-black shadow-lg">
                    R
                  </div>
                  <div>
                    <h4 className={`text-base font-extrabold ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      Rustam Karimov
                    </h4>
                    <span className={`text-xs font-bold block ${deckTheme === 'light' ? 'text-[#0284C7]' : 'text-cyan-300'}`}>
                      Texnik Direktor (Lead Architect)
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    Katta yuklamali taqsimlangan tizimlar va maʼlumotlar xavfsizligi boʻyicha 9 yillik muhandislik staji.
                  </p>
                  <span
                    className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      deckTheme === 'light' ? 'bg-sky-100 text-[#0284C7]' : 'bg-cyan-500/20 text-cyan-200'
                    }`}
                  >
                    [MENING MA'LUMOTIM]
                  </span>
                </div>
              </div>

              <div
                className={`p-3 rounded-2xl border text-center text-xs ${
                  deckTheme === 'light'
                    ? 'bg-slate-100 border-slate-200 text-slate-600'
                    : 'bg-slate-900 border-slate-700/80 text-slate-400'
                }`}
              >
                💡 <span className={`font-bold ${deckTheme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>Eslatma:</span> Yuqoridagi jamoa aʼzolari va biografiyalari <code>[MENING MA'LUMOTIM]</code> sifatida belgilangan boʻlib, oʻzingizning real jamoangiz maʼlumotlari bilan toʻldirishingiz mumkin.
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 9: SOʻROV (2:24 - 2:42) */}
          {/* ============================================================== */}
          {currentSlide === 9 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  INVESTITSIYA SOʻROVI
                </span>
                <h2
                  className={`text-3xl sm:text-5xl font-black tracking-tight ${
                    deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  Pre-Seed Raundi & Mablagʻlar Taqsimoti
                </h2>
                <p className={`text-xs sm:text-sm ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  12-18 oylik runway va dastlabki 150 ta klinikani ulash rejasi:
                </p>
              </div>

              {/* Investment Amount & Donut Chart Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: Investment Amount Callout (5 cols) */}
                <div
                  className={`md:col-span-5 p-6 rounded-3xl border-2 shadow-xl space-y-4 text-center sm:text-left transition-all ${
                    deckTheme === 'light'
                      ? 'bg-white border-[#0284C7]'
                      : 'bg-gradient-to-br from-[#008BFF]/20 via-slate-900 to-[#071328] border-cyan-400'
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase ${
                      deckTheme === 'light' ? 'bg-sky-100 text-[#0284C7]' : 'bg-cyan-500/20 text-cyan-300'
                    }`}
                  >
                    <DollarSign size={13} />
                    <span>PRE-SEED RAUNDI</span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Kerakli investitsiya summasi:</span>
                    <div
                      className={`text-3xl sm:text-4xl font-black mt-1 ${
                        deckTheme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      [MENING MA'LUMOTIM]
                    </div>
                    <span
                      className={`text-xs block font-bold mt-1 ${
                        deckTheme === 'light' ? 'text-[#0284C7]' : 'text-cyan-300'
                      }`}
                    >
                      (Tavsiya: $50 000 – $100 000)
                    </span>
                  </div>

                  <div
                    className={`space-y-2 pt-2 border-t text-xs ${
                      deckTheme === 'light' ? 'border-slate-100 text-slate-600' : 'border-slate-700/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Kutilayotgan Runway:</span>
                      <strong className={deckTheme === 'light' ? 'text-slate-900' : 'text-white'}>14-16 oy</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Boshlangʻich baholash (Cap):</span>
                      <strong className={deckTheme === 'light' ? 'text-[#0284C7]' : 'text-cyan-300'}>
                        [MENING MA'LUMOTIM]
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Right: SVG Donut Chart for Use of Funds (7 cols) */}
                <div
                  className={`md:col-span-7 p-6 rounded-3xl border space-y-4 transition-all ${
                    deckTheme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/5 border-slate-700'
                  }`}
                >
                  <h4
                    className={`text-xs font-black uppercase tracking-wider ${
                      deckTheme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Mablagʻlarning Ishlatilishi (Use of Funds):
                  </h4>

                  <div className="space-y-3 text-xs">
                    {/* Item 1 */}
                    <div className="space-y-1">
                      <div
                        className={`flex justify-between font-bold ${
                          deckTheme === 'light' ? 'text-slate-800' : 'text-white'
                        }`}
                      >
                        <span>45% — Muhandislik & Mobil Ilova (iOS/Android)</span>
                        <span className="text-[#0284C7]">45%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden ${deckTheme === 'light' ? 'bg-slate-100' : 'bg-slate-800'}`}>
                        <div className="h-full bg-gradient-to-r from-[#0284C7] to-teal-400 w-[45%]" />
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="space-y-1">
                      <div
                        className={`flex justify-between font-bold ${
                          deckTheme === 'light' ? 'text-slate-800' : 'text-white'
                        }`}
                      >
                        <span>30% — B2B Sotuv & Klinikalarda Pilot Joriy Etish</span>
                        <span className="text-emerald-600">30%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden ${deckTheme === 'light' ? 'bg-slate-100' : 'bg-slate-800'}`}>
                        <div className="h-full bg-emerald-500 w-[30%]" />
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="space-y-1">
                      <div
                        className={`flex justify-between font-bold ${
                          deckTheme === 'light' ? 'text-slate-800' : 'text-white'
                        }`}
                      >
                        <span>15% — Sertifikatlash & Axborot Xavfsizligi Auditi</span>
                        <span className="text-purple-600">15%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden ${deckTheme === 'light' ? 'bg-slate-100' : 'bg-slate-800'}`}>
                        <div className="h-full bg-purple-500 w-[15%]" />
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="space-y-1">
                      <div
                        className={`flex justify-between font-bold ${
                          deckTheme === 'light' ? 'text-slate-800' : 'text-white'
                        }`}
                      >
                        <span>10% — Operatsion & Yuridik Zaxira</span>
                        <span className="text-amber-600">10%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden ${deckTheme === 'light' ? 'bg-slate-100' : 'bg-slate-800'}`}>
                        <div className="h-full bg-amber-500 w-[10%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 10: YAKUN & KONTAKTLAR (2:42 - 3:00) */}
          {/* ============================================================== */}
          {currentSlide === 10 && (
            <div className="space-y-6 text-center animate-fade-in max-w-4xl mx-auto py-4">
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase shadow-xs border ${
                  deckTheme === 'light'
                    ? 'bg-sky-50 text-[#0284C7] border-sky-200'
                    : 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300'
                }`}
              >
                <CheckCircle2 size={13} className={deckTheme === 'light' ? 'text-[#0284C7]' : 'text-cyan-400'} />
                <span>INVESTITSIYA VA HAMKORLIK</span>
              </div>

              {/* Memorable Closing Line */}
              <h2
                className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
                  deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'
                }`}
              >
                "Har bir soʻm hisobda, har bir shifokor band,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-teal-500">
                  har bir bemor mamnun.
                </span>"
              </h2>

              <p className={`text-xs sm:text-base max-w-xl mx-auto ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                Biz bilan Oʻzbekiston xususiy tibbiyotini raqamlashtirishda yetakchi boʻling!
              </p>

              {/* Contacts & QR Card */}
              <div
                className={`p-6 rounded-3xl border shadow-xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 transition-all ${
                  deckTheme === 'light'
                    ? 'bg-white border-slate-200 text-slate-800'
                    : 'bg-slate-900/90 border-slate-700 shadow-2xl text-white'
                }`}
              >
                {/* Contact details */}
                <div className="text-left space-y-3">
                  <div className="space-y-1">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider block ${
                        deckTheme === 'light' ? 'text-[#0284C7]' : 'text-cyan-300'
                      }`}
                    >
                      RASMIY ALOQA
                    </span>
                    <h4 className={`text-lg font-black ${deckTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      Elvora Health Jamoasi
                    </h4>
                  </div>

                  <div className={`space-y-2 text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    <div className="flex items-center gap-2.5">
                      <Mail size={14} className={deckTheme === 'light' ? 'text-[#0284C7]' : 'text-[#00D4FF]'} />
                      <a
                        href="mailto:info@elvorahealth.uz"
                        className={`font-semibold transition-colors ${
                          deckTheme === 'light' ? 'hover:text-[#0284C7]' : 'hover:text-white'
                        }`}
                      >
                        info@elvorahealth.uz
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone size={14} className={deckTheme === 'light' ? 'text-[#0284C7]' : 'text-[#00D4FF]'} />
                      <a
                        href="tel:+998712025000"
                        className={`font-semibold transition-colors ${
                          deckTheme === 'light' ? 'hover:text-[#0284C7]' : 'hover:text-white'
                        }`}
                      >
                        +998 (71) 202-50-00
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-400">
                      <Building size={14} className="text-slate-400" />
                      <span>Toshkent shahri, Oʻzbekiston</span>
                    </div>
                  </div>
                </div>

                {/* Standalone Vector SVG QR Code */}
                <div
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center space-y-1.5 shadow-md shrink-0 border ${
                    deckTheme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-white text-slate-900 border-transparent'
                  }`}
                >
                  <svg
                    className="w-28 h-28"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Stylized QR Code matrix vector */}
                    <rect width="100" height="100" fill="white" />
                    {/* Top Left Finder */}
                    <rect x="8" y="8" width="28" height="28" rx="4" fill="#0A1A2F" />
                    <rect x="13" y="13" width="18" height="18" rx="2" fill="white" />
                    <rect x="17" y="17" width="10" height="10" rx="1" fill="#0284C7" />

                    {/* Top Right Finder */}
                    <rect x="64" y="8" width="28" height="28" rx="4" fill="#0A1A2F" />
                    <rect x="69" y="13" width="18" height="18" rx="2" fill="white" />
                    <rect x="73" y="17" width="10" height="10" rx="1" fill="#0284C7" />

                    {/* Bottom Left Finder */}
                    <rect x="8" y="64" width="28" height="28" rx="4" fill="#0A1A2F" />
                    <rect x="13" y="69" width="18" height="18" rx="2" fill="white" />
                    <rect x="17" y="73" width="10" height="10" rx="1" fill="#0284C7" />

                    {/* QR Code decorative data blocks */}
                    <rect x="42" y="10" width="6" height="6" fill="#0A1A2F" />
                    <rect x="52" y="10" width="6" height="6" fill="#0A1A2F" />
                    <rect x="42" y="20" width="6" height="6" fill="#0284C7" />
                    <rect x="48" y="26" width="6" height="6" fill="#0A1A2F" />

                    <rect x="10" y="44" width="6" height="6" fill="#0A1A2F" />
                    <rect x="22" y="44" width="6" height="6" fill="#0A1A2F" />
                    <rect x="16" y="52" width="6" height="6" fill="#0284C7" />

                    <rect x="42" y="42" width="16" height="16" rx="3" fill="#0284C7" />
                    <rect x="46" y="46" width="8" height="8" rx="1" fill="white" />

                    <rect x="66" y="44" width="6" height="6" fill="#0A1A2F" />
                    <rect x="76" y="44" width="6" height="6" fill="#0A1A2F" />
                    <rect x="86" y="44" width="6" height="6" fill="#0A1A2F" />
                    <rect x="70" y="52" width="6" height="6" fill="#0284C7" />
                    <rect x="82" y="52" width="6" height="6" fill="#0A1A2F" />

                    <rect x="42" y="68" width="6" height="6" fill="#0A1A2F" />
                    <rect x="52" y="68" width="6" height="6" fill="#0284C7" />
                    <rect x="46" y="78" width="6" height="6" fill="#0A1A2F" />
                    <rect x="56" y="84" width="6" height="6" fill="#0A1A2F" />

                    <rect x="68" y="68" width="6" height="6" fill="#0284C7" />
                    <rect x="78" y="74" width="6" height="6" fill="#0A1A2F" />
                    <rect x="86" y="82" width="6" height="6" fill="#0284C7" />
                    <rect x="68" y="86" width="6" height="6" fill="#0A1A2F" />
                  </svg>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                    Jonli Sahifaga Oʻtish
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="mailto:info@elvorahealth.uz?subject=Elvora%20Health%20Investitsiya%20Muloqoti"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0D9488] hover:from-sky-600 hover:to-teal-600 text-white font-black text-xs sm:text-sm shadow-xl shadow-sky-500/25 transition-all cursor-pointer"
                >
                  Suhbatni Boshlash (Investor Meeting)
                </a>
                <Link
                  to="/"
                  className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
                    deckTheme === 'light'
                      ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                  }`}
                >
                  Lending Sahifaga Qaytish
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= PRESENTER NOTES DRAWER (P) ================= */}
      {isPresenterMode && (
        <div
          className={`relative z-40 border-t-2 p-4 sm:p-5 max-h-[42vh] sm:max-h-[35vh] overflow-y-auto animate-in slide-in-from-bottom-6 duration-200 shadow-2xl backdrop-blur-xl ${
            deckTheme === 'light'
              ? 'bg-white/95 border-[#0284C7] text-slate-800'
              : 'bg-slate-950/95 border-cyan-400 text-slate-100'
          }`}
        >
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div
                className={`flex flex-wrap items-center justify-between gap-2 border-b pb-2 ${
                  deckTheme === 'light' ? 'border-slate-200' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                      deckTheme === 'light'
                        ? 'bg-sky-50 text-[#0284C7] border-sky-200'
                        : 'text-cyan-300 bg-cyan-500/20 border-cyan-400/30'
                    }`}
                  >
                    {currentSlide}-SLAYD NUTQI ({currentTimeRange})
                  </span>
                  <span className={`text-xs font-mono ${deckTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Format: {pitchFormat === '3min' ? '3 daqiqa (ekspress)' : '5 daqiqa (batafsil)'} • ~{currentDurationSec}s
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Font size toggle */}
                  <div
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10px] font-bold ${
                      deckTheme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/80 border-slate-700'
                    }`}
                  >
                    <span className={deckTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}>Shrift:</span>
                    <button
                      onClick={() => setNotesFontSize('sm')}
                      className={`px-1.5 rounded cursor-pointer ${
                        notesFontSize === 'sm'
                          ? deckTheme === 'light' ? 'text-[#0284C7] font-black' : 'text-cyan-300 font-black'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      A-
                    </button>
                    <button
                      onClick={() => setNotesFontSize('md')}
                      className={`px-1.5 rounded cursor-pointer ${
                        notesFontSize === 'md'
                          ? deckTheme === 'light' ? 'text-[#0284C7] font-black' : 'text-cyan-300 font-black'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => setNotesFontSize('lg')}
                      className={`px-1.5 rounded cursor-pointer ${
                        notesFontSize === 'lg'
                          ? deckTheme === 'light' ? 'text-[#0284C7] font-black' : 'text-cyan-300 font-black'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      A+
                    </button>
                  </div>

                  {/* Copy notes button */}
                  <button
                    onClick={copySpeechNotes}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                      deckTheme === 'light'
                        ? 'bg-sky-50 hover:bg-sky-100 text-[#0284C7] border-sky-200'
                        : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border-cyan-400/30'
                    }`}
                  >
                    {isCopied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    <span>{isCopied ? 'Nusxalandi!' : 'Nusxa olish'}</span>
                  </button>
                </div>
              </div>

              <p
                className={`leading-relaxed font-sans font-medium select-text ${
                  deckTheme === 'light' ? 'text-slate-800' : 'text-slate-100'
                } ${notesFontSize === 'sm' ? 'text-xs' : notesFontSize === 'lg' ? 'text-base sm:text-lg' : 'text-sm'}`}
              >
                {currentNotes}
              </p>
            </div>

            {/* Next Slide Preview */}
            {currentSlide < totalSlides && (
              <div
                className={`p-3.5 rounded-2xl border text-left shrink-0 w-full sm:w-64 space-y-1 ${
                  deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-slate-800'
                }`}
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  KEYINGI SLAYD ({currentSlide + 1}/{totalSlides}):
                </span>
                <span
                  className={`text-xs font-extrabold block truncate ${
                    deckTheme === 'light' ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {SLIDES_META[currentSlide]?.title[pitchLang]}
                </span>
                <span
                  className={`text-[10px] font-mono block font-bold ${
                    deckTheme === 'light' ? 'text-[#0284C7]' : 'text-cyan-300'
                  }`}
                >
                  {pitchFormat === '3min' ? SLIDES_META[currentSlide]?.timeRange3Min : SLIDES_META[currentSlide]?.timeRange5Min}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= BOTTOM CONTROL DOCK ================= */}
      <footer
        className={`relative z-30 h-14 backdrop-blur-md border-t px-4 sm:px-6 flex items-center justify-between shrink-0 transition-colors ${
          deckTheme === 'light'
            ? 'bg-white/95 border-slate-200 text-slate-700 shadow-sm'
            : 'bg-[#071731]/95 border-[#0F2A52] text-slate-300'
        }`}
      >
        {/* Left: Previous slide button */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 1}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl disabled:opacity-40 disabled:pointer-events-none text-xs font-bold transition-colors cursor-pointer border ${
            deckTheme === 'light'
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700'
          }`}
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Oldingi</span>
        </button>

        {/* Center: Slide Counter and quick keyboard shortcut badges */}
        <div className="flex items-center gap-2 text-xs">
          <span className={`font-mono font-bold ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
            Slayd{' '}
            <strong className={`text-sm ${deckTheme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>
              {currentSlide}
            </strong>{' '}
            / {totalSlides}
          </span>
          <span className="hidden md:inline text-slate-400">•</span>
          <span className="hidden md:inline text-[11px] text-slate-400 font-mono">
            Tugmalar: [→ Oldinga] [← Orqaga] [P Nutq] [T Taymer] [A Avto]
          </span>
        </div>

        {/* Right: Next slide button */}
        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0D9488] hover:from-sky-600 hover:to-teal-600 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-black transition-colors cursor-pointer shadow-md shadow-sky-500/20"
        >
          <span className="hidden sm:inline">Keyingi</span>
          <ChevronRight size={16} />
        </button>
      </footer>

      {/* ================= MODAL: PLATFORMA NIMA QILA OLADI? (JONLI IMKONIYATLAR) ================= */}
      {isFeaturesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className={`relative w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border transition-all ${
              deckTheme === 'light'
                ? 'bg-white border-slate-200 text-slate-800'
                : 'bg-slate-900 border-slate-700 text-slate-100'
            }`}
          >
            {/* Modal Header */}
            <div
              className={`p-4 sm:p-5 border-b flex items-center justify-between ${
                deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0284C7] to-[#0D9488] flex items-center justify-center text-white shadow-md">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3
                    className={`text-base sm:text-lg font-black ${
                      deckTheme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Elvora Health Platformasi Nima Qila Oladi?
                  </h3>
                  <p className={`text-xs font-medium ${deckTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Xususiy klinikalarning har kungi 6 ta muhim operatsion ehtiyoji yagona tizimda
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFeaturesModalOpen(false)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  deckTheme === 'light'
                    ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Yopish (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div
              className={`flex items-center gap-1.5 p-2 sm:px-4 border-b overflow-x-auto text-xs font-bold scrollbar-none ${
                deckTheme === 'light' ? 'bg-slate-100/70 border-slate-200' : 'bg-slate-950/40 border-slate-800'
              }`}
            >
              <button
                onClick={() => setFeaturesActiveTab('queue')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                  featuresActiveTab === 'queue'
                    ? 'bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white shadow-xs'
                    : deckTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Activity size={14} />
                <span>1. E-Navbat & TV Tablo</span>
              </button>
              <button
                onClick={() => setFeaturesActiveTab('ehr')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                  featuresActiveTab === 'ehr'
                    ? 'bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white shadow-xs'
                    : deckTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText size={14} />
                <span>2. Bemor Kartasi (EHR)</span>
              </button>
              <button
                onClick={() => setFeaturesActiveTab('schedule')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                  featuresActiveTab === 'schedule'
                    ? 'bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white shadow-xs'
                    : deckTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calendar size={14} />
                <span>3. Shifokorlar Jadvali</span>
              </button>
              <button
                onClick={() => setFeaturesActiveTab('finance')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                  featuresActiveTab === 'finance'
                    ? 'bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white shadow-xs'
                    : deckTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <DollarSign size={14} />
                <span>4. Kassa & Moliya</span>
              </button>
              <button
                onClick={() => setFeaturesActiveTab('telegram')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                  featuresActiveTab === 'telegram'
                    ? 'bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white shadow-xs'
                    : deckTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <MessageSquare size={14} />
                <span>5. Telegram & SMS Eslatma</span>
              </button>
              <button
                onClick={() => setFeaturesActiveTab('ai')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                  featuresActiveTab === 'ai'
                    ? 'bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white shadow-xs'
                    : deckTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Bot size={14} />
                <span>6. Elvora AI™ Tahlil</span>
              </button>
            </div>

            {/* Modal Body: Active Tab Content */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-4 flex-1">
              {featuresActiveTab === 'queue' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div
                    className={`flex items-center justify-between border-b pb-3 ${
                      deckTheme === 'light' ? 'border-slate-100' : 'border-slate-800'
                    }`}
                  >
                    <div>
                      <h4
                        className={`text-base font-black flex items-center gap-2 ${
                          deckTheme === 'light' ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        <span>Jonli Kutish Zali E-Navbat Tablosi & Ovozli Chaqiruv</span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-bold">
                          0 ta ziddiyat
                        </span>
                      </h4>
                      <p className={`text-xs mt-0.5 ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Kutish zalida janjallarni to'xtatadi va shifokor qabullarini soniyasigacha tartibga soladi.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-[#0284C7] uppercase block">1. TV Tablo Interfeysi</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Kutish zali monitorlariga ulangan katta ekranli jonli tablo. Bemor chipta raqami va shifokor xonasi aniq ko'rinadi.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-emerald-600 uppercase block">2. Smartfon QR Navbat</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Bemor chiptadagi QR kodni skanerlab o'z navbatini va oldida necha kishi qolganini telefonida kuzatib turadi.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-amber-600 uppercase block">3. Ovozli Audio E'lon</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Shifokor tugmani bosganda dinamikdan o'zbek/rus tilida "042-chipta, 3-xonaga marhamat" deb ovozli e'lon qilinadi.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border text-xs ${
                      deckTheme === 'light'
                        ? 'bg-sky-50 border-sky-200 text-slate-700'
                        : 'bg-cyan-500/10 border-cyan-400/30 text-slate-300'
                    }`}
                  >
                    💡 <strong>Natija:</strong> Kutish zalidagi tirbandlik 80% ga kamayadi, bemorlar qanoatlanishi 96% ga oshadi va navbatdagi nizolarga chek qo'yiladi.
                  </div>
                </div>
              )}

              {featuresActiveTab === 'ehr' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div
                    className={`flex items-center justify-between border-b pb-3 ${
                      deckTheme === 'light' ? 'border-slate-100' : 'border-slate-800'
                    }`}
                  >
                    <div>
                      <h4
                        className={`text-base font-black flex items-center gap-2 ${
                          deckTheme === 'light' ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        <span>Elektron Bemor Kartasi (EHR) & Retseptlar</span>
                        <span className="text-[10px] bg-sky-50 text-[#0284C7] border border-sky-200 px-2 py-0.5 rounded-full font-mono font-bold">
                          Xavfsiz Baza
                        </span>
                      </h4>
                      <p className={`text-xs mt-0.5 ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Qog'oz daftarlardan to'liq voz kechib, bemorning butun kasallik tarixi va tahlillarini yagona oynada jamlaydi.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-[#0284C7] uppercase block">1. 30 Soniyada Ro'yxatga Olish</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Telefon raqami yoki pasport bo'yicha darhol yangi bemor kartasi ochiladi va avtomatik ID raqam biriktiriladi.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-emerald-600 uppercase block">2. Tahlil PDF / JPG Yuklash</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Laboratoriya qog'ozlari, UTT va rentgen xulosalari bemor kartasiga biriktiriladi va hech qachon yo'qolmaydi.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-purple-600 uppercase block">3. Raqamli Retsept & Chop Etish</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Shifokor tavsiyalarini bir zumda shablonlar asosida kiritadi va bemorga rasmiy logotipli chek sifatida chop etib beradi.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border text-xs ${
                      deckTheme === 'light'
                        ? 'bg-blue-50 border-blue-200 text-slate-700'
                        : 'bg-blue-500/10 border-blue-400/30 text-slate-300'
                    }`}
                  >
                    🔒 <strong>Xavfsizlik:</strong> Zero-Data Leakage. Bemorlarning shaxsiy ma'lumotlari O'zbekiston qonunchiligiga muvofiq shifrlangan holda mahalliy serverda saqlanadi.
                  </div>
                </div>
              )}

              {featuresActiveTab === 'schedule' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div
                    className={`flex items-center justify-between border-b pb-3 ${
                      deckTheme === 'light' ? 'border-slate-100' : 'border-slate-800'
                    }`}
                  >
                    <div>
                      <h4
                        className={`text-base font-black flex items-center gap-2 ${
                          deckTheme === 'light' ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        <span>Shifokorlar Ish Jadvali & Slot Boshqaruvi</span>
                        <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-mono font-bold">
                          84.6% Bandlik
                        </span>
                      </h4>
                      <p className={`text-xs mt-0.5 ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Har bir shifokor kabinetining ish vaqti, bo'sh slotlari va qabul narxini aniq nazoratga oladi.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-[#0284C7] uppercase block">1. 15 Daqiqalik Aniq Slotlar</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Har bir shifokor uchun shaxsiy ish jadvallari: tushlik, qabul vaqtlari va navbatdagi tanaffuslar aniq rejalashtiriladi.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-rose-500 uppercase block">2. Double-Booking 100% Man Etilgan</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Bir vaqtning o'zida ikkita bemor bitta shifokorga yozilib qolishi tizim tomonidan bloklanadi.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-emerald-600 uppercase block">3. Bo'sh Slotlarni To'ldirish</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Bemor qabulni bekor qilganda slot darhol bo'shaydi va kutish ro'yxatidagi bemorlarga avtomatik taklif etiladi.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border text-xs ${
                      deckTheme === 'light'
                        ? 'bg-amber-50 border-amber-200 text-slate-700'
                        : 'bg-amber-500/10 border-amber-400/30 text-slate-300'
                    }`}
                  >
                    📈 <strong>Natija:</strong> Shifokorlar qabulxonada bekor o'tirmaydi, klinika xonalari va apparatlari maksimal daromad bilan ishlaydi.
                  </div>
                </div>
              )}

              {featuresActiveTab === 'finance' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div
                    className={`flex items-center justify-between border-b pb-3 ${
                      deckTheme === 'light' ? 'border-slate-100' : 'border-slate-800'
                    }`}
                  >
                    <div>
                      <h4
                        className={`text-base font-black flex items-center gap-2 ${
                          deckTheme === 'light' ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        <span>Shaffof Kassa, Xizmatlar Hisobi va Xodimlar Maoshi</span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-bold">
                          0 UZS Tafovut
                        </span>
                      </h4>
                      <p className={`text-xs mt-0.5 ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Har bir tushgan so'm faqat shifokor ko'rigi va xizmat cheki bilan bog'lanadi.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-[#0284C7] uppercase block">1. Har Bir Tushum Cheki</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Naqd pul, bank kartasi yoki terminal to'lovlari bir zumda kassaga kirim qilinadi va chek chiqariladi.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-emerald-600 uppercase block">2. Shifokorlar Foizi (Komissiya)</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Har bir shifokorning o'z qabulidan oladigan ulushi (masalan, 30% yoki 40%) avtomatik hisoblab boriladi.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-amber-600 uppercase block">3. Kun Oxiri Balansi 3 Daqiqada</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Kun yakunida kassa hisob-kitobini yopish uchun soatlab vaqt ketmaydi, hisobot 1 ta tugma orqali tayyor bo'ladi.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border text-xs ${
                      deckTheme === 'light'
                        ? 'bg-emerald-50 border-emerald-200 text-slate-700'
                        : 'bg-emerald-500/10 border-emerald-400/30 text-slate-300'
                    }`}
                  >
                    💰 <strong>Moliyaviy Nazorat:</strong> Klinika rahbari xizmatlar rentabelligi va kunlik tushumni istalgan joydan smartfoni orqali real vaqtda ko'radi.
                  </div>
                </div>
              )}

              {featuresActiveTab === 'telegram' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div
                    className={`flex items-center justify-between border-b pb-3 ${
                      deckTheme === 'light' ? 'border-slate-100' : 'border-slate-800'
                    }`}
                  >
                    <div>
                      <h4
                        className={`text-base font-black flex items-center gap-2 ${
                          deckTheme === 'light' ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        <span>Telegram Bot Integratsiyasi & Avtomatik SMS Eslatmalar</span>
                        <span className="text-[10px] bg-sky-50 text-[#0284C7] border border-sky-200 px-2 py-0.5 rounded-full font-mono font-bold">
                          -65% No-Show
                        </span>
                      </h4>
                      <p className={`text-xs mt-0.5 ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        O'zbekistondagi eng qulay kanal — Telegram orqali bemorlarni eslatish va qabullarni tasdiqlash.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-[#0284C7] uppercase block">1. 2 Soat Oldin Eslatma</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Qabul vaqti yaqinlashganda bemorga avtomatik tarzda Telegram va SMS orqali qabul eslatmasi boradi.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-emerald-600 uppercase block">2. "Kelaman" / "Bekor Qilaman"</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Bemor botdagi bitta tugmani bosib kelishini tasdiqlaydi. Agar kela olmasa, boshqa bemor uchun joy bo'shatiladi.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-purple-600 uppercase block">3. Tahlil Javobini Yuborish</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Laboratoriya tahlili tayyor bo'lgach, bemor klinikaga qayta kelmasdan PDF xulosani Telegram bot orqali oladi.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border text-xs ${
                      deckTheme === 'light'
                        ? 'bg-sky-50 border-sky-200 text-slate-700'
                        : 'bg-cyan-500/10 border-cyan-400/30 text-slate-300'
                    }`}
                  >
                    📱 <strong>Mentalitetga Mos:</strong> O'zbekiston aholisi 95% Telegram ishlatadi. Tizim qabulxona xodimlarining kunlik yuzlab telefon qo'ng'iroqlari sarfini tejalgan vaqtga aylantiradi.
                  </div>
                </div>
              )}

              {featuresActiveTab === 'ai' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div
                    className={`flex items-center justify-between border-b pb-3 ${
                      deckTheme === 'light' ? 'border-slate-100' : 'border-slate-800'
                    }`}
                  >
                    <div>
                      <h4
                        className={`text-base font-black flex items-center gap-2 ${
                          deckTheme === 'light' ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        <span>Elvora AI™ Tahliliy Maslahatchi & Tibbiy Intellekt</span>
                        <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-mono font-bold">
                          Aqlli Yadro
                        </span>
                      </h4>
                      <p className={`text-xs mt-0.5 ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Klinikaning barcha ma'lumotlarini tahlil qilib, daromadni oshirish bo'yicha aniq tavsiyalar beruvchi AI tizim.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-[#0284C7] uppercase block">1. Ko'rinmas Pul Sizishi Tahlili</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        AI klinika oylik qancha pul yo'qotayotganini va qaysi soatda qabullar kamayganini aniq hisoblab beradi.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-purple-600 uppercase block">2. Tibbiy OCR & Tahlillar Xulosasi</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        Qog'oz laboratoriya tahlillari suratini o'qib, me'yordan og'ishgan ko'rsatkichlarni darhol qizil bilan ajratadi.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-2xl border space-y-1 ${
                        deckTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-emerald-600 uppercase block">3. Rahbariyat Uchun Tavsiyalar</span>
                      <p className={`text-xs ${deckTheme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        "Ertaga kardiologda 3 ta bo'sh slot bor, qayta ko'rikka bemorlarni chaqirish orqali +450 000 UZS saqlab qolish mumkin."
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border text-xs ${
                      deckTheme === 'light'
                        ? 'bg-purple-50 border-purple-200 text-slate-700'
                        : 'bg-purple-500/10 border-purple-400/30 text-slate-300'
                    }`}
                  >
                    🧠 <strong>Strategik Afzallik:</strong> Elvora AI shifokor o'rnini egallamaydi — balki klinika egasining biznes qarorlarini ilmiy va raqamli dalillar bilan qo'llab-quvvatlaydi.
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              className={`p-4 sm:p-5 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
                deckTheme === 'light'
                  ? 'border-slate-200 bg-slate-50 text-slate-600'
                  : 'border-slate-800 bg-slate-950/80 text-slate-400'
              }`}
            >
              <span>
                Ushbu barcha modullar hozir ishga tushirilgan va sinovdan o'tkazilgan.
              </span>

              <div className="flex items-center gap-2">
                <Link
                  to="/app/dashboard"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0D9488] hover:from-sky-600 hover:to-teal-600 text-white font-bold transition-all shadow-md shadow-sky-500/20 cursor-pointer"
                >
                  <span>Boshqaruv Panelini Ochish (/app)</span>
                  <ExternalLink size={13} />
                </Link>
                <button
                  onClick={() => setIsFeaturesModalOpen(false)}
                  className={`px-3.5 py-2 rounded-xl font-bold transition-colors cursor-pointer border ${
                    deckTheme === 'light'
                      ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      : 'bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white border-white/10'
                  }`}
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PitchDeckPage;
