import React, { useState, useEffect } from 'react';
import {
  Building2,
  Activity,
  Bed,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

export const DmedBentoStats: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#EBF7FC] via-[#F4FBFD] to-white border-b border-slate-200/80 relative overflow-hidden">
      {/* Background soft ambient cyan glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#B8E8FF]/30 to-[#CFF0FC]/40 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#008BFF] bg-cyan-50 px-3.5 py-1 rounded-full border border-cyan-200">
            DAVLAT MIQYOSIDAGI RAQAMLAR
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ekotizimning Real Ko‘rsatkichlari
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            O‘zbekiston bo‘ylab yagona raqamli tibbiyot bazasiga ulangan muassasalar va bemorlar soni
          </p>
        </div>

        {/* The 8 Bento Cards (Exact 1-to-1 structure from Screenshot 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: 7 mln - Laborator tekshiruvlar */}
          <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-cyan-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="flex items-start justify-between">
              {/* 3D Microscope illustration */}
              <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                🔬
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#008BFF] to-[#00D4FF]">
                  7 mln
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-extrabold text-slate-800">
                Laborator tekshiruvlar
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Avtomatlashtirilgan LIS tizimi orqali</p>
            </div>
          </div>

          {/* Card 2: 32 mln - Center Hero Stat (Large card) */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-cyan-50/70 to-blue-50/80 border-2 border-cyan-200 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#008BFF]/10 rounded-full blur-xl pointer-events-none" />
            <div className="py-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#008BFF] bg-cyan-100/80 px-3 py-0.5 rounded-full">
                Yagona Baza
              </span>
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4] my-2 group-hover:scale-105 transition-transform">
                32 mln
              </div>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug">
                Yagona Raqamli Ma'lumotlar bazasidagi bemorlar
              </h4>
            </div>
            <div className="pt-2 border-t border-cyan-100 text-[10px] text-slate-500 font-semibold">
              O‘zbekiston fuqarolarining 90%+ qismi
            </div>
          </div>

          {/* Card 3: 2592 - Poliklinika */}
          <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-cyan-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="flex items-start justify-between">
              {/* 3D Clinic icon */}
              <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                🏥
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black text-[#008BFF]">
                  2592
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-extrabold text-slate-800">
                Poliklinika
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Yagona ekotizimga biriktirilgan</p>
            </div>
          </div>

          {/* Card 4: 808 - Dispanserlar, tug'ruqxonalar */}
          <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-cyan-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-black text-[#008BFF] group-hover:scale-105 transition-transform">
                808
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-extrabold text-slate-800 leading-snug">
                Dispanserlar, tug‘ruqxonalar va hokazo
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Ixtisoslashgan shifoxonalar</p>
            </div>
          </div>

          {/* Card 5: * 3848 - Tibbiyot muassasalarining */}
          <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-cyan-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden group">
            {/* Wavy cyan lines background */}
            <div className="absolute inset-0 bg-[radial-gradient(#008BFF_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
            <div className="flex items-center gap-2">
              <span className="text-[#008BFF] text-2xl font-black">*</span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:scale-105 transition-transform">
                3848
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-extrabold text-slate-800">
                Tibbiyot muassasalarining
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Umumiy soni raqamlashtirilgan</p>
            </div>
          </div>

          {/* Card 6: 1424 - Dorixona */}
          <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-cyan-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-black text-[#008BFF] group-hover:scale-105 transition-transform">
                1424
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-extrabold text-slate-800">
                Dorixona
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Elektron retsept bilan integratsiya</p>
            </div>
          </div>

          {/* Card 7: 81 mln - Tibbiy qaydlar */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-50 via-white to-blue-50 border-2 border-cyan-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden group">
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#008BFF_1px,transparent_1px),linear-gradient(to_bottom,#008BFF_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-10 pointer-events-none" />
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-black text-[#008BFF] group-hover:scale-105 transition-transform">
                81 mln
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-extrabold text-slate-800">
                Tibbiy qaydlar
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Tashriflar, muolajalar va epikrizlar</p>
            </div>
          </div>

          {/* Card 8: 448 - Statsionarlar / Shifoxonalar */}
          <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-cyan-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="flex items-start justify-between">
              {/* 3D Hospital bed icon */}
              <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                🛏️
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black text-slate-900">
                  448
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-extrabold text-slate-800">
                Statsionar Shifoxona
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Yotoq o‘rinlari monitoringi bilan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
