import React, { useState } from 'react';
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

export const HeroProductPreview: React.FC = () => {
  // 3-Mode Device View Switcher
  const [deviceMode, setDeviceMode] = useState<'patient' | 'clinic' | 'display'>('patient');
  const [patientCalled, setPatientCalled] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'ticket' | 'card' | 'rx'>('ticket');

  const triggerCallPatient = () => {
    setPatientCalled(true);
    setTimeout(() => setPatientCalled(false), 3500);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Dynamic ambient cyan-blue medical glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#008BFF]/20 via-[#00B4D8]/20 to-[#0D34B4]/20 rounded-3xl blur-2xl opacity-80 animate-pulse pointer-events-none" />

      {/* Main Container */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-cyan-100 shadow-2xl overflow-hidden text-[#132229]">
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

        {/* ============================================================== */}
        {/* VIEW 1: PATIENT MOBILE APP PREVIEW (Bemor Ilovasi)             */}
        {/* ============================================================== */}
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
                    <h4 className="text-xs font-bold text-[#132229]">Jasur Bekmurodov</h4>
                    <p className="text-[10px] text-[#5F737B]">ID: ELV-99420 • Toshkent</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-[#008BFF] border border-cyan-200">
                  Faol E-Karta
                </span>
              </div>

              {/* Patient App Navigation Pills */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100/70 p-1 rounded-xl text-center">
                <button
                  onClick={() => setActiveMobileTab('ticket')}
                  className={`py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    activeMobileTab === 'ticket'
                      ? 'bg-white text-[#008BFF] shadow-xs'
                      : 'text-[#5F737B] hover:text-[#132229]'
                  }`}
                >
                  E-Chipta
                </button>
                <button
                  onClick={() => setActiveMobileTab('card')}
                  className={`py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    activeMobileTab === 'card'
                      ? 'bg-white text-[#008BFF] shadow-xs'
                      : 'text-[#5F737B] hover:text-[#132229]'
                  }`}
                >
                  Tibbiy Karta
                </button>
                <button
                  onClick={() => setActiveMobileTab('rx')}
                  className={`py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    activeMobileTab === 'rx'
                      ? 'bg-white text-[#008BFF] shadow-xs'
                      : 'text-[#5F737B] hover:text-[#132229]'
                  }`}
                >
                  Retseptlar
                </button>
              </div>

              {/* Tab 1: Live Digital Ticket */}
              {activeMobileTab === 'ticket' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#008BFF] via-[#0070F3] to-[#0D34B4] text-white shadow-md relative overflow-hidden">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold bg-white/20 px-2 py-0.5 rounded-full">
                          Elektron Navbat Chiptasi
                        </span>
                        <div className="text-3xl font-black mt-2 tracking-tight"># 07</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/15 backdrop-blur-md">
                        <QrCode size={36} className="text-white" />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/20 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-cyan-100">Klinika:</span>
                        <span className="font-semibold">Elvora Shifo Diagnostic</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-100">Shifokor:</span>
                        <span className="font-semibold">Dr. A. Usmonov (Kardiolog)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-100">Xona:</span>
                        <span className="font-bold text-cyan-200">102-xona (2-qavat)</span>
                      </div>
                    </div>

                    <div className="mt-3 p-2 rounded-xl bg-white/15 flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5 text-cyan-100">
                        <Clock size={13} /> Taxminiy qabul:
                      </span>
                      <span className="font-extrabold text-white">11:00 (~12 daq qoldi)</span>
                    </div>
                  </div>

                  {/* SMS Live preview */}
                  <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center gap-2.5 text-xs text-[#0D34B4]">
                    <Bell size={16} className="shrink-0 text-[#008BFF]" />
                    <span className="text-[11px] leading-tight">
                      <strong>SMS Eslatma:</strong> "Sizning navbatingizga 2 ta bemor qoldi. Iltimos, 102-xona oldiga yaqinlashing."
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 2: Digital Medical Card */}
              {activeMobileTab === 'card' && (
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-[#F8FBFE] border border-cyan-100">
                    <div className="flex justify-between text-[11px] text-[#5F737B]">
                      <span>Qon guruhi:</span>
                      <span className="font-bold text-[#132229]">A(II) Rh Musbat (+)</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#5F737B] mt-1">
                      <span>Allergik reaksiya:</span>
                      <span className="font-bold text-rose-600">Penitsillin guruhi</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#132229]">EKG va Qon Tahlili</span>
                      <span className="text-[10px] text-[#008BFF] font-bold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                        Normada
                      </span>
                    </div>
                    <p className="text-[10px] text-[#5F737B]">Oxirgi tekshiruv: Kecha, 15:30 • Markaziy laboratoriya</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-[#132229]">Tibbiy Tarix (Ambulator)</h5>
                      <p className="text-[10px] text-[#5F737B]">12 ta tashrif va tashxislar</p>
                    </div>
                    <span className="text-[11px] font-bold text-[#008BFF] hover:underline cursor-pointer">
                      PDF Yuklash
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 3: E-Prescriptions */}
              {activeMobileTab === 'rx' && (
                <div className="space-y-2.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#F8FBFE] border border-cyan-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#132229]">Elektron Retsept #RX-8831</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        Tasdiqlangan
                      </span>
                    </div>
                    <div className="text-[11px] text-[#132229] space-y-1">
                      <div className="font-semibold text-[#008BFF]">1. Kardiomagnil 75mg — 1 mahal</div>
                      <div className="font-semibold text-[#008BFF]">2. Magne B6 — 2 mahal (14 kun)</div>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-[#5F737B]">
                      <span>Shifokor: Dr. A. Usmonov</span>
                      <span className="text-[#008BFF] font-bold">QR tekshiruvi mavjud ✓</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: CLINIC PRO CRM PREVIEW (Klinika Boshqaruvi)            */}
        {/* ============================================================== */}
        {deviceMode === 'clinic' && (
          <div className="p-4 sm:p-5 space-y-4">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-[#F8FBFE] border border-cyan-100">
                <span className="text-[10px] font-bold text-[#5F737B] uppercase tracking-wider block">
                  Kassaga tushum
                </span>
                <div className="text-sm sm:text-base font-extrabold text-[#132229] mt-0.5">
                  3 470 000 <span className="text-[10px] text-[#5F737B]">UZS</span>
                </div>
                <span className="text-[10px] text-[#008BFF] font-semibold flex items-center gap-0.5 mt-0.5">
                  <ArrowUpRight size={11} /> +18% o'sish
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FBFE] border border-cyan-100">
                <span className="text-[10px] font-bold text-[#5F737B] uppercase tracking-wider block">
                  Kutish zalida
                </span>
                <div className="text-sm sm:text-base font-extrabold text-[#132229] mt-0.5">
                  4 nafar <span className="text-[10px] text-[#5F737B]">bemor</span>
                </div>
                <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-0.5 mt-0.5">
                  <Clock size={11} /> ~15 daqiqa
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FBFE] border border-cyan-100">
                <span className="text-[10px] font-bold text-[#5F737B] uppercase tracking-wider block">
                  Shifokorlar bandligi
                </span>
                <div className="text-sm sm:text-base font-extrabold text-[#008BFF] mt-0.5">
                  85% <span className="text-[10px] text-[#5F737B]">faol</span>
                </div>
                <span className="text-[10px] text-[#008BFF] font-semibold flex items-center gap-0.5 mt-0.5">
                  <CheckCircle2 size={11} /> 6 ta mutaxassis
                </span>
              </div>
            </div>

            {/* Smart Insight Notification Bar */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-50 to-white border border-cyan-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#008BFF] text-white">
                  <Sparkles size={14} className="animate-pulse" />
                </div>
                <div>
                  <span className="font-bold text-[#0D34B4]">Elvora Insights:</span>
                  <span className="text-[#132229] ml-1.5">
                    Kardiologiya bo'yicha tushlikdan so'ng 2 ta bo'sh slot band qilindi.
                  </span>
                </div>
              </div>

              <Link
                to="/app/insights"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#008BFF] hover:underline"
              >
                <span>Batafsil</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            {/* Live Queue Active Items */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#5F737B] px-1">
                <span>Jonli qabul holati</span>
                <span className="text-[11px] text-[#008BFF] font-semibold">Real vaqt yangilanishi</span>
              </div>

              <div className="space-y-2">
                {/* Item 1: In consultation */}
                <div className="p-3 rounded-xl bg-white border-2 border-blue-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#008BFF] font-extrabold flex items-center justify-center shrink-0">
                      #03
                    </span>
                    <div>
                      <span className="font-bold text-[#132229]">Dilnoza Vohidova</span>
                      <p className="text-[11px] text-[#5F737B]">Dr. N. Karimova (Terapevt) • 105-xona</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    Qabulda (18 daq)
                  </span>
                </div>

                {/* Item 2: Waiting next */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-cyan-50 text-[#008BFF] font-extrabold flex items-center justify-center shrink-0 border border-cyan-200">
                      #04
                    </span>
                    <div>
                      <span className="font-bold text-[#132229]">Anvar Qodirov</span>
                      <p className="text-[11px] text-[#5F737B]">Dr. A. Usmonov (Kardiolog) • 102-xona</p>
                    </div>
                  </div>
                  <button
                    onClick={triggerCallPatient}
                    className="px-3 py-1 rounded-lg bg-[#008BFF] hover:bg-[#0D34B4] text-white font-bold text-[11px] transition-all cursor-pointer shadow-xs"
                  >
                    {patientCalled ? 'Chaqirildi! 🔔' : 'Xonaga chaqirish'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: SMART CLINIC TV QUEUE DISPLAY (Kutish Zali Tablosi)   */}
        {/* ============================================================== */}
        {deviceMode === 'display' && (
          <div className="p-4 sm:p-6 bg-slate-950 text-white">
            {/* TV Screen Container */}
            <div className="rounded-2xl border-2 border-cyan-500/30 bg-slate-900/90 p-4 sm:p-5 shadow-2xl space-y-4">
              {/* Header TV */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                  <span className="font-black text-cyan-400 tracking-wider uppercase text-sm">
                    KUTISH ZALI ELEKTRON TABLOSI
                  </span>
                </div>
                <span className="font-mono text-cyan-200 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-800">
                  11:42 • 20.10.2026
                </span>
              </div>

              {/* Big Callout Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/90 via-cyan-950/80 to-slate-900 border-2 border-cyan-500 text-center relative overflow-hidden">
                <div className="text-xs uppercase tracking-widest text-cyan-300 font-bold mb-1">
                  CHAQIRILMOQDA (HUZURIGA KIRING)
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-wider my-1">
                  CHIPTA # 04
                </div>
                <div className="text-sm sm:text-base font-bold text-cyan-200">
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
