import React from 'react';
import { Link } from 'react-router-dom';
import { ElvoraLogo } from '../common/ElvoraLogo';
import { ShieldCheck, Phone, Mail, MapPin, Heart, ArrowUp } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#172923] text-white pt-20 pb-12 border-t border-[#263D36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <ElvoraLogo size="lg" variant="light" />

            <p className="text-sm text-[#CDEBDD]/80 leading-relaxed max-w-sm">
              Xususiy tibbiyot markazlari, oliy toifali shifokorlar va bemorlar uchun xalqaro darajadagi zamonaviy raqamli ekotizim.
            </p>

            <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#CDEBDD]">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <span>Standartlashtirilgan xavfsiz E-navbat tizimi</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#CDEBDD] uppercase tracking-wider">
              Bo‘limlar
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <a href="#hero" className="hover:text-emerald-400 transition-colors">
                  Bosh sahifa
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Tibbiy xizmatlar
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-emerald-400 transition-colors">
                  Shifokorlar
                </a>
              </li>
              <li>
                <a href="#clinics" className="hover:text-emerald-400 transition-colors">
                  Klinikalar kashfiyoti
                </a>
              </li>
              <li>
                <a href="#smart-flow" className="hover:text-emerald-400 transition-colors">
                  Smart Clinic Flow
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  Biz haqimizda
                </a>
              </li>
            </ul>
          </div>

          {/* Clinical Management */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#CDEBDD] uppercase tracking-wider">
              Klinika Tizimi
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link to="/app/dashboard" className="hover:text-emerald-400 transition-colors">
                  Boshqaruv paneli (Dashboard)
                </Link>
              </li>
              <li>
                <Link to="/app/appointments" className="hover:text-emerald-400 transition-colors">
                  Jonli qabullar navbati
                </Link>
              </li>
              <li>
                <Link to="/app/patients" className="hover:text-emerald-400 transition-colors">
                  Bemorlar kartotekasi
                </Link>
              </li>
              <li>
                <Link to="/app/doctors" className="hover:text-emerald-400 transition-colors">
                  Shifokorlar jadvali
                </Link>
              </li>
              <li>
                <Link to="/app/finance" className="hover:text-emerald-400 transition-colors">
                  Moliya va Kassa
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#CDEBDD] uppercase tracking-wider">
              Aloqa
            </h4>
            <div className="space-y-3 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-400 shrink-0" />
                <span>+998 (71) 200-45-45</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-emerald-400 shrink-0" />
                <span>support@elvorahealth.uz</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Toshkent sh., Mustaqillik shoh ko‘chasi, 42-uy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prototype Legal Disclosure */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60">
          <p className="text-center md:text-left max-w-2xl">
            <strong>DIQQAT (TEXNOLOGIK DEMO):</strong> Elvora Health ushbu bosqichda to‘liq frontend ko‘rgazmali platforma bo‘lib, litsenziyalangan tibbiy xizmat ko‘rsatuvchi muassasa hisoblanmaydi. Barcha bemor va shifokorlar ma’lumotlari dasturiy namoyish uchun yaratilgan.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Yuqoriga</span>
            <ArrowUp size={14} />
          </button>
        </div>

        <div className="text-center text-[11px] text-white/40">
          © {new Date().getFullYear()} Elvora Health Technologies. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
};
