import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Sparkles, ArrowRight } from 'lucide-react';
import { PlanFeature, SubscriptionPlan } from '../../types';
import { hasFeature, getFeatureTitleUz } from '../../lib/featureGating';
import { useApp } from '../../context/AppContext';

interface FeatureGateProps {
  feature: PlanFeature;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiredPlanName?: string;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({
  feature,
  children,
  fallback,
  requiredPlanName = 'Pro yoki Business',
}) => {
  const { currentPlan } = useApp();
  const isAllowed = hasFeature(currentPlan, feature);

  if (isAllowed) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-cyan-50/40 border-2 border-dashed border-cyan-200/80 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto my-8 shadow-sm">
      <div className="w-16 h-16 rounded-2xl bg-cyan-100/80 border border-cyan-300 text-[#008BFF] flex items-center justify-center mx-auto mb-4 shadow-xs">
        <Lock size={28} />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/60 text-[#008BFF] text-xs font-bold mb-3">
        <Sparkles size={13} />
        <span>Eksklyuziv Imkoniyat</span>
      </div>

      <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">
        {getFeatureTitleUz(feature)}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
        Ushbu imkoniyatdan foydalanish uchun <strong>{requiredPlanName}</strong> tarifi talab qilinadi.
        Klinikangiz boshqaruvini yangi bosqichga olib chiqing.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/app/subscription"
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <span>Tarifni Oshirish</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};
