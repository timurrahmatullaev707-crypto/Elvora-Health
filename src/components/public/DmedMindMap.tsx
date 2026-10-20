import React, { useState } from 'react';
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
} from 'lucide-react';

interface NodeItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  position: 'top-left' | 'mid-left' | 'bot-left' | 'low-mid-left' | 'bot-center' | 'top-right' | 'mid-right' | 'low-mid-right' | 'bot-right';
}

export const DmedMindMap: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>('shifoxonalar');

  const nodes: NodeItem[] = [
    {
      id: 'muxlisa',
      label: 'Muxlisa',
      icon: <Bot size={15} className="text-[#008BFF]" />,
      description: 'Sun\'iy intellekt tibbiy yordamchisi va bemorlar skriningi',
      position: 'top-left',
    },
    {
      id: 'shifoxonalar',
      label: 'Shifoxonalar',
      icon: <Building size={15} className="text-[#008BFF]" />,
      description: 'Statsionar va poliklinika boshqaruvi, kasallik tarixi va elektron epikrizlar',
      position: 'mid-left',
    },
    {
      id: 'tibbiy-kartalar',
      label: 'Tibbiy kartalar',
      icon: <FileText size={15} className="text-[#008BFF]" />,
      description: 'Yagona elektron tibbiy karta — barcha tahlillar va tashxislar bitta joyda',
      position: 'bot-left',
    },
    {
      id: 'moliya',
      label: 'Moliya',
      icon: <CreditCard size={15} className="text-[#008BFF]" />,
      description: 'Pullik xizmatlar, Click/Payme integratsiyasi va fiskal cheklar',
      position: 'low-mid-left',
    },
    {
      id: 'retseptlar',
      label: 'Retseptlar',
      icon: <Activity size={15} className="text-[#008BFF]" />,
      description: 'Dorixonalar bilan integratsiyalashgan QR-kodli elektron retseptlar',
      position: 'bot-center',
    },
    {
      id: 'navbatlar',
      label: 'Navbatlar',
      icon: <Clock size={15} className="text-[#008BFF]" />,
      description: 'Elektron navbat tizimi va kutish zalidagi LED televizor tablosi',
      position: 'top-right',
    },
    {
      id: 'poliklinikalar',
      label: 'Poliklinikalar',
      icon: <Layers size={15} className="text-[#008BFF]" />,
      description: 'Oilaviy shifokorlar va ko‘p tarmoqli poliklinika jarayonlari avtomatizatsiyasi',
      position: 'mid-right',
    },
    {
      id: 'hisobotlar',
      label: 'Hisobotlar',
      icon: <BarChart3 size={15} className="text-[#008BFF]" />,
      description: 'Sog‘liqni Saqlash Vazirligi va rahbar uchun real vaqtli tahliliy hisobotlar',
      position: 'low-mid-right',
    },
    {
      id: 'omborxonalar',
      label: 'Omborxonalar',
      icon: <Package size={15} className="text-[#008BFF]" />,
      description: 'Dori vositalari va tibbiy sarf materiallarining qat\'iy hisobi',
      position: 'bot-right',
    },
  ];

  return (
    <section id="nima-bu" className="py-20 lg:py-28 bg-[#F4F9FC] border-y border-slate-200/80 relative overflow-hidden">
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#008BFF_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header from Screenshot 2 */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            DMED nima?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Bu tibbiy texnologiyalar ekotizimi bo'lib, davlat va xususiy tibbiyot muassasalari, farmatsevtika sektori, shifokorlar va bemorlarni yagona raqamli infratuzilmaga birlashtiradi
          </p>
        </div>

        {/* Central Mind-Map Interactive Diagram (1-to-1 with Screenshot 2) */}
        <div className="relative max-w-5xl mx-auto h-[500px] sm:h-[580px] flex items-center justify-center">
          {/* Animated SVG Connector Curves */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 580" fill="none">
            <defs>
              <linearGradient id="curveGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#008BFF" />
                <stop offset="100%" stopColor="#5FFFEC" />
              </linearGradient>
              <linearGradient id="curveGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5FFFEC" />
                <stop offset="100%" stopColor="#008BFF" />
              </linearGradient>
            </defs>

            {/* Curves connecting center (500, 290) to left nodes */}
            {/* Center to Muxlisa (180, 110) */}
            <path
              d="M 500 290 C 380 290, 300 130, 190 120"
              stroke="url(#curveGradLeft)"
              strokeWidth="2.5"
              className="animate-dash-flow opacity-80"
            />
            {/* Center to Shifoxonalar (230, 210) */}
            <path
              d="M 500 290 C 390 290, 330 220, 240 220"
              stroke="#008BFF"
              strokeWidth="2.5"
              className="animate-dash-flow opacity-90"
            />
            {/* Center to Moliya (270, 330) */}
            <path
              d="M 500 290 C 400 290, 360 340, 290 350"
              stroke="url(#curveGradLeft)"
              strokeWidth="2.5"
              className="animate-dash-flow opacity-80"
            />
            {/* Center to Tibbiy kartalar (170, 420) */}
            <path
              d="M 500 290 C 360 290, 280 430, 180 440"
              stroke="#008BFF"
              strokeWidth="2.5"
              className="animate-dash-flow opacity-70"
            />
            {/* Center to Retseptlar (460, 490) */}
            <path
              d="M 500 290 C 500 380, 500 450, 500 500"
              stroke="#008BFF"
              strokeWidth="2.5"
              className="animate-dash-flow opacity-80"
            />

            {/* Curves connecting center to right nodes */}
            {/* Center to Navbatlar (830, 110) */}
            <path
              d="M 500 290 C 620 290, 720 130, 810 120"
              stroke="url(#curveGradRight)"
              strokeWidth="2.5"
              className="animate-dash-flow opacity-80"
            />
            {/* Center to Poliklinikalar (770, 210) */}
            <path
              d="M 500 290 C 610 290, 670 220, 750 220"
              stroke="#008BFF"
              strokeWidth="2.5"
              className="animate-dash-flow opacity-90"
            />
            {/* Center to Hisobotlar (730, 340) */}
            <path
              d="M 500 290 C 600 290, 640 340, 710 350"
              stroke="url(#curveGradRight)"
              strokeWidth="2.5"
              className="animate-dash-flow opacity-80"
            />
            {/* Center to Omborxonalar (820, 440) */}
            <path
              d="M 500 290 C 640 290, 730 430, 810 440"
              stroke="#008BFF"
              strokeWidth="2.5"
              className="animate-dash-flow opacity-70"
            />
          </svg>

          {/* Center Box: Rounded square with the blue DMED Starburst */}
          <div className="z-20 relative p-6 sm:p-8 rounded-3xl bg-white border-4 border-white/80 shadow-2xl flex items-center justify-center animate-pulse-glow">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <svg className="w-14 h-14 sm:w-16 sm:h-16 text-[#008BFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
              </svg>
            </div>
          </div>

          {/* Node 1: Muxlisa (Top Left) */}
          <div
            onClick={() => setActiveNode('muxlisa')}
            className="absolute left-4 sm:left-12 top-6 sm:top-8 z-30 cursor-pointer"
          >
            <div className={`px-5 py-3 rounded-2xl bg-white border-2 shadow-lg transition-all hover:scale-105 flex items-center gap-2 ${
              activeNode === 'muxlisa' ? 'border-[#008BFF] ring-4 ring-[#008BFF]/10' : 'border-slate-200'
            }`}>
              <Bot size={15} className="text-[#008BFF]" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">Muxlisa</span>
            </div>
          </div>

          {/* Node 2: Shifoxonalar (Mid Left) */}
          <div
            onClick={() => setActiveNode('shifoxonalar')}
            className="absolute left-10 sm:left-24 top-36 sm:top-40 z-30 cursor-pointer"
          >
            <div className={`px-6 py-3.5 rounded-2xl bg-white border-2 shadow-xl transition-all hover:scale-105 flex items-center gap-2 ${
              activeNode === 'shifoxonalar' ? 'border-[#008BFF] ring-4 ring-[#008BFF]/10' : 'border-slate-200'
            }`}>
              <Building size={16} className="text-[#008BFF]" />
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">Shifoxonalar</span>
            </div>
          </div>

          {/* Node 3: Moliya (Lower Mid Left) */}
          <div
            onClick={() => setActiveNode('moliya')}
            className="absolute left-20 sm:left-36 bottom-36 sm:bottom-40 z-30 cursor-pointer"
          >
            <div className={`px-5 py-3 rounded-2xl bg-white border-2 shadow-lg transition-all hover:scale-105 flex items-center gap-2 ${
              activeNode === 'moliya' ? 'border-[#008BFF] ring-4 ring-[#008BFF]/10' : 'border-slate-200'
            }`}>
              <CreditCard size={15} className="text-[#008BFF]" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">Moliya</span>
            </div>
          </div>

          {/* Node 4: Tibbiy kartalar (Bottom Left) */}
          <div
            onClick={() => setActiveNode('tibbiy-kartalar')}
            className="absolute left-4 sm:left-14 bottom-8 sm:bottom-12 z-30 cursor-pointer"
          >
            <div className={`px-5 py-3 rounded-2xl bg-white border-2 shadow-lg transition-all hover:scale-105 flex items-center gap-2 ${
              activeNode === 'tibbiy-kartalar' ? 'border-[#008BFF] ring-4 ring-[#008BFF]/10' : 'border-slate-200'
            }`}>
              <FileText size={15} className="text-[#008BFF]" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">Tibbiy kartalar</span>
            </div>
          </div>

          {/* Node 5: Retseptlar (Bottom Center) */}
          <div
            onClick={() => setActiveNode('retseptlar')}
            className="absolute left-1/2 -translate-x-1/2 bottom-2 z-30 cursor-pointer"
          >
            <div className={`px-6 py-3.5 rounded-2xl bg-white border-2 shadow-xl transition-all hover:scale-105 flex items-center gap-2 ${
              activeNode === 'retseptlar' ? 'border-[#008BFF] ring-4 ring-[#008BFF]/10' : 'border-slate-200'
            }`}>
              <Activity size={16} className="text-[#008BFF]" />
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">Retseptlar</span>
            </div>
          </div>

          {/* Node 6: Navbatlar (Top Right) */}
          <div
            onClick={() => setActiveNode('navbatlar')}
            className="absolute right-4 sm:right-12 top-6 sm:top-8 z-30 cursor-pointer"
          >
            <div className={`px-5 py-3 rounded-2xl bg-white border-2 shadow-lg transition-all hover:scale-105 flex items-center gap-2 ${
              activeNode === 'navbatlar' ? 'border-[#008BFF] ring-4 ring-[#008BFF]/10' : 'border-slate-200'
            }`}>
              <Clock size={15} className="text-[#008BFF]" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">Navbatlar</span>
            </div>
          </div>

          {/* Node 7: Poliklinikalar (Mid Right) */}
          <div
            onClick={() => setActiveNode('poliklinikalar')}
            className="absolute right-10 sm:right-24 top-36 sm:top-40 z-30 cursor-pointer"
          >
            <div className={`px-6 py-3.5 rounded-2xl bg-white border-2 shadow-xl transition-all hover:scale-105 flex items-center gap-2 ${
              activeNode === 'poliklinikalar' ? 'border-[#008BFF] ring-4 ring-[#008BFF]/10' : 'border-slate-200'
            }`}>
              <Layers size={16} className="text-[#008BFF]" />
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">Poliklinikalar</span>
            </div>
          </div>

          {/* Node 8: Hisobotlar (Lower Mid Right) */}
          <div
            onClick={() => setActiveNode('hisobotlar')}
            className="absolute right-20 sm:right-36 bottom-36 sm:bottom-40 z-30 cursor-pointer"
          >
            <div className={`px-5 py-3 rounded-2xl bg-white border-2 shadow-lg transition-all hover:scale-105 flex items-center gap-2 ${
              activeNode === 'hisobotlar' ? 'border-[#008BFF] ring-4 ring-[#008BFF]/10' : 'border-slate-200'
            }`}>
              <BarChart3 size={15} className="text-[#008BFF]" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">Hisobotlar</span>
            </div>
          </div>

          {/* Node 9: Omborxonalar (Bottom Right) */}
          <div
            onClick={() => setActiveNode('omborxonalar')}
            className="absolute right-4 sm:right-14 bottom-8 sm:bottom-12 z-30 cursor-pointer"
          >
            <div className={`px-5 py-3 rounded-2xl bg-white border-2 shadow-lg transition-all hover:scale-105 flex items-center gap-2 ${
              activeNode === 'omborxonalar' ? 'border-[#008BFF] ring-4 ring-[#008BFF]/10' : 'border-slate-200'
            }`}>
              <Package size={15} className="text-[#008BFF]" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">Omborxonalar</span>
            </div>
          </div>
        </div>

        {/* Selected Node Details Bar */}
        {activeNode && (
          <div className="mt-8 max-w-2xl mx-auto p-4 rounded-2xl bg-white border border-slate-200 shadow-md text-center animate-fade-in space-y-1">
            <span className="text-[11px] font-bold text-[#008BFF] uppercase tracking-wider block">
              Tanlangan modul:
            </span>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              {nodes.find((n) => n.id === activeNode)?.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
