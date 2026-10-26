import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  Stethoscope,
  QrCode,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { appointmentService } from '../../services/appointmentService';
import { patientService } from '../../services/patientService';
import { telegramService } from '../../services/telegramService';
import { getTodayDateString } from '../../services/seedData';
import { DoctorSpecialty } from '../../types';

export const RealBookingSection: React.FC = () => {
  const { doctors, refreshData, showToast } = useApp();

  const todayStr = getTodayDateString();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('+998 ');

  // Telegram Linking State
  const [isTelegramLinked, setIsTelegramLinked] = useState<boolean>(false);
  const [telegramUsername, setTelegramUsername] = useState<string>('');
  const [isLinkingLoading, setIsLinkingLoading] = useState<boolean>(false);
  const [linkingDeepLink, setLinkingDeepLink] = useState<string>('');
  const [telegramConsent, setTelegramConsent] = useState<boolean>(true);

  // Created ticket state
  const [confirmedTicket, setConfirmedTicket] = useState<{
    appointmentId: string;
    doctorName: string;
    specialty: string;
    roomNumber: string;
    date: string;
    time: string;
    patientName: string;
    fee: number;
    telegramDelivered?: boolean;
    telegramDeepLink?: string;
  } | null>(null);

  // Available specialties from doctors list
  const availableSpecialties = useMemo(() => {
    const set = new Set(doctors.map((d) => d.specialty));
    return Array.from(set);
  }, [doctors]);

  // Filtered doctors based on specialty
  const filteredDoctors = useMemo(() => {
    if (selectedSpecialty === 'all') return doctors;
    return doctors.filter((d) => d.specialty === selectedSpecialty);
  }, [doctors, selectedSpecialty]);

  // Chosen doctor object
  const activeDoctor = useMemo(() => {
    return doctors.find((d) => d.id === selectedDoctorId) || filteredDoctors[0] || doctors[0];
  }, [doctors, selectedDoctorId, filteredDoctors]);

  // Available slots for doctor
  const availableSlots = [
    '09:00',
    '09:45',
    '10:30',
    '11:15',
    '12:00',
    '14:00',
    '14:45',
    '15:30',
    '16:15',
  ];

  // Check if patient phone is already linked on phone change
  React.useEffect(() => {
    if (phone.replace(/\D/g, '').length >= 9) {
      telegramService.isPhoneLinked(phone).then((linked) => {
        setIsTelegramLinked(linked);
      });
    }
  }, [phone]);

  // Connect Telegram Account Flow
  const handleConnectTelegram = async () => {
    if (!phone || phone.replace(/\D/g, '').length < 9) {
      showToast('Iltimos, avval telefon raqamingizni to\'liq kiriting', 'error');
      return;
    }

    setIsLinkingLoading(true);
    try {
      const res = await telegramService.generateLinkingToken({
        phone: phone.trim(),
        name: fullName.trim() || 'Bemor',
      });

      if (res.success && res.deepLink) {
        setLinkingDeepLink(res.deepLink);
        // Open Telegram bot with deep link
        window.open(res.deepLink, '_blank');
        showToast('Telegram boti ochilmoqda. Botda "Start" tugmasini bosing!', 'info');

        // Poll for linking confirmation
        if (res.token) {
          const checkInterval = setInterval(async () => {
            const status = await telegramService.checkLinkingStatus(res.token!);
            if (status.linked) {
              clearInterval(checkInterval);
              setIsTelegramLinked(true);
              setTelegramUsername(status.linkedUsername ? `@${status.linkedUsername}` : 'Ulangan');
              telegramService.markPhoneLinkedLocally(phone);
              showToast('Telegram hisobingiz muvaffaqiyatli bog\'landi!', 'success');
              setIsLinkingLoading(false);
            }
          }, 2500);

          // Timeout polling after 60s
          setTimeout(() => {
            clearInterval(checkInterval);
            setIsLinkingLoading(false);
          }, 60000);
        }
      }
    } catch {
      showToast('Telegram bilan bog\'lanishda xatolik yuz berdi', 'error');
      setIsLinkingLoading(false);
    }
  };

  // Submit real booking
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || phone.trim().length < 9) {
      showToast('Iltimos, ism va telefon raqamingizni to\'liq kiriting', 'error');
      return;
    }

    if (!activeDoctor) {
      showToast('Shifokor tanlanmadi', 'error');
      return;
    }

    // Find or create patient
    let patient = patientService.getAll().find((p) => p.phone === phone.trim());
    if (!patient) {
      patient = patientService.create({
        fullName: fullName.trim(),
        phone: phone.trim(),
        birthDate: '1995-01-01',
        gender: 'erkak',
        address: 'Toshkent shahar',
      });
    }

    // Calculate end time
    const [startH, startM] = selectedSlot.split(':').map(Number);
    const duration = activeDoctor.appointmentDurationMinutes || 30;
    const totalStartMins = startH * 60 + startM;
    const totalEndMins = totalStartMins + duration;
    const endH = String(Math.floor(totalEndMins / 60)).padStart(2, '0');
    const endM = String(totalEndMins % 60).padStart(2, '0');
    const endTimeStr = `${endH}:${endM}`;

    // Create real appointment in the database
    const result = appointmentService.create({
      patientId: patient.id,
      patientName: patient.fullName,
      patientPhone: patient.phone,
      doctorId: activeDoctor.id,
      doctorName: activeDoctor.fullName,
      doctorSpecialty: activeDoctor.specialty,
      date: selectedDate,
      startTime: selectedSlot,
      endTime: endTimeStr,
      serviceName: `${activeDoctor.specialty} birlamchi ko'rigi`,
      status: 'kutilmoqda',
      fee: activeDoctor.consultationFee,
      notes: 'Veb-sayt orqali onlayn yozilgan',
    });

    if (result.success && result.appointment) {
      let telegramDelivered = false;
      let telegramDeepLink: string | undefined;

      if (telegramConsent) {
        const tgRes = await telegramService.sendAppointmentConfirmation(
          result.appointment,
          activeDoctor.roomNumber
        );
        telegramDelivered = tgRes.delivered;
        telegramDeepLink = tgRes.telegramDeepLink;
      }

      setConfirmedTicket({
        appointmentId: result.appointment.id,
        doctorName: activeDoctor.fullName,
        specialty: activeDoctor.specialty,
        roomNumber: activeDoctor.roomNumber,
        date: selectedDate,
        time: selectedSlot,
        patientName: fullName.trim(),
        fee: activeDoctor.consultationFee,
        telegramDelivered,
        telegramDeepLink,
      });

      showToast('Qabul tizimda qayd etildi! Shifokor jadvaliga kiritildi.', 'success');
      refreshData();
    } else {
      showToast(result.error || 'Qabulni band qilishda xatolik yuz berdi', 'error');
    }
  };

  return (
    <section id="onlayn-yozilish" className="py-24 lg:py-32 bg-[#F8FAFC] border-t border-[#E2E8F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0284C7]">
            <Calendar size={13} />
            <span>Haqiqiy Jonli Qabulga Yozilish</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
            Shifokor Qabuliga{' '}
            <span className="bg-gradient-to-r from-[#0284C7] to-[#0D9488] bg-clip-text text-transparent">
              1 Daqiqada Yoziling
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Quyidagi shakl shunchaki namuna emas — u to'g'ridan-to'g'ri klinika jadvaliga yozadi va bemorga raqamli chipta generatsiya qiladi.
          </p>
        </div>

        {confirmedTicket ? (
          /* Confirmed Digital Clinic Pass */
          <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">Qabul Tasdiqlandi</h3>
                  <p className="text-[11px] text-emerald-700 font-medium">Chipta ID: {confirmedTicket.appointmentId}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0284C7] border border-blue-200 text-[10px] font-bold">
                Tizimda Ro'yxatdan O'tdi
              </span>
            </div>

            {/* Ticket details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-[#64748B] text-[11px] block">Shifokor:</span>
                <span className="font-bold text-[#0F172A] text-sm mt-0.5 block">{confirmedTicket.doctorName}</span>
                <span className="text-[#0D9488] text-[11px] font-semibold">{confirmedTicket.specialty}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-[#64748B] text-[11px] block">Xona &amp; To'lov:</span>
                <span className="font-bold text-[#0F172A] text-sm mt-0.5 block">{confirmedTicket.roomNumber}</span>
                <span className="text-[#0F172A] text-[11px] font-medium">
                  {confirmedTicket.fee.toLocaleString('uz-UZ')} UZS
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-[#64748B] text-[11px] block">Sana va Vaqt:</span>
                <span className="font-bold text-[#0F172A] text-sm mt-0.5 block">{confirmedTicket.date}</span>
                <span className="text-[#0284C7] text-[11px] font-bold">Soat: {confirmedTicket.time}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-[#64748B] text-[11px] block">Bemor &amp; Telegram:</span>
                <span className="font-bold text-[#0F172A] text-sm mt-0.5 block truncate">{confirmedTicket.patientName}</span>
                <span className="text-[#0088CC] text-[11px] font-semibold flex items-center gap-1">
                  <span>✈️ Telegram tasdiqlandi</span>
                </span>
              </div>
            </div>

            {/* Telegram Notification Banner with Real Delivery Status */}
            <div className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs ${
              confirmedTicket.telegramDelivered
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-[#0088CC]/10 border-[#0088CC]/30 text-slate-800'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                <svg className="w-4 h-4 fill-[#0088CC] shrink-0" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                {confirmedTicket.telegramDelivered ? (
                  <span className="text-emerald-700">✓ Telegram orqali rasmiy qabul xabari yetkazildi!</span>
                ) : (
                  <span>Telegram tasdiqnoma xabari:</span>
                )}
                {!confirmedTicket.telegramDelivered && (
                  <span className="font-normal text-slate-600 truncate max-w-xs">«{confirmedTicket.doctorName} qabuliga yozildingiz»</span>
                )}
              </div>
              <a
                href={confirmedTicket.telegramDeepLink || `https://t.me/share/url?url=${encodeURIComponent(`Hurmatli ${confirmedTicket.patientName}! Siz ${confirmedTicket.date} kuni soat ${confirmedTicket.time} da Elvora klinikasiga (${confirmedTicket.doctorName}) qabulga yozildingiz.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#0088CC] hover:underline shrink-0 flex items-center gap-1"
              >
                <span>Telegramda ko'rish</span>
                <span>→</span>
              </a>
            </div>

            {/* QR Code and Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
                  <QrCode size={36} className="text-slate-800" />
                </div>
                <div className="text-[11px] text-slate-500 leading-tight">
                  Klinika qabulxonasida QR-kodni skaner qilib navbatsiz kiring.
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setConfirmedTicket(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex-1 sm:flex-initial"
                >
                  Yana yozilish
                </button>
                <Link
                  to="/app/appointments"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0F172A] text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                >
                  <span>Boshqaruvda Ko'rish</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form */
          <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-[#E2E8F0] shadow-xl overflow-hidden">
            <div className="p-6 sm:p-10">
              <form onSubmit={handleConfirmBooking} className="space-y-8">
                {/* 1. Specialty Filter */}
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2.5">
                    1. Yo'nalishni Tanlang:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSpecialty('all')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedSpecialty === 'all'
                          ? 'bg-[#0F172A] text-white shadow-xs'
                          : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                      }`}
                    >
                      Barchasi
                    </button>
                    {availableSpecialties.map((spec) => (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => setSelectedSpecialty(spec)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          selectedSpecialty === spec
                            ? 'bg-[#0284C7] text-white shadow-xs'
                            : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Doctor Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2.5">
                    2. Shifokorni Tanlang:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {filteredDoctors.map((doc) => {
                      const isSelected = activeDoctor?.id === doc.id;
                      return (
                        <div
                          key={doc.id}
                          onClick={() => setSelectedDoctorId(doc.id)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#0284C7] bg-blue-50/50 shadow-sm ring-1 ring-[#0284C7]'
                              : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-100 to-indigo-100 text-[#0284C7] flex items-center justify-center font-bold text-xs shrink-0">
                              {doc.fullName.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-bold text-[#0F172A] truncate">{doc.fullName}</h4>
                              <p className="text-[11px] text-[#0D9488] font-medium">{doc.specialty}</p>
                            </div>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#64748B]">
                            <span>{doc.roomNumber}</span>
                            <span className="font-bold text-[#0F172A]">{doc.consultationFee.toLocaleString('uz-UZ')} UZS</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Date & Time Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      3. Qabul Sanasi:
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={todayStr}
                      className="w-full px-4 py-2.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      4. Bo'sh Vaqt Darchasi:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            selectedSlot === slot
                              ? 'bg-[#0284C7] text-white shadow-xs'
                              : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Patient Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Bemor To'liq Ismi:
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Masalan: Jasur Bekmurodov"
                      className="w-full px-4 py-2.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Telefon Raqami (SMS tasdiqlash uchun):
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full px-4 py-2.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                    />
                  </div>
                </div>

                {/* 5. Telegram Integration & Consent */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 via-teal-50/30 to-white border border-sky-200/80 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#0088CC] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A] flex items-center gap-2">
                          <span>5. Telegram orqali avtomatik tasdiqlash va eslatmalar</span>
                          {isTelegramLinked ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold border border-teal-200">
                              ✓ Bog'langan {telegramUsername}
                            </span>
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-[#0284C7] font-semibold">
                              Tavsiya etiladi
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-[#475569]">
                          Qabul chiptasi, 1 kun va 2 soat oldingi eslatmalar to'g'ridan-to'g'ri Telegramingizga yuboriladi.
                        </p>
                      </div>
                    </div>

                    {!isTelegramLinked ? (
                      <button
                        type="button"
                        onClick={handleConnectTelegram}
                        disabled={isLinkingLoading}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0088CC] hover:bg-[#0077B5] text-white shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-60"
                      >
                        {isLinkingLoading ? (
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <ExternalLink size={13} />
                        )}
                        <span>{isLinkingLoading ? 'Tekshirilmoqda...' : 'Telegramga ulanish'}</span>
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-[#0D9488] flex items-center gap-1">
                        <CheckCircle2 size={16} />
                        <span>Faol bog'langan</span>
                      </span>
                    )}
                  </div>

                  <label className="flex items-start gap-2 pt-1 text-xs text-[#475569] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={telegramConsent}
                      onChange={(e) => setTelegramConsent(e.target.checked)}
                      className="mt-0.5 rounded text-[#0284C7] focus:ring-[#0284C7]"
                    />
                    <span>Qabul tasdiqlovchi rasmiy chipta va xabarnomalarni Telegram orqali olishga roziman.</span>
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#64748B] flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-[#0D9488]" />
                    <span>Tibbiy ma'lumotlar maxfiyligi 100% kafolatlanadi.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold shadow-lg shadow-[#0F172A]/15 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Qabulni Rasmiylashtirish</span>
                    <ArrowRight size={15} className="text-teal-300" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RealBookingSection;
