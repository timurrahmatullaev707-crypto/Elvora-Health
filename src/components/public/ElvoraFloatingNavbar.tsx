import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Sparkles, Menu, X, ArrowRight, Shield } from 'lucide-react';

export const ElvoraFloatingNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-3 z-50 w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
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
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-slate-700">
            <a
              href="#mahsulotlar"
              className="hover:text-[#008BFF] transition-colors cursor-pointer"
            >
              Mahsulotlar
            </a>
            <a
              href="#masalalar"
              className="hover:text-[#008BFF] transition-colors cursor-pointer"
            >
              Yechimlar
            </a>
            <a
              href="#nima-bu"
              className="hover:text-[#008BFF] transition-colors cursor-pointer"
            >
              Ekotizim
            </a>
            <a
              href="#portal"
              className="hover:text-[#008BFF] transition-colors cursor-pointer"
            >
              E-Navbat
            </a>
            <Link
              to="/app/dashboard"
              className="hover:text-[#008BFF] transition-colors cursor-pointer"
            >
              Klinika Boshqaruvi
            </Link>
          </nav>

          {/* Right Call Center & MIS Kirish Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="tel:+998712025000"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Phone size={13} className="text-[#008BFF]" />
              <span className="hidden sm:inline">Call-markaz</span>
            </a>

            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white text-xs font-bold hover:shadow-lg transition-all shadow-xs active:scale-95"
            >
              <span>MIS Kirish</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl space-y-3 animate-fade-in text-sm font-bold text-slate-800">
            <a
              href="#mahsulotlar"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF]"
            >
              Mahsulotlar
            </a>
            <a
              href="#masalalar"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF]"
            >
              Yechimlar (Masalalar)
            </a>
            <a
              href="#nima-bu"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF]"
            >
              Ekotizim
            </a>
            <a
              href="#portal"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF]"
            >
              E-Navbat
            </a>
            <Link
              to="/app/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-xl hover:bg-cyan-50 hover:text-[#008BFF]"
            >
              Klinika Boshqaruvi
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
