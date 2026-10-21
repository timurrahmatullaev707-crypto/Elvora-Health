import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Calendar,
  LayoutDashboard,
  Phone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import { ElvoraLogo } from '../common/ElvoraLogo';

interface PublicNavbarProps {
  onOpenBooking: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Bosh sahifa', href: '#hero' },
    { name: 'Xizmatlar', href: '#services' },
    { name: 'Shifokorlar', href: '#doctors' },
    { name: 'Klinikalar', href: '#clinics' },
    { name: 'Smart Flow', href: '#smart-flow' },
    { name: 'Biz haqimizda', href: '#about' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F8F5]/92 backdrop-blur-md shadow-xs border-b border-[#E2E8E3]'
          : 'bg-[#F7F8F5]/70 backdrop-blur-xs border-b border-[#E2E8E3]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <ElvoraLogo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-[#172923] hover:text-[#176B55] hover:bg-[#CDEBDD]/30 rounded-lg transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Direct Dashboard Access */}
            <Link
              to="/app/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2E8E3] bg-white hover:bg-[#F7F8F5] text-[#172923] text-sm font-semibold transition-all shadow-xs hover:border-[#CDEBDD] cursor-pointer"
            >
              <LayoutDashboard size={16} className="text-[#176B55]" />
              <span>Klinika tizimi</span>
            </Link>

            {/* Appointment Booking CTA */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#176B55] hover:bg-[#0F4C3C] text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <Calendar size={16} />
              <span>Qabulga yozilish</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-3 py-1.5 rounded-lg bg-[#176B55] text-white text-xs font-semibold"
            >
              Qabul
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#172923] hover:bg-[#CDEBDD]/30 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-[#FFFFFF] border-b border-[#E2E8E3] shadow-xl p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-[#172923] hover:bg-[#EBF6F0] hover:text-[#176B55] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E2E8E3] space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#176B55] text-white font-semibold text-sm shadow-xs"
            >
              <Calendar size={18} />
              <span>Qabulga yozilish</span>
            </button>

            <Link
              to="/app/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E2E8E3] bg-[#F7F8F5] text-[#172923] font-semibold text-sm"
            >
              <LayoutDashboard size={18} className="text-[#176B55]" />
              <span>Klinika tizimiga kirish (Dashboard)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
