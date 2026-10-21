import React, { useState, useRef } from 'react';
import {
  Building2,
  Search,
  MapPin,
  Phone,
  Clock,
  Star,
  ShieldCheck,
  Check,
  ExternalLink,
  Navigation,
  X,
} from 'lucide-react';
import { MOCK_CLINICS, ClinicItem } from '../../data/mockPublicData';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

interface ClinicDiscoverySectionProps {
  onBookAtClinic: (clinic: ClinicItem) => void;
}

export const ClinicDiscoverySection: React.FC<ClinicDiscoverySectionProps> = ({ onBookAtClinic }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [activeMapModal, setActiveMapModal] = useState<ClinicItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const specialties = [
    { key: 'all', label: 'Barcha yo‘nalishlar' },
    { key: 'Kardiologiya', label: 'Kardiologiya' },
    { key: 'Terapiya', label: 'Terapiya' },
    { key: 'Pediatriya', label: 'Pediatriya' },
    { key: 'Laboratoriya', label: 'Laboratoriya' },
    { key: 'Stomatologiya', label: 'Stomatologiya' },
    { key: 'Dermatologiya', label: 'Dermatologiya' },
  ];

  const filteredClinics = MOCK_CLINICS.filter((clinic) => {
    const matchesSearch =
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === 'all' || clinic.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  useGsapContext(
    containerRef,
    () => {
      gsap.from('.clinic-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    },
    [searchTerm, selectedSpecialty]
  );

  return (
    <section id="clinics" ref={containerRef} className="py-24 bg-white border-b border-[#E2E8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF6F0] text-xs font-semibold text-[#176B55]">
            <Building2 size={14} />
            <span>Klinikalar kashfiyoti</span>
          </div>

          <h2 className="section-headline text-[#172923]">
            Sizga yaqin, zamonaviy tibbiyot markazlari.
          </h2>

          <p className="text-lg text-[#68756F] font-normal leading-relaxed">
            Toshkent va viloyatlardagi eng qulay, akkreditatsiyadan o‘tgan hamkor xususiy klinikalarni qidiring, manzillarini ko‘ring va qabulga yoziling.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#F7F8F5] p-4 sm:p-6 rounded-3xl border border-[#E2E8E3] mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search size={18} className="absolute left-4 top-3.5 text-[#68756F]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Klinika nomi, tuman yoki manzil bo‘yicha qidiring..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#E2E8E3] text-sm focus:border-[#176B55] focus:outline-none shadow-xs"
              />
            </div>

            {/* Specialty Pills */}
            <div className="md:col-span-6 flex flex-wrap items-center gap-1.5">
              {specialties.map((spec) => (
                <button
                  key={spec.key}
                  onClick={() => setSelectedSpecialty(spec.key)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSpecialty === spec.key
                      ? 'bg-[#176B55] text-white shadow-xs'
                      : 'bg-white border border-[#E2E8E3] text-[#172923] hover:bg-[#EBF6F0]'
                  }`}
                >
                  {spec.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clinics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClinics.map((clinic) => (
            <div
              key={clinic.id}
              className="clinic-card elvora-card elvora-card-hover overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Clinic Image with Badges */}
                <div className="relative h-52 bg-[#EBF6F0] overflow-hidden">
                  <img
                    src={clinic.imageUrl}
                    alt={clinic.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Branch Type Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#176B55] text-xs font-extrabold px-3 py-1 rounded-full shadow-xs border border-[#E2E8E3]">
                    {clinic.branchType}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-[#172923]/90 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <Star size={13} className="text-amber-400 fill-amber-400" />
                    <span>{clinic.rating}</span>
                    <span className="text-[10px] text-white/70">({clinic.reviewCount})</span>
                  </div>

                  <div className="absolute bottom-3 inset-x-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#CDEBDD]">
                      {clinic.district}
                    </span>
                    <h3 className="text-lg font-bold text-white truncate">{clinic.name}</h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2 text-xs text-[#68756F]">
                    <div className="flex items-start gap-2">
                      <MapPin size={15} className="text-[#176B55] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{clinic.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone size={15} className="text-[#176B55] shrink-0" />
                      <span className="font-semibold text-[#172923]">{clinic.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-[#176B55] shrink-0" />
                      <span>{clinic.workingHours}</span>
                    </div>
                  </div>

                  {/* Specialties tags */}
                  <div className="pt-2">
                    <span className="block text-[11px] font-bold text-[#172923] mb-1.5">
                      Asosiy xizmatlar:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {clinic.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#EBF6F0] text-[#176B55]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveMapModal(clinic)}
                  className="py-2.5 px-3 rounded-xl border border-[#E2E8E3] hover:bg-[#F7F8F5] text-[#172923] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Navigation size={13} className="text-[#176B55]" />
                  <span>Xaritada</span>
                </button>

                <button
                  onClick={() => onBookAtClinic(clinic)}
                  className="py-2.5 px-3 rounded-xl bg-[#176B55] hover:bg-[#0F4C3C] text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer text-center"
                >
                  Qabulga yozilish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Map & Address Modal */}
      {activeMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E2E8E3]">
            <div className="p-6 pb-4 border-b border-[#E2E8E3] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#176B55] uppercase tracking-wider">
                  Klinika Joylashuvi
                </span>
                <h3 className="text-lg font-bold text-[#172923]">{activeMapModal.name}</h3>
              </div>
              <button
                onClick={() => setActiveMapModal(null)}
                className="w-8 h-8 rounded-full bg-[#F7F8F5] hover:bg-slate-200 flex items-center justify-center text-[#172923] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Mock Map Preview Box */}
            <div className="relative h-64 bg-[#EBF6F0] p-4 flex flex-col items-center justify-center text-center overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-[#176B55] text-white flex items-center justify-center shadow-lg animate-bounce mb-3">
                <MapPin size={32} />
              </div>
              <h4 className="text-sm font-bold text-[#172923]">{activeMapModal.address}</h4>
              <p className="text-xs text-[#68756F] mt-1">
                Koordinatalar: {activeMapModal.coordinates.lat.toFixed(4)}, {activeMapModal.coordinates.lng.toFixed(4)}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E2E8E3] text-xs font-bold text-[#176B55] shadow-xs">
                <span>Avtomobil va Jamoat transporti orqali qulay</span>
              </div>
            </div>

            <div className="p-6 space-y-3 bg-[#F7F8F5]">
              <div className="text-xs text-[#68756F]">
                Ish vaqti: <strong className="text-[#172923]">{activeMapModal.workingHours}</strong>
              </div>
              <div className="text-xs text-[#68756F]">
                Qabulxona telefoni: <strong className="text-[#172923]">{activeMapModal.phone}</strong>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveMapModal(null)}
                  className="px-4 py-2 rounded-xl border border-[#E2E8E3] bg-white text-xs font-bold text-[#172923] cursor-pointer"
                >
                  Yopish
                </button>
                <button
                  onClick={() => {
                    const cl = activeMapModal;
                    setActiveMapModal(null);
                    onBookAtClinic(cl);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#176B55] hover:bg-[#0F4C3C] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Shu klinikada qabulga yozilish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
