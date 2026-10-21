import React, { useState, useEffect, useRef } from 'react';
import {
  UserX,
  CalendarX2,
  FileQuestion,
  Bell,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Zap,
  Clock,
  UserCheck
} from 'lucide-react';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

export const ElvoraProblemCards: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Micro-animation states for each card
  const [card1Active, setCard1Active] = useState(false); // No-show: false = empty/leak, true = reminded & filled
  const [card2Active, setCard2Active] = useState(false); // Empty slots: false = gaping hole, true = auto-filled
  const [card3Active, setCard3Active] = useState(false); // Ledger: false = blurred & mismatch, true = unblurred & reconciled

  // Auto-loop micro-animations every few seconds
  useEffect(() => {
    const t1 = setInterval(() => setCard1Active((prev) => !prev), 3800);
    const t2 = setInterval(() => setCard2Active((prev) => !prev), 4200);
    const t3 = setInterval(() => setCard3Active((prev) => !prev), 4600);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearInterval(t3);
    };
  }, []);

  useGsapContext(
    sectionRef,
    () => {
      gsap.from('.problem-card-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 45,
        opacity: 0,
        stagger: 0.18,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      id="muammolar"
      className="py-20 lg:py-28 bg-[#06142B] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#0088FF]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#0088FF_0.8px,transparent_0.8px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-4 py-1.5 rounded-full border border-cyan-700/40 shadow-xs">
            2-QADAM: KO‘RINMAS 3 TA OQISH NUQTASI
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Klinika puli qayerdan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-rose-500">
              oqib ketmoqda?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Har bir xususiy klinika duch keladigan, ammo oddiy qog‘oz va Excel daftarlarida mutlaqo ko‘rinmaydigan 3 ta tizimli muammo:
          </p>
        </div>

        {/* 3 PROBLEM CARDS WITH BESPOKE MICRO-ANIMATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* ============================================================ */}
          {/* CARD 1: NO-SHOW (KELMAY QOLGAN BEMORLAR) */}
          {/* ============================================================ */}
          <div className="problem-card-item rounded-3xl p-6 sm:p-7 bg-[#0A1A2F]/90 border border-slate-700/60 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-2xl relative group">
            {/* Top header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black tracking-widest uppercase text-slate-400">
                  01 / 03-MUAMMO
                </span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                    !card1Active
                      ? 'bg-rose-950/80 text-rose-300 border-rose-700/40'
                      : 'bg-emerald-950/80 text-emerald-300 border-emerald-700/40'
                  }`}
                >
                  {!card1Active ? '● Yo‘qotish faol (-21.4%)' : '✓ Elvora himoyasi (+100%)'}
                </span>
              </div>

              <h3 className="text-xl font-black text-white">
                Kelmay qolgan bemorlar (No-show)
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Bemor qabulga yoziladi, lekin ogohlantirmasdan kelmaydi. Shifokor xonada kutadi, boshqa bemor kira olmaydi, kassa esa 0 so‘m.
              </p>

              {/* MICRO-ANIMATION 1: Empty Chair vs Filled Chair */}
              <div className="mt-6 p-4 rounded-2xl bg-[#061224] border border-slate-800 relative overflow-hidden min-h-[175px] flex flex-col justify-center items-center">
                {/* Visual Clinic Room Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0088FF]/5 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                  {/* The Chair & Patient Avatar */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* Stylized Clinic Chair */}
                    <svg
                      viewBox="0 0 100 100"
                      className={`w-20 h-20 transition-all duration-500 ${
                        !card1Active ? 'stroke-rose-500/80' : 'stroke-cyan-400'
                      } fill-none`}
                    >
                      {/* Chair backrest */}
                      <rect x="25" y="15" width="50" height="42" rx="8" strokeWidth="2.5" />
                      {/* Seat cushion */}
                      <rect x="20" y="55" width="60" height="12" rx="4" strokeWidth="2.5" />
                      {/* Chair legs and base */}
                      <line x1="50" y1="67" x2="50" y2="84" strokeWidth="3" />
                      <line x1="30" y1="84" x2="70" y2="84" strokeWidth="3" strokeLinecap="round" />
                    </svg>

                    {/* Patient Sitting or Ghosting */}
                    <div
                      className={`absolute top-2 transition-all duration-700 flex flex-col items-center ${
                        !card1Active
                          ? 'opacity-20 scale-90 translate-y-3 blur-[1px]'
                          : 'opacity-100 scale-100 translate-y-0'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0088FF] to-cyan-400 flex items-center justify-center text-white shadow-lg ring-2 ring-white/30">
                        <UserCheck size={20} />
                      </div>
                    </div>

                    {/* Ping indicator */}
                    {!card1Active ? (
                      <div className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-black animate-bounce">
                        Bo‘sh stul!
                      </div>
                    ) : (
                      <div className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-black animate-pulse">
                        Qabulda!
                      </div>
                    )}
                  </div>

                  {/* Micro-status badge below chair */}
                  <div className="mt-3 text-center">
                    {!card1Active ? (
                      <div className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5 justify-center">
                        <UserX size={13} />
                        <span>Jasur Aliyev kelmadi (-150 000 UZS)</span>
                      </div>
                    ) : (
                      <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 justify-center">
                        <Bell size={13} />
                        <span>Telegram eslatma → Tasdiqlandi (+150k)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Controls & Metric */}
            <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                  O‘zbekistondagi o‘rtacha yo‘qotish:
                </span>
                <span className="text-base font-black text-rose-400">
                  Har 5 ta bemordan 1 tasi
                </span>
              </div>
              <button
                onClick={() => setCard1Active(!card1Active)}
                className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-slate-800 text-cyan-300 hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Sinab ko‘rish</span>
                <RotateCcw size={11} />
              </button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 2: BO'SH SLOTLAR (BEKOR KETGAN SHIFOKOR VAQTI) */}
          {/* ============================================================ */}
          <div className="problem-card-item rounded-3xl p-6 sm:p-7 bg-[#0A1A2F]/90 border border-slate-700/60 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-2xl relative group">
            {/* Top header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black tracking-widest uppercase text-slate-400">
                  02 / 03-MUAMMO
                </span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                    !card2Active
                      ? 'bg-rose-950/80 text-rose-300 border-rose-700/40'
                      : 'bg-cyan-950/80 text-cyan-300 border-cyan-700/40'
                  }`}
                >
                  {!card2Active ? '● 28% Bekor o‘tgan vaqt' : '✓ 98% Optimal bandlik'}
                </span>
              </div>

              <h3 className="text-xl font-black text-white">
                Shifokor jadvalidagi bo‘sh slotlar
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Qabullar orasidagi 30-45 daqiqalik uzilishlar yuqori toifali shifokor vaqtini behuda ketkazadi. Klinika ijara va maosh xarajatini baribir to‘laydi.
              </p>

              {/* MICRO-ANIMATION 2: Dynamic Schedule Timeline */}
              <div className="mt-6 p-4 rounded-2xl bg-[#061224] border border-slate-800 relative overflow-hidden min-h-[175px] flex flex-col justify-center">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                    <span>Kunlik grafik: Dr. Usmonov</span>
                    <span className="font-mono text-cyan-400">09:00 - 13:00</span>
                  </div>

                  {/* Slot Rows */}
                  <div className="space-y-1.5">
                    {/* Slot A: Filled */}
                    <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-between text-[11px]">
                      <span className="font-mono font-bold text-cyan-300">09:00 - 10:00</span>
                      <span className="text-slate-300">Z. Qodirova (Qabulda)</span>
                      <span className="font-mono text-emerald-400 font-bold">✓ 150k</span>
                    </div>

                    {/* Slot B: The Problematic Gaping Hole vs Smart Auto-Fill */}
                    <div
                      className={`p-2 rounded-xl border transition-all duration-700 flex items-center justify-between text-[11px] ${
                        !card2Active
                          ? 'bg-rose-950/70 border-rose-600/80 shadow-rose-950/40'
                          : 'bg-[#0088FF]/20 border-cyan-400/80 shadow-cyan-950/50'
                      }`}
                    >
                      <span
                        className={`font-mono font-bold ${
                          !card2Active ? 'text-rose-400' : 'text-cyan-300'
                        }`}
                      >
                        10:30 - 11:30
                      </span>
                      {!card2Active ? (
                        <span className="text-rose-300 font-bold flex items-center gap-1 animate-pulse">
                          <AlertTriangle size={12} />
                          Bo‘sh slot (Bekor vaqt)
                        </span>
                      ) : (
                        <span className="text-cyan-200 font-bold flex items-center gap-1">
                          <Sparkles size={12} className="text-cyan-300" />
                          Navbatdan band qilindi
                        </span>
                      )}
                      <span
                        className={`font-mono font-bold ${
                          !card2Active ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        {!card2Active ? '0 UZS' : '+150k UZS'}
                      </span>
                    </div>

                    {/* Slot C: Filled */}
                    <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-between text-[11px]">
                      <span className="font-mono font-bold text-cyan-300">12:00 - 13:00</span>
                      <span className="text-slate-300">M. Sobirov (EKG)</span>
                      <span className="font-mono text-emerald-400 font-bold">✓ 180k</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Controls & Metric */}
            <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                  Oylik yo‘qotilgan sof vaqt:
                </span>
                <span className="text-base font-black text-rose-400">
                  ~42 soat / shifokor
                </span>
              </div>
              <button
                onClick={() => setCard2Active(!card2Active)}
                className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-slate-800 text-cyan-300 hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Sinab ko‘rish</span>
                <RotateCcw size={11} />
              </button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 3: KO'RINMAS HISOB-KITOB (KASSA VA QOG'OZ XATOLARI) */}
          {/* ============================================================ */}
          <div className="problem-card-item rounded-3xl p-6 sm:p-7 bg-[#0A1A2F]/90 border border-slate-700/60 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-2xl relative group">
            {/* Top header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black tracking-widest uppercase text-slate-400">
                  03 / 03-MUAMMO
                </span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                    !card3Active
                      ? 'bg-rose-950/80 text-rose-300 border-rose-700/40'
                      : 'bg-emerald-950/80 text-emerald-300 border-emerald-700/40'
                  }`}
                >
                  {!card3Active ? '● Qog‘oz chalkashligi' : '✓ 100% Shaffof kassa'}
                </span>
              </div>

              <h3 className="text-xl font-black text-white">
                Ko‘rinmas hisob-kitob va kassa xatolari
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Registratura daftari, shifokor xonasi va kassa o‘rtasidagi nomutanosiblik. Kun oxirida qayerga qancha pul ketganini hech kim to‘liq bilmaydi.
              </p>

              {/* MICRO-ANIMATION 3: Blurring vs Un-blurring Reconciled Ledger */}
              <div className="mt-6 p-4 rounded-2xl bg-[#061224] border border-slate-800 relative overflow-hidden min-h-[175px] flex flex-col justify-center">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                    <span>Kunlik Yakuniy Hisobot:</span>
                    <span
                      className={`font-mono text-[10px] ${
                        !card3Active ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {!card3Active ? '✗ Kamomad aniqlandi' : '✓ Audit tasdiqlandi'}
                    </span>
                  </div>

                  {/* Transactions with Blur/Unblur Effect */}
                  <div className="space-y-1.5">
                    <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-300">Click to‘lovlari:</span>
                      <span className="font-mono text-cyan-300 font-bold">
                        6 850 000 UZS
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-300">Payme to‘lovlari:</span>
                      <span className="font-mono text-cyan-300 font-bold">
                        4 120 000 UZS
                      </span>
                    </div>

                    {/* The Discrepancy Row: Blurred vs Reconciled */}
                    <div
                      className={`p-2 rounded-xl border transition-all duration-700 flex items-center justify-between text-[11px] ${
                        !card3Active
                          ? 'bg-rose-950/70 border-rose-600/70'
                          : 'bg-emerald-950/60 border-emerald-600/70'
                      }`}
                    >
                      <span className="text-slate-200">Naqd pul & Qog‘oz kassa:</span>
                      {!card3Active ? (
                        <span className="font-mono font-bold text-rose-300 blur-[2.5px] transition-all select-none">
                          ??????? UZS
                        </span>
                      ) : (
                        <span className="font-mono font-bold text-emerald-300 animate-in fade-in">
                          3 280 000 UZS ✓
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Controls & Metric */}
            <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                  Ko‘rinmas yo‘qotish hajmi:
                </span>
                <span className="text-base font-black text-rose-400">
                  8% - 12% oylik kassa
                </span>
              </div>
              <button
                onClick={() => setCard3Active(!card3Active)}
                className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-slate-800 text-cyan-300 hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Sinab ko‘rish</span>
                <RotateCcw size={11} />
              </button>
            </div>
          </div>
        </div>

        {/* Narrative Connector to Next Step */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-cyan-950/60 border border-cyan-800/70 text-slate-200 text-xs sm:text-sm">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Sparkles size={16} />
              Elvora Health bularning barchasini qanday to‘xtatadi?
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span>
              Pastdagi jonli simulyator orqali bitta tugma bilan klinikani qutqarib ko‘ring:
            </span>
            <a
              href="#live-demo"
              className="px-4 py-2 rounded-xl bg-[#0088FF] text-white font-black hover:bg-[#0077DB] transition-all shadow-md active:scale-95"
            >
              Jonli Demoga O‘tish ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElvoraProblemCards;
