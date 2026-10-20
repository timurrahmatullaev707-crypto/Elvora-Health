import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { financeService } from '../../services/financeService';
import {
  TransactionType,
  PaymentMethod,
  IncomeCategory,
  ExpenseCategory,
} from '../../types';

interface NewPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: TransactionType;
}

export const NewPaymentModal: React.FC<NewPaymentModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'kirim',
}) => {
  const { patients, doctors, refreshData, showToast } = useApp();

  const [type, setType] = useState<TransactionType>(defaultType);
  const [amount, setAmount] = useState<number | string>(150000);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Karta (Uzcard/Humo)');
  const [incomeCategory, setIncomeCategory] = useState<IncomeCategory>('Konsultatsiya');
  const [expenseCategory, setExpenseCategory] = useState<ExpenseCategory>('Tibbiy materiallar');
  const [description, setDescription] = useState('');
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');

  const incomeCategories: IncomeCategory[] = [
    'Konsultatsiya',
    'Diagnostika va tahlil',
    'Muolaja xizmati',
    'Dori vositalari',
    'Boshqa xizmatlar',
  ];

  const expenseCategories: ExpenseCategory[] = [
    'Ijara',
    'Ish haqi',
    'Kommunal xarajatlar',
    'Tibbiy materiallar',
    'Uskunalar',
    'Boshqa xarajatlar',
  ];

  const paymentMethods: PaymentMethod[] = [
    'Karta (Uzcard/Humo)',
    'Naqd',
    'Payme / Click',
    'Bank o\'tkazmasi',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      showToast('Summani to\'g\'ri kiriting', 'error');
      return;
    }

    if (type === 'kirim') {
      const selectedPatient = patients.find((p) => p.id === patientId);
      const selectedDoc = doctors.find((d) => d.id === doctorId);

      financeService.createIncome({
        category: incomeCategory,
        amount: numericAmount,
        paymentMethod,
        description: description.trim() || `${incomeCategory} to'lovi`,
        patientId: selectedPatient?.id,
        patientName: selectedPatient?.fullName,
        doctorId: selectedDoc?.id,
        doctorName: selectedDoc?.fullName,
      });

      showToast(`Kirim to'lovi muvaffaqiyatli qabul qilindi: ${numericAmount.toLocaleString()} UZS`, 'success');
    } else {
      financeService.createExpense({
        category: expenseCategory,
        amount: numericAmount,
        paymentMethod,
        description: description.trim() || `${expenseCategory} xarajati`,
      });

      showToast(`Chiqim xarajati qayd etildi: ${numericAmount.toLocaleString()} UZS`, 'info');
    }

    refreshData();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === 'kirim' ? 'Kassaga kirim to\'lovi qabul qilish' : 'Klinika xarajatini qayd etish'}
      subtitle="Moliyaviy tranzaksiyani kassa jurnaliga kiritish"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Toggle Kirim / Chiqim */}
        <div className="flex p-1 bg-[#F4F7F5] rounded-xl border border-[#DFE8E4]">
          <button
            type="button"
            onClick={() => setType('kirim')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              type === 'kirim'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-[#5F737B] hover:text-[#132229]'
            }`}
          >
            + Kirim (Tushum)
          </button>
          <button
            type="button"
            onClick={() => setType('chiqim')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              type === 'chiqim'
                ? 'bg-white text-rose-800 shadow-xs'
                : 'text-[#5F737B] hover:text-[#132229]'
            }`}
          >
            - Chiqim (Xarajat)
          </button>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs font-semibold text-[#132229] mb-1">
            Summa (so'm) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            required
            min={1000}
            step={1000}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 text-sm font-semibold bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-[#132229] mb-1">
            {type === 'kirim' ? 'Xizmat toifasi' : 'Xarajat moddasi'}{' '}
            <span className="text-red-500">*</span>
          </label>
          <select
            value={type === 'kirim' ? incomeCategory : expenseCategory}
            onChange={(e) =>
              type === 'kirim'
                ? setIncomeCategory(e.target.value as IncomeCategory)
                : setExpenseCategory(e.target.value as ExpenseCategory)
            }
            className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
          >
            {type === 'kirim'
              ? incomeCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))
              : expenseCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
          </select>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-xs font-semibold text-[#132229] mb-1">
            To'lov usuli <span className="text-red-500">*</span>
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
          >
            {paymentMethods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Patient and Doctor (for Income) */}
        {type === 'kirim' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Bemor (ixtiyoriy)
              </label>
              <select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
              >
                <option value="">-- Tanlanmagan --</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Shifokor (ixtiyoriy)
              </label>
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
              >
                <option value="">-- Tanlanmagan --</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-[#132229] mb-1">
            Qo'shimcha izoh / Maqsadi
          </label>
          <input
            type="text"
            placeholder={type === 'kirim' ? 'Masalan: Umumiy tahlil to\'lovi' : 'Masalan: Dori-darmonlar xaridi'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DFE8E4]">
          <Button type="button" variant="outline" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button
            type="submit"
            variant={type === 'kirim' ? 'primary' : 'danger'}
          >
            {type === 'kirim' ? 'To\'lovni qabul qilish' : 'Xarajatni saqlash'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
