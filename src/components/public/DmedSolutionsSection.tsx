import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Bed,
  FlaskConical,
  CreditCard,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const DmedSolutionsSection: React.FC = () => {
  const cards = [
    {
      id: 'omborlar',
      title: 'Omborlar',
      icon: <Package size={22} className="text-[#008BFF]" />,
      description:
        'Tibbiy va notibbiy sarf materiallarining hisobi. Bemorga ketgan xarajatlarni nazorat qilish imkonini beradi.',
    },
    {
      id: 'shifoxonalar',
      title: 'Shifoxonalar',
      icon: <Bed size={22} className="text-[#008BFF]" />,
      description:
        'Shifoxona qabullarini boshqarish, muolajalarni belgilash, kasallik tarixi, elektron epikrizlar va elektron hujjat aylanishiga yordam beradi.',
    },
    {
      id: 'laboratoriyalar',
      title: 'Laboratoriyalar',
      icon: <FlaskConical size={22} className="text-[#008BFF]" />,
      description:
        'Biomateriallarni va natijalarni olish. Tahlil qurilmalari bilan integratsiyalash hamda biomateriallarni boshqa muassasaga yo‘naltirish.',
    },
    {
      id: 'moliya',
      title: 'Moliya',
      icon: <CreditCard size={22} className="text-[#008BFF]" />,
      description:
        'Pullik xizmatlar, to‘lov tizimlari (Click, Payme, Uzcard) bilan integratsiya, referal dasturlar va buxgalteriya hisobotlari.',
    },
  ];

  return (
    <section id="mahsulotlar" className="py-20 lg:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Split: Text & Button on Left, Doctors Photo on Right (1-to-1 with Screenshot 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Qanday muammolarni <br className="hidden sm:inline" />
              yechamiz?
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              Biz kundalik ishlarni avtomatlashtirish, xodimlar yuklamasini kamaytirish, xatolarni qisqartirish va qabullarni tezlashtirish orqali yordam beramiz.
            </p>

            <div>
              <Link
                to="/app/dashboard"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#1E2022] hover:bg-black text-white text-sm font-bold shadow-lg hover:shadow-xl active:scale-98 transition-all cursor-pointer"
              >
                <span>Barcha mahsulotlar</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right Doctors Team Image (Screenshot 4) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-md w-full">
              {/* Subtle background glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-200/40 to-blue-200/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

              <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-100 shadow-2xl bg-white">
                <img
                  src="/images/dmed_doctors.jpg"
                  alt="DMED Malakali Shifokorlari"
                  className="w-full h-auto object-cover object-top max-h-[320px] transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating badge over image */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-cyan-100 shadow-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-slate-900 block">
                      Malakali Tibbiyot Xodimlari
                    </span>
                    <span className="text-[10px] text-slate-500">2 800+ Shifokorlar Ishonchi</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-50 text-[#008BFF] border border-cyan-200">
                    DMED Pro
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4 Horizontal Cards (Screenshot 4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="p-6 rounded-3xl bg-white border border-cyan-100 hover:border-[#008BFF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Light Blue Rounded Square Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center mb-5 group-hover:bg-[#008BFF] transition-colors">
                  <span className="group-hover:text-white transition-colors">
                    {card.icon}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#008BFF] transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#008BFF]">
                <span>Batafsil ma'lumot</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
