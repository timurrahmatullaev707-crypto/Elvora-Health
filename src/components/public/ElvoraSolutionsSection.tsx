import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Bed,
  FlaskConical,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Activity,
  ShieldCheck,
} from 'lucide-react';

export const ElvoraSolutionsSection: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<string>('omborlar');

  const cards = [
    {
      id: 'omborlar',
      title: 'Omborlar',
      icon: <Package size={22} className="text-[#008BFF]" />,
      badge: 'Dori hisobi',
      description:
        'Tibbiy va notibbiy sarf materiallarining hisobi. Bemorga ketgan xarajatlarni nazorat qilish imkonini beradi.',
      stats: 'Yaroqlilik muddati nazorati 100%',
    },
    {
      id: 'shifoxonalar',
      title: 'Shifoxonalar',
      icon: <Bed size={22} className="text-[#008BFF]" />,
      badge: 'Statsionar',
      description:
        'Shifoxona qabullarini boshqarish, muolajalarni belgilash, kasallik tarixi, elektron epikrizlar va elektron hujjat aylanishiga yordam beradi.',
      stats: 'Hujjat aylanishi 4x tezroq',
    },
    {
      id: 'laboratoriyalar',
      title: 'Laboratoriyalar',
      icon: <FlaskConical size={22} className="text-[#008BFF]" />,
      badge: 'LIS tizimi',
      description:
        'Biomateriallarni va natijalarni olish. Tahlil qurilmalari bilan integratsiyalash hamda biomateriallarni boshqa muassasaga yo‘naltirish.',
      stats: 'Avtomatlashtirilgan analizatorlar',
    },
    {
      id: 'moliya',
      title: 'Moliya',
      icon: <CreditCard size={22} className="text-[#008BFF]" />,
      badge: 'Kassa & Finans',
      description:
        'Pullik xizmatlar, to‘lov tizimlari (Click, Payme, Uzcard) bilan integratsiya, referal dasturlar va buxgalteriya hisobotlari.',
      stats: 'Fiskal chek va shaffof daromad',
    },
  ];

  return (
    <section id="mahsulotlar" className="py-20 lg:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Split: Text & Button on Left, Doctors Photo on Right (Exact from Screenshot 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-xs font-bold text-[#008BFF]">
              <Sparkles size={14} className="text-[#008BFF]" />
              <span>YAGONA TIBBIY SAAS YECHIM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Qanday muammolarni <br className="hidden sm:inline" />
              yechamiz?
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-normal">
              Biz kundalik ishlarni avtomatlashtirish, xodimlar yuklamasini kamaytirish, xatolarni qisqartirish va qabullarni tezlashtirish orqali yordam beramiz.
            </p>

            <div className="pt-2">
              <Link
                to="/app/dashboard"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#1E2022] hover:bg-black text-white text-sm font-bold shadow-lg hover:shadow-2xl active:scale-95 transition-all cursor-pointer group"
              >
                <span>Barcha mahsulotlar</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Doctors Team Image with Interactive Floating Cards (Screenshot 4) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-md w-full">
              {/* Background cyan halo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-300/40 via-blue-300/30 to-teal-300/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />

              {/* Floating micro-badge: 99.8% Aniqlik */}
              <div className="absolute -top-4 -left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-cyan-200 shadow-xl px-3 py-2 flex items-center gap-2 animate-float-subtle">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <div className="text-[10px] font-extrabold text-slate-900 leading-none">99.8% Aniqlik</div>
                  <div className="text-[9px] text-slate-500">Avtomatik hisob</div>
                </div>
              </div>

              {/* Doctors Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-200 shadow-2xl bg-white">
                <img
                  src="/images/dmed_doctors.jpg"
                  alt="Elvora Health Malakali Shifokorlari"
                  className="w-full h-auto object-cover object-top max-h-[320px] transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating badge over image (Screenshot 4) */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-cyan-100 shadow-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-slate-900 block text-xs sm:text-sm">
                      Malakali Tibbiyot Xodimlari
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">2 800+ Shifokorlar Ishonchi</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black bg-cyan-50 text-[#008BFF] border border-cyan-200 shadow-2xs">
                    Elvora Pro
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4 Horizontal Cards (Exact from Screenshot 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const isHovered = activeCardId === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setActiveCardId(card.id)}
                className={`p-6 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between group cursor-pointer sheen-card ${
                  isHovered
                    ? 'border-[#008BFF] shadow-xl shadow-cyan-500/10 -translate-y-1.5'
                    : 'border-cyan-100/90 shadow-sm hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Light Blue Rounded Square Icon Container */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? 'bg-[#008BFF] text-white shadow-md shadow-blue-500/30'
                          : 'bg-cyan-50 text-[#008BFF]'
                      }`}
                    >
                      {React.cloneElement(card.icon as React.ReactElement<{ className?: string }>, {
                        className: isHovered ? 'text-white' : 'text-[#008BFF]',
                      })}
                    </div>

                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-[#008BFF] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>{card.stats}</span>
                  </span>
                  <ArrowRight size={13} className="text-[#008BFF] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
