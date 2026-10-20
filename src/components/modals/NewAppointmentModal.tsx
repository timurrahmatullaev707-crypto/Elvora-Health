import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import { getTodayDateString } from '../../services/seedData';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDoctorId?: string;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultDoctorId,
}) => {
  const { doctors, patients, refreshData, showToast } = useApp();

  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState(defaultDoctorId || '');
  const [date, setDate] = useState(getTodayDateString());
  const [startTime, setStartTime] = useState('11:00');
  const [endTime, setEndTime] = useState('11:30');
  const [serviceName, setServiceName] = useState('Konsultatsiya va birlamchi ko\'rik');
  const [fee, setFee] = useState(150000);
  const [notes, setNotes] = useState('');

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [conflictError, setConflictError] = useState<string | null>(null);

  // Set default doctor on open
  useEffect(() => {
    if (defaultDoctorId) {
      setDoctorId(defaultDoctorId);
    } else if (doctors.length > 0 && !doctorId) {
      setDoctorId(doctors[0].id);
    }
    if (patients.length > 0 && !patientId) {
      setPatientId(patients[0].id);
    }
  }, [doctors, patients, defaultDoctorId, doctorId, patientId]);

  // Update fee when doctor changes
  useEffect(() => {
    const selectedDoc = doctors.find((d) => d.id === doctorId);
    if (selectedDoc) {
      setFee(selectedDoc.consultationFee);
      // Recalculate available slots
      const apts = appointmentService.getAll();
      const slots = doctorService.getAvailableSlots(selectedDoc, date, apts);
      setAvailableSlots(slots);
      if (slots.length > 0 && !slots.includes(startTime)) {
        setStartTime(slots[0]);
        const dur = selectedDoc.appointmentDurationMinutes || 30;
        const startMins = doctorService.timeToMinutes(slots[0]);
        setEndTime(doctorService.minutesToTime(startMins + dur));
      }
    }
  }, [doctorId, date, doctors]);

  // Check conflicts live
  useEffect(() => {
    const selectedDoc = doctors.find((d) => d.id === doctorId);
    if (selectedDoc && startTime && endTime) {
      const apts = appointmentService.getAll();
      const check = doctorService.checkSlotAvailability(
        selectedDoc,
        date,
        startTime,
        endTime,
        apts
      );
      if (!check.available) {
        setConflictError(check.reason || 'Ushbu vaqt band');
      } else {
        setConflictError(null);
      }
    }
  }, [doctorId, date, startTime, endTime, doctors]);

  const handleStartTimeChange = (newStart: string) => {
    setStartTime(newStart);
    const selectedDoc = doctors.find((d) => d.id === doctorId);
    const dur = selectedDoc?.appointmentDurationMinutes || 30;
    const startMins = doctorService.timeToMinutes(newStart);
    setEndTime(doctorService.minutesToTime(startMins + dur));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedPatient = patients.find((p) => p.id === patientId);
    const selectedDoc = doctors.find((d) => d.id === doctorId);

    if (!selectedPatient || !selectedDoc) {
      showToast('Bemor yoki shifokor tanlanmagan', 'error');
      return;
    }

    const res = appointmentService.create({
      patientId: selectedPatient.id,
      patientName: selectedPatient.fullName,
      patientPhone: selectedPatient.phone,
      doctorId: selectedDoc.id,
      doctorName: selectedDoc.fullName,
      doctorSpecialty: selectedDoc.specialty,
      date,
      startTime,
      endTime,
      serviceName,
      fee: Number(fee),
      status: 'kutilmoqda',
      notes,
    });

    if (!res.success) {
      showToast(res.error || 'Qabulni saqlab bo\'lmadi', 'error');
      return;
    }

    showToast(`Qabul muvaffaqiyatli belgilandi! Navbat: #${res.appointment?.queueNumber}`, 'success');
    refreshData();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Yangi qabul belgilash"
      subtitle="Bemor qabulini shifokor ish jadvaliga muvofiq kiritish"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Selection */}
        <div>
          <label className="block text-xs font-semibold text-[#132229] mb-1">
            Bemor <span className="text-red-500">*</span>
          </label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
            className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20 focus:border-[#0D7C74]"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName} ({p.phone})
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Selection */}
        <div>
          <label className="block text-xs font-semibold text-[#132229] mb-1">
            Shifokor va mutaxassislik <span className="text-red-500">*</span>
          </label>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
            className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20 focus:border-[#0D7C74]"
          >
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.fullName} — {d.specialty} ({d.consultationFee.toLocaleString()} so'm)
              </option>
            ))}
          </select>
        </div>

        {/* Date and Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#132229] mb-1">
              Qabul sanasi <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20 focus:border-[#0D7C74]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#132229] mb-1">
              Boshlanish vaqti <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => handleStartTimeChange(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20 focus:border-[#0D7C74]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#132229] mb-1">
              Tugash vaqti <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20 focus:border-[#0D7C74]"
            />
          </div>
        </div>

        {/* Suggested Open Slots */}
        {availableSlots.length > 0 && (
          <div>
            <span className="text-[11px] font-medium text-[#5F737B] block mb-1">
              Shifokorning bo'sh vaqtlari (slotlar):
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
              {availableSlots.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => handleStartTimeChange(s)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                    startTime === s
                      ? 'bg-[#0D7C74] text-white border-[#0D7C74]'
                      : 'bg-white text-[#132229] border-[#DFE8E4] hover:bg-[#E6F5F0]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conflict Warning or Success */}
        {conflictError ? (
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
            <span>{conflictError}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
            <span>Tanlangan vaqt bo'sh va qabul uchun mos</span>
          </div>
        )}

        {/* Service Name & Fee */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#132229] mb-1">
              Xizmat nomi
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20 focus:border-[#0D7C74]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#132229] mb-1">
              Xizmat narxi (so'm)
            </label>
            <input
              type="number"
              value={fee}
              onChange={(e) => setFee(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20 focus:border-[#0D7C74]"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-[#132229] mb-1">
            Qo'shimcha izoh / Shikoyat
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Bemorning dastlabki shikoyati yoki ko'rsatmalar..."
            className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20 focus:border-[#0D7C74]"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DFE8E4]">
          <Button type="button" variant="outline" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button type="submit" variant="primary" disabled={Boolean(conflictError)}>
            Qabulni tasdiqlash
          </Button>
        </div>
      </form>
    </Modal>
  );
};
