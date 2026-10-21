import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Lock,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { MOCK_FAQS, MOCK_PROCESS_STEPS } from '../../data/mockPublicData';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';
import { useApp } from '../../context/AppContext';

export const TrustAndInfoSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('+998 ');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { showToast } = useApp();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim()) {
      showToast('Iltimos, ismingizni kiriting', 'error');
      return;
    }
    setContactSubmitted(true);
    showToast('Demo murojaatingiz qabul qilindi! Tez orada bog‘lanamiz.', 'success');
  };

  useGsapContext(
    containerRef,
    () => {
      gsap.from('.info-card-reveal', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
      });
    },
    []
  );

  return (
    <div id="about" ref={containerRef} className="bg-[#F7F8F5] py-24 space-y-24">
      {/* 1. HOW IT WORKS 3-STEP GUIDE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF6F0] text-xs font-semibold text-[#176B55]">
            <HeartHandshake size={14} />
            <span>Qulay va oson jarayon</span>
          </div>

          <h2 className="section-headline text-[#172923]">
            Platforma qanday ishlaydi?
          </h2>

          <p className="text-lg text-[#68756F]">
            Elvora Health orqali qabulga yozilish va sifatli tibbiy xizmat olish 3 ta oddiy qadamdan iborat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_PROCESS_STEPS.map((item, index) => (
            <div
              key={item.step}
              className="info-card-reveal elvora-card p-8 bg-white relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-5xl font-black text-[#CDEBDD] block">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-[#172923]">{item.title}</h3>
                <p className="text-sm text-[#68756F] leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8E3] flex items-center gap-2 text-xs font-semibold text-[#176B55]">
                <CheckCircle2 size={16} />
                <span>Navbatsiz va kafolatlangan</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ABOUT ELVORA HEALTH EDITORIAL STORY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="info-card-reveal rounded-3xl bg-white border border-[#E2E8E3] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-[#176B55] uppercase tracking-wider">
              Biz haqimizda • Elvora Health Falsafasi
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#172923] leading-tight">
              Tibbiyot xizmatini inson qadr-qimmati va vaqtiga hurmat bilan uyg‘unlashtiramiz.
            </h3>

            <p className="text-base text-[#68756F] leading-relaxed">
              Elvora Health — xususiy tibbiyot markazlari, shifokorlar va bemorlar o‘rtasidagi raqamli ko‘prik. Biz bemorlar uchun ortiqcha kutishlarsiz, shaffof narxlarda qabulga yozilishni; shifokorlar uchun esa qulay grafik va tartibli ish oqimini ta’minlaymiz.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F7F8F5]">
                <ShieldCheck size={22} className="text-[#176B55] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#172923]">Xavfsizlik va Maxfiylik</h4>
                  <p className="text-xs text-[#68756F] mt-1">
                    Bemorlar salomatlik ma’lumotlari himoyalangan va faqat davolovchi shifokor bilan almashiladi.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F7F8F5]">
                <Lock size={22} className="text-[#176B55] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#172923]">Shaffof Standartlar</h4>
                  <p className="text-xs text-[#68756F] mt-1">
                    Yashirin to‘lovlarsiz, rasmiy litsenziyaga ega shifokorlar va tekshirilgan klinikalar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-4/3 border-4 border-[#F7F8F5]">
              <img
                src="/images/clinic_interior.jpg"
                alt="Elvora Health qabulxona"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF6F0] text-xs font-semibold text-[#176B55]">
            <HelpCircle size={14} />
            <span>Savollarga javoblar</span>
          </div>

          <h2 className="section-headline text-[#172923]">
            Ko‘p so‘raladigan savollar.
          </h2>
        </div>

        <div className="space-y-4">
          {MOCK_FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="info-card-reveal elvora-card bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-base text-[#172923]">{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'bg-[#176B55] text-white rotate-180' : 'bg-[#F7F8F5] text-[#68756F]'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#68756F] leading-relaxed border-t border-[#E2E8E3]/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. CONTACT & CONSULTATION REQUEST FORM */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="info-card-reveal rounded-3xl bg-[#FFFFFF] border border-[#E2E8E3] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-[#176B55] uppercase tracking-wider">
              Bog‘lanish va Yordam
            </span>
            <h3 className="text-3xl font-black text-[#172923]">
              Savollaringiz bormi yoki klinika ulashmoqchimisiz?
            </h3>
            <p className="text-sm text-[#68756F]">
              Mutaxassislarimiz barcha savollaringizga mamnuniyat bilan javob berishadi.
            </p>

            <div className="space-y-4 pt-2 text-sm text-[#172923]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBF6F0] flex items-center justify-center text-[#176B55]">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-xs text-[#68756F] block">Markaziy qabulxona</span>
                  <strong>+998 (71) 200-45-45</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBF6F0] flex items-center justify-center text-[#176B55]">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-xs text-[#68756F] block">Elektron pochta</span>
                  <strong>support@elvorahealth.uz</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBF6F0] flex items-center justify-center text-[#176B55]">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-xs text-[#68756F] block">Bosh manzil</span>
                  <strong>Toshkent sh., Mustaqillik shoh ko‘chasi, 42-uy</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#F7F8F5] p-6 sm:p-8 rounded-3xl border border-[#E2E8E3]">
            {contactSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#CDEBDD] text-[#176B55] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-bold text-[#172923]">
                  Murojaatingiz uchun tashakkur!
                </h4>
                <p className="text-xs text-[#68756F] max-w-sm mx-auto">
                  Namuna xabaringiz qabul qilindi. Tez orada operatorimiz siz bilan bog‘lanadi.
                </p>
                <button
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactName('');
                    setContactMessage('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#176B55] text-white text-xs font-bold"
                >
                  Yana xabar yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <h4 className="text-lg font-bold text-[#172923]">
                  Qisqa xabar qoldiring
                </h4>

                <div>
                  <label className="block text-xs font-bold text-[#172923] mb-1">
                    Ismingiz
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Ism va familiyangiz"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2E8E3] text-sm focus:border-[#176B55] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172923] mb-1">
                    Telefon raqamingiz
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2E8E3] text-sm focus:border-[#176B55] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172923] mb-1">
                    Xabaringiz yoki savolingiz
                  </label>
                  <textarea
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Qanday masalada yordam kerak?"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2E8E3] text-sm focus:border-[#176B55] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#176B55] hover:bg-[#0F4C3C] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Send size={16} />
                  <span>Xabarni yuborish (Demo)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
