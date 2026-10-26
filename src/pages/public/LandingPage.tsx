import React, { useRef } from 'react';
import { ElvoraFloatingNavbar } from '../../components/public/ElvoraFloatingNavbar';
import { CinematicHero } from '../../components/public/CinematicHero';
import { CinematicScrollExperience } from '../../components/public/CinematicScrollExperience';
import { CinematicAnalyticsSection } from '../../components/public/CinematicAnalyticsSection';
import { RealBookingSection } from '../../components/public/RealBookingSection';
import { CinematicRoiCalculator } from '../../components/public/CinematicRoiCalculator';
import { CinematicPricingFaq } from '../../components/public/CinematicPricingFaq';
import { PublicFooter } from '../../components/public/PublicFooter';
import { ElvoraCookieBanner } from '../../components/public/ElvoraCookieBanner';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

export const LandingPage: React.FC = () => {
  const pageContainerRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    pageContainerRef,
    () => {
      // Reveal any generic scroll-reveal elements as they enter viewport
      gsap.utils.toArray<HTMLElement>('.scroll-reveal-header').forEach((header) => {
        gsap.fromTo(
          header,
          { y: 25, opacity: 0.3 },
          {
            scrollTrigger: {
              trigger: header,
              start: 'top 95%',
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'all',
          }
        );
      });
    },
    []
  );

  return (
    <div
      ref={pageContainerRef}
      className="min-h-screen bg-white text-[#0F172A] flex flex-col font-sans selection:bg-[#0284C7] selection:text-white relative overflow-x-hidden"
    >
      {/* 0. STICKY FLOATING APPLE-STYLE NAVBAR */}
      <ElvoraFloatingNavbar />

      {/* 1. CINEMATIC HERO SECTION WITH LIVE MEDICAL PREVIEW */}
      <CinematicHero />

      {/* 2. CINEMATIC SCROLL EXPERIENCE (GSAP PINNED STORYTELLING) */}
      <CinematicScrollExperience />

      {/* 3. CLINICAL ANALYTICS & REVENUE RECOVERY (RECHARTS) */}
      <CinematicAnalyticsSection />

      {/* 5. REAL APPOINTMENT BOOKING WITH INSTANT DIGITAL PASS */}
      <RealBookingSection />

      {/* 6. INTERACTIVE CLINIC ROI CALCULATOR */}
      <CinematicRoiCalculator />

      {/* 7. TRANSPARENT PRICING, FAQ ACCORDION & WORKING DEMO MODAL */}
      <CinematicPricingFaq />

      {/* 8. WORLD-CLASS PUBLIC FOOTER WITH SAFETY WARNINGS */}
      <PublicFooter />

      {/* 9. NON-BLOCKING COOKIE BANNER */}
      <ElvoraCookieBanner />
    </div>
  );
};

export default LandingPage;
