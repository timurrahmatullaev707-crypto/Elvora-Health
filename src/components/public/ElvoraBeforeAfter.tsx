import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  FileSpreadsheet,
  FileX,
  PhoneCall,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowLeftRight,
  Clock,
  ShieldCheck,
  QrCode,
  Bell,
  DollarSign,
  UserCheck,
  UserX,
} from 'lucide-react';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

export const ElvoraBeforeAfter: React.FC = () => {
  // Slider position percentage (0 to 100)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle pointer down / move / up
  const handlePointerMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handlePointerMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handlePointerMove(e.touches[0].clientX);
    };

    const onMouseUp = () => setIsDragging(false);
    const onTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handlePointerMove]);

  useGsapContext(
    sectionRef,
    () => {
      gsap.fromTo(
        '.split-container-anim',
        { y: 30, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );
    },
    []
  );

  return (
    <section id="taqqoslash" ref={sectionRef} className="py-20 lg:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden select-none">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-slate-100 via-cyan-50 to-blue-50/50 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="before-after-header text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#008BFF] bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-200 inline-flex items-center gap-1.5 shadow-xs">
            <ArrowLeftRight size={13} className="text-[#008BFF]" />
            5. OLDIN VA KEYIN TAQQOSLASH
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Qogʻoz va Excel Tartibsizligidan <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008BFF] via-[#00B4D8] to-[#0D34B4]">
              Raqamli Intizomgacha
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Slayderni oʻngga va chapga surib, Elvora Health kiritilgandan keyingi klinika oʻzgarishini solishtiring.
          </p>

          {/* Quick presets for mobile and fast testing */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setSliderPos(15)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                sliderPos < 35
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Oldin (Qogʻoz & Excel)
            </button>
            <button
              type="button"
              onClick={() => setSliderPos(50)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                sliderPos >= 35 && sliderPos <= 65
                  ? 'bg-[#008BFF] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Teng 50 / 50
            </button>
            <button
              type="button"
              onClick={() => setSliderPos(85)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                sliderPos > 65
                  ? 'bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Keyin (Elvora Health)
            </button>
          </div>
        </div>

        {/* Split Container with Draggable Divider */}
        <div
          ref={containerRef}
          onClick={(e) => handlePointerMove(e.clientX)}
          className="split-container-anim relative w-full h-[620px] sm:h-[540px] rounded-3xl border-2 border-slate-300 shadow-2xl overflow-hidden cursor-ew-resize bg-[#0B1E3B]"
        >
          {/* ================= RIGHT SIDE (ELVORA HEALTH - BLUE / CLEAN / LIVE) ================= */}
          {/* Clipped strictly from sliderPos% to 100% so it NEVER overlaps with the left side */}
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-[#0B1E3B] to-[#061325] text-white p-6 sm:p-10 flex flex-col justify-between overflow-hidden"
            style={{
              clipPath: `inset(0 0 0 ${sliderPos}%)`,
            }}
          >
            {/* Header Badge (Aligned to Right side) */}
            <div className="flex items-center justify-between">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
                <ShieldCheck size={14} />
                <span>100% Avtomatlashtirilgan</span>
              </div>

              <div className="flex items-center gap-2.5 ml-auto text-right">
                <div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-cyan-300">
                      KEYIN • ELVORA HEALTH
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-white">Yagona Raqamli Ekotizim</h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#008BFF] to-[#00D4FF] flex items-center justify-center text-white shadow-md shrink-0">
                  <Sparkles size={18} />
                </div>
              </div>
            </div>

            {/* Right Side Cards Grid (Clean, Connected, Live) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto pt-4">
              
              {/* Live Ticket Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-cyan-400/30 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <QrCode size={14} /> Jonli E-Navbat Tablosi
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 text-[10px] font-black">
                    Chipta #A-042
                  </span>
                </div>
                <div className="text-white font-extrabold text-sm sm:text-base">
                  Dr. Usmonov (Kardiolog) • 102-xona
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-white/10">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} /> Bemor qabulda
                  </span>
                  <span>Kutish: 4 daqiqa</span>
                </div>
              </div>

              {/* Automated SMS Reminder Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-cyan-400/30 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <Bell size={14} /> Telegram & SMS Eslatma
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-black">
                    Avtomatik
                  </span>
                </div>
                <div className="text-slate-100 text-xs sm:text-sm font-medium">
                  "Sardor aka, ertaga soat 10:30 da qabulingiz tasdiqlandi."
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-white/10">
                  <span className="text-cyan-300 font-bold">No-show: 25% → 7%</span>
                  <span className="text-emerald-300 font-bold">+18.2 mln UZS saqlandi</span>
                </div>
              </div>

              {/* Reconciled Cashier */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-cyan-400/30 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <DollarSign size={14} /> Kassa & Shaffof Tushum
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-black">
                    0 UZS Tafovut
                  </span>
                </div>
                <div className="text-white font-extrabold text-sm sm:text-base">
                  Kunlik kassa: 28 450 000 UZS
                </div>
                <p className="text-[11px] text-slate-300">
                  Har bir toʻlov shifokor qabuli va xizmat cheki bilan bir zumda bogʻlangan.
                </p>
              </div>

              {/* Patient Rating */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-cyan-400/30 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <UserCheck size={14} /> Bemorlar Mamnunligi
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black">
                    4.9 / 5.0 ★
                  </span>
                </div>
                <div className="text-white font-extrabold text-sm sm:text-base">
                  0 ta janjal va tirbandlik
                </div>
                <p className="text-[11px] text-slate-300">
                  Elektron qabul orqali koridorlarda janjalsiz, madaniy va aniq navbat.
                </p>
              </div>

            </div>

            {/* Bottom Footer Callout */}
            <div className="flex items-center justify-between text-xs text-cyan-200 pt-2 border-t border-white/10">
              <span className="font-semibold ml-auto text-right">Natija: +28% tushum oʻsishi, 0 ta yoʻqotilgan karta</span>
            </div>
          </div>

          {/* ================= LEFT SIDE (MESSY PAPER & EXCEL - GRAYSCALE / RED) ================= */}
          {/* Clipped strictly from 0% to sliderPos% */}
          <div
            className="absolute inset-0 w-full h-full bg-[#181C24] text-slate-300 p-6 sm:p-10 flex flex-col justify-between overflow-hidden"
            style={{
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          >
            {/* Header Badge (Aligned to Left side) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-red-400 shadow-md shrink-0">
                  <FileX size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-red-400">
                      OLDIN • QOGʻOZ VA EXCEL
                    </span>
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-slate-200">Tartibsizlik va Doimiy Yoʻqotish</h3>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold">
                <AlertTriangle size={14} />
                <span>Oyiga 30+ mln UZS yoʻqotilmoqda</span>
              </div>
            </div>

            {/* Left Side Cards Grid (Grayscale, messy, crossed out) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto pt-4 filter grayscale contrast-125">
              
              {/* Paper Register Chaos */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-red-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-red-400 font-bold flex items-center gap-1.5">
                    <FileSpreadsheet size={14} /> Qogʻoz Qabul Daftari
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-red-500/30 text-red-300 text-[10px] font-black">
                    Yirtilgan / Tushunarsiz
                  </span>
                </div>
                <div className="text-slate-400 font-mono text-xs line-through decoration-red-500 decoration-2">
                  Karimov O. 10:00 (Usti chizilgan)
                </div>
                <div className="text-slate-300 text-xs italic">
                  "Shifokor qoʻlyozmasini registrator ham, dorixona ham oʻqiy olmadi..."
                </div>
              </div>

              {/* Phone Hell & No-Show */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-red-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-red-400 font-bold flex items-center gap-1.5">
                    <PhoneCall size={14} /> Javobsiz Qoʻngʻiroqlar
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-red-500/30 text-red-300 text-[10px] font-black">
                    18 ta javobsiz
                  </span>
                </div>
                <div className="text-slate-300 text-xs sm:text-sm font-medium">
                  Telefon doimiy band, bemor qabulni unutib kelmadi.
                </div>
                <div className="flex items-center justify-between text-xs text-red-400 pt-1 border-t border-white/10 font-bold">
                  <span>No-show: 28%</span>
                  <span>Shifokor xonasi boʻsh qoldi</span>
                </div>
              </div>

              {/* Cashier Discrepancy */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-red-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-red-400 font-bold flex items-center gap-1.5">
                    <AlertTriangle size={14} /> Kassa Kamomadi
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-red-500/30 text-red-300 text-[10px] font-black">
                    Tafovut: -3 800 000 UZS
                  </span>
                </div>
                <div className="text-slate-200 font-extrabold text-sm sm:text-base">
                  Excel: #REF! formulalar buzilgan
                </div>
                <p className="text-[11px] text-slate-400">
                  Kim qancha toʻladi, qaysi xizmat qoldirildi — kechqurungacha hisob-kitob janjali.
                </p>
              </div>

              {/* Waiting Room Chaos */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-red-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-red-400 font-bold flex items-center gap-1.5">
                    <UserX size={14} /> Kutish Zali Janjali
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-red-500/30 text-red-300 text-[10px] font-black">
                    "Men oldin kelgandim!"
                  </span>
                </div>
                <div className="text-slate-200 font-extrabold text-sm sm:text-base">
                  2 soatlik jonli navbat
                </div>
                <p className="text-[11px] text-slate-400">
                  Bemorlar eshik oldida toʻplanib janjallashmoqda, norozi bemorlar ketib qoladi.
                </p>
              </div>

            </div>

            {/* Bottom Footer */}
            <div className="flex items-center justify-between text-xs text-red-400 pt-2 border-t border-slate-700">
              <span className="font-semibold">Oqibat: Bemorlar yoʻqotilishi, shifokorlar noroziligi</span>
            </div>
          </div>

          {/* ================= DRAGGABLE DIVIDER LINE & HANDLE ================= */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 flex items-center justify-center transition-shadow"
            style={{
              left: `${sliderPos}%`,
              boxShadow: '0 0 20px 4px rgba(0, 139, 255, 0.7)',
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            {/* Round Drag Button */}
            <div
              className={`w-11 h-11 -ml-5.5 rounded-full bg-white text-slate-900 border-3 border-[#008BFF] shadow-2xl flex items-center justify-center cursor-ew-resize transition-transform duration-150 ${
                isDragging ? 'scale-125 ring-4 ring-[#008BFF]/40' : 'hover:scale-110'
              }`}
            >
              <ArrowLeftRight size={18} className="text-[#008BFF]" />
            </div>

            {/* Floating Hint Tag */}
            <div className="absolute top-4 -translate-x-1/2 bg-black/85 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/20 whitespace-nowrap pointer-events-none shadow-lg">
              SURING ⟷
            </div>
          </div>
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 px-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span>Chap tomon: Eski qogʻoz va Excel amaliyoti (barcha kamchiliklari bilan)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#008BFF]" />
            <span className="font-bold text-slate-800">Oʻng tomon: Elvora Health bilan yangi raqamli daraja</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElvoraBeforeAfter;
