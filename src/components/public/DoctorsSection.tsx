import React, { useState, useRef } from 'react';
import {
  Calendar,
  Clock,
  Star,
  MapPin,
  Stethoscope,
  X,
  CheckCircle,
  GraduationCap,
  Globe,
  Award,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { MOCK_PUBLIC_DOCTORS, PublicDoctor } from '../../data/mockPublicData';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

interface DoctorsSectionProps {
  onSelectDoctorForBooking: (doctor: PublicDoctor, slot?: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctorForBooking }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [activeDoctorModal, setActiveDoctorModal] = useState<PublicDoctor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const specialties = [
    { key: 'all', label: 'Barcha mutaxassislar' },
    { key: 'Terapevt', label: 'Terapiya' },
    { key: 'Kardiolog', label: 'Kardiologiya' },
    { key: 'Pediatr', label: 'Pediatriya' },
    { key: 'Nevropatolog', label: 'Nevrologiya' },
    { key: 'Dermatolog', label: 'Dermatologiya' },
    { key: 'Stomatolog', label: 'Stomatologiya' },
  ];

  const filteredDoctors =
    selectedSpecialty === 'all'
      ? MOCK_PUBLIC_DOCTORS
      : MOCK_PUBLIC_DOCTORS.filter((doc) => doc.specialty === selectedSpecialty);

  useGsapContext(
    containerRef,
    () => {
      gsap.from('.doctor-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    },
    [selectedSpecialty]
  );

  return (
    <section id="doctors" ref={containerRef} className="py-24 bg-[#F7F8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF6F0] text-xs font-semibold text-[#176B55]">
              <Stethoscope size={14} />
              <span>Oliy toifali mutaxassislar (Demo tarkib)</span>
            </div>

            <h2 className="section-headline text-[#172923]">
              O‘z sohasining e’tirof etilgan shifokorlari.
            </h2>

            <p className="text-lg text-[#68756F] font-normal leading-relaxed">
              Barcha shifokorlar profillari va tajriba ko‘rsatkichlari demo ma’lumotlar sifatida taqdim etilmoqda. Qabul vaqtini o‘zingizga mos ravishda tanlang.
            </p>
          </div>

          {/* Specialty Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {specialties.map((spec) => (
              <button
                key={spec.key}
                onClick={() => setSelectedSpecialty(spec.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="doctor-card elvora-card elvora-card-hover overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Doctor Visual Header with Portrait & Rating */}
                <div className="relative h-64 bg-[#EBF6F0] overflow-hidden">
                  <img
                    src={doctor.photoUrl}
                    alt={doctor.fullName}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Experience Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#172923] text-xs font-bold px-3 py-1 rounded-full shadow-xs border border-[#E2E8E3]">
                    {doctor.experienceYears} yillik amaliyot (Demo)
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-[#172923]/90 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <Star size={13} className="text-amber-400 fill-amber-400" />
                    <span>{doctor.rating}</span>
                    <span className="text-[10px] text-white/70">({doctor.reviewsCount})</span>
                  </div>

                  {/* Name and Specialty Over Image */}
                  <div className="absolute bottom-3 inset-x-4 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#CDEBDD]">
                      {doctor.specialty}
                    </span>
                    <h3 className="text-xl font-extrabold text-white leading-tight">
                      {doctor.fullName}
                    </h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-[#68756F] line-clamp-2 leading-relaxed">
                    {doctor.bio}
                  </p>

                  <div className="space-y-2 text-xs text-[#68756F]">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#176B55] shrink-0" />
                      <span>{doctor.clinicName} • {doctor.roomNumber}</span>
                    </div>

                    <div className="flex items-center gap-2 font-semibold text-[#172923]">
                      <Stethoscope size={14} className="text-[#176B55] shrink-0" />
                      <span>Qabul to‘lovi: {doctor.feeUZS.toLocaleString()} so‘m</span>
                    </div>
                  </div>

                  {/* Available Demo Slots */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-[#172923] flex items-center gap-1">
                        <Clock size={13} className="text-[#176B55]" />
                        Bugungi bo‘sh vaqtlar:
                      </span>
                      <span className="text-[10px] text-[#68756F]">Demo slotlar</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {doctor.availableSlots.slice(0, 4).map((slot) => (
                        <button
                          key={slot}
                          onClick={() => onSelectDoctorForBooking(doctor, slot)}
                          className="px-2.5 py-1 rounded-lg bg-[#EBF6F0] hover:bg-[#CDEBDD] text-[#176B55] font-bold text-xs transition-colors cursor-pointer"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveDoctorModal(doctor)}
                  className="py-2.5 px-3 rounded-xl border border-[#E2E8E3] hover:bg-[#F7F8F5] text-[#172923] font-semibold text-xs transition-colors cursor-pointer text-center"
                >
                  Profilni ko‘rish
                </button>

                <button
                  onClick={() => onSelectDoctorForBooking(doctor)}
                  className="py-2.5 px-3 rounded-xl bg-[#176B55] hover:bg-[#0F4C3C] text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer text-center"
                >
                  Qabulga yozilish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor Profile Modal */}
      {activeDoctorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E2E8E3] relative max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="relative h-48 bg-[#EBF6F0] shrink-0">
              <img
                src={activeDoctorModal.photoUrl}
                alt={activeDoctorModal.fullName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setActiveDoctorModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#CDEBDD]">
                  {activeDoctorModal.specialty}
                </span>
                <h3 className="text-2xl font-black">{activeDoctorModal.fullName}</h3>
                <p className="text-xs text-white/80">{activeDoctorModal.title}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Demo Notice */}
              <div className="p-3 bg-[#EBF6F0] rounded-xl text-xs text-[#0F4C3C] flex items-center gap-2">
                <ShieldCheck size={16} className="shrink-0 text-[#176B55]" />
                <span>
                  <strong>Demo ma’lumot:</strong> Ushbu profil Elvora Health platformasining ko‘rgazmali namoyishi uchun yaratilgan.
                </span>
              </div>

              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold text-[#68756F] uppercase tracking-wider mb-2">
                  Mutaxassis haqida
                </h4>
                <p className="text-sm text-[#172923] leading-relaxed">
                  {activeDoctorModal.bio}
                </p>
              </div>

              {/* Credentials Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#F7F8F5] border border-[#E2E8E3] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#68756F]">
                    <Award size={14} className="text-[#176B55]" />
                    <span>Ish tajribasi:</span>
                  </div>
                  <p className="text-sm font-bold text-[#172923]">
                    {activeDoctorModal.experienceYears} yil (Demo)
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F8F5] border border-[#E2E8E3] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#68756F]">
                    <GraduationCap size={14} className="text-[#176B55]" />
                    <span>Ma’lumoti:</span>
                  </div>
                  <p className="text-sm font-bold text-[#172923] line-clamp-1">
                    {activeDoctorModal.education}
                  </p>
                </div>
              </div>

              {/* Languages & Working Clinic */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#68756F]">
                  <Globe size={14} className="text-[#176B55]" />
                  <span>Qabul tillari: <strong>{activeDoctorModal.languages.join(', ')}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-[#68756F]">
                  <MapPin size={14} className="text-[#176B55]" />
                  <span>Qabul manzili: <strong>{activeDoctorModal.clinicName} ({activeDoctorModal.roomNumber})</strong></span>
                </div>
              </div>

              {/* Available Slots in Modal */}
              <div className="space-y-2 pt-2 border-t border-[#E2E8E3]">
                <h4 className="text-xs font-bold text-[#172923]">
                  Mavjud bo‘sh vaqtlar:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeDoctorModal.availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => {
                        const doc = activeDoctorModal;
                        setActiveDoctorModal(null);
                        onSelectDoctorForBooking(doc, slot);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#EBF6F0] hover:bg-[#176B55] hover:text-white text-[#176B55] font-bold text-xs transition-colors cursor-pointer"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-6 bg-[#F7F8F5] border-t border-[#E2E8E3] flex items-center justify-between shrink-0">
              <div>
                <span className="text-xs text-[#68756F]">Konsultatsiya to‘lovi</span>
                <div className="text-lg font-black text-[#176B55]">
                  {activeDoctorModal.feeUZS.toLocaleString()} so‘m
                </div>
              </div>

              <button
                onClick={() => {
                  const doc = activeDoctorModal;
                  setActiveDoctorModal(null);
                  onSelectDoctorForBooking(doc);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#176B55] hover:bg-[#0F4C3C] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Calendar size={16} />
                <span>Qabulga yozilish</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
