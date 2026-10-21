export interface MedicalServiceItem {
  id: string;
  key: string;
  titleUz: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  durationMinutes: number;
  basePriceUZS: number;
  iconName: string;
  popularFor: string[];
}

export interface ClinicItem {
  id: string;
  name: string;
  branchType: string;
  district: string;
  city: string;
  address: string;
  phone: string;
  workingHours: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  imageUrl: string;
  hasEmergency: boolean;
  hasParking: boolean;
  hasLab: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PublicDoctor {
  id: string;
  fullName: string;
  title: string;
  specialty: string;
  experienceYears: number;
  clinicName: string;
  roomNumber: string;
  feeUZS: number;
  rating: number;
  reviewsCount: number;
  photoUrl: string;
  bio: string;
  availableDays: string[];
  availableSlots: string[];
  languages: string[];
  education: string;
}

export const MOCK_SERVICES: MedicalServiceItem[] = [
  {
    id: 'srv-1',
    key: 'terapiya',
    titleUz: 'Terapiya va Umumiy ko\'rik',
    category: 'Birlamchi tibbiy yordam',
    shortDesc: 'Ichki a\'zolar kasalliklari diagnostikasi, individual davolash rejasi va profilaktik ko\'rik.',
    fullDesc: 'Yetakchi terapevtlar tomonidan to\'liq klinik ko\'rik, qon bosimi monitoringi, EKG tahlili va kompleks laborator tahlillar yo\'naltirmasi.',
    durationMinutes: 30,
    basePriceUZS: 120000,
    iconName: 'Stethoscope',
    popularFor: ['Kattalar ko\'rigi', 'Qon bosimi', 'Umumiy holsizlik'],
  },
  {
    id: 'srv-2',
    key: 'kardiologiya',
    titleUz: 'Kardiologiya va EKG',
    category: 'Ixtisoslashgan tibbiyot',
    shortDesc: 'Yurak-qon tomir tizimi chuqurlashtirilgan diagnostikasi, Holter va ExoKG monitoringi.',
    fullDesc: 'Zamonaviy raqamli kardiologiya uskunalari yordamida aritmiya, gipertoniya va yurak ishemik holatlarini erta aniqlash va nazorat qilish.',
    durationMinutes: 40,
    basePriceUZS: 180000,
    iconName: 'HeartPulse',
    popularFor: ['ExoKG', 'Holter monitoring', 'EKG tahlil'],
  },
  {
    id: 'srv-3',
    key: 'pediatriya',
    titleUz: 'Pediatriya va Bolalar salomatligi',
    category: 'Bolalar parvarishi',
    shortDesc: 'Yangi tug\'ilgan chaqaloqlar va o\'smirlar uchun mehrli, xavfsiz va stresssiz ko\'rik.',
    fullDesc: 'Pediatrlarimiz bolalarning yoshiga mos jismoniy va aqliy rivojlanishini, profilaktik emlash jadvalini va mavsumiy kasalliklarni nazorat qiladi.',
    durationMinutes: 30,
    basePriceUZS: 110000,
    iconName: 'Baby',
    popularFor: ['Vaksina tavsiyalari', 'Chaqaloq parvarishi', 'Mavsumiy shamollash'],
  },
  {
    id: 'srv-4',
    key: 'dermatologiya',
    titleUz: 'Dermatologiya va Teri parvarishi',
    category: 'Ixtisoslashgan tibbiyot',
    shortDesc: 'Teri, soch va tirnoq muammolari, dermatoskopiya va zamonaviy davolash protokollari.',
    fullDesc: 'Raqamli dermatoskopiya tekshiruvi orqali xollar xavfsizligi, allergik toshmalar, akne va yoshga doir o\'zgarishlarni professional davolash.',
    durationMinutes: 30,
    basePriceUZS: 140000,
    iconName: 'Sparkles',
    popularFor: ['Dermatoskopiya', 'Akne davolash', 'Allergik dermatit'],
  },
  {
    id: 'srv-5',
    key: 'stomatologiya',
    titleUz: 'Stomatologiya va Estetika',
    category: 'Og\'iz bo\'shlig\'i salomatligi',
    shortDesc: 'Og\'riqsiz tish davolash, 3D tomografiya, implantatsiya va gigiyenik tozalash.',
    fullDesc: 'Barcha stomatologik muolajalar xalqaro sterilizatsiya va zamonaviy kompyuterli anesteziya tizimi ostida mutlaqo og\'riqsiz amalga oshiriladi.',
    durationMinutes: 45,
    basePriceUZS: 200000,
    iconName: 'Smile',
    popularFor: ['Gigiyenik tozalash', 'Karies davolash', 'Estetik restavratsiya'],
  },
  {
    id: 'srv-6',
    key: 'laboratoriya',
    titleUz: 'Raqamli Laboratoriya',
    category: 'Diagnostika',
    shortDesc: '500+ turdagi biokimyoviy, gormonal va genetik tahlillar 2 soat ichida tayyor.',
    fullDesc: 'Yopiq avtomatlashgan analizatorlarda inson omilisiz tekshiriluvchi tahlillar. Natijalar to\'g\'ridan-to\'g\'ri shaxsiy kabinetga va PDF shaklda yuboriladi.',
    durationMinutes: 15,
    basePriceUZS: 85000,
    iconName: 'FlaskConical',
    popularFor: ['Umumiy qon tahlili', 'Gormonlar paneli', 'Biokimyo'],
  },
  {
    id: 'srv-7',
    key: 'nevrologiya',
    titleUz: 'Nevrologiya',
    category: 'Ixtisoslashgan tibbiyot',
    shortDesc: 'Bosh og\'rig\'i, uyqusizlik, umurtqa churralari va asab tizimi faoliyatini tiklash.',
    fullDesc: 'Oliy toifali nevropatologlar ko\'rigi, vegetativ asab tizimi tahlili va umurtqa pog\'onasi patologiyalarini zamonaviy konservativ davolash.',
    durationMinutes: 35,
    basePriceUZS: 160000,
    iconName: 'Brain',
    popularFor: ['Migren', 'Uyqusizlik', 'Osteoxondroz'],
  },
  {
    id: 'srv-8',
    key: 'oftalmologiya',
    titleUz: 'Oftalmologiya va Ko\'z salomatligi',
    category: 'Diagnostika',
    shortDesc: 'Ko\'rish o\'tkirligini kompyuterli tekshirish, ko\'z bosimi va to\'r parda diagnostikasi.',
    fullDesc: 'Raqamli foropter va slit lamp yordamida ko\'z tubini to\'liq ko\'rikdan o\'tkazish, astigmatizm va ko\'z toliqishini profilaktika qilish.',
    durationMinutes: 30,
    basePriceUZS: 130000,
    iconName: 'Eye',
    popularFor: ['Ko\'rishni tekshirish', 'Ko\'z bosimi', 'Retina ko\'rigi'],
  },
];

export const MOCK_CLINICS: ClinicItem[] = [
  {
    id: 'cl-1',
    name: 'Elvora Central Medical Clinic',
    branchType: 'Bosh klinika',
    district: 'Mirzo Ulug\'bek tumani',
    city: 'Toshkent',
    address: 'Mustaqillik shoh ko\'chasi, 42-uy (Metro Hamid Olimjon)',
    phone: '+998 (71) 200-45-45',
    workingHours: '08:00 — 20:00 (Dam olishsiz)',
    rating: 4.95,
    reviewCount: 312,
    specialties: ['Kardiologiya', 'Terapiya', 'Nevrologiya', 'Laboratoriya', 'Pediatriya'],
    imageUrl: '/images/clinic_interior.jpg',
    hasEmergency: true,
    hasParking: true,
    hasLab: true,
    coordinates: { lat: 41.3195, lng: 69.2885 },
  },
  {
    id: 'cl-2',
    name: 'Shifo Med Premium Chilonzor',
    branchType: 'Oilaviy klinika',
    district: 'Chilonzor tumani',
    city: 'Toshkent',
    address: 'Qatortol ko\'chasi, 19-bino (Chilonzor savdo markazi yonida)',
    phone: '+998 (71) 215-30-30',
    workingHours: '08:30 — 19:00 (Dush-Shan)',
    rating: 4.88,
    reviewCount: 184,
    specialties: ['Terapiya', 'Pediatriya', 'Stomatologiya', 'Dermatologiya'],
    imageUrl: '/images/clinic_interior.jpg',
    hasEmergency: false,
    hasParking: true,
    hasLab: true,
    coordinates: { lat: 41.2825, lng: 69.2155 },
  },
  {
    id: 'cl-3',
    name: 'Nova Dental & Aesthetic Yunusobod',
    branchType: 'Ixtisoslashgan markaz',
    district: 'Yunusobod tumani',
    city: 'Toshkent',
    address: 'Amir Temur ko\'chasi, 84-uy (Megaplanet yaqinida)',
    phone: '+998 (71) 220-80-80',
    workingHours: '09:00 — 20:00 (Dush-Shan)',
    rating: 4.92,
    reviewCount: 220,
    specialties: ['Stomatologiya', 'Dermatologiya', 'Kosmetologiya'],
    imageUrl: '/images/clinic_interior.jpg',
    hasEmergency: false,
    hasParking: true,
    hasLab: false,
    coordinates: { lat: 41.3654, lng: 69.2891 },
  },
  {
    id: 'cl-4',
    name: 'Evro Diagnostic Center Yakkasaroy',
    branchType: 'Diagnostika tarmog\'i',
    district: 'Yakkasaroy tumani',
    city: 'Toshkent',
    address: 'Shota Rustaveli ko\'chasi, 55-uy',
    phone: '+998 (71) 255-12-12',
    workingHours: '07:30 — 21:00 (Dam olishsiz)',
    rating: 4.9,
    reviewCount: 405,
    specialties: ['Laboratoriya', 'Kardiologiya', 'Ultratovush (UZI)', 'Terapiya'],
    imageUrl: '/images/clinic_interior.jpg',
    hasEmergency: true,
    hasParking: true,
    hasLab: true,
    coordinates: { lat: 41.2912, lng: 69.2554 },
  },
  {
    id: 'cl-5',
    name: 'Zarmed Private Clinic Samarqand',
    branchType: 'Mintaqaviy filial',
    district: 'Samarqand shahri',
    city: 'Samarqand',
    address: 'Buyuk Ipak Yo\'li ko\'chasi, 12-A',
    phone: '+998 (66) 234-90-90',
    workingHours: '08:00 — 18:00 (Dush-Shan)',
    rating: 4.87,
    reviewCount: 160,
    specialties: ['Terapiya', 'Kardiologiya', 'Jarrohlik', 'Laboratoriya'],
    imageUrl: '/images/clinic_interior.jpg',
    hasEmergency: true,
    hasParking: true,
    hasLab: true,
    coordinates: { lat: 39.6542, lng: 66.9597 },
  },
];

export const MOCK_PUBLIC_DOCTORS: PublicDoctor[] = [
  {
    id: 'doc-1',
    fullName: 'Dr. Nilufar Karimova',
    title: 'Oliy toifali shifokor-terapevt',
    specialty: 'Terapevt',
    experienceYears: 14,
    clinicName: 'Elvora Central Clinic',
    roomNumber: '105-xona',
    feeUZS: 120000,
    rating: 4.96,
    reviewsCount: 142,
    photoUrl: '/images/doctor_portrait.jpg',
    bio: 'Kattalarda ichki kasalliklarni profilaktika qilish va kompleks davolash bo\'yicha 14 yillik amaliy tajribaga ega. Germaniya va Turkiyada malaka oshirgan.',
    availableDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'],
    availableSlots: ['09:00', '09:30', '10:30', '11:00', '14:30', '15:00', '16:00'],
    languages: ['O\'zbekcha', 'Ruscha', 'Inglizcha'],
    education: 'Toshkent Tibbiyot Akademiyasi (Magistratura)',
  },
  {
    id: 'doc-2',
    fullName: 'Dr. Alisher Usmonov',
    title: 'Tibbiyot fanlari nomzodi, kardiolog',
    specialty: 'Kardiolog',
    experienceYears: 18,
    clinicName: 'Elvora Central Clinic',
    roomNumber: '102-xona',
    feeUZS: 180000,
    rating: 4.98,
    reviewsCount: 189,
    photoUrl: '/images/elvora_doctors.jpg',
    bio: 'Yurak ritmi buzilishlari va arterial gipertoniyani zamonaviy xalqaro standartlar asosida erta aniqlash va davolashga ixtisoslashgan.',
    availableDays: ['Dushanba', 'Chorshanba', 'Juma', 'Shanba'],
    availableSlots: ['08:30', '09:30', '11:30', '15:00', '16:30'],
    languages: ['O\'zbekcha', 'Ruscha'],
    education: 'Toshkent Tibbiyot Akademiyasi, Kardiologiya Ilmiy Markazi',
  },
  {
    id: 'doc-3',
    fullName: 'Dr. Rayhon Rahimova',
    title: 'Bosh pediatr, neonatolog',
    specialty: 'Pediatr',
    experienceYears: 11,
    clinicName: 'Shifo Med Premium Chilonzor',
    roomNumber: '108-xona',
    feeUZS: 110000,
    rating: 4.94,
    reviewsCount: 115,
    photoUrl: '/images/doctor_portrait.jpg',
    bio: 'Chaqaloqlar va yosh bolalarning jismoniy rivojlanishi, ovqatlanish ratsioni va immunitetni tabiiy qo\'llab-quvvatlash bo\'yicha mutaxassis.',
    availableDays: ['Dushanba', 'Seshanba', 'Payshanba', 'Juma'],
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:30'],
    languages: ['O\'zbekcha', 'Ruscha'],
    education: 'Toshkent Pediatriya Tibbiyot Instituti',
  },
  {
    id: 'doc-4',
    fullName: 'Dr. Bobur Mirzayev',
    title: 'Nevropatolog, vertebrolog',
    specialty: 'Nevropatolog',
    experienceYears: 12,
    clinicName: 'Elvora Central Clinic',
    roomNumber: '204-xona',
    feeUZS: 160000,
    rating: 4.91,
    reviewsCount: 97,
    photoUrl: '/images/elvora_doctors.jpg',
    bio: 'Surunkali bosh og\'riqlari, vegetativ distoniya va umurtqa churralarida noinvaziv davolash bo\'yicha yetakchi amaliyotchi.',
    availableDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Shanba'],
    availableSlots: ['10:00', '11:30', '14:30', '16:00'],
    languages: ['O\'zbekcha', 'Ruscha', 'Turkcha'],
    education: 'Samarqand Davlat Tibbiyot Universiteti',
  },
  {
    id: 'doc-5',
    fullName: 'Dr. Ziyoda Mahmudova',
    title: 'Dermatokosmetolog, trixolog',
    specialty: 'Dermatolog',
    experienceYears: 9,
    clinicName: 'Nova Dental & Aesthetic Yunusobod',
    roomNumber: '301-xona',
    feeUZS: 140000,
    rating: 4.93,
    reviewsCount: 88,
    photoUrl: '/images/doctor_portrait.jpg',
    bio: 'Teri muammolari diagnostikasi, xavfsiz apparatli dermatologiya va estetik parvarish bo\'yicha sertifikatlangan mutaxassis.',
    availableDays: ['Seshanba', 'Chorshanba', 'Juma', 'Shanba'],
    availableSlots: ['11:00', '12:00', '15:00', '16:30', '17:30'],
    languages: ['O\'zbekcha', 'Ruscha'],
    education: 'Toshkent Tibbiyot Akademiyasi',
  },
  {
    id: 'doc-6',
    fullName: 'Dr. Sardor Ikromov',
    title: 'Bosh stomatolog-ortoped',
    specialty: 'Stomatolog',
    experienceYears: 15,
    clinicName: 'Nova Dental & Aesthetic Yunusobod',
    roomNumber: '202-xona',
    feeUZS: 150000,
    rating: 4.97,
    reviewsCount: 164,
    photoUrl: '/images/elvora_doctors.jpg',
    bio: 'Estetik tabassum dizayni, shveysariya implantatsiyasi va og\'riqsiz kompyuterli stomatologiya bo\'yicha xalqaro ekspert.',
    availableDays: ['Dushanba', 'Seshanba', 'Payshanba', 'Juma', 'Shanba'],
    availableSlots: ['09:30', '11:00', '14:00', '15:30', '17:00'],
    languages: ['O\'zbekcha', 'Ruscha', 'Inglizcha'],
    education: 'Toshkent Davlat Stomatologiya Instituti',
  },
];

export const MOCK_FAQS = [
  {
    q: 'Elvora Health nima va u bemorlar uchun qanday ishlaydi?',
    a: 'Elvora Health — bu zamonaviy xususiy tibbiyot ekotizimi. Siz bir necha daqiqada kerakli soha shifokorini topishingiz, uning malakasi va bo\'sh vaqtini ko\'rishingiz, navbatsiz onlayn qabulga yozilishingiz hamda shaxsiy tibbiy tarixingizni qulay boshqarishingiz mumkin.',
  },
  {
    q: 'Qabulga yozilish bepulmi yoki oldindan to\'lov talab qilinadimi?',
    a: 'Elvora Health platformasi orqali qabulga yozilish mutlaqo bepul. Ko\'rik va muolajalar to\'lovi klinika qabulxonasida yoki tashrif kuni istalgan qulay to\'lov usuli (Naqd, Uzcard, Humo, Payme, Click) orqali amalga oshiriladi.',
  },
  {
    q: 'E-Navbat va taxminiy kutish vaqti qanday hisoblanadi?',
    a: 'Har bir bemor qabuliga qat\'iy vaqt belgilanadi va shifokor kabineti plansheti orqali jonli navbat tartibga solinadi. Kutish zalidagi raqamli tabloda va telefoningizda qabul boshlanishi hamda navbatingiz real vaqtda yangilanib turadi.',
  },
  {
    q: 'Shifokorlar malakasi va litsenziyalari qanday tekshiriladi?',
    a: 'Platformaga faqat rasmiy davlat litsenziyasiga va tasdiqlangan tibbiy toifaga ega klinika hamda shifokorlar ulanadi. Barcha mutaxassislar akkreditatsiya jarayonidan o\'tadi.',
  },
  {
    q: 'Klinika rahbarlari uchun qanday imkoniyatlar mavjud?',
    a: 'Klinikalar uchun Elvora Health maxsus boshqaruv panelini taqdim etadi: bemorlar kartotekasi, shifokorlar grafigi, xizmatlar kassa hisob-kitobi, qabullar oqimi va tahliliy hisobotlar bitta xavfsiz interfeysda jamlanadi.',
  },
];

export const MOCK_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Xizmat yoki Shifokorni tanlang',
    desc: 'Kerakli tibbiyot yo\'nalishi, tajriba va klinikani filtrlar yordamida osonlik bilan toping.',
  },
  {
    step: '02',
    title: 'Qulay sana va vaqtni belgilang',
    desc: 'Shifokorning jonli taqvimida ochiq bo\'sh slotlarni ko\'rib, o\'zingizga mos vaqtni tanlang.',
  },
  {
    step: '03',
    title: 'Tasdiqlang va E-Navbat oling',
    desc: 'SMS yoki elektron talon orqali qabul eslatmasini oling va belgilangan vaqtda klinikaga tashrif buyuring.',
  },
];
