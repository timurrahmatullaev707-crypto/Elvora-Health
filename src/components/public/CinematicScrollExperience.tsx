import React, { useState, useRef } from 'react';
import {
  FileText,
  AlertTriangle,
  UserX,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  RotateCcw,
  Bot,
  Zap,
  ArrowRight,
  DollarSign,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useGsapContext, gsap, ScrollTrigger } from '../../lib/useGsapScroll';

interface StoryChapter {
  id: number;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  metrics: { label: string; value: string; sub: string; highlight?: boolean }[];
  visualType: 'problem' | 'ai_engine' | 'solution';
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    badge: '1-BOSQICH • AN\'ANAVIY KLINIKA',
    badgeColor: 'text-rose-600 bg-rose-50 border-rose-200',
    title: 'Ko\'rinmas No-Show va Tartibsiz Qog\'ozlar',
    subtitle:
      'O\'zbekistondagi xususiy klinikalar har kuni tushumining 25-30% ini yo\'qotadi. Bemorlar qabulga yoziladi, lekin kelmaydi. Shifokorlar kutib o\'tiradi, qabulxona qog\'oz daftarlar tartibsizligida, kassada esa pul nazoratdan chiqadi.',
    metrics: [
      { label: 'O\'rtacha No-Show', value: '28.4%', sub: 'Kelmagan bemorlar', highlight: true },
      { label: 'Kunda Bo\'sh Slotlar', value: '14-18 ta', sub: 'Yo\'qotilgan vaqt' },
      { label: 'Oylik Moliyaviy Zarar', value: '~38.5 mln UZS', sub: 'Klinika hisobidan' },
    ],
    visualType: 'problem',
  },
  {
    id: 2,
    badge: '2-BOSQICH • INTELLEKTUAL TRANSFORMASIYA',
    badgeColor: 'text-[#0284C7] bg-sky-50 border-sky-200',
    title: 'Elvora AI™ Triage va Avtomatlashtirish',
    subtitle:
      'Bemor klinikaga murojaat qilgan ilk soniyalardanoq Elvora AI alomatlarni tahlil qiladi, to\'g\'ri mutaxassisga yo\'naltiradi va avtomatik Telegram/SMS orqali qabulni tasdiqlatadi. Har bir bo\'sh slot avtomatik ravishda navbatdagi bemorga taklif qilinadi.',
    metrics: [
      { label: 'AI Triage Tezligi', value: '0.4 soniya', sub: 'Bemorga yo\'naltirish', highlight: true },
      { label: 'Eslatma Yetkazilishi', value: '99.8%', sub: 'Telegram & SMS orqali' },
      { label: 'Xodimlar Vaqti Tejalishi', value: '4.5 soat/kun', sub: 'Qo\'ng\'iroqsiz boshqaruv' },
    ],
    visualType: 'ai_engine',
  },
  {
    id: 3,
    badge: '3-BOSQICH • TO\'LIQ NAZORAT',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    title: '0% No-Show va 100% Kassa Shaffofligi',
    subtitle:
      'Klinika rahbari barcha tushumlarni, har bir shifokorning real ish yuklamasini va bemorlar qoniqish darajasini yagona ekranda ko\'radi. Kassa bilan qabullar uzviy bog\'langan: hech bir to\'lov chetdan o\'tmaydi.',
    metrics: [
      { label: 'Yangi No-Show Darajasi', value: '3.8%', sub: 'Minimal ko\'rsatkich', highlight: true },
      { label: 'Tiklab Qolingan Tushum', value: '+42.5 mln UZS', sub: 'Har oyda qo\'shimcha' },
      { label: 'Bemor Qoniqish Indeksi', value: '4.9 / 5.0', sub: '2,400+ fikrlar asosida' },
    ],
    visualType: 'solution',
  },
];

export const CinematicScrollExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useGsapContext(
    containerRef,
    () => {
      // Pinning & chapter transitions using GSAP ScrollTrigger
      const sections = gsap.utils.toArray<HTMLElement>('.cinematic-story-card');

      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 65%',
          end: 'bottom 45%',
          onEnter: () => setActiveChapterIndex(index),
          onEnterBack: () => setActiveChapterIndex(index),
        });
      });
    },
    []
  );

  const currentChapter = CHAPTERS[activeChapterIndex];

  return (
    <section
      ref={containerRef}
      id="texnologiya"
      className="py-24 lg:py-36 bg-[#0F172A] text-white relative overflow-hidden"
    >
      {/* Background Cinematic Atmosphere */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#0284C7]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#0D9488]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-teal-300">
            <Layers size={13} />
            <span>Klinika Transformatsiyasi</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            An'anaviy Qog'ozlardan{' '}
            <span className="bg-gradient-to-r from-teal-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Intellektual Boshqaruvga.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            Klinikangiz qanday qilib yo'qotishlarni to'xtatishi va avtomatlashtirilgan raqamli ekotizimga o'tishini bosqichma-bosqich ko'ring.
          </p>

          {/* Quick Step Buttons for mobile & desktop */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeChapterIndex === idx
                    ? 'bg-teal-500 text-[#0F172A] shadow-md shadow-teal-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {idx + 1}-Bosqich
              </button>
            ))}
          </div>
        </div>

        {/* Narrative Flow Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Story Feed */}
          <div className="lg:col-span-6 space-y-8">
            {CHAPTERS.map((chapter, index) => {
              const isSelected = activeChapterIndex === index;
              return (
                <div
                  key={chapter.id}
                  onClick={() => setActiveChapterIndex(index)}
                  className={`cinematic-story-card p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white/10 border-teal-400/50 shadow-2xl backdrop-blur-xl ring-1 ring-teal-400/30'
                      : 'bg-white/5 border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${chapter.badgeColor}`}
                    >
                      {chapter.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      0{chapter.id} / 03
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {chapter.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                    {chapter.subtitle}
                  </p>

                  {/* Metrics preview */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                    {chapter.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div
                          className={`text-base sm:text-lg font-black ${
                            m.highlight ? 'text-teal-300' : 'text-white'
                          }`}
                        >
                          {m.value}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 font-medium leading-tight">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Transformation Showcase (Sticky on desktop) */}
          <div className="lg:col-span-6 lg:sticky lg:top-32">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                    {currentChapter.badge}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Interaktiv Vizualizatsiya
                </span>
              </div>

              {/* Dynamic Visual depending on chapter */}
              {currentChapter.visualType === 'problem' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/50">
                    <div className="flex items-center gap-2 text-rose-300 font-bold text-xs mb-1">
                      <AlertTriangle size={15} />
                      Klinika Kassa Vaqtida No-Show Oqibati
                    </div>
                    <p className="text-xs text-rose-200/80 leading-relaxed">
                      Bemorlar belgilangan vaqtda kelmagani sababli shifokor vaqti zoe ketmoqda. O'rtacha hisobda kuniga 16 ta bo'sh darcha hosil bo'ladi.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <Clock size={14} className="text-rose-400" />
                        <span>09:45 • Kardiologiya (Bemor kelmadi)</span>
                      </div>
                      <span className="text-rose-400 font-bold font-mono">-180 000 UZS</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <Clock size={14} className="text-rose-400" />
                        <span>11:15 • Nevrologiya (Bo'sh slot)</span>
                      </div>
                      <span className="text-rose-400 font-bold font-mono">-150 000 UZS</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 text-slate-300">
                        <Clock size={14} className="text-rose-400" />
                        <span>14:30 • Terapevt (Qo'ng'iroqqa javob bermadi)</span>
                      </div>
                      <span className="text-rose-400 font-bold font-mono">-120 000 UZS</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs text-slate-400">
                    ⚠️ Qog'oz jurnallar bu yo'qotishni hisoblamaydi va klinika rahbariyatidan yashiradi.
                  </div>
                </div>
              )}

              {currentChapter.visualType === 'ai_engine' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/50">
                    <div className="flex items-center gap-2 text-sky-300 font-bold text-xs mb-1">
                      <Bot size={15} />
                      Elvora AI™ Avtomatik Eslatma va Triage
                    </div>
                    <p className="text-xs text-sky-200/80 leading-relaxed">
                      Tizim 24 soat va 2 soat oldin bemorlarga Telegram/SMS orqali interaktiv eslatma jo'natadi. Agar bemor bekor qilsa, slot zudlik bilan navbatdagiga taqdim etiladi.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 font-mono text-xs">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 size={13} />
                      <span>[SMS / Telegram]: 92 ta eslatma muvaffaqiyatli yetkazildi</span>
                    </div>
                    <div className="flex items-center gap-2 text-sky-300">
                      <Zap size={13} />
                      <span>[Avto-to'ldirish]: 14:30 dagi bo'sh slot yangi bemorga band qilindi</span>
                    </div>
                    <div className="flex items-center gap-2 text-teal-300">
                      <ShieldCheck size={13} />
                      <span>[Triage]: Kardiologga 8 ta to'g'ri profilaktik yo'naltirish</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-sky-900/20 border border-sky-700/40 text-center text-xs text-sky-300 font-medium">
                    ⚡ Klinika administratorlari bemorlarga qo'lda qo'ng'iroq qilishdan 100% xalos bo'ldi.
                  </div>
                </div>
              )}

              {currentChapter.visualType === 'solution' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/50">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs mb-1">
                      <TrendingUp size={15} />
                      Mukammal Natija: Rekord Foyda va To'liq Nazorat
                    </div>
                    <p className="text-xs text-emerald-200/80 leading-relaxed">
                      Klinikada bo'sh darchalar qolmadi, har bir to'lov kassa bilan sinxronlashdi, shifokorlar ish yuklamasi optimallashdi.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-900/40 text-center">
                      <div className="text-xl font-extrabold text-emerald-400">96.2%</div>
                      <div className="text-[11px] text-slate-400 mt-1">Shifokorlar Bandligi</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-900/40 text-center">
                      <div className="text-xl font-extrabold text-teal-400">0 ta</div>
                      <div className="text-[11px] text-slate-400 mt-1">Yo'qotilgan To'lov</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-900/20 border border-emerald-700/40 text-center text-xs text-emerald-300 font-medium">
                    🏆 O'rtacha xususiy klinika Elvora bilan birinchi oydayoq investitsiyasini 18x qilib qaytaradi.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicScrollExperience;
