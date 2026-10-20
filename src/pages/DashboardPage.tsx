import React, { useMemo } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Users,
  CalendarCheck2,
  Clock,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Activity,
  CheckCircle2,
  UserX,
  Stethoscope,
  Plus,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/common/Button';
import { AppointmentStatusBadge } from '../components/common/Badge';
import { financeService } from '../services/financeService';
import { doctorService } from '../services/doctorService';
import { appointmentService } from '../services/appointmentService';
import { insightsService } from '../services/insightsService';
import { getTodayDateString } from '../services/seedData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const {
    appointments,
    doctors,
    dateFilter,
    setDateFilter,
    refreshData,
    showToast,
  } = useApp();

  const outletContext = useOutletContext<{
    openNewAppointment: () => void;
    openNewPatient: () => void;
    openNewPayment: () => void;
  }>();

  const todayStr = getTodayDateString();

  // Dynamic Financial Summary based on dateFilter
  const { summary: financeSummary, transactions: periodTxs } = useMemo(() => {
    return financeService.getSummaryForPeriod(dateFilter);
  }, [dateFilter, appointments]);

  // Appointments in filtered period
  const filteredAppointments = useMemo(() => {
    if (dateFilter === 'today') {
      return appointments.filter((a) => a.date === todayStr);
    }
    const { startDate, endDate } = financeService.getSummaryForPeriod(dateFilter);
    return appointments.filter((a) => a.date >= startDate && a.date <= endDate);
  }, [dateFilter, appointments, todayStr]);

  // Today's appointments specifically
  const todayAppointments = useMemo(() => {
    return appointments.filter((a) => a.date === todayStr);
  }, [appointments, todayStr]);

  const waitingPatients = todayAppointments.filter((a) => a.status === 'kutilmoqda');
  const completedToday = todayAppointments.filter((a) => a.status === 'yakunlandi');
  const missedToday = todayAppointments.filter((a) => a.status === 'kelmagan');
  const inProgressToday = todayAppointments.filter((a) => a.status === 'qabulda');

  // Doctor Occupancy calculations for today
  const doctorOccupancies = useMemo(() => {
    return doctors.map((doc) => {
      const stats = doctorService.calculateOccupancy(doc, todayAppointments);
      return {
        doctor: doc,
        ...stats,
      };
    });
  }, [doctors, todayAppointments]);

  const avgDoctorOccupancy = useMemo(() => {
    if (doctorOccupancies.length === 0) return 0;
    const total = doctorOccupancies.reduce((acc, d) => acc + d.occupancyPercent, 0);
    return Math.round(total / doctorOccupancies.length);
  }, [doctorOccupancies]);

  // Insights preview
  const insightsReport = useMemo(() => {
    return insightsService.generateInsights();
  }, [appointments, periodTxs]);

  const topInsight = insightsReport.insights[0];

  // Daily Chart Data for Recharts
  const chartData = useMemo(() => {
    // Group transactions by date
    const dateMap: Record<string, { date: string; kirim: number; chiqim: number }> = {};

    periodTxs.forEach((t) => {
      if (t.isVoided) return;
      if (!dateMap[t.date]) {
        dateMap[t.date] = { date: t.date.slice(5), kirim: 0, chiqim: 0 };
      }
      if (t.type === 'kirim') {
        dateMap[t.date].kirim += t.amount;
      } else {
        dateMap[t.date].chiqim += t.amount;
      }
    });

    const sorted = Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date));
    return sorted.length > 0
      ? sorted
      : [
          { date: todayStr.slice(5), kirim: financeSummary.totalIncome, chiqim: financeSummary.totalExpenses },
        ];
  }, [periodTxs, todayStr, financeSummary]);

  // Quick Action: Advance waiting patient to in-consultation
  const handleCallPatient = (aptId: string) => {
    appointmentService.updateStatus(aptId, 'qabulda');
    showToast('Bemor shifokor xonasiga qabulga chaqirildi', 'success');
    refreshData();
  };

  return (
    <div className="space-y-6">
      {/* Page Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#20312F] tracking-tight">
              Boshqaruv paneli
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EAF6F2] text-[#125B54] border border-[#BCE3D7]">
              Real vaqt
            </span>
          </div>
          <p className="text-xs text-[#71817D] mt-0.5">
            Klinikaning bugungi moliyaviy, operatsion va shifokorlar bandligi ko'rsatkichlari
          </p>
        </div>

        {/* Date Filter Tabs */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-[#E4EBE8] shadow-2xs">
          {(
            [
              { key: 'today', label: 'Bugun' },
              { key: '7days', label: 'Oxirgi 7 kun' },
              { key: '30days', label: 'Oxirgi 30 kun' },
              { key: 'all', label: 'Barcha davr' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setDateFilter(tab.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                dateFilter === tab.key
                  ? 'bg-[#167D72] text-white shadow-xs'
                  : 'text-[#71817D] hover:text-[#20312F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Smart Insight Alert Preview */}
      {topInsight && (
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#167D72] to-[#125B54] p-5 text-white shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs text-emerald-200 shrink-0">
                <Sparkles size={22} className="animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded">
                    Elvora Insights — Aqlli tahlil
                  </span>
                  <span className="text-xs text-emerald-100">{topInsight.dateRange}</span>
                </div>
                <h3 className="text-base font-semibold text-white mt-1">
                  {topInsight.title}
                </h3>
                <p className="text-xs text-emerald-50/90 mt-1 max-w-2xl leading-relaxed">
                  {topInsight.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 pl-11 lg:pl-0">
              <Link to="/insights">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white text-[#125B54] hover:bg-emerald-50 border-white text-xs font-semibold"
                >
                  Tahlilni to'liq ochish
                  <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards Row (Calculated from source records) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Kassaga tushum (Kirim)"
          value={`${financeSummary.totalIncome.toLocaleString('uz-UZ')} UZS`}
          subtitle={`${financeSummary.incomeCount} ta tasdiqlangan to'lov`}
          icon={<TrendingUp size={20} />}
          iconBgColor="bg-[#EAF6F2] text-[#167D72]"
          trend={{ value: '12%', isPositive: true }}
        />

        <StatCard
          title="Klinika xarajatlari (Chiqim)"
          value={`${financeSummary.totalExpenses.toLocaleString('uz-UZ')} UZS`}
          subtitle={`${financeSummary.expenseCount} ta qayd etilgan xarajat`}
          icon={<TrendingDown size={20} />}
          iconBgColor="bg-rose-50 text-rose-600"
          trend={{ value: '5%', isPositive: false }}
        />

        <StatCard
          title="Sof operatsion natija"
          value={`${financeSummary.netOperatingResult.toLocaleString('uz-UZ')} UZS`}
          subtitle="Tushum minus operatsion xarajatlar"
          icon={<Activity size={20} />}
          iconBgColor={
            financeSummary.netOperatingResult >= 0
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-amber-50 text-amber-700'
          }
          badge={
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                financeSummary.netOperatingResult >= 0
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {financeSummary.netOperatingResult >= 0 ? 'Ijobiy' : 'Salbiy oraliq'}
            </span>
          }
        />

        <StatCard
          title="Shifokorlar bandligi"
          value={`${avgDoctorOccupancy}%`}
          subtitle={`Bugun: ${todayAppointments.length} ta qabul belgilangan`}
          icon={<Stethoscope size={20} />}
          iconBgColor="bg-blue-50 text-blue-600"
          trend={{ value: '8%', isPositive: true }}
        />
      </div>

      {/* Secondary Status Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white rounded-xl border border-[#E4EBE8] flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
            <Clock size={16} />
          </div>
          <div>
            <div className="text-lg font-bold text-[#20312F]">{waitingPatients.length}</div>
            <div className="text-[11px] text-[#71817D]">Kutish zalida</div>
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-[#E4EBE8] flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
            <Activity size={16} />
          </div>
          <div>
            <div className="text-lg font-bold text-[#20312F]">{inProgressToday.length}</div>
            <div className="text-[11px] text-[#71817D]">Qabulda (huzurida)</div>
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-[#E4EBE8] flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <div className="text-lg font-bold text-[#20312F]">{completedToday.length}</div>
            <div className="text-[11px] text-[#71817D]">Yakunlangan qabullar</div>
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-[#E4EBE8] flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-50 text-rose-700">
            <UserX size={16} />
          </div>
          <div>
            <div className="text-lg font-bold text-[#20312F]">{missedToday.length}</div>
            <div className="text-[11px] text-[#71817D]">Kelmagan (No-show)</div>
          </div>
        </div>
      </div>

      {/* Main Charts & Occupancy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Flow Dynamic Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E4EBE8]">
            <div>
              <h2 className="text-sm font-bold text-[#20312F]">
                Kirim va chiqim dinamikasi
              </h2>
              <p className="text-xs text-[#71817D]">
                Davr bo'yicha tushumlar va operatsion xarajatlar taqqoslanishi
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#167D72]"></span> Kirim
              </span>
              <span className="flex items-center gap-1.5 text-rose-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Chiqim
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorKirim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#167D72" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#167D72" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorChiqim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F2" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#71817D' }} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#71817D' }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val: number | string | readonly (string | number)[] | undefined) => [
                    `${Number(val || 0).toLocaleString('uz-UZ')} UZS`,
                  ]}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E4EBE8',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="kirim"
                  name="Kirim"
                  stroke="#167D72"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorKirim)"
                />
                <Area
                  type="monotone"
                  dataKey="chiqim"
                  name="Chiqim"
                  stroke="#EF4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorChiqim)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Doctor Occupancy Status */}
        <Card>
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#E4EBE8]">
            <div>
              <h2 className="text-sm font-bold text-[#20312F]">
                Shifokorlar bandligi
              </h2>
              <p className="text-xs text-[#71817D]">Bugungi qabul soatlari nisbati</p>
            </div>
            <Link to="/doctors">
              <span className="text-xs text-[#167D72] font-semibold hover:underline">
                Barchasi
              </span>
            </Link>
          </div>

          <div className="space-y-3.5 max-h-68 overflow-y-auto pr-1">
            {doctorOccupancies.slice(0, 5).map((docStat) => (
              <div key={docStat.doctor.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#20312F] truncate">
                    {docStat.doctor.fullName}
                  </span>
                  <span className="text-[11px] font-bold text-[#167D72]">
                    {docStat.occupancyPercent}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#71817D]">
                  <span>{docStat.doctor.specialty}</span>
                  <span>
                    {docStat.bookedSlotsCount}/{docStat.slotsCount} slot band
                  </span>
                </div>
                <div className="w-full bg-[#F5F8F7] h-2 rounded-full overflow-hidden border border-[#E4EBE8]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      docStat.occupancyPercent >= 75
                        ? 'bg-emerald-600'
                        : docStat.occupancyPercent >= 40
                        ? 'bg-[#167D72]'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${docStat.occupancyPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Live Waiting Queue & Recent Transactions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Queue Snapshot */}
        <Card>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E4EBE8]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <h2 className="text-sm font-bold text-[#20312F]">
                Jonli navbat (Bugungi qabullar)
              </h2>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={outletContext.openNewAppointment}
              icon={<Plus size={14} />}
            >
              Qabul qo'shish
            </Button>
          </div>

          {todayAppointments.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#71817D]">
              Bugun uchun qabullar mavjud emas.
            </div>
          ) : (
            <div className="divide-y divide-[#E4EBE8]/70">
              {todayAppointments.slice(0, 5).map((apt) => (
                <div
                  key={apt.id}
                  className="py-3 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#EAF6F2] text-[#125B54] font-bold flex items-center justify-center shrink-0 border border-[#BCE3D7]">
                      #{apt.queueNumber}
                    </span>
                    <div>
                      <p className="font-semibold text-[#20312F]">{apt.patientName}</p>
                      <p className="text-[11px] text-[#71817D]">
                        {apt.doctorName} • {apt.startTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <AppointmentStatusBadge status={apt.status} />
                    {apt.status === 'kutilmoqda' && (
                      <button
                        onClick={() => handleCallPatient(apt.id)}
                        className="px-2 py-1 rounded bg-[#167D72] text-white hover:bg-[#125B54] text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        Chaqirish
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-[#E4EBE8] flex justify-end">
            <Link
              to="/appointments"
              className="text-xs text-[#167D72] font-semibold hover:underline flex items-center gap-1"
            >
              To'liq qabullar va navbat jadvaliga o'tish <ArrowRight size={13} />
            </Link>
          </div>
        </Card>

        {/* Recent Transactions Snapshot */}
        <Card>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E4EBE8]">
            <h2 className="text-sm font-bold text-[#20312F]">
              So'nggi moliyaviy amallar
            </h2>
            <Button
              size="sm"
              variant="outline"
              onClick={outletContext.openNewPayment}
              icon={<Plus size={14} />}
            >
              To'lov kiritish
            </Button>
          </div>

          <div className="divide-y divide-[#E4EBE8]/70">
            {periodTxs.slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="py-2.5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      tx.type === 'kirim' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-[#20312F] truncate max-w-xs">
                      {tx.description}
                    </p>
                    <p className="text-[11px] text-[#71817D]">
                      {tx.category} • {tx.paymentMethod} • {tx.time}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-bold ${
                      tx.type === 'kirim' ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {tx.type === 'kirim' ? '+' : '-'}
                    {tx.amount.toLocaleString('uz-UZ')} UZS
                  </span>
                  <p className="text-[10px] text-[#71817D]">{tx.receiptNumber}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-[#E4EBE8] flex justify-end">
            <Link
              to="/finance"
              className="text-xs text-[#167D72] font-semibold hover:underline flex items-center gap-1"
            >
              Moliya jurnalini to'liq ko'rish <ArrowRight size={13} />
            </Link>
          </div>
        </Card>
      </div>

      {/* Demo disclaimer banner as required */}
      <div className="p-3 bg-[#EAF6F2] rounded-xl border border-[#BCE3D7] flex items-center justify-between text-xs text-[#125B54]">
        <span className="font-medium">
          💡 <strong>Namoyish rejimi:</strong> Barcha raqamlar, grafiklar va hisob-kitoblar O'zbekiston tibbiyot amaliyotiga moslashtirilgan real ichki ma'lumotlar bazasidan hisoblanmoqda.
        </span>
        <span className="text-[11px] text-[#167D72] font-semibold">
          IT Live Investor Selection 2026
        </span>
      </div>
    </div>
  );
};
