import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Send,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  UserCheck,
  Calendar,
  Clock,
  DollarSign,
  Zap,
  ShieldCheck,
  Bot,
  MessageSquare,
  Check
} from 'lucide-react';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

interface SlotData {
  id: string;
  time: string;
  patientName: string;
  type: string;
  fee: number;
  status: 'confirmed' | 'risky' | 'empty';
  reminded: boolean;
}

export const ElvoraLiveDemoSection: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<'usmonov' | 'karimova' | 'mansurov'>('usmonov');
  const [isSending, setIsSending] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [noShowRate, setNoShowRate] = useState(28.4);
  const [cashierIncome, setCashierIncome] = useState(14250000);
  const [emptySlotsCount, setEmptySlotsCount] = useState(14);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Typewriter effect state for Elvora Insights
  const [typedText, setTypedText] = useState('');
  const fullInsightText =
    "💡 Elvora Insights™: Dr. Usmonov'da bugun 14 ta bo'sh slot bor. 6 ta bemor qabulni unutish xavfi yuqori. Tavsiya: 6 ta bemorga avtomatik Telegram/SMS eslatma yuborilsin va kassa tushumi himoyalansin.";

  const demoRef = useRef<HTMLDivElement | null>(null);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    setTypedText('');
    const timer = setInterval(() => {
      if (index < fullInsightText.length) {
        setTypedText(fullInsightText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [hasSent]);

  // Slots initial data
  const [slots, setSlots] = useState<SlotData[]>([
    {
      id: 's-1',
      time: '09:00',
      patientName: 'Rustam Karimov',
      type: 'Birlamchi ko‘rik',
      fee: 180000,
      status: 'risky',
      reminded: false,
    },
    {
      id: 's-2',
      time: '09:45',
      patientName: 'Shahlo Rahimova',
      type: 'EKG tahlili',
      fee: 220000,
      status: 'confirmed',
      reminded: true,
    },
    {
      id: 's-3',
      time: '10:30',
      patientName: 'Bobur Mirzayev',
      type: 'Konsultatsiya',
      fee: 180000,
      status: 'risky',
      reminded: false,
    },
    {
      id: 's-4',
      time: '11:15',
      patientName: 'Gulnoza Saidova',
      type: 'Qayta ko‘rik',
      fee: 150000,
      status: 'empty',
      reminded: false,
    },
    {
      id: 's-5',
      time: '12:00',
      patientName: 'Farrux Zokirov',
      type: 'Kardiogramma',
      fee: 200000,
      status: 'risky',
      reminded: false,
    },
    {
      id: 's-6',
      time: '14:30',
      patientName: 'Nodira Toirova',
      type: 'Konsultatsiya',
      fee: 180000,
      status: 'empty',
      reminded: false,
    },
  ]);

  // Trigger Action: "Eslatma yuborish"
  const handleSendReminders = () => {
    if (isSending || hasSent) return;
    setIsSending(true);

    // Simulate instant sending steps
    setTimeout(() => {
      setNotifications((prev) => [
        '📱 Telegram Bot: Rustam Karimov (09:00) "Kelaman" deb tasdiqladi (+180 000 UZS)',
        ...prev,
      ]);
    }, 450);

    setTimeout(() => {
      setNotifications((prev) => [
        '💬 SMS Gateway: Bobur Mirzayev (10:30) qabulni tasdiqladi (+180 000 UZS)',
        ...prev,
      ]);
    }, 900);

    setTimeout(() => {
      setNotifications((prev) => [
        '⚡ Smart Auto-Fill: 2 ta bo‘sh slot zaxira kutish navbatidagi bemorlar bilan to‘ldirildi! (+330 000 UZS)',
        ...prev,
      ]);

      // Transform slots into confirmed status
      setSlots((prev) =>
        prev.map((s) => ({
          ...s,
          status: 'confirmed',
          reminded: true,
          patientName:
            s.status === 'empty'
              ? s.id === 's-4'
                ? 'Malika Sobirova (Navbatdan)'
                : 'Javohir Ergashev (Navbatdan)'
              : s.patientName,
        }))
      );

      // Animate no-show rate dropping from 28.4% to 3.2%
      let rate = 28.4;
      const rateInterval = setInterval(() => {
        rate -= 1.2;
        if (rate <= 3.2) {
          setNoShowRate(3.2);
          clearInterval(rateInterval);
        } else {
          setNoShowRate(Number(rate.toFixed(1)));
        }
      }, 35);

      // Animate cashier income increase (+1 080 000 UZS)
      const targetCashier = 15330000;
      let cash = 14250000;
      const cashInterval = setInterval(() => {
        cash += 45000;
        if (cash >= targetCashier) {
          setCashierIncome(targetCashier);
          clearInterval(cashInterval);
        } else {
          setCashierIncome(cash);
        }
      }, 25);

      setEmptySlotsCount(2);
      setIsSending(false);
      setHasSent(true);
    }, 1400);
  };

  const handleReset = () => {
    setHasSent(false);
    setIsSending(false);
    setNoShowRate(28.4);
    setCashierIncome(14250000);
    setEmptySlotsCount(14);
    setNotifications([]);
    setSlots([
      {
        id: 's-1',
        time: '09:00',
        patientName: 'Rustam Karimov',
        type: 'Birlamchi ko‘rik',
        fee: 180000,
        status: 'risky',
        reminded: false,
      },
      {
        id: 's-2',
        time: '09:45',
        patientName: 'Shahlo Rahimova',
        type: 'EKG tahlili',
        fee: 220000,
        status: 'confirmed',
        reminded: true,
      },
      {
        id: 's-3',
        time: '10:30',
        patientName: 'Bobur Mirzayev',
        type: 'Konsultatsiya',
        fee: 180000,
        status: 'risky',
        reminded: false,
      },
      {
        id: 's-4',
        time: '11:15',
        patientName: 'Gulnoza Saidova',
        type: 'Qayta ko‘rik',
        fee: 150000,
        status: 'empty',
        reminded: false,
      },
      {
        id: 's-5',
        time: '12:00',
        patientName: 'Farrux Zokirov',
        type: 'Kardiogramma',
        fee: 200000,
        status: 'risky',
        reminded: false,
      },
      {
        id: 's-6',
        time: '14:30',
        patientName: 'Nodira Toirova',
        type: 'Konsultatsiya',
        fee: 180000,
        status: 'empty',
        reminded: false,
      },
    ]);
  };

  return (
    <section
      ref={demoRef}
      id="live-demo"
      className="py-20 lg:py-28 bg-[#F8FBFE] border-t border-b border-slate-200/90 relative overflow-hidden"
    >
      {/* Background radial cyan glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-cyan-100/60 to-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-[#008BFF] bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-200 shadow-2xs">
            3-QADAM: JONLI INTERAKTIV BOSHQARUV (THE "I NEED THIS" SECTION)
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Buni o‘z qo‘lingiz bilan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4]">
              to‘xtating
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Quyida Elvora Health tizimining jonli mini-boshqaruv paneli berilgan. 
            <strong> "Eslatma yuborish"</strong> tugmasini bosing va no-show qanday tushishini, kassa qanday oshishini ko‘ring.
          </p>
        </div>

        {/* EMBEDDED MINI-DASHBOARD CONTAINER */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border-2 border-slate-200/90 shadow-2xl overflow-hidden ring-4 ring-[#008BFF]/5">
          {/* Top Mock Window Bar */}
          <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-3 text-xs font-bold text-slate-300 hidden sm:inline">
                Elvora Health OS™ • Shifo Med Premium (Toshkent)
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Jonli tizim faol
              </span>
              <Link
                to="/app/dashboard"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-cyan-300 hover:text-white transition-colors"
              >
                <span>To‘liq dasturga kirish (/app)</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Mini-Dashboard Header & Doctor Tabs */}
          <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                Shifokor jadvali ko‘rinishi:
              </span>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => setSelectedDoctor('usmonov')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedDoctor === 'usmonov'
                      ? 'bg-[#008BFF] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Dr. A. Usmonov (Kardiolog)
                </button>
                <button
                  onClick={() => setSelectedDoctor('karimova')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedDoctor === 'karimova'
                      ? 'bg-[#008BFF] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Dr. N. Karimova (Pediatr)
                </button>
              </div>
            </div>

            {/* Quick Action Reset */}
            {hasSent && (
              <button
                onClick={handleReset}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs"
              >
                <RotateCcw size={13} />
                <span>Simulyatsiyani boshiga qaytarish</span>
              </button>
            )}
          </div>

          {/* LIVE METRICS BAR (Animated live changes) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-200 bg-white border-b border-slate-200">
            {/* Metric 1: No-show xavfi */}
            <div className="p-4 sm:p-5">
              <span className="text-[11px] font-bold text-slate-500 block">
                No-Show Xavfi:
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span
                  className={`text-2xl sm:text-3xl font-black font-mono transition-colors duration-500 ${
                    noShowRate > 10 ? 'text-rose-600' : 'text-emerald-600'
                  }`}
                >
                  {noShowRate}%
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    noShowRate > 10
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  }`}
                >
                  {noShowRate > 10 ? 'Yuqori xavf' : 'Minimal'}
                </span>
              </div>
            </div>

            {/* Metric 2: Cashier Income */}
            <div className="p-4 sm:p-5">
              <span className="text-[11px] font-bold text-slate-500 block">
                Bugungi Kassa Tushumi:
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 mt-1">
                {cashierIncome.toLocaleString('uz-UZ')} UZS
              </div>
              {hasSent && (
                <span className="text-[10px] font-bold text-emerald-600 animate-in fade-in block mt-0.5">
                  +1 080 000 UZS saqlandi!
                </span>
              )}
            </div>

            {/* Metric 3: Bo'sh slotlar */}
            <div className="p-4 sm:p-5">
              <span className="text-[11px] font-bold text-slate-500 block">
                Bo‘sh Qolgan Slotlar:
              </span>
              <div
                className={`text-2xl sm:text-3xl font-black font-mono mt-1 ${
                  emptySlotsCount > 5 ? 'text-amber-600' : 'text-[#008BFF]'
                }`}
              >
                {emptySlotsCount} ta
              </div>
            </div>

            {/* Metric 4: Tizim samaradorligi */}
            <div className="p-4 sm:p-5">
              <span className="text-[11px] font-bold text-slate-500 block">
                Qabul Aniqligi:
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 mt-1">
                {!hasSent ? '71.6%' : '96.8%'}
              </div>
            </div>
          </div>

          {/* MAIN SIMULATOR BODY: INSIGHTS CARD + SCHEDULE SLOTS */}
          <div className="p-5 sm:p-7 space-y-6">
            {/* ELVORA INSIGHTS RECOMMENDATION (Typewriter Card) */}
            <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-blue-50/80 via-cyan-50/60 to-white border border-cyan-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Bot size={18} className="text-[#008BFF]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#008BFF]">
                    Elvora Insights™ — Real-Vaqt Tavsiyasi
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed font-mono">
                  {typedText}
                  <span className="inline-block w-1.5 h-3.5 bg-[#008BFF] ml-1 animate-pulse" />
                </p>
              </div>

              {/* ACTION BUTTON: "Eslatma yuborish" */}
              <div className="shrink-0 w-full sm:w-auto">
                <button
                  id="btn-send-reminders"
                  onClick={handleSendReminders}
                  disabled={isSending || hasSent}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-95 ${
                    !hasSent
                      ? 'bg-[#008BFF] text-white hover:bg-[#0077DB] shadow-blue-500/25 ring-2 ring-cyan-200 hover:scale-[1.02]'
                      : 'bg-emerald-600 text-white cursor-default ring-2 ring-emerald-300'
                  }`}
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Yuborilmoqda...</span>
                    </>
                  ) : !hasSent ? (
                    <>
                      <Send size={15} />
                      <span>Eslatma yuborish (6 ta bemor)</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={15} />
                      <span>Yuborildi va tasdiqlandi!</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* LIVE SIMULATED TOAST NOTIFICATIONS */}
            {notifications.length > 0 && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                {notifications.map((msg, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900 text-white text-xs font-medium flex items-center gap-2 shadow-lg border border-cyan-500/30"
                  >
                    <Sparkles size={14} className="text-cyan-400 shrink-0" />
                    <span>{msg}</span>
                  </div>
                ))}
              </div>
            )}

            {/* DOCTOR SCHEDULE SLOTS GRID */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-3 px-1">
                <span>Dr. Usmonov — Bugungi Qabullar Jadvali:</span>
                <span className="text-slate-400 text-[11px]">
                  Har bir qabul: 45 daqiqa
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {slots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`p-4 rounded-2xl border transition-all duration-500 relative ${
                      slot.status === 'confirmed'
                        ? 'bg-emerald-50/70 border-emerald-200 shadow-2xs'
                        : slot.status === 'risky'
                        ? 'bg-rose-50/70 border-rose-200 shadow-rose-200/50'
                        : 'bg-slate-50 border-dashed border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-black text-slate-800">
                        {slot.time}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          slot.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : slot.status === 'risky'
                            ? 'bg-rose-100 text-rose-800 animate-pulse'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {slot.status === 'confirmed'
                          ? '✓ Tasdiqlangan'
                          : slot.status === 'risky'
                          ? '● No-show xavfi'
                          : 'Bo‘sh slot'}
                      </span>
                    </div>

                    <div className="font-bold text-xs text-slate-900 truncate">
                      {slot.patientName}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {slot.type}
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-slate-700">
                        {slot.fee.toLocaleString('uz-UZ')} UZS
                      </span>
                      {slot.reminded && (
                        <span className="text-[10px] text-[#0088FF] font-bold flex items-center gap-1">
                          <Check size={11} />
                          Eslatma bordi
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CELEBRATION FOOTER AFTER CLICKING */}
            {hasSent && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg animate-in fade-in duration-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <ShieldCheck size={22} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black">
                      Klinika kassa sizishi to‘xtatildi!
                    </h4>
                    <p className="text-xs text-emerald-100">
                      Bitta bosish orqali 6 ta qabul saqlab qolindi va +1 080 000 UZS kassa tushumi kafolatlandi.
                    </p>
                  </div>
                </div>

                <Link
                  to="/app/dashboard"
                  className="px-5 py-2.5 rounded-xl bg-white text-emerald-800 text-xs font-black hover:bg-emerald-50 transition-all shadow-md shrink-0 flex items-center gap-1.5"
                >
                  <span>Haqiqiy Tizimni Ochish (/app)</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Narrative Flow Note */}
        <div className="mt-12 text-center text-xs text-slate-500">
          Ushbu interaktiv mexanizm Elvora Health ning haqiqiy{' '}
          <strong className="text-slate-700">/app/dashboard</strong> va{' '}
          <strong className="text-slate-700">/app/insights</strong> modullarida to‘liq avtomatlashtirilgan tarzda ishlaydi.
        </div>
      </div>
    </section>
  );
};

export default ElvoraLiveDemoSection;
