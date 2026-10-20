import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  QrCode,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  User,
  Calendar,
  Clock,
  Heart,
  FileText,
  X,
} from 'lucide-react';

export const DmedHeroSection: React.FC = () => {
  const [showCookie, setShowCookie] = useState(true);

  return (
    <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#EBF7FC] via-[#F4FBFD] to-[#F0FAFD]">
      {/* Background radial cyan medical glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px] bg-gradient-to-r from-[#B8E8FF]/40 via-[#CFF0FC]/30 to-[#E0F7FD]/40 blur-3xl pointer-events-none rounded-full" />

      {/* Subtle Uzbekistan map silhouette / topographic overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#008BFF_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Floating Capsule Header (1-to-1 with Screenshot 1) */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-md py-3 px-6 flex items-center justify-between">
            {/* DMED Logo (Blue Cross / Starburst) */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#008BFF] to-[#0D34B4] flex items-center justify-center text-white shadow-xs">
                {/* DMED 8-point starburst cross */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-[#008BFF]">
                DMED
              </span>
            </Link>

            {/* Middle Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
              <a href="#mahsulotlar" className="hover:text-[#008BFF] transition-colors">
                Mahsulotlar
              </a>
              <a href="#kontaktlar" className="hover:text-[#008BFF] transition-colors">
                Kontaktlar
              </a>
              <Link to="/app/dashboard" className="hover:text-[#008BFF] transition-colors">
                Klinika Boshqaruvi
              </Link>
            </div>

            {/* Right Call Center Pill */}
            <div className="flex items-center gap-2">
              <a
                href="tel:+998712025000"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Phone size={14} className="text-[#008BFF]" />
                <span>Call-markaz</span>
              </a>

              <Link
                to="/app/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#008BFF] text-white text-xs font-bold hover:bg-[#0077DB] transition-all shadow-xs"
              >
                <span>MIS Kirish</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Main Titles (Exact copy from Screenshot 1) */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            O‘zbekistonning yagona raqamli <br className="hidden sm:inline" />
            sog‘liqni saqlash operatori
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            415-PQ asosida biz O‘zbekiston Sog‘liqni saqlash vazirligining tibbiy axborot tizimlarini joriy etmoqdamiz va rivojlantirmoqdamiz, bu esa klinikalar, retseptlar va xizmatlarni raqamlashtirish, shuningdek, xususiy va davlat muassasalarini yagona ekotizimga birlashtirishni ta'minlaydi.
          </p>

          {/* Black Pill Button */}
          <div className="pt-2">
            <a
              href="#nima-bu"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#1E2022] hover:bg-black text-white text-sm font-bold shadow-lg hover:shadow-xl active:scale-98 transition-all cursor-pointer"
            >
              <span>Barcha mahsulotlar</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* Floating Cards Display (Screenshot 1 Bottom Showcase) */}
        <div className="mt-14 sm:mt-20 relative max-w-5xl mx-auto min-h-[340px] sm:min-h-[400px]">
          {/* Card 1: Mobil Ilova (Smartphone preview) */}
          <div className="absolute left-2 sm:left-12 top-6 sm:top-4 z-20 animate-float-slow">
            <div className="w-56 sm:w-64 bg-white rounded-3xl border-2 border-cyan-100 shadow-2xl p-3.5 space-y-3 transform -rotate-2 hover:rotate-0 transition-transform">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Mobil Ilova
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>

              {/* Smartphone UI */}
              <div className="bg-gradient-to-br from-[#008BFF] to-[#0D34B4] rounded-2xl p-3 text-white space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center font-bold text-[10px]">
                    *
                  </div>
                  <span className="text-xs font-black tracking-tight">DMED App</span>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-md space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-cyan-200 block">
                    BEMOR KARTASI
                  </span>
                  <div className="text-xs font-bold">Jasur Bekmurodov</div>
                  <div className="text-[10px] text-cyan-100 font-mono">ID: DM-2026-9942</div>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] text-slate-600 flex justify-between items-center">
                <span>Elektron navbat:</span>
                <span className="font-extrabold text-[#008BFF]">#07 (Kardiolog)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Floating 3D Glowing DMED Pin */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 z-30 animate-pulse-glow">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-[#008BFF] via-[#5FFFEC] to-[#0D34B4] p-1 shadow-2xl flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center shadow-inner">
                {/* Blue/Cyan Starburst */}
                <svg className="w-9 h-9 sm:w-11 sm:h-11 text-[#008BFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3: Medkarta Card (Exact from Screenshot 1) */}
          <div className="absolute right-2 sm:right-28 top-8 sm:top-6 z-20 animate-float-delayed">
            <div className="w-60 sm:w-72 bg-white rounded-3xl border-2 border-cyan-100 shadow-2xl p-4 space-y-3 transform rotate-2 hover:rotate-0 transition-transform">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-extrabold text-slate-800">
                  Medkarta
                </span>
                <span className="text-[10px] font-bold text-[#008BFF] bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                  R12F3
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-200 border-2 border-white shadow-xs overflow-hidden flex items-center justify-center text-slate-500 font-bold text-xs bg-gradient-to-br from-cyan-100 to-blue-200">
                  SF
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">
                    Siddiqova Feruza
                  </h4>
                  <p className="text-[11px] text-slate-500">Tug'ilgan sana: 15.09.2000</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] text-slate-600">
                <div>
                  <span className="text-slate-400 block">Hudud:</span>
                  <span className="font-semibold text-slate-800">Toshkent sh.</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tibbiy muassasa:</span>
                  <span className="font-semibold text-[#008BFF]">17-Poliklinika</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Retseptlar Card (Exact from Screenshot 1) */}
          <div className="absolute right-4 sm:right-6 bottom-0 z-10 animate-float-subtle">
            <div className="w-56 sm:w-64 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText size={13} className="text-[#008BFF]" /> Retseptlar
                </span>
                <span className="text-[9px] font-mono text-slate-400">#RA4536783</span>
              </div>

              <div className="text-[11px] text-slate-700 space-y-1">
                <div className="font-semibold text-slate-900">1. Kardiomagnil 75mg</div>
                <div className="text-slate-500">Shifokor: Dr. A. Usmonov</div>
              </div>

              <div className="p-1.5 rounded-lg bg-emerald-50 text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                <Check size={12} className="text-emerald-600" />
                <span>Reimbursatsiya dasturida</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Cookie Banner (Exact from Screenshot 1 & 4) */}
        {showCookie && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-3xl w-[92%] bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
            <p className="text-xs text-slate-700 leading-snug">
              Biz <span className="text-[#008BFF] font-semibold underline">cookie fayllaridan</span> foydalanamiz, sayt to'g'ri ishlashi va siz uchun qulayroq bo'lishi uchun
            </p>
            <button
              onClick={() => setShowCookie(false)}
              className="px-5 py-2 rounded-xl bg-[#1E2022] hover:bg-black text-white text-xs font-bold shrink-0 transition-colors cursor-pointer shadow-xs"
            >
              Tushunarli
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
