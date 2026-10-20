import React, { useState, useMemo } from 'react';
import {
  CalendarCheck2,
  Clock,
  Plus,
  Send,
  CheckCircle2,
  XCircle,
  UserX,
  Play,
  RotateCcw,
  Search,
  Filter,
  AlertCircle,
  MessageSquare,
  Sparkles,
  Phone,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { AppointmentStatusBadge } from '../components/common/Badge';
import { appointmentService } from '../services/appointmentService';
import { doctorService } from '../services/doctorService';
import { getTodayDateString } from '../services/seedData';
import { Appointment, AppointmentStatus } from '../types';

export const AppointmentsPage: React.FC = () => {
  const { appointments, doctors, patients, refreshData, showToast } = useApp();

  const todayStr = getTodayDateString();
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'queue' | 'calendar'>('queue');

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [rescheduleApt, setRescheduleApt] = useState<Appointment | null>(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState(todayStr);
  const [newRescheduleTime, setNewRescheduleTime] = useState('11:00');
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);

  // Simulated Reminder State
  const [reminderModalData, setReminderModalData] = useState<{
    appointment: Appointment;
    channel: 'SMS' | 'Telegram';
    messageText: string;
    recipient: string;
    isSimulated: boolean;
  } | null>(null);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const matchDate = !selectedDate || a.date === selectedDate;
      const matchDoctor = selectedDoctorId === 'all' || a.doctorId === selectedDoctorId;
      const matchStatus = statusFilter === 'all' || a.status === statusFilter;
      return matchDate && matchDoctor && matchStatus;
    });
  }, [appointments, selectedDate, selectedDoctorId, statusFilter]);

  // Live Queue Columns
  const waitingList = useMemo(() => {
    return filteredAppointments
      .filter((a) => a.status === 'kutilmoqda')
      .sort((a, b) => a.queueNumber - b.queueNumber);
  }, [filteredAppointments]);

  const inConsultationList = useMemo(() => {
    return filteredAppointments.filter((a) => a.status === 'qabulda');
  }, [filteredAppointments]);

  const completedList = useMemo(() => {
    return filteredAppointments.filter((a) => a.status === 'yakunlandi');
  }, [filteredAppointments]);

  const missedOrCancelledList = useMemo(() => {
    return filteredAppointments.filter(
      (a) => a.status === 'kelmagan' || a.status === 'bekor_qilindi'
    );
  }, [filteredAppointments]);

  // Status transitions
  const handleStatusChange = (aptId: string, newStatus: AppointmentStatus) => {
    appointmentService.updateStatus(aptId, newStatus);
    const statusLabels: Record<AppointmentStatus, string> = {
      kutilmoqda: 'Kutilmoqda holatiga o\'tkazildi',
      qabulda: 'Bemor xonaga qabul qilindi',
      yakunlandi: 'Qabul muvaffaqiyatli yakunlandi va qayd etildi',
      kelmagan: 'Bemor qabulga kelmagan deb belgilandi (No-show)',
      bekor_qilindi: 'Qabul bekor qilindi',
    };
    showToast(statusLabels[newStatus], 'info');
    refreshData();
  };

  // Trigger Simulated Reminder
  const handleOpenReminder = (apt: Appointment, channel: 'SMS' | 'Telegram') => {
    const res = appointmentService.simulateReminder(apt.id, channel);
    setReminderModalData({
      appointment: apt,
      channel,
      messageText: res.messageText,
      recipient: res.recipient,
      isSimulated: res.isSimulated,
    });
  };

  const confirmSendSimulatedReminder = () => {
    if (!reminderModalData) return;
    showToast(
      `${reminderModalData.channel} eslatmasi yuborildi: ${reminderModalData.recipient} (Simulyatsiya)`,
      'success'
    );
    refreshData();
    setReminderModalData(null);
  };

  // Reschedule Submit
  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleApt) return;

    const doctor = doctorService.getById(rescheduleApt.doctorId);
    const dur = doctor?.appointmentDurationMinutes || 30;
    const startMins = doctorService.timeToMinutes(newRescheduleTime);
    const endMins = startMins + dur;
    const newEndTime = doctorService.minutesToTime(endMins);

    const res = appointmentService.reschedule(
      rescheduleApt.id,
      newRescheduleDate,
      newRescheduleTime,
      newEndTime
    );

    if (!res.success) {
      setRescheduleError(res.error || 'Qabul vaqtini ko\'chirib bo\'lmadi');
      return;
    }

    showToast(`Qabul muvaffaqiyatli ${newRescheduleDate} soat ${newRescheduleTime} ga ko'chirildi`, 'success');
    refreshData();
    setRescheduleApt(null);
    setRescheduleError(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#132229] tracking-tight">
              Qabullar va jonli navbat
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E6F5F0] text-[#0D7C74] border border-[#B7E2D8]">
              Jonli boshqaruv
            </span>
          </div>
          <p className="text-xs text-[#5F737B] mt-0.5">
            Bemorlarni shifokorlar qabuliga yozish, kutish navbati va eslatmalar monitoringi
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Switcher */}
          <div className="flex bg-white p-1 rounded-xl border border-[#DFE8E4] shadow-2xs">
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'queue'
                  ? 'bg-[#0D7C74] text-white shadow-xs'
                  : 'text-[#5F737B] hover:text-[#132229]'
              }`}
            >
              Jonli doska (Queue)
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-[#0D7C74] text-white shadow-xs'
                  : 'text-[#5F737B] hover:text-[#132229]'
              }`}
            >
              Jadval ko'rinishi
            </button>
          </div>

          <Button
            variant="primary"
            icon={<Plus size={16} />}
            onClick={() => setIsAddOpen(true)}
          >
            Yangi qabul
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Date Picker */}
          <div>
            <label className="block text-[11px] font-semibold text-[#5F737B] uppercase mb-1">
              Sana
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20"
            />
          </div>

          {/* Doctor Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-[#5F737B] uppercase mb-1">
              Shifokor
            </label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20"
            >
              <option value="all">Barcha shifokorlar</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.fullName} ({d.specialty})
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-[#5F737B] uppercase mb-1">
              Holat
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20"
            >
              <option value="all">Barcha holatlar</option>
              <option value="kutilmoqda">Kutilmoqda</option>
              <option value="qabulda">Qabulda</option>
              <option value="yakunlandi">Yakunlandi</option>
              <option value="kelmagan">Kelmagan</option>
              <option value="bekor_qilindi">Bekor qilindi</option>
            </select>
          </div>

          {/* Reset Filters / Summary */}
          <div className="flex items-end justify-between sm:justify-end gap-2">
            <button
              onClick={() => {
                setSelectedDate(todayStr);
                setSelectedDoctorId('all');
                setStatusFilter('all');
              }}
              className="px-3 py-1.5 text-xs font-medium text-[#5F737B] hover:text-[#132229] hover:bg-[#F4F7F5] rounded-xl border border-[#DFE8E4] transition-colors cursor-pointer"
            >
              Filtrlarni tozalash
            </button>
          </div>
        </div>
      </Card>

      {/* View 1: Live Kanban Queue Board */}
      {activeTab === 'queue' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Column 1: Waiting */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  Kutish zalida
                </span>
              </div>
              <span className="text-xs font-bold bg-white text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                {waitingList.length}
              </span>
            </div>

            <div className="space-y-2.5 min-h-[400px]">
              {waitingList.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#5F737B] bg-white rounded-xl border border-dashed border-[#DFE8E4]">
                  Kutayotgan bemorlar yo'q
                </div>
              ) : (
                waitingList.map((apt, idx) => (
                  <Card key={apt.id} className="p-3.5 space-y-2.5 relative" hoverable>
                    <div className="flex items-start justify-between">
                      <span className="px-2 py-0.5 text-xs font-bold rounded-lg bg-[#E6F5F0] text-[#085F59] border border-[#B7E2D8]">
                        #{apt.queueNumber}
                      </span>
                      <span className="text-[11px] font-semibold text-[#0D7C74] flex items-center gap-1">
                        <Clock size={12} /> {apt.startTime}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#132229]">
                        {apt.patientName}
                      </h4>
                      <p className="text-[11px] text-[#5F737B]">
                        {apt.doctorName} • {apt.doctorSpecialty}
                      </p>
                    </div>

                    {/* Wait Time Estimation */}
                    <div className="p-2 rounded-lg bg-[#F4F7F5] border border-[#DFE8E4] text-[10px] text-[#5F737B] flex items-center justify-between">
                      <span>Kutilayotgan vaqt:</span>
                      <span className="font-bold text-[#0D7C74]">
                        ~{(idx + 1) * 15} daqiqa
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-[#DFE8E4]/60 flex items-center justify-between gap-1">
                      <button
                        onClick={() => handleStatusChange(apt.id, 'qabulda')}
                        className="flex-1 py-1 px-2 rounded-lg bg-[#0D7C74] text-white hover:bg-[#085F59] text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                        title="Shifokor huzuriga chaqirish"
                      >
                        <Play size={11} /> Qabulga chaqirish
                      </button>

                      <button
                        onClick={() => handleOpenReminder(apt, 'SMS')}
                        className={`p-1.5 rounded-lg border text-[11px] transition-colors cursor-pointer ${
                          apt.reminderSent
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-white text-[#5F737B] border-[#DFE8E4] hover:bg-[#F4F7F5]'
                        }`}
                        title="SMS eslatma yuborish (Simulyatsiya)"
                      >
                        <MessageSquare size={13} />
                      </button>

                      <button
                        onClick={() => setRescheduleApt(apt)}
                        className="p-1.5 rounded-lg bg-white border border-[#DFE8E4] text-[#5F737B] hover:text-[#132229] hover:bg-[#F4F7F5] transition-colors cursor-pointer"
                        title="Vaqtini ko'chirish"
                      >
                        <RotateCcw size={13} />
                      </button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Column 2: In Consultation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                  Qabulda (Huzurida)
                </span>
              </div>
              <span className="text-xs font-bold bg-white text-blue-900 px-2 py-0.5 rounded-full border border-blue-200">
                {inConsultationList.length}
              </span>
            </div>

            <div className="space-y-2.5 min-h-[400px]">
              {inConsultationList.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#5F737B] bg-white rounded-xl border border-dashed border-[#DFE8E4]">
                  Hozir xonada bemor yo'q
                </div>
              ) : (
                inConsultationList.map((apt) => (
                  <Card key={apt.id} className="p-3.5 space-y-2.5 border-blue-200" hoverable>
                    <div className="flex items-start justify-between">
                      <span className="px-2 py-0.5 text-xs font-bold rounded-lg bg-blue-100 text-blue-800">
                        #{apt.queueNumber}
                      </span>
                      <span className="text-[11px] font-semibold text-blue-700">
                        {apt.startTime} - {apt.endTime}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#132229]">
                        {apt.patientName}
                      </h4>
                      <p className="text-[11px] text-[#5F737B]">
                        {apt.doctorName} ({apt.doctorSpecialty})
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#DFE8E4]/60 flex items-center justify-between gap-1.5">
                      <button
                        onClick={() => handleStatusChange(apt.id, 'yakunlandi')}
                        className="flex-1 py-1 px-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 size={12} /> Yakunlash
                      </button>
                      <button
                        onClick={() => handleStatusChange(apt.id, 'kelmagan')}
                        className="p-1 px-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 text-[11px] font-medium transition-colors cursor-pointer"
                        title="Bemor kelmadi deb qayd etish"
                      >
                        <UserX size={13} />
                      </button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Column 3: Completed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                  Yakunlangan
                </span>
              </div>
              <span className="text-xs font-bold bg-white text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-200">
                {completedList.length}
              </span>
            </div>

            <div className="space-y-2.5 min-h-[400px]">
              {completedList.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#5F737B] bg-white rounded-xl border border-dashed border-[#DFE8E4]">
                  Yakunlangan qabullar yo'q
                </div>
              ) : (
                completedList.map((apt) => (
                  <Card key={apt.id} className="p-3.5 space-y-2 opacity-90" hoverable>
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-emerald-800">
                        #{apt.queueNumber}
                      </span>
                      <span className="text-[11px] text-[#5F737B]">
                        {apt.startTime}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#132229]">
                        {apt.patientName}
                      </h4>
                      <p className="text-[11px] text-[#5F737B]">
                        {apt.doctorName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#DFE8E4]">
                      <span className="text-[#5F737B]">Xizmat to'lovi:</span>
                      <span className="font-semibold text-emerald-700">
                        {apt.fee.toLocaleString()} UZS
                      </span>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Column 4: Missed or Cancelled */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-rose-50 rounded-xl border border-rose-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                <span className="text-xs font-bold text-rose-900 uppercase tracking-wide">
                  Kelmagan / Bekor
                </span>
              </div>
              <span className="text-xs font-bold bg-white text-rose-900 px-2 py-0.5 rounded-full border border-rose-200">
                {missedOrCancelledList.length}
              </span>
            </div>

            <div className="space-y-2.5 min-h-[400px]">
              {missedOrCancelledList.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#5F737B] bg-white rounded-xl border border-dashed border-[#DFE8E4]">
                  Bekor qilingan yoki kelmaganlar yo'q
                </div>
              ) : (
                missedOrCancelledList.map((apt) => (
                  <Card key={apt.id} className="p-3.5 space-y-2 bg-[#FAFAFA]" hoverable>
                    <div className="flex items-start justify-between">
                      <AppointmentStatusBadge status={apt.status} />
                      <span className="text-[11px] text-[#5F737B]">
                        {apt.startTime}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#132229]">
                        {apt.patientName}
                      </h4>
                      <p className="text-[11px] text-[#5F737B]">
                        {apt.doctorName}
                      </p>
                    </div>

                    {apt.notes && (
                      <p className="text-[10px] text-rose-700 italic">
                        "{apt.notes}"
                      </p>
                    )}

                    <div className="pt-2 border-t border-[#DFE8E4] flex justify-end">
                      <button
                        onClick={() => handleStatusChange(apt.id, 'kutilmoqda')}
                        className="text-[10px] text-[#0D7C74] hover:underline font-semibold"
                      >
                        Qayta tiklash
                      </button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* View 2: Detailed Table List */}
      {activeTab === 'calendar' && (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF9] border-b border-[#DFE8E4] text-[#5F737B] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-5 py-3.5">Navbat #</th>
                  <th className="px-4 py-3.5">Bemor</th>
                  <th className="px-4 py-3.5">Shifokor</th>
                  <th className="px-4 py-3.5">Sana va Vaqt</th>
                  <th className="px-4 py-3.5">Xizmat va To'lov</th>
                  <th className="px-4 py-3.5">Holati</th>
                  <th className="px-4 py-3.5">Eslatma</th>
                  <th className="px-5 py-3.5 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8E4]/60">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-[#5F737B]">
                      Filtr bo'yicha qabullar topilmadi.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-[#F8FAF9] transition-colors">
                      <td className="px-5 py-3.5 font-bold text-[#0D7C74]">
                        #{apt.queueNumber}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-[#132229]">
                        <div>{apt.patientName}</div>
                        <span className="text-[10px] text-[#5F737B] font-mono">
                          {apt.patientPhone}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[#132229]">
                        <div>{apt.doctorName}</div>
                        <span className="text-[10px] text-[#5F737B]">
                          {apt.doctorSpecialty}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[#5F737B]">
                        <div className="font-semibold">{apt.date}</div>
                        <div className="text-[11px] text-[#5F737B]">
                          {apt.startTime} - {apt.endTime}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-[#5F737B]">
                        <div>{apt.serviceName}</div>
                        <span className="font-bold text-[#0D7C74] text-[11px]">
                          {apt.fee.toLocaleString()} UZS
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <AppointmentStatusBadge status={apt.status} />
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => handleOpenReminder(apt, 'SMS')}
                          className={`px-2 py-1 rounded-lg text-[11px] font-medium border flex items-center gap-1 cursor-pointer ${
                            apt.reminderSent
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-[#F4F7F5] text-[#5F737B] border-[#DFE8E4] hover:bg-[#E6F5F0]'
                          }`}
                        >
                          <Send size={11} />
                          {apt.reminderSent ? 'Yuborilgan' : 'Eslatma yuborish'}
                        </button>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {apt.status === 'kutilmoqda' && (
                            <button
                              onClick={() => handleStatusChange(apt.id, 'qabulda')}
                              className="px-2 py-1 rounded-lg bg-[#0D7C74] text-white hover:bg-[#085F59] text-[11px] font-medium transition-colors shadow-xs"
                            >
                              Qabulga
                            </button>
                          )}
                          {apt.status === 'qabulda' && (
                            <button
                              onClick={() => handleStatusChange(apt.id, 'yakunlandi')}
                              className="px-2 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-[11px] font-medium transition-colors shadow-xs"
                            >
                              Yakunlash
                            </button>
                          )}
                          <button
                            onClick={() => setRescheduleApt(apt)}
                            className="p-1 rounded text-[#5F737B] hover:text-[#132229] hover:bg-[#F4F7F5]"
                            title="Ko'chirish"
                          >
                            <RotateCcw size={14} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(apt.id, 'bekor_qilindi')}
                            className="p-1 rounded text-rose-600 hover:bg-rose-50"
                            title="Bekor qilish"
                          >
                            <XCircle size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Simulated Reminder Modal */}
      {reminderModalData && (
        <Modal
          isOpen={Boolean(reminderModalData)}
          onClose={() => setReminderModalData(null)}
          title={`Avtomatlashtirilgan ${reminderModalData.channel} eslatmasi`}
          subtitle="Pro tarifidagi bemorlarni xabardor qilish moduli (Simulyatsiya)"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            {/* Warning banner: clearly simulated */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 leading-relaxed">
              ⚠️ <strong>Simulyatsiya xabarnomasi:</strong> SMS shlyuzi (Eskiz/PlayMobile) hozirda test rejimida. Real xabar yuborilmaydi, tizimda yetkazilgan deb qayd etiladi.
            </div>

            <div>
              <span className="text-[11px] font-semibold text-[#5F737B] uppercase">
                Qabul qiluvchi:
              </span>
              <p className="font-bold text-[#132229] mt-0.5">
                {reminderModalData.appointment.patientName} ({reminderModalData.recipient})
              </p>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-[#5F737B] uppercase">
                Xabar matni shabloni:
              </span>
              <div className="p-3 mt-1 bg-[#F4F7F5] rounded-xl border border-[#DFE8E4] text-[#132229] font-mono text-[11px] leading-relaxed">
                {reminderModalData.messageText}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#DFE8E4]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReminderModalData(null)}
              >
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<Send size={13} />}
                onClick={confirmSendSimulatedReminder}
              >
                Eslatmani sinov tariqasida yuborish
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reschedule Modal */}
      {rescheduleApt && (
        <Modal
          isOpen={Boolean(rescheduleApt)}
          onClose={() => {
            setRescheduleApt(null);
            setRescheduleError(null);
          }}
          title="Qabul vaqtini boshqa sanaga ko'chirish"
          subtitle={`${rescheduleApt.patientName} — ${rescheduleApt.doctorName}`}
          maxWidth="sm"
        >
          <form onSubmit={handleRescheduleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Yangi sana <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={newRescheduleDate}
                onChange={(e) => setNewRescheduleDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Yangi boshlanish vaqti <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                required
                value={newRescheduleTime}
                onChange={(e) => setNewRescheduleTime(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20"
              />
            </div>

            {rescheduleError && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                {rescheduleError}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-[#DFE8E4]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setRescheduleApt(null)}
              >
                Bekor qilish
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Ko'chirishni saqlash
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
