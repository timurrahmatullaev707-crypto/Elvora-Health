import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Shield,
  Activity,
  Layers,
  HelpCircle,
  LogIn,
  Phone,
  Calendar,
  Globe,
  ChevronDown,
} from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Bar (Just like DMED.uz) */}
      <div className="bg-[#0D34B4] text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Yagona Raqamli Tibbiyot Axborot Ekotizimi
            </span>
            <a
              href="#portal"
              className="hover:text-emerald-200 transition-colors flex items-center gap-1"
            >
              <Calendar size={12} />
              <span>Shifokor ko'rigiga onlayn yozilish</span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="tel:+998712025000"
              className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors font-medium"
            >
              <Phone size={12} />
              <span>Koll-markaz: +998 (71) 202-50-00</span>
            </a>
            <div className="flex items-center gap-1 text-emerald-200 cursor-pointer">
              <Globe size={12} />
              <span className="font-bold">O'zbekcha</span>
            </div>
            <Link
              to="/login"
              className="flex items-center gap-1 font-bold text-white hover:text-emerald-200 transition-colors"
            >
              <LogIn size={12} />
              <span>MIS Tizimiga kirish</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Floating Glassmorphic Navbar (Signature DMED Floating Capsule) */}
      <div className={`transition-all duration-300 px-4 sm:px-6 lg:px-8 ${scrolled ? 'pt-2' : 'pt-3'}`}>
        <div
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-xl border border-[#DFE8E4] shadow-lg py-3 px-5'
              : 'bg-white/80 backdrop-blur-md border border-[#DFE8E4]/80 shadow-md py-3.5 px-6'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Elvora Health Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              {/* Elvora Medical Cross Icon */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#008BFF] via-[#00B4D8] to-[#0D34B4] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
                </svg>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl tracking-tight text-[#008BFF] leading-none">
                    ELVORA
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#0D34B4] text-white px-1.5 py-0.5 rounded">
                    HEALTH
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-semibold tracking-wide mt-0.5">
                  Raqamli Tibbiyot Ekotizimi
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-[#5F737B]">
              <a
                href="#nima-bu"
                className="hover:text-[#008BFF] transition-colors cursor-pointer"
              >
                Ekotizim Mahsulotlari
              </a>
              <a
                href="#portal"
                className="hover:text-[#008BFF] transition-colors cursor-pointer"
              >
                Onlayn E-Navbat
              </a>
              <a
                href="#mahsulotlar"
                className="hover:text-[#008BFF] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Sparkles size={13} className="text-[#008BFF]" />
                Elvora Pro & App
              </a>
              <a
                href="#comparison"
                className="hover:text-[#008BFF] transition-colors cursor-pointer"
              >
                Klinika Afzalliklari
              </a>
              <a
                href="#calculator"
                className="hover:text-[#008BFF] transition-colors cursor-pointer"
              >
                Daromad Kalkulyatori
              </a>
              <a
                href="#pricing"
                className="hover:text-[#008BFF] transition-colors cursor-pointer"
              >
                Tariflar
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:+998712025000"
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#132229] bg-[#F4F7F5] border border-[#DFE8E4] hover:bg-white transition-colors"
              >
                <Phone size={13} className="text-[#008BFF]" />
                <span>(71) 202-50-00</span>
              </a>

              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#132229] hover:text-[#008BFF] transition-colors"
              >
                Kirish
              </Link>

              <Link
                to="/app/dashboard"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white text-xs font-bold shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer"
              >
                <span>Boshqaruv Paneli</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#132229] hover:bg-[#F4F7F5] transition-colors lg:hidden"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-[#DFE8E4] px-6 py-5 shadow-2xl space-y-4 animate-fade-in">
          <nav className="flex flex-col space-y-3 text-sm font-bold text-[#132229]">
            <a
              href="#ecosystem"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#008BFF]"
            >
              Ekotizim Mahsulotlari
            </a>
            <a
              href="#portal"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#008BFF]"
            >
              Onlayn E-Navbat
            </a>
            <a
              href="#mahsulotlar"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#008BFF]"
            >
              Elvora Pro & App
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#008BFF]"
            >
              Klinika Afzalliklari
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#008BFF]"
            >
              Tariflar
            </a>
          </nav>

          <div className="pt-3 border-t border-[#DFE8E4] flex flex-col gap-2">
            <Link
              to="/app/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#008BFF] text-white text-xs font-bold text-center shadow-md"
            >
              Klinika Boshqaruv Paneliga Kirish →
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#F4F7F5] text-[#132229] text-xs font-bold text-center border border-[#DFE8E4]"
            >
              Tizimga Kirish (Login)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
