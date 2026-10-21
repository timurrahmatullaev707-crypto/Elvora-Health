import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Activity,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import { useGsapContext, gsap, ScrollTrigger } from '../../lib/useGsapScroll';

export const ElvoraLeakHero: React.FC = () => {
  const [isSealed, setIsSealed] = useState(false);
  const [leakedAmount, setLeakedAmount] = useState(38450000);
  const [recoveredAmount, setRecoveredAmount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Live ticking counter when leaking
  useEffect(() => {
    if (isSealed) return;
    const interval = setInterval(() => {
      setLeakedAmount((prev) => prev + Math.floor(Math.random() * 28000) + 12000);
    }, 400);
    return () => clearInterval(interval);
  }, [isSealed]);

  // When sealed, animate recovered money upwards
  useEffect(() => {
    if (!isSealed) {
      setRecoveredAmount(0);
      return;
    }
    const target = leakedAmount;
    let current = 0;
    const step = target / 40;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setRecoveredAmount(target);
        clearInterval(interval);
      } else {
        setRecoveredAmount(Math.floor(current));
      }
    }, 25);
    return () => clearInterval(interval);
  }, [isSealed, leakedAmount]);

  // Particle Physics on Canvas:
  // When isSealed === false: particles leak down from schedule grid in coral/red
  // When isSealed === true: particles stream UPWARDS into the profit vault in electric blue / cyan
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      isCoin: boolean;
      rot: number;
      rotSpeed: number;
    }

    const particles: Particle[] = [];
    const maxParticles = isSealed ? 65 : 45;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: isSealed ? -(Math.random() * 2.5 + 1.2) : Math.random() * 2.2 + 0.8,
        size: Math.random() * 3 + 2,
        alpha: Math.random() * 0.7 + 0.3,
        isCoin: Math.random() > 0.6,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move
        if (!isSealed) {
          // Leaking DOWN
          p.y += p.vy;
          p.x += p.vx;
          p.rot += p.rotSpeed;
          if (p.y > height) {
            p.y = 0;
            p.x = Math.random() * width;
          }
        } else {
          // Flowing UP into profit vault
          p.y += p.vy;
          p.x += p.vx + (width * 0.5 - p.x) * 0.005; // converge slightly toward top center
          p.rot += p.rotSpeed * 1.5;
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        if (p.isCoin) {
          // Glowing coin / token
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 1.8, 0, Math.PI * 2);
          if (!isSealed) {
            ctx.fillStyle = '#EF4444';
            ctx.shadowColor = '#F43F5E';
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = '#00E5FF';
            ctx.shadowColor = '#0088FF';
            ctx.shadowBlur = 12;
          }
          ctx.fill();

          // Coin rim
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 1.3, 0, Math.PI * 2);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          // Droplet / stream particle
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          if (!isSealed) {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
            ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
            ctx.shadowBlur = 6;
          } else {
            ctx.fillStyle = 'rgba(0, 180, 216, 0.9)';
            ctx.shadowColor = 'rgba(0, 139, 255, 0.8)';
            ctx.shadowBlur = 10;
          }
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isSealed]);

  // GSAP scroll trigger & entrance
  useGsapContext(
    heroRef,
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-story-badge', {
        y: -15,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          '.hero-main-title',
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.3'
        )
        .from(
          '.hero-subtitle',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          '.hero-interactive-stage',
          {
            scale: 0.96,
            y: 30,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.3'
        );

      // Scroll-driven signature moment: Scrolling down automatically seals the leak
      ScrollTrigger.create({
        trigger: '.hero-interactive-stage',
        start: 'center center',
        onEnter: () => {
          setIsSealed(true);
        },
      });
    },
    []
  );

  const toggleSeal = () => {
    setIsSealed((prev) => !prev);
  };

  return (
    <section
      ref={heroRef}
      id="leak-hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#F0F8FF] via-[#F8FBFE] to-white"
    >
      {/* Background ambient medical glows */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
          isSealed
            ? 'bg-gradient-to-r from-[#0088FF]/20 via-[#00B4D8]/25 to-[#0D34B4]/20'
            : 'bg-gradient-to-r from-[#EF4444]/15 via-[#F43F5E]/10 to-[#0088FF]/10'
        }`}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0088FF_0.7px,transparent_0.7px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Top Story Spine Badge */}
        <div className="hero-story-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wide border shadow-2xs mb-6 transition-all duration-500 backdrop-blur-md bg-white/80">
          {!isSealed ? (
            <>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="text-rose-600 uppercase">
                1-QADAM: KO‘RINMAS PUL SIZISHI
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600 font-semibold">
                O‘zbekiston xususiy klinikalari tahlili
              </span>
            </>
          ) : (
            <>
              <CheckCircle2 size={14} className="text-[#0088FF]" />
              <span className="text-[#0088FF] uppercase">
                SIZISH MUHRLANDI • SOF FOYDA REJIMI
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-600 font-bold">
                100% Kassa nazorati tiklandi
              </span>
            </>
          )}
        </div>

        {/* Big Narrative Headline */}
        <h1 className="hero-main-title text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] max-w-4xl mx-auto">
          Klinikangiz har kuni{' '}
          <span
            className={`transition-all duration-700 underline decoration-wavy decoration-2 ${
              !isSealed
                ? 'text-rose-600 decoration-rose-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-[#0088FF] via-[#00B4D8] to-[#0D34B4] decoration-[#0088FF]'
            }`}
          >
            {!isSealed ? "pul yo'qotmoqda." : 'foyda saqlamoqda.'}
          </span>
          <br />
          <span className="text-slate-800">
            {!isSealed ? "Siz buni ko'rmayapsiz." : "Endi har bir so'm ko'rinadi."}
          </span>
        </h1>

        {/* Subheadline (one sentence, no jargon) */}
        <p className="hero-subtitle text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
          {!isSealed
            ? "Kelmay qolgan bemorlar, bo'sh shifokor slotlari va qog'ozdagi hisob xatolari oylik tushumingizning 25% qismini ko'rinmas oqizib ketmoqda."
            : 'Elvora Health ushbu oqishni bir daqiqada muhrlaydi: avtomatik eslatmalar, aqlli jadval va shaffof kassa.'}
        </p>

        {/* INTERACTIVE STAGE: The Signature Leak & Seal Simulator */}
        <div className="hero-interactive-stage mt-10 relative max-w-4xl mx-auto">
          {/* Outer glow container */}
          <div
            className={`relative rounded-3xl p-5 sm:p-8 backdrop-blur-xl border transition-all duration-700 shadow-2xl ${
              !isSealed
                ? 'bg-white/95 border-rose-200 shadow-rose-500/10'
                : 'bg-white/95 border-cyan-200 shadow-[#0088FF]/15 ring-2 ring-[#0088FF]/20'
            }`}
          >
            {/* Canvas for Falling or Rising Particles */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-0"
            />

            {/* Stage Inner Content */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Ticker Display */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      !isSealed
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : 'bg-cyan-50 text-[#0088FF] border border-cyan-200'
                    }`}
                  >
                    {!isSealed ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        JONLI KASSA SIZISHI
                      </>
                    ) : (
                      <>
                        <Sparkles size={12} className="text-[#0088FF]" />
                        SAQLAB QOLINGAN SOF FOYDA
                      </>
                    )}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    {!isSealed ? '~12,500 UZS / soniya' : 'Muhrlangan va himoyalangan'}
                  </span>
                </div>

                {/* Animated Amount */}
                <div
                  className={`text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight transition-colors duration-500 ${
                    !isSealed ? 'text-rose-600' : 'text-slate-900'
                  }`}
                >
                  {!isSealed ? (
                    <span>-{leakedAmount.toLocaleString('uz-UZ')} UZS</span>
                  ) : (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0088FF] to-[#0D34B4]">
                      +{recoveredAmount.toLocaleString('uz-UZ')} UZS
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 mt-2 max-w-md">
                  {!isSealed
                    ? 'O‘rtacha 6 nafar shifokorga ega klinikaning oxirgi 30 kundagi taxminiy no-show va bekor qolgan vaqt zarari'
                    : 'Elvora platformasi ishga tushgandan so‘ng kassa hisobiga qaytgan oylik sof mablag‘'}
                </p>
              </div>

              {/* ABSTRACT CLINIC SCHEDULE GRID LEAKING / SEALED */}
              <div className="w-full mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-3 px-1">
                  <span>Klinika Shifokorlar Qabul Jadvali (Bugun):</span>
                  <span
                    className={`font-mono text-[11px] ${
                      !isSealed ? 'text-rose-600' : 'text-[#0088FF]'
                    }`}
                  >
                    {!isSealed
                      ? '● 3 ta bo‘shliqdan pul sizmoqda'
                      : '✓ Barcha slotlar nazoratda'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  {/* Slot 1: Dr. Usmonov */}
                  <div
                    className={`p-3.5 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                      !isSealed
                        ? 'bg-rose-50/70 border-rose-200'
                        : 'bg-cyan-50/60 border-cyan-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        Dr. A. Usmonov
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        09:30
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Kardiologiya • 150 000 UZS
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      {!isSealed ? (
                        <>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                            No-show (Kelmay qoldi)
                          </span>
                          <span className="text-[11px] font-mono font-black text-rose-600">
                            -150k
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0088FF] bg-white px-2 py-0.5 rounded-md border border-cyan-200">
                            <CheckCircle2 size={10} className="text-[#0088FF]" />
                            Telegram eslatma orqali keldi
                          </span>
                          <span className="text-[11px] font-mono font-black text-emerald-600">
                            +150k
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Slot 2: Dr. Karimova */}
                  <div
                    className={`p-3.5 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                      !isSealed
                        ? 'bg-rose-50/70 border-rose-200'
                        : 'bg-cyan-50/60 border-cyan-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        Dr. N. Karimova
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        11:00
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Pediatriya • 120 000 UZS
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      {!isSealed ? (
                        <>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                            Bo‘sh slot (Shifokor kutdi)
                          </span>
                          <span className="text-[11px] font-mono font-black text-rose-600">
                            -120k
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0088FF] bg-white px-2 py-0.5 rounded-md border border-cyan-200">
                            <CheckCircle2 size={10} className="text-[#0088FF]" />
                            Navbatdan avto-to‘ldirildi
                          </span>
                          <span className="text-[11px] font-mono font-black text-emerald-600">
                            +120k
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Slot 3: Dr. Mansurov */}
                  <div
                    className={`p-3.5 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                      !isSealed
                        ? 'bg-rose-50/70 border-rose-200'
                        : 'bg-cyan-50/60 border-cyan-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        Dr. J. Mansurov
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        14:30
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Nevropatologiya • 180 000 UZS
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      {!isSealed ? (
                        <>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                            Kassa bilan daftarda xatolik
                          </span>
                          <span className="text-[11px] font-mono font-black text-rose-600">
                            -180k
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0088FF] bg-white px-2 py-0.5 rounded-md border border-cyan-200">
                            <CheckCircle2 size={10} className="text-[#0088FF]" />
                            Shaffof kassa qaydi
                          </span>
                          <span className="text-[11px] font-mono font-black text-emerald-600">
                            +180k
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SIGNATURE CTA TRIGGER: "Yo'qotishni to'xtatish" */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <button
                  id="btn-seal-leak"
                  onClick={toggleSeal}
                  className={`group relative px-8 py-4 rounded-2xl text-sm font-black transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl cursor-pointer active:scale-95 ${
                    !isSealed
                      ? 'bg-slate-900 text-white hover:bg-black hover:shadow-rose-500/25 ring-2 ring-rose-400/40 hover:scale-[1.02]'
                      : 'bg-[#0088FF] text-white hover:bg-[#0077DB] hover:shadow-blue-500/30 ring-2 ring-cyan-300 hover:scale-[1.02]'
                  }`}
                >
                  {!isSealed ? (
                    <>
                      <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse group-hover:rotate-12 transition-transform" />
                      <span>Yo‘qotishni to‘xtatish (Sizishni muhrlash)</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-4 h-4 text-cyan-200 group-hover:-rotate-90 transition-transform" />
                      <span>Simulyatsiyani qaytadan ko‘rish</span>
                    </>
                  )}
                </button>

                <a
                  href="#live-demo"
                  className="px-6 py-4 rounded-2xl text-xs font-bold text-slate-700 bg-white/80 hover:bg-white border border-slate-200 hover:border-cyan-200 transition-all shadow-xs flex items-center gap-2 hover:text-[#0088FF]"
                >
                  <Activity size={15} className="text-[#0088FF]" />
                  <span>Jonli interaktiv panelni sinash ↓</span>
                </a>
              </div>

              {/* Status footer quote */}
              <div className="mt-5 text-[11px] text-slate-500 font-medium">
                {!isSealed
                  ? '⚡ Tugmani bosing: oqish qanday to‘xtashini va pul qanday saqlanishini ko‘ring'
                  : '✓ Zo‘r! Pastga o‘tib, haqiqiy klinika panelida buni o‘zingiz boshqaring'}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-12 flex flex-col items-center justify-center text-slate-400 gap-1 animate-bounce">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            2-QADAM: KO‘RINMAS 3 TA OQISH NUQTASI
          </span>
          <ChevronDown size={18} className="text-slate-400" />
        </div>
      </div>
    </section>
  );
};

export default ElvoraLeakHero;
