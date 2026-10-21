import React, { useState, useEffect, useRef } from 'react';
import {
  Calculator,
  TrendingUp,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronDown,
  Info,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Users,
  DollarSign,
  Percent,
} from 'lucide-react';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

export const ElvoraRoiCalculator: React.FC = () => {
  // Sliders
  const [doctorCount, setDoctorCount] = useState<number>(8);
  const [dailyVisits, setDailyVisits] = useState<number>(14);
  const [averageCheck, setAverageCheck] = useState<number>(150000);
  const [noShowPercent, setNoShowPercent] = useState<number>(24);
  const [isFormulaOpen, setIsFormulaOpen] = useState<boolean>(false);
  const [chartKey, setChartKey] = useState<number>(0);

  // Animated display values
  const [displaySavedMonthly, setDisplaySavedMonthly] = useState<number>(0);
  const [displayLeakMonthly, setDisplayLeakMonthly] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Mathematical logic
  const workingDays = 24;
  const totalMonthlyVisits = doctorCount * dailyVisits * workingDays;
  const currentLostMonthly = Math.round(totalMonthlyVisits * (noShowPercent / 100) * averageCheck);
  // Elvora reduces no-show by 65% via 2-stage automated reminders & live standby slot backfill
  const elvoraRecoveryRate = 0.65;
  const targetSavedMonthly = Math.round(currentLostMonthly * elvoraRecoveryRate);
  const annualSaved = targetSavedMonthly * 12;
  const hoursSavedMonthly = Math.round(doctorCount * 36);

  // Trigger self-drawing animation on slider changes
  useEffect(() => {
    setChartKey((k) => k + 1);
  }, [doctorCount, dailyVisits, averageCheck, noShowPercent]);

  // Smooth count-up animation when inputs change
  useEffect(() => {
    const startSaved = displaySavedMonthly;
    const startLeak = displayLeakMonthly;
    const endSaved = targetSavedMonthly;
    const endLeak = currentLostMonthly;
    const duration = 450;
    const startTime = performance.now();

    const animateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setDisplaySavedMonthly(Math.round(startSaved + (endSaved - startSaved) * ease));
      setDisplayLeakMonthly(Math.round(startLeak + (endLeak - startLeak) * ease));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateNumber);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateNumber);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [targetSavedMonthly, currentLostMonthly]);

  useGsapContext(
    sectionRef,
    () => {
      gsap.fromTo(
        '.roi-header',
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
        '.roi-calculator-box',
        { y: 30, opacity: 0.3 },
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
    },
    []
  );

  // 6-Month dynamic progression factors
  const projectionMonths = [
    { label: '1-oy', factor: 0.7 },
    { label: '2-oy', factor: 0.85 },
    { label: '3-oy', factor: 1.0 },
    { label: '4-oy', factor: 1.05 },
    { label: '5-oy', factor: 1.1 },
    { label: '6-oy', factor: 1.15 },
  ];

  // Coordinates for the self-drawing SVG curve (width 320, height 110)
  const chartWidth = 320;
  const chartHeight = 110;
  const points = projectionMonths.map((m, idx) => {
    const x = 20 + idx * 56;
    // Normalize y between 90 (low) and 20 (high)
    const normalized = (m.factor - 0.65) / 0.55;
    const y = Math.round(95 - normalized * 75);
    return { x, y, value: Math.round(targetSavedMonthly * m.factor), label: m.label };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = points[idx - 1];
    const cpX = (prev.x + curr.x) / 2;
    return `${acc} C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <section id="kalkulyator" ref={sectionRef} className="py-20 lg:py-28 bg-[#F8FBFE] border-b border-slate-200/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#008BFF]/10 via-[#00D4FF]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="roi-header text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#008BFF] bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-200 inline-flex items-center gap-1.5 shadow-xs">
            <Calculator size={13} className="text-[#008BFF]" />
            4. SHAFFOF ROI KALKULYATORI
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Klinikangiz Har Oy Qancha Pulni <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4]">
              Saqlab Qolishi Mumkin?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Shifokorlar soni, kunlik qabullar va oʻrtacha chekni belgilang. Elvora Health yordamida oqib ketayotgan tushumni aniq raqamlarda koʻring.
          </p>
        </div>

        {/* Main Interactive Grid */}
        <div className="roi-calculator-box bg-white rounded-3xl border-2 border-slate-200/90 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Column: Sliders (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-7 border-b lg:border-b-0 lg:border-r border-slate-200/80">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-[#008BFF]">
                    <Stethoscope size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Klinika parametrlarini kiriting</h3>
                    <p className="text-xs text-slate-500">Haqiqiy holatingizga mos slayderlarni suring</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#008BFF] bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200">
                  Jonli hisob
                </span>
              </div>

              {/* Slider 1: Shifokorlar soni */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <label htmlFor="slider-doctors" className="text-slate-700 flex items-center gap-1.5">
                    <Users size={14} className="text-[#008BFF]" />
                    <span>Shifokorlar soni (faol shtat):</span>
                  </label>
                  <span className="text-sm font-black text-[#008BFF] bg-cyan-50 px-3 py-1 rounded-lg border border-cyan-200">
                    {doctorCount} nafar shifokor
                  </span>
                </div>
                <input
                  id="slider-doctors"
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={doctorCount}
                  onChange={(e) => setDoctorCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#008BFF]"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>1 shifokor</span>
                  <span>20 shifokor</span>
                  <span>40 shifokor</span>
                </div>
              </div>

              {/* Slider 2: Kuniga qabullar */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <label htmlFor="slider-visits" className="text-slate-700 flex items-center gap-1.5">
                    <Clock size={14} className="text-[#008BFF]" />
                    <span>Har bir shifokorga kunlik qabullar:</span>
                  </label>
                  <span className="text-sm font-black text-[#008BFF] bg-cyan-50 px-3 py-1 rounded-lg border border-cyan-200">
                    {dailyVisits} ta qabul / kun
                  </span>
                </div>
                <input
                  id="slider-visits"
                  type="range"
                  min="4"
                  max="35"
                  step="1"
                  value={dailyVisits}
                  onChange={(e) => setDailyVisits(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#008BFF]"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>4 qabul</span>
                  <span>20 qabul</span>
                  <span>35 qabul</span>
                </div>
              </div>

              {/* Slider 3: O'rtacha chek (UZS) */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <label htmlFor="slider-check" className="text-slate-700 flex items-center gap-1.5">
                    <DollarSign size={14} className="text-[#008BFF]" />
                    <span>Oʻrtacha chek / konsultatsiya narxi:</span>
                  </label>
                  <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-300">
                    {averageCheck.toLocaleString('uz-UZ')} UZS
                  </span>
                </div>
                <input
                  id="slider-check"
                  type="range"
                  min="50000"
                  max="500000"
                  step="10000"
                  value={averageCheck}
                  onChange={(e) => setAverageCheck(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#008BFF]"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>50 000 UZS</span>
                  <span>250 000 UZS</span>
                  <span>500 000 UZS</span>
                </div>
              </div>

              {/* Slider 4: No-show % */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <label htmlFor="slider-noshow" className="text-slate-700 flex items-center gap-1.5">
                    <Percent size={14} className="text-[#EF4444]" />
                    <span>Hozirgi No-show (kelmaslik) ulushi:</span>
                  </label>
                  <span className="text-sm font-black text-[#EF4444] bg-red-50 px-3 py-1 rounded-lg border border-red-200">
                    {noShowPercent}% bemor
                  </span>
                </div>
                <input
                  id="slider-noshow"
                  type="range"
                  min="10"
                  max="45"
                  step="1"
                  value={noShowPercent}
                  onChange={(e) => setNoShowPercent(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#EF4444]"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>10% (Kam)</span>
                  <span>25% (Oʻrtacha Oʻzbekiston)</span>
                  <span>45% (Yuqori)</span>
                </div>
              </div>

              {/* Quick Summary Pill */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#008BFF]" />
                  Oyiga jami rejalashtirilgan qabullar:
                </span>
                <span className="font-extrabold text-slate-900">
                  {totalMonthlyVisits.toLocaleString('uz-UZ')} ta qabul / oy
                </span>
              </div>
            </div>

            {/* Right Column: Dynamic Results & Visual Chart (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-white via-cyan-50/40 to-[#EBF7FC]/60 flex flex-col justify-between space-y-6">
              
              {/* Top Result: Oyiga tejaladigan summa with animated count-up */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-[#008BFF] bg-cyan-100/80 border border-cyan-300">
                  <Sparkles size={12} />
                  Klinika sof tejamkorligi
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-600 block">
                    Oyiga tejaladigan va saqlab qolinadigan tushum:
                  </span>
                  <div className="text-3xl sm:text-4xl lg:text-4xl font-black text-[#008BFF] tracking-tight mt-1 flex items-baseline gap-1.5">
                    <span>+{displaySavedMonthly.toLocaleString('uz-UZ')}</span>
                    <span className="text-sm font-bold text-slate-700">UZS / oy</span>
                  </div>
                  <span className="text-xs text-emerald-600 font-bold block mt-1">
                    ≈ +{Math.round(annualSaved / 1000000).toLocaleString('uz-UZ')} mln UZS yillik qoʻshimcha daromad
                  </span>
                </div>

                {/* Leak vs Saved comparison cards */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-red-50/80 border border-red-200">
                    <span className="text-[11px] font-bold text-red-700 block flex items-center gap-1">
                      <AlertTriangle size={12} /> Hozirgi yoʻqotish:
                    </span>
                    <div className="text-base sm:text-lg font-black text-red-600 mt-1">
                      -{displayLeakMonthly.toLocaleString('uz-UZ')} UZS
                    </div>
                    <span className="text-[10px] text-red-600/80 block mt-0.5">
                      No-show tufayli oqib ketmoqda
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-cyan-50/90 border border-cyan-200">
                    <span className="text-[11px] font-bold text-[#008BFF] block flex items-center gap-1">
                      <Clock size={12} /> Tejalgan vaqt:
                    </span>
                    <div className="text-base sm:text-lg font-black text-slate-900 mt-1">
                      ~{hoursSavedMonthly} soat / oy
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Registratura va shifokorlar
                    </span>
                  </div>
                </div>
              </div>

              {/* Self-drawing SVG Chart: Real-time curve that draws itself */}
              <div className="p-4 rounded-2xl bg-white border border-cyan-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1">
                    <TrendingUp size={13} className="text-[#008BFF]" />
                    6 oylik jamgʻarish dinamikasi (Jonli grafik)
                  </span>
                  <span className="text-[11px] font-extrabold text-[#008BFF] bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200">
                    +65% samaradorlik
                  </span>
                </div>

                {/* Self-Drawing SVG Curve Canvas */}
                <div className="relative w-full h-[120px] bg-gradient-to-b from-slate-50/70 to-white rounded-xl border border-slate-100 overflow-hidden flex items-center justify-center">
                  <svg
                    key={chartKey}
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="roiCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#008BFF" />
                        <stop offset="50%" stopColor="#00D4FF" />
                        <stop offset="100%" stopColor="#0D34B4" />
                      </linearGradient>
                      <linearGradient id="roiAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#008BFF" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Area fill under curve */}
                    <path
                      d={areaD}
                      fill="url(#roiAreaGrad)"
                      className="animate-fade-in transition-all duration-700"
                    />

                    {/* Self-drawing line with animated stroke-dashoffset */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="url(#roiCurveGrad)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        strokeDasharray: 600,
                        strokeDashoffset: 600,
                        animation: 'drawSvgPath 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                      }}
                    />

                    {/* Data Points */}
                    {points.map((p, idx) => (
                      <g key={p.label}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="4"
                          fill="#FFFFFF"
                          stroke="#008BFF"
                          strokeWidth="2.5"
                          className="transition-transform duration-300 hover:scale-150"
                        />
                      </g>
                    ))}
                  </svg>

                  {/* Inline Keyframe for Self-Drawing Chart */}
                  <style>{`
                    @keyframes drawSvgPath {
                      0% { stroke-dashoffset: 600; opacity: 0.3; }
                      100% { stroke-dashoffset: 0; opacity: 1; }
                    }
                  `}</style>
                </div>

                {/* Month labels under SVG chart */}
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold px-1">
                  {projectionMonths.map((m) => (
                    <span key={m.label}>{m.label}</span>
                  ))}
                </div>

                {/* Comparative side-by-side animated bars */}
                <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                      <span>Eski tizimda yoʻqotilayotgan tushum ulushi:</span>
                      <span className="text-red-500 font-bold">{noShowPercent}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(noShowPercent * 2.2, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                      <span>Elvora bilan saqlab qolingan daromad:</span>
                      <span className="text-[#008BFF] font-bold">+{(noShowPercent * elvoraRecoveryRate).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((noShowPercent * elvoraRecoveryRate) * 3.2, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Call to action within calculator */}
              <div className="pt-2">
                <a
                  href="#demo-sorash"
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#008BFF] to-[#0D34B4] hover:from-[#007EE6] hover:to-[#0A2D9C] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all cursor-pointer active:scale-95"
                >
                  <span>Ushbu Tejamkorlikni Klinikada Sinash</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Accordion: "Hisob qanday qilindi?" (Collapsible) */}
          <div className="border-t border-slate-200/90 bg-slate-50/70">
            <button
              onClick={() => setIsFormulaOpen(!isFormulaOpen)}
              className="w-full p-4 sm:px-8 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-100/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 text-left">
                <Info size={16} className="text-[#008BFF] shrink-0" />
                <span>Hisob qanday qilindi? (Formula va shaffof taxminlar)</span>
              </div>
              <ChevronDown
                size={16}
                className={`text-[#008BFF] transition-transform duration-200 shrink-0 ${
                  isFormulaOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isFormulaOpen && (
              <div className="p-6 sm:px-8 sm:pb-8 pt-2 text-xs text-slate-600 space-y-4 border-t border-slate-200/60 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 font-mono text-[11px] sm:text-xs text-slate-900 leading-relaxed overflow-x-auto">
                  <div className="text-slate-500 font-sans font-bold mb-1">📐 Matematik hisob-kitob formulasi:</div>
                  <div className="text-[#008BFF] font-bold">
                    Oylik tejamkorlik = (Shifokorlar × Kunlik qabullar × 24 kun) × (No-show% × 65%) × Oʻrtacha chek
                  </div>
                  <div className="text-slate-500 mt-2 text-[10px]">
                    Sizning raqamlaringizda: ({doctorCount} × {dailyVisits} × 24) × ({noShowPercent}% × 0.65) × {averageCheck.toLocaleString('uz-UZ')} UZS ={' '}
                    <strong className="text-slate-900">+{targetSavedMonthly.toLocaleString('uz-UZ')} UZS / oy</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-500" />
                      1. Shaffof ish kuni va qabul normasi:
                    </span>
                    <p className="text-slate-500">
                      Oyiga 24 ta rasmiy ish kuni hisobga olingan. Har bir shifokor uchun belgilangan kunlik qabullar oʻrtacha amaliyotga asoslangan.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-[#008BFF]" />
                      2. 65% No-show qisqarishi koeffitsiyenti:
                    </span>
                    <p className="text-slate-500">
                      Bemorga Telegram va SMS orqali 24 soat va 2 soat oldin yuboriladigan avtomatik tasdiqlash xabarlari hamda boʻsh slotlarni kutish roʻyxatiga berish orqali erishiladi.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-amber-500" />
                      3. Vaqt tejamkorligi (~36 soat / shifokor):
                    </span>
                    <p className="text-slate-500">
                      Registratura xodimining telefon orqali tasdiqlashlari va qogʻoz jurnalini toʻldirishiga ketadigan kunlik ~1.5 soat vaqt toʻliq avtomatlashtiriladi.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-cyan-600" />
                      4. Haqiqiy va xolis modellashtirish:
                    </span>
                    <p className="text-slate-500">
                      Ushbu kalkulyator boʻrttirilgan yoki sunʼiy koʻrsatkichlarni qoʻllamaydi. Barcha hisoblar Oʻzbekiston xususiy tibbiyot markazlari oʻrtacha statistik koʻrsatkichlariga tayanadi.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElvoraRoiCalculator;
