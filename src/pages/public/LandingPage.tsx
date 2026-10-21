import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  CalendarCheck2,
  Users,
  CircleDollarSign,
  BarChart3,
  Stethoscope,
  Clock,
  Layers,
  Activity,
  Zap,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet,
  Cpu,
  Smartphone,
  Tablet,
  Tv,
  QrCode,
  Bell,
  Sliders,
  DollarSign,
  AlertTriangle,
  Building,
} from 'lucide-react';
import { ElvoraFloatingNavbar } from '../../components/public/ElvoraFloatingNavbar';
import { ElvoraLeakHero } from '../../components/public/ElvoraLeakHero';
import { ElvoraProblemCards } from '../../components/public/ElvoraProblemCards';
import { ElvoraLiveDemoSection } from '../../components/public/ElvoraLiveDemoSection';
import { HeroProductPreview } from '../../components/public/HeroProductPreview';
import { ElvoraMindMap } from '../../components/public/ElvoraMindMap';
import { ElvoraBentoStats } from '../../components/public/ElvoraBentoStats';
import { LiveBookingWidget } from '../../components/public/LiveBookingWidget';
import { ElvoraAiAssistant } from '../../components/public/ElvoraAiAssistant';
import { PublicFooter } from '../../components/public/PublicFooter';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

export const LandingPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [doctorCount, setDoctorCount] = useState<number>(6);
  const pageContainerRef = useRef<HTMLDivElement>(null);

  // ROI calculations
  const estimatedNoShowSaved = doctorCount * 850000;
  const estimatedHoursSaved = doctorCount * 7;

  useGsapContext(
    pageContainerRef,
    () => {
      // Reveal section headings as they enter viewport
      gsap.utils.toArray<HTMLElement>('.scroll-reveal-header').forEach((header) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
          },
          y: 35,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        });
      });

      // Reveal ROI Calculator
      gsap.from('.calculator-card-anim', {
        scrollTrigger: {
          trigger: '.calculator-card-anim',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        scale: 0.98,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Stagger pricing cards
      gsap.from('.pricing-card-anim', {
        scrollTrigger: {
          trigger: '#pricing',
          start: 'top 80%',
        },
        y: 45,
        opacity: 0,
        stagger: 0.14,
        duration: 0.75,
        ease: 'power2.out',
      });

      // Stagger FAQ items
      gsap.from('.faq-item-anim', {
        scrollTrigger: {
          trigger: '#faq-section',
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
      });
    },
    []
  );

  const pricingPlans = [
    {
      name: 'Boshlang\'ich (Starter)',
      tagline: 'Kichik shifoxonalar va yakka amaliyotlar uchun',
      priceMonthly: '590 000',
      priceYearly: '500 000',
      popular: false,
      features: [
        'Cheksiz bemorlar kartotekasi',
        'Shifokorlar ish jadvali va tanaffuslar',
        'Qabullar ro\'yxati va navbat tartibi',
        'Asosiy kirim va chiqim kassa hisobi',
        'Eksport: Excel / PDF formatida',
        '3 tagacha xodim akkaunti',
      ],
      cta: 'Sinab ko\'rish',
    },
    {
      name: 'Professional (Elvora Pro)',
      tagline: 'O\'sayotgan xususiy klinikalar va tibbiy markazlar uchun',
      priceMonthly: '1 290 000',
      priceYearly: '1 100 000',
      popular: true,
      features: [
        'Barcha Boshlang\'ich imkoniyatlari',
        'Kutish zali uchun Jonli E-Navbat tablosi',
        'Elvora Insights™ — Qoidalarga asoslangan tahlil',
        'SMS & Telegram eslatmalar shlyuzi (Simulyatsiya)',
        'Click / Payme / Uzcard to\'lovlar qaydi',
        '15 tagacha shifokor va registrator akkaunti',
        'Prioritetli 24/7 texnik ko\'mak',
      ],
      cta: 'Pro tarifini boshlash',
    },
    {
      name: 'Enterprise / Hospital',
      tagline: 'Ko\'p tarmoqli klinikalar va diagnostika tarmoqlari uchun',
      priceMonthly: '2 890 000',
      priceYearly: '2 450 000',
      popular: false,
      features: [
        'Barcha Professional imkoniyatlari',
        'Cheksiz filiallar va shifokorlar shtati',
        'Maxsus laboratoriya va MRT/KT integratsiyasi',
        'SSV (Sog\'liqni saqlash vazirligi) milliy talablari',
        'Shaxsiy serverga o\'rnatish (On-Premises)',
        'Shaxsiy menejer va xodimlarni joyida o\'qitish',
      ],
      cta: 'Klinikani ulash',
    },
  ];

  const faqs = [
    {
      q: 'Elvora Health qanday imkoniyat va afzalliklarga ega?',
      a: 'Elvora Health O‘zbekiston Respublikasi Sog‘liqni saqlash ekotizimi standartlari asosida yaratilgan: Bemorlarning elektron tibbiy kartasi, shifokorlar qabuliga onlayn E-navbat, kutish zali raqamli tablosi, kassa va elektron retseptlar bitta yaxlit platformada mujassamlashgan.',
    },
    {
      q: 'Bemorlar va moliyaviy ma\'lumotlar qanday himoyalanadi?',
      a: 'Elvora Health "Zero-Data Leakage" tamoyiliga tayanadi. Bemor ma\'lumotlari hech qachon tashqi uchinchi tomon AI servislarga jo\'natilmaydi. Ma\'lumotlar xavfsiz shifrlangan ma\'lumotlar bazasida saqlanadi.',
    },
    {
      q: 'Qabullarda shifokorlarning band vaqtiga ikki marta yozib qo\'yish (double-booking) xavfi bormi?',
      a: 'Mutlaqo yo\'q. Tizim shifokorning ish soatlari, tushlik tanaffuslari va mavjud qabullarini real vaqtda tekshiradi hamda ziddiyatli vaqtlarga qabul qo\'yishni avtomatik ravishda bloklaydi.',
    },
    {
      q: 'Elvora Insights qanday ishlaydi va sun\'iy intellekt talab qiladimi?',
      a: 'Tizim shaffof matematik va tibbiy operatsion qoidalar asosida ishlaydi. U shifokorlar bandlik darajasi, kelmagan bemorlar (no-show) foizi, eng ko\'p xarajat yo\'nalishlari va bo\'sh slotlarni tahlil qilib, rahbar uchun amaliy xulosalar beradi.',
    },
    {
      q: 'Klinikadagi mavjud qog\'oz yoki Excel bazani Elvora Health ga o\'tkazish mumkinmi?',
      a: 'Ha, tizim Excel/CSV formatidagi bemorlar ro\'yxatini import qilish va barcha moliyaviy hamda tibbiy hisobotlarni qayta eksport qilish imkoniyatini taqdim etadi.',
    },
  ];

  return (
    <div ref={pageContainerRef} className="min-h-screen bg-white text-[#132229] flex flex-col font-sans selection:bg-[#008BFF] selection:text-white relative">
      {/* 0. STICKY FLOATING NAVBAR */}
      <ElvoraFloatingNavbar />

      {/* 1. HERO – "Pul oqib ketmoqda" moment (LEAK & SEAL SIGNATURE WOW MOMENT) */}
      <ElvoraLeakHero />

      {/* 2. THE PROBLEM IN 3 CARDS (No-show, Bo'sh slotlar, Ko'rinmas hisob-kitob) */}
      <ElvoraProblemCards />

      {/* 3. LIVE INTERACTIVE DEMO (The "I Need This" Section) */}
      <ElvoraLiveDemoSection />

      {/* 4. MAHSULOTLAR (3-in-1 Platform Suite: App, Tablet, TV Tablo) */}
      <section id="mahsulotlar" className="py-20 lg:py-24 bg-[#F8FBFE] border-b border-slate-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="scroll-reveal-header text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#008BFF] bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-200">
              ELVORA HEALTH MAHSULOTLAR TO‘PLAMI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Barcha Qurilmalar Uchun <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4]">
                Yagona Tibbiy Platforma
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Bemorlar mobil ilovasi, shifokorlar plansheti va kutish zali raqamli tablosi — bir-biri bilan real vaqtda sinxronlashgan holda ishlaydi.
            </p>
          </div>

          <HeroProductPreview />
        </div>
      </section>

      {/* 5. "ELVORA HEALTH NIMA?" MIND-MAP NETWORK */}
      <ElvoraMindMap />

      {/* 6. BENTO GRID STATISTICS */}
      <ElvoraBentoStats />

      {/* 6. INTERACTIVE LIVE E-TICKET BOOKING SIMULATOR */}
      <section id="portal" className="py-20 bg-[#F4F9FC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal-header text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#008BFF] bg-cyan-50 px-3.5 py-1 rounded-full border border-cyan-200">
              INTERAKTIV SINOV
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Elektron Navbat Chiptasini Hozir Oling
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Shifokor va vaqtni tanlang, o'z ismingizni kiritib haqiqiy QR-kodli elektron chiptani yarating!
            </p>
          </div>

          <LiveBookingWidget />
        </div>
      </section>

      {/* 7. DONIYOR AI MEDICAL CHATBOT SIMULATOR */}
      <section id="doniyor-ai" className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal-header text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#008BFF] bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-200">
              SUN'IY INTELLEKT TIBBIY YORDAMCHISI
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Elvora AI & Doniyor bilan Skrining
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Bemor shikoyatlarini real vaqtda saralash, to‘g‘ri shifokor qabuliga yo‘naltirish va klinika yuklamasini optimallashtirish.
            </p>
          </div>

          <ElvoraAiAssistant />
        </div>
      </section>

      {/* 8. ROI SAVINGS CALCULATOR */}
      <section id="calculator" className="py-20 bg-[#F4F9FC] border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="calculator-card-anim bg-white rounded-3xl border-2 border-cyan-100 p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#008BFF] bg-cyan-50 px-4 py-1 rounded-full border border-cyan-200">
                KLINIKA DAROMADINI HISOBLANG
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Elvora Health Bilan Qancha Mablag‘ Tejaysiz?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Klinikangizdagi shifokorlar sonini tanlang va oylik tejaladigan soat hamda saqlab qolinadigan tushumni hisoblang
              </p>
            </div>

            {/* Slider */}
            <div className="space-y-3 pt-4">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-600">Klinikadagi shifokorlar shtati:</span>
                <span className="text-xl font-black text-[#008BFF] bg-cyan-50 px-4 py-1 rounded-xl border border-cyan-200">
                  {doctorCount} nafar shifokor
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={doctorCount}
                onChange={(e) => setDoctorCount(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#008BFF]"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>1 shifokor</span>
                <span>10 shifokor</span>
                <span>25 shifokor</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200 text-center hover:scale-[1.02] transition-transform">
                <span className="text-xs font-semibold text-[#008BFF] block">
                  No-show kamayishi hisobiga oylik tejamkorlik:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  +{estimatedNoShowSaved.toLocaleString('uz-UZ')} UZS
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  (Har bir shifokorga o‘rtacha 850 000 UZS/oy saqlab qolingan kassa tushumi)
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs hover:scale-[1.02] transition-transform">
                <span className="text-xs font-semibold text-slate-600 block">
                  Registratura va shifokorlar tejalgan vaqti:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  ~{estimatedHoursSaved} soat / oy
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  (Qog‘ozbozlik va navbat tushuntirishlarga ketmaydigan sof vaqt)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PRICING SECTION */}
      <section id="pricing" className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal-header text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#008BFF] bg-cyan-50 px-4 py-1 rounded-full border border-cyan-200">
              SHAFFOF TARIFLAR
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Klinikangiz O‘sishiga Mos Tarif Rejalari
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Yashirin to‘lovlarsiz, O‘zbekiston so‘mida rasmiy shartnoma bilan.
            </p>

            {/* Billing Toggle */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-xs font-bold ${billingPeriod === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
                Oylik to‘lov
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                className="w-12 h-6 bg-[#008BFF] rounded-full p-0.5 transition-colors cursor-pointer relative"
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-xs font-bold flex items-center gap-1.5 ${billingPeriod === 'yearly' ? 'text-[#008BFF]' : 'text-slate-500'}`}>
                <span>Yillik to‘lov</span>
                <span className="text-[10px] font-extrabold bg-cyan-50 text-[#008BFF] px-2 py-0.5 rounded-full border border-cyan-200">
                  -15% chegirma
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`pricing-card-anim rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative hover:-translate-y-1.5 ${
                  plan.popular
                    ? 'bg-white border-2 border-[#008BFF] shadow-2xl ring-4 ring-[#008BFF]/5 hover:shadow-cyan-200/50'
                    : 'bg-slate-50/70 border border-slate-200 shadow-xs hover:shadow-md hover:bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#008BFF] text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                    Eng Ommabop
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-black text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">{plan.tagline}</p>

                  <div className="my-6">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                      {billingPeriod === 'yearly' ? plan.priceYearly : plan.priceMonthly}
                    </span>
                    <span className="text-xs text-slate-500 ml-1 font-semibold">UZS / oy</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-slate-200">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check size={14} className="text-[#008BFF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <Link
                    to="/app/dashboard"
                    className={`w-full py-3 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer ${
                      plan.popular
                        ? 'bg-[#008BFF] text-white hover:bg-[#0077DB] shadow-blue-500/20 hover:shadow-md'
                        : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-cyan-200'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ ACCORDION */}
      <section id="faq-section" className="py-20 bg-[#F4F9FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal-header text-center max-w-2xl mx-auto space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Ko‘p Beriladigan Savollar
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Platforma xavfsizligi, integratsiya va sinov rejimi bo‘yicha ma'lumotlar
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="faq-item-anim bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:border-cyan-200 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#008BFF] transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. BIG INVESTOR CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-white/20 backdrop-blur-md">
            IT Live 2026 Investor Selection
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Klinikangizni yangi raqamli bosqichga olib chiqing
          </h2>
          <p className="text-sm sm:text-base text-cyan-100 max-w-2xl mx-auto font-normal">
            Barcha hisob-kitoblar, shifokorlar bandligi va jonli navbat boshqaruvi bilan real vaqt rejimida tanishing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              to="/app/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-[#008BFF] text-sm font-black hover:bg-cyan-50 transition-all shadow-xl active:scale-95 hover:scale-[1.02]"
            >
              Klinika Namoyish Paneliga O‘tish →
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/15 text-white border border-white/30 text-sm font-bold hover:bg-white/25 transition-all active:scale-95"
            >
              Tizimga Kirish (Login)
            </Link>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <PublicFooter />
    </div>
  );
};

export default LandingPage;
