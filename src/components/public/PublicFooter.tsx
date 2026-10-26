import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, Phone, Lock, Activity } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#0A1120] text-white pt-16 pb-12 border-t border-slate-800 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284C7] via-[#0D9488] to-[#0F172A] flex items-center justify-center text-white shadow-md">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
                </svg>
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                ELVORA <span className="text-teal-400">HEALTH</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              O'zbekiston xususiy tibbiyot markazlari uchun mo'ljallangan yagona aqlli boshqaruv SaaS platformasi. Bemorlar qabuli, kassa shaffofligi va Elvora AI™ triage bitta intellektual yadroida.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-teal-400" />
                <span>O'zbekiston Respublikasi shaxsiy ma'lumotlar qonunchiligiga to'liq mos</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={15} className="text-teal-400" />
                <span>256-bitli bank darajasidagi AES shifrlash</span>
              </div>
            </div>
          </div>

          {/* Column 1: Boshqaruv Tizimi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Klinik SaaS Modullari
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/app/dashboard" className="hover:text-white transition-colors">
                  Boshqaruv Paneli (MIS)
                </Link>
              </li>
              <li>
                <Link to="/app/patients" className="hover:text-white transition-colors">
                  Bemorlar Elektron Kartotekasi
                </Link>
              </li>
              <li>
                <Link to="/app/appointments" className="hover:text-white transition-colors">
                  Jonli E-Navbat va Qabullar
                </Link>
              </li>
              <li>
                <Link to="/app/doctors" className="hover:text-white transition-colors">
                  Shifokorlar Ish Grafigi
                </Link>
              </li>
              <li>
                <Link to="/app/finance" className="hover:text-white transition-colors">
                  Kassa va Moliya Tahlili
                </Link>
              </li>
              <li>
                <Link to="/app/insights" className="hover:text-white transition-colors">
                  Elvora AI Insights™
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Platforma Bo'limlari */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Lending Bo'limlari
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#texnologiya" className="hover:text-white transition-colors">
                  Texnologik Yadro
                </a>
              </li>
              <li>
                <a href="#ai-showcase" className="hover:text-white transition-colors">
                  Elvora AI™ Triage Demo
                </a>
              </li>
              <li>
                <a href="#analitika" className="hover:text-white transition-colors">
                  Klinik Analitika
                </a>
              </li>
              <li>
                <a href="#onlayn-yozilish" className="hover:text-white transition-colors">
                  Jonli Qabulga Yozilish
                </a>
              </li>
              <li>
                <a href="#roi-kalkulyator" className="hover:text-white transition-colors">
                  ROI Kalkulyatori
                </a>
              </li>
              <li>
                <a href="#tariflar" className="hover:text-white transition-colors">
                  Tariflar va Obuna
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Bog'lanish & Shoshilinch */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Bog'lanish &amp; Yordam
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-teal-400" />
                <span>+998 71 200 45 45</span>
              </li>
              <li>
                <span>Toshkent sh., Bunyodkor shox ko'chasi, 42-uy</span>
              </li>
              <li className="pt-2 text-slate-300 font-semibold">
                Ish tartibi: Dush - Shanba, 08:00 - 20:00
              </li>
              <li className="pt-2">
                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-[11px] text-rose-300">
                  <strong>🚨 Shoshilinch tibbiy yordam:</strong> O'tkir alomatlarda darhol <strong>103</strong> ga qo'ng'iroq qiling!
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Elvora Health Inc. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/pitch" className="hover:text-slate-300 transition-colors">
              Investor Prezentatsiyasi
            </Link>
            <span>•</span>
            <span className="text-slate-400">HIPAA &amp; ISO 27001 Standartlari Muvofiq</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
