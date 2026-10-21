import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  QrCode,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Stethoscope,
  X,
  Share2,
  Download,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGsapContext, gsap } from '../../lib/useGsapScroll';

export const LiveBookingWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'doctor' | 'clinic' | 'queue' | 'analysis'>('doctor');

  // Form State
  const [selectedSpecialty, setSelectedSpecialty] = useState('Kardiolog');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Anvar Usmonov');
  const [selectedClinic, setSelectedClinic] = useState('ShifoMed Markaziy Filiali');
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [patientName, setPatientName] = useState('Jasur Bekmurodov');
  const [patientPhone, setPatientPhone] = useState('+998 90 123 45 67');

  // Generated Ticket Modal
  const [ticketGenerated, setTicketGenerated] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const ticketModalRef = useRef<HTMLDivElement>(null);

  const specialties = [
    'Kardiolog',
    'Terapevt',
    'Nevropatolog',
    'Pediatr',
    'Stomatolog',
    'Ginekolog',
    'MRT Diagnostika',
  ];

  const doctorsList = [
    { name: 'Dr. Anvar Usmonov', spec: 'Kardiolog', fee: '150 000 UZS', rating: '4.9 (124 fikr)' },
    { name: 'Dr. Nilufar Karimova', spec: 'Terapevt', fee: '120 000 UZS', rating: '4.8 (98 fikr)' },
    { name: 'Dr. Bobur Mirzayev', spec: 'Nevropatolog', fee: '160 000 UZS', rating: '5.0 (210 fikr)' },
    { name: 'Dr. Shahnoza Aliyeva', spec: 'Pediatr', fee: '130 000 UZS', rating: '4.9 (84 fikr)' },
  ];

  useGsapContext(
    containerRef,
    () => {
      gsap.from('.booking-widget-box', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        scale: 0.98,
        duration: 0.75,
        ease: 'power2.out',
      });
    },
    []
  );

  useEffect(() => {
    if (ticketGenerated && ticketModalRef.current) {
      gsap.fromTo(
        ticketModalRef.current,
        { scale: 0.85, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' }
      );
    }
  }, [ticketGenerated]);

  const handleGenerateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketGenerated(true);
  };

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto">
      <div className="booking-widget-box bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-cyan-100 shadow-2xl p-4 sm:p-7 relative overflow-hidden">
        {/* Decorative top pill */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-cyan-50 text-[#008BFF] border border-cyan-200">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#132229] tracking-tight">
                Elvora Health Tezkor Tibbiy Qidiruv va E-Navbat Portali
              </h3>
              <p className="text-xs text-[#5F737B]">
                Shifokor qabuliga navbatsiz, to'g'ridan-to'g'ri elektron chipta oling
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-cyan-50 text-[#008BFF] border border-cyan-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#008BFF] animate-pulse" />
            Avtomatlashtirilgan E-Navbat
          </span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none text-xs font-bold">
          <button
            onClick={() => setActiveTab('doctor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'doctor'
                ? 'bg-[#008BFF] text-white shadow-md shadow-blue-500/25'
                : 'bg-[#F8FBFE] text-[#5F737B] hover:text-[#132229] border border-slate-200/70'
            }`}
          >
            <Stethoscope size={14} />
            <span>Shifokor topish</span>
          </button>

          <button
            onClick={() => setActiveTab('clinic')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'clinic'
                ? 'bg-[#008BFF] text-white shadow-md shadow-blue-500/25'
                : 'bg-[#F8FBFE] text-[#5F737B] hover:text-[#132229] border border-slate-200/70'
            }`}
          >
            <Building2 size={14} />
            <span>Klinika va Filiallar</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'queue'
                ? 'bg-[#008BFF] text-white shadow-md shadow-blue-500/25'
                : 'bg-[#F8FBFE] text-[#5F737B] hover:text-[#132229] border border-slate-200/70'
            }`}
          >
            <Clock size={14} />
            <span>Jonli E-Navbat tablosi</span>
          </button>

          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'analysis'
                ? 'bg-[#008BFF] text-white shadow-md shadow-blue-500/25'
                : 'bg-[#F8FBFE] text-[#5F737B] hover:text-[#132229] border border-slate-200/70'
            }`}
          >
            <Search size={14} />
            <span>Laboratoriya tahlillari</span>
          </button>
        </div>

        {/* Tab 1: Doctor Booking */}
        {activeTab === 'doctor' && (
          <form onSubmit={handleGenerateTicket} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Specialty */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  1. Mutaxassislikni tanlang:
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-[#F8FBFE] text-xs font-semibold focus:outline-none focus:border-[#008BFF] focus:bg-white transition-all cursor-pointer"
                >
                  {specialties.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  2. Shifokor:
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-[#F8FBFE] text-xs font-semibold focus:outline-none focus:border-[#008BFF] focus:bg-white transition-all cursor-pointer"
                >
                  {doctorsList.map((doc) => (
                    <option key={doc.name} value={doc.name}>
                      {doc.name} ({doc.fee})
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  3. Qabul vaqti (Bugun):
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-[#F8FBFE] text-xs font-semibold focus:outline-none focus:border-[#008BFF] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="10:30">10:30 (Bo'sh)</option>
                  <option value="11:00">11:00 (Bo'sh)</option>
                  <option value="11:30">11:30 (Bo'sh)</option>
                  <option value="14:00">14:00 (Bo'sh)</option>
                  <option value="15:30">15:30 (Bo'sh)</option>
                </select>
              </div>
            </div>

            {/* Patient Info Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Bemor F.I.Sh.:
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Masalan: Jasur Bekmurodov"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-[#F8FBFE] text-xs font-semibold focus:outline-none focus:border-[#008BFF] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Telefon raqam (SMS eslatma uchun):
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-[#F8FBFE] text-xs font-semibold focus:outline-none focus:border-[#008BFF] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#5F737B]">
                <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                <span>Oldindan to'lov talab qilinmaydi. To'lov qabul kuni klinikada amalga oshiriladi.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#008BFF] to-[#0D34B4] hover:from-[#007EE6] hover:to-[#0A2D9C] text-white text-xs font-bold shadow-md hover:shadow-lg shadow-blue-500/25 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Elektron Chipta Olish</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Clinics List */}
        {activeTab === 'clinic' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#F8FBFE] border border-cyan-100 hover:border-cyan-300 transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-[#132229]">Elvora Markaziy Filiali</h4>
                    <p className="text-[11px] text-[#5F737B] mt-0.5">Toshkent sh., Mirzo Ulug'bek tumani</p>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                    Ochiq
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-center text-[11px] text-[#008BFF] font-semibold pt-2 border-t border-slate-200/60">
                  <span>14 ta mutaxassis navbatda</span>
                  <span>Tanlash →</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FBFE] border border-cyan-100 hover:border-cyan-300 transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-[#132229]">Shifo Med Chilonzor Filiali</h4>
                    <p className="text-[11px] text-[#5F737B] mt-0.5">Toshkent sh., Chilonzor 9-mavze</p>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                    Ochiq
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-center text-[11px] text-[#008BFF] font-semibold pt-2 border-t border-slate-200/60">
                  <span>8 ta mutaxassis navbatda</span>
                  <span>Tanlash →</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Live Queue Preview */}
        {activeTab === 'queue' && (
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Jonli Kutish Zali Tablosi
              </span>
              <span className="text-slate-400">Markaziy Klinika</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400 block">102-xona (Kardiolog)</span>
                <span className="text-2xl font-black text-cyan-400">#07</span>
                <span className="text-[10px] text-emerald-400 block">Qabulda</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400 block">105-xona (Terapevt)</span>
                <span className="text-2xl font-black text-white">#04</span>
                <span className="text-[10px] text-emerald-400 block">Qabulda</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400 block">204-xona (Nevrolog)</span>
                <span className="text-2xl font-black text-white">#11</span>
                <span className="text-[10px] text-amber-400 block">Kutilmoqda</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400 block">MRT / MRT Skaner</span>
                <span className="text-2xl font-black text-cyan-400">#02</span>
                <span className="text-[10px] text-emerald-400 block">Jarayonda</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Lab Analysis */}
        {activeTab === 'analysis' && (
          <div className="space-y-3 text-xs">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tahlil nomini qidiring (Masalan: Umumiy qon, Gormonlar, Biokimyo)..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-[#F8FBFE] text-xs focus:outline-none focus:border-[#008BFF] focus:bg-white"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-3 rounded-xl bg-[#F8FBFE] border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-900">Umumiy Qon Tahlili (KSR + Leykoformula)</div>
                  <div className="text-[10px] text-slate-500">Natija: 2 soatda tayyor</div>
                </div>
                <span className="font-extrabold text-[#008BFF]">65 000 UZS</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FBFE] border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-900">Jigar sinamalari (ALT, AST, Bilirubin)</div>
                  <div className="text-[10px] text-slate-500">Biokimyoviy avtoanalizator</div>
                </div>
                <span className="font-extrabold text-[#008BFF]">110 000 UZS</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* GENERATED TICKET MODAL */}
      {ticketGenerated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            ref={ticketModalRef}
            className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-cyan-200 relative space-y-4"
          >
            <button
              onClick={() => setTicketGenerated(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-[#5F737B] hover:text-[#132229] cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Ticket Header */}
            <div className="text-center space-y-1">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-cyan-50 text-[#008BFF] border border-cyan-200">
                ✓ Muvaffaqiyatli band qilindi
              </span>
              <h4 className="text-base font-extrabold text-[#132229]">Elektron Qabul Chiptasi</h4>
              <p className="text-[11px] text-[#5F737B]">Elvora Shifo Tibbiyot Markazi</p>
            </div>

            {/* Ticket Body */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#008BFF] via-[#0070F3] to-[#0D34B4] text-white text-center space-y-3 shadow-lg">
              <div className="text-[11px] uppercase tracking-wider text-cyan-100 font-bold">
                Sizning Navbat Raqamingiz:
              </div>
              <div className="text-5xl font-black tracking-tight text-white"># 09</div>

              <div className="pt-3 border-t border-white/20 text-xs text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-cyan-100">Bemor:</span>
                  <span className="font-bold">{patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-100">Mutaxassis:</span>
                  <span className="font-bold">{selectedDoctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-100">Belgilangan vaqt:</span>
                  <span className="font-bold text-cyan-200">{selectedTime} (Bugun)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-100">Xona:</span>
                  <span className="font-bold text-white">102-xona (2-qavat)</span>
                </div>
              </div>

              {/* Barcode & QR simulation */}
              <div className="mt-3 p-2 bg-white rounded-xl flex items-center justify-between text-slate-800">
                <div className="text-left">
                  <span className="text-[9px] font-mono text-slate-400 block">CHIPTA KODI</span>
                  <span className="text-xs font-mono font-bold">ELV-2026-09</span>
                </div>
                <QrCode size={28} className="text-[#008BFF]" />
              </div>
            </div>

            {/* Notification alert */}
            <div className="p-2.5 rounded-xl bg-cyan-50 text-[11px] text-[#0D34B4] flex items-center gap-2 border border-cyan-200">
              <CheckCircle2 size={16} className="text-[#008BFF] shrink-0" />
              <span>SMS eslatma <strong>{patientPhone}</strong> raqamiga yuborildi.</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setTicketGenerated(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-xs font-bold text-[#132229] hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Yopish
              </button>
              <Link
                to="/app/appointments"
                className="flex-1 py-2 rounded-xl bg-[#008BFF] text-xs font-bold text-white hover:bg-[#0D34B4] transition-colors text-center cursor-pointer shadow-xs"
              >
                Navbatda ko'rish →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
