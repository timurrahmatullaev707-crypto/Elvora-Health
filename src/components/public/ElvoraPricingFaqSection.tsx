import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Phone,
  Send,
  Building,
  CheckCircle2,
  Clock,
  Users,
  FileSpreadsheet,
  AlertCircle,
} from 'lucide-react';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

export const ElvoraPricingFaqSection: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Demo form states
  const [demoName, setDemoName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoClinic, setDemoClinic] = useState('');
  const [demoDoctors, setDemoDoctors] = useState('6-15');
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName.trim() || !demoPhone.trim() || !demoClinic.trim()) return;

    setDemoSubmitting(true);
    // Simulate network submission
    setTimeout(() => {
      setDemoSubmitting(false);
      setDemoSuccess(true);
    }, 800);
  };

  useGsapContext(
    sectionRef,
    () => {
      // Reveal pricing cards
      gsap.fromTo(
        '.pricing-card-anim',
        { y: 25, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true,
          },
        }
      );

      // Reveal Demo Form
      gsap.fromTo(
        '.demo-form-anim',
        { y: 25, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#demo-sorash',
            start: 'top 95%',
            once: true,
          },
        }
      );

      // Stagger FAQ items
      gsap.fromTo(
        '.faq-item-anim',
        { y: 20, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#faq-section',
            start: 'top 95%',
            once: true,
          },
        }
      );
    },
    []
  );

  const pricingPlans = [
    {
      name: 'Boshlangʻich (Starter)',
      tagline: 'Kichik shifoxonalar va yakka amaliyotlar uchun',
      priceMonthly: '590 000',
      priceYearly: '500 000',
      popular: false,
      features: [
        'Cheksiz bemorlar kartotekasi',
        'Shifokorlar ish jadvali va tanaffuslar',
        'Qabullar roʻyxati va navbat tartibi',
        'Asosiy kirim va chiqim kassa hisobi',
        'Eksport: Excel / PDF formatida',
        '3 tagacha xodim akkaunti',
      ],
      cta: 'Sinab koʻrish',
    },
    {
      name: 'Professional (Elvora Pro)',
      tagline: 'Oʻsayotgan xususiy klinikalar va tibbiy markazlar uchun',
      priceMonthly: '1 290 000',
      priceYearly: '1 100 000',
      popular: true,
      features: [
        'Barcha Boshlangʻich imkoniyatlari',
        'Kutish zali uchun Jonli E-Navbat tablosi',
        'Elvora Insights™ — Qoidalarga asoslangan tahlil',
        'SMS & Telegram eslatmalar shlyuzi (Simulyatsiya)',
        'Click / Payme / Uzcard toʻlovlar qaydi (tez orada)',
        '15 tagacha shifokor va registrator akkaunti',
        'Prioritetli 24/7 texnik koʻmak',
      ],
      cta: 'Pro tarifini tanlash',
    },
    {
      name: 'Enterprise / Hospital',
      tagline: 'Koʻp tarmoqli klinikalar va diagnostika tarmoqlari uchun',
      priceMonthly: '2 890 000',
      priceYearly: '2 450 000',
      popular: false,
      features: [
        'Barcha Professional imkoniyatlari',
        'Cheksiz filiallar va shifokorlar shtati',
        'Maxsus laboratoriya va MRT/KT integratsiyasi',
        'SSV milliy standartlariga moslashuv (tez orada)',
        'Shaxsiy serverga oʻrnatish (On-Premises imkoniyati)',
        'Shaxsiy menejer va xodimlarni joyida oʻqitish',
      ],
      cta: 'Klinikani ulash',
    },
  ];

  const faqs = [
    {
      q: 'Elvora Health qanday imkoniyat va afzalliklarga ega?',
      a: 'Elvora Health Oʻzbekiston Respublikasi Sogʻliqni saqlash ekotizimi standartlari asosida yaratilgan: Bemorlarning elektron tibbiy kartasi, shifokorlar qabuliga onlayn E-navbat, kutish zali raqamli tablosi, kassa va elektron retseptlar bitta yaxlit platformada mujassamlashgan.',
    },
    {
      q: 'Bemorlar va moliyaviy maʼlumotlar qanday himoyalanadi?',
      a: 'Elvora Health "Zero-Data Leakage" tamoyiliga tayanadi. Bemor maʼlumotlari hech qachon tashqi uchinchi tomon AI servislarga joʻnatilmaydi. Maʼlumotlar mahalliy qonunchilik talablariga mos, xavfsiz shifrlangan maʼlumotlar bazasida saqlanadi.',
    },
    {
      q: 'Qabullarda shifokorlarning band vaqtiga ikki marta yozib qoʻyish (double-booking) xavfi bormi?',
      a: 'Mutlaqo yoʻq. Tizim shifokorning ish soatlari, tushlik tanaffuslari va mavjud qabullarini real vaqtda tekshiradi hamda ziddiyatli vaqtlarga qabul qoʻyishni avtomatik ravishda bloklaydi.',
    },
    {
      q: 'Elvora Insights qanday ishlaydi va sunʼiy intellekt talab qiladimi?',
      a: 'Tizim shaffof matematik va tibbiy operatsion qoidalar asosida ishlaydi. U shifokorlar bandlik darajasi, kelmagan bemorlar (no-show) foizi, eng koʻp xarajat yoʻnalishlari va boʻsh slotlarni tahlil qilib, rahbar uchun amaliy xulosalar beradi.',
    },
    {
      q: 'Klinikadagi mavjud qogʻoz yoki Excel bazani Elvora Health ga oʻtkazish mumkinmi?',
      a: 'Ha, tizim Excel/CSV formatidagi bemorlar roʻyxatini import qilish va barcha moliyaviy hamda tibbiy hisobotlarni qayta eksport qilish imkoniyatini taqdim etadi. Texnik koʻmak jamoamiz bazani bepul koʻchirib beradi.',
    },
  ];

  return (
    <div ref={sectionRef} className="space-y-0">
      
      {/* ================= 9A. PRICING SECTION ================= */}
      <section id="tariflar" className="py-20 lg:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#008BFF]/5 via-cyan-50/80 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#008BFF] bg-cyan-50 px-4 py-1 rounded-full border border-cyan-200">
              SHAFFOF TARIFLAR
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Klinikangiz Oʻsishiga Mos Tarif Rejalari
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Yashirin toʻlovlarsiz, Oʻzbekiston soʻmida rasmiy shartnoma bilan.
            </p>

            {/* Billing Toggle with 15% discount badge */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-xs font-bold ${billingPeriod === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
                Oylik toʻlov
              </span>
              <button
                type="button"
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                className="w-12 h-6 bg-[#008BFF] rounded-full p-0.5 transition-colors cursor-pointer relative"
                aria-label="Tarif muddatini almashtirish"
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-xs font-bold flex items-center gap-1.5 ${billingPeriod === 'yearly' ? 'text-[#008BFF]' : 'text-slate-500'}`}>
                <span>Yillik toʻlov</span>
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
                className={`pricing-card-anim rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative hover:-translate-y-1.5 ${
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
                  <a
                    href="#demo-sorash"
                    className={`w-full py-3 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer ${
                      plan.popular
                        ? 'bg-[#008BFF] text-white hover:bg-[#0077DB] shadow-blue-500/20 hover:shadow-md'
                        : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-cyan-200'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 9B. WORKING DEMO SO'RASH FORM ================= */}
      <section id="demo-sorash" className="py-20 lg:py-24 bg-[#F4F9FC] border-b border-slate-200/80 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="demo-form-anim bg-white rounded-3xl border-2 border-cyan-100 p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider text-[#008BFF] bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-200 inline-flex items-center gap-1.5 shadow-xs">
                <Sparkles size={13} className="text-[#008BFF]" />
                BEPUL KONSULTATSIYA VA NAMOYISH
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Klinikangiz Uchun Jonli Demo Soʻrang
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                15 daqiqalik shaxsiy taqdimot: mutaxassisimiz platformani klinikangiz jarayonlariga moslab koʻrsatadi va barcha savollaringizga javob beradi.
              </p>
            </div>

            {!demoSuccess ? (
              <form onSubmit={handleDemoSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <span>Ism va familiyangiz:</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={demoName}
                      onChange={(e) => setDemoName(e.target.value)}
                      placeholder="Masalan: Dr. Jasur Rahimov"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#008BFF] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <span>Telefon raqamingiz:</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={demoPhone}
                      onChange={(e) => setDemoPhone(e.target.value)}
                      placeholder="+998 (90) 123-45-67"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#008BFF] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Clinic Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <span>Klinika yoki tibbiy markaz nomi:</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={demoClinic}
                      onChange={(e) => setDemoClinic(e.target.value)}
                      placeholder="Masalan: Shifo Med Premium"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#008BFF] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Doctor Count */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Shifokorlar soni (taxminan):
                    </label>
                    <select
                      value={demoDoctors}
                      onChange={(e) => setDemoDoctors(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#008BFF] focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="1-5">1 – 5 nafar shifokor</option>
                      <option value="6-15">6 – 15 nafar shifokor</option>
                      <option value="16-30">16 – 30 nafar shifokor</option>
                      <option value="30+">30 nafardan ortiq (Katta klinika)</option>
                    </select>
                  </div>
                </div>

                {/* Assurance pills */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <ShieldCheck size={14} /> Mutlaqo bepul va majburiyatsiz
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock size={14} className="text-[#008BFF]" /> 15 daqiqada bogʻlanamiz
                  </span>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={demoSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4] hover:from-[#007EE6] hover:to-[#0A2D9C] text-white text-sm font-black flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25 hover:shadow-2xl transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {demoSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Yuborilmoqda...</span>
                      </span>
                    ) : (
                      <>
                        <span>Bepul Demo Soʻrovini Yuborish</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success State */
              <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 size={36} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">
                    Soʻrovingiz Muvaffaqiyatli Qabul Qilindi!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Hurmatli <strong>{demoName}</strong>, <strong>"{demoClinic}"</strong> klinikasi uchun shaxsiy demo parametrlari tayyorlanmoqda.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200 text-xs text-slate-700 max-w-md mx-auto space-y-1">
                  <div className="font-bold text-[#008BFF]">
                    Mutaxassisimiz 15 daqiqa ichida bogʻlanadi:
                  </div>
                  <div>Telefon raqam: <strong>{demoPhone}</strong></div>
                  <div className="text-[11px] text-slate-500">
                    Sizga qulay vaqtda videokonferensiya yoki telefon orqali platformani namoyish etamiz.
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/app/dashboard"
                    className="px-6 py-3 rounded-2xl bg-[#008BFF] text-white text-xs font-bold hover:bg-[#0077DB] transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                  >
                    <span>Klinika Demosini Hozir Koʻrish</span>
                    <ArrowRight size={13} />
                  </Link>
                  <button
                    onClick={() => {
                      setDemoSuccess(false);
                      setDemoName('');
                      setDemoPhone('');
                      setDemoClinic('');
                    }}
                    className="px-5 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Boshqa soʻrov yuborish
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ================= 9C. FAQ ACCORDION ================= */}
      <section id="faq-section" className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#008BFF] bg-cyan-50 px-4 py-1 rounded-full border border-cyan-200">
              SAVOLLAR VA JAVOBLAR
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Koʻp Beriladigan Savollar
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Platforma xavfsizligi, integratsiya va sinov rejimi boʻyicha maʼlumotlar
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="faq-item-anim bg-[#F8FBFE] rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:border-cyan-200 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#008BFF] transition-transform duration-200 shrink-0 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 9D. FINAL GRAND CTA BANNER ================= */}
      <section className="py-20 bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4] text-white relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#071328]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-white/20 backdrop-blur-md shadow-xs">
            Raqamli Tibbiyot Standarti 2026
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Klinikangizni yangi raqamli bosqichga olib chiqing
          </h2>
          <p className="text-sm sm:text-base text-cyan-100 max-w-2xl mx-auto font-normal">
            Barcha hisob-kitoblar, shifokorlar bandligi va jonli navbat boshqaruvi bilan real vaqt rejimida tanishing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
            <Link
              to="/app/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-[#008BFF] text-sm font-black hover:bg-cyan-50 transition-all shadow-xl active:scale-95 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Klinika Namoyish Paneliga Oʻtish</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/15 text-white border border-white/30 text-sm font-bold hover:bg-white/25 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Tizimga Kirish (Login)</span>
            </Link>
          </div>

          <div className="pt-2 text-xs text-cyan-100 flex items-center justify-center gap-2">
            <Phone size={13} />
            <span>Savollaringiz bormi? Call-markaz: +998 (71) 202-50-00</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ElvoraPricingFaqSection;
