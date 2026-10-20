import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Stethoscope,
  CalendarCheck2,
  FlaskConical,
  CreditCard,
  FileText,
  Package,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X,
  Play,
  Pause,
  ExternalLink,
} from 'lucide-react';

interface ModuleCardItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badge: string;
  problem: string;
  solution: string;
  stats: string;
  gradient: string;
  link: string;
  features: string[];
}

export const ElvoraSolutionsSection: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<string>('bemorlar');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedModalCard, setSelectedModalCard] = useState<ModuleCardItem | null>(null);
  const navigate = useNavigate();

  // Scroll container ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 8 Specific modules requested by user with clinic problems & Elvora solutions
  const cards: ModuleCardItem[] = [
    {
      id: 'bemorlar',
      title: 'Bemorlar',
      subtitle: 'Elektron Tibbiy Karta',
      icon: <Users size={22} className="text-[#008BFF]" />,
      badge: 'EMR Baza',
      problem: 'Qog‘oz kartalar yo‘qolishi, uzun navbatlar va ma’lumotlar tarqoqligi.',
      solution: 'Yagona elektron tibbiy karta — QR orqali 3 soniyada topish va 100% himoyalangan arxiv.',
      stats: 'Bemor topish 10x tezroq',
      gradient: 'from-[#008BFF] to-[#00B4D8]',
      link: '/app/patients',
      features: [
        'Barcha tashriflar, tahlillar va epikrizlar yagona profilida',
        'QR-kod va pasport orqali 3 soniyada bemorni topish',
        'Milliy sog‘liqni saqlash standartlariga to‘liq mos keluvchi EMR',
        'Zero-Data Leakage tamoyilidagi himoyalangan tibbiy arxiv',
      ],
    },
    {
      id: 'shifokorlar',
      title: 'Shifokorlar',
      subtitle: 'Grafik & Yuklama Balansi',
      icon: <Stethoscope size={22} className="text-[#008BFF]" />,
      badge: 'Klinika Shtati',
      problem: 'Shifokorlar bandligini nazorat qilolmaslik va vaqtlarning to‘qnashuvi (double-booking).',
      solution: 'Aqlli ish jadvali, tanaffuslar va xonalar balansi, ziddiyatli yozuvlarni 100% bloklash.',
      stats: 'To‘qnashuvlar xavfi 0%',
      gradient: 'from-[#00B4D8] to-[#0D34B4]',
      link: '/app/doctors',
      features: [
        'Mutaxassislar ish smenalari va xonalar taqsimoti balansi',
        'Ikki marta band qilish (double-booking) xavfini avtomatik bloklash',
        'Har bir shifokorning kunlik qabullar statistikasi va yuklamasi',
        'Shifokor xizmatlari va konsultatsiya narxlarini oson boshqarish',
      ],
    },
    {
      id: 'qabullar',
      title: 'Qabullar',
      subtitle: 'Smart E-Navbat & SMS',
      icon: <CalendarCheck2 size={22} className="text-[#008BFF]" />,
      badge: 'Jonli Tablo',
      problem: 'Kelmagan bemorlar (no-show), tirbandlik va registratura oldidagi tartibsizlik.',
      solution: 'Avtomatlashtirilgan SMS eslatmalar, onlayn chiptalar va zaldagi jonli TV navbat tablosi.',
      stats: 'No-show -65% kamayadi',
      gradient: 'from-[#0D34B4] to-[#008BFF]',
      link: '/app/appointments',
      features: [
        'Avtomatlashtirilgan SMS va Telegram eslatmalar tizimi',
        'Kutish zalidagi katta LED/TV ekranlar uchun jonli E-navbat tablosi',
        'Ovozli chaqiruv: "Chipta #04, 102-xona qabuliga marhamat"',
        'Kelmagan bemorlar (no-show) hisobiga daromad yo‘qotilishini keskin kamaytirish',
      ],
    },
    {
      id: 'laboratoriya',
      title: 'Laboratoriya',
      subtitle: 'LIS Avtomatizatsiya',
      icon: <FlaskConical size={22} className="text-[#008BFF]" />,
      badge: 'LIS Tizimi',
      problem: 'Tahlil natijalarining kechikishi, tahlil blankalarini qo‘lda to‘ldirishdagi xatolar.',
      solution: 'Tahlil analizatorlari bilan to‘g‘ridan-to‘g‘ri sinxronizatsiya va QR-kodli elektron blankalar.',
      stats: 'Natija avtomatik 100%',
      gradient: 'from-[#008BFF] to-[#06B6D4]',
      link: '/app/appointments',
      features: [
        'Tahlil apparatlari va analizatorlar bilan to‘g‘ridan-to‘g‘ri integratsiya',
        'Bemor ilovasiga va shaxsiy kabinetiga natijalarni lahzada jo‘natish',
        'QR-kodli qonuniylashtirilgan elektron blankalar (PDF)',
        'Qo‘lda yozishdagi adashishlar va natija yo‘qolishini bartaraf qilish',
      ],
    },
    {
      id: 'moliya',
      title: 'Moliya',
      subtitle: 'Kassa & Fiskal Nazorat',
      icon: <CreditCard size={22} className="text-[#008BFF]" />,
      badge: 'Kassa & Finans',
      problem: 'Kassa kamomadi, moliyaviy hisobotlar shaffof emasligi va to‘lov turlarining chalkashligi.',
      solution: 'Click, Payme, Uzcard integratsiyasi, fiskal cheklar va real vaqtli sof foyda auditi.',
      stats: 'Shaffof kassa 100%',
      gradient: 'from-[#0D34B4] to-[#3B82F6]',
      link: '/app/finance',
      features: [
        'Click, Payme, Uzcard, Humo va naqd to‘lovlarining yagona hisobi',
        'Klinikaning real vaqtli sof daromadi va xarajatlar monitoringi',
        'Shifokorlar va xodimlar uchun foiz (bonus) hisob-kitobini avtomatlashtirish',
        'Fiskal cheklar va soliq hisobotlari bilan to‘liq integratsiya',
      ],
    },
    {
      id: 'retseptlar',
      title: 'Retseptlar',
      subtitle: 'E-Retsept & Reimbursatsiya',
      icon: <FileText size={22} className="text-[#008BFF]" />,
      badge: 'SSV Standarti',
      problem: 'Tushunarsiz qo‘lyozma retseptlar, noqonuniy dori berilishi va aptekalar bilan uzilish.',
      solution: 'SSV standartidagi QR elektron retseptlar, xalqaro dori bazasi va dorixonalar bilan integratsiya.',
      stats: 'Xatosiz retsept 100%',
      gradient: 'from-[#008BFF] to-[#10B981]',
      link: '/app/appointments',
      features: [
        'QR-kodli elektron retseptlar yaratish va bemor ilovasiga yuklash',
        'Reimbursatsiya davlat dasturi va dori kompensatsiyasi integratsiyasi',
        'Dori vositalarining nojo‘ya ta’siri va o‘zaro mos kelishini AI orqali tekshirish',
        'Dorixonalar tarmog‘i orqali retsept haqiqiyligini tekshirish',
      ],
    },
    {
      id: 'ombor',
      title: 'Ombor',
      subtitle: 'Dori & Sarf Nazorati',
      icon: <Package size={22} className="text-[#008BFF]" />,
      badge: 'Dori Hisobi',
      problem: 'Dori va sarf materiallarining muddatidan o‘tib ketishi, nazoratsiz yo‘qotishlar.',
      solution: 'Qat’iy seriya va yaroqlilik muddati nazorati, operatsiyadan so‘ng avtomatik hisobdan chiqarish.',
      stats: 'Yaroqlilik nazorati 100%',
      gradient: 'from-[#00B4D8] to-[#0D34B4]',
      link: '/app/dashboard',
      features: [
        'Dori va sarf materiallarining seriya raqami va yaroqlilik muddati hisobi',
        'Muolaja, tahlil va operatsiya yakunlangach, dorilarni avtomatik hisobdan chiqarish',
        'Ombordagi qoldiqlar kritik minimumga tushganda avtomatik ogohlantirish',
        'Yetkazib beruvchilar va kirim-chiqim kvitansiyalarini to‘liq nazorat qilish',
      ],
    },
    {
      id: 'elvora-insights',
      title: 'Elvora Insights',
      subtitle: 'Rahbar Tahlili & Prognoz',
      icon: <Sparkles size={22} className="text-[#008BFF]" />,
      badge: 'Smart Analitika',
      problem: 'Rahbar uchun operatsion xulosalarning yo‘qligi, daromad yo‘qotish sabablari noaniqligi.',
      solution: 'Qoidalarga asoslangan real vaqtli tahlil, no-show tahlili va shifokorlar daromadlilik reytingi.',
      stats: 'Tezkor biznes qarorlar',
      gradient: 'from-[#008BFF] to-[#6366F1]',
      link: '/app/insights',
      features: [
        'Klinika bosh vrachi va ta’sischilar uchun operatsion tahliliy panel',
        'Bo‘sh qolgan qabul soatlari va boy berilgan daromad hisob-kitobi',
        'Shifokorlarning qabul vaqti, bemorlar rozilik reytingi va kassa ulushi',
        'Keyingi oy uchun moliyaviy o‘sish prognozlari va amaliy tavsiyalar',
      ],
    },
  ];

  // Duplicate cards for seamless infinite scroll
  const marqueeCards = [...cards, ...cards];

  // Manual scroll handler
  const handleManualScroll = (direction: 'left' | 'right') => {
    setIsPaused(true);
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCardClick = (card: ModuleCardItem) => {
    setSelectedModalCard(card);
  };

  return (
    <section
      id="masalalar"
      className="py-20 lg:py-28 bg-[#F8FBFE] border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        {/* Top Split: Text & Button on Left, Doctors Photo on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-xs font-bold text-[#008BFF]">
              <Sparkles size={14} className="text-[#008BFF]" />
              <span>YAGONA TIBBIY SAAS YECHIM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Qanday masalalarni <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4]">
                yechamiz?
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-normal">
              Biz kundalik ishlarni avtomatlashtirish, xodimlar yuklamasini kamaytirish, xatolarni qisqartirish va qabullarni tezlashtirish orqali klinikangiz operatsion daromadini oshiramiz.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#mahsulotlar"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#1E2022] hover:bg-black text-white text-sm font-bold shadow-lg hover:shadow-2xl active:scale-95 transition-all cursor-pointer group"
              >
                <span>Barcha mahsulotlar</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-[#008BFF]" />
                8 ta ixtisoslashgan modul
              </span>
            </div>
          </div>

          {/* Right Doctors Team Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-md w-full">
              {/* Background cyan halo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-300/40 via-blue-300/30 to-teal-300/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />

              {/* Floating micro-badge: 99.8% Aniqlik */}
              <div className="absolute -top-4 -left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-cyan-200 shadow-xl px-3 py-2 flex items-center gap-2 animate-float-subtle">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <div className="text-[10px] font-extrabold text-slate-900 leading-none">99.8% Aniqlik</div>
                  <div className="text-[9px] text-slate-500">Avtomatik hisob</div>
                </div>
              </div>

              {/* Doctors Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-200 shadow-2xl bg-white">
                <img
                  src="/images/elvora_doctors.jpg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/dmed_doctors.jpg';
                  }}
                  alt="Elvora Health Malakali Shifokorlari"
                  className="w-full h-auto object-cover object-top max-h-[320px] transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating badge over image */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-cyan-100 shadow-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-slate-900 block text-xs sm:text-sm">
                      Malakali Tibbiyot Xodimlari
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">2 800+ Shifokorlar Ishonchi</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black bg-cyan-50 text-[#008BFF] border border-cyan-200 shadow-2xs">
                    Elvora Pro
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Controls Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#008BFF] animate-ping" />
          <span className="text-xs font-bold text-slate-700">
            Avtomatik oqim: Modul ustiga bosing yoki strelka orqali boshqaring
          </span>
        </div>

        {/* Carousel Navigation Buttons (Strelkalar) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleManualScroll('left')}
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-[#008BFF] hover:bg-cyan-50 text-slate-700 hover:text-[#008BFF] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            title="Chapga surish (Oldingi)"
            aria-label="Chapga surish"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="px-3 h-9 rounded-xl bg-white border border-slate-200 hover:border-[#008BFF] hover:bg-cyan-50 text-slate-700 hover:text-[#008BFF] flex items-center gap-1.5 text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
            title={isPaused ? "Oqimni davom ettirish" : "Oqimni to'xtatish"}
          >
            {isPaused ? <Play size={14} className="text-emerald-600" /> : <Pause size={14} className="text-[#008BFF]" />}
            <span className="hidden sm:inline">{isPaused ? "Davom ettirish" : "To'xtatish"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleManualScroll('right')}
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-[#008BFF] hover:bg-cyan-50 text-slate-700 hover:text-[#008BFF] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            title="O'ngga surish (Keyingi)"
            aria-label="O'ngga surish"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* INFINITE AUTO-SCROLLING CAROUSEL (Cheksiz Gorizontal Oqim)      */}
      {/* ============================================================== */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Smooth Gradient Masks for seamless appearance */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8FBFE] via-[#F8FBFE]/90 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8FBFE] via-[#F8FBFE]/90 to-transparent z-20" />

        {/* Scrolling Track Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-none scroll-smooth"
        >
          <div
            className={`animate-infinite-scroll flex gap-5 px-4 ${
              isPaused ? '[animation-play-state:paused]' : ''
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {marqueeCards.map((card, index) => {
              const isHovered = activeCardId === card.id;

              return (
                <div
                  key={`${card.id}-${index}`}
                  onClick={() => handleCardClick(card)}
                  onMouseEnter={() => setActiveCardId(card.id)}
                  className={`w-[300px] sm:w-[340px] shrink-0 p-6 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between group cursor-pointer sheen-card select-none ${
                    isHovered
                      ? 'border-[#008BFF] shadow-2xl shadow-cyan-500/15 -translate-y-1.5'
                      : 'border-slate-200/80 shadow-sm hover:shadow-xl hover:border-cyan-300'
                  }`}
                >
                  <div>
                    {/* Top Bar with Icon & Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isHovered
                            ? 'bg-gradient-to-br from-[#008BFF] to-[#0D34B4] text-white shadow-lg shadow-blue-500/30'
                            : 'bg-cyan-50 text-[#008BFF] border border-cyan-100'
                        }`}
                      >
                        {React.cloneElement(card.icon as React.ReactElement<{ className?: string }>, {
                          className: isHovered ? 'text-white' : 'text-[#008BFF]',
                        })}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100/80 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                          {card.badge}
                        </span>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="mb-3">
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-[#008BFF] transition-colors leading-tight">
                        {card.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-[#008BFF] block mt-0.5">
                        {card.subtitle}
                      </span>
                    </div>

                    {/* Problem Description (Red alert subtle tag) */}
                    <div className="mb-2.5 p-2 rounded-xl bg-rose-50/70 border border-rose-100 text-[11px] text-rose-900 leading-snug flex items-start gap-1.5">
                      <AlertCircle size={13} className="text-rose-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-bold">Muammo:</strong> {card.problem}
                      </span>
                    </div>

                    {/* Solution Description */}
                    <div className="p-2 rounded-xl bg-cyan-50/50 border border-cyan-100/70 text-[11px] text-slate-700 leading-snug">
                      <strong className="font-bold text-[#008BFF]">Elvora yechimi:</strong> {card.solution}
                    </div>
                  </div>

                  {/* Bottom Metric & Clickable Action Arrow Button */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      <span>{card.stats}</span>
                    </span>

                    {/* Fully Clickable Interactive Arrow Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(card);
                      }}
                      className="w-8 h-8 rounded-full bg-cyan-50 group-hover:bg-[#008BFF] text-[#008BFF] group-hover:text-white flex items-center justify-center transition-all shadow-xs hover:scale-115 active:scale-95 cursor-pointer"
                      title={`${card.title} modulini ochish va batafsil ko'rish`}
                      aria-label={`${card.title} modulini ochish`}
                    >
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Helper bottom caption */}
        <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#008BFF] animate-ping" />
          <span>Kartochka yoki strelka tugmasini bosib, to‘liq imkoniyatlarni ko‘rishingiz mumkin</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* INTERACTIVE MODULE DETAILS POPUP MODAL                         */}
      {/* ============================================================== */}
      {selectedModalCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border-2 border-cyan-200 space-y-5 relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedModalCard(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Yopish"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 pr-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#008BFF] to-[#0D34B4] text-white flex items-center justify-center shadow-lg shrink-0">
                {selectedModalCard.icon}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 bg-cyan-50 text-[#008BFF] px-2.5 py-0.5 rounded-full border border-cyan-200">
                    {selectedModalCard.badge}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {selectedModalCard.stats}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {selectedModalCard.title}
                </h3>
                <p className="text-xs font-bold text-[#008BFF]">
                  {selectedModalCard.subtitle}
                </p>
              </div>
            </div>

            {/* Problem & Solution Comparison */}
            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 text-xs text-rose-950 flex items-start gap-2.5">
                <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-rose-900">Klinikadagi muammo:</strong>
                  <p className="mt-0.5 leading-relaxed">{selectedModalCard.problem}</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-cyan-50/80 border border-cyan-200 text-xs text-slate-800 flex items-start gap-2.5">
                <Sparkles size={16} className="text-[#008BFF] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-[#008BFF]">Elvora Health Yechimi:</strong>
                  <p className="mt-0.5 leading-relaxed">{selectedModalCard.solution}</p>
                </div>
              </div>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Asosiy imkoniyatlar:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedModalCard.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2 text-slate-700 font-medium"
                  >
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to={selectedModalCard.link}
                onClick={() => setSelectedModalCard(null)}
                className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white text-xs font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Ushbu modulni ochish (MIS)</span>
                <ArrowRight size={14} />
              </Link>

              <a
                href="#portal"
                onClick={() => setSelectedModalCard(null)}
                className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center cursor-pointer"
              >
                E-Navbat sinash
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
