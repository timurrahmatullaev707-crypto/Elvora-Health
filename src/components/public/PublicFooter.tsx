import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#101C2C] text-white pt-16 pb-12 border-t border-[#1C2C40]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#203248]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#0D7C74] to-[#065F55] flex items-center justify-center text-white shadow-xs">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 4v16m-8-8h16" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                ELVORA <span className="text-[#34D399]">HEALTH</span>
              </span>
            </div>

            <p className="text-sm text-[#94A3B8] max-w-sm leading-relaxed">
              O'zbekistondagi xususiy klinikalar uchun mo'ljallangan yagona aqlli boshqaruv SaaS platformasi. Bemorlar, shifokorlar jadvali, kassa va tahliliy xulosalar bir tizimda.
            </p>

            <div className="pt-2 text-xs text-[#94A3B8] flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#34D399]" />
              <span>Mahalliy qonunchilik va tibbiy maxfiylik talablariga mos</span>
            </div>
          </div>

          {/* Column 1: Mahsulot */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Mahsulot
            </h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li>
                <Link to="/app/dashboard" className="hover:text-white transition-colors">
                  Boshqaruv paneli
                </Link>
              </li>
              <li>
                <Link to="/app/patients" className="hover:text-white transition-colors">
                  Bemorlar kartotekasi
                </Link>
              </li>
              <li>
                <Link to="/app/appointments" className="hover:text-white transition-colors">
                  Qabullar va navbat
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
                  <Sparkles size={13} className="text-[#34D399]" /> Elvora Insights™
                </Link>
              </li>
              <li>
                <Link to="/app/appointments" className="hover:text-white transition-colors">
                  Jonli kutish navbati
                </Link>
              </li>
              <li>
                <Link to="/app/finance" className="hover:text-white transition-colors">
                  Sof operatsion tahlil
                </Link>
              </li>
              <li>
                <Link to="/app/subscription" className="hover:text-white transition-colors">
                  Tariflar va rejalar
                </Link>
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
                <span className="block text-xs">+998 (71) 200-45-45</span>
              </li>
              <li>
                <span className="block text-xs">info@elvorahealth.uz</span>
              </li>
              <li className="pt-2">
                <Link
                  to="/app/dashboard"
                  className="inline-flex items-center gap-1.5 text-xs text-[#34D399] hover:underline font-semibold"
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
