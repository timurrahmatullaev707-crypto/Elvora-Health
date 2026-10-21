import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  QrCode,
  DollarSign,
  FileText,
  Package,
  TrendingUp,
  Bot,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Zap,
  Clock,
  Database,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

interface OrbitNode {
  id: string;
  name: string;
  shortTag: string;
  icon: React.ReactNode;
  oneLineBenefit: string;
  angle: number; // in degrees (0 to 360)
  color: string;
  details: {
    title: string;
    description: string;
    metrics: string;
    flowDirection: string;
    linkPath: string;
    linkText: string;
  };
}

export const ElvoraEcosystemHub: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('e-navbat');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const sectionRef = useRef<HTMLElement>(null);

  const nodes: OrbitNode[] = [
    {
      id: 'e-navbat',
      name: 'E-Navbat Tablosi',
      shortTag: 'Navbat & QR',
      icon: <QrCode className="w-5 h-5 text-white" />,
      oneLineBenefit: 'Kutish zali janjallari 0 ga tushadi, har bir bemor oʻz daqiqasini biladi',
      angle: 0,
      color: 'from-blue-500 to-cyan-400',
      details: {
        title: 'Jonli E-Navbat va Kutish Zali Tablosi',
        description:
          'Klinika qabulxonasidagi katta ekran (TV) va bemorlar telefonida real vaqtda yangilanuvchi raqamli navbat. Ovozli chaqiruv ("Bemor A-042, 102-xonaga marhamat") va QR chiptalar orqali tirbandlik bartaraf etiladi.',
        metrics: '94% bemorlar vaqtida chaqiriladi • Oʻrtacha kutish 6 daqiqa',
        flowDirection: 'Bemor roʻyxatdan oʻtishi → Core MIS → TV Tablo & Xona',
        linkPath: '/app/appointments',
        linkText: 'Qabullar va navbat modulini koʻrish',
      },
    },
    {
      id: 'kassa',
      name: 'Kassa & Moliya',
      shortTag: 'Fiskal & Tushum',
      icon: <DollarSign className="w-5 h-5 text-white" />,
      oneLineBenefit: 'Bir soʻm ham chetdan oʻtmaydi: toʻlov faqat koʻrsatilgan xizmatga bogʻlanadi',
      angle: 60,
      color: 'from-cyan-500 to-teal-400',
      details: {
        title: 'Kassa, Xizmatlar Narxnomasi va Tushum Nazorati',
        description:
          'Klinika xizmatlari (koʻrik, tahlil, UZI, muolajalar) boʻyicha kirim va chiqimlarni avtomatlashtirilgan hisobi. Qarzlar, chegirmalar va xodimlar oylik maoshlari foizlarini aniq hisoblash.',
        metrics: '100% kassa shaffofligi • Click / Payme / Uzcard (tez orada)',
        flowDirection: 'Shifokor koʻrigi → Kassa cheki → Moliya balansi',
        linkPath: '/app/finance',
        linkText: 'Moliya modulini koʻrish',
      },
    },
    {
      id: 'retsept',
      name: 'Elektron Retsept',
      shortTag: 'E-Retsept',
      icon: <FileText className="w-5 h-5 text-white" />,
      oneLineBenefit: 'Tushunarsiz qoʻlyozmalarga barham: dori nomlari va dozalari aniq SMS orqali',
      angle: 120,
      color: 'from-blue-600 to-indigo-500',
      details: {
        title: 'Elektron Retsept va Xalqaro Dori Standartlari',
        description:
          'Shifokor qabuli davomida bir necha bosishda dori preparatlari, ularning qabul qilish vaqti va dozasini kiritadi. Bemor retseptni yoʻqotmaydi — u bemor kabinetida va SMSda saqlanadi.',
        metrics: '0 ta xato dozalash • Dori vositalari oʻzaro ziddiyatini tekshirish',
        flowDirection: 'Shifokor xonasi → Bemor mobil kartasi → Dorixona',
        linkPath: '/app/patients',
        linkText: 'Bemorlar kartotekasini koʻrish',
      },
    },
    {
      id: 'ombor',
      name: 'Ombor & Dorixona',
      shortTag: 'Dori & Reaktiv',
      icon: <Package className="w-5 h-5 text-white" />,
      oneLineBenefit: 'Reaktiv va dori qoldiqlari oʻz vaqtida buyurtma qilinadi, muddati oʻtganlar yoʻq',
      angle: 180,
      color: 'from-sky-500 to-blue-600',
      details: {
        title: 'Klinika Moddiy Ombori va Qoldiqlar Monitoringi',
        description:
          'Muolaja xonalari, laboratoriya reaktivlari va dorixona qoldiqlarini avtomatik sarf-xarajatlar hisobidan chiqarish. Kritik minimumga yetganda masʼul xodimga ogohlantirish beriladi.',
        metrics: 'Klinika xarajatlari 14% ga tejaladi • Kamomadlar oldi olinadi',
        flowDirection: 'Muolaja ijrosi → Ombor zaxirasidan ayirish → Hisobot',
        linkPath: '/app/dashboard',
        linkText: 'Dashboard tahlilini koʻrish',
      },
    },
    {
      id: 'insights',
      name: 'Elvora Insights™',
      shortTag: 'Qoidaviy Tahlil',
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      oneLineBenefit: 'Klinikadagi boʻsh slotlar va kelmagan bemorlarni koʻrsatib, daromadni oshiradi',
      angle: 240,
      color: 'from-indigo-500 to-cyan-400',
      details: {
        title: 'Elvora Insights™ — Shaffof Tibbiy Biznes Analitika',
        description:
          'Murakkab va tushunarsiz formulalarsiz: klinika rahbari har bir shifokor bandligi, eng daromadli muolajalar va qaysi soatlarda no-show koʻpligini aniq diagrammalarda koʻradi.',
        metrics: 'Real vaqt koʻrsatkichlari • Oylik rentabellik xulosalari',
        flowDirection: 'Barcha modullar maʼlumotlari → Insights algoritmi → Rahbar paneli',
        linkPath: '/app/insights',
        linkText: 'Insights paneliga oʻtish',
      },
    },
    {
      id: 'doniyor-ai',
      name: 'Doniyor AI',
      shortTag: 'AI Triaj & Yordamchi',
      icon: <Bot className="w-5 h-5 text-white" />,
      oneLineBenefit: 'Bemor shikoyatini saralab, toʻgʻri shifokor va xonaga 30 soniyada yoʻnaltiradi',
      angle: 300,
      color: 'from-cyan-400 to-blue-600',
      details: {
        title: 'Doniyor AI — Tibbiy Triaj va Navigatsiya Yordamchisi',
        description:
          'Bemor klinikaga kelishdan oldin yoki terminalda oʻz shikoyatlarini aytganda, Doniyor AI toʻgʻri mutaxassislikni (kardiolog, nevropatolog, pediatr) aniqlaydi va boʻsh vaqtga yoʻnaltiradi.',
        metrics: 'Zero-Data Leakage • Hech qanday tashxis qoʻymaydi, faqat saralaydi',
        flowDirection: 'Bemor shikoyati → AI Triaj tahlili → Boʻsh slotga bronlash',
        linkPath: '#doniyor-ai-section',
        linkText: 'Doniyor AI bilan sinab koʻrish',
      },
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  // Auto-cycle through nodes every 4.5 seconds unless user interacts
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveNodeId((prev) => {
        const currentIndex = nodes.findIndex((n) => n.id === prev);
        const nextIndex = (currentIndex + 1) % nodes.length;
        return nodes[nextIndex].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nodes]);

  useGsapContext(
    sectionRef,
    () => {
      gsap.fromTo(
        '.ecosystem-header',
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
        '.ecosystem-diagram-box',
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

  const radius = 175; // orbit radius in px

  return (
    <section
      id="ekotizim"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#0B1728] text-white border-b border-[#122A50] relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-r from-[#008BFF]/20 via-[#00D4FF]/15 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#008BFF_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="ecosystem-header text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#00D4FF] bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-400/30 inline-flex items-center gap-1.5 shadow-xs">
            <Layers size={13} className="text-[#00D4FF]" />
            6. YAXLIT EKOTIZIM HUB
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Tarqoq Dasturlar Emas, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#008BFF] to-[#38BDF8]">
              Bitta Yaxlit Tibbiy Yadro
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            E-navbatdan tortib dorixona va kassagacha — har bir modul yagona yadro atrofida sinxron maʼlumot almashadi. Modul ustiga bosing yoki tanlang:
          </p>

          {/* Selector pills for fast mobile / desktop switching */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveNodeId(node.id);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeNodeId === node.id
                    ? 'bg-gradient-to-r from-[#008BFF] to-[#00D4FF] text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{node.shortTag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Orbit Visualization & Interactive Detail Panel Grid */}
        <div className="ecosystem-diagram-box grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Circular Orbit (7 cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] sm:min-h-[500px]">
            
            {/* Outer Orbit Ring */}
            <div className="absolute w-[350px] h-[350px] sm:w-[440px] sm:h-[440px] rounded-full border border-cyan-500/20 animate-pulse pointer-events-none" />
            
            {/* Inner Secondary Ring */}
            <div className="absolute w-[240px] h-[240px] sm:w-[310px] sm:h-[310px] rounded-full border border-blue-400/20 border-dashed animate-spin [animation-duration:60s] pointer-events-none" />

            {/* SVG Data Flow Lines connecting each node to core */}
            <svg
              viewBox="-240 -240 480 480"
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            >
              <defs>
                <linearGradient id="orbitActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#008BFF" />
                </linearGradient>
                <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connector lines to all nodes */}
              {nodes.map((node) => {
                const isSelected = activeNodeId === node.id;
                const rad = (node.angle * Math.PI) / 180;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                const coreX = Math.cos(rad) * 65;
                const coreY = Math.sin(rad) * 65;

                return (
                  <g key={`line-${node.id}`}>
                    {/* Dotted static pipeline */}
                    <line
                      x1={coreX}
                      y1={coreY}
                      x2={x}
                      y2={y}
                      stroke={isSelected ? '#00D4FF' : '#38BDF8'}
                      strokeOpacity={isSelected ? 0.7 : 0.18}
                      strokeWidth={isSelected ? 2.5 : 1.2}
                      strokeDasharray={isSelected ? '6 4' : '4 4'}
                    />

                    {/* Animated Data Packets (flowing particles) on active node */}
                    {isSelected && (
                      <>
                        <circle r="4.5" fill="#00D4FF" filter="url(#cyanGlow)">
                          <animate
                            attributeName="cx"
                            from={coreX}
                            to={x}
                            dur="1.2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="cy"
                            from={coreY}
                            to={y}
                            dur="1.2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle r="3" fill="#FFFFFF" opacity="0.9">
                          <animate
                            attributeName="cx"
                            from={x}
                            to={coreX}
                            dur="1.6s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="cy"
                            from={y}
                            to={coreY}
                            dur="1.6s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Central Core: Elvora Health Central MIS */}
            <div className="relative z-20 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#008BFF] via-[#0D34B4] to-[#071328] border-3 border-cyan-400 shadow-2xl shadow-cyan-500/40 flex flex-col items-center justify-center text-center p-3 group transition-transform duration-300 hover:scale-105">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-1 text-cyan-200">
                <Database size={20} className="animate-pulse" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300 leading-tight">
                ELVORA CORE
              </span>
              <span className="text-[9px] text-white/80 font-bold mt-0.5">
                Markaziy Yadro
              </span>
              <span className="text-[8px] text-emerald-300 font-semibold mt-1 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                ● Jonli Sinxron
              </span>
            </div>

            {/* 6 Orbiting Nodes */}
            {nodes.map((node) => {
              const isSelected = activeNodeId === node.id;
              const rad = (node.angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <div
                  key={node.id}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  className="absolute z-20 transition-all duration-300"
                >
                  <button
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setActiveNodeId(node.id);
                    }}
                    onMouseEnter={() => {
                      setIsAutoPlaying(false);
                      setActiveNodeId(node.id);
                    }}
                    className={`group relative flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110 opacity-80 hover:opacity-100'
                    }`}
                  >
                    {/* Node circle */}
                    <div
                      className={`w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-gradient-to-br ${node.color} flex items-center justify-center shadow-xl transition-all duration-300 ${
                        isSelected
                          ? 'ring-4 ring-cyan-300 shadow-cyan-400/60 scale-110'
                          : 'border border-white/30'
                      }`}
                    >
                      {node.icon}
                    </div>

                    {/* Node Text Label */}
                    <span
                      className={`text-[10px] sm:text-xs font-black mt-1.5 whitespace-nowrap px-2 py-0.5 rounded-md transition-colors ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-900 shadow-md font-extrabold'
                          : 'bg-black/60 text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {node.name}
                    </span>
                  </button>

                  {/* Pulsing indicator if active */}
                  {isSelected && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-cyan-400 animate-ping pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Active Node Detail Showcase Card (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/15 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Top ambient glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#008BFF]/30 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Header info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/30 flex items-center gap-1.5">
                  <Activity size={12} />
                  Tanlangan Modul
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Zap size={12} className="text-amber-400" />
                  Haqiqiy vaqt sinxroni
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activeNode.color} flex items-center justify-center shadow-lg shrink-0`}
                >
                  {activeNode.icon}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">{activeNode.details.title}</h3>
                  <p className="text-xs font-semibold text-cyan-300">{activeNode.oneLineBenefit}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeNode.details.description}
            </p>

            {/* Data Flow Pipeline Badge */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Maʼlumot oqimi (Data Pipeline):
              </span>
              <div className="text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                <span>{activeNode.details.flowDirection}</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center gap-2.5 text-xs text-cyan-100 font-bold">
              <ShieldCheck size={16} className="text-cyan-400 shrink-0" />
              <span>{activeNode.details.metrics}</span>
            </div>

            {/* Bottom action link */}
            <div className="pt-2">
              <Link
                to={activeNode.details.linkPath}
                className="w-full py-3 px-5 rounded-2xl bg-white text-slate-900 hover:bg-cyan-50 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>{activeNode.details.linkText}</span>
                <ArrowRight size={14} className="text-[#008BFF]" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ElvoraEcosystemHub;
