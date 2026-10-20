import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Plus,
  Download,
  Printer,
  Search,
  Ban,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { StatCard } from '../components/common/StatCard';
import { Modal } from '../components/common/Modal';
import { financeService } from '../services/financeService';
import { Transaction, PaymentMethod, ExpenseCategory, IncomeCategory } from '../types';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const FinancePage: React.FC = () => {
  const { transactions, patients, refreshData, showToast } = useApp();

  const [period, setPeriod] = useState<'today' | '7days' | '30days' | 'all'>('30days');
  const [activeTab, setActiveTab] = useState<'all' | 'kirim' | 'chiqim' | 'breakdown'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [voidModalTx, setVoidModalTx] = useState<Transaction | null>(null);
  const [voidReason, setVoidReason] = useState('');
  const [voidError, setVoidError] = useState<string | null>(null);

  // Form State: Income
  const [incAmount, setIncAmount] = useState<number | string>(150000);
  const [incCategory, setIncCategory] = useState<IncomeCategory>('Konsultatsiya');
  const [incMethod, setIncMethod] = useState<PaymentMethod>('Karta (Uzcard/Humo)');
  const [incDesc, setIncDesc] = useState('');
  const [incPatientId, setIncPatientId] = useState('');

  // Form State: Expense
  const [expAmount, setExpAmount] = useState<number | string>(250000);
  const [expCategory, setExpCategory] = useState<ExpenseCategory>('Tibbiy materiallar');
  const [expMethod, setExpMethod] = useState<PaymentMethod>('Bank o\'tkazmasi');
  const [expDesc, setExpDesc] = useState('');

  // Summary and transactions for selected period
  const { summary, transactions: periodTxs } = useMemo(() => {
    return financeService.getSummaryForPeriod(period);
  }, [period, transactions]);

  // Filtered transactions by tab and search
  const filteredTransactions = useMemo(() => {
    return periodTxs.filter((t) => {
      const matchTab = activeTab === 'all' || t.type === activeTab;
      const matchSearch =
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.patientName && t.patientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchTab && matchSearch;
    });
  }, [periodTxs, activeTab, searchQuery]);

  // Breakdown for Chart
  const expenseBreakdown = useMemo(() => {
    return financeService.getExpenseBreakdown(periodTxs);
  }, [periodTxs]);

  const COLORS = ['#0D7C74', '#2563EB', '#F59E0B', '#EF4444', '#8B5CF6', '#10B981'];

  // Handle Void
  const handleVoidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voidModalTx) return;

    const res = financeService.voidTransaction(voidModalTx.id, voidReason);
    if (!res.success) {
      setVoidError(res.error || 'Tranzaksiyani bekor qilib bo\'lmadi');
      return;
    }

    showToast(`Tranzaksiya #${voidModalTx.receiptNumber} bekor qilindi`, 'info');
    refreshData();
    setVoidModalTx(null);
    setVoidReason('');
    setVoidError(null);
  };

  // Handle Add Income Submit
  const handleIncomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(incAmount);
    if (!num || num <= 0) {
      showToast('To\'g\'ri summa kiriting', 'error');
      return;
    }

    const patient = patients.find((p) => p.id === incPatientId);
    financeService.createIncome({
      category: incCategory,
      amount: num,
      paymentMethod: incMethod,
      description: incDesc || `${incCategory} to'lovi`,
      patientId: patient?.id,
      patientName: patient?.fullName,
    });

    showToast(`Kassaga ${num.toLocaleString()} UZS qabul qilindi`, 'success');
    refreshData();
    setIsAddIncomeOpen(false);
    setIncDesc('');
  };

  // Handle Add Expense Submit
  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(expAmount);
    if (!num || num <= 0) {
      showToast('To\'g\'ri summa kiriting', 'error');
      return;
    }

    financeService.createExpense({
      category: expCategory,
      amount: num,
      paymentMethod: expMethod,
      description: expDesc || `${expCategory} xarajati`,
    });

    showToast(`Xarajat qayd etildi: ${num.toLocaleString()} UZS`, 'info');
    refreshData();
    setIsAddExpenseOpen(false);
    setExpDesc('');
  };

  // Export CSV
  const handleExportCsv = () => {
    const csvContent = financeService.exportToCsv(filteredTransactions);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `elvora_moliya_${period}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Moliyaviy hisobot CSV formatida yuklab olindi', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#132229] tracking-tight">
            Moliya va kassa boshqaruvi
          </h1>
          <p className="text-xs text-[#5F737B] mt-0.5">
            Klinikaning barcha tushumlari, xarajatlari, kvitansiyalar va operatsion natija
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={<Download size={14} />}
            onClick={handleExportCsv}
          >
            Eksport CSV
          </Button>

          <Button
            size="sm"
            variant="outline"
            icon={<Printer size={14} />}
            onClick={() => window.print()}
          >
            Chop etish
          </Button>

          <Button
            size="sm"
            variant="primary"
            icon={<Plus size={14} />}
            onClick={() => setIsAddIncomeOpen(true)}
          >
            + Kirim
          </Button>

          <Button
            size="sm"
            variant="danger"
            icon={<Plus size={14} />}
            onClick={() => setIsAddExpenseOpen(true)}
          >
            - Chiqim
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Jami tushum (Kirim)"
          value={`${summary.totalIncome.toLocaleString('uz-UZ')} UZS`}
          subtitle={`${summary.incomeCount} ta muvaffaqiyatli to'lov`}
          icon={<TrendingUp size={20} />}
          iconBgColor="bg-[#E6F5F0] text-[#0D7C74]"
        />

        <StatCard
          title="Jami xarajatlar (Chiqim)"
          value={`${summary.totalExpenses.toLocaleString('uz-UZ')} UZS`}
          subtitle={`${summary.expenseCount} ta qayd etilgan modda`}
          icon={<TrendingDown size={20} />}
          iconBgColor="bg-rose-50 text-rose-600"
        />

        <StatCard
          title="Sof operatsion natija"
          value={`${summary.netOperatingResult.toLocaleString('uz-UZ')} UZS`}
          subtitle="Tushumlar minus operatsion xarajatlar"
          icon={<Activity size={20} />}
          iconBgColor={
            summary.netOperatingResult >= 0
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-amber-50 text-amber-700'
          }
          badge={
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                summary.netOperatingResult >= 0
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {summary.netOperatingResult >= 0 ? 'Foydali' : 'Xarajat ortgan'}
            </span>
          }
        />
      </div>

      {/* Period Filter & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Period Selector */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-[#DFE8E4] shadow-2xs">
          {(
            [
              { key: 'today', label: 'Bugun' },
              { key: '7days', label: 'Oxirgi 7 kun' },
              { key: '30days', label: 'Oxirgi 30 kun' },
              { key: 'all', label: 'Barcha davr' },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setPeriod(t.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                period === t.key
                  ? 'bg-[#0D7C74] text-white shadow-xs'
                  : 'text-[#5F737B] hover:text-[#132229]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 bg-[#F4F7F5] p-1 rounded-xl border border-[#DFE8E4]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-[#132229] shadow-xs'
                : 'text-[#5F737B] hover:text-[#132229]'
            }`}
          >
            Barcha amallar ({periodTxs.length})
          </button>
          <button
            onClick={() => setActiveTab('kirim')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'kirim'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-[#5F737B] hover:text-[#132229]'
            }`}
          >
            Faqat Kirim
          </button>
          <button
            onClick={() => setActiveTab('chiqim')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'chiqim'
                ? 'bg-white text-rose-800 shadow-xs'
                : 'text-[#5F737B] hover:text-[#132229]'
            }`}
          >
            Faqat Chiqim
          </button>
          <button
            onClick={() => setActiveTab('breakdown')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'breakdown'
                ? 'bg-white text-[#0D7C74] shadow-xs'
                : 'text-[#5F737B] hover:text-[#132229]'
            }`}
          >
            Toifalar tahlili
          </button>
        </div>
      </div>

      {/* View: Breakdown Tab */}
      {activeTab === 'breakdown' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-sm font-bold text-[#132229] mb-1">
              Xarajat moddalari taqsimoti
            </h3>
            <p className="text-xs text-[#5F737B] mb-4">
              Tanlangan davr bo'yicha eng katta xarajat toifalari
            </p>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={3}
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number | string | readonly (string | number)[] | undefined) => [
                      `${Number(val || 0).toLocaleString('uz-UZ')} UZS`,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-[#132229] mb-1">
              Xarajat toifalari ro'yxati
            </h3>
            <p className="text-xs text-[#5F737B] mb-4">
              Summalar va foiz nisbati
            </p>

            <div className="divide-y divide-[#DFE8E4] text-xs">
              {expenseBreakdown.map((item, idx) => (
                <div key={item.category} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="font-semibold text-[#132229]">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#132229]">
                      {item.amount.toLocaleString()} UZS
                    </span>
                    <span className="text-[11px] text-[#5F737B] ml-2">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        /* View: Transactions Table */
        <Card className="p-0 overflow-hidden">
          {/* Table Search Header */}
          <div className="p-3.5 border-b border-[#DFE8E4] bg-[#F8FAF9] flex items-center justify-between">
            <div className="relative w-72">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F737B]"
              />
              <input
                type="text"
                placeholder="Tavsif, kvitansiya # yoki bemor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#DFE8E4] rounded-lg text-[#132229]"
              />
            </div>

            <span className="text-xs text-[#5F737B]">
              Ko'rsatilmoqda: <strong>{filteredTransactions.length}</strong> ta amal
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF9] border-b border-[#DFE8E4] text-[#5F737B] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-5 py-3.5">Kvitansiya #</th>
                  <th className="px-4 py-3.5">Turi</th>
                  <th className="px-4 py-3.5">Kategoriya va Tavsif</th>
                  <th className="px-4 py-3.5">Bemor / Xodim</th>
                  <th className="px-4 py-3.5">Sana va Vaqt</th>
                  <th className="px-4 py-3.5">To'lov usuli</th>
                  <th className="px-4 py-3.5 text-right">Summa (so'm)</th>
                  <th className="px-5 py-3.5 text-right">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8E4]/60">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-[#5F737B]">
                      Ushbu davr uchun operatsiyalar mavjud emas.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className={`hover:bg-[#F8FAF9] transition-colors ${
                        tx.isVoided ? 'opacity-50 line-through bg-gray-50' : ''
                      }`}
                    >
                      <td className="px-5 py-3.5 font-mono text-[11px] font-semibold text-[#0D7C74]">
                        {tx.receiptNumber}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            tx.type === 'kirim'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}
                        >
                          {tx.type === 'kirim' ? 'Kirim' : 'Chiqim'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[#132229]">
                        <div className="font-semibold">{tx.description}</div>
                        <span className="text-[10px] text-[#5F737B]">{tx.category}</span>
                      </td>
                      <td className="px-4 py-3.5 text-[#5F737B]">
                        {tx.patientName || '—'}
                      </td>
                      <td className="px-4 py-3.5 text-[#5F737B]">
                        <div>{tx.date}</div>
                        <div className="text-[10px]">{tx.time}</div>
                      </td>
                      <td className="px-4 py-3.5 text-[#5F737B]">
                        {tx.paymentMethod}
                      </td>
                      <td className="px-4 py-3.5 text-right font-bold">
                        <span
                          className={
                            tx.isVoided
                              ? 'text-gray-400'
                              : tx.type === 'kirim'
                              ? 'text-emerald-700'
                              : 'text-rose-600'
                          }
                        >
                          {tx.type === 'kirim' ? '+' : '-'}
                          {tx.amount.toLocaleString()} UZS
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {tx.isVoided ? (
                          <div className="text-[10px] text-rose-600 font-semibold" title={tx.voidReason}>
                            Bekor qilingan
                          </div>
                        ) : (
                          <button
                            onClick={() => setVoidModalTx(tx)}
                            className="p-1 rounded text-[#5F737B] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Tranzaksiyani bekor qilish (Void)"
                          >
                            <Ban size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Void Modal */}
      {voidModalTx && (
        <Modal
          isOpen={Boolean(voidModalTx)}
          onClose={() => {
            setVoidModalTx(null);
            setVoidReason('');
            setVoidError(null);
          }}
          title="Tranzaksiyani bekor qilish (Void)"
          subtitle={`Kvitansiya #${voidModalTx.receiptNumber} • ${voidModalTx.amount.toLocaleString()} UZS`}
          maxWidth="sm"
        >
          <form onSubmit={handleVoidSubmit} className="space-y-4 text-xs">
            <p className="text-[#5F737B]">
              Auditorlik va kassa qoidalariga ko'ra, bekor qilish sababi kiritilishi majburiy.
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Bekor qilish sababi <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Masalan: Bemor xizmatdan voz kechdi va to'lov qaytarildi..."
                value={voidReason}
                onChange={(e) => setVoidReason(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229] focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>

            {voidError && (
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200">
                {voidError}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-[#DFE8E4]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setVoidModalTx(null)}
              >
                Bekor qilish
              </Button>
              <Button type="submit" variant="danger" size="sm">
                Tasdiqlash va bekor qilish
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Income Modal */}
      {isAddIncomeOpen && (
        <Modal
          isOpen={isAddIncomeOpen}
          onClose={() => setIsAddIncomeOpen(false)}
          title="Kassaga kirim to'lovi qabul qilish"
          subtitle="To'lov kvitansiyasini yaratish va kassaga tushumni qayd etish"
          maxWidth="md"
        >
          <form onSubmit={handleIncomeSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Summa (so'm) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                step={5000}
                value={incAmount}
                onChange={(e) => setIncAmount(e.target.value)}
                className="w-full px-3 py-2 text-sm font-semibold bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#132229] mb-1">
                  Kategoriya
                </label>
                <select
                  value={incCategory}
                  onChange={(e) => setIncCategory(e.target.value as IncomeCategory)}
                  className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl"
                >
                  <option value="Konsultatsiya">Konsultatsiya</option>
                  <option value="Diagnostika va tahlil">Diagnostika va tahlil</option>
                  <option value="Muolaja xizmati">Muolaja xizmati</option>
                  <option value="Dori vositalari">Dori vositalari</option>
                  <option value="Boshqa xizmatlar">Boshqa xizmatlar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#132229] mb-1">
                  To'lov usuli
                </label>
                <select
                  value={incMethod}
                  onChange={(e) => setIncMethod(e.target.value as PaymentMethod)}
                  className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl"
                >
                  <option value="Karta (Uzcard/Humo)">Karta (Uzcard/Humo)</option>
                  <option value="Naqd">Naqd</option>
                  <option value="Payme / Click">Payme / Click</option>
                  <option value="Bank o'tkazmasi">Bank o'tkazmasi</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Bemor (ixtiyoriy)
              </label>
              <select
                value={incPatientId}
                onChange={(e) => setIncPatientId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl"
              >
                <option value="">-- Tanlanmagan --</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.phone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Tavsif
              </label>
              <input
                type="text"
                placeholder="Masalan: Birlamchi kardiolog ko'rigi uchun to'lov"
                value={incDesc}
                onChange={(e) => setIncDesc(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#DFE8E4]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddIncomeOpen(false)}
              >
                Bekor qilish
              </Button>
              <Button type="submit" variant="primary" size="sm">
                To'lovni qabul qilish
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Expense Modal */}
      {isAddExpenseOpen && (
        <Modal
          isOpen={isAddExpenseOpen}
          onClose={() => setIsAddExpenseOpen(false)}
          title="Klinika xarajatini qayd etish"
          subtitle="Chiqim orderi yaratish va xarajat moddalariga qo'shish"
          maxWidth="md"
        >
          <form onSubmit={handleExpenseSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Summa (so'm) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                step={5000}
                value={expAmount}
                onChange={(e) => setExpAmount(e.target.value)}
                className="w-full px-3 py-2 text-sm font-semibold bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl text-[#132229]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#132229] mb-1">
                  Xarajat moddasi
                </label>
                <select
                  value={expCategory}
                  onChange={(e) => setExpCategory(e.target.value as ExpenseCategory)}
                  className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl"
                >
                  <option value="Ijara">Ijara</option>
                  <option value="Ish haqi">Ish haqi</option>
                  <option value="Kommunal xarajatlar">Kommunal xarajatlar</option>
                  <option value="Tibbiy materiallar">Tibbiy materiallar</option>
                  <option value="Uskunalar">Uskunalar</option>
                  <option value="Boshqa xarajatlar">Boshqa xarajatlar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#132229] mb-1">
                  To'lov usuli
                </label>
                <select
                  value={expMethod}
                  onChange={(e) => setExpMethod(e.target.value as PaymentMethod)}
                  className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl"
                >
                  <option value="Bank o'tkazmasi">Bank o'tkazmasi</option>
                  <option value="Karta (Uzcard/Humo)">Karta (Uzcard/Humo)</option>
                  <option value="Naqd">Naqd</option>
                  <option value="Payme / Click">Payme / Click</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#132229] mb-1">
                Tavsif
              </label>
              <input
                type="text"
                placeholder="Masalan: Shprislar va bir martalik niqoblar partiyasi"
                value={expDesc}
                onChange={(e) => setExpDesc(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F7F5] border border-[#DFE8E4] rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#DFE8E4]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddExpenseOpen(false)}
              >
                Bekor qilish
              </Button>
              <Button type="submit" variant="danger" size="sm">
                Xarajatni saqlash
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
