import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export const ElvoraCookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('elvora_cookie_consent_v1');
      if (!consent) {
        // Show after a subtle delay to avoid layout shift
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is blocked
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('elvora_cookie_consent_v1', 'accepted');
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem('elvora_cookie_consent_v1', 'dismissed');
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie xabarnomasi"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-sm w-[calc(100%-2rem)] bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl p-3.5 sm:p-4 text-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-200 text-[#008BFF] flex items-center justify-center shrink-0 mt-0.5">
          <Cookie size={16} />
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-xs text-slate-600 leading-snug">
            Saytimiz toʻgʻri ishlashi va xizmat sifatini oshirish uchun{' '}
            <span className="text-[#008BFF] font-semibold">cookie fayllaridan</span> foydalanamiz.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="px-3.5 py-1.5 rounded-xl bg-[#008BFF] hover:bg-[#0077DB] text-white text-[11px] font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              Qabul qilish
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-semibold transition-all cursor-pointer"
            >
              Yopish
            </button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
          aria-label="Yopish"
        >
          <X size={15} />
        </button>
      </div>
    </aside>
  );
};

export default ElvoraCookieBanner;
