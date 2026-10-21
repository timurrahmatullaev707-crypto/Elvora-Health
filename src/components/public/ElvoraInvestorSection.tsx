import React, { useState, useRef } from 'react';
import {
  Briefcase,
  TrendingUp,
  Target,
  Layers,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Users,
  Download,
  Mail,
  Building,
  Check,
  Sparkles,
  PieChart,
  DollarSign,
  Send,
  X,
} from 'lucide-react';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

export const ElvoraInvestorSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [investorName, setInvestorName] = useState('');
  const [investorEmail, setInvestorEmail] = useState('');
  const [investorFund, setInvestorFund] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  const handleInvestorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // keep success state
    }, 1000);
  };

  useGsapContext(
    sectionRef,
    () => {
      gsap.fromTo(
        '.investor-header',
        { y: 25, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
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

      gsap.fromTo(
        '.investor-pillar-card',
        { y: 30, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.roadmap-item-anim',
        { y: 25, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#roadmap-box',
            start: 'top 95%',
            once: true,
          },
        }
      );
    },
    []
  );

  const roadmapMilestones = [
    {
      quarter: 'Q1 2026',
      status: 'Bajarildi (Live)',
      statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      title: 'Core Ekotizim & MIS Yadro',
      desc: 'Bemorlar elektron kartasi, jonli navbat TV tablosi, asosiy kassa va shifokorlar ish jadvallari moduli toʻliq ishga tushirildi.',
      items: ['Zero-Data Leakage arxitekturasi', 'Kutish zali E-navbat tablosi', 'Oflayn-onlayn sinxronlash'],
    },
    {
      quarter: 'Q2 2026',
      status: 'Tez orada',
      statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
      title: 'Toʻlovlar & Telegram Bemor Boti',
      desc: 'Click, Payme va Uzcard toʻgʻridan-toʻgʻri shlyuzlari (tez orada), bemorlar uchun qabulga yozilish va eslatmalar bot-xizmati.',
      items: ['Click / Payme / Uzcard integratsiyasi (tez orada)', 'Avtomatik SMS va bot bildirishnomalari', 'Bemor kabineti'],
    },
    {
      quarter: 'Q3 2026',
      status: 'Rejalashtirilgan',
      statusColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
      title: 'DMED & Milliy Standartlar Integratsiyasi',
      desc: 'Davlat tibbiy maʼlumotlar almashinuvi standartlari va laboratoriya apparatlari (LIS/PACS) bilan ikki tomonlama shlyuz.',
      items: ['SSV milliy standartlariga moslashuv (tez orada)', 'LIS laboratoriya tahlillari moduli', 'Dori vositalari registri'],
    },
    {
      quarter: 'Q4 2026',
      status: 'Rejalashtirilgan',
      statusColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
      title: 'Mobil Ilova (iOS & Android)',
      desc: 'Bemorlar va shifokorlar uchun toʻliq funksiyali mobil ilova: push-eslatmalar, jonli retseptlar va tahlil natijalari bir joyda.',
      items: ['Cross-platform Flutter / React Native', 'FaceID bilan tibbiy karta himoyasi', 'Telemeditsina maslahat kanali'],
    },
  ];

  const teamMembers = [
    {
      name: 'Dr. Temur Rahmatullayev',
      role: 'Asoschi & Mahsulot Arxitektori',
      bio: 'Sogʻliqni saqlash sohasida 7 yillik amaliy tajriba, MedTech va B2B SaaS tizimlari ishlab chiquvchisi.',
    },
    {
      name: 'Dr. Anvar Usmonov',
      role: 'Bosh Tibbiy Maslahatchi (MD)',
      bio: 'Oliy toifali shifokor-kardiolog, 18 yillik klinik amaliyot, tibbiy jarayonlar va sifat auditi eksperti.',
    },
    {
      name: 'Rustam Karimov',
      role: 'Texnik Direktor (Lead Architect)',
      bio: 'Katta yuklamali taqsimlangan tizimlar va maʼlumotlar xavfsizligi boʻyicha 9+ yillik muhandislik staji.',
    },
  ];

  return (
    <section
      id="investorlar"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#06101E] text-white border-b border-[#0F223D] relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#008BFF]/15 via-[#00D4FF]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#0D34B4]/20 via-[#008BFF]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#008BFF_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="investor-header text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#00D4FF] bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-400/30 inline-flex items-center gap-1.5 shadow-xs">
            <Briefcase size={13} className="text-[#00D4FF]" />
            8. INVESTORLAR VA HAMKORLAR BOʻLIMI
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Oʻzbekiston HealthTech Bozorida <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#008BFF] to-[#38BDF8]">
              Yetakchi Vertikal SaaS Platformasi
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Klinikalardagi yoʻqotishlarni bartaraf etuvchi, barqaror ARR oʻsishiga ega boʻlgan va kengaytiriladigan raqamli infratuzilma.
          </p>
        </div>

        {/* 4 Core Pillars: Muammo, Yechim, Bozor, Biznes Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          
          {/* 1. Muammo */}
          <div className="investor-pillar-card p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-red-500/30 flex flex-col justify-between space-y-4 hover:border-red-500/60 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center text-red-400">
                <Target size={18} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-red-400 block">
                1. Muammo
              </span>
              <h3 className="text-lg font-black text-white">25–30% Tushum Yoʻqotilishi</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Xususiy tibbiyot markazlarida kelmagan bemorlar (no-show), qogʻoz qabullar va tarqoq Excel hisoblari sababli oylik daromadning deyarli uchdan biri boy berilmoqda.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-[11px] text-red-300 font-semibold">
              Klinika rahbarlarida markaziy nazorat yoʻq
            </div>
          </div>

          {/* 2. Yechim */}
          <div className="investor-pillar-card p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-cyan-500/30 flex flex-col justify-between space-y-4 hover:border-cyan-400/60 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-[#00D4FF]">
                <Sparkles size={18} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#00D4FF] block">
                2. Yechim
              </span>
              <h3 className="text-lg font-black text-white">Yaxlit Vertikal SaaS</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Elvora Health — oʻrnatish shart boʻlmagan bulutli ekotizim: E-navbat, kassa, elektron retsept va tahliliy hisobotlar bitta oyna va bitta maʼlumotlar bazasida.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-[11px] text-cyan-300 font-semibold">
              Zero-Data Leakage va milliy qonunlarga mos
            </div>
          </div>

          {/* 3. Bozor */}
          <div className="investor-pillar-card p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-blue-500/30 flex flex-col justify-between space-y-4 hover:border-blue-400/60 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <PieChart size={18} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-400 block">
                3. Bozor Hajmi
              </span>
              <h3 className="text-lg font-black text-white">$12.5M+ SAM Hajmi</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Oʻzbekistonda 3 500+ xususiy klinikalar va diagnostika markazlari faoliyat yuritadi. Yillik xususiy tibbiyot xizmatlari oʻsishi 18% dan oshmoqda.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-[10px] text-slate-400 italic">
              * Manba: Ochiq statistik maʼlumotlar va bozor modellashtirish hisob-kitobi
            </div>
          </div>

          {/* 4. Biznes Model */}
          <div className="investor-pillar-card p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-emerald-500/30 flex flex-col justify-between space-y-4 hover:border-emerald-400/60 transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <DollarSign size={18} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 block">
                4. Biznes Model
              </span>
              <h3 className="text-lg font-black text-white">B2B SaaS Obuna (ARR)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Oylik va yillik obuna tariflari (590 000 – 2 890 000 UZS/oy). Qoʻshimcha monetizatsiya: SMS-shlyuz, filiallar litsenziyasi va maxsus integratsiyalar.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-[11px] text-emerald-300 font-semibold">
              Kompaniyaning doimiy kutiladigan daromadi (MRR)
            </div>
          </div>

        </div>

        {/* Animated Roadmap Timeline */}
        <div id="roadmap-box" className="mb-20">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-400/30">
              STRATEGIK REJA
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Rivojlanish Yoʻl Xaritasi (Roadmap 2026)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Platformaning bosqichma-bosqich kengayishi va milliy ekotizimga integratsiyalashuvi
            </p>
          </div>

          <div className="roadmap-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {roadmapMilestones.map((m, idx) => (
              <div
                key={m.quarter}
                className="roadmap-item-anim p-6 rounded-3xl bg-[#0B1E3B]/90 border border-slate-700/80 hover:border-cyan-400/50 shadow-xl transition-all flex flex-col justify-between space-y-4 relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-white font-mono">{m.quarter}</span>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${m.statusColor}`}>
                      {m.status}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1.5">
                  {m.items.map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 size={12} className="text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Founding Team */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-400/30">
              LOYIHA ARXITEKTORLARI
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Tajribali Muhandislar va Shifokorlar Jamoasi
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Tibbiyot jarayonlari va yuqori xavfsizlikli IT texnologiyalari birlashgan jamoa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-400/40 transition-all space-y-3 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#008BFF] via-[#00D4FF] to-[#0D34B4] mx-auto flex items-center justify-center text-white font-black text-xl shadow-lg">
                  {member.name.split(' ')[1]?.[0] || 'E'}
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">{member.name}</h4>
                  <span className="text-xs font-semibold text-cyan-300 block">{member.role}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Request Call to Action Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4] text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
              Pre-Seed & Seed Raundi
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Klinikalar Ekotizimiga Hamkor yoki Investor Boʻling
            </h3>
            <p className="text-xs sm:text-sm text-cyan-100">
              Toʻliq Pitch Deck, moliyaviy unit-iqtisodiyot modeli va mahsulot demosi bilan tanishish uchun soʻrov yuboring.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white text-[#008BFF] hover:bg-cyan-50 font-black text-xs sm:text-sm shadow-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Download size={15} />
              <span>Investitsiya Soʻrovi (Pitch Deck)</span>
            </button>
            <a
              href="mailto:invest@elvorahealth.uz"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Mail size={15} />
              <span>Bogʻlanish</span>
            </a>
          </div>
        </div>

      </div>

      {/* Interactive Investor Request Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
            <button
              onClick={() => {
                setModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleInvestorSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300">
                    Investitsiya & Hamkorlik
                  </span>
                  <h3 className="text-xl font-black text-white">
                    Pitch Deck & Moliyaviy Model Soʻrovi
                  </h3>
                  <p className="text-xs text-slate-300">
                    Maʼlumotlaringizni qoldiring, 2 soat ichida toʻliq investitsiya paketi emailingizga yetkaziladi.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Ism va familiyangiz:
                    </label>
                    <input
                      type="text"
                      required
                      value={investorName}
                      onChange={(e) => setInvestorName(e.target.value)}
                      placeholder="Masalan: Sardor Aliyev"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Kompaniya / Jamgʻarma yoki Angel maqomi:
                    </label>
                    <input
                      type="text"
                      required
                      value={investorFund}
                      onChange={(e) => setInvestorFund(e.target.value)}
                      placeholder="Masalan: Silk Road Ventures / Individual Investor"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Elektron pochta (Email):
                    </label>
                    <input
                      type="email"
                      required
                      value={investorEmail}
                      onChange={(e) => setInvestorEmail(e.target.value)}
                      placeholder="investor@fund.uz"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#008BFF] to-[#00D4FF] text-slate-900 font-black text-xs sm:text-sm hover:opacity-95 transition-all shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Pitch Deckni Yuborish</span>
                    <Send size={14} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-black text-white">Soʻrovingiz Qabul Qilindi!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Rahmat, hurmatli {investorName}! Elvora Health investitsiya memorandumi va moliyaviy modeli <strong>{investorEmail}</strong> manziliga joʻnatildi. Asoschilarimiz tez orada siz bilan bogʻlanadi.
                </p>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setIsSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Yopish
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
