import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Tablet,
  Tv,
  Clock,
  Sparkles,
  ArrowUpRight,
  Stethoscope,
  CheckCircle2,
  Users,
  Activity,
  ArrowRight,
  QrCode,
  Bell,
  Check,
  ShieldCheck,
  Volume2,
  FileText,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

export const HeroProductPreview: React.FC = () => {
  // 3-Mode Device View Switcher
  const [deviceMode, setDeviceMode] = useState<'patient' | 'clinic' | 'display'>('patient');
  const [patientCalled, setPatientCalled] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'ticket' | 'card' | 'rx'>('ticket');

  const containerRef = useRef<HTMLDivElement>(null);
  const viewContainerRef = useRef<HTMLDivElement>(null);

  const triggerCallPatient = () => {
    setPatientCalled(true);
    setTimeout(() => setPatientCalled(false), 3500);
  };

  useGsapContext(
    containerRef,
    () => {
      gsap.from('.product-preview-box', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        scale: 0.98,
        duration: 0.8,
        ease: 'power2.out',
      });
    },
    []
  );

  // Animate tab content change
  useEffect(() => {
    if (!viewContainerRef.current) return;
    gsap.fromTo(
      viewContainerRef.current,
      { opacity: 0.6, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    );
  }, [deviceMode]);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Dynamic ambient cyan-blue medical glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#008BFF]/20 via-[#00B4D8]/20 to-[#0D34B4]/20 rounded-3xl blur-2xl opacity-80 animate-pulse pointer-events-none" />

      {/* Main Container */}
      <div className="product-preview-box relative bg-white/95 backdrop-blur-xl rounded-3xl border border-cyan-100 shadow-2xl overflow-hidden text-[#132229]">
        {/* Device Switcher Header */}
        <div className="bg-[#F8FBFE] border-b border-cyan-100 px-4 py-3 flex flex-wrap items-center justify-between gap-2.5">
          {/* 3 Interactive Device View Buttons */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200/80 shadow-xs">
            <button
              onClick={() => setDeviceMode('patient')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                deviceMode === 'patient'
                  ? 'bg-[#008BFF] text-white shadow-xs'
                  : 'text-[#5F737B] hover:text-[#132229]'
              }`}
            >
              <Smartphone size={13} />
              <span>Bemor ilovasi</span>
            </button>

            <button
              onClick={() => setDeviceMode('clinic')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                deviceMode === 'clinic'
                  ? 'bg-[#008BFF] text-white shadow-xs'
                  : 'text-[#5F737B] hover:text-[#132229]'
              }`}
            >
              <Tablet size={13} />
              <span>Klinika plansheti</span>
            </button>

            <button
              onClick={() => setDeviceMode('display')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                deviceMode === 'display'
                  ? 'bg-[#008BFF] text-white shadow-xs'
                  : 'text-[#5F737B] hover:text-[#132229]'
              }`}
            >
              <Tv size={13} />
              <span>Kutish tablosi</span>
            </button>
          </div>

          {/* Status Live Indicator */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#008BFF] bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
            <span className="w-2 h-2 rounded-full bg-[#008BFF] animate-ping" />
            <span className="font-bold">Elvora Ekotizimi</span>
          </div>
        </div>

        {/* Dynamic View Container */}
        <div ref={viewContainerRef}>
          {/* VIEW 1: PATIENT MOBILE APP PREVIEW */}
          {deviceMode === 'patient' && (
            <div className="p-4 sm:p-6 bg-gradient-to-b from-[#F0F8FD]/50 to-white">
              <div className="max-w-sm mx-auto bg-white rounded-2xl border-2 border-cyan-100 shadow-lg p-4 space-y-4">
                {/* Mobile App Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#008BFF] to-[#0D34B4] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                      JB
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        Jasur Bekmurodov
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        ID: ELV-2026-9942
                      </div>
                    </div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-cyan-50 text-[#008BFF]">
                    <Bell size={15} />
                  </div>
                </div>

                {/* Sub-tabs in Mobile App */}
                <div className="grid grid-cols-3 gap-1 bg-[#F8FBFE] p-1 rounded-xl text-[11px] font-bold text-center">
                  <button
                    onClick={() => setActiveMobileTab('ticket')}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeMobileTab === 'ticket'
                        ? 'bg-white text-[#008BFF] shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    E-Chipta
                  </button>
                  <button
                    onClick={() => setActiveMobileTab('card')}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeMobileTab === 'card'
                        ? 'bg-white text-[#008BFF] shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Medkarta
                  </button>
                  <button
                    onClick={() => setActiveMobileTab('rx')}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeMobileTab === 'rx'
                        ? 'bg-white text-[#008BFF] shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    E-Retsept
                  </button>
                </div>

                {/* Tab Content 1: Ticket */}
                {activeMobileTab === 'ticket' && (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#008BFF] via-[#00B4D8] to-[#0D34B4] text-white space-y-3 relative overflow-hidden shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-100">
                        JONLI QABUL CHIPTASI
                      </span>
                      <span className="text-[9px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full font-bold">
                        Faol Navbat
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-black tracking-tight">#07</div>
                        <div className="text-xs font-semibold text-cyan-100">
                          Sizdan oldin: 1 kishi
                        </div>
                      </div>
                      <div className="p-2 bg-white rounded-xl shadow-xs">
                        <QrCode size={40} className="text-[#0D34B4]" />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/20 text-xs flex justify-between items-center text-cyan-50">
                      <div>
                        <span className="block text-[10px] text-cyan-200">Shifokor:</span>
                        <strong>Dr. Anvar Usmonov</strong>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-cyan-200">Xona:</span>
                        <strong>102-xona</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content 2: Medical Card */}
                {activeMobileTab === 'card' && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <Activity size={13} className="text-[#008BFF]" /> Qon bosimi monitoringi
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Normada
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Oxirgi ko'rsatkich:</span>
                        <strong className="text-slate-900 text-sm">120 / 80</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Yurak urishi:</span>
                        <strong className="text-[#008BFF] text-sm">74 bpm</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content 3: Prescriptions */}
                {activeMobileTab === 'rx' && (
                  <div className="p-3.5 rounded-2xl bg-cyan-50/70 border border-cyan-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center pb-1.5 border-b border-cyan-200">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <FileText size={13} className="text-[#008BFF]" /> Elektron Retsept #RA-453
                      </span>
                      <span className="text-[10px] font-bold text-[#008BFF] bg-white px-2 py-0.5 rounded-full">
                        QR Faol
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-700">
                      <div className="font-bold">1. Kardiomagnil 75mg (Kuniga 1 mahal)</div>
                      <div className="text-slate-500 text-[10px]">Dorixonada QR orqali 30% chegirma</div>
                    </div>
                  </div>
                )}

                {/* Quick Info Bar */}
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-2">
                  <Check size={14} className="text-emerald-600 shrink-0" />
                  <span>SMS eslatma jo'natilgan: Bugun, 10:45</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: CLINIC TABLET PREVIEW */}
          {deviceMode === 'clinic' && (
            <div className="p-4 sm:p-6 bg-slate-50">
              <div className="max-w-2xl mx-auto bg-white rounded-2xl border-2 border-slate-200 shadow-md p-4 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Stethoscope size={18} className="text-[#008BFF]" />
                    <span className="text-sm font-bold text-slate-900">
                      Dr. Anvar Usmonov — Shifokor Kabineti Plansheti
                    </span>
                  </div>
                  <span className="text-xs font-bold bg-cyan-50 text-[#008BFF] px-2.5 py-1 rounded-full border border-cyan-200">
                    102-xona
                  </span>
                </div>

                {/* Calling Action Area */}
                <div className="p-4 rounded-2xl bg-[#F8FBFE] border border-cyan-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Navbatdagi Bemor:
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900">
                      Jasur Bekmurodov (#07)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Tashxis: Arterial gipertenziya nazorati
                    </p>
                  </div>

                  <button
                    onClick={triggerCallPatient}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 ${
                      patientCalled
                        ? 'bg-emerald-600 text-white animate-bounce'
                        : 'bg-[#008BFF] hover:bg-[#0D34B4] text-white shadow-blue-500/25'
                    }`}
                  >
                    <Volume2 size={15} />
                    <span>{patientCalled ? 'Chaqirilmoqda...' : 'Chaqirish (TV Ekran)'}</span>
                  </button>
                </div>

                {/* Patient Queue Matrix */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    Bugungi qabullar ro'yxati:
                  </span>
                  <div className="space-y-1.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-cyan-50/70 border border-cyan-200 flex justify-between items-center font-bold text-slate-800">
                      <span>#07 — Jasur Bekmurodov (11:00)</span>
                      <span className="text-[#008BFF]">Kutilmoqda</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-slate-600">
                      <span>#08 — Shahnoza Aliyeva (11:30)</span>
                      <span className="text-slate-400">Navbatda</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: TV QUEUE DISPLAY PREVIEW */}
          {deviceMode === 'display' && (
            <div className="p-4 sm:p-6 bg-slate-900 text-white">
              <div className="max-w-2xl mx-auto bg-slate-950 rounded-2xl border-2 border-slate-800 p-5 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-sm font-extrabold tracking-wide text-cyan-400">
                      ELVORA SMART DISPLAY • JONLI TABLO
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    10:58:32
                  </span>
                </div>

                {/* Big Active Calling Banner */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/60 via-cyan-900/40 to-blue-950 border-2 border-cyan-400/80 text-center space-y-2 relative overflow-hidden">
                  <div className="text-xs uppercase font-bold tracking-widest text-cyan-300">
                    QABULGA CHAQIRILMOQDA:
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    #07 — JASUR B.
                  </div>
                  <div className="text-sm font-extrabold text-cyan-400">
                    102-XONA • DR. ANVAR USMONOV (KARDIOLOG)
                  </div>
                </div>

                {/* Next Waiting Queue List */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Keyingi navbatdagilar:
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                      <span className="text-[10px] text-slate-400 block">Navbat #05</span>
                      <span className="font-bold text-white text-sm">11:00</span>
                      <span className="text-[10px] text-cyan-400 block truncate">Terapevt</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                      <span className="text-[10px] text-slate-400 block">Navbat #06</span>
                      <span className="font-bold text-white text-sm">11:30</span>
                      <span className="text-[10px] text-cyan-400 block truncate">Nevropatolog</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                      <span className="text-[10px] text-slate-400 block">Navbat #07</span>
                      <span className="font-bold text-white text-sm">12:00</span>
                      <span className="text-[10px] text-cyan-400 block truncate">Kardiolog</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Ticker */}
                <div className="p-2 rounded bg-slate-800/50 text-[11px] text-cyan-300 flex items-center justify-between border border-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Volume2 size={13} className="text-cyan-400" /> Ovozli chaqiruv faol
                  </span>
                  <span className="text-slate-400">Elvora Smart Display v2.4</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Quick Launch */}
        <div className="bg-[#F8FBFE] px-4 sm:px-5 py-3 border-t border-cyan-100 flex items-center justify-between">
          <div className="text-xs text-[#5F737B] flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#008BFF]" />
            <span>Real vaqt rejimida to'liq interaktiv</span>
          </div>

          <Link
            to="/app/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008BFF] hover:text-[#0D34B4] transition-colors"
          >
            <span>Boshqaruv paneliga kirish</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
