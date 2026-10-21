import React, { useRef } from 'react';
import { Calendar, Stethoscope, ArrowRight, ShieldCheck, Clock, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreDoctors: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onExploreDoctors }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    containerRef,
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
      })
        .from(
          '.hero-line',
          {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
          },
          '-=0.5'
        )
        .from(
          '.hero-subtext',
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          '.hero-ctas',
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.5'
        )
        .from(
          '.hero-image-main',
          {
            scale: 0.95,
            y: 40,
            opacity: 0,
            duration: 1.1,
          },
          '-=0.8'
        )
        .from(
          '.hero-image-sub',
          {
            scale: 0.9,
            x: -30,
            y: 30,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.7'
        )
        .from(
          '.hero-float-card',
          {
            scale: 0.85,
            y: 25,
            opacity: 0,
            stagger: 0.18,
            duration: 0.8,
          },
          '-=0.6'
        );
    },
    []
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative pt-32 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-[#F7F8F5]"
    >
      {/* Subtle organic background gradient accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#CDEBDD]/40 via-[#EBF6F0]/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Expressive Large Editorial Typography */}
          <div className="lg:col-span-7 space-y-8">
            {/* Trust Pill Badge */}
            <div className="hero-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E2E8E3] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#176B55] animate-pulse" />
              <span className="text-xs font-semibold text-[#176B55] uppercase tracking-wider">
                Xususiy tibbiyotning yangi standarti
              </span>
              <span className="text-[10px] bg-[#CDEBDD] text-[#0F4C3C] px-1.5 py-0.5 rounded font-bold">
                DEMO
              </span>
            </div>

            {/* Expressive Editorial Headline: clamp(3.2rem, 7vw, 7rem) */}
            <div className="space-y-1">
              <h1 className="hero-headline text-[#172923]">
                <span className="hero-line block">Sog‘lig‘ingizga</span>
                <span className="hero-line block text-[#176B55]">e’tibor —</span>
                <span className="hero-line block font-light italic">
                  yangi darajadagi
                </span>
                <span className="hero-line block font-black">g‘amxo‘rlik.</span>
              </h1>
            </div>

            {/* Short Supporting Description */}
            <p className="hero-subtext text-lg sm:text-xl text-[#68756F] max-w-xl font-normal leading-relaxed">
              Toshkentdagi yetakchi shifokorlar bilan onlayn qabul, raqamli
              E-navbat va xalqaro andozalarga mos xususiy klinika xizmatlari
              yagona ekotizimda.
            </p>

            {/* Two Clear CTAs */}
            <div className="hero-ctas flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#176B55] hover:bg-[#0F4C3C] text-white text-base font-bold shadow-md hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer group"
              >
                <Calendar size={19} className="transition-transform group-hover:scale-110" />
                <span>Qabulga yozilish</span>
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreDoctors}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white hover:bg-[#F7F8F5] text-[#172923] text-base font-bold border border-[#E2E8E3] hover:border-[#176B55]/40 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <Stethoscope size={19} className="text-[#176B55]" />
                <span>Shifokorlarni ko‘rish</span>
              </button>
            </div>

            {/* Trust Points - Transparent Demo Disclosures */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#E2E8E3]/80">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#176B55]">
                  <Clock size={16} />
                  <span className="text-xl font-extrabold text-[#172923]">15 daq</span>
                </div>
                <p className="text-xs text-[#68756F] leading-tight">
                  O‘rtacha kutish vaqti <span className="opacity-70">(Namuna)</span>
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#176B55]">
                  <Award size={16} />
                  <span className="text-xl font-extrabold text-[#172923]">40+</span>
                </div>
                <p className="text-xs text-[#68756F] leading-tight">
                  Ixtisoslashgan shifokorlar <span className="opacity-70">(Demo)</span>
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#176B55]">
                  <CheckCircle2 size={16} />
                  <span className="text-xl font-extrabold text-[#172923]">100%</span>
                </div>
                <p className="text-xs text-[#68756F] leading-tight">
                  Shaffof qabul narxlari
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Overlapping Editorial Medical Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Photo: Modern Luxury Clinic Interior */}
              <div className="hero-image-main relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 bg-[#EBF6F0]">
                <img
                  src="/images/clinic_interior.jpg"
                  alt="Elvora Health zamonaviy klinika interyeri"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#CDEBDD]">
                    Markaziy Filial • Toshkent
                  </div>
                  <div className="text-sm font-bold">
                    Elvora Central Medical Suite
                  </div>
                </div>
              </div>

              {/* Overlapping Secondary Photo: Distinguished Doctor Portrait */}
              <div className="hero-image-sub absolute -bottom-10 -left-6 sm:-left-10 z-20 w-44 sm:w-56 aspect-3/4 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white hidden sm:block">
                <img
                  src="/images/doctor_portrait.jpg"
                  alt="Elvora Health yetakchi shifokori"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 inset-x-2 bg-white/95 backdrop-blur-xs p-2 rounded-xl text-center shadow-xs">
                  <p className="text-xs font-bold text-[#172923] truncate">
                    Dr. Nilufar Karimova
                  </p>
                  <p className="text-[10px] text-[#176B55] font-semibold">
                    Terapevt • 14 yil (Demo)
                  </p>
                </div>
              </div>

              {/* Floating Queue Card Widget */}
              <div className="hero-float-card absolute -top-6 -right-4 sm:-right-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#E2E8E3] max-w-56">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold tracking-wider text-[#68756F] uppercase">
                    Jonli E-Navbat (Demo)
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#176B55] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#176B55]" />
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#CDEBDD] flex items-center justify-center font-extrabold text-sm text-[#0F4C3C]">
                    #A-104
                  </div>
                  <div className="leading-tight">
                    <div className="text-xs font-bold text-[#172923]">
                      Shifokor ko‘rigida
                    </div>
                    <div className="text-[11px] text-[#68756F]">
                      Keyingi: <strong className="text-[#172923]">#A-105</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Digital Standards Badge */}
              <div className="hero-float-card absolute -bottom-6 right-6 z-20 bg-[#176B55] text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
                <ShieldCheck size={26} className="text-[#CDEBDD] shrink-0" />
                <div className="leading-tight">
                  <div className="text-xs font-bold">Smart Clinic Flow</div>
                  <div className="text-[10px] text-[#CDEBDD]/90">
                    Avtomatlashgan E-retsept va Talon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
