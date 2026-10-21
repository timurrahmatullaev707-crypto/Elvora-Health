import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  User,
  ArrowRight,
  Stethoscope,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Calendar,
  DollarSign,
  Heart,
  Brain,
  Baby,
} from 'lucide-react';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  referral?: {
    doctorName: string;
    specialty: string;
    room: string;
    availableTime: string;
    consultationFee: string;
    booked?: boolean;
  };
}

export const ElvoraDoniyorAiSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Assalomu alaykum! Men Elvora Health ekotizimining raqamli triaj yordamchisi "Doniyor AI"man. Sizni qanday bezovtalik yoki tibbiy alomatlar qiynamoqda? Menga oʻz soʻzlaringiz bilan tushuntiring, men toʻgʻri shifokor va boʻsh qabul vaqtini taklif qilaman.',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bookedStatus, setBookedStatus] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const quickPrompts = [
    {
      label: 'Yurak sohasida sanchiq va qon bosimi',
      icon: <Heart size={13} className="text-red-500" />,
      query: 'Yurak sohasida sanchiq bor va qon bosimim koʻtarilib tushmoqda',
      response:
        'Siz aytgan alomatlar (koʻkrak qafasidagi sanchiq va arterial bosim tebranishi) kardiologiya yoʻnalishiga tegishli. Kechiktirmasdan EKG tekshiruvi va mutaxassis koʻrigi tavsiya etiladi. Bugun klinikada qabul oʻtkazayotgan shifokor:',
      referral: {
        doctorName: 'Dr. Anvar Usmonov',
        specialty: 'Oliy toifali Kardiolog (18 yillik tajriba)',
        room: '102-xona (Kardiologiya)',
        availableTime: 'Bugun, 15:30 (Boʻsh slot)',
        consultationFee: '160 000 UZS',
      },
    },
    {
      label: 'Bosh ogʻrigʻi, uyqusizlik va bosh aylanishi',
      icon: <Brain size={13} className="text-purple-500" />,
      query: 'Kuchli bosh ogʻrigʻi, bosh aylanishi va uyqusizlik qiynamoqda',
      response:
        'Ushbu shikoyatlar nevrologik zoʻriqish yoki miya qon aylanishi oʻzgarishiga ishora qilishi mumkin. Nevropatolog maslahati va qon-tomirlar doplerografiyasi tavsiya qilinadi:',
      referral: {
        doctorName: 'Dr. Nigora Karimova',
        specialty: 'Nevropatolog, tibbiyot fanlari nomzodi',
        room: '204-xona (Nevrologiya)',
        availableTime: 'Bugun, 16:45 (Boʻsh slot)',
        consultationFee: '150 000 UZS',
      },
    },
    {
      label: 'Bolada tana harorati va yoʻtal',
      icon: <Baby size={13} className="text-amber-500" />,
      query: 'Farzandimning tana harorati 38°C ga chiqdi va quruq yoʻtal boshlandi',
      response:
        'Bolalardagi isitma va nafas yoʻllari alomatlarida oʻz bilgicha antibiotik berish qatʼiyan tavsiya etilmaydi. Pediatr zudlik bilan oʻpka auskultatsiyasini amalga oshirishi zarur:',
      referral: {
        doctorName: 'Dr. Shahnoza Aliyeva',
        specialty: 'Pediatr-neonatolog',
        room: '108-xona (Pediatriya boʻlimi)',
        availableTime: 'Bugun, 14:15 (Zudlik bilan)',
        consultationFee: '140 000 UZS',
      },
    },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    // Add user message
    const userMsgId = 'user-' + Date.now();
    setMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text }]);
    setInputVal('');
    setIsTyping(true);

    // Find match or fallback
    const matchedPrompt = quickPrompts.find(
      (p) => text.toLowerCase().includes(p.label.toLowerCase().slice(0, 8)) || text === p.query
    );

    setTimeout(() => {
      setIsTyping(false);
      const aiMsgId = 'ai-' + Date.now();
      if (matchedPrompt) {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: 'ai',
            text: matchedPrompt.response,
            referral: matchedPrompt.referral,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: 'ai',
            text: `Shikoyatingiz qabul qilindi: "${text}". Dastlabki saralashga koʻra, umumiy amaliyot shifokori (Terapevt) koʻrigi talab etiladi. Shifokor umumiy tahlillarni tayinlaydi va kerak boʻlsa tor mutaxassisga yoʻnaltiradi:`,
            referral: {
              doctorName: 'Dr. Bobur Mansurov',
              specialty: 'Katta Terapevt-diagnost',
              room: '101-xona (Birlamchi qabul)',
              availableTime: 'Bugun, 16:00',
              consultationFee: '120 000 UZS',
            },
          },
        ]);
      }
    }, 1200);
  };

  const handleBookReferral = (doctorName: string, time: string) => {
    setBookedStatus(`${doctorName} qabuliga (${time}) elektron navbat tasdiqlandi!`);
    setTimeout(() => setBookedStatus(null), 4000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg-1',
        sender: 'ai',
        text: 'Assalomu alaykum! Men Elvora Health ekotizimining raqamli triaj yordamchisi "Doniyor AI"man. Sizni qanday bezovtalik yoki tibbiy alomatlar qiynamoqda? Menga oʻz soʻzlaringiz bilan tushuntiring, men toʻgʻri shifokor va boʻsh qabul vaqtini taklif qilaman.',
      },
    ]);
    setBookedStatus(null);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useGsapContext(
    sectionRef,
    () => {
      gsap.fromTo(
        '.doniyor-header',
        { y: 25, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.doniyor-chat-box',
        { y: 30, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true,
          },
        }
      );
    },
    []
  );

  return (
    <section
      id="doniyor-ai"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#F8FBFE] border-b border-slate-200/80 relative overflow-hidden"
    >
      <span id="doniyor-ai-section" className="absolute -top-20" />
      {/* Ambient background light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-r from-cyan-100/40 via-blue-100/30 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="doniyor-header text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#008BFF] bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-200 inline-flex items-center gap-1.5 shadow-xs">
            <Bot size={14} className="text-[#008BFF]" />
            7. SUNʼIY INTELLEKT TIBBIY TRIAJI
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Doniyor AI: Bemorlarni Toʻgʻri <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4]">
              Mutaxassisga Yoʻnaltirish
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Registratura yuklamasini 40% ga kamaytiruvchi, bemor shikoyatlarini saralab boʻsh vaqtga yoʻnaltiruvchi interaktiv yordamchi.
          </p>

          {/* CRITICAL REQUIRED PROMINENT DISCLAIMER */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs sm:text-sm font-bold shadow-sm max-w-2xl text-left">
              <ShieldAlert size={18} className="text-amber-600 shrink-0" />
              <span>
                <strong>MUHIM OGOHLANTIRISH:</strong> Doniyor AI tashxis qoʻymaydi, faqat toʻgʻri mutaxassisga yoʻnaltiradi.
              </span>
            </div>
          </div>
        </div>

        {/* Chat Simulator Card */}
        <div className="doniyor-chat-box bg-white rounded-3xl border-2 border-slate-200/90 shadow-2xl overflow-hidden flex flex-col h-[650px] sm:h-[620px]">
          
          {/* Chat Window Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-[#0B1E3B] to-[#08182E] text-white flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#008BFF] to-[#00D4FF] flex items-center justify-center text-white shadow-md">
                  <Bot size={20} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-white">Doniyor AI (Tibbiy Triaj)</h3>
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/30">
                    Onlayn
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Zero Data Leakage • Maxfiy va xavfsiz bemor saralash
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetChat}
                title="Suhbatni tozalash"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
              >
                <RefreshCw size={13} />
                <span className="hidden sm:inline">Qayta boshlash</span>
              </button>
            </div>
          </div>

          {/* Quick Action Chips Bar */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap shrink-0 flex items-center gap-1">
              <Sparkles size={12} className="text-[#008BFF]" />
              Tezkor shikoyatlar:
            </span>
            {quickPrompts.map((p) => (
              <button
                key={p.label}
                onClick={() => handleSend(p.query)}
                disabled={isTyping}
                className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#008BFF] hover:text-[#008BFF] hover:bg-cyan-50 transition-all font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {p.icon}
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-white">
            
            {/* Status Toast when booked */}
            {bookedStatus && (
              <div className="sticky top-0 z-20 p-3 rounded-2xl bg-emerald-500 text-white font-bold text-xs sm:text-sm text-center shadow-lg animate-in fade-in flex items-center justify-center gap-2">
                <CheckCircle2 size={16} />
                <span>{bookedStatus}</span>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* AI Avatar */}
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#008BFF] to-[#0D34B4] flex items-center justify-center text-white shrink-0 mt-1 shadow-xs">
                    <Bot size={15} />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white rounded-tr-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs space-y-3'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Doctor Referral Card if provided by AI */}
                  {msg.referral && (
                    <div className="mt-3 p-4 rounded-2xl bg-gradient-to-br from-cyan-50/80 to-blue-50/50 border-2 border-cyan-200 space-y-3 text-slate-800">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-white border border-cyan-200 flex items-center justify-center text-[#008BFF] shadow-xs">
                            <Stethoscope size={18} />
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#008BFF] block">
                              Tavsiya etilgan mutaxassis
                            </span>
                            <div className="font-extrabold text-slate-900 text-sm">
                              {msg.referral.doctorName}
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium">
                              {msg.referral.specialty}
                            </div>
                          </div>
                        </div>

                        <span className="text-xs font-black text-[#008BFF] bg-white px-2.5 py-1 rounded-lg border border-cyan-200 shrink-0">
                          {msg.referral.consultationFee}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-cyan-200/60 font-semibold text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-[#008BFF]" />
                          <span>{msg.referral.availableTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          <span>{msg.referral.room}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBookReferral(msg.referral!.doctorName, msg.referral!.availableTime)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#008BFF] hover:bg-[#0077DB] text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
                      >
                        <Calendar size={13} />
                        <span>Shu vaqtga elektron qabul olish</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-white shrink-0 mt-1 shadow-xs">
                    <User size={15} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Animation indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#008BFF] to-[#0D34B4] flex items-center justify-center text-white shrink-0">
                  <Bot size={15} />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xs flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Doniyor AI tahlil qilmoqda</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008BFF] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008BFF] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008BFF] animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Shikoyatingizni yozing (masalan: koʻkrak qafasidagi ogʻriq)..."
              disabled={isTyping}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#008BFF] focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white text-xs sm:text-sm font-bold flex items-center gap-2 hover:opacity-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
            >
              <span>Yuborish</span>
              <Send size={14} />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
