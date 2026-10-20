import React from 'react';
import {
  CreditCard,
  Check,
  Sparkles,
  Building2,
  Zap,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SubscriptionPlan } from '../types';

export const SubscriptionPage: React.FC = () => {
  const { currentPlan, setCurrentPlan, showToast } = useApp();

  const plans = [
    {
      id: 'basic' as SubscriptionPlan,
      name: 'Basic',
      tagline: 'Kichik shifoxonalar va yakka amaliyotlar uchun',
      price: '590 000',
      period: 'oyiga',
      isPopular: false,
      features: [
        'Bemorlar kartotekasi (cheksiz)',
        'Shifokorlar ish jadvali va qabul soatlari',
        'Qabullar ro\'yxati va navbat',
        'Asosiy kirim va chiqim hisobi',
        'Standart boshqaruv paneli (Dashboard)',
        'Bitta filial boshqaruvi',
      ],
      notIncluded: [
        'Elvora Insights™ aqlli tahlil markazi',
        'Avtomatlashtirilgan SMS/Telegram eslatmalar',
        'Kengaytirilgan rentabellik hisobotlari',
        'Ko\'p filialli konsolidatsiya',
      ],
    },
    {
      id: 'pro' as SubscriptionPlan,
      name: 'Pro (Tavsiya etiladi)',
      tagline: 'Rivojlanayotgan xususiy klinikalar uchun aqlli tizim',
      price: '1 290 000',
      period: 'oyiga',
      isPopular: true,
      features: [
        'Basic dagi barcha imkoniyatlar',
        'Elvora Insights™ (Bo\'sh slotlar va no-show tahlili)',
        'Avtomatlashtirilgan SMS/Telegram eslatmalar moduli',
        'Kengaytirilgan moliyaviy hisobotlar va eksport (CSV/PDF)',
        'Shifokorlar samaradorligi va daromad hisob-kitobi',
        'Tranzaksiyalarni bekor qilish (Void) va audit arxivi',
        'Tezkor ustuvor texnik yordam',
      ],
      notIncluded: [
        'Ko\'p filialli boshqaruv va yagona tarmoq nazorati',
      ],
    },
    {
      id: 'business' as SubscriptionPlan,
      name: 'Business Network',
      tagline: 'Klinikalar tarmog\'i va yirik tibbiyot markazlari',
      price: '2 490 000',
      period: 'oyiga',
      isPopular: false,
      features: [
        'Pro dagi barcha imkoniyatlar',
        'Ko\'p filialli (Multi-branch) boshqaruv',
        'Konsolidatsiyalangan yagona moliyaviy hisobot',
        'Kengaytirilgan foydalanuvchi huquqlari (RBAC Custom)',
        'Klinikalararo bemorlar kartalarini integratsiya qilish',
        'Maxsus shaxsiy menejer va 24/7 SLA xizmati',
      ],
      notIncluded: [],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[11px] font-bold text-[#008BFF] uppercase tracking-wider bg-cyan-100/80 px-3 py-1 rounded-full border border-cyan-300">
          Tariflar va imkoniyatlar
        </span>
        <h1 className="text-2xl font-bold text-[#132229] tracking-tight">
          Klinikangiz o'sishiga mos tarif rejasini tanlang
        </h1>
        <p className="text-xs text-[#5F737B]">
          Prezentatsiya davomida istalgan tarifni faollashtirib, uning imkoniyatlarini darhol sinab ko'rishingiz mumkin
        </p>
      </div>

      {/* Demo Notice Banner */}
      <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-3 shadow-xs">
        <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold">
            Demo rejim: haqiqiy to‘lov ulanmagan.
          </p>
          <p className="text-amber-800 leading-relaxed text-[11px]">
            Haqiqiy pul yechib olinmaydi. Tarifni o'zgartirish tizim imkoniyatlarini (Elvora Insights, eksportlar, ruxsatnomalar) darhol ochish yoki yopishni sinab ko'rish uchun ishlaydi. Payme va Click to‘lov shlyuzlari ishlab chiqarish serveriga ulanishi rejalashtirilgan (hozirda uzilgan holatda).
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;

          return (
            <Card
              key={plan.id}
              className={`relative flex flex-col justify-between p-6 transition-all ${
                plan.isPopular
                  ? 'border-2 border-[#0D7C74] shadow-lg ring-4 ring-[#0D7C74]/5'
                  : 'border-[#DFE8E4]'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0D7C74] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                  Eng ommabop
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-[#132229]">{plan.name}</h3>
                  {isCurrent && (
                    <span className="text-[10px] font-bold bg-[#E6F5F0] text-[#085F59] px-2 py-0.5 rounded border border-[#B7E2D8]">
                      Joriy reja
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#5F737B] min-h-[32px]">{plan.tagline}</p>

                {/* Price */}
                <div className="mt-4 mb-6 pb-4 border-b border-[#DFE8E4]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-[#132229]">
                      {plan.price}
                    </span>
                    <span className="text-xs text-[#5F737B]">UZS / {plan.period}</span>
                  </div>
                </div>

                {/* Features Included */}
                <div className="space-y-2.5 text-xs">
                  <span className="font-bold text-[#132229] text-[11px] block">
                    Kiritilgan imkoniyatlar:
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[#5F737B]">
                      <Check size={14} className="text-[#0D7C74] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}

                  {/* Not included */}
                  {plan.notIncluded.map((feat, idx) => (
                    <div
                      key={`not-${idx}`}
                      className="flex items-start gap-2 text-[#5F737B]/60 opacity-60"
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-gray-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        -
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-[#DFE8E4]">
                <Button
                  variant={isCurrent ? 'secondary' : plan.isPopular ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => setCurrentPlan(plan.id)}
                >
                  {isCurrent ? 'Aktiv reja' : `${plan.name} ga o'tish (Simulyatsiya)`}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-[#F8FAF9] border border-[#DFE8E4] text-xs text-[#5F737B] flex items-start gap-3">
        <AlertCircle size={18} className="text-[#0D7C74] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Investorlar uchun eslatma:</strong> Tarif rejalarini almashtirish to'liq simulyatsiya qilingan va ilovaning boshqa sahifalaridagi (Elvora Insights, Hisobotlar) imkoniyatlar bloklanishi yoki ochilishini darhol ko'rsatib beradi. To'lov tizimlari (Payme/Click) integratsiyasi shartnomalar tuzilgach faollashtiriladi.
        </p>
      </div>
    </div>
  );
};
