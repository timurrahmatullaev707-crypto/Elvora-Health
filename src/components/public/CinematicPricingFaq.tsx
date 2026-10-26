import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Building2,
  Lock,
  Phone,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: string;
  priceAnnual: string;
  popular?: boolean;
  features: string[];
  ctaLabel: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'start',
    name: 'Start',
    tagline: 'Kichik klinikalar va ixtisoslashgan kabinetlar uchun',
    priceMonthly: '650 000 UZS / oy',
    priceAnnual: '520 000 UZS / oy (yillik to\'lovda)',
    features: [
      '5 tagacha shifokor kabineti',
      'Bemorlar elektron kartotekasi',
      'Jonli navbat va qabullar boshqaruvi',
      'Asosiy kassa va to\'lovlar hisobi',
      'Bemorlarga SMS eslatmalar (oyiga 500 ta)',
      'Standart texnik qo\'llab-quvvatlash',
    ],
    ctaLabel: 'Start Tarifini Tanlash',
  },
  {
    id: 'pro',
    name: 'Professional (AI)',
    tagline: 'O\'sayotgan tibbiyot markazlari va ko\'p tarmoqli klinikalar uchun',
    priceMonthly: '1 400 000 UZS / oy',
    priceAnnual: '1 120 000 UZS / oy (yillik to\'lovda)',
    popular: true,
    features: [
      '20 tagacha shifokor kabineti',
      'Elvora AI™ Alomatlar Triage va yo\'naltirish',
      'Telegram & SMS avtomatlashtirilgan eslatmalar (cheksiz)',
      'No-Show bo\'sh slotlarni avtomatik to\'ldirish',
      'Kengaytirilgan moliya va xarajatlar tahlili',
      'Laboratoriya tahlillari moduli',
      'Shifokorlar ish yuklamasi va bonus hisoboti',
      '24/7 ustuvor klinik yordam',
    ],
    ctaLabel: 'Professional Tarifga Ulanish',
  },
  {
    id: 'enterprise',
    name: 'Enterprise / Tarmoq',
    tagline: 'Klinikalar tarmog\'i va yirik shifoxonalar uchun',
    priceMonthly: 'Individual taklif',
    priceAnnual: 'Maxsus yillik shartnoma',
    features: [
      'Cheksiz shifokorlar va filiallar',
      'Yagona tarmoq moliya va boshqaruv konsoli',
      'Maxsus AI model trenirovkasi (Klinika protokollari)',
      'Lokal server (on-premise) o\'rnatish imkoniyati',
      'HIS / LIS va sug\'urta tizimlari bilan API integratsiya',
      'Shaxsiy kurator va shifokorlarni joyida o\'qitish',
      'Kengaytirilgan SLA 99.99% xizmat kafolati',
    ],
    ctaLabel: 'Klinika Rahbari Bilan Bog\'lanish',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Bemorlarning tibbiy ma\'lumotlari xavfsizligi qanday ta\'minlanadi?',
    answer:
      'Elvora Health ma\'lumotlar xavfsizligini 256-bitli shifrlash (AES-256) va O\'zbekiston Respublikasining "Shaxsga doir ma\'lumotlar to\'g\'risida"gi qonuniga to\'liq muvofiq holda saqlaydi. Tashqi AI serverlariga yuborishdan avval barcha shaxsiy identifikatorlar (telefon, ism, pasport) tizim ichida avtomatik tarzda maxfiylashtiriladi (anonymization).',
  },
  {
    question: 'Elvora AI shifokor o\'rniga tashxis qo\'yadimi?',
    answer:
      'Mutlaqo yo\'q. Elvora AI qat\'iy xalqaro tibbiy etika qoidalariga rioya qiladi: u hech qachon yakuniy tashxis qo\'ymaydi va dori-darmon yozmaydi. Uning vazifasi — bemorning alomatlarini dastlabki tahlil qilib, uni eng mos bo\'lgan shifokorga yo\'naltirish va qabulga yozilishini osonlashtirishdan iborat.',
  },
  {
    question: 'Mavjud klinik jurnallari va Excel ma\'lumotlarini o\'tkazish mumkinmi?',
    answer:
      'Ha, albatta. Elvora muhandislari mavjud bemorlar bazasini, shifokorlar ro\'yxatini va narxlar spetsifikatsiyasini tizimga bepul import qilib berishadi. O\'tish jarayoni klinika ish faoliyatini to\'xtatmagan holda 1 kunda amalga oshiriladi.',
  },
  {
    question: 'Klinika xodimlarini o\'qitish qanday amalga oshiriladi?',
    answer:
      'Tizim interfeysi intuitiv va sodda qilib loyihalashtirilgan. Shunga qaramay, har bir mijoz uchun klinika qabulxona xodimlari va shifokorlariga bepul onlayn yoki oflayn 1 kunlik o\'quv master-klassi o\'tkaziladi va video yo\'riqnomalar taqdim etiladi.',
  },
  {
    question: 'Telegram orqali eslatmalar qanday ishlaydi?',
    answer:
      'Qabulga yozilgan bemorga klinika nomidagi rasmiy Telegram Bot orqali chiroyli interaktiv xabar va QR-chipta boradi. Bemor 1 tugma bilan qabulni tasdiqlashi yoki boshqa kunga ko\'chirishi mumkin. Agar bemor bekor qilsa, kassa va shifokor darchasi bir zumda boshqa bemor uchun ochiladi.',
  },
];

export const CinematicPricingFaq: React.FC = () => {
  const { showToast } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Demo Request Modal State
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoClinicName, setDemoClinicName] = useState('');
  const [demoDoctorCount, setDemoDoctorCount] = useState('5-15');
  const [demoContactPhone, setDemoContactPhone] = useState('+998 ');
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoClinicName.trim() || demoContactPhone.length < 9) {
      showToast('Iltimos, ma\'lumotlarni to\'liq kiriting', 'error');
      return;
    }
    setDemoSubmitted(true);
    showToast('Demo taqdimot so\'rovi qabul qilindi. Mutaxassisimiz bog\'lanadi.', 'success');
  };

  return (
    <section id="tariflar" className="py-24 lg:py-32 bg-[#F8FAFC] relative border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0284C7]">
            <Zap size={13} />
            <span>Shaffof Va Moslashuvchan Tariflar</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
            Har Qanday Klinikaga{' '}
            <span className="bg-gradient-to-r from-[#0284C7] to-[#0D9488] bg-clip-text text-transparent">
              Moslashuvchan Rejalar
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Yashirin to'lovlar yo'q. Istalgan vaqtda tarifni o'zgartirish yoki bekor qilish imkoniyati.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-200/80 border border-slate-300/60 mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Oylik To'lov
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white text-[#0D9488] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0D9488]'
              }`}
            >
              <span>Yillik To'lov</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-100 text-emerald-800 font-extrabold">
                -20% Chegirma
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24 items-stretch">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                tier.popular
                  ? 'bg-[#0F172A] text-white shadow-2xl border-2 border-teal-400 ring-4 ring-teal-400/10'
                  : 'bg-white text-[#0F172A] border border-[#E2E8F0] shadow-sm hover:shadow-md'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-teal-400 to-[#0284C7] text-[#0F172A] text-[11px] font-black tracking-wider uppercase shadow-md">
                  Eng Ommabop Tanlov
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-extrabold">{tier.name}</h3>
                  {tier.popular && <Sparkles size={18} className="text-teal-300" />}
                </div>

                <p
                  className={`text-xs mb-6 ${
                    tier.popular ? 'text-slate-300' : 'text-[#64748B]'
                  }`}
                >
                  {tier.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-slate-200/20">
                  <div className="text-2xl sm:text-3xl font-black">
                    {billingCycle === 'monthly' ? tier.priceMonthly : tier.priceAnnual}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs leading-normal">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          tier.popular
                            ? 'bg-teal-400 text-[#0F172A]'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className={tier.popular ? 'text-slate-200' : 'text-[#334155]'}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-teal-400 hover:bg-teal-300 text-[#0F172A] shadow-md shadow-teal-400/20'
                      : 'bg-[#0F172A] hover:bg-[#1E293B] text-white'
                  }`}
                >
                  <span>{tier.ctaLabel}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-[#E2E8F0]">
          <div className="text-center mb-12 space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Tez-tez Beriladigan Savollar (FAQ)
            </h3>
            <p className="text-sm text-[#64748B]">
              Klinika rahbarlari va bosh shifokorlarni eng ko'p qiziqtirgan savollarga aniq javoblar.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0F172A] hover:text-[#0284C7] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-[#64748B] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#0284C7]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#475569] leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Demo Request Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                setIsDemoModalOpen(false);
                setDemoSubmitted(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>

            {demoSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">So'rovingiz Qabul Qilindi!</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Elvora mutaxassisi 15 daqiqa ichida siz bilan bog'lanadi va klinikangiz uchun shaxsiy demo hisobini faollashtiradi.
                </p>
                <button
                  onClick={() => setIsDemoModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold"
                >
                  Yopish
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 space-y-1">
                  <h3 className="text-lg font-bold text-[#0F172A]">Bepul Demo Taqdimot Olish</h3>
                  <p className="text-xs text-[#64748B]">Klinikangiz uchun Elvora Health imkoniyatlarini sinab ko'ring</p>
                </div>

                <form onSubmit={handleDemoSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Klinika Nomi:</label>
                    <input
                      type="text"
                      required
                      value={demoClinicName}
                      onChange={(e) => setDemoClinicName(e.target.value)}
                      placeholder="Masalan: Shifo Med Markazi"
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Shifokorlar Soni:</label>
                    <select
                      value={demoDoctorCount}
                      onChange={(e) => setDemoDoctorCount(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                    >
                      <option value="1-5">1 dan 5 tagacha</option>
                      <option value="5-15">5 dan 15 tagacha</option>
                      <option value="15-30">15 dan 30 tagacha</option>
                      <option value="30+">30 dan ortiq</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Telefon Raqamingiz:</label>
                    <input
                      type="tel"
                      required
                      value={demoContactPhone}
                      onChange={(e) => setDemoContactPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold transition-all shadow-md"
                    >
                      Demo Taqdimotni Tasdiqlash
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CinematicPricingFaq;
