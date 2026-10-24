import React from 'react';
import { ShieldCheck, Lock, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

interface AiConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  consented: boolean;
  onToggleConsent: (consented: boolean) => void;
}

export const AiConsentModal: React.FC<AiConsentModalProps> = ({
  isOpen,
  onClose,
  consented,
  onToggleConsent,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#DFE8E4] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#06142B] to-[#0A2540] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00D2B4]/20 border border-[#00D2B4]/40 flex items-center justify-center text-[#00D2B4]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Tibbiy ma'lumotlar maxfiyligi</h3>
              <p className="text-xs text-white/70">O'RQ-547 va klinik xavfsizlik standartlari</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-[#2C3E50] max-h-[60vh] overflow-y-auto">
          <div className="p-3.5 rounded-2xl bg-[#EBF7FC] border border-[#BAE6FD] flex items-start gap-3">
            <Lock className="text-[#0D34B4] shrink-0 mt-0.5" size={18} />
            <div className="space-y-1">
              <p className="font-bold text-[#0D34B4]">Shaxsiy identifikatorlar (PII) to'liq himoyalangan</p>
              <p className="text-[#3A5B75] leading-relaxed">
                Sun'iy intellektga yuboriladigan har qanday alomatlar yoki savollardan telefon raqamlari, passport ma'lumotlari va to'liq ismlar avtomatik tarzda tozalanadi (anonimlashtiriladi).
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-sm text-[#132229]">Asosiy shartlar:</h4>
            <ul className="space-y-2 list-disc list-inside text-[#5F737B] leading-relaxed">
              <li>
                <strong>Shifokor nazorati:</strong> Elvora AI™ faqat axborot beruvchi va dastlabki yo'naltiruvchi yordamchidir. Yakuniy tibbiy tashxis faqat malakali shifokor tomonidan qo'yiladi.
              </li>
              <li>
                <strong>Dori vositalari cheklovi:</strong> AI tizimi dori-darmonlar, antibiotiklar yoki ularning aniq dozalarini tavsiya qilish huquqiga ega emas.
              </li>
              <li>
                <strong>Ma'lumotlar saqlanishi:</strong> Shaxsiy tibbiy ma'lumotlar tashqi neyrotarmoqlarni qayta o'qitish (training) uchun ishlatilmaydi.
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-3">
            <AlertCircle className="text-[#B45309] shrink-0 mt-0.5" size={18} />
            <p className="text-[#92400E] leading-relaxed">
              Shoshilinch alomatlar (kuchli ko'krak og'rig'i, insult belgilari, qon ketishi) aniqlanganda, tizim darhol 103 Tez yordam chaqirishni talab qiladi.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 bg-[#F8FAF9] border-t border-[#DFE8E4] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="consentCheckbox"
              checked={consented}
              onChange={(e) => onToggleConsent(e.target.checked)}
              className="w-4 h-4 rounded text-[#059669] focus:ring-[#059669] border-[#DFE8E4]"
            />
            <label htmlFor="consentCheckbox" className="text-xs font-semibold text-[#132229] cursor-pointer">
              Shartlar bilan tanishdim va roziman
            </label>
          </div>

          <Button
            size="sm"
            variant={consented ? 'primary' : 'outline'}
            icon={<CheckCircle2 size={16} />}
            onClick={onClose}
          >
            Saqlash va davom etish
          </Button>
        </div>
      </div>
    </div>
  );
};
