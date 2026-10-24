import React, { useState, useMemo } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Doctor, Appointment } from '../../types';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import { reminderService } from '../../services/reminderService';
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

  // Dates: Next 5 available dates
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

  const handleBook = () => {
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
      // Schedule automated reminder
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
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#E3F1EC] to-[#EBF7FC] border border-[#A7F3D0] text-[#132229] space-y-3">
        <div className="flex items-center gap-2.5 text-[#059669]">
          <CheckCircle2 size={20} className="shrink-0" />
          <h4 className="font-bold text-sm">Qabul muvaffaqiyatli tasdiqlandi!</h4>
        </div>
        <div className="bg-white/80 p-3 rounded-xl border border-white/60 space-y-1.5 text-xs">
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
        <div className="flex items-center gap-2 text-[11px] text-[#0D34B4]">
          <ShieldCheck size={14} />
          <span>Telegram/SMS eslatma avtomatik faollashtirildi.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-white border border-[#DFE8E4] shadow-sm space-y-3 text-xs text-[#132229]">
      <div className="flex items-center justify-between border-b border-[#F0F4F2] pb-2">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-[#008BFF]" />
          <span className="font-bold text-sm">Shifokor qabuliga yozilish</span>
        </div>
        {selectedDoctor && (
          <span className="font-semibold text-[#059669] bg-[#E3F1EC] px-2 py-0.5 rounded-md text-[11px]">
            {selectedDoctor.consultationFee.toLocaleString('uz-UZ')} UZS
          </span>
        )}
      </div>

      {/* Doctor selector */}
      <div>
        <label className="block text-[11px] font-semibold text-[#5F737B] mb-1">Shifokor:</label>
        <select
          value={selectedDoctorId}
          onChange={(e) => {
            setSelectedDoctorId(e.target.value);
            setSelectedSlot('');
          }}
          className="w-full p-2 bg-[#F8FAF9] border border-[#DFE8E4] rounded-xl text-xs font-medium focus:ring-1 focus:ring-[#008BFF] outline-hidden"
        >
          {doctors
            .filter((d) => d.isActive)
            .map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.fullName} ({doc.specialty}) — Xona {doc.roomNumber}
              </option>
            ))}
        </select>
      </div>

      {/* Date selector chips */}
      <div>
        <label className="block text-[11px] font-semibold text-[#5F737B] mb-1">Mavjud ish kunlari:</label>
        <div className="flex flex-wrap gap-1.5">
          {availableDates.length > 0 ? (
            availableDates.map((d) => (
              <button
                key={d.dateStr}
                type="button"
                onClick={() => {
                  setSelectedDate(d.dateStr);
                  setSelectedSlot('');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedDate === d.dateStr
                    ? 'bg-[#06142B] text-white shadow-2xs'
                    : 'bg-[#F8FAF9] text-[#2C3E50] border border-[#DFE8E4] hover:border-[#008BFF]'
                }`}
              >
                {d.label}
              </button>
            ))
          ) : (
            <p className="text-[11px] text-[#B45309]">Ushbu haftada bo'sh ish kunlari topilmadi.</p>
          )}
        </div>
      </div>

      {/* Time slots */}
      <div>
        <label className="block text-[11px] font-semibold text-[#5F737B] mb-1">Bo'sh qabul vaqtlari:</label>
        {availableSlots.length > 0 ? (
          <div className="grid grid-cols-4 gap-1.5 max-h-28 overflow-y-auto pr-1">
            {availableSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`py-1 text-center rounded-lg text-[11px] font-semibold transition-all ${
                  selectedSlot === slot
                    ? 'bg-[#00D2B4] text-[#06142B] font-bold shadow-2xs'
                    : 'bg-[#F8FAF9] text-[#2C3E50] border border-[#DFE8E4] hover:bg-white'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        ) : (
          <div className="p-2 rounded-xl bg-[#FFFBEB] text-[#B45309] text-[11px] flex items-center gap-1.5">
            <AlertTriangle size={13} />
            <span>Tanlangan sanada barcha qabul vaqtlari band.</span>
          </div>
        )}
      </div>

      {/* Patient inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[#F0F4F2]">
        <div>
          <label className="block text-[11px] font-semibold text-[#5F737B] mb-0.5">Ism-familiyangiz:</label>
          <div className="relative">
            <User size={13} className="absolute left-2.5 top-2.5 text-[#5F737B]" />
            <input
              type="text"
              placeholder="Rustam Karimov"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 bg-[#F8FAF9] border border-[#DFE8E4] rounded-xl text-xs focus:ring-1 focus:ring-[#008BFF] outline-hidden"
            />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#5F737B] mb-0.5">Telefon raqamingiz:</label>
          <div className="relative">
            <Phone size={13} className="absolute left-2.5 top-2.5 text-[#5F737B]" />
            <input
              type="text"
              placeholder="+998 90 123 45 67"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 bg-[#F8FAF9] border border-[#DFE8E4] rounded-xl text-xs focus:ring-1 focus:ring-[#008BFF] outline-hidden"
            />
          </div>
        </div>
      </div>

      {errorMessage && (
        <p className="text-[11px] text-[#E02D3C] font-semibold">{errorMessage}</p>
      )}

      {/* Action button */}
      <button
        type="button"
        disabled={isSubmitting || !selectedSlot}
        onClick={handleBook}
        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#00D2B4] to-[#008BFF] text-[#06142B] font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
      >
        <Clock size={14} />
        {isSubmitting ? 'Band qilinmoqda...' : 'Qabulni tasdiqlash va yozilish'}
      </button>
    </div>
  );
};
