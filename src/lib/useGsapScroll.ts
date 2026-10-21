import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function useGsapContext(scopeRef: React.RefObject<HTMLElement | null>, animationFn: (ctx: gsap.Context) => void, deps: any[] = []) {
  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !scopeRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      animationFn(ctx);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
  }, deps);
}
