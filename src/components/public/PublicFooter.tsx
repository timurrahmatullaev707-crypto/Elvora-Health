import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#071328] text-white pt-16 pb-12 border-t border-[#0F274A] relative overflow-hidden">
      {/* Subtle blue ambient glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-[#008BFF]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#122A50]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#008BFF] via-[#00B4D8] to-[#0D34B4] flex items-center justify-center text-white shadow-md">
                <svg
                  className="w-5 h-5"
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
              <span className="font-black text-xl tracking-tight text-white">
                ELVORA <span className="text-[#008BFF]">HEALTH</span>
              </span>
            </div>

            <p className="text-sm text-[#94A3B8] max-w-sm leading-relaxed">
              O'zbekistondagi xususiy va davlat klinikalari uchun mo'ljallangan yagona aqlli boshqaruv SaaS platformasi. Bemorlar, shifokorlar jadvali, kassa va tahliliy xulosalar bir ekotizimda.
            </p>

            <div className="pt-2 text-xs text-[#94A3B8] flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#008BFF]" />
              <span>Mahalliy qonunchilik va tibbiy maxfiylik talablariga to'liq mos</span>
            </div>
          </div>

          {/* Column 1: Mahsulot */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Mahsulotlar
            </h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li>
                <Link to="/app/dashboard" className="hover:text-white transition-colors">
                  Boshqaruv paneli (MIS)
                </Link>
              </li>
              <li>
                <Link to="/app/patients" className="hover:text-white transition-colors">
                  Bemorlar kartotekasi
                </Link>
              </li>
              <li>
                <Link to="/app/appointments" className="hover:text-white transition-colors">
                  Qabullar va E-Navbat
                </Link>
              </li>
              <li>
                <Link to="/app/doctors" className="hover:text-white transition-colors">
                  Shifokorlar grafigi
                </Link>
              </li>
              <li>
                <Link to="/app/finance" className="hover:text-white transition-colors">
                  Moliya va kassa
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Imzo imkoniyatlar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Innovatsiyalar
            </h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li>
                <Link to="/app/insights" className="hover:text-white transition-colors flex items-center gap-1">
                  <Sparkles size={13} className="text-[#008BFF]" /> Elvora Insights™
                </Link>
              </li>
              <li>
                <a href="#doniyor-ai" className="hover:text-white transition-colors">
                  Doniyor AI Yordamchisi
                </a>
              </li>
              <li>
                <a href="#portal" className="hover:text-white transition-colors">
                  Jonli kutish navbati tablosi
                </a>
              </li>
              <li>
                <a href="#masalalar" className="hover:text-white transition-colors">
                  Klinika modullari
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Tariflar va rejalar
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Texnologiya va aloqa */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Aloqa & Demo
            </h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li>
                <span className="block text-white font-medium">Toshkent, O'zbekiston</span>
              </li>
              <li>
                <span className="block text-xs">+998 (71) 202-50-00</span>
              </li>
              <li>
                <span className="block text-xs">info@elvorahealth.uz</span>
              </li>
              <li className="pt-2">
                <Link
                  to="/app/dashboard"
                  className="inline-flex items-center gap-1.5 text-xs text-[#008BFF] hover:underline font-semibold"
                >
                  Demoni ishga tushirish <ArrowRight size={13} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} Elvora Health. Barcha huquqlar himoyalangan.</p>
          <p className="italic text-[#94A3B8]">
            "Your clinic. One intelligent system." • "Klinikangiz uchun yagona aqlli tizim."
          </p>
        </div>
      </div>
    </footer>
  );
};
