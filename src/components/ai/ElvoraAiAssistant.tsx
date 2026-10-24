import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ShieldCheck,
  RotateCcw,
  FileText,
  Calendar,
  AlertTriangle,
  ChevronDown,
  PhoneCall,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { AiMessage, LabAnalysisResult } from '../../types/ai';
import { aiService } from '../../services/aiService';
import { AiConsentModal } from './AiConsentModal';
import { AiBookingCard } from './AiBookingCard';
import { AiLabUploadModal } from './AiLabUploadModal';
import { useApp } from '../../context/AppContext';

const CHAT_STORAGE_KEY = 'elvora_ai_chat_session_history';
const CONSENT_STORAGE_KEY = 'elvora_ai_patient_consent';

const DEFAULT_WELCOME_MESSAGE: AiMessage = {
  id: 'msg-welcome',
  role: 'assistant',
  timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
  type: 'text',
  isDemo: true,
  content: `Assalomu alaykum! Men **Elvora AI™** — klinikamizning aqlli tibbiy yordamchisiman.\n\nSizga qanday yordam bera olaman?\n• Alomatlaringiz bo'yicha **mos mutaxassisni topish**\n• Shifokor qabuliga **onlayn yozilish**\n• Laboratoriya tahlillarini **oddiy tilda tushunish**\n• Klinika xizmatlari va narxlarini **bilib olish**`,
  suggestedFollowUps: [
    'Bosh og\'rig\'i bo\'yicha qaysi shifokorga boray?',
    'Kardiolog qabuliga yozilish',
    'Laboratoriya tahlillarini tushunish',
    'Klinika ish vaqti va xizmat narxlari',
  ],
};

export const ElvoraAiAssistant: React.FC = () => {
  const { showToast } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AiMessage[]>(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [DEFAULT_WELCOME_MESSAGE];
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const [consented, setConsented] = useState<boolean>(() => {
    return localStorage.getItem(CONSENT_STORAGE_KEY) === 'true';
  });

  const [activeBookingSpecialty, setActiveBookingSpecialty] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Save messages to storage
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Storage unavailable
    }
  }, [messages]);

  const handleToggleConsent = (val: boolean) => {
    setConsented(val);
    localStorage.setItem(CONSENT_STORAGE_KEY, String(val));
    showToast(
      val ? 'Tibbiy maxfiylik shartlariga rozilik saqlandi' : 'Rozilik bekor qilindi',
      'info'
    );
  };

  const handleClearChat = () => {
    setMessages([DEFAULT_WELCOME_MESSAGE]);
    setActiveBookingSpecialty(null);
    localStorage.removeItem(CHAT_STORAGE_KEY);
    showToast('Suhbat tarixi tozalandi', 'info');
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || isTyping) return;

    const userMessage: AiMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await aiService.sendMessage({
        message: textToSend.trim(),
        conversationHistory: messages,
        patientConsent: consented,
      });

      setMessages((prev) => [...prev, response]);

      if (response.type === 'booking_action' && response.bookingDraft) {
        setActiveBookingSpecialty(response.bookingDraft.specialty);
      }
    } catch {
      showToast('Xabar yuborishda xatolik yuz berdi', 'error');
    } finally {
      setIsTyping(false);
    }
  };

  const handleLabResultSentToChat = (result: LabAnalysisResult) => {
    const labMessage: AiMessage = {
      id: `msg-lab-${Date.now()}`,
      role: 'assistant',
      timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      type: 'lab_result',
      labResult: result,
      content: `🧪 **Laboratoriya tahlillari xulosasi:**\n\n${result.overallSummaryUz}\n\n${result.disclaimerUz}`,
      suggestedFollowUps: [
        result.recommendedSpecialistUz
          ? `${result.recommendedSpecialistUz} qabuliga yozilish`
          : 'Shifokor bilan maslahatlashish',
        'Tahlillarni qayta tekshirish',
      ],
    };
    setMessages((prev) => [...prev, labMessage]);
  };

  return (
    <>
      {/* Floating Action Button (Always in bottom-right corner) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          {/* Welcome hint bubble */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-xl border border-[#DFE8E4] text-xs font-semibold text-[#132229] animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#00D2B4]" />
            <span>Elvora AI™ yordamchisi</span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Elvora AI Assistantni ochish"
            className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#06142B] via-[#0A2540] to-[#0D34B4] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#00D2B4]/40 cursor-pointer"
          >
            <div className="absolute inset-0 rounded-2xl bg-[#00D2B4]/20 animate-ping opacity-30" />
            <Sparkles className="text-[#00D2B4] group-hover:rotate-12 transition-transform duration-300" size={26} />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2B4] opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00D2B4]" />
            </span>
          </button>
        </div>
      )}

      {/* Main AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] h-[640px] max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-[#DFE8E4] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#06142B] via-[#0A2540] to-[#0E3258] p-4 text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00D2B4]/30 to-[#008BFF]/20 border border-[#00D2B4]/40 flex items-center justify-center text-[#00D2B4]">
                <Bot size={22} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00D2B4] border-2 border-[#06142B]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">Elvora AI™</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00D2B4]/20 text-[#00D2B4] border border-[#00D2B4]/30">
                    24/7 Tibbiy AI
                  </span>
                </div>
                <p className="text-[11px] text-white/70">Klinika qabuli va simptomlar tahlili</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsConsentModalOpen(true)}
                title="Maxfiylik va rozilik"
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
              >
                <ShieldCheck size={16} className={consented ? 'text-[#00D2B4]' : 'text-white/60'} />
              </button>
              <button
                type="button"
                onClick={handleClearChat}
                title="Suhbatni tozalash"
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
              >
                <RotateCcw size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Yopish"
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </div>

          {/* Sub-header safety banner */}
          <div className="px-3.5 py-1.5 bg-[#F0FDF4] border-b border-[#DCFCE7] flex items-center justify-between text-[11px] text-[#166534]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#16a34a]" />
              <span>O'RQ-547 himoyalangan klinik platforma</span>
            </div>
            <span className="text-[10px] font-semibold text-[#16a34a] bg-white px-2 py-0.5 rounded border border-[#bbf7d0]">
              Shifokor nazoratida
            </span>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAFBFB] text-xs">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div
                    className={`flex items-start gap-2.5 max-w-[88%] ${
                      isUser ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                        isUser
                          ? 'bg-[#008BFF] text-white'
                          : 'bg-gradient-to-br from-[#06142B] to-[#0A2540] text-[#00D2B4] border border-[#00D2B4]/30'
                      }`}
                    >
                      {isUser ? <User size={14} /> : <Bot size={14} />}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`p-3.5 rounded-2xl shadow-xs leading-relaxed ${
                        isUser
                          ? 'bg-[#008BFF] text-white rounded-tr-xs'
                          : 'bg-white border border-[#DFE8E4] text-[#132229] rounded-tl-xs'
                      }`}
                    >
                      {/* Emergency alert card */}
                      {msg.emergency && (
                        <div className="mb-2 p-3 rounded-xl bg-[#FEECEE] border border-[#FECDD3] text-[#991B1B] space-y-2">
                          <div className="flex items-center gap-2 font-bold text-xs text-[#DC2626]">
                            <AlertTriangle size={16} />
                            <span>103 TEZ YORDAM ZARUR</span>
                          </div>
                          <p className="text-[11px] leading-relaxed">{msg.emergency.immediateActionUz}</p>
                          <a
                            href="tel:103"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#DC2626] text-white font-bold text-xs hover:bg-[#B91C1C] transition-colors"
                          >
                            <PhoneCall size={13} />
                            <span>103 ga qo'ng'iroq qilish</span>
                          </a>
                        </div>
                      )}

                      {/* Regular message text */}
                      <div className="whitespace-pre-line">{msg.content}</div>

                      {/* Doctor recommendation visual card */}
                      {msg.recommendation && (
                        <div className="mt-3 p-3 rounded-xl bg-[#EBF7FC] border border-[#BAE6FD] text-[#0A2540] space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-[#0D34B4]">
                              Tavsiya: {msg.recommendation.specialty}
                            </span>
                            <span className="text-[10px] bg-white text-[#0D34B4] font-semibold px-2 py-0.5 rounded border border-[#BAE6FD]">
                              Birlamchi ko'rik
                            </span>
                          </div>
                          <p className="text-[11px] text-[#3A5B75] leading-relaxed">
                            {msg.recommendation.reasoningUz}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveBookingSpecialty(msg.recommendation!.specialty);
                            }}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#008BFF] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#0070CC] transition-colors cursor-pointer"
                          >
                            <Calendar size={13} />
                            <span>{msg.recommendation.specialty} qabuliga yozilish</span>
                          </button>
                        </div>
                      )}

                      {/* Lab result breakdown */}
                      {msg.labResult && (
                        <div className="mt-3 space-y-1.5 border-t border-[#F0F4F2] pt-2">
                          {msg.labResult.items.map((item) => (
                            <div
                              key={item.id}
                              className="p-2 rounded-lg bg-[#F8FAF9] border border-[#DFE8E4] flex items-center justify-between text-[11px]"
                            >
                              <span className="font-semibold">{item.testName}</span>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono">{item.value} {item.unit}</span>
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                    item.status === 'normal'
                                      ? 'bg-[#E3F1EC] text-[#059669]'
                                      : 'bg-[#FFFBEB] text-[#B45309]'
                                  }`}
                                >
                                  {item.status === 'normal' ? 'Normal' : 'Chetga chiqqan'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] text-[#5F737B] px-1">{msg.timestamp}</span>

                  {/* Suggested follow-up buttons */}
                  {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1 max-w-[90%]">
                      {msg.suggestedFollowUps.map((prompt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            if (prompt.includes('yozilish')) {
                              setActiveBookingSpecialty('Terapevt');
                            } else if (prompt.includes('Tahlil')) {
                              setIsLabModalOpen(true);
                            } else {
                              handleSendMessage(prompt);
                            }
                          }}
                          className="px-2.5 py-1 rounded-full bg-white border border-[#DFE8E4] hover:border-[#008BFF] hover:bg-[#EBF7FC] text-[#2C3E50] text-[11px] font-medium transition-colors shadow-2xs text-left"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Active interactive booking card when triggered */}
            {activeBookingSpecialty && (
              <div className="animate-in fade-in zoom-in-95 duration-200">
                <AiBookingCard
                  defaultSpecialty={activeBookingSpecialty}
                  onAppointmentBooked={(apt) => {
                    setActiveBookingSpecialty(null);
                    setMessages((prev) => [
                      ...prev,
                      {
                        id: `msg-confirm-${Date.now()}`,
                        role: 'assistant',
                        timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
                        type: 'text',
                        content: `✅ Hurmatli bemor, **${apt.patientName}**! Siz ${apt.date} kuni soat ${apt.startTime} da **${apt.doctorName}** (${apt.doctorSpecialty}) qabuliga muvaffaqiyatli yozildingiz. Eslatma xabari raqamingizga yuborildi.`,
                        suggestedFollowUps: ['Klinika manzilini ko\'rsatish', 'Boshqa qabulga yozilish'],
                      },
                    ]);
                  }}
                />
              </div>
            )}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#5F737B] bg-white p-3 rounded-2xl border border-[#DFE8E4] w-fit">
                <Bot size={15} className="text-[#00D2B4] animate-spin" />
                <span className="font-medium">Elvora AI javob tayyorlamoqda</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008BFF] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008BFF] animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008BFF] animate-bounce [animation-delay:0.3s]" />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick action bar */}
          <div className="px-4 py-2 bg-white border-t border-[#F0F4F2] flex items-center justify-between gap-2 overflow-x-auto shrink-0">
            <button
              type="button"
              onClick={() => setIsLabModalOpen(true)}
              className="px-2.5 py-1 rounded-xl bg-[#F8FAF9] hover:bg-[#EBF7FC] border border-[#DFE8E4] text-[11px] font-semibold text-[#0D34B4] flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <FileText size={13} className="text-[#008BFF]" />
              <span>Tahlil tushuntirish</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveBookingSpecialty('Terapevt')}
              className="px-2.5 py-1 rounded-xl bg-[#F8FAF9] hover:bg-[#EBF7FC] border border-[#DFE8E4] text-[11px] font-semibold text-[#0D34B4] flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <Calendar size={13} className="text-[#008BFF]" />
              <span>Qabulga yozilish</span>
            </button>

            <button
              type="button"
              onClick={() => handleSendMessage('Klinika ish vaqtlari va xizmat narxlari haqida ma\'lumot bering')}
              className="px-2.5 py-1 rounded-xl bg-[#F8FAF9] hover:bg-[#EBF7FC] border border-[#DFE8E4] text-[11px] font-semibold text-[#0D34B4] flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <Clock size={13} className="text-[#008BFF]" />
              <span>Ish vaqti va narxlar</span>
            </button>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#DFE8E4] shrink-0 space-y-2"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Alomatlaringiz yoki savolingizni yozing..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isTyping}
                className="flex-1 px-3.5 py-2.5 bg-[#F8FAF9] border border-[#DFE8E4] rounded-2xl text-xs text-[#132229] placeholder:text-[#5F737B] focus:ring-2 focus:ring-[#008BFF] outline-hidden font-medium"
              />
              <button
                type="submit"
                disabled={isTyping || !inputText.trim()}
                className="p-2.5 rounded-2xl bg-gradient-to-r from-[#00D2B4] to-[#008BFF] text-[#06142B] font-bold shadow-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
              >
                <Send size={16} />
              </button>
            </div>

            <p className="text-[10px] text-center text-[#5F737B] leading-tight">
              ⚠️ Elvora AI™ axborot yordamchisidir, malakali shifokor o'rnini bosa olmaydi.
            </p>
          </form>
        </div>
      )}

      {/* Modals */}
      <AiConsentModal
        isOpen={isConsentModalOpen}
        onClose={() => setIsConsentModalOpen(false)}
        consented={consented}
        onToggleConsent={handleToggleConsent}
      />

      <AiLabUploadModal
        isOpen={isLabModalOpen}
        onClose={() => setIsLabModalOpen(false)}
        onSendToChat={handleLabResultSentToChat}
      />
    </>
  );
};
