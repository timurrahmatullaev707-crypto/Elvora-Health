import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Download,
  Printer,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  Stethoscope,
  PieChart as PieIcon,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { financeService } from '../services/financeService';
import { doctorService } from '../services/doctorService';
import { getTodayDateString } from '../services/seedData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export const ReportsPage: React.FC = () => {
  const { appointments, transactions, doctors, showToast } = useApp();

  const [reportPeriod, setReportPeriod] = useState<'7days' | '30days' | 'all'>('30days');

  const { summary, transactions: periodTxs } = useMemo(() => {
    return financeService.getSummaryForPeriod(reportPeriod);
  }, [reportPeriod, transactions]);

  // Appointment Status Counts
  const statusStats = useMemo(() => {
    const total = appointments.length;
    const completed = appointments.filter((a) => a.status === 'yakunlandi').length;
    const missed = appointments.filter((a) => a.status === 'kelmagan').length;
    const cancelled = appointments.filter((a) => a.status === 'bekor_qilindi').length;
    const waitingOrActive = appointments.filter(
      (a) => a.status === 'kutilmoqda' || a.status === 'qabulda'
    ).length;

    return {
      total,
      completed,
      missed,
      cancelled,
      waitingOrActive,
      noShowRate: total > 0 ? Math.round((missed / total) * 100) : 0,
    };
  }, [appointments]);

  // Doctor Productivity Table
  const doctorStats = useMemo(() => {
    return doctors.map((doc) => {
      const docApts = appointments.filter(
        (a) => a.doctorId === doc.id && a.status === 'yakunlandi'
      );
      const totalGenerated = docApts.reduce((sum, a) => sum + (a.fee || 0), 0);
      return {
        doctor: doc,
        completedCount: docApts.length,
        totalGenerated,
      };
    }).sort((a, b) => b.totalGenerated - a.totalGenerated);
  }, [doctors, appointments]);

  // Expense breakdown
  const expenseBreakdown = useMemo(() => {
    return financeService.getExpenseBreakdown(periodTxs);
  }, [periodTxs]);

  const COLORS = ['#008BFF', '#2563EB', '#F59E0B', '#EF4444', '#8B5CF6', '#10B981'];

  // Export CSV
  const handleExportCsv = () => {
    const csvContent = financeService.exportToCsv(periodTxs);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `elvora_hisobot_${reportPeriod}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Birlashtirilgan tahliliy hisobot CSV formatida yuklab olindi', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#132229] tracking-tight">
            Hisobotlar va operatsion tahlil
          </h1>
          <p className="text-xs text-[#5F737B] mt-0.5">
            Klinikaning asosiy moliyaviy va klinik samaradorlik ko'rsatkichlari yig'indisi
          </p>
        </div>

        <div className="flex items-center gap-2.5">
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
        </div>
      </div>

      {/* Period Filter */}
      <div className="flex items-center bg-white p-1 rounded-xl border border-[#DFE8E4] shadow-2xs w-fit">
        {(
          [
            { key: '7days', label: 'Oxirgi 7 kun' },
            { key: '30days', label: 'Oxirgi 30 kun' },
            { key: 'all', label: 'Barcha davr' },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => setReportPeriod(t.key)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              reportPeriod === t.key
                ? 'bg-[#008BFF] text-white shadow-xs'
                : 'text-[#5F737B] hover:text-[#132229]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-[#5F737B] uppercase">
            Jami tushum (Kirim)
          </span>
          <div className="text-xl font-bold text-[#132229] mt-1">
            {summary.totalIncome.toLocaleString()} UZS
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            {summary.incomeCount} ta muvaffaqiyatli qabul
          </span>
        </Card>

        <Card className="p-4">
          <span className="text-[11px] font-semibold text-[#5F737B] uppercase">
            Jami xarajatlar
          </span>
          <div className="text-xl font-bold text-rose-600 mt-1">
            {summary.totalExpenses.toLocaleString()} UZS
          </div>
          <span className="text-[11px] text-[#5F737B] block mt-1">
            {summary.expenseCount} ta chiqim orderi
          </span>
        </Card>

        <Card className="p-4">
          <span className="text-[11px] font-semibold text-[#5F737B] uppercase">
            Sof operatsion natija
          </span>
          <div
            className={`text-xl font-bold mt-1 ${
              summary.netOperatingResult >= 0 ? 'text-emerald-700' : 'text-amber-600'
            }`}
          >
            {summary.netOperatingResult.toLocaleString()} UZS
          </div>
          <span className="text-[11px] text-[#5F737B] block mt-1">
            Operatsion marja
          </span>
        </Card>

        <Card className="p-4">
          <span className="text-[11px] font-semibold text-[#5F737B] uppercase">
            No-Show (Kelmaganlar nisbati)
          </span>
          <div className="text-xl font-bold text-amber-600 mt-1">
            {statusStats.noShowRate}%
          </div>
          <span className="text-[11px] text-[#5F737B] block mt-1">
            {statusStats.missed} nafar kutilmagan bekor
          </span>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doctor Productivity Chart */}
        <Card>
          <div className="mb-4 pb-3 border-b border-[#DFE8E4]">
            <h3 className="text-sm font-bold text-[#132229]">
              Shifokorlar kesimida tushum generatsiyasi
            </h3>
            <p className="text-xs text-[#5F737B]">
              Yakunlangan qabullar asosida keltirilgan daromad (UZS)
            </p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={doctorStats}
                margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" />
                <XAxis
                  dataKey="doctor.fullName"
                  tick={{ fontSize: 10, fill: '#5F737B' }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#5F737B' }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val: number | string | readonly (string | number)[] | undefined) => [
                    `${Number(val || 0).toLocaleString('uz-UZ')} UZS`,
                    'Tushum',
                  ]}
                />
                <Bar dataKey="totalGenerated" fill="#008BFF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Expense Category Share */}
        <Card>
          <div className="mb-4 pb-3 border-b border-[#DFE8E4]">
            <h3 className="text-sm font-bold text-[#132229]">
              Xarajat toifalari taqsimoti
            </h3>
            <p className="text-xs text-[#5F737B]">
              Operatsion xarajatlar tarkibi
            </p>
          </div>

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
                  innerRadius={45}
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
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Doctor Productivity Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-3.5 border-b border-[#DFE8E4] bg-[#F8FAF9]">
          <h3 className="text-xs font-bold text-[#132229] uppercase tracking-wider">
            Shifokorlar samaradorligi tafsilotlari
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF9] border-b border-[#DFE8E4] text-[#5F737B] font-semibold uppercase text-[10px]">
              <tr>
                <th className="px-5 py-3">Shifokor</th>
                <th className="px-4 py-3">Mutaxassislik</th>
                <th className="px-4 py-3">Qabul narxi</th>
                <th className="px-4 py-3 text-center">Yakunlangan qabullar</th>
                <th className="px-5 py-3 text-right">Klinikaga keltirilgan tushum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFE8E4]/60">
              {doctorStats.map((item) => (
                <tr key={item.doctor.id} className="hover:bg-[#F8FAF9]">
                  <td className="px-5 py-3 font-semibold text-[#132229]">
                    {item.doctor.fullName}
                  </td>
                  <td className="px-4 py-3 text-[#5F737B]">
                    {item.doctor.specialty}
                  </td>
                  <td className="px-4 py-3 font-mono text-[#5F737B]">
                    {item.doctor.consultationFee.toLocaleString()} UZS
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-[#008BFF]">
                    {item.completedCount} ta
                  </td>
                  <td className="px-5 py-3 text-right font-bold text-emerald-700">
                    {item.totalGenerated.toLocaleString()} UZS
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
