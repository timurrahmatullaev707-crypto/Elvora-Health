import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Bot,
  Activity,
  Layers,
  Calendar,
  Presentation,
} from 'lucide-react';
import { gsap } from '../../lib/useGsapScroll';

export const ElvoraFloatingNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    );
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      <div ref={navRef} className="max-w-7xl mx-auto pointer-events-auto">
        <div
          className={`rounded-2xl transition-all duration-300 flex items-center justify-between border ${
            scrolled
              ? 'bg-white/95 backdrop-blur-xl border-[#E2E8F0] shadow-xl py-2.5 px-5'
              : 'bg-white/85 backdrop-blur-md border-[#E2E8F0]/80 shadow-md py-3 px-6'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284C7] via-[#0D9488] to-[#0F172A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-lg font-black tracking-tight text-[#0F172A]">
                  ELVORA
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-[#0284C7]">
                  HEALTH
                </span>
              </div>
              <span className="text-[9px] text-[#64748B] font-semibold tracking-wider uppercase mt-1">
                Intelligent Medical OS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-[#475569]">
            <a href="#texnologiya" className="hover:text-[#0284C7] transition-colors">
              Texnologiya
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-elvora-ai'))}
              className="hover:text-[#0284C7] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sparkles size={13} className="text-[#0284C7]" />
              <span>Elvora AI™ Maslahat</span>
            </button>
            <a href="#analitika" className="hover:text-[#0284C7] transition-colors">
              Analitika
            </a>
            <a href="#onlayn-yozilish" className="hover:text-[#0284C7] transition-colors">
              Jonli Qabul
            </a>
            <a href="#roi-kalkulyator" className="hover:text-[#0284C7] transition-colors">
              ROI Hisobi
            </a>
            <a href="#tariflar" className="hover:text-[#0284C7] transition-colors">
              Tariflar
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Pitch Deck presentation button styled with modern Elvora aesthetic */}
            <Link
              to="/pitch"
              className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-sky-200/90 bg-gradient-to-r from-sky-50/80 via-white to-blue-50/60 hover:from-sky-100 hover:to-blue-100 hover:border-sky-400 text-slate-800 text-xs font-bold shadow-xs hover:shadow-md hover:shadow-sky-500/10 transition-all duration-200"
              title="Investorlar uchun 3 daqiqali interaktiv taqdimot"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <Presentation size={13} className="text-[#0284C7] group-hover:scale-110 transition-transform" />
              <span className="text-slate-800 group-hover:text-[#0284C7] transition-colors">Pitch Deck</span>
              <span className="text-[10px] bg-sky-100 text-[#0284C7] px-1.5 py-0.5 rounded-md font-extrabold border border-sky-200/80">
                3 daqiqa
              </span>
            </Link>

            <Link
              to="/app/dashboard"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold shadow-sm hover:shadow transition-all"
            >
              <span>Klinika Boshqaruvi</span>
              <ArrowRight size={13} className="text-teal-300" />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <nav className="flex flex-col gap-3 text-sm font-semibold text-[#475569]">
              <a
                href="#texnologiya"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#0284C7] py-1"
              >
                Texnologiya
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-elvora-ai'));
                }}
                className="hover:text-[#0284C7] py-1 flex items-center gap-1.5 text-left cursor-pointer"
              >
                <Sparkles size={14} className="text-[#0284C7]" />
                <span>Elvora AI™ Maslahatchi</span>
              </button>
              <a
                href="#analitika"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#0284C7] py-1"
              >
                Analitika
              </a>
              <a
                href="#onlayn-yozilish"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#0284C7] py-1"
              >
                Jonli Qabulga Yozilish
              </a>
              <a
                href="#roi-kalkulyator"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#0284C7] py-1"
              >
                ROI Hisobi
              </a>
              <a
                href="#tariflar"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#0284C7] py-1"
              >
                Tariflar
              </a>
              <Link
                to="/pitch"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-sky-50/80 border border-sky-200/70 text-sky-900 font-bold text-xs hover:bg-sky-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Presentation size={15} className="text-[#0284C7]" />
                  <span>Investor Pitch Deck</span>
                </div>
                <span className="text-[10px] bg-white text-[#0284C7] px-2 py-0.5 rounded-full font-extrabold border border-sky-200 shadow-xs">
                  3 daqiqa
                </span>
              </Link>
            </nav>

            <div className="pt-3 border-t border-slate-100">
              <Link
                to="/app/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold text-center block shadow-sm"
              >
                Klinika Boshqaruv Paneliga Kirish
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ElvoraFloatingNavbar;
