import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle2, AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';
import { Doctor, Appointment } from '../../types';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import { reminderService } from '../../services/reminderService';
import { telegramService } from '../../services/telegramService';
import { useApp } from '../../context/AppContext';

interface AiBookingCardProps {
  initialDoctorId?: string;
  defaultSpecialty?: string;
  onAppointmentBooked?: (appointment: Appointment) => void;
}

export const AiBookingCard: React.FC<AiBookingCardProps> = ({
  initialDoctorId,
  defaultSpecialty,
  onAppointmentBooked,
}) => {
  const { doctors, appointments, refreshData, showToast } = useApp();

  // Find candidate doctors
  const availableDoctors = useMemo(() => {
    return doctors.filter((d) => {
      if (!d.isActive) return false;
      if (defaultSpecialty && d.specialty !== defaultSpecialty) return false;
      return true;
    });
  }, [doctors, defaultSpecialty]);

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    initialDoctorId || (availableDoctors[0] ? availableDoctors[0].id : doctors[0]?.id || '')
  );

  const selectedDoctor: Doctor | undefined = useMemo(() => {
    return doctors.find((d) => d.id === selectedDoctorId) || availableDoctors[0] || doctors[0];
  }, [doctors, selectedDoctorId, availableDoctors]);

  // Dates: Next 7 days
  const availableDates = useMemo(() => {
    const dates: { dateStr: string; label: string }[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      const dayOfWeek = d.getDay() === 0 ? 7 : d.getDay();

      if (selectedDoctor && selectedDoctor.workingDays.includes(dayOfWeek)) {
        const label =
          i === 0
            ? 'Bugun'
            : i === 1
            ? 'Ertaga'
            : d.toLocaleDateString('uz-UZ', { weekday: 'short', month: 'numeric', day: 'numeric' });
        dates.push({ dateStr: iso, label });
      }
    }
    return dates;
  }, [selectedDoctor]);

  const [selectedDate, setSelectedDate] = useState<string>(
    availableDates[0]?.dateStr || new Date().toISOString().slice(0, 10)
  );

  // Available real time slots for this doctor on this date
  const availableSlots = useMemo(() => {
    if (!selectedDoctor || !selectedDate) return [];
    return doctorService.getAvailableSlots(selectedDoctor, selectedDate, appointments);
  }, [selectedDoctor, selectedDate, appointments]);

  const [selectedSlot, setSelectedSlot] = useState<string>(availableSlots[0] || '');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('+998 ');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Telegram Linking State
  const [isTelegramLinked, setIsTelegramLinked] = useState<boolean>(false);
  const [telegramUsername, setTelegramUsername] = useState<string>('');
  const [isLinkingLoading, setIsLinkingLoading] = useState<boolean>(false);
  const [telegramConsent, setTelegramConsent] = useState<boolean>(true);
  const [telegramDelivered, setTelegramDelivered] = useState<boolean>(false);
  const [telegramDeepLink, setTelegramDeepLink] = useState<string>('');

  useEffect(() => {
    if (patientPhone.replace(/\D/g, '').length >= 9) {
      telegramService.isPhoneLinked(patientPhone).then((linked) => {
        setIsTelegramLinked(linked);
      });
    }
  }, [patientPhone]);

  const handleConnectTelegram = async () => {
    if (!patientPhone || patientPhone.replace(/\D/g, '').length < 9) {
      setErrorMessage('Avval telefon raqamingizni kiriting');
      return;
    }

    setIsLinkingLoading(true);
    try {
      const res = await telegramService.generateLinkingToken({
        phone: patientPhone.trim(),
        name: patientName.trim() || 'Bemor',
      });

      if (res.success && res.deepLink) {
        window.open(res.deepLink, '_blank');
        showToast('Telegram boti ochilmoqda. Botda "Start" tugmasini bosing!', 'info');

        if (res.token) {
          const checkInterval = setInterval(async () => {
            const status = await telegramService.checkLinkingStatus(res.token!);
            if (status.linked) {
              clearInterval(checkInterval);
              setIsTelegramLinked(true);
              setTelegramUsername(status.linkedUsername ? `@${status.linkedUsername}` : 'Ulangan');
              telegramService.markPhoneLinkedLocally(patientPhone);
              showToast('Telegram hisobingiz muvaffaqiyatli bog\'landi!', 'success');
              setIsLinkingLoading(false);
            }
          }, 2500);

          setTimeout(() => {
            clearInterval(checkInterval);
            setIsLinkingLoading(false);
          }, 60000);
        }
      }
    } catch {
      setIsLinkingLoading(false);
    }
  };

  const handleBook = async () => {
    if (!selectedDoctor) return;
    if (!selectedSlot) {
      setErrorMessage('Iltimos, o\'zingizga ma\'qul qabul vaqtini tanlang.');
      return;
    }
    if (!patientName.trim()) {
      setErrorMessage('Iltimos, to\'liq ism-sharifingizni kiriting.');
      return;
    }
    if (patientPhone.trim().length < 9) {
      setErrorMessage('Iltimos, to\'g\'ri telefon raqamingizni kiriting.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    const slotMins = doctorService.timeToMinutes(selectedSlot);
    const duration = selectedDoctor.appointmentDurationMinutes || 30;
    const endSlot = doctorService.minutesToTime(slotMins + duration);

    const result = appointmentService.create({
      patientId: `pat-${Date.now()}`,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.fullName,
      doctorSpecialty: selectedDoctor.specialty,
      date: selectedDate,
      startTime: selectedSlot,
      endTime: endSlot,
      serviceName: `${selectedDoctor.specialty} birlamchi ko'rigi`,
      fee: selectedDoctor.consultationFee,
      status: 'kutilmoqda',
      notes: 'Elvora AI™ orqali qabulga yozildi',
    });

    if (result.success && result.appointment) {
      // Send Telegram confirmation if consented
      if (telegramConsent) {
        const tgRes = await telegramService.sendAppointmentConfirmation(
          result.appointment,
          selectedDoctor.roomNumber
        );
        setTelegramDelivered(tgRes.delivered);
        setTelegramDeepLink(tgRes.telegramDeepLink || '');
      }

      // Schedule automated reminders
      reminderService.scheduleReminderForAppointment(result.appointment, 'telegram');
      refreshData();
      setBookedAppointment(result.appointment);
      showToast('Qabul muvaffaqiyatli band qilindi!', 'success');
      if (onAppointmentBooked) {
        onAppointmentBooked(result.appointment);
      }
    } else {
      setErrorMessage(result.error || 'Qabulni band qilishda xatolik yuz berdi.');
    }
    setIsSubmitting(false);
  };

  if (bookedAppointment) {
    return (
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border border-emerald-200 text-[#0F172A] space-y-3">
        <div className="flex items-center gap-2.5 text-emerald-700">
          <CheckCircle2 size={20} className="shrink-0" />
          <h4 className="font-bold text-sm">Qabul muvaffaqiyatli tasdiqlandi!</h4>
        </div>

        <div className="bg-white/90 p-3.5 rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs">
          <p>
            <strong>Shifokor:</strong> {bookedAppointment.doctorName} ({bookedAppointment.doctorSpecialty})
          </p>
          <p>
            <strong>Sana va vaqt:</strong> {bookedAppointment.date}, soat {bookedAppointment.startTime} - {bookedAppointment.endTime}
          </p>
          <p>
            <strong>Bemor:</strong> {bookedAppointment.patientName} ({bookedAppointment.patientPhone})
          </p>
          <p>
            <strong>Xona:</strong> {selectedDoctor?.roomNumber || '101'}
          </p>
          <p>
            <strong>To'lov:</strong> {bookedAppointment.fee.toLocaleString('uz-UZ')} UZS (Kassada to'lanadi)
          </p>
        </div>

        {/* Telegram Confirmation Box */}
        <div className="p-3 rounded-xl bg-[#0088CC]/10 border border-[#0088CC]/30 text-[#0F172A] space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-[#0088CC]">
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
              {telegramDelivered ? (
                <span className="text-emerald-700">✓ Telegram orqali xabar yetkazildi</span>
              ) : (
                <span>Telegram xabarnomasi:</span>
              )}
            </div>
            <a
              href={telegramDeepLink || `https://t.me/share/url?url=${encodeURIComponent(`Hurmatli ${bookedAppointment.patientName}! Siz ${bookedAppointment.date} kuni soat ${bookedAppointment.startTime} da Elvora klinikasiga (${bookedAppointment.doctorName}) qabulga yozildingiz.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-[#0088CC] hover:underline flex items-center gap-1"
            >
              <span>Telegramda ko'rish</span>
              <span>→</span>
            </a>
          </div>
          <p className="text-[11px] text-slate-600">
            Eslatmalar 1 kun va 2 soat oldin avtomatik yuboriladi.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm text-[#0F172A] space-y-3.5 max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-[#0284C7]" />
          <h4 className="font-bold text-xs text-[#0F172A]">Jonli qabulga yozilish</h4>
        </div>
        <span className="text-[10px] bg-sky-50 text-[#0284C7] px-2 py-0.5 rounded-full border border-sky-200 font-bold">
          1-bosishda bron
        </span>
      </div>

      {/* Doctor selector */}
      <div>
        <label className="block text-[11px] font-bold text-[#64748B] mb-1">Shifokor:</label>
        <select
          value={selectedDoctorId}
          onChange={(e) => setSelectedDoctorId(e.target.value)}
          className="w-full text-xs font-semibold p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20"
        >
          {availableDoctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.fullName} ({doc.specialty} — {doc.roomNumber})
            </option>
          ))}
        </select>
      </div>

      {/* Date selector */}
      <div>
        <label className="block text-[11px] font-bold text-[#64748B] mb-1">Qabul kuni:</label>
        <div className="grid grid-cols-4 gap-1.5">
          {availableDates.slice(0, 4).map((d) => (
            <button
              key={d.dateStr}
              type="button"
              onClick={() => setSelectedDate(d.dateStr)}
              className={`py-1.5 px-2 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedDate === d.dateStr
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:bg-slate-100'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div>
        <label className="block text-[11px] font-bold text-[#64748B] mb-1">Bo'sh qabul vaqtlari:</label>
        {availableSlots.length > 0 ? (
          <div className="grid grid-cols-4 gap-1.5 max-h-28 overflow-y-auto pr-1">
            {availableSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`py-1 text-center rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedSlot === slot
                    ? 'bg-[#0284C7] text-white font-bold shadow-xs'
                    : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:bg-white'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        ) : (
          <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-[11px] flex items-center gap-1.5">
            <AlertTriangle size={13} />
            <span>Tanlangan sanada barcha qabul vaqtlari band.</span>
          </div>
        )}
      </div>

      {/* Patient inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[#E2E8F0]">
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-0.5">Ismingiz:</label>
          <div className="relative">
            <User size={13} className="absolute left-2.5 top-2.5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Rustam Karimov"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs focus:ring-2 focus:ring-[#0284C7]/20 outline-none text-[#0F172A]"
            />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-0.5">Telefon:</label>
          <div className="relative">
            <Phone size={13} className="absolute left-2.5 top-2.5 text-[#64748B]" />
            <input
              type="text"
              placeholder="+998 90 123 45 67"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs focus:ring-2 focus:ring-[#0284C7]/20 outline-none text-[#0F172A]"
            />
          </div>
        </div>
      </div>

      {/* Telegram Linking & Consent row */}
      <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#0088CC] font-bold">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
            <span>Telegram eslatmalar:</span>
            {isTelegramLinked && (
              <span className="text-[10px] text-teal-700 bg-teal-100 px-1.5 py-0.2 rounded font-bold">✓ Bog'langan</span>
            )}
          </div>

          {!isTelegramLinked ? (
            <button
              type="button"
              onClick={handleConnectTelegram}
              disabled={isLinkingLoading}
              className="text-[11px] font-bold text-[#0088CC] hover:underline cursor-pointer disabled:opacity-50"
            >
              {isLinkingLoading ? 'Ulanmoqda...' : 'Telegramga ulanish →'}
            </button>
          ) : (
            <span className="text-[11px] text-[#0D9488] font-bold">Faol</span>
          )}
        </div>

        <label className="flex items-center gap-1.5 text-[11px] text-[#475569] cursor-pointer">
          <input
            type="checkbox"
            checked={telegramConsent}
            onChange={(e) => setTelegramConsent(e.target.checked)}
            className="rounded text-[#0284C7] focus:ring-[#0284C7]"
          />
          <span>Qabul xabari va eslatmalarni Telegramga yuborishga roziman</span>
        </label>
      </div>

      {errorMessage && (
        <p className="text-[11px] text-rose-600 font-semibold">{errorMessage}</p>
      )}

      {/* Action button */}
      <button
        type="button"
        disabled={isSubmitting || !selectedSlot}
        onClick={handleBook}
        className="w-full py-2.5 px-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-[#0F172A]/10"
      >
        <Clock size={14} className="text-teal-300" />
        {isSubmitting ? 'Band qilinmoqda...' : 'Qabulni tasdiqlash va yozilish'}
      </button>
    </div>
  );
};
