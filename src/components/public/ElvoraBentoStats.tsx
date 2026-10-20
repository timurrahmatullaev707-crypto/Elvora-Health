import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  Activity,
  Bed,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export const ElvoraBentoStats: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    c32: 0,
    c7: 0,
    c2592: 0,
    c808: 0,
    c3848: 0,
    c1424: 0,
    c81: 0,
    c448: 0,
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Animate numbers smoothly
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              c32: Math.floor(ease * 32),
              c7: Math.floor(ease * 7),
              c2592: Math.floor(ease * 2592),
              c808: Math.floor(ease * 808),
              c3848: Math.floor(ease * 3848),
              c1424: Math.floor(ease * 1424),
              c81: Math.floor(ease * 81),
              c448: Math.floor(ease * 448),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({
                c32: 32,
                c7: 7,
                c2592: 2592,
                c808: 808,
                c3848: 3848,
                c1424: 1424,
                c81: 81,
                c448: 448,
              });
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-gradient-to-b from-[#EBF7FC] via-[#F4FBFD] to-white border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Background soft ambient cyan glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#B8E8FF]/30 to-[#CFF0FC]/40 blur-3xl pointer-events-none rounded-full" />

      {/* Floating subtle particles */}
      <div className="absolute inset-0 bg-[radial-gradient(#008BFF_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#008BFF] bg-cyan-100/80 px-4 py-1.5 rounded-full border border-cyan-300 shadow-xs">
            DAVLAT VA XUSUSIY TIBBIYOT RAQAMLARDA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Elvora Health Ko‘rsatkichlari
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-normal">
            O‘zbekiston bo‘ylab yagona raqamli tibbiyot bazasiga ulangan muassasalar, shifokorlar va bemorlar soni
          </p>
        </div>

        {/* The 8 Bento Cards (Exact 1-to-1 structure from Screenshot 3 with extraordinary animations) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: 7 mln - Laborator tekshiruvlar */}
          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-cyan-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group sheen-card">
            <div className="flex items-start justify-between">
              {/* 3D Microscope illustration with gentle hover bounce */}
              <div className="w-16 h-16 rounded-2xl bg-cyan-50/80 border border-cyan-200/60 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs">
                🔬
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#008BFF] to-[#00D4FF] tracking-tight">
                  {counts.c7} mln
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h4 className="text-sm font-extrabold text-slate-800">
                Laborator tekshiruvlar
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Avtomatlashtirilgan LIS tizimi orqali</p>
            </div>
          </div>

          {/* Card 2: 32 mln - Center Hero Stat (Large glowing cyan card from Screenshot 3) */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-cyan-50/80 to-blue-50/90 border-2 border-cyan-300 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-center relative overflow-hidden group sheen-card">
            {/* Pulsing ambient halo inside card */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#008BFF]/15 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

            <div className="py-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#008BFF] bg-cyan-100/90 px-3 py-1 rounded-full border border-cyan-300/80 shadow-2xs">
                Yagona Baza
              </span>
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4] my-2 group-hover:scale-105 transition-transform duration-300 tracking-tight">
                {counts.c32} mln
              </div>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug">
                Yagona Raqamli Ma'lumotlar bazasidagi bemorlar
              </h4>
            </div>
            <div className="pt-2 border-t border-cyan-100/80 text-[10px] text-slate-500 font-semibold flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>O‘zbekiston fuqarolarining 90%+ qismi</span>
            </div>
          </div>

          {/* Card 3: 2592 - Poliklinika */}
          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-cyan-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group sheen-card">
            <div className="flex items-start justify-between">
              {/* 3D Clinic icon */}
              <div className="w-16 h-16 rounded-2xl bg-cyan-50/80 border border-cyan-200/60 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-xs">
                🏥
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black text-[#008BFF] tracking-tight">
                  {counts.c2592.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h4 className="text-sm font-extrabold text-slate-800">
                Poliklinika
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Yagona ekotizimga biriktirilgan</p>
            </div>
          </div>

          {/* Card 4: 808 - Dispanserlar, tug'ruqxonalar */}
          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-cyan-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group sheen-card relative overflow-hidden">
            {/* Live radar scan ripple */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-cyan-300/40 animate-ping pointer-events-none" />

            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-black text-[#008BFF] group-hover:scale-105 transition-transform tracking-tight">
                {counts.c808}
              </div>
            </div>
            <div className="mt-5">
              <h4 className="text-sm font-extrabold text-slate-800 leading-snug">
                Dispanserlar, tug‘ruqxonalar va boshqalar
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Ixtisoslashgan shifoxonalar tarmog‘i</p>
            </div>
          </div>

          {/* Card 5: * 3848 - Tibbiyot muassasalarining qabul bo'limlari */}
          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-cyan-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group sheen-card">
            {/* Wavy acoustic ripple lines background */}
            <div className="absolute inset-0 bg-[radial-gradient(#008BFF_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
            <div className="flex items-center gap-2">
              <span className="text-[#008BFF] text-2xl font-black animate-spin [animation-duration:12s]">*</span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:scale-105 transition-transform tracking-tight">
                {counts.c3848.toLocaleString()}
              </div>
            </div>
            <div className="mt-5">
              <h4 className="text-sm font-extrabold text-slate-800">
                Tibbiyot muassasalarining
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Qabul bo‘limlari va dispetcherlik xizmati</p>
            </div>
          </div>

          {/* Card 6: 1424 - Dori vositalari va dorixonalar */}
          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-cyan-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group sheen-card">
            <div className="flex items-start justify-between">
              <div className="text-3xl group-hover:scale-110 group-hover:rotate-12 transition-transform">
                💊
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black text-[#008BFF] tracking-tight">
                  {counts.c1424.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h4 className="text-sm font-extrabold text-slate-800">
                Dori vositalari
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Integratsiyalashgan dorixonalar soni</p>
            </div>
          </div>

          {/* Card 7: 81 mln - Retseptlar va tahlillar */}
          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-cyan-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group sheen-card">
            {/* Matrix grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#008BFF08_1px,transparent_1px),linear-gradient(to_bottom,#008BFF08_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#008BFF] to-[#0D34B4] tracking-tight">
                {counts.c81} mln
              </div>
            </div>
            <div className="mt-5">
              <h4 className="text-sm font-extrabold text-slate-800 leading-snug">
                Yillik elektron retseptlar va tahlillar
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Qog‘ozsiz to‘liq raqamli tizim</p>
            </div>
          </div>

          {/* Card 8: 448 - Statsionar va koyka fondi */}
          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-cyan-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group sheen-card">
            <div className="flex items-start justify-between">
              {/* 3D Hospital Bed illustration */}
              <div className="w-16 h-16 rounded-2xl bg-cyan-50/80 border border-cyan-200/60 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs">
                🛏️
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black text-[#008BFF] tracking-tight">
                  {counts.c448}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h4 className="text-sm font-extrabold text-slate-800">
                Statsionar shifoxonalar
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Koyka fondi avtomatlashtirilgan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
