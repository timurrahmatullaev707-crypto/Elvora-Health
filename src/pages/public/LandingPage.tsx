import React, { useState } from 'react';
import { PublicNavbar } from '../../components/public/PublicNavbar';
import { HeroSection } from '../../components/public/HeroSection';
import { ServicesSection } from '../../components/public/ServicesSection';
import { DoctorsSection } from '../../components/public/DoctorsSection';
import { SmartClinicFlowSection } from '../../components/public/SmartClinicFlowSection';
import { ClinicDiscoverySection } from '../../components/public/ClinicDiscoverySection';
import { AppointmentBookingFlow } from '../../components/public/AppointmentBookingFlow';
import { TrustAndInfoSection } from '../../components/public/TrustAndInfoSection';
import { PublicFooter } from '../../components/public/PublicFooter';
import { MedicalServiceItem, PublicDoctor, ClinicItem } from '../../data/mockPublicData';

export const LandingPage: React.FC = () => {
  // Global booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<MedicalServiceItem | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<PublicDoctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleOpenBooking = () => {
    setSelectedService(null);
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setIsBookingModalOpen(true);
  };

  const handleSelectServiceForBooking = (service: MedicalServiceItem) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const handleSelectDoctorForBooking = (doctor: PublicDoctor, slot?: string) => {
    setSelectedDoctor(doctor);
    if (slot) setSelectedSlot(slot);
    setIsBookingModalOpen(true);
  };

  const handleBookAtClinic = (clinic: ClinicItem) => {
    setIsBookingModalOpen(true);
  };

  const handleExploreDoctors = () => {
    const el = document.getElementById('doctors');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F5] text-[#172923] flex flex-col selection:bg-[#CDEBDD] selection:text-[#176B55]">
      {/* 1. Header with Brand & Navigation */}
      <PublicNavbar onOpenBooking={handleOpenBooking} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          onOpenBooking={handleOpenBooking}
          onExploreDoctors={handleExploreDoctors}
        />

        {/* 3. Medical Services Section */}
        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* 4. Doctors Section */}
        <DoctorsSection
          onSelectDoctorForBooking={handleSelectDoctorForBooking}
        />

        {/* 5. Signature Feature: Smart Clinic Flow (Live Queue & Patient Journey) */}
        <SmartClinicFlowSection />

        {/* 6. Clinic Discovery Section */}
        <ClinicDiscoverySection
          onBookAtClinic={handleBookAtClinic}
        />

        {/* 7. Inline Interactive Booking Flow */}
        <AppointmentBookingFlow />

        {/* 8. Trust, Philosophy, FAQs, and Contact Form */}
        <TrustAndInfoSection />
      </main>

      {/* 9. Professional Public Footer */}
      <PublicFooter />

      {/* 10. Interactive Booking Modal when triggered from buttons */}
      {isBookingModalOpen && (
        <AppointmentBookingFlow
          isOpenModal={true}
          initialService={selectedService}
          initialDoctor={selectedDoctor}
          initialSlot={selectedSlot}
          onCloseModal={() => setIsBookingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default LandingPage;
