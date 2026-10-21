import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Sparkles, Menu, X, ArrowRight, Shield } from 'lucide-react';
import { gsap } from '../../lib/useGsapScroll';

export const ElvoraFloatingNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entrance animation
  useEffect(() => {
    if (!navRef.current) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  // Mobile menu open/close animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: -10, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-3 z-50 w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none">
      <div ref={navRef} className="max-w-6xl mx-auto pointer-events-auto">
        <div
          className={`rounded-2xl transition-all duration-300 flex items-center justify-between ${
            scrolled
              ? 'bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl py-2.5 px-5'
              : 'bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md py-3 px-6'
          }`}
        >
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
          <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-700">
            <a
              href="#muammolar"
              className="hover:text-[#008BFF] transition-colors cursor-pointer relative group py-1"
            >
              <span>Muammolar</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008BFF] transition-all duration-200 group-hover:w-full rounded-full" />
            </a>
            <a
              href="#live-demo"
              className="hover:text-[#008BFF] transition-colors cursor-pointer relative group py-1 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#008BFF] animate-pulse" />
              <span>Jonli Demo</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008BFF] transition-all duration-200 group-hover:w-full rounded-full" />
            </a>
            <a
              href="#kalkulyator"
              className="hover:text-[#008BFF] transition-colors cursor-pointer relative group py-1"
            >
              <span>Kalkulyator</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008BFF] transition-all duration-200 group-hover:w-full rounded-full" />
            </a>
            <a
              href="#taqqoslash"
              className="hover:text-[#008BFF] transition-colors cursor-pointer relative group py-1"
            >
              <span>Taqqoslash</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008BFF] transition-all duration-200 group-hover:w-full rounded-full" />
            </a>
            <a
              href="#ekotizim"
              className="hover:text-[#008BFF] transition-colors cursor-pointer relative group py-1"
            >
              <span>Ekotizim</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008BFF] transition-all duration-200 group-hover:w-full rounded-full" />
            </a>
            <a
              href="#doniyor-ai-section"
              className="hover:text-[#008BFF] transition-colors cursor-pointer relative group py-1"
            >
              <span>Doniyor AI</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008BFF] transition-all duration-200 group-hover:w-full rounded-full" />
            </a>
            <a
              href="#investorlar"
              className="hover:text-[#008BFF] transition-colors cursor-pointer relative group py-1"
            >
              <span>Investorlar</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008BFF] transition-all duration-200 group-hover:w-full rounded-full" />
            </a>
            <a
              href="#tariflar"
              className="hover:text-[#008BFF] transition-colors cursor-pointer relative group py-1"
            >
              <span>Tariflar</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008BFF] transition-all duration-200 group-hover:w-full rounded-full" />
            </a>
            <Link
              to="/app/dashboard"
              className="text-[#008BFF] hover:text-[#0D34B4] transition-colors cursor-pointer relative group py-1 font-black flex items-center gap-1"
            >
              <span>Klinika (/app)</span>
              <span className="text-[10px]">→</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008BFF] transition-all duration-200 group-hover:w-full rounded-full" />
            </Link>
          </nav>

          {/* Right Call Center & MIS Kirish Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="tel:+998712025000"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 hover:border-cyan-200 transition-all shadow-2xs hover:shadow-xs active:scale-95"
            >
              <Phone size={13} className="text-[#008BFF]" />
              <span>Call-markaz</span>
            </a>

            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#008BFF] to-[#0D34B4] hover:from-[#007EE6] hover:to-[#0A2D9C] text-white text-xs font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <span>MIS Kirish</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
              aria-label="Menyuni ochish"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden mt-2 p-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl space-y-2 text-sm font-bold text-slate-800"
          >
            <a
              href="#muammolar"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF] transition-colors"
            >
              Muammolar
            </a>
            <a
              href="#live-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF] transition-colors flex items-center justify-between"
            >
              <span>Jonli Demo</span>
              <span className="w-2 h-2 rounded-full bg-[#008BFF] animate-pulse" />
            </a>
            <a
              href="#kalkulyator"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF] transition-colors"
            >
              ROI Kalkulyatori
            </a>
            <a
              href="#taqqoslash"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF] transition-colors"
            >
              Oldin va Keyin
            </a>
            <a
              href="#ekotizim"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF] transition-colors"
            >
              Yaxlit Ekotizim
            </a>
            <a
              href="#doniyor-ai-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF] transition-colors"
            >
              Doniyor AI
            </a>
            <a
              href="#investorlar"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF] transition-colors"
            >
              Investorlar Boʻlimi
            </a>
            <a
              href="#tariflar"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF] transition-colors"
            >
              Shaffof Tariflar
            </a>
            <a
              href="#demo-sorash"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF] transition-colors"
            >
              Demo Soʻrash
            </a>
            <Link
              to="/app/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl bg-cyan-50 text-[#008BFF] font-black hover:bg-cyan-100 transition-colors"
            >
              Klinika Boshqaruvi (/app) →
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default ElvoraFloatingNavbar;
