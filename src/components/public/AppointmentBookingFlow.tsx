import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Stethoscope,
  Building,
  FileText,
  X,
  Sparkles,
} from 'lucide-react';
import { MOCK_SERVICES, MOCK_PUBLIC_DOCTORS, MedicalServiceItem, PublicDoctor } from '../../data/mockPublicData';
import { useApp } from '../../context/AppContext';
import { appointmentService } from '../../services/appointmentService';
import { patientService } from '../../services/patientService';

interface AppointmentBookingFlowProps {
  initialService?: MedicalServiceItem | null;
  initialDoctor?: PublicDoctor | null;
  initialSlot?: string | null;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const AppointmentBookingFlow: React.FC<AppointmentBookingFlowProps> = ({
  initialService = null,
  initialDoctor = null,
  initialSlot = null,
  isOpenModal = false,
  onCloseModal,
}) => {
  const { refreshData, showToast } = useApp();
  const navigate = useNavigate();

  // 6-step state: 1: Service, 2: Doctor, 3: DateTime, 4: Contact, 5: Review, 6: Confirmation
  const [step, setStep] = useState<number>(1);

  // Form states
  const [selectedService, setSelectedService] = useState<MedicalServiceItem | null>(initialService || MOCK_SERVICES[0]);
  const [selectedDoctor, setSelectedDoctor] = useState<PublicDoctor | null>(initialDoctor || MOCK_PUBLIC_DOCTORS[0]);
  
  // Dates: Next 5 days
  const today = new Date();
  const availableDates = Array.from({ length: 6 }).map((_, idx) => {
    const d = new Date();
    d.setDate(today.getDate() + idx);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    const dayNames = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
    return {
      dateString: formatted,
      dayLabel: idx === 0 ? 'Bugun' : idx === 1 ? 'Ertaga' : dayNames[d.getDay()],
      dateFormatted: `${dd}.${mm}`,
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].dateString);
  const [selectedSlot, setSelectedSlot] = useState<string>(initialSlot || '10:00');

  // Contact details
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('+998 ');
  const [birthDate, setBirthDate] = useState<string>('1994-05-15');
  const [notes, setNotes] = useState<string>('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Created booking result for step 6
  const [confirmedTicket, setConfirmedTicket] = useState<{
    id: string;
    ticketNumber: string;
    patientName: string;
    doctorName: string;
    serviceName: string;
    date: string;
    time: string;
    fee: number;
    room: string;
  } | null>(null);

  // Sync props changes if opened via external buttons
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (initialDoctor) {
      setSelectedDoctor(initialDoctor);
    }
  }, [initialDoctor]);

  useEffect(() => {
    if (initialSlot) {
      setSelectedSlot(initialSlot);
    }
  }, [initialSlot]);

  // Validation for Step 4
  const validateStep4 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Iltimos, to‘liq ism va familiyangizni kiriting.';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 12) {
      newErrors.phone = 'To‘liq telefon raqamini kiriting (+998 90 123 45 67).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedService) return;
      setStep(2);
    } else if (step === 2) {
      if (!selectedDoctor) return;
      setStep(3);
    } else if (step === 3) {
      if (!selectedDate || !selectedSlot) return;
      setStep(4);
    } else if (step === 4) {
      if (!validateStep4()) return;
      setStep(5);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1 && step < 6) {
      setStep(step - 1);
    }
  };

  // Submit booking
  const handleFinalSubmit = () => {
    if (!selectedDoctor || !selectedService) return;

    const ticketNum = `ELV-${Math.floor(1000 + Math.random() * 9000)}`;

    // Create or find patient in local storage
    const patient = patientService.create({
      fullName: fullName.trim(),
      phone: phone.trim(),
      birthDate: birthDate || '1995-01-01',
      gender: 'erkak',
      notes: notes.trim() ? `Onlayn qabul: ${notes.trim()}` : 'Onlayn platformadan yozilgan',
    });

    // Create demo appointment in local storage
    appointmentService.create({
      patientId: patient.id,
      patientName: patient.fullName,
      patientPhone: patient.phone,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.fullName,
      doctorSpecialty: selectedDoctor.specialty as any,
      date: selectedDate,
      startTime: selectedSlot,
      endTime: '11:00',
      serviceName: selectedService.titleUz,
      fee: selectedDoctor.feeUZS,
      status: 'kutilmoqda',
      notes: `Demo E-Talon: ${ticketNum}. Shikoyat: ${notes || 'Klinik tekshiruv'}`,
    });

    // Refresh shared context
    refreshData();
    showToast(`Demo qabul tasdiqlandi! Talon: ${ticketNum}`, 'success');

    setConfirmedTicket({
      id: patient.id,
      ticketNumber: ticketNum,
      patientName: fullName.trim(),
      doctorName: selectedDoctor.fullName,
      serviceName: selectedService.titleUz,
      date: selectedDate,
      time: selectedSlot,
      fee: selectedDoctor.feeUZS,
      room: selectedDoctor.roomNumber,
    });

    setStep(6);
  };

  const resetBooking = () => {
    setStep(1);
    setConfirmedTicket(null);
    setFullName('');
    setPhone('+998 ');
    setNotes('');
    setErrors({});
  };

  const content = (
    <div className="bg-white rounded-3xl border border-[#E2E8E3] shadow-xl overflow-hidden max-w-4xl mx-auto">
      {/* Flow Header with Progress Stepper */}
      <div className="bg-[#F7F8F5] border-b border-[#E2E8E3] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#176B55] animate-pulse" />
            <span className="text-xs font-bold text-[#176B55] uppercase tracking-wider">
              Onlayn Qabulga Yozilish (Frontend Demo)
            </span>
          </div>

          {isOpenModal && onCloseModal && (
            <button
              onClick={onCloseModal}
              className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-[#172923] border border-[#E2E8E3] cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* 5-step interactive progress pills */}
        <div className="grid grid-cols-5 gap-2">
          {[
            { num: 1, label: 'Xizmat' },
            { num: 2, label: 'Shifokor' },
            { num: 3, label: 'Vaqt' },
            { num: 4, label: 'Ma’lumot' },
            { num: 5, label: 'Tasdiqlash' },
          ].map((s) => {
            const isDone = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div
                key={s.num}
                className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-[#176B55] text-white border-[#176B55] shadow-xs'
                    : isDone
                    ? 'bg-[#CDEBDD] text-[#0F4C3C] border-[#BCE3D0]'
                    : 'bg-white text-[#68756F] border-[#E2E8E3]'
                }`}
              >
                <span className="block truncate">{s.num}. {s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Body */}
      <div className="p-6 sm:p-8">
        {/* STEP 1: Select Service */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-[#172923]">1-Qadam: Tibbiy xizmat yo‘nalishini tanlang</h3>
              <p className="text-xs text-[#68756F]">Ko‘rikdan o‘tmoqchi bo‘lgan yo‘nalishni belgilang.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_SERVICES.map((srv) => {
                const isSelected = selectedService?.id === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#176B55] bg-[#EBF6F0]'
                        : 'border-[#E2E8E3] hover:border-[#CDEBDD] bg-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#68756F] uppercase">
                        {srv.category}
                      </span>
                      <h4 className="text-sm font-bold text-[#172923]">{srv.titleUz}</h4>
                      <div className="text-xs font-semibold text-[#176B55]">
                        {srv.basePriceUZS.toLocaleString()} so‘m
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 size={20} className="text-[#176B55] shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Select Doctor */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-[#172923]">2-Qadam: Shifokorni tanlang</h3>
              <p className="text-xs text-[#68756F]">
                Tanlangan yo‘nalish ({selectedService?.titleUz}) bo‘yicha tajribali mutaxassislar:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_PUBLIC_DOCTORS.map((doc) => {
                const isSelected = selectedDoctor?.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctor(doc)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-3.5 items-center ${
                      isSelected
                        ? 'border-[#176B55] bg-[#EBF6F0]'
                        : 'border-[#E2E8E3] hover:border-[#CDEBDD] bg-white'
                    }`}
                  >
                    <img
                      src={doc.photoUrl}
                      alt={doc.fullName}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] bg-[#CDEBDD] text-[#0F4C3C] px-1.5 py-0.2 rounded font-bold">
                          {doc.specialty}
                        </span>
                        <span className="text-[10px] text-[#68756F]">
                          {doc.experienceYears} yil (Demo)
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#172923] truncate">{doc.fullName}</h4>
                      <p className="text-xs font-semibold text-[#176B55]">
                        Qabul: {doc.feeUZS.toLocaleString()} so‘m
                      </p>
                    </div>
                    {isSelected && <CheckCircle2 size={20} className="text-[#176B55] shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Select Date & Time */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-[#172923]">3-Qadam: Qabul sanasi va vaqtini belgilang</h3>
              <p className="text-xs text-[#68756F]">
                {selectedDoctor?.fullName} uchun qulay bo‘sh vaqtni tanlang.
              </p>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs font-bold text-[#172923] mb-2 uppercase tracking-wider">
                Mavjud kunlar:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.dateString;
                  return (
                    <button
                      key={item.dateString}
                      type="button"
                      onClick={() => setSelectedDate(item.dateString)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#176B55] bg-[#176B55] text-white shadow-xs'
                          : 'border-[#E2E8E3] bg-[#F7F8F5] text-[#172923] hover:bg-[#EBF6F0]'
                      }`}
                    >
                      <div className="text-xs font-semibold opacity-90">{item.dayLabel}</div>
                      <div className="text-sm font-black mt-0.5">{item.dateFormatted}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-xs font-bold text-[#172923] mb-2 uppercase tracking-wider">
                Bo‘sh qabul vaqtlari (Demo slotlar):
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'].map((timeSlot) => {
                  const isSelected = selectedSlot === timeSlot;
                  return (
                    <button
                      key={timeSlot}
                      type="button"
                      onClick={() => setSelectedSlot(timeSlot)}
                      className={`py-2.5 px-3 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#176B55] bg-[#CDEBDD] text-[#0F4C3C] ring-2 ring-[#176B55]'
                          : 'border-[#E2E8E3] bg-white text-[#172923] hover:bg-[#F7F8F5]'
                      }`}
                    >
                      {timeSlot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Enter Contact Info */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-[#172923]">4-Qadam: Bemor aloqa ma’lumotlari</h3>
              <p className="text-xs text-[#68756F]">
                Qabul talonini shakllantirish uchun namuna ma’lumotlarni kiriting.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#172923] mb-1">
                  To‘liq ism va familiya (F.I.Sh.) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-[#68756F]" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Masalan: Sardor Aliyev"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                      errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-[#E2E8E3] focus:border-[#176B55]'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#172923] mb-1">
                    Telefon raqam <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-3.5 text-[#68756F]" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500 bg-red-50/30' : 'border-[#E2E8E3] focus:border-[#176B55]'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172923] mb-1">
                    Tug‘ilgan sana
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8E3] text-sm focus:border-[#176B55] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172923] mb-1">
                  Shikoyat yoki qisqacha izoh (Ixtiyoriy)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Masalan: Qon bosimi ko‘tarilishi va bosh aylanishi..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8E3] text-sm focus:border-[#176B55] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Review Booking */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-[#172923]">5-Qadam: Qabul ma’lumotlarini tekshiring</h3>
              <p className="text-xs text-[#68756F]">
                Barcha ko‘rsatkichlar to‘g‘riligini tasdiqlang.
              </p>
            </div>

            {/* Booking Summary Card */}
            <div className="p-6 rounded-2xl bg-[#F7F8F5] border border-[#E2E8E3] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#E2E8E3]">
                <div>
                  <span className="text-xs text-[#68756F]">Bemor F.I.Sh.:</span>
                  <div className="text-sm font-bold text-[#172923]">{fullName}</div>
                  <div className="text-xs text-[#68756F]">{phone}</div>
                </div>

                <div>
                  <span className="text-xs text-[#68756F]">Shifokor va Xona:</span>
                  <div className="text-sm font-bold text-[#172923]">{selectedDoctor?.fullName}</div>
                  <div className="text-xs text-[#176B55] font-semibold">
                    {selectedDoctor?.specialty} • {selectedDoctor?.roomNumber}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#E2E8E3]">
                <div>
                  <span className="text-xs text-[#68756F]">Tanlangan Sana va Vaqt:</span>
                  <div className="text-sm font-bold text-[#172923]">
                    {selectedDate} soat {selectedSlot} da
                  </div>
                  <div className="text-xs text-[#68756F]">Taxminiy davomiyligi: ~30 daqiqa</div>
                </div>

                <div>
                  <span className="text-xs text-[#68756F]">Xizmat yo‘nalishi:</span>
                  <div className="text-sm font-bold text-[#172923]">{selectedService?.titleUz}</div>
                  <div className="text-xs text-[#68756F]">{selectedDoctor?.clinicName}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs text-[#68756F]">Qabul narxi (Klinikada to‘lanadi):</span>
                  <div className="text-lg font-black text-[#176B55]">
                    {selectedDoctor?.feeUZS.toLocaleString()} so‘m
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] bg-[#CDEBDD] text-[#0F4C3C] px-2 py-1 rounded font-bold uppercase">
                    Oldindan to‘lov talab etilmaydi
                  </span>
                </div>
              </div>
            </div>

            {/* Mandatory Demo Disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex gap-3 items-start">
              <AlertCircle size={18} className="shrink-0 text-amber-600 mt-0.5" />
              <div>
                <strong>DIQQAT (DEMO TA’KID):</strong> Ushbu bron qilish jarayoni faqat ko‘rgazmali frontend namoyishi hisoblanadi. Hech qanday tashqi klinikaga xabar jo‘natilmaydi. Ma’lumotlar mahalliy brauzer xotirasiga (Local State) saqlanib, boshqaruv panelining jonli navbatida ko‘rinadi.
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Confirmation Ticket */}
        {step === 6 && confirmedTicket && (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-[#CDEBDD] text-[#176B55] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span className="text-xs font-bold text-[#176B55] uppercase tracking-wider">
                Qabul muvaffaqiyatli band qilindi
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#172923] mt-1">
                E-Navbat Taloni Raqami: <span className="text-[#176B55]">{confirmedTicket.ticketNumber}</span>
              </h3>
            </div>

            {/* Digital Ticket Representation */}
            <div className="max-w-md mx-auto p-6 rounded-3xl bg-[#F7F8F5] border-2 border-dashed border-[#176B55]/40 text-left space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-[#E2E8E3]">
                <span className="text-xs font-bold text-[#172923]">ELVORA HEALTH TALONI</span>
                <span className="text-[10px] bg-[#CDEBDD] text-[#0F4C3C] px-2 py-0.5 rounded font-bold">
                  DEMO TICKET
                </span>
              </div>

              <div className="text-xs space-y-1">
                <div className="text-[#68756F]">Bemor: <strong className="text-[#172923]">{confirmedTicket.patientName}</strong></div>
                <div className="text-[#68756F]">Shifokor: <strong className="text-[#172923]">{confirmedTicket.doctorName}</strong></div>
                <div className="text-[#68756F]">Xona: <strong className="text-[#176B55]">{confirmedTicket.room}</strong></div>
                <div className="text-[#68756F]">Vaqt: <strong className="text-[#172923]">{confirmedTicket.date} — {confirmedTicket.time}</strong></div>
                <div className="text-[#68756F]">Xizmat: <strong>{confirmedTicket.serviceName}</strong></div>
              </div>
            </div>

            <p className="text-xs text-[#68756F] max-w-md mx-auto">
              Ushbu demo talon boshqaruv panelining <strong>"Qabullar va navbat"</strong> bo‘limida darhol aks ettirildi.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  if (onCloseModal) onCloseModal();
                  navigate('/app/appointments');
                }}
                className="px-6 py-3 rounded-xl bg-[#176B55] hover:bg-[#0F4C3C] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Dashboardda Navbatni ko‘rish
              </button>

              <button
                onClick={resetBooking}
                className="px-6 py-3 rounded-xl bg-white border border-[#E2E8E3] hover:bg-[#F7F8F5] text-[#172923] font-semibold text-sm transition-all cursor-pointer"
              >
                Yana qabulga yozilish
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stepper Footer Controls (for steps 1-5) */}
      {step < 6 && (
        <div className="p-6 bg-[#F7F8F5] border-t border-[#E2E8E3] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handlePreviousStep}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#E2E8E3] bg-white hover:bg-slate-50 text-[#172923] text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} />
              <span>Orqaga</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#176B55] hover:bg-[#0F4C3C] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <span>Keyingi qadam</span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={handleFinalSubmit}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#176B55] hover:bg-[#0F4C3C] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <CheckCircle2 size={16} />
              <span>Qabulni tasdiqlash (Demo)</span>
            </button>
          )}
        </div>
      )}
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
        <div className="my-8 w-full max-w-4xl">{content}</div>
      </div>
    );
  }

  return (
    <section id="booking" className="py-24 bg-[#F7F8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF6F0] text-xs font-semibold text-[#176B55]">
            <Sparkles size={14} />
            <span>Tezkor Onlayn E-Navbat</span>
          </div>
          <h2 className="section-headline text-[#172923]">
            Bir necha bosqichda qabulga yoziling.
          </h2>
          <p className="text-base text-[#68756F]">
            Navbatsiz, qulay vaqtda, shifokor bilan uchrashuv belgilang.
          </p>
        </div>

        {content}
      </div>
    </section>
  );
};
