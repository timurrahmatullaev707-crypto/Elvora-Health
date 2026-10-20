import React, { useState } from 'react';
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

  const handleGenerateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketGenerated(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-cyan-100 shadow-2xl p-4 sm:p-7 relative overflow-hidden">
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
          <span>Klinikalar katalogi</span>
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
          <span>Navbatni onlayn kuzatish</span>
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
          <span>Tahlil natijalari (QR)</span>
        </button>
      </div>

      {/* Tab 1: Doctor Booking Form */}
      {activeTab === 'doctor' && (
        <form onSubmit={handleGenerateTicket} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Specialty */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#5F737B] mb-1">
                Mutaxassislik
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#F8FBFE] border border-slate-200 rounded-xl text-xs font-semibold text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20"
              >
                {specialties.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#5F737B] mb-1">
                Shifokor tanlang
              </label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#F8FBFE] border border-slate-200 rounded-xl text-xs font-semibold text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20"
              >
                {doctorsList.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name} ({d.fee})
                  </option>
                ))}
              </select>
            </div>

            {/* Available Slot */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#5F737B] mb-1">
                Bugungi qabul vaqti
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['10:00', '11:00', '14:30'].map((time) => (
                  <button
                    type="button"
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      selectedTime === time
                        ? 'bg-[#008BFF] text-white border-[#008BFF] shadow-xs'
                        : 'bg-[#F8FBFE] text-[#132229] border-slate-200 hover:bg-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Details & Submit */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-4">
              <label className="block text-[11px] font-bold uppercase text-[#5F737B] mb-1">
                Bemor Ism-Familiyasi
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F737B]" />
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Ism Familiya"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8FBFE] border border-slate-200 rounded-xl text-[#132229] font-medium focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-[11px] font-bold uppercase text-[#5F737B] mb-1">
                Telefon raqam (SMS eslatma)
              </label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F737B]" />
                <input
                  type="text"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="+998 90 ..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8FBFE] border border-slate-200 rounded-xl text-[#132229] font-mono focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white text-xs font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>⚡ E-Navbat chiptasini olish</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Clinic Catalog preview */}
      {activeTab === 'clinic' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#F8FBFE] border border-cyan-100 space-y-1.5">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-[#132229]">Elvora Shifo Markaziy Ko'p Tarmoqli Klinikasi</h4>
              <span className="text-[10px] font-bold bg-cyan-50 text-[#008BFF] px-2 py-0.5 rounded border border-cyan-200">
                12 ta shifokor
              </span>
            </div>
            <p className="text-[11px] text-[#5F737B]">Toshkent sh., Yunusobod tumani • E-Navbat faol</p>
            <div className="pt-2 flex justify-between items-center text-[11px]">
              <span className="text-emerald-700 font-bold">Kutish vaqti: ~10 daqiqa</span>
              <button
                onClick={() => setActiveTab('doctor')}
                className="text-[#008BFF] font-bold hover:underline cursor-pointer"
              >
                Qabulga yozilish →
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FBFE] border border-cyan-100 space-y-1.5">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-[#132229]">Elvora Diagnostics & Kardiologiya</h4>
              <span className="text-[10px] font-bold bg-cyan-50 text-[#008BFF] px-2 py-0.5 rounded border border-cyan-200">
                8 ta shifokor
              </span>
            </div>
            <p className="text-[11px] text-[#5F737B]">Toshkent sh., Chilonzor tumani • EKG/MRT/KT</p>
            <div className="pt-2 flex justify-between items-center text-[11px]">
              <span className="text-emerald-700 font-bold">Kutish vaqti: ~5 daqiqa</span>
              <button
                onClick={() => setActiveTab('doctor')}
                className="text-[#008BFF] font-bold hover:underline cursor-pointer"
              >
                Qabulga yozilish →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Queue live track */}
      {activeTab === 'queue' && (
        <div className="p-4 rounded-2xl bg-[#F8FBFE] border border-cyan-100 text-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-[#132229]">Navbat holatini tekshirish</h4>
              <p className="text-[11px] text-[#5F737B]">Telefon raqamingiz yoki chipta raqamingizni kiriting</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-[#008BFF] border border-cyan-200 font-bold text-[10px]">
              Jonli aloqa
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              defaultValue="#07 — Dr. Usmonov"
              className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
            />
            <button
              onClick={() => setTicketGenerated(true)}
              className="px-4 py-2 bg-[#008BFF] text-white rounded-xl font-bold cursor-pointer hover:bg-[#0D34B4] shadow-xs"
            >
              Holatni ko'rish
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Analysis check */}
      {activeTab === 'analysis' && (
        <div className="p-4 rounded-2xl bg-[#F8FBFE] border border-cyan-100 text-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-[#132229]">Laboratoriya tahlillarini olish (QR Tekshiruv)</h4>
              <p className="text-[11px] text-[#5F737B]">Tahlil blankasidagi 8 xonali kodni kiriting</p>
            </div>
            <QrCode size={20} className="text-[#008BFF]" />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              defaultValue="LAB-99214-UZ"
              className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold"
            />
            <button
              onClick={() => alert("Laboratoriya tahlili: Barcha ko'rsatkichlar me'yorida. PDF yuklab olindi.")}
              className="px-4 py-2 bg-[#008BFF] text-white rounded-xl font-bold cursor-pointer hover:bg-[#0D34B4] shadow-xs"
            >
              Natijani ochish
            </button>
          </div>
        </div>
      )}

      {/* POPUP MODAL: GENERATED LIVE TICKET */}
      {ticketGenerated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border-2 border-[#008BFF] space-y-4 relative">
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
