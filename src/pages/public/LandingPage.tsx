import React, { useRef } from 'react';
import { ElvoraFloatingNavbar } from '../../components/public/ElvoraFloatingNavbar';
import { ElvoraLeakHero } from '../../components/public/ElvoraLeakHero';
import { ElvoraProblemCards } from '../../components/public/ElvoraProblemCards';
import { ElvoraLiveDemoSection } from '../../components/public/ElvoraLiveDemoSection';
import { ElvoraRoiCalculator } from '../../components/public/ElvoraRoiCalculator';
import { ElvoraPricingFaqSection } from '../../components/public/ElvoraPricingFaqSection';
import { PublicFooter } from '../../components/public/PublicFooter';
import { ElvoraCookieBanner } from '../../components/public/ElvoraCookieBanner';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

export const LandingPage: React.FC = () => {
  const pageContainerRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    pageContainerRef,
    () => {
      // Reveal any generic scroll-reveal headers as they enter viewport
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
      className="min-h-screen bg-white text-[#132229] flex flex-col font-sans selection:bg-[#008BFF] selection:text-white relative overflow-x-hidden"
    >
      {/* 0. STICKY FLOATING NAVBAR */}
      <ElvoraFloatingNavbar />

      {/* 1. HERO – "Pul oqib ketmoqda" moment (LEAK & SEAL SIGNATURE WOW MOMENT) */}
      <ElvoraLeakHero />

      {/* 2. THE PROBLEM IN 3 CARDS (No-show, Bo'sh slotlar, Ko'rinmas hisob-kitob) */}
      <ElvoraProblemCards />

      {/* 3. LIVE INTERACTIVE DEMO (The "I Need This" Section) */}
      <ElvoraLiveDemoSection />

      {/* 4. ROI CALCULATOR (4 sliders, animated count-up, self-drawing SVG curve chart) */}
      <ElvoraRoiCalculator />

      {/* 5. PRICING + WORKING DEMO REQUEST FORM + FAQ + FINAL CTA */}
      <ElvoraPricingFaqSection />

      {/* PUBLIC FOOTER */}
      <PublicFooter />

      {/* SMALL & NON-BLOCKING COOKIE BANNER */}
      <ElvoraCookieBanner />
    </div>
  );
};

export default LandingPage;
