import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function useGsapContext(
  scopeRef: React.RefObject<HTMLElement | null>,
  animationFn: (ctx: gsap.Context) => void,
  deps: any[] = []
) {
  useEffect(() => {
    if (typeof window === 'undefined' || !scopeRef.current) {
      return;
    }

    // Respect reduced motion preferences
    try {
      const prefersReducedMotion =
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        return;
      }
    } catch {
      // Fallback if matchMedia is unavailable
    }

    let ctx: gsap.Context | null = null;
    try {
      ctx = gsap.context(() => {
        animationFn(ctx!);
      }, scopeRef.current);

      // Refresh ScrollTrigger after DOM has settled to ensure trigger points are exact
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    } catch (e) {
      console.warn('GSAP animation initialization warning:', e);
    }

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, deps);
}

export default useGsapContext;
