import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Bot,
  Building,
  CreditCard,
  FileText,
  Clock,
  Layers,
  BarChart3,
  Package,
  Activity,
  CheckCircle2,
  Zap,
  Radio,
  Eye,
  Shield,
} from 'lucide-react';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

interface NodeItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subtitle: string;
  metric: string;
  description: string;
  // Coordinate in SVG 1000x580 viewBox
  x: number;
  y: number;
  // SVG Path curve from center (500, 290)
  pathD: string;
  color: string;
}

export const ElvoraMindMap: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('shifoxonalar');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    sectionRef,
    () => {
      gsap.from('.mindmap-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });

      gsap.from('.mindmap-diagram', {
        scrollTrigger: {
          trigger: '.mindmap-diagram',
          start: 'top 85%',
        },
        scale: 0.94,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from('.mindmap-drawer', {
        scrollTrigger: {
          trigger: '.mindmap-drawer',
          start: 'top 92%',
        },
        y: 25,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    },
    []
  );

  const nodes: NodeItem[] = [
    {
      id: 'doniyor',
      label: 'Doniyor AI',
      icon: <Bot size={16} className="text-[#008BFF]" />,
      subtitle: 'AI Tibbiy Assistent',
      metric: '99.4% diagnostik aniqlik',
      description: 'Sun\'iy intellekt tibbiy yordamchisi va bemorlar uchun dastlabki avtomatlashtirilgan skrining.',
      x: 180,
      y: 110,
      pathD: 'M 500 290 C 370 290, 280 140, 180 110',
      color: '#008BFF',
    },
    {
      id: 'shifoxonalar',
      label: 'Shifoxonalar',
      icon: <Building size={16} className="text-[#008BFF]" />,
      subtitle: 'Klinika va Statsionar',
      metric: '2,592+ ulangan shifoxona',
      description: 'Statsionar va poliklinika boshqaruvi, elektron kasallik tarixi va epikrizlar.',
      x: 230,
      y: 215,
      pathD: 'M 500 290 C 380 290, 310 225, 230 215',
      color: '#00B4D8',
    },
    {
      id: 'tibbiy-kartalar',
      label: 'Tibbiy kartalar',
      icon: <FileText size={16} className="text-[#008BFF]" />,
      subtitle: 'Elektron Tibbiy Karta',
      metric: '32 mln yagona baza',
      description: 'Yagona elektron tibbiy karta — barcha tahlillar, emlashlar va tashxislar bitta joyda.',
      x: 190,
      y: 430,
      pathD: 'M 500 290 C 360 290, 290 410, 190 430',
      color: '#0D34B4',
    },
    {
      id: 'moliya',
      label: 'Moliya',
      icon: <CreditCard size={16} className="text-[#008BFF]" />,
      subtitle: 'Kassa & To‘lovlar',
      metric: 'Click, Payme, Uzcard',
      description: 'Pullik tibbiy xizmatlar, onlayn to‘lov integratsiyasi va fiskal cheklar.',
      x: 270,
      y: 330,
      pathD: 'M 500 290 C 390 290, 335 325, 270 330',
      color: '#008BFF',
    },
    {
      id: 'retseptlar',
      label: 'Retseptlar',
      icon: <Activity size={16} className="text-[#008BFF]" />,
      subtitle: 'Elektron Retsept',
      metric: '81 mln retsept chiqarilgan',
      description: 'Dorixonalar tarmog‘i bilan integratsiyalashgan QR-kodli elektron retseptlar.',
      x: 500,
      y: 500,
      pathD: 'M 500 290 C 500 370, 500 440, 500 500',
      color: '#10B981',
    },
    {
      id: 'navbatlar',
      label: 'Navbatlar',
      icon: <Clock size={16} className="text-[#008BFF]" />,
      subtitle: 'Smart E-Navbat',
      metric: 'Kutish vaqti -65%',
      description: 'Aqlli elektron navbat tizimi va kutish zalidagi LED televizor tablosi.',
      x: 820,
      y: 110,
      pathD: 'M 500 290 C 630 290, 720 140, 820 110',
      color: '#008BFF',
    },
    {
      id: 'poliklinikalar',
      label: 'Poliklinikalar',
      icon: <Layers size={16} className="text-[#008BFF]" />,
      subtitle: 'Birlamchi Bo‘g‘in',
      metric: '14,800+ oilaviy shifokor',
      description: 'Oilaviy shifokorlar va ko‘p tarmoqli poliklinika jarayonlari avtomatizatsiyasi.',
      x: 770,
      y: 215,
      pathD: 'M 500 290 C 620 290, 690 225, 770 215',
      color: '#00B4D8',
    },
    {
      id: 'hisobotlar',
      label: 'Hisobotlar',
      icon: <BarChart3 size={16} className="text-[#008BFF]" />,
      subtitle: 'SSV & Rahbar Tahlili',
      metric: 'Real vaqtli BI monitoring',
      description: 'Sog‘liqni Saqlash Vazirligi va bosh vrachlar uchun real vaqtli tahliliy hisobotlar.',
      x: 730,
      y: 330,
      pathD: 'M 500 290 C 610 290, 665 325, 730 330',
      color: '#6366F1',
    },
    {
      id: 'omborxonalar',
      label: 'Omborxonalar',
      icon: <Package size={16} className="text-[#008BFF]" />,
      subtitle: 'Dorixona va Ombor',
      metric: '1,424 ta dorixona integratsiyasi',
      description: 'Dori vositalari va tibbiy sarf materiallarining qat\'iy seriya va muddat hisobi.',
      x: 810,
      y: 430,
      pathD: 'M 500 290 C 640 290, 710 410, 810 430',
      color: '#008BFF',
    },
  ];

  // Auto rotate through nodes if not hovered
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveNodeId((prev) => {
        const idx = nodes.findIndex((n) => n.id === prev);
        const nextIdx = (idx + 1) % nodes.length;
        return nodes[nextIdx].id;
      });
    }, 3800);
    return () => clearInterval(interval);
  }, [autoRotate, nodes]);

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  return (
    <section ref={sectionRef} id="nima-bu" className="py-20 lg:py-28 bg-[#F4F9FC] border-y border-slate-200/80 relative overflow-hidden">
      {/* Dynamic Digital Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#008BFF_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* Ambient Pulsing Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#008BFF]/10 via-[#00D4FF]/15 to-[#008BFF]/10 blur-3xl rounded-full pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header (Screenshot 2 exact structure with Elvora Health name) */}
        <div className="mindmap-header text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-100/80 border border-cyan-300 text-xs font-black text-[#008BFF] shadow-xs">
            <Radio size={14} className="text-[#008BFF] animate-ping" />
            <span>YAGONA MILLIY EKOTIZIM ARXITEKTURASI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Elvora Health nima?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Bu tibbiy texnologiyalar ekotizimi bo'lib, davlat va xususiy tibbiyot muassasalari, farmatsevtika sektori, shifokorlar va bemorlarni yagona raqamli infratuzilmaga birlashtiradi
          </p>
        </div>

        {/* Central Mind-Map Interactive Diagram with High-Tech Traveling Photons */}
        <div
          onMouseEnter={() => setAutoRotate(false)}
          onMouseLeave={() => setAutoRotate(true)}
          className="mindmap-diagram relative max-w-5xl mx-auto h-[540px] sm:h-[600px] flex items-center justify-center select-none"
        >
          {/* SVG Canvas for Laser Connections and Moving Photons */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 580" fill="none">
            <defs>
              {/* Glow filter for laser photon beads */}
              <filter id="photonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="activeBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#008BFF" />
                <stop offset="50%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#008BFF" />
              </linearGradient>

              <linearGradient id="inactiveBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#008BFF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Connecting paths + Continuous Traveling Photon Beads */}
            {nodes.map((node) => {
              const isActive = activeNodeId === node.id;
              const pathId = `path-${node.id}`;

              return (
                <g key={node.id}>
                  {/* Base Track */}
                  <path
                    id={pathId}
                    d={node.pathD}
                    stroke={isActive ? 'url(#activeBeamGrad)' : 'url(#inactiveBeamGrad)'}
                    strokeWidth={isActive ? '3.5' : '1.8'}
                    strokeLinecap="round"
                    className={isActive ? 'animate-dash-flow transition-all duration-300' : 'transition-all duration-300'}
                    style={{
                      strokeDasharray: isActive ? '12 8' : '6 6',
                      opacity: isActive ? 1 : 0.45,
                    }}
                  />

                  {/* High-speed glowing particle photon running along path */}
                  <circle r={isActive ? '5' : '3.5'} fill={isActive ? '#00F0FF' : '#008BFF'} filter="url(#photonGlow)">
                    <animateMotion
                      dur={isActive ? '1.8s' : '3.2s'}
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>

                  {/* Second staggered photon for active node */}
                  {isActive && (
                    <circle r="4" fill="#5FFFEC" filter="url(#photonGlow)">
                      <animateMotion
                        dur="1.8s"
                        begin="0.9s"
                        repeatCount="indefinite"
                        rotate="auto"
                      >
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Central Nucleus (Elvora Health Brand Hub) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative flex items-center justify-center">
              {/* Rotating Dashed Satellite Rings */}
              <div className="absolute w-36 h-36 rounded-full border border-cyan-400/40 border-dashed animate-spin [animation-duration:18s] pointer-events-none" />
              <div className="absolute w-44 h-44 rounded-full border border-blue-400/30 border-dotted animate-spin [animation-duration:28s] [animation-direction:reverse] pointer-events-none" />
              <div className="absolute w-32 h-32 rounded-full border-2 border-cyan-300 animate-ripple-wave pointer-events-none" />

              {/* Central Glowing Capsule */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#008BFF] via-[#00B4D8] to-[#0D34B4] p-1 shadow-2xl shadow-cyan-500/30 animate-pulse-glow">
                <div className="w-full h-full bg-white rounded-[22px] flex flex-col items-center justify-center p-2 shadow-inner group cursor-pointer">
                  {/* Elvora Medical 8-pointed starburst emblem */}
                  <svg
                    className="w-10 h-10 sm:w-11 sm:h-11 text-[#008BFF] group-hover:rotate-90 transition-transform duration-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
                  </svg>
                  <span className="text-[9px] font-black tracking-tight text-[#008BFF] mt-0.5">
                    ELVORA
                  </span>
                  <span className="text-[7px] font-extrabold tracking-widest text-slate-400 uppercase">
                    CORE HUB
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 9 Outer Floating Satellite Pills positioned matching Screenshot 2 */}

          {/* 1. Doniyor AI (Top Left) */}
          <div
            onClick={() => setActiveNodeId('doniyor')}
            className={`absolute left-[4%] sm:left-[8%] top-[12%] sm:top-[14%] z-10 cursor-pointer transition-all duration-300 ${
              activeNodeId === 'doniyor' ? 'scale-110 z-30' : 'hover:scale-105 opacity-90'
            }`}
          >
            <PillNode
              node={nodes[0]}
              isActive={activeNodeId === 'doniyor'}
            />
          </div>

          {/* 2. Shifoxonalar (Mid Left) */}
          <div
            onClick={() => setActiveNodeId('shifoxonalar')}
            className={`absolute left-[10%] sm:left-[14%] top-[34%] z-10 cursor-pointer transition-all duration-300 ${
              activeNodeId === 'shifoxonalar' ? 'scale-110 z-30' : 'hover:scale-105 opacity-90'
            }`}
          >
            <PillNode
              node={nodes[1]}
              isActive={activeNodeId === 'shifoxonalar'}
            />
          </div>

          {/* 3. Moliya (Low Mid Left) */}
          <div
            onClick={() => setActiveNodeId('moliya')}
            className={`absolute left-[15%] sm:left-[20%] top-[54%] z-10 cursor-pointer transition-all duration-300 ${
              activeNodeId === 'moliya' ? 'scale-110 z-30' : 'hover:scale-105 opacity-90'
            }`}
          >
            <PillNode
              node={nodes[3]}
              isActive={activeNodeId === 'moliya'}
            />
          </div>

          {/* 4. Tibbiy kartalar (Bottom Left) */}
          <div
            onClick={() => setActiveNodeId('tibbiy-kartalar')}
            className={`absolute left-[6%] sm:left-[11%] top-[72%] z-10 cursor-pointer transition-all duration-300 ${
              activeNodeId === 'tibbiy-kartalar' ? 'scale-110 z-30' : 'hover:scale-105 opacity-90'
            }`}
          >
            <PillNode
              node={nodes[2]}
              isActive={activeNodeId === 'tibbiy-kartalar'}
            />
          </div>

          {/* 5. Retseptlar (Bottom Center) */}
          <div
            onClick={() => setActiveNodeId('retseptlar')}
            className={`absolute left-1/2 -translate-x-1/2 bottom-[4%] sm:bottom-[6%] z-10 cursor-pointer transition-all duration-300 ${
              activeNodeId === 'retseptlar' ? 'scale-110 z-30' : 'hover:scale-105 opacity-90'
            }`}
          >
            <PillNode
              node={nodes[4]}
              isActive={activeNodeId === 'retseptlar'}
            />
          </div>

          {/* 6. Navbatlar (Top Right) */}
          <div
            onClick={() => setActiveNodeId('navbatlar')}
            className={`absolute right-[4%] sm:right-[8%] top-[12%] sm:top-[14%] z-10 cursor-pointer transition-all duration-300 ${
              activeNodeId === 'navbatlar' ? 'scale-110 z-30' : 'hover:scale-105 opacity-90'
            }`}
          >
            <PillNode
              node={nodes[5]}
              isActive={activeNodeId === 'navbatlar'}
            />
          </div>

          {/* 7. Poliklinikalar (Mid Right) */}
          <div
            onClick={() => setActiveNodeId('poliklinikalar')}
            className={`absolute right-[10%] sm:right-[14%] top-[34%] z-10 cursor-pointer transition-all duration-300 ${
              activeNodeId === 'poliklinikalar' ? 'scale-110 z-30' : 'hover:scale-105 opacity-90'
            }`}
          >
            <PillNode
              node={nodes[6]}
              isActive={activeNodeId === 'poliklinikalar'}
            />
          </div>

          {/* 8. Hisobotlar (Low Mid Right) */}
          <div
            onClick={() => setActiveNodeId('hisobotlar')}
            className={`absolute right-[15%] sm:right-[20%] top-[54%] z-10 cursor-pointer transition-all duration-300 ${
              activeNodeId === 'hisobotlar' ? 'scale-110 z-30' : 'hover:scale-105 opacity-90'
            }`}
          >
            <PillNode
              node={nodes[7]}
              isActive={activeNodeId === 'hisobotlar'}
            />
          </div>

          {/* 9. Omborxonalar (Bottom Right) */}
          <div
            onClick={() => setActiveNodeId('omborxonalar')}
            className={`absolute right-[6%] sm:right-[11%] top-[72%] z-10 cursor-pointer transition-all duration-300 ${
              activeNodeId === 'omborxonalar' ? 'scale-110 z-30' : 'hover:scale-105 opacity-90'
            }`}
          >
            <PillNode
              node={nodes[8]}
              isActive={activeNodeId === 'omborxonalar'}
            />
          </div>
        </div>

        {/* Live Interactive Detail Drawer Below Diagram */}
        <div className="mindmap-drawer max-w-2xl mx-auto mt-6 bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-cyan-200/90 shadow-xl p-5 transition-all">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-[#008BFF] shadow-xs">
                {activeNode.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">
                    {activeNode.label}
                  </h3>
                  <span className="text-[10px] font-bold bg-cyan-100/80 text-[#008BFF] px-2 py-0.5 rounded-full">
                    {activeNode.subtitle}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  {activeNode.description}
                </p>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Ko‘rsatkich:
              </span>
              <span className="text-sm font-black text-[#008BFF]">
                {activeNode.metric}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface PillNodeProps {
  node: NodeItem;
  isActive: boolean;
}

const PillNode: React.FC<PillNodeProps> = ({ node, isActive }) => {
  return (
    <div
      className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full backdrop-blur-md flex items-center gap-2.5 transition-all duration-300 shadow-sm ${
        isActive
          ? 'bg-white border-2 border-[#008BFF] shadow-lg shadow-cyan-500/20 text-[#008BFF]'
          : 'bg-white/90 border border-slate-200 text-slate-700 hover:border-[#008BFF]'
      }`}
    >
      <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
        {node.icon}
      </div>
      <span className="text-xs sm:text-sm font-extrabold tracking-tight whitespace-nowrap">
        {node.label}
      </span>
      {isActive && (
        <span className="w-2 h-2 rounded-full bg-[#008BFF] animate-ping" />
      )}
    </div>
  );
};
