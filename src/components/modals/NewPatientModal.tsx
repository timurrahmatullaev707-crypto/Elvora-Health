import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { patientService } from '../../services/patientService';
import { Gender } from '../../types';

interface NewPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPatientModal: React.FC<NewPatientModalProps> = ({ isOpen, onClose }) => {
  const { refreshData, showToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [birthDate, setBirthDate] = useState('1995-01-01');
  const [gender, setGender] = useState<Gender>('erkak');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('II (A) Rh+');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      showToast('Bemor to\'liq ism-sharifini kiriting', 'error');
      return;
    }
    if (!phone.trim() || phone.length < 9) {
      showToast('Telefon raqamini to\'liq kiriting', 'error');
      return;
    }

    const newPatient = patientService.create({
      fullName: fullName.trim(),
      phone: phone.trim(),
      birthDate,
      gender,
      address: address.trim(),
      bloodGroup,
      notes: notes.trim(),
    });

    showToast(`Bemor muvaffaqiyatli ro'yxatga olindi: ${newPatient.fullName}`, 'success');
    refreshData();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Yangi bemor ro'yxatga olish"
      subtitle="Bemorning asosiy ma'lumotlarini kartotekaga kiritish"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#132229] mb-1">
            F.I.SH. (To'liq ism-sharifi) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Masalan: Jasur Bekmurodov"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#132229] mb-1">
              Tug'ilgan sanasi <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
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
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
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
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
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
            placeholder="Toshkent sh., Chilonzor tumani..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#132229] mb-1">
            Tibbiy ma'lumot yoki allergiya izohlari
          </label>
          <textarea
            rows={2}
            placeholder="Allergik reaksiyalar yoki surunkali kasalliklar haqida..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DFE8E4]">
          <Button type="button" variant="outline" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button type="submit" variant="primary">
            Saqlash
          </Button>
        </div>
      </form>
    </Modal>
  );
};
