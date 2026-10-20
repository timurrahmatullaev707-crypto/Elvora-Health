import React, { useState, useMemo } from 'react';
import {
  Stethoscope,
  Plus,
  Clock,
  Calendar,
  Phone,
  Mail,
  Edit2,
  CheckCircle2,
  Coffee,
  Check,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { doctorService } from '../services/doctorService';
import { getTodayDateString } from '../services/seedData';
import { Doctor, DoctorSpecialty } from '../types';

export const DoctorsPage: React.FC = () => {
  const { doctors, appointments, refreshData, showToast } = useApp();

  const todayStr = getTodayDateString();
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Add / Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const [fullName, setFullName] = useState('');
  const [specialty, setSpecialty] = useState<DoctorSpecialty>('Terapevt');
  const [phone, setPhone] = useState('+998 ');
  const [email, setEmail] = useState('');
  const [roomNumber, setRoomNumber] = useState('101-xona');
  const [consultationFee, setConsultationFee] = useState<number | string>(120000);
  const [workingDays, setWorkingDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [startHour, setStartHour] = useState('08:30');
  const [endHour, setEndHour] = useState('17:30');
  const [breakStart, setBreakStart] = useState('13:00');
  const [breakEnd, setBreakEnd] = useState('14:00');
  const [duration, setDuration] = useState(30);

  const specialties: DoctorSpecialty[] = [
    'Kardiolog',
    'Terapevt',
    'Nevropatolog',
    'Pediatr',
    'Stomatolog',
    'Ginekolog',
    'Jarroh',
    'Oftalmolog',
    'LOR',
  ];

  const daysMap = [
    { num: 1, label: 'Dush' },
    { num: 2, label: 'Sesh' },
    { num: 3, label: 'Chor' },
    { num: 4, label: 'Pay' },
    { num: 5, label: 'Jum' },
    { num: 6, label: 'Shan' },
  ];

  const openAddModal = () => {
    setEditingDoctor(null);
    setFullName('');
    setSpecialty('Terapevt');
    setPhone('+998 ');
    setEmail('');
    setRoomNumber('101-xona');
    setConsultationFee(120000);
    setWorkingDays([1, 2, 3, 4, 5]);
    setStartHour('08:30');
    setEndHour('17:30');
    setBreakStart('13:00');
    setBreakEnd('14:00');
    setDuration(30);
    setIsModalOpen(true);
  };

  const openEditModal = (doc: Doctor) => {
    setEditingDoctor(doc);
    setFullName(doc.fullName);
    setSpecialty(doc.specialty);
    setPhone(doc.phone);
    setEmail(doc.email || '');
    setRoomNumber(doc.roomNumber);
    setConsultationFee(doc.consultationFee);
    setWorkingDays(doc.workingDays);
    setStartHour(doc.startHour);
    setEndHour(doc.endHour);
    setBreakStart(doc.breakStart);
    setBreakEnd(doc.breakEnd);
    setDuration(doc.appointmentDurationMinutes || 30);
    setIsModalOpen(true);
  };

  const handleToggleDay = (dayNum: number) => {
    if (workingDays.includes(dayNum)) {
      setWorkingDays(workingDays.filter((d) => d !== dayNum));
    } else {
      setWorkingDays([...workingDays, dayNum].sort());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      showToast('Shifokor ismini kiriting', 'error');
      return;
    }

    if (editingDoctor) {
      doctorService.update(editingDoctor.id, {
        fullName: fullName.trim(),
        specialty,
        phone: phone.trim(),
        email: email.trim(),
        roomNumber: roomNumber.trim(),
        consultationFee: Number(consultationFee),
        workingDays,
        startHour,
        endHour,
        breakStart,
        breakEnd,
        appointmentDurationMinutes: Number(duration),
      });
      showToast('Shifokor ma\'lumotlari yangilandi', 'success');
    } else {
      doctorService.create({
        fullName: fullName.trim(),
        specialty,
        phone: phone.trim(),
        email: email.trim(),
        roomNumber: roomNumber.trim(),
        consultationFee: Number(consultationFee),
        workingDays,
        startHour,
        endHour,
        breakStart,
        breakEnd,
        appointmentDurationMinutes: Number(duration),
        avatarColor: '#167D72',
        isActive: true,
      });
      showToast('Yangi shifokor muvaffaqiyatli qo\'shildi', 'success');
    }

    refreshData();
    setIsModalOpen(false);
  };

  // Appointments on selected date
  const appointmentsOnDate = useMemo(() => {
    return appointments.filter((a) => a.date === selectedDate);
  }, [appointments, selectedDate]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#20312F] tracking-tight">
            Shifokorlar va ish jadvali
          </h1>
          <p className="text-xs text-[#71817D] mt-0.5">
            Mutaxassislar shtati, qabul soatlari, tushlik tanaffuslari va bandlik tahlili
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-[#E4EBE8] rounded-xl text-[#20312F] shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#167D72]/20"
          />
          <Button
            variant="primary"
            icon={<Plus size={16} />}
            onClick={openAddModal}
          >
            Shifokor qo'shish
          </Button>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {doctors.map((doctor) => {
          const occ = doctorService.calculateOccupancy(doctor, appointmentsOnDate);
          const docApts = appointmentsOnDate.filter(
            (a) => a.doctorId === doctor.id && a.status !== 'bekor_qilindi'
          );

          return (
            <Card key={doctor.id} className="flex flex-col justify-between" hoverable>
              <div>
                {/* Doctor Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl text-white font-bold flex items-center justify-center text-sm shadow-xs"
                      style={{ backgroundColor: doctor.avatarColor || '#167D72' }}
                    >
                      {doctor.fullName
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#20312F]">
                        {doctor.fullName}
                      </h3>
                      <span className="inline-block text-[11px] font-semibold text-[#167D72] bg-[#EAF6F2] px-2 py-0.5 rounded-md mt-0.5">
                        {doctor.specialty}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openEditModal(doctor)}
                    className="p-1.5 rounded-lg text-[#71817D] hover:text-[#20312F] hover:bg-[#F5F8F7] transition-colors"
                    title="Tahrirlash"
                  >
                    <Edit2 size={15} />
                  </button>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-2 text-xs text-[#506360] border-t border-[#E4EBE8] pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#71817D]">Xona:</span>
                    <span className="font-semibold text-[#20312F]">{doctor.roomNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#71817D]">Qabul narxi:</span>
                    <span className="font-bold text-emerald-700">
                      {doctor.consultationFee.toLocaleString()} UZS
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#71817D]">Ish soatlari:</span>
                    <span className="font-medium text-[#20312F]">
                      {doctor.startHour} — {doctor.endHour}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#71817D] flex items-center gap-1">
                      <Coffee size={12} /> Tushlik:
                    </span>
                    <span className="text-[#71817D]">
                      {doctor.breakStart} — {doctor.breakEnd}
                    </span>
                  </div>
                </div>

                {/* Working Days Chips */}
                <div className="mt-3 flex items-center gap-1">
                  {daysMap.map((d) => {
                    const isWorking = doctor.workingDays.includes(d.num);
                    return (
                      <span
                        key={d.num}
                        className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                          isWorking
                            ? 'bg-[#EAF6F2] text-[#125B54] border border-[#BCE3D7]'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {d.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Occupancy Rate on Selected Date */}
              <div className="mt-4 pt-3 border-t border-[#E4EBE8]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#71817D]">
                    {selectedDate === todayStr ? 'Bugungi bandlik' : `${selectedDate} bandligi`}:
                  </span>
                  <span className="font-bold text-[#167D72]">
                    {occ.occupancyPercent}% ({occ.bookedSlotsCount}/{occ.slotsCount} slot)
                  </span>
                </div>
                <div className="w-full bg-[#F5F8F7] h-2 rounded-full overflow-hidden border border-[#E4EBE8]">
                  <div
                    className="h-full bg-[#167D72] rounded-full transition-all duration-300"
                    style={{ width: `${occ.occupancyPercent}%` }}
                  />
                </div>

                {/* Today's appointments count */}
                <div className="mt-2 text-[11px] text-[#71817D] flex items-center justify-between">
                  <span>Rejalashtirilgan qabullar:</span>
                  <span className="font-semibold text-[#20312F]">{docApts.length} nafar</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add / Edit Doctor Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingDoctor ? 'Shifokor ma\'lumotlarini tahrirlash' : 'Yangi shifokor qo\'shish'}
          subtitle="Ish jadvali, konsultatsiya davomiyligi va qabul to'lovlarini sozlash"
          maxWidth="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#20312F] mb-1">
                F.I.SH. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Dr. Alisher Usmonov"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F] focus:outline-none focus:ring-2 focus:ring-[#167D72]/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#20312F] mb-1">
                  Mutaxassislik <span className="text-red-500">*</span>
                </label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value as DoctorSpecialty)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F] focus:outline-none focus:ring-2 focus:ring-[#167D72]/20"
                >
                  {specialties.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#20312F] mb-1">
                  Konsultatsiya to'lovi (so'm) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  step={5000}
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F] focus:outline-none focus:ring-2 focus:ring-[#167D72]/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#20312F] mb-1">
                  Telefon raqami
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F] focus:outline-none focus:ring-2 focus:ring-[#167D72]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#20312F] mb-1">
                  Xona raqami
                </label>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F] focus:outline-none focus:ring-2 focus:ring-[#167D72]/20"
                />
              </div>
            </div>

            {/* Working Days Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#20312F] mb-1.5">
                Ish kunlari
              </label>
              <div className="flex flex-wrap gap-2">
                {daysMap.map((d) => {
                  const isSelected = workingDays.includes(d.num);
                  return (
                    <button
                      type="button"
                      key={d.num}
                      onClick={() => handleToggleDay(d.num)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#167D72] text-white shadow-xs'
                          : 'bg-[#F5F8F7] text-[#71817D] border border-[#E4EBE8] hover:bg-[#EAF6F2]'
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hours and Breaks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#71817D] mb-1">
                  Ish boshlanishi
                </label>
                <input
                  type="time"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#71817D] mb-1">
                  Ish tugashi
                </label>
                <input
                  type="time"
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#71817D] mb-1">
                  Tushlik boshi
                </label>
                <input
                  type="time"
                  value={breakStart}
                  onChange={(e) => setBreakStart(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#71817D] mb-1">
                  Tushlik oxiri
                </label>
                <input
                  type="time"
                  value={breakEnd}
                  onChange={(e) => setBreakEnd(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#20312F] mb-1">
                Bitta qabul davomiyligi (daqiqa)
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F]"
              >
                <option value={15}>15 daqiqa</option>
                <option value={20}>20 daqiqa</option>
                <option value={30}>30 daqiqa (standart)</option>
                <option value={45}>45 daqiqa</option>
                <option value={60}>60 daqiqa</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#E4EBE8]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Bekor qilish
              </Button>
              <Button type="submit" variant="primary">
                {editingDoctor ? 'Saqlash' : 'Shifokorni qo\'shish'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
