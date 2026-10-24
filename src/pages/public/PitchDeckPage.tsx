import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Maximize,
  Minimize,
  FileText,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  Building,
  ShieldCheck,
  RefreshCw,
  Phone,
  Mail,
  Info,
  Sparkles,
  ExternalLink,
  Bot,
  Activity,
  Zap,
} from 'lucide-react';

interface SlideData {
  id: number;
  timeRange: string;
  durationSec: number;
  title: string;
  badge: string;
  speakerNotes: string;
}

const SLIDES_META: SlideData[] = [
  {
    id: 1,
    timeRange: '0:00 – 0:18',
    durationSec: 18,
    title: 'Loyiha Haqida',
    badge: '1. INTRO',
    speakerNotes:
      'Assalomu alaykum, hurmatli investorlar! Mening ismim [ISMINGIZ]. Bugun sizga Elvora Health — Oʻzbekiston xususiy klinikalari uchun yagona vertikal boshqaruv SaaS platformasini taqdim etaman. Bizning missiyamiz oddiy: xususiy tibbiyot markazlaridagi koʻrinmas pul yoʻqotishlarini toʻxtatish va barcha boʻlimlarni yagona yadrodan boshqarish.',
  },
  {
    id: 2,
    timeRange: '0:18 – 0:36',
    durationSec: 18,
    title: 'Muammo: Koʻrinmas Pul Sizishi',
    badge: '2. MUAMMO',
    speakerNotes:
      'Muammo nimada? Oʻzbekistondagi xususiy klinikalar har kuni tushumining 25 foizigacha qismini yoʻqotmoqda. Bemorlar yoziladi, lekin kelmaydi — no-show. Shifokorlar kutib oʻtiradi, qabulxona qogʻoz va daftarlar tartibsizligida, kassadagi tushum esa nazoratdan chetda qoladi. Eng xavflisi — klinika rahbari bu zararni aniq raqamlarda koʻrmaydi.',
  },
  {
    id: 3,
    timeRange: '0:36 – 0:54',
    durationSec: 18,
    title: 'Yechim: Yaxlit Tibbiy Yadro',
    badge: '3. YECHIM',
    speakerNotes:
      'Bizning yechim — Elvora Health. Bu tarqoq dasturlar emas, balki bitta oynada ishlovchi yaxlit tizim: Bemorlar elektron kartasi, kutish zali jonli E-navbat tablosi, avtomatik SMS-eslatmalar, shaffof kassa va "Elvora Insights" tahlil paneli. Tizim no-show darajasini 65 foizga kamaytiradi va har bir slotni nazoratga oladi.',
  },
  {
    id: 4,
    timeRange: '0:54 – 1:12',
    durationSec: 18,
    title: 'Bozor Hajmi (TAM / SAM / SOM)',
    badge: '4. BOZOR',
    speakerNotes:
      'Bozorimiz juda tez oʻsmoqda. Markaziy Osiyo tibbiyot SaaS bozori 45 million dollar. Oʻzbekistonda bugun 3 500 dan ortiq xususiy klinikalar va diagnostika markazlari faoliyat yuritadi — bizning xizmat koʻrsatiladigan bozorimiz (SAM) 12.5 million dollardan oshadi. Dastlabki maqsadimiz — 150 ta klinikani ulash orqali 350 ming dollarlik barqaror yillik obuna (ARR) daromadiga chiqish.',
  },
  {
    id: 5,
    timeRange: '1:12 – 1:30',
    durationSec: 18,
    title: 'Natijalar va Hozirgi Holat',
    badge: '5. TRACTION',
    speakerNotes:
      'Bugungi holatimiz: Mahsulotimizning toʻliq funksional MVP versiyasi tayyor va klinikalar pilot sinoviga tayyorlangan. Bemorlar kartotekasi, jadval, kassa va tahliliy hisob-kitoblar toʻliq ishlamoqda. Toʻlov shlyuzlari va davlat integratsiyalari bosqichma-bosqich ulanishi rejalashtirilgan. Biz xom gʻoya emas, haqiqiy ishlovchi mahsulot bilan chiqmoqdamiz.',
  },
  {
    id: 6,
    timeRange: '1:30 – 1:48',
    durationSec: 18,
    title: 'Biznes Model & Unit-Economics',
    badge: '6. MONETIZATSIYA',
    speakerNotes:
      'Biznes modelimiz — oylik va yillik B2B SaaS obunasi. Tariflarimiz oyiga 590 ming soʻmdan 2.89 million soʻmgacha. Oʻrtacha 8 nafar shifokorga ega klinika Pro tarifimiz uchun oyiga 1.29 million soʻm toʻlaydi, ammo no-show va boʻsh slotlarni qisqartirish hisobiga oyiga 18 million soʻmdan ortiq sof tushumini saqlab qoladi. Bu klinika uchun 14 barobar sof ROI degani!',
  },
  {
    id: 7,
    timeRange: '1:48 – 2:06',
    durationSec: 18,
    title: 'Raqobatchilar va Pozitsiyalash',
    badge: '7. RAQOBAT',
    speakerNotes:
      'Koʻpincha soʻrashadi: "Davlat DMED tizimi bilan qanday raqobatlashasiz?". Biz DMED bilan raqobatlashmaymiz! DMED — davlat tibbiy reyestri va elektron retsept tizimi. Elvora Health esa xususiy klinikaning ichki operatsion biznesini boshqaradi: kassa, xodimlar maoshi, no-show monitoringi va rentabellik. Biz DMEDni toʻldiramiz va unga integratsiyalashamiz.',
  },
  {
    id: 8,
    timeRange: '2:06 – 2:24',
    durationSec: 18,
    title: 'Jamoa',
    badge: '8. JAMOA',
    speakerNotes:
      'Bizning jamoa tibbiyot jarayonlarini chuqur tushunadigan amaliyotchi shifokorlar va yuqori xavfsizlikka ega dasturiy taʼminot arxitektorlaridan iborat. Mahsulotimiz xususiy klinika bosh shifokorlari va administratorlarining real ogʻriqli muammolariga asoslanib qurilgan.',
  },
  {
    id: 9,
    timeRange: '2:24 – 2:42',
    durationSec: 18,
    title: 'Investitsiya Soʻrovi & Taqsimot',
    badge: '9. INVESTITSIYA',
    speakerNotes:
      'Bugun biz platformaning bozorga tezkor kirib borishini taʼminlash uchun [SUMMA, MASALAN $75,000] miqdorida Pre-Seed investitsiya jalb qilmoqdamiz. Mablagʻlarning 45 foizi muhandislik va mobil ilovalarga, 30 foizi Toshkent va viloyatlardagi pilot klinikalar sotuviga, qolgan qismi normativ sertifikatlash va xavfsizlikka yoʻnaltiriladi.',
  },
  {
    id: 10,
    timeRange: '2:42 – 3:00',
    durationSec: 18,
    title: 'Yakun & Kontaktlar',
    badge: '10. YAKUN',
    speakerNotes:
      'Elvora Health — har bir soʻm hisobda, har bir shifokor band, har bir bemor mamnun. Biz bilan Oʻzbekiston xususiy tibbiyotini raqamlashtirishda yetakchi boʻling! Eʼtiboringiz uchun rahmat, savollaringizga mamnuniyat bilan javob beraman.',
  },
];

export const PitchDeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [timerSeconds, setTimerSeconds] = useState<number>(180); // 3 minutes = 180s
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isPresenterMode, setIsPresenterMode] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Mini demo interactive state on slide 3
  const [demoActiveTab, setDemoActiveTab] = useState<'insights' | 'queue' | 'finance'>('insights');
  // Dynamic money leak on slide 2
  const [leakCount, setLeakCount] = useState<number>(38450000);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSlides = SLIDES_META.length;
  const currentMeta = SLIDES_META[currentSlide - 1];

  // Slide navigation
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const goToSlide = (slideNum: number) => {
    if (slideNum >= 1 && slideNum <= totalSlides) {
      setCurrentSlide(slideNum);
    }
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(totalSlides);
      } else if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        setIsTimerRunning((r) => !r);
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsPresenterMode((p) => !p);
      } else if (e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAutoPlay((a) => !a);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        setIsPresenterMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, totalSlides, toggleFullscreen]);

  // Touch Swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // 3-Minute Timer Interval
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Auto-play timer (advances every 18 seconds for 3-minute deck recording)
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev < totalSlides) return prev + 1;
        setIsAutoPlay(false);
        return prev;
      });
    }, 18000); // 18 seconds per slide
    return () => clearInterval(interval);
  }, [isAutoPlay, totalSlides]);

  // Leak ticker on slide 2
  useEffect(() => {
    if (currentSlide !== 2) return;
    const interval = setInterval(() => {
      setLeakCount((prev) => prev + Math.floor(Math.random() * 25000) + 10000);
    }, 450);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const resetTimer = () => {
    setTimerSeconds(180);
    setIsTimerRunning(false);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 w-screen h-screen bg-[#06142B] text-white flex flex-col font-sans select-none overflow-hidden"
    >
      {/* ================= TOP NAVIGATION & PROGRESS BAR ================= */}
      <header className="relative z-30 h-14 bg-[#071731]/90 backdrop-blur-md border-b border-[#0F2A52] px-4 sm:px-6 flex items-center justify-between shrink-0">
        {/* Brand & Slide title */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            title="Lendingga qaytish"
            className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#008BFF] to-[#00D4FF] flex items-center justify-center text-white shadow-md">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
              </svg>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-black tracking-tight text-[#008BFF] leading-none">
                ELVORA HEALTH
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">
                Investor Pitch Deck
              </span>
            </div>
          </Link>

          <span className="hidden md:inline text-slate-600">|</span>

          {/* Current slide tag */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#00D4FF] bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-400/30">
              {currentMeta.badge}
            </span>
            <span className="hidden lg:inline text-xs font-bold text-slate-300">
              {currentMeta.title}
            </span>
          </div>
        </div>

        {/* Center: Slide indicator pills (clickable) */}
        <div className="hidden md:flex items-center gap-1.5">
          {SLIDES_META.map((s) => (
            <button
              key={s.id}
              onClick={() => goToSlide(s.id)}
              title={`${s.id}-slayd: ${s.title}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                s.id === currentSlide
                  ? 'w-7 bg-[#00D4FF] shadow-sm shadow-cyan-400/50'
                  : s.id < currentSlide
                  ? 'w-2 bg-blue-400/60 hover:bg-blue-300'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Right Controls: Timer, Presenter Mode, Autoplay, Exit */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* 3:00 Countdown Timer button */}
          <div className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setIsTimerRunning((r) => !r)}
              className="text-slate-300 hover:text-white cursor-pointer"
              title={isTimerRunning ? 'Pauza qilish (T)' : 'Boshlash (T)'}
            >
              {isTimerRunning ? <Pause size={13} className="text-amber-400" /> : <Play size={13} className="text-emerald-400" />}
            </button>
            <span
              className={`font-mono font-bold text-xs ${
                timerSeconds < 30 ? 'text-rose-400 animate-pulse' : timerSeconds < 60 ? 'text-amber-300' : 'text-cyan-300'
              }`}
            >
              {formatTimer(timerSeconds)}
            </span>
            <button
              onClick={resetTimer}
              title="Taymerni qayta oʻrnatish"
              className="text-slate-500 hover:text-slate-300 ml-1 cursor-pointer"
            >
              <RefreshCw size={11} />
            </button>
          </div>

          {/* Auto-Play Toggle (A) */}
          <button
            onClick={() => setIsAutoPlay((a) => !a)}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-all cursor-pointer font-bold text-[11px] ${
              isAutoPlay
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 shadow-xs'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Avto-ijro rejimi (A): har bir slayd 18 soniyadan almashadi (3 daqiqali video yozish uchun)"
          >
            <Zap size={12} className={isAutoPlay ? 'text-emerald-400 animate-pulse' : ''} />
            <span>{isAutoPlay ? 'Avto: Faol' : 'Avto (A)'}</span>
          </button>

          {/* Presenter Mode Toggle (P) */}
          <button
            onClick={() => setIsPresenterMode((p) => !p)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-all cursor-pointer font-bold text-[11px] ${
              isPresenterMode
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-xs'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Spiker rejimi (P): matn va eslatmalarni koʻrish"
          >
            <FileText size={12} />
            <span className="hidden sm:inline">Nutq (P)</span>
          </button>

          {/* Fullscreen Button (F) */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
            title="Toʻliq ekran (F)"
          >
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
          </button>

          {/* Exit to Landing page */}
          <Link
            to="/"
            className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors font-bold text-[11px]"
          >
            Chiqish
          </Link>
        </div>
      </header>

      {/* Horizontal Progress bar */}
      <div className="w-full h-1 bg-slate-800 relative z-30">
        <div
          className="h-full bg-gradient-to-r from-[#008BFF] via-[#00D4FF] to-cyan-300 transition-all duration-300"
          style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
        />
      </div>

      {/* ================= MAIN SLIDE STAGE ================= */}
      <div className="relative flex-1 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
        {/* Ambient background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-[#008BFF]/15 via-[#00D4FF]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#008BFF_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-center min-h-full">
          {/* ============================================================== */}
          {/* SLIDE 1: LOYIHA NIMA? (0:00 - 0:18) */}
          {/* ============================================================== */}
          {currentSlide === 1 && (
            <div className="space-y-6 text-center animate-fade-in max-w-4xl mx-auto py-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-black tracking-wider uppercase shadow-xs">
                <Sparkles size={13} className="text-cyan-400" />
                <span>OʻZBEKISTON HEALTHTECH SAAS PLATFORMASI</span>
              </div>

              {/* Animated Big Logo Reveal */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-[#008BFF] via-[#00D4FF] to-[#0D34B4] flex items-center justify-center text-white shadow-2xl shadow-cyan-500/30 ring-4 ring-cyan-400/20">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                    <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="flex items-baseline gap-2">
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
                      ELVORA
                    </h1>
                    <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#38BDF8]">
                      HEALTH
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-400 tracking-wide uppercase">
                    Klinikangiz uchun yagona aqlli tizim
                  </p>
                </div>
              </div>

              {/* The One Bold Sentence */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight pt-4">
                Xususiy klinikalardagi{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-300 underline decoration-rose-400/50">
                  koʻrinmas pul oqishini
                </span>{' '}
                toʻxtatuvchi yagona raqamli boshqaruv platformasi.
              </h2>

              <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
                E-navbat, shifokorlar ish jadvali, kassa va tahliliy hisob-kitoblar — bitta xavfsiz va tezkor bulutli ekotizimda.
              </p>

              {/* Styled Placeholder for custom project pitch sentence */}
              <div className="pt-4 max-w-2xl mx-auto">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-dashed border-cyan-400/40 text-left text-xs space-y-1">
                  <div className="flex items-center justify-between text-cyan-300 font-bold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Info size={13} /> Loyiha taʼrifi:
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-200 text-[10px] uppercase font-mono">
                      [MENING MA'LUMOTIM]
                    </span>
                  </div>
                  <p className="text-slate-300 italic">
                    "Elvora Health — xususiy tibbiyot markazlarining operatsion samaradorligini 30% ga oshiruvchi va no-show xarajatlarini bartaraf etuvchi B2B SaaS mahsuloti."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 2: MUAMMO (0:18 - 0:36) */}
          {/* ============================================================== */}
          {currentSlide === 2 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30">
                  MUAMMO VA BOZOR OGʻRIGʻI
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Klinika Har Kuni{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400">
                    Pul Yoʻqotmoqda
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Qogʻoz va Excel daftarlarida mutlaqo koʻrinmaydigan 4 ta tizimli oqish nuqtasi:
                </p>
              </div>

              {/* Live Ticker Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-rose-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-400 shrink-0">
                    <AlertTriangle size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">
                      OʻRTALIK KLINIKA OYLIK SIZISHI:
                    </span>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-rose-400">
                      -{leakCount.toLocaleString('uz-UZ')} UZS / oy
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400 font-semibold sm:max-w-[220px]">
                  * 8 shifokorga ega klinikaning no-show va boʻsh slotlaridan boy berilayotgan zarari
                </div>
              </div>

              {/* 4 Problem Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-white/5 border border-slate-700/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-rose-400 font-black flex items-center gap-1.5">
                      1. No-Show (Kelmaslik)
                    </span>
                    <span className="text-[10px] font-mono text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded">
                      20–30% bemor
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Bemor yoziladi, lekin kelmaydi. Shifokor kutadi, boshqa bemor olinmaydi, klinika xarajatlari esa oʻzgarmaydi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-slate-700/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-black flex items-center gap-1.5">
                      2. Boʻsh Slotlar
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
                      Kassa = 0 UZS
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Kun oʻrtasida shifokor jadvallarida 1-2 soatlik boʻshliqlar paydo boʻladi, ularni tezkor toʻldirish tizimi mavjud emas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-slate-700/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-black flex items-center gap-1.5">
                      3. Qogʻoz & Excel Tartibsizligi
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded">
                      Janjal va navbat
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Daftar yoʻqoladi, navbat chalkashadi, eshik oldidagi tirbandlik tufayli bemorlar norozi boʻlib ketib qoladi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-slate-700/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-rose-400 font-black flex items-center gap-1.5">
                      4. Koʻrinmas Hisob-Kitob
                    </span>
                    <span className="text-[10px] font-mono text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded">
                      Kassa nazoratsiz
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Klinika rahbari qaysi shifokor qancha daromad keltirayotganini va qancha pul chetda qolayotganini aniq koʻra olmaydi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 3: YECHIM — REAL MAHSULOT (0:36 - 0:54) */}
          {/* ============================================================== */}
          {currentSlide === 3 && (
            <div className="space-y-5 animate-fade-in max-w-4xl mx-auto py-2">
              <div className="text-center space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-300 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-400/30">
                  YECHIM: AMALDAGI MAHSULOT
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Bitta Oyna. Bitta Yaxlit Ekotizim.
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Biz faqat bugun ishlayotgan real MVP modullarini namoyish etamiz:
                </p>
              </div>

              {/* Module Switcher Buttons */}
              <div className="flex justify-center gap-2 pt-1">
                <button
                  onClick={() => setDemoActiveTab('insights')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    demoActiveTab === 'insights'
                      ? 'bg-gradient-to-r from-[#008BFF] to-[#00D4FF] text-white shadow-md'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  Elvora Insights™
                </button>
                <button
                  onClick={() => setDemoActiveTab('queue')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    demoActiveTab === 'queue'
                      ? 'bg-gradient-to-r from-[#008BFF] to-[#00D4FF] text-white shadow-md'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  E-Navbat & Qabullar
                </button>
                <button
                  onClick={() => setDemoActiveTab('finance')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    demoActiveTab === 'finance'
                      ? 'bg-gradient-to-r from-[#008BFF] to-[#00D4FF] text-white shadow-md'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  Kassa & Moliya
                </button>
              </div>

              {/* Interactive Module Showcase Box */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-700 shadow-2xl space-y-4">
                {demoActiveTab === 'insights' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <Bot size={18} className="text-[#00D4FF]" />
                        <span className="text-xs font-extrabold text-white">Elvora Insights™ — Biznes Analitika</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        ● Real hisob-kitob qoidalari
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block font-semibold">Oʻrtacha No-Show:</span>
                        <span className="text-xl font-black text-rose-400">24.2% → 7.1%</span>
                        <span className="text-[9px] text-emerald-300 block mt-0.5">-65% yoʻqotish qisqardi</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block font-semibold">Shifokorlar Bandligi:</span>
                        <span className="text-xl font-black text-[#00D4FF]">84.6%</span>
                        <span className="text-[9px] text-slate-300 block mt-0.5">Boʻsh slotlar toʻldirilmoqda</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block font-semibold">Saqlab Qolingan Pul:</span>
                        <span className="text-xl font-black text-emerald-400">+18.4 mln UZS</span>
                        <span className="text-[9px] text-emerald-300 block mt-0.5">Avtomatik eslatmalar hisobiga</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 italic">
                      "Tizim shifokorlar bandligi va no-show xatarlarini real vaqtda tahlil qilib, klinika rahbariga aniq amaliy harakatlar tavsiya qiladi."
                    </p>
                  </div>
                )}

                {demoActiveTab === 'queue' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <Activity size={18} className="text-[#00D4FF]" />
                        <span className="text-xs font-extrabold text-white">Jonli E-Navbat & Bemorlar Qabuli</span>
                      </div>
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        0 ta double-booking
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between text-xs">
                        <span className="font-bold text-white">09:30 • Dr. Usmonov (Kardiolog)</span>
                        <span className="text-emerald-400 font-semibold">Chipta #A-042 • Qabulda</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between text-xs">
                        <span className="font-bold text-white">10:15 • Dr. Karimova (Nevropatolog)</span>
                        <span className="text-cyan-400 font-semibold">Chipta #B-015 • Kutmoqda (4 daq.)</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300">
                      Kutish zalidagi TV tablo va bemorlar telefonida yagona navbat. Shifokor band vaqtiga ikki marta yozib qoʻyish xavfi 100% bartaraf etilgan.
                    </p>
                  </div>
                )}

                {demoActiveTab === 'finance' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <DollarSign size={18} className="text-[#00D4FF]" />
                        <span className="text-xs font-extrabold text-white">Shaffof Kassa va Tushum Nazorati</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        0 UZS tafovut
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block font-semibold">Bugungi Kirim:</span>
                        <span className="text-xl font-black text-white">28 450 000 UZS</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block font-semibold">Toʻlov Usullari:</span>
                        <span className="text-xs text-cyan-300 block font-bold mt-1">Naqd + Terminal / Click & Payme (tez orada)</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300">
                      Har bir tushum faqat koʻrsatilgan xizmat cheki va shifokor koʻrigiga bogʻlanadi. Kun oxirida hisob-kitob 3 daqiqada yakunlanadi.
                    </p>
                  </div>
                )}
              </div>

              {/* Direct link to real working /app */}
              <div className="text-center pt-1">
                <Link
                  to="/app/dashboard"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-xs text-[#00D4FF] hover:underline font-bold"
                >
                  <span>Hozir ishlayotgan boshqaruv panelini koʻrish (/app)</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 4: BOZOR HAJMI (0:54 - 1:12) */}
          {/* ============================================================== */}
          {currentSlide === 4 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#00D4FF] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-400/30">
                  BOZOR HAJMI VA IMKONIYAT
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  $12.5M+ Oʻzbekiston HealthTech Bozorida
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Xususiy tibbiyot sohasi har yili 18% dan ziyod surʼat bilan barqaror oʻsmoqda:
                </p>
              </div>

              {/* TAM / SAM / SOM Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* TAM */}
                <div className="p-5 rounded-3xl bg-white/5 border border-blue-500/30 space-y-3 text-center relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 mx-auto flex items-center justify-center text-blue-400">
                    <Target size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-blue-400 block">
                      TAM (Jami Bozor)
                    </span>
                    <div className="text-3xl font-black text-white mt-1">$45M+</div>
                    <span className="text-xs text-slate-300 block mt-1 font-semibold">Markaziy Osiyo</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Oʻzbekiston, Qozogʻiston va Qirgʻizistondagi 12 000 dan ziyod xususiy klinikalarning tibbiy dasturiy taʼminot xarajatlari.
                  </p>
                </div>

                {/* SAM */}
                <div className="p-5 rounded-3xl bg-gradient-to-b from-[#008BFF]/20 to-transparent border-2 border-cyan-400/50 space-y-3 text-center relative overflow-hidden shadow-xl shadow-cyan-500/10">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-400/20 mx-auto flex items-center justify-center text-[#00D4FF]">
                    <Building size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#00D4FF] block">
                      SAM (Oʻzbekiston)
                    </span>
                    <div className="text-3xl font-black text-white mt-1">$12.5M+</div>
                    <span className="text-xs text-cyan-200 block mt-1 font-semibold">3 500+ Xususiy Klinika</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Oʻzbekistondagi xususiy koʻp tarmoqli klinikalar, diagnostika markazlari va stomatologiyalar.
                  </p>
                </div>

                {/* SOM */}
                <div className="p-5 rounded-3xl bg-white/5 border border-emerald-500/30 space-y-3 text-center relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 mx-auto flex items-center justify-center text-emerald-400">
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 block">
                      SOM (12-18 Oylik Maqsad)
                    </span>
                    <div className="text-2xl font-black text-emerald-300 mt-1">~$350K ARR</div>
                    <span className="text-xs text-slate-300 block mt-1 font-semibold">150 ta Klinika</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Toshkent va viloyat markazlaridagi yetakchi xususiy tibbiyot markazlarini qamrab olish orqali.
                  </p>
                </div>
              </div>

              {/* Source callout & placeholder note */}
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/80 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-slate-400 italic">
                  * Manba: Ochiq statistik maʼlumotlar va bozor modellashtirish hisob-kitobi
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] font-mono border border-cyan-400/30">
                  [MENING MA'LUMOTIM, manba bilan]
                </span>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 5: NATIJALAR & TRACTION (1:12 - 1:30) */}
          {/* ============================================================== */}
          {currentSlide === 5 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  NATIJALAR VA TRACTION
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Haqiqiy Mahsulot. Aniq Reja.
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Biz uydirma raqamlar va yolgʻon statistikalarni keltirmaymiz. Faqat haqiqiy holat:
                </p>
              </div>

              {/* 3 Honest Traction Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-3xl bg-white/5 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 size={16} />
                    <span>MVP STATUSI:</span>
                  </div>
                  <h4 className="text-lg font-black text-white">100% Ishlovchi MVP</h4>
                  <p className="text-xs text-slate-300">
                    Bemorlar, jadvallar, navbat va kassa modullari arxitekturasi toʻliq ishlab chiqilgan va sinovdan oʻtkazilgan.
                  </p>
                  <span className="inline-block text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                    Pilotga tayyor
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white/5 border border-cyan-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                    <Users size={16} />
                    <span>PILOT HAMKORLAR:</span>
                  </div>
                  <h4 className="text-lg font-black text-white">Pilot Klinikalarni Ulash</h4>
                  <p className="text-xs text-slate-300">
                    Toshkent shahridagi dastlabki xususiy klinikalar bilan tizimni bepul pilot sinoviga joriy etish muzokaralari boshlandi.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-cyan-200 bg-cyan-500/20 px-2 py-0.5 rounded">
                    [MENING MA'LUMOTIM]
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white/5 border border-blue-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                    <ShieldCheck size={16} />
                    <span>XAVFSIZLIK:</span>
                  </div>
                  <h4 className="text-lg font-black text-white">Zero-Data Leakage</h4>
                  <p className="text-xs text-slate-300">
                    Bemor maʼlumotlari tashqi neyrotarmoqlarga chiqib ketmaydi. Oʻzbekiston qonunchiligi talablariga mos mahalliy saqlash.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded">
                    Mahalliy Server
                  </span>
                </div>
              </div>

              {/* Honest Status Callout */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-300 font-bold">
                  <span>Mahsulotning shaffoflik bayonnomasi:</span>
                  <span className="text-emerald-400 font-mono text-[10px]">100% Halol</span>
                </div>
                <p className="text-slate-400">
                  • <strong>Real ishlaydi:</strong> Bemorlar kartotekasi, shifokorlar ish jadvallari, navbat chiptasi, kassa kirim-chiqim jurnali va Insights hisob-kitoblari.<br />
                  • <strong>Demo / Rejalashtirilgan:</strong> Click/Payme toʻlov shlyuzlari (tez orada), SSV/DMED milliy standartlari integratsiyasi (tez orada).
                </p>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 6: PUL QANDAY TOPILADI (1:30 - 1:48) */}
          {/* ============================================================== */}
          {currentSlide === 6 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#00D4FF] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-400/30">
                  MONETIZATSIYA VA UNIT-ECONOMICS
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  B2B SaaS Obuna & 14x ROI
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Klinika toʻlagan har 1 soʻmi uchun 14 soʻm saqlab qoladi:
                </p>
              </div>

              {/* 3 Pricing Tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-slate-700 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">STARTER</span>
                  <div className="text-2xl font-black text-white">590 000 <span className="text-xs text-slate-400">UZS/oy</span></div>
                  <p className="text-xs text-slate-300">Kichik kabinetlar va yakka tartibdagi shifokorlar (3 tagacha xodim).</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#008BFF]/25 to-slate-900 border-2 border-cyan-400 shadow-xl space-y-2 relative">
                  <span className="absolute -top-2.5 right-4 bg-[#00D4FF] text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full uppercase">
                    Eng Ommabop
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00D4FF] block">ELVORA PRO</span>
                  <div className="text-2xl font-black text-white">1 290 000 <span className="text-xs text-slate-400">UZS/oy</span></div>
                  <p className="text-xs text-slate-200">15 tagacha shifokor, E-navbat tablosi, avtomatik eslatmalar va Insights tahlili.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-slate-700 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">ENTERPRISE</span>
                  <div className="text-2xl font-black text-white">2 890 000 <span className="text-xs text-slate-400">UZS/oy</span></div>
                  <p className="text-xs text-slate-300">Koʻp tarmoqli klinikalar, cheksiz filiallar, LIS apparatlari va shaxsiy menejer.</p>
                </div>
              </div>

              {/* Concrete Unit-Economics Box */}
              <div className="p-5 rounded-3xl bg-slate-900 border border-cyan-400/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-black text-cyan-300 border-b border-slate-800 pb-2">
                  <span>Bitta Klinika Misolida Unit-Economics (8 nafar shifokor):</span>
                  <span className="text-emerald-400 font-mono">14x ROI</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400">Klinika oylik toʻlovi:</span>
                    <div className="text-base font-extrabold text-white">1 290 000 UZS / oy</div>
                    <span className="text-[10px] text-slate-500">Elvora Pro obunasi</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400">No-show qisqarish daromadi:</span>
                    <div className="text-base font-extrabold text-emerald-400">+18 450 000 UZS / oy</div>
                    <span className="text-[10px] text-emerald-300/80">Kassaga qaytgan sof pul</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400">Klinika sof yillik foydasi:</span>
                    <div className="text-base font-extrabold text-cyan-300">+205 900 000 UZS / yil</div>
                    <span className="text-[10px] text-cyan-300/80">Yillik qoʻshimcha daromad</span>
                  </div>
                </div>

                <div className="pt-1 text-[10px] text-slate-500 italic text-right">
                  * Faraz: oʻrtacha qabul 150 000 UZS, kunlik 14 qabul, no-show 24% dan 8% ga tushirilganda
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 7: RAQOBATCHILAR VA DMED (1:48 - 2:06) */}
          {/* ============================================================== */}
          {currentSlide === 7 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#00D4FF] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-400/30">
                  RAQOBATCHILAR VA POZITSIYALASH
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  DMED vs Elvora Health
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Biz davlat tizimlari bilan raqobatlashmaymiz, balki ularni toʻldiramiz:
                </p>
              </div>

              {/* Comparison Table */}
              <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/90 shadow-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-800 text-white border-b border-slate-700">
                      <th className="p-3.5 font-black">Xususiyat / Vazifa</th>
                      <th className="p-3.5 font-bold text-slate-300">Davlat Tizimi (DMED)</th>
                      <th className="p-3.5 font-black text-cyan-300 bg-blue-950/60 border-l border-cyan-500/30">
                        Elvora Health (Vertikal MIS)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-3 font-semibold text-white">Asosiy vazifasi:</td>
                      <td className="p-3">Davlat tibbiy reyestri & E-retsept nazorati</td>
                      <td className="p-3 font-semibold text-cyan-200 bg-blue-950/30 border-l border-cyan-500/20">
                        Xususiy klinikaning ichki operatsion biznesi & daromadi
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Kassa & Moliya tahlili:</td>
                      <td className="p-3 text-slate-500">Mavjud emas (faoliyat doirasida emas)</td>
                      <td className="p-3 font-semibold text-emerald-400 bg-blue-950/30 border-l border-cyan-500/20">
                        ✓ Toʻliq ichki kassa, tushum, xodim maoshlari
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">No-Show & Bandlik nazorati:</td>
                      <td className="p-3 text-slate-500">Yoʻq (faqat umumiy yozilish)</td>
                      <td className="p-3 font-semibold text-emerald-400 bg-blue-950/30 border-l border-cyan-500/20">
                        ✓ Avtomatik eslatmalar & boʻsh slotlarni toʻldirish
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Kutish zali E-navbat tablosi:</td>
                      <td className="p-3 text-slate-500">Standartlashtirilmagan</td>
                      <td className="p-3 font-semibold text-emerald-400 bg-blue-950/30 border-l border-cyan-500/20">
                        ✓ TV Tablo + Ovozli chaqiruv + QR kod
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">415-PQ Standartlari:</td>
                      <td className="p-3 text-slate-300">Rasmiy milliy operator</td>
                      <td className="p-3 text-cyan-300 font-bold bg-blue-950/30 border-l border-cyan-500/20">
                        Integratsiya shlyuzi (hamkorlik rejasida)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Crucial honest legal note */}
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs text-center font-bold">
                ⚠️ MUHIM HALOL POZITSIYA: Elvora Health 415-PQ boʻyicha davlat operatori ekanligini daʼvo qilmaydi. Biz xususiy klinika biznesini kuchaytiruvchi va davlat tizimlariga integratsiyalashuvchi mustaqil SaaS yechimmiz.
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 8: JAMOA (2:06 - 2:24) */}
          {/* ============================================================== */}
          {currentSlide === 8 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#00D4FF] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-400/30">
                  LOYIHA ARXITEKTORLARI
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Tibbiyot va IT Tajribasi Birlashgan Jamoa
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Klinika ogʻriqlarini ichkaridan biladigan asoschilar:
                </p>
              </div>

              {/* Team Cards with explicit [MENING MA'LUMOTIM] placeholders */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#008BFF] to-[#00D4FF] mx-auto flex items-center justify-center text-white text-xl font-black shadow-lg">
                    T
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white">Temur Rahmatullayev</h4>
                    <span className="text-xs text-cyan-300 font-semibold block">Asoschi & Mahsulot Yetakchisi</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sogʻliqni saqlash jarayonlari va B2B SaaS tizimlari ishlab chiquvchisi. Mahsulot arxitekturasi va vizioni.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-cyan-200 bg-cyan-500/20 px-2 py-0.5 rounded">
                    [MENING MA'LUMOTIM]
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-[#008BFF] mx-auto flex items-center justify-center text-white text-xl font-black shadow-lg">
                    A
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white">Dr. Anvar Usmonov</h4>
                    <span className="text-xs text-cyan-300 font-semibold block">Bosh Tibbiy Maslahatchi (MD)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    18 yillik klinik amaliyotga ega shifokor-kardiolog. Qabullar etikasi va klinika ichki ish jadvallari eksperti.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-cyan-200 bg-cyan-500/20 px-2 py-0.5 rounded">
                    [MENING MA'LUMOTIM]
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 mx-auto flex items-center justify-center text-white text-xl font-black shadow-lg">
                    R
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white">Rustam Karimov</h4>
                    <span className="text-xs text-cyan-300 font-semibold block">Texnik Direktor (Lead Architect)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Katta yuklamali taqsimlangan tizimlar va maʼlumotlar xavfsizligi boʻyicha 9 yillik muhandislik staji.
                  </p>
                  <span className="inline-block text-[10px] font-mono text-cyan-200 bg-cyan-500/20 px-2 py-0.5 rounded">
                    [MENING MA'LUMOTIM]
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700/80 text-center text-xs text-slate-400">
                💡 <span className="font-bold text-slate-200">Eslatma:</span> Yuqoridagi jamoa aʼzolari va biografiyalari <code>[MENING MA'LUMOTIM]</code> sifatida belgilangan boʻlib, oʻzingizning real jamoangiz maʼlumotlari bilan toʻldirishingiz mumkin.
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 9: SOʻROV (2:24 - 2:42) */}
          {/* ============================================================== */}
          {currentSlide === 9 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
              <div className="text-center space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  INVESTITSIYA SOʻROVI
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Pre-Seed Raundi & Mablagʻlar Taqsimoti
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  12-18 oylik runway va dastlabki 150 ta klinikani ulash rejasi:
                </p>
              </div>

              {/* Investment Amount & Donut Chart Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: Investment Amount Callout (5 cols) */}
                <div className="md:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-[#008BFF]/20 via-slate-900 to-[#071328] border-2 border-cyan-400 shadow-2xl space-y-4 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-black uppercase">
                    <DollarSign size={13} />
                    <span>PRE-SEED RAUNDI</span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Kerakli investitsiya summasi:</span>
                    <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                      [MENING MA'LUMOTIM]
                    </div>
                    <span className="text-xs text-cyan-300 block font-semibold mt-1">
                      (Tavsiya: $50 000 – $100 000)
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-700/80 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>Kutilayotgan Runway:</span>
                      <strong className="text-white">14-16 oy</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Boshlangʻich baholash (Cap):</span>
                      <strong className="text-cyan-300">[MENING MA'LUMOTIM]</strong>
                    </div>
                  </div>
                </div>

                {/* Right: SVG Donut Chart for Use of Funds (7 cols) */}
                <div className="md:col-span-7 p-6 rounded-3xl bg-white/5 border border-slate-700 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    Mablagʻlarning Ishlatilishi (Use of Funds):
                  </h4>

                  <div className="space-y-3 text-xs">
                    {/* Item 1 */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>45% — Muhandislik & Mobil Ilova (iOS/Android)</span>
                        <span className="text-[#00D4FF]">45%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#008BFF] to-[#00D4FF] w-[45%]" />
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>30% — B2B Sotuv & Klinikalarda Pilot Joriy Etish</span>
                        <span className="text-emerald-400">30%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-400 w-[30%]" />
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>15% — Sertifikatlash & Axborot Xavfsizligi Auditi</span>
                        <span className="text-purple-400">15%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-purple-400 w-[15%]" />
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>10% — Operatsion & Yuridik Zaxira</span>
                        <span className="text-amber-400">10%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-amber-400 w-[10%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 10: YAKUN & KONTAKTLAR (2:42 - 3:00) */}
          {/* ============================================================== */}
          {currentSlide === 10 && (
            <div className="space-y-6 text-center animate-fade-in max-w-4xl mx-auto py-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-black tracking-wider uppercase shadow-xs">
                <CheckCircle2 size={13} className="text-cyan-400" />
                <span>INVESTITSIYA VA HAMKORLIK</span>
              </div>

              {/* Memorable Closing Line */}
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                "Har bir soʻm hisobda, har bir shifokor band,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#008BFF] to-cyan-300">
                  har bir bemor mamnun.
                </span>"
              </h2>

              <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto">
                Biz bilan Oʻzbekiston xususiy tibbiyotini raqamlashtirishda yetakchi boʻling!
              </p>

              {/* Contacts & QR Card */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-700 shadow-2xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Contact details */}
                <div className="text-left space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300">
                      RASMIY ALOQA
                    </span>
                    <h4 className="text-lg font-black text-white">Elvora Health Jamoasi</h4>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2.5">
                      <Mail size={14} className="text-[#00D4FF]" />
                      <a href="mailto:info@elvorahealth.uz" className="hover:text-white transition-colors font-semibold">
                        info@elvorahealth.uz
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone size={14} className="text-[#00D4FF]" />
                      <a href="tel:+998712025000" className="hover:text-white transition-colors font-semibold">
                        +998 (71) 202-50-00
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-400">
                      <Building size={14} className="text-slate-500" />
                      <span>Toshkent shahri, Oʻzbekiston</span>
                    </div>
                  </div>
                </div>

                {/* Standalone Vector SVG QR Code */}
                <div className="p-4 rounded-2xl bg-white text-slate-900 flex flex-col items-center justify-center space-y-1.5 shadow-xl shrink-0">
                  <svg
                    className="w-28 h-28"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Stylized QR Code matrix vector */}
                    <rect width="100" height="100" fill="white" />
                    {/* Top Left Finder */}
                    <rect x="8" y="8" width="28" height="28" rx="4" fill="#0A1A2F" />
                    <rect x="13" y="13" width="18" height="18" rx="2" fill="white" />
                    <rect x="17" y="17" width="10" height="10" rx="1" fill="#008BFF" />

                    {/* Top Right Finder */}
                    <rect x="64" y="8" width="28" height="28" rx="4" fill="#0A1A2F" />
                    <rect x="69" y="13" width="18" height="18" rx="2" fill="white" />
                    <rect x="73" y="17" width="10" height="10" rx="1" fill="#008BFF" />

                    {/* Bottom Left Finder */}
                    <rect x="8" y="64" width="28" height="28" rx="4" fill="#0A1A2F" />
                    <rect x="13" y="69" width="18" height="18" rx="2" fill="white" />
                    <rect x="17" y="73" width="10" height="10" rx="1" fill="#008BFF" />

                    {/* QR Code decorative data blocks */}
                    <rect x="42" y="10" width="6" height="6" fill="#0A1A2F" />
                    <rect x="52" y="10" width="6" height="6" fill="#0A1A2F" />
                    <rect x="42" y="20" width="6" height="6" fill="#008BFF" />
                    <rect x="48" y="26" width="6" height="6" fill="#0A1A2F" />

                    <rect x="10" y="44" width="6" height="6" fill="#0A1A2F" />
                    <rect x="22" y="44" width="6" height="6" fill="#0A1A2F" />
                    <rect x="16" y="52" width="6" height="6" fill="#008BFF" />

                    <rect x="42" y="42" width="16" height="16" rx="3" fill="#008BFF" />
                    <rect x="46" y="46" width="8" height="8" rx="1" fill="white" />

                    <rect x="66" y="44" width="6" height="6" fill="#0A1A2F" />
                    <rect x="76" y="44" width="6" height="6" fill="#0A1A2F" />
                    <rect x="86" y="44" width="6" height="6" fill="#0A1A2F" />
                    <rect x="70" y="52" width="6" height="6" fill="#008BFF" />
                    <rect x="82" y="52" width="6" height="6" fill="#0A1A2F" />

                    <rect x="42" y="68" width="6" height="6" fill="#0A1A2F" />
                    <rect x="52" y="68" width="6" height="6" fill="#008BFF" />
                    <rect x="46" y="78" width="6" height="6" fill="#0A1A2F" />
                    <rect x="56" y="84" width="6" height="6" fill="#0A1A2F" />

                    <rect x="68" y="68" width="6" height="6" fill="#008BFF" />
                    <rect x="78" y="74" width="6" height="6" fill="#0A1A2F" />
                    <rect x="86" y="82" width="6" height="6" fill="#008BFF" />
                    <rect x="68" y="86" width="6" height="6" fill="#0A1A2F" />
                  </svg>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                    Jonli Sahifaga Oʻtish
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="mailto:info@elvorahealth.uz?subject=Elvora%20Health%20Investitsiya%20Muloqoti"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#008BFF] to-[#00D4FF] hover:from-[#007EE6] hover:to-[#00B4D8] text-white font-black text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all cursor-pointer"
                >
                  Suhbatni Boshlash (Investor Meeting)
                </a>
                <Link
                  to="/"
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all"
                >
                  Lending Sahifaga Qaytish
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= PRESENTER NOTES DRAWER (P) ================= */}
      {isPresenterMode && (
        <div className="relative z-40 bg-slate-950/95 backdrop-blur-xl border-t-2 border-cyan-400 p-4 sm:p-5 max-h-[38vh] sm:max-h-[32vh] overflow-y-auto animate-in slide-in-from-bottom-6 duration-200 shadow-2xl">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-400/30">
                  {currentSlide}-SLAYD NUTQI ({currentMeta.timeRange})
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Slayd vaqti: ~{currentMeta.durationSec} soniya
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-sans font-medium">
                {currentMeta.speakerNotes}
              </p>
            </div>

            {/* Next Slide Preview */}
            {currentSlide < totalSlides && (
              <div className="p-3 rounded-xl bg-white/5 border border-slate-800 text-left shrink-0 w-full sm:w-60">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  KEYINGI SLAYD ({currentSlide + 1}/{totalSlides}):
                </span>
                <span className="text-xs font-extrabold text-white block mt-0.5 truncate">
                  {SLIDES_META[currentSlide]?.title}
                </span>
                <span className="text-[10px] text-cyan-300 font-mono mt-0.5 block">
                  {SLIDES_META[currentSlide]?.timeRange}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= BOTTOM CONTROL DOCK ================= */}
      <footer className="relative z-30 h-14 bg-[#071731]/95 backdrop-blur-md border-t border-[#0F2A52] px-4 sm:px-6 flex items-center justify-between shrink-0">
        {/* Left: Previous slide button */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 1}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-700"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Oldingi</span>
        </button>

        {/* Center: Slide Counter and quick keyboard shortcut badges */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono font-bold text-slate-300">
            Slayd <strong className="text-white text-sm">{currentSlide}</strong> / {totalSlides}
          </span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:inline text-[11px] text-slate-400 font-mono">
            Tugmalar: [→ Oldinga] [← Orqaga] [P Nutq] [T Taymer] [A Avto]
          </span>
        </div>

        {/* Right: Next slide button */}
        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#008BFF] hover:bg-[#007EE6] disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-black transition-colors cursor-pointer shadow-md shadow-blue-500/20"
        >
          <span className="hidden sm:inline">Keyingi</span>
          <ChevronRight size={16} />
        </button>
      </footer>
    </div>
  );
};

export default PitchDeckPage;
