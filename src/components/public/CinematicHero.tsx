import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CalendarCheck2,
  Clock,
  Activity,
  Users,
  Stethoscope,
  TrendingUp,
  Bot,
  Zap,
  CheckCircle2,
  PhoneCall,
  Play,
  Presentation,
} from 'lucide-react';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';
import { useApp } from '../../context/AppContext';

export const CinematicHero: React.FC = () => {
  const { doctors, appointments } = useApp();
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'queue' | 'doctors' | 'finance' | 'ai'>('queue');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  useGsapContext(
    heroRef,
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-pill',
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      )
        .fromTo(
          '.hero-heading-line',
          { opacity: 0, y: 35, rotateX: 10 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.12 },
          '-=0.3'
        )
        .fromTo(
          '.hero-description',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.hero-cta-group',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          '.hero-stats-row',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          '.hero-preview-frame',
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          '-=0.4'
        );
    },
    []
  );

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#F1F5F9] select-none"
    >
      {/* Background Cinematic Aura */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1100px] h-[550px] bg-gradient-to-tr from-[#0284C7]/12 via-[#0D9488]/10 to-[#6366F1]/8 blur-[140px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 40}px), calc(-50% + ${mousePos.y * 40}px))`,
        }}
      />

      {/* Modern Medical Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F172A05_1px,transparent_1px),linear-gradient(to_bottom,#0F172A05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="hero-pill inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E2E8F0] shadow-xs text-xs font-semibold text-[#0F172A]">
            <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
            <span className="text-[#0D9488] font-bold">Elvora AI™ 2.0</span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#475569]">O'zbekiston Klinikalarining Yangi Avlod SaaS Yadrosi</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0F172A] leading-[1.08]">
            <span className="hero-heading-line block">Tibbiyot Boshqaruvi.</span>
            <span className="hero-heading-line block bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#0F172A] bg-clip-text text-transparent">
              Yangi Avlod Intellekti.
            </span>
          </h1>

          {/* Description */}
          <p className="hero-description text-lg sm:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed font-normal">
            Bemorlar alomatlarini tahlil qiluvchi aqlli AI triage, 0% no-show kafolati bilan avtomatlashtirilgan qabullar va yagona kassa shaffofligi. Barcha jarayonlar bitta investor darajasidagi platformada.
          </p>

          {/* CTAs */}
          <div className="hero-cta-group flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              to="/app/dashboard"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-semibold shadow-lg shadow-[#0F172A]/15 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Klinika Boshqaruv Panelini Ochish</span>
              <ArrowRight size={16} className="text-teal-300" />
            </Link>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-elvora-ai'))}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0F172A] text-sm font-semibold border border-[#E2E8F0] shadow-xs hover:border-[#CBD5E1] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              <Bot size={16} className="text-[#0284C7]" />
              <span>Elvora AI™ Bilan Suhbatlashish</span>
            </button>

            <Link
              to="/pitch"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-sky-50/80 hover:bg-sky-100/90 text-sky-900 text-sm font-semibold border border-sky-200/90 shadow-xs hover:border-sky-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <Presentation size={16} className="text-[#0284C7]" />
              <span>Pitch Deck</span>
              <span className="text-[10px] bg-white text-[#0284C7] px-2 py-0.5 rounded-full font-extrabold border border-sky-200 shadow-xs">
                3 daqiqa
              </span>
            </Link>
          </div>

          {/* Trust Metrics Bar */}
          <div className="hero-stats-row pt-6 pb-2 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-[#E2E8F0]/80 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#0F172A]">150+</div>
              <div className="text-xs text-[#64748B] font-medium mt-0.5">Faol Klinikalar</div>
            </div>
            <div className="p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-[#E2E8F0]/80 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#0D9488]">98.4%</div>
              <div className="text-xs text-[#64748B] font-medium mt-0.5">No-Show Kamayishi</div>
            </div>
            <div className="p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-[#E2E8F0]/80 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#0284C7]">&lt; 0.4s</div>
              <div className="text-xs text-[#64748B] font-medium mt-0.5">AI Triage Tezligi</div>
            </div>
            <div className="p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-[#E2E8F0]/80 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#0F172A]">100%</div>
              <div className="text-xs text-[#64748B] font-medium mt-0.5">Kassa Shaffofligi</div>
            </div>
          </div>
        </div>

        {/* Interactive Medical Dashboard Preview */}
        <div className="hero-preview-frame mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1]/40 to-[#E2E8F0] shadow-2xl border border-white/60">
            <div className="rounded-xl bg-white overflow-hidden border border-[#E2E8F0] shadow-sm">
              {/* Window Bar */}
              <div className="h-12 px-4 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 text-xs font-semibold text-[#475569] flex items-center gap-1.5">
                    <Activity size={13} className="text-[#0D9488]" />
                    Elvora Clinical Engine • Toshkent Markaziy Filiali
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-[#E2E8F0]/60 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab('queue')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      activeTab === 'queue'
                        ? 'bg-white text-[#0F172A] shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    Jonli Navbat
                  </button>
                  <button
                    onClick={() => setActiveTab('doctors')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      activeTab === 'doctors'
                        ? 'bg-white text-[#0F172A] shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    Shifokorlar
                  </button>
                  <button
                    onClick={() => setActiveTab('finance')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      activeTab === 'finance'
                        ? 'bg-white text-[#0F172A] shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    Kassa & Moliya
                  </button>
                  <button
                    onClick={() => setActiveTab('ai')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${
                      activeTab === 'ai'
                        ? 'bg-white text-[#0284C7] shadow-xs font-bold'
                        : 'text-[#64748B] hover:text-[#0284C7]'
                    }`}
                  >
                    <Sparkles size={11} className="text-[#0284C7]" />
                    AI Triage
                  </button>
                </div>
              </div>

              {/* Tab Contents */}
              <div className="p-5 sm:p-6 bg-white min-h-[300px]">
                {activeTab === 'queue' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[#0F172A]">Bugungi Jonli Navbat va Qabullar</h3>
                        <p className="text-xs text-[#64748B]">Real vaqtda yangilanayotgan bemorlar oqimi</p>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ● 4 ta xonada faol qabul
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/40">
                        <div className="flex items-center justify-between text-xs font-semibold text-blue-900 mb-2">
                          <span>Qabulda (Xonada)</span>
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                        </div>
                        <div className="space-y-2">
                          <div className="p-2.5 rounded-lg bg-white border border-blue-200/60 shadow-2xs">
                            <div className="text-xs font-bold text-[#0F172A]">Rustam Karimov</div>
                            <div className="text-[11px] text-[#64748B]">Dr. Usmonov (Kardiologiya) • 101-xona</div>
                            <div className="mt-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                              Eslatma tasdiqlangan
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/40">
                        <div className="flex items-center justify-between text-xs font-semibold text-amber-900 mb-2">
                          <span>Kutish Zalda (Kutilmoqda)</span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-200 text-amber-900 font-bold">2 bemor</span>
                        </div>
                        <div className="space-y-2">
                          <div className="p-2.5 rounded-lg bg-white border border-amber-200/60 shadow-2xs">
                            <div className="text-xs font-bold text-[#0F172A]">Shahlo Rahimova</div>
                            <div className="text-[11px] text-[#64748B]">Dr. Karimova (Terapiya) • 10:30</div>
                            <div className="mt-1 text-[10px] text-blue-600">Telegram QR chek berilgan</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40">
                        <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-2">
                          <span>Bugun Yakunlangan</span>
                          <span className="text-emerald-700 font-bold text-xs">18 ta bemor</span>
                        </div>
                        <div className="space-y-2">
                          <div className="p-2.5 rounded-lg bg-white border border-emerald-200/60 shadow-2xs">
                            <div className="text-xs font-bold text-[#0F172A]">Bobur Mirzayev</div>
                            <div className="text-[11px] text-[#64748B]">Nevropatolog • To'lov: 180 000 UZS (Karta)</div>
                            <div className="mt-1 text-[10px] text-slate-500">Kassa cheki chop etildi</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'doctors' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[#0F172A]">Klinika Shifokorlari va Ish Vaqti</h3>
                        <p className="text-xs text-[#64748B]">Kabinetlar, mutaxassisliklar va qabul stavkalari</p>
                      </div>
                      <Link to="/app/doctors" className="text-xs text-[#0284C7] font-semibold hover:underline">
                        Barcha shifokorlar jadvali →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {(doctors.slice(0, 3)).map((doc) => (
                        <div key={doc.id} className="p-3.5 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all bg-[#F8FAFC]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0284C7] flex items-center justify-center font-bold text-xs">
                              {doc.fullName.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-[#0F172A] truncate">{doc.fullName}</h4>
                              <p className="text-[11px] text-[#0D9488] font-medium">{doc.specialty}</p>
                            </div>
                          </div>
                          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
                            <span>{doc.roomNumber}</span>
                            <span className="font-bold text-[#0F172A]">{doc.consultationFee.toLocaleString('uz-UZ')} UZS</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'finance' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[#0F172A]">Klinika Moliyaviy Salomatligi</h3>
                        <p className="text-xs text-[#64748B]">Kunlik kassa tushumi, xarajatlar va saqlangan daromad</p>
                      </div>
                      <Link to="/app/finance" className="text-xs text-[#0284C7] font-semibold hover:underline">
                        Batafsil moliya hisoboti →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-200">
                        <div className="text-xs font-medium text-emerald-800">Bugungi Kassa Tushumi</div>
                        <div className="text-xl font-extrabold text-emerald-950 mt-1">14 850 000 UZS</div>
                        <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                          <TrendingUp size={12} /> +18.4% kechagiga nisbatan
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-200">
                        <div className="text-xs font-medium text-blue-800">Elvora AI Saqlab Qolgan</div>
                        <div className="text-xl font-extrabold text-blue-950 mt-1">3 840 000 UZS</div>
                        <div className="text-[11px] text-blue-700 mt-1">Avtomatik eslatmalar hisobiga</div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                        <div className="text-xs font-medium text-[#64748B]">To'lov Usullari Spliti</div>
                        <div className="mt-2 text-xs space-y-1">
                          <div className="flex justify-between text-slate-700">
                            <span>Karta (Humo/Uzcard):</span>
                            <span className="font-bold">68%</span>
                          </div>
                          <div className="flex justify-between text-slate-700">
                            <span>Naqd pul:</span>
                            <span className="font-bold">32%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h3 className="text-sm font-bold text-[#0F172A]">Elvora AI™ Triage Oqimi (Jonli)</h3>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        Klinik xavfsizlik: 100% Faol
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-2">
                      <div className="text-emerald-400">
                        [10:41:02] &gt; Bemor so'rovi kelib tushdi: "Ko'kragimda simillagan og'riq bor, chap yelkamga beryapti"
                      </div>
                      <div className="text-amber-300">
                        [10:41:03] &gt; Xavfsizlik filtri: O'tkir alomatlar tekshirildi (103 Tez yordam tavsiyasi yuborildi)
                      </div>
                      <div className="text-sky-300">
                        [10:41:04] &gt; Mos mutaxassis: Kardiologiya (Dr. Anvar Usmonov, 101-xona, bugun 14:30 bo'sh slot)
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
