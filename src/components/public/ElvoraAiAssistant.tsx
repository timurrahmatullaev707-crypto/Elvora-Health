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

export const ElvoraAiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Assalomu alaykum! Men Elvora Health Ekotizimining sun\'iy intellekt tibbiy yordamchisi "Muxlisa"man. Qanday shikoyat yoki tibbiy xizmat bo‘yicha yordam bera olaman?',
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
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border-2 border-cyan-200 shadow-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#008BFF] via-[#00B4D8] to-[#0D34B4] text-white flex items-center justify-center font-bold shadow-md">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Elvora AI & Muxlisa
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-100/80 text-[#008BFF] px-2.5 py-0.5 rounded-full border border-cyan-300">
                Sun'iy Intellekt Skriningi
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Bemor shikoyatlarini dastlabki saralash va mos mutaxassisga tezkor yo‘naltirish
            </p>
          </div>
        </div>

        <span className="hidden sm:flex items-center gap-1.5 text-xs text-[#008BFF] font-bold bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
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
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#008BFF] to-[#0D34B4] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot size={16} />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-4 space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white font-medium rounded-tr-none'
                  : 'bg-cyan-50/70 border border-cyan-200/60 text-slate-800 rounded-tl-none'
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>

              {/* Action Card (Doctor Recommendation) */}
              {msg.action && (
                <div className="bg-white rounded-xl border border-cyan-200 p-3 shadow-xs space-y-2 mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Stethoscope size={14} className="text-[#008BFF]" />
                      {msg.action.doctorName}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {msg.action.specialty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                    <span className="text-slate-600 flex items-center gap-1">
                      <Clock size={12} className="text-[#008BFF]" />
                      {msg.action.time}
                    </span>
                    <span className="font-black text-[#008BFF]">{msg.action.fee}</span>
                  </div>

                  <a
                    href="#portal"
                    className="block w-full text-center py-2 rounded-lg bg-gradient-to-r from-[#008BFF] to-[#0D34B4] hover:shadow-md text-white font-bold text-xs transition-all shadow-2xs cursor-pointer active:scale-98"
                  >
                    Ushbu shifokorga E-Navbat olish →
                  </a>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                <User size={16} />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <span className="w-2 h-2 rounded-full bg-[#008BFF] animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-[#008BFF] animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-[#008BFF] animate-bounce [animation-delay:0.4s]" />
            <span>Muxlisa tahlil qilmoqda...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Tezkor simptomlar namunasi:
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(q)}
              className="text-[11px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:border-[#008BFF] hover:bg-cyan-50/50 hover:text-[#008BFF] px-3 py-1.5 rounded-full transition-colors cursor-pointer text-left"
            >
              ⚡ {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputVal.trim()) return;
          handleSendPrompt(inputVal);
          setInputVal('');
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Shikoyatingizni yoki savolingizni yozing (masalan: qon bosimi, tish og‘rig‘i)..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#008BFF] focus:bg-white transition-colors"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          <span>Yuborish</span>
          <Send size={13} />
        </button>
      </form>
    </div>
  );
};
