import React, { useState, useEffect, useRef } from 'react';
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
  Activity,
  Layers,
  Zap,
} from 'lucide-react';

export const ElvoraHeroSection: React.FC = () => {
  const [showCookie, setShowCookie] = useState(true);

  // Mouse Move Parallax Tilt State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#EBF7FC] via-[#F4FBFD] to-[#F0FAFD]"
    >
      {/* Background radial cyan medical glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] bg-gradient-to-r from-[#B8E8FF]/45 via-[#CFF0FC]/35 to-[#E0F7FD]/45 blur-3xl pointer-events-none rounded-full transition-transform duration-700 ease-out"
        style={{
          transform: `translate(-50%, -50%) translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
        }}
      />

      {/* Subtle digital dot-matrix background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#008BFF_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* Real-time Glowing ECG Laser Wave line running at bottom of Hero */}
      <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden pointer-events-none opacity-40">
        <svg className="w-[200%] h-full stroke-cyan-500 fill-none animate-ecg-run" viewBox="0 0 1200 40">
          <path
            d="M0 20 L200 20 L220 5 L230 35 L240 10 L250 25 L260 20 L500 20 L520 5 L530 35 L540 10 L550 25 L560 20 L800 20 L820 5 L830 35 L840 10 L850 25 L860 20 L1200 20"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Floating Capsule Header (ELVORA HEALTH Brand) */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-md py-3 px-6 flex items-center justify-between">
            {/* ELVORA HEALTH Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#008BFF] via-[#00B4D8] to-[#0D34B4] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                  <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-[#008BFF] leading-none">
                    ELVORA
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    HEALTH
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase mt-0.5">
                  Digital Healthcare Platform
                </span>
              </div>
            </Link>

            {/* Middle Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
              <a href="#mahsulotlar" className="hover:text-[#008BFF] transition-colors">
                Mahsulotlar
              </a>
              <a href="#nima-bu" className="hover:text-[#008BFF] transition-colors">
                Ekotizim
              </a>
              <a href="#portal" className="hover:text-[#008BFF] transition-colors">
                E-Navbat
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
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white text-xs font-bold hover:shadow-md transition-all shadow-xs active:scale-98"
              >
                <span>MIS Kirish</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Main Titles */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100/70 border border-cyan-300 text-xs font-black text-[#008BFF] shadow-xs animate-pulse">
            <Sparkles size={14} className="text-[#008BFF]" />
            <span>O‘zbekiston Yagona Raqamli Tibbiyot Platformasi</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            O‘zbekistonning yagona raqamli <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4]">
              sog‘liqni saqlash operatori
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            415-PQ qarori asosida O‘zbekiston Sog‘liqni saqlash tizimini raqamlashtirish: poliklinikalar, xususiy shifoxonalar, elektron retseptlar, jonli E-navbat va bemorlar tibbiy kartasi — <strong>Elvora Health</strong> yagona ekotizimida.
          </p>

          {/* Black Pill Button */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <a
              href="#nima-bu"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#1E2022] hover:bg-black text-white text-sm font-bold shadow-lg hover:shadow-2xl active:scale-95 transition-all cursor-pointer group"
            >
              <span>Barcha mahsulotlar</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#portal"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 hover:bg-cyan-50 text-slate-800 text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              <span>⚡ E-Navbat olish</span>
            </a>
          </div>
        </div>

        {/* 3D Parallax Floating Cards (Screenshot 1 Bottom Showcase with Mouse Parallax) */}
        <div className="mt-14 sm:mt-20 relative max-w-5xl mx-auto min-h-[380px] sm:min-h-[440px]">
          {/* Card 1: Mobil Ilova (Smartphone preview with sweeping laser scanner beam!) */}
          <div
            className="absolute left-2 sm:left-12 top-6 sm:top-4 z-20 animate-float-slow transition-transform duration-300"
            style={{
              transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px) rotate(-2deg)`,
            }}
          >
            <div className="w-56 sm:w-64 bg-white rounded-3xl border-2 border-cyan-100 shadow-2xl p-3.5 space-y-3 relative overflow-hidden group sheen-card">
              {/* Sweeping Laser Scanner Beam */}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#008BFF] to-transparent shadow-[0_0_12px_#008BFF] animate-scan-beam pointer-events-none z-30" />

              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Elvora App
                </span>
                <span className="text-[9px] font-bold bg-cyan-50 text-[#008BFF] px-2 py-0.5 rounded-full">
                  Mobil Ilova
                </span>
              </div>

              {/* Smartphone Inner Card */}
              <div className="bg-gradient-to-br from-[#008BFF] to-[#0D34B4] rounded-2xl p-3 text-white space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center font-bold text-[10px]">
                      *
                    </div>
                    <span className="text-xs font-black tracking-tight">Elvora Health</span>
                  </div>
                  <QrCode size={18} className="text-cyan-200" />
                </div>

                <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-md space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-cyan-200 block">
                    BEMOR KARTASI
                  </span>
                  <div className="text-xs font-bold">Jasur Bekmurodov</div>
                  <div className="text-[10px] text-cyan-100 font-mono">ID: ELV-2026-9942</div>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] text-slate-600 flex justify-between items-center">
                <span>Jonli navbat:</span>
                <span className="font-extrabold text-[#008BFF]">#07 (Kardiolog)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Floating 3D Glowing Elvora Health Central Pin with Expanding Ripples */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 z-30 transition-transform duration-500"
            style={{
              transform: `translate(-50%, 0) translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
            }}
          >
            <div className="relative flex items-center justify-center">
              {/* Expanding Ripple Waves */}
              <div className="absolute w-24 h-24 rounded-full border-2 border-cyan-400 animate-ripple-wave pointer-events-none" />
              <div className="absolute w-28 h-28 rounded-full border-2 border-blue-400 animate-ripple-wave [animation-delay:0.8s] pointer-events-none" />

              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#008BFF] via-[#5FFFEC] to-[#0D34B4] p-1.5 shadow-2xl flex items-center justify-center animate-pulse-glow">
                <div className="w-full h-full bg-white rounded-[22px] flex flex-col items-center justify-center shadow-inner group cursor-pointer">
                  {/* Blue Starburst */}
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#008BFF] group-hover:rotate-45 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
                  </svg>
                  <span className="text-[8px] font-black text-[#008BFF] tracking-tighter">ELVORA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Medkarta Card (Exact from Screenshot 1 with Mouse Parallax) */}
          <div
            className="absolute right-2 sm:right-28 top-8 sm:top-6 z-20 animate-float-delayed transition-transform duration-300"
            style={{
              transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px) rotate(2deg)`,
            }}
          >
            <div className="w-60 sm:w-72 bg-white rounded-3xl border-2 border-cyan-100 shadow-2xl p-4 space-y-3 sheen-card">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Activity size={13} className="text-[#008BFF]" /> Medkarta
                </span>
                <span className="text-[10px] font-bold text-[#008BFF] bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                  R12F3
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-100 to-blue-200 border-2 border-white shadow-xs overflow-hidden flex items-center justify-center text-slate-700 font-bold text-xs">
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
          <div
            className="absolute right-4 sm:right-6 bottom-0 z-10 animate-float-subtle transition-transform duration-300"
            style={{
              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
            }}
          >
            <div className="w-56 sm:w-64 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl p-3.5 space-y-2.5 sheen-card">
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
                <span>Reimbursatsiya dasturida ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Cookie Banner */}
        {showCookie && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-3xl w-[92%] bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
            <p className="text-xs text-slate-700 leading-snug">
              Biz <span className="text-[#008BFF] font-semibold underline">cookie fayllaridan</span> foydalanamiz, sayt to'g'ri ishlashi va siz uchun qulayroq bo'lishi uchun
            </p>
            <button
              onClick={() => setShowCookie(false)}
              className="px-5 py-2 rounded-xl bg-[#1E2022] hover:bg-black text-white text-xs font-bold shrink-0 transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              Tushunarli
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
