import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Plus,
  Phone,
  Calendar,
  Eye,
  Edit2,
  Trash2,
  Clock,
  Heart,
  MapPin,
  CheckCircle2,
  X,
  FileText,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge, AppointmentStatusBadge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { patientService } from '../services/patientService';
import { appointmentService } from '../services/appointmentService';
import { Patient, Gender } from '../types';

export const PatientsPage: React.FC = () => {
  const { patients, refreshData, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'erkak' | 'ayol'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected Patient for View Details Drawer / Modal
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Edit Patient State
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  // Delete Confirmation State
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  // Add Patient Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('+998 ');
  const [newBirthDate, setNewBirthDate] = useState('1990-01-01');
  const [newGender, setNewGender] = useState<Gender>('erkak');
  const [newAddress, setNewAddress] = useState('');
  const [newBloodGroup, setNewBloodGroup] = useState('II (A) Rh+');
  const [newNotes, setNewNotes] = useState('');

  // Filtered and Paginated Patients
  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchQuery =
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.includes(searchQuery) ||
        (p.address && p.address.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchGender = genderFilter === 'all' || p.gender === genderFilter;

      return matchQuery && matchGender;
    });
  }, [patients, searchQuery, genderFilter]);

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage) || 1;
  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPatients.slice(start, start + itemsPerPage);
  }, [filteredPatients, currentPage, itemsPerPage]);

  // Appointment history for selected patient
  const patientHistory = useMemo(() => {
    if (!selectedPatient) return [];
    return appointmentService.getByPatientId(selectedPatient.id);
  }, [selectedPatient, patients]);

  // Handle Add
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim() || newPhone.length < 9) {
      showToast('Bemor ma\'lumotlarini to\'liq to\'ldiring', 'error');
      return;
    }

    patientService.create({
      fullName: newFullName.trim(),
      phone: newPhone.trim(),
      birthDate: newBirthDate,
      gender: newGender,
      address: newAddress.trim(),
      bloodGroup: newBloodGroup,
      notes: newNotes.trim(),
    });

    showToast('Yangi bemor muvaffaqiyatli saqlandi', 'success');
    refreshData();
    setIsAddOpen(false);
    // Reset form
    setNewFullName('');
    setNewPhone('+998 ');
    setNewAddress('');
    setNewNotes('');
  };

  // Handle Edit Submit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatient) return;

    patientService.update(editingPatient.id, {
      fullName: editingPatient.fullName,
      phone: editingPatient.phone,
      birthDate: editingPatient.birthDate,
      gender: editingPatient.gender,
      address: editingPatient.address,
      bloodGroup: editingPatient.bloodGroup,
      notes: editingPatient.notes,
    });

    showToast('Bemor ma\'lumotlari yangilandi', 'success');
    refreshData();
    if (selectedPatient?.id === editingPatient.id) {
      setSelectedPatient(editingPatient);
    }
    setEditingPatient(null);
  };

  // Handle Delete
  const confirmDelete = () => {
    if (!patientToDelete) return;
    patientService.delete(patientToDelete.id);
    showToast(`Bemor o'chirildi: ${patientToDelete.fullName}`, 'info');
    refreshData();
    if (selectedPatient?.id === patientToDelete.id) {
      setSelectedPatient(null);
    }
    setPatientToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#132229] tracking-tight">
            Bemorlar kartotekasi
          </h1>
          <p className="text-xs text-[#5F737B] mt-0.5">
            Ro'yxatdan o'tgan barcha bemorlar profili, tashriflar va qabullar tarixi
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={() => setIsAddOpen(true)}
        >
          Yangi bemor qo'shish
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F737B]"
            />
            <input
              type="text"
              placeholder="Ism-sharifi, telefon raqami yoki manzil bo'yicha qidiruv..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] placeholder-[#5F737B] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={genderFilter}
              onChange={(e) => {
                setGenderFilter(e.target.value as 'all' | 'erkak' | 'ayol');
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
            >
              <option value="all">Barcha jinslar</option>
              <option value="erkak">Erkaklar</option>
              <option value="ayol">Ayollar</option>
            </select>

            <span className="text-xs text-[#5F737B] whitespace-nowrap">
              Jami: <strong>{filteredPatients.length}</strong> nafar
            </span>
          </div>
        </div>
      </Card>

      {/* Patients Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF9] border-b border-[#DFE8E4] text-[#5F737B] font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Bemor F.I.SH.</th>
                <th className="px-4 py-3.5">Telefon</th>
                <th className="px-4 py-3.5">Tug'ilgan sana / Jinsi</th>
                <th className="px-4 py-3.5">Manzili</th>
                <th className="px-4 py-3.5">Qon guruhi</th>
                <th className="px-4 py-3.5 text-center">Tashriflar soni</th>
                <th className="px-5 py-3.5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFE8E4]/60">
              {paginatedPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#5F737B]">
                    Qidiruv bo'yicha hech qanday bemor topilmadi.
                  </td>
                </tr>
              ) : (
                paginatedPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-[#F8FAF9] transition-colors group"
                  >
                    <td className="px-5 py-3.5 font-semibold text-[#132229]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#EBF7FC] text-[#0D34B4] flex items-center justify-center font-bold text-xs shrink-0">
                          {patient.fullName.charAt(0)}
                        </div>
                        <div>
                          <span>{patient.fullName}</span>
                          <span className="block text-[10px] text-[#5F737B] font-normal">
                            ID: {patient.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[#132229] font-mono text-[11px]">
                      {patient.phone}
                    </td>
                    <td className="px-4 py-3.5 text-[#5F737B]">
                      <div>{patient.birthDate}</div>
                      <span className="capitalize text-[10px] text-[#5F737B]">
                        {patient.gender}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#5F737B] max-w-xs truncate">
                      {patient.address || '—'}
                    </td>
                    <td className="px-4 py-3.5 text-[#5F737B]">
                      <span className="px-2 py-0.5 rounded bg-[#F4F7F5] border border-[#DFE8E4] text-[10px] font-medium">
                        {patient.bloodGroup || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center font-semibold text-[#008BFF]">
                      <span className="px-2.5 py-1 rounded-full bg-[#EBF7FC] text-[#0D34B4] text-xs">
                        {patient.totalVisits || 0} marta
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedPatient(patient)}
                          className="p-1.5 rounded-lg text-[#008BFF] hover:bg-[#EBF7FC] transition-colors"
                          title="Tarix va ma'lumotlarni ko'rish"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => setEditingPatient(patient)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setPatientToDelete(patient)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#DFE8E4] bg-[#F8FAF9] text-xs text-[#5F737B]">
            <span>
              Sahifa: <strong>{currentPage}</strong> / {totalPages}
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Oldingi
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Keyingi
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Patient View Details Drawer / Modal */}
      {selectedPatient && (
        <Modal
          isOpen={Boolean(selectedPatient)}
          onClose={() => setSelectedPatient(null)}
          title={selectedPatient.fullName}
          subtitle={`Bemor profili va qabullar arxivi • ${selectedPatient.phone}`}
          maxWidth="xl"
        >
          <div className="space-y-5">
            {/* Quick Profile Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-[#F4F7F5] border border-[#DFE8E4]">
                <span className="text-[10px] text-[#5F737B] uppercase font-semibold">
                  Tug'ilgan sana
                </span>
                <p className="text-xs font-bold text-[#132229] mt-0.5">
                  {selectedPatient.birthDate}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#F4F7F5] border border-[#DFE8E4]">
                <span className="text-[10px] text-[#5F737B] uppercase font-semibold">
                  Jinsi
                </span>
                <p className="text-xs font-bold text-[#132229] mt-0.5 capitalize">
                  {selectedPatient.gender}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#F4F7F5] border border-[#DFE8E4]">
                <span className="text-[10px] text-[#5F737B] uppercase font-semibold">
                  Qon guruhi
                </span>
                <p className="text-xs font-bold text-[#132229] mt-0.5">
                  {selectedPatient.bloodGroup || 'Kiritilmagan'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#F4F7F5] border border-[#DFE8E4]">
                <span className="text-[10px] text-[#5F737B] uppercase font-semibold">
                  Jami tashriflar
                </span>
                <p className="text-xs font-bold text-[#008BFF] mt-0.5">
                  {selectedPatient.totalVisits || 0} marta
                </p>
              </div>
            </div>

            {/* Address & Medical Notes */}
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-[#5F737B]">
                <MapPin size={15} className="text-[#008BFF] shrink-0 mt-0.5" />
                <span>
                  <strong>Manzil:</strong> {selectedPatient.address || 'Manzil ko\'rsatilmagan'}
                </span>
              </div>
              <div className="flex items-start gap-2 text-[#5F737B]">
                <FileText size={15} className="text-[#008BFF] shrink-0 mt-0.5" />
                <span>
                  <strong>Tibbiy izoh:</strong> {selectedPatient.notes || 'Izohlar kiritilmagan'}
                </span>
              </div>
            </div>

            {/* Appointment History */}
            <div>
              <h4 className="text-xs font-bold text-[#132229] uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>Qabullar tarixi</span>
                <span className="text-[11px] font-normal text-[#5F737B]">
                  {patientHistory.length} ta yozuv
                </span>
              </h4>

              {patientHistory.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#5F737B] bg-[#F4F7F5] rounded-xl border border-[#DFE8E4]">
                  Ushbu bemor uchun qabullar tarixi mavjud emas.
                </div>
              ) : (
                <div className="divide-y divide-[#DFE8E4] border border-[#DFE8E4] rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                  {patientHistory.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-3 flex items-center justify-between bg-white hover:bg-[#F8FAF9] text-xs"
                    >
                      <div>
                        <div className="font-semibold text-[#132229]">
                          {apt.doctorName} ({apt.doctorSpecialty})
                        </div>
                        <div className="text-[11px] text-[#5F737B]">
                          {apt.date} • {apt.startTime} - {apt.endTime} • {apt.serviceName}
                        </div>
                        {apt.notes && (
                          <div className="text-[10px] text-[#5F737B] italic mt-0.5">
                            "{apt.notes}"
                          </div>
                        )}
                      </div>
                      <AppointmentStatusBadge status={apt.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#DFE8E4]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPatient(null)}
              >
                Yopish
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Patient Modal */}
      {editingPatient && (
        <Modal
          isOpen={Boolean(editingPatient)}
          onClose={() => setEditingPatient(null)}
          title="Bemor ma'lumotlarini tahrirlash"
          subtitle={editingPatient.fullName}
          maxWidth="lg"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                F.I.SH. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={editingPatient.fullName}
                onChange={(e) =>
                  setEditingPatient({ ...editingPatient, fullName: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#132229] mb-1">
                  Telefon raqami <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingPatient.phone}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#132229] mb-1">
                  Tug'ilgan sana
                </label>
                <input
                  type="date"
                  value={editingPatient.birthDate}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, birthDate: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#132229] mb-1">
                  Jinsi
                </label>
                <select
                  value={editingPatient.gender}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      gender: e.target.value as Gender,
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
                >
                  <option value="erkak">Erkak</option>
                  <option value="ayol">Ayol</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#132229] mb-1">
                  Qon guruhi
                </label>
                <select
                  value={editingPatient.bloodGroup || 'II (A) Rh+'}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, bloodGroup: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
                >
                  <option value="I (0) Rh+">I (0) Rh+</option>
                  <option value="I (0) Rh-">I (0) Rh-</option>
                  <option value="II (A) Rh+">II (A) Rh+</option>
                  <option value="II (A) Rh-">II (A) Rh-</option>
                  <option value="III (B) Rh+">III (B) Rh+</option>
                  <option value="III (B) Rh-">III (B) Rh-</option>
                  <option value="IV (AB) Rh+">IV (AB) Rh+</option>
                  <option value="IV (AB) Rh-">IV (AB) Rh-</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Yashash manzili
              </label>
              <input
                type="text"
                value={editingPatient.address || ''}
                onChange={(e) =>
                  setEditingPatient({ ...editingPatient, address: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Tibbiy izohlar
              </label>
              <textarea
                rows={2}
                value={editingPatient.notes || ''}
                onChange={(e) =>
                  setEditingPatient({ ...editingPatient, notes: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DFE8E4]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingPatient(null)}
              >
                Bekor qilish
              </Button>
              <Button type="submit" variant="primary">
                O'zgarishlarni saqlash
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {patientToDelete && (
        <Modal
          isOpen={Boolean(patientToDelete)}
          onClose={() => setPatientToDelete(null)}
          title="Bemor kartasini o'chirish"
          subtitle="Ushbu amalni ortga qaytarib bo'lmaydi"
          maxWidth="sm"
        >
          <div className="space-y-4 text-xs">
            <p className="text-[#5F737B]">
              Haqiqatan ham <strong>{patientToDelete.fullName}</strong> nomli bemor ma'lumotlarini o'chirmoqchimisiz?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPatientToDelete(null)}
              >
                Bekor qilish
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={confirmDelete}
              >
                Ha, o'chirish
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Modal */}
      {isAddOpen && (
        <Modal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          title="Yangi bemor qo'shish"
          subtitle="Bemorning to'liq ma'lumotlarini kiriting"
          maxWidth="lg"
        >
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                F.I.SH. (To'liq ism-sharifi) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Jasur Bekmurodov"
                value={newFullName}
                onChange={(e) => setNewFullName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#132229] mb-1">
                  Telefon raqami <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#132229] mb-1">
                  Tug'ilgan sana <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={newBirthDate}
                  onChange={(e) => setNewBirthDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#132229] mb-1">
                  Jinsi
                </label>
                <select
                  value={newGender}
                  onChange={(e) => setNewGender(e.target.value as Gender)}
                  className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
                >
                  <option value="erkak">Erkak</option>
                  <option value="ayol">Ayol</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#132229] mb-1">
                  Qon guruhi
                </label>
                <select
                  value={newBloodGroup}
                  onChange={(e) => setNewBloodGroup(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
                >
                  <option value="I (0) Rh+">I (0) Rh+</option>
                  <option value="I (0) Rh-">I (0) Rh-</option>
                  <option value="II (A) Rh+">II (A) Rh+</option>
                  <option value="II (A) Rh-">II (A) Rh-</option>
                  <option value="III (B) Rh+">III (B) Rh+</option>
                  <option value="III (B) Rh-">III (B) Rh-</option>
                  <option value="IV (AB) Rh+">IV (AB) Rh+</option>
                  <option value="IV (AB) Rh-">IV (AB) Rh-</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Yashash manzili
              </label>
              <input
                type="text"
                placeholder="Toshkent sh., Mirobod tumani..."
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Tibbiy izohlar
              </label>
              <textarea
                rows={2}
                placeholder="Surunkali kasalliklar yoki shikoyatlar..."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DFE8E4]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddOpen(false)}
              >
                Bekor qilish
              </Button>
              <Button type="submit" variant="primary">
                Bemor qo'shish
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
