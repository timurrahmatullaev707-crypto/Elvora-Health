import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  User,
  ArrowRight,
  Stethoscope,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  action?: {
    doctorName: string;
    specialty: string;
    time: string;
    fee: string;
  };
}

export const DmedAiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Assalomu alaykum! Men Elvora Health Ekotizimining sun\'iy intellekt tibbiy yordamchisi "Muxlisa"man. Sizga qaysi shifokor yoki tibbiy xizmat bo‘yicha yordam bera olaman?',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Yurak sohasida noqulaylik va qon bosimi',
    'Farzandim uchun pediatr ko\'rigi va emlash',
    'Bosh og\'rig\'i va nevropatolog maslahati',
  ];

  const handleSendPrompt = (promptText: string) => {
    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: promptText }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (promptText.includes('Yurak')) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: 'Simptomlar tahlili: Yurak sohasidagi noqulaylik va qon bosimi o‘zgarishida kardiolog ko‘rigi va EKG tekshiruvi tavsiya etiladi. Klinikada eng tajribali kardiolog mutaxassisiga bugun bo‘sh qabul vaqti mavjud:',
            action: {
              doctorName: 'Dr. Anvar Usmonov',
              specialty: 'Oliy toifali Kardiolog',
              time: 'Bugun, 14:00 (102-xona)',
              fee: '150 000 UZS',
            },
          },
        ]);
      } else if (promptText.includes('pediatr')) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: 'Pediatriya yo‘nalishi: Bolalar salomatligi va emlash taqvimi bo‘yicha pediatrimiz Dr. Shahnoza Aliyeva bugun qabul o‘tkazmoqda. Elektron navbat oling:',
            action: {
              doctorName: 'Dr. Shahnoza Aliyeva',
              specialty: 'Pediatr-Neonatolog',
              time: 'Bugun, 15:30 (201-xona)',
              fee: '130 000 UZS',
            },
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: 'Nevrologiya maslahati: Bosh og‘rig‘i va uyqusizlik holatlarida nevropatolog shifokorimiz ko‘rigidan o‘tish zarur. Bo‘sh vaqt slotlari:',
            action: {
              doctorName: 'Dr. Bobur Mirzayev',
              specialty: 'Nevropatolog (12 yillik staj)',
              time: 'Bugun, 16:00 (204-xona)',
              fee: '160 000 UZS',
            },
          },
        ]);
      }
    }, 700);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border-2 border-[#DFE8E4] shadow-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#DFE8E4]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#008BFF] to-[#14B8A6] text-white flex items-center justify-center font-bold shadow-md">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-[#132229]">
                Elvora AI & Muxlisa
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EBF7FC] text-[#008BFF] px-2 py-0.5 rounded-full border border-[#BAE6FD]">
                Sun'iy Intellekt Skriningi
              </span>
            </div>
            <p className="text-xs text-[#5F737B]">
              Bemor shikoyatlarini dastlabki saralash va mos mutaxassisga tezkor yo‘naltirish
            </p>
          </div>
        </div>

        <span className="hidden sm:flex items-center gap-1.5 text-xs text-[#008BFF] font-bold bg-[#EBF7FC] px-3 py-1 rounded-full border border-[#BAE6FD]">
          <span className="w-2 h-2 rounded-full bg-[#008BFF] animate-ping" />
          Onlayn Aloqada
        </span>
      </div>

      {/* Chat Messages Log */}
      <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 text-xs ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-xl bg-[#008BFF] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot size={16} />
              </div>
            )}

            <div
              className={`p-3.5 rounded-2xl max-w-lg leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#008BFF] text-white rounded-br-xs font-medium'
                  : 'bg-[#F4F7F5] text-[#132229] border border-[#DFE8E4] rounded-bl-xs'
              }`}
            >
              <p>{msg.text}</p>

              {/* Action Card recommendation */}
              {msg.action && (
                <div className="mt-3 p-3 rounded-xl bg-white border border-[#DFE8E4] text-[#132229] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-extrabold text-[#132229]">{msg.action.doctorName}</h5>
                      <span className="text-[11px] text-[#008BFF] font-bold">{msg.action.specialty}</span>
                    </div>
                    <span className="text-xs font-black text-emerald-700">{msg.action.fee}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#5F737B] pt-1 border-t border-[#DFE8E4]">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {msg.action.time}
                    </span>
                    <a
                      href="#portal"
                      className="px-2.5 py-1 rounded-lg bg-[#008BFF] text-white font-bold text-[10px] hover:bg-[#0D34B4] transition-colors"
                    >
                      Navbat olish →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                <User size={16} />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#5F737B] p-2">
            <span className="w-2 h-2 rounded-full bg-[#008BFF] animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-[#008BFF] animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-[#008BFF] animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px]">Muxlisa javob tayyorlamoqda...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts to click */}
      <div className="space-y-1.5 pt-2 border-t border-[#DFE8E4]">
        <span className="text-[11px] font-bold text-[#5F737B] uppercase tracking-wider">
          Tezkor savollarni sinab ko‘ring:
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(p)}
              className="px-3 py-1.5 rounded-xl bg-[#F4F7F5] hover:bg-[#EBF7FC] hover:text-[#008BFF] border border-[#DFE8E4] text-xs font-semibold text-[#132229] transition-all cursor-pointer"
            >
              💬 {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
