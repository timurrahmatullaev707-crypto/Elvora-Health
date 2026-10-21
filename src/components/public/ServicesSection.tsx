import React, { useRef } from 'react';
import {
  Stethoscope,
  HeartPulse,
  Baby,
  Sparkles,
  Smile,
  FlaskConical,
  Brain,
  Eye,
  ArrowRight,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { MOCK_SERVICES, MedicalServiceItem } from '../../data/mockPublicData';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

interface ServicesSectionProps {
  onSelectServiceForBooking: (service: MedicalServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    containerRef,
    () => {
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
      });
    },
    []
  );

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-[#176B55]" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-[#176B55]" />;
      case 'Baby':
        return <Baby className="w-6 h-6 text-[#176B55]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#176B55]" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-[#176B55]" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-[#176B55]" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-[#176B55]" />;
      case 'Eye':
        return <Eye className="w-6 h-6 text-[#176B55]" />;
      default:
        return <Stethoscope className="w-6 h-6 text-[#176B55]" />;
    }
  };

  return (
    <section id="services" ref={containerRef} className="py-24 bg-[#FFFFFF] border-y border-[#E2E8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF6F0] text-xs font-semibold text-[#176B55]">
            <span>Ixtisoslashgan tibbiy yo‘nalishlar</span>
          </div>

          <h2 className="section-headline text-[#172923]">
            Tibbiyotning har bir sohasida professional g‘amxo‘rlik.
          </h2>

          <p className="text-lg text-[#68756F] font-normal leading-relaxed">
            Zamonaviy diagnostika uskunalari, xalqaro protokollar va tajribali mutaxassislar nazoratida xavfsiz va aniq davolash.
          </p>
        </div>

        {/* Refined Medical Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_SERVICES.map((service) => (
            <div
              key={service.id}
              className="service-card elvora-card p-6 flex flex-col justify-between hover:border-[#CDEBDD] hover:shadow-xl transition-all duration-300 group cursor-pointer"
              onClick={() => onSelectServiceForBooking(service)}
            >
              <div className="space-y-4">
                {/* Header Icon + Price badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF6F0] flex items-center justify-center transition-colors group-hover:bg-[#CDEBDD]">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-bold text-[#176B55] bg-[#EBF6F0] px-2.5 py-1 rounded-full">
                    {service.basePriceUZS.toLocaleString()} so‘m
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#68756F]">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#172923] group-hover:text-[#176B55] transition-colors leading-snug">
                    {service.titleUz}
                  </h3>
                  <p className="text-sm text-[#68756F] leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Popular tags */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {service.popularFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-[#172923] bg-[#F7F8F5] px-2 py-0.5 rounded-md border border-[#E2E8E3]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="pt-6 mt-4 border-t border-[#E2E8E3] flex items-center justify-between text-sm font-semibold text-[#176B55] group-hover:text-[#0F4C3C]">
                <div className="flex items-center gap-1.5 text-xs text-[#68756F]">
                  <Clock size={14} />
                  <span>~{service.durationMinutes} daqiqa</span>
                </div>

                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Qabulga yozilish
                  <ArrowRight size={15} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
