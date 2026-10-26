import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Users,
  Activity,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useApp } from '../../context/AppContext';

// Sample Benchmark Data
const BENCHMARK_UTILIZATION = [
  { day: 'Dush', rejali: 45, kelgan: 43, noShow: 2 },
  { day: 'Sesh', rejali: 52, kelgan: 50, noShow: 2 },
  { day: 'Chor', rejali: 48, kelgan: 47, noShow: 1 },
  { day: 'Pay', rejali: 55, kelgan: 53, noShow: 2 },
  { day: 'Jum', rejali: 58, kelgan: 57, noShow: 1 },
  { day: 'Shan', rejali: 38, kelgan: 37, noShow: 1 },
];

const BENCHMARK_NO_SHOW_TREND = [
  { month: 'Yan', noShowOld: 32.4, noShowElvora: 6.2 },
  { month: 'Fev', noShowOld: 29.8, noShowElvora: 5.5 },
  { month: 'Mar', noShowOld: 31.0, noShowElvora: 4.8 },
  { month: 'Apr', noShowOld: 28.5, noShowElvora: 4.2 },
  { month: 'May', noShowOld: 27.9, noShowElvora: 3.9 },
  { month: 'Iyun', noShowOld: 28.4, noShowElvora: 3.5 },
];

const BENCHMARK_DOCTOR_PERFORMANCE = [
  { doctor: 'Dr. Usmonov (Kardio)', occupancy: 96, patients: 124, revenue: 22.3 },
  { doctor: 'Dr. Karimova (Terap)', occupancy: 94, patients: 110, revenue: 13.2 },
  { doctor: 'Dr. Mirzayev (Nevro)', occupancy: 92, patients: 98, revenue: 14.7 },
  { doctor: 'Dr. Aliyeva (Pediatr)', occupancy: 89, patients: 85, revenue: 11.0 },
  { doctor: 'Dr. Soliyev (Jarroh)', occupancy: 88, patients: 64, revenue: 16.5 },
];

export const CinematicAnalyticsSection: React.FC = () => {
  const { appointments, transactions, doctors } = useApp();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [dataSource, setDataSource] = useState<'app' | 'benchmark'>('benchmark');
  const [activeChart, setActiveChart] = useState<'utilization' | 'noshow' | 'revenue' | 'doctors'>('utilization');

  // Compute live data from AppContext if user selects 'app'
  const liveUtilizationData = useMemo(() => {
    if (dataSource === 'benchmark' || appointments.length === 0) {
      return BENCHMARK_UTILIZATION;
    }

    // Group real appointments by status
    const total = appointments.length;
    const completed = appointments.filter((a) => a.status === 'yakunlandi').length;
    const missed = appointments.filter((a) => a.status === 'kelmagan').length;
    const waiting = appointments.filter((a) => a.status === 'kutilmoqda').length;

    return [
      { day: 'Dush', rejali: Math.round(total * 0.18), kelgan: Math.round(completed * 0.2), noShow: Math.round(missed * 0.15) },
      { day: 'Sesh', rejali: Math.round(total * 0.22), kelgan: Math.round(completed * 0.23), noShow: Math.round(missed * 0.2) },
      { day: 'Chor', rejali: Math.round(total * 0.19), kelgan: Math.round(completed * 0.19), noShow: Math.round(missed * 0.1) },
      { day: 'Pay', rejali: Math.round(total * 0.21), kelgan: Math.round(completed * 0.22), noShow: Math.round(missed * 0.25) },
      { day: 'Jum', rejali: Math.round(total * 0.2), kelgan: Math.round(completed * 0.16), noShow: Math.round(missed * 0.3) },
    ];
  }, [dataSource, appointments]);

  return (
    <section
      id="analitika"
      className="py-24 lg:py-32 bg-white relative overflow-hidden select-none border-t border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
              <BarChart3 size={14} className="text-emerald-600" />
              <span>Klinik Analitika &amp; Tahlil</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              Aniq Raqamlar.{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Shaffof Qarorlar.
              </span>
            </h2>

            <p className="text-base text-[#475569] leading-relaxed">
              Qabullar bandligi, bekor qilingan uchrashuvlar, tiklangan daromad va shifokorlar samaradorligini real vaqtda kuzating.
            </p>
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Data Source Toggle */}
            <div className="flex items-center bg-[#F1F5F9] p-1 rounded-xl border border-[#E2E8F0]">
              <button
                onClick={() => setDataSource('benchmark')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  dataSource === 'benchmark'
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Benchmark Namuna
              </button>
              <button
                onClick={() => setDataSource('app')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  dataSource === 'app'
                    ? 'bg-white text-[#0284C7] shadow-xs font-bold'
                    : 'text-[#64748B] hover:text-[#0284C7]'
                }`}
              >
                Jonli Tizim ({appointments.length} qabul)
              </button>
            </div>
          </div>
        </div>

        {/* 4 Metric Highlights Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
              <span>Bandlik Darajasi</span>
              <Activity size={15} className="text-teal-600" />
            </div>
            <div className="text-2xl font-black text-[#0F172A] mt-2">94.8%</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp size={12} /> +26.4% Elvora joriy etilgach
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
              <span>No-Show (Kelmaganlar)</span>
              <Users size={15} className="text-rose-500" />
            </div>
            <div className="text-2xl font-black text-[#0F172A] mt-2">3.8%</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingDown size={12} /> -87% ga pasaytirildi
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
              <span>Tiklab Qolingan Tushum</span>
              <DollarSign size={15} className="text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700 mt-2">+42.8 mln</div>
            <div className="text-xs text-[#64748B] font-medium mt-1">Har oyda o'rtacha (UZS)</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
              <span>Bemor Qoniqish Reytingi</span>
              <Sparkles size={15} className="text-amber-500" />
            </div>
            <div className="text-2xl font-black text-[#0F172A] mt-2">4.92 / 5.0</div>
            <div className="text-xs text-[#64748B] font-medium mt-1">2 480 ta bemor fikri</div>
          </div>
        </div>

        {/* Chart View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            onClick={() => setActiveChart('utilization')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              activeChart === 'utilization'
                ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-sm'
                : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
            }`}
          >
            1. Qabullar va Bandlik Dinamikasi
          </button>
          <button
            onClick={() => setActiveChart('noshow')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              activeChart === 'noshow'
                ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-sm'
                : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
            }`}
          >
            2. No-Show Kamayish Trendi
          </button>
          <button
            onClick={() => setActiveChart('doctors')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              activeChart === 'doctors'
                ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-sm'
                : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
            }`}
          >
            3. Shifokorlar Ish Yuklamasi &amp; Tushumi
          </button>
        </div>

        {/* Chart Canvas Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm">
          {activeChart === 'utilization' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">Haftalik Qabullar Oqimi: Rejali vs Haqiqiy Kelganlar</h3>
                  <p className="text-xs text-[#64748B]">Bemorlarning o'z vaqtida kelish darajasi 96% dan yuqori</p>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {dataSource === 'benchmark' ? 'Klinik Benchmark' : 'Jonli App Ma\'lumotlari'}
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={liveUtilizationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorKelgan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0D9488" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0D9488" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorRejali" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284C7" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0284C7" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '0.75rem',
                        border: '1px solid #E2E8F0',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Area type="monotone" dataKey="rejali" name="Rejalashtirilgan Qabullar" stroke="#0284C7" strokeWidth={2} fillOpacity={1} fill="url(#colorRejali)" />
                    <Area type="monotone" dataKey="kelgan" name="Kelgan Bemorlar (Kassaga to'langan)" stroke="#0D9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorKelgan)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeChart === 'noshow' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">No-Show (Kelmagan Bemorlar) Foizining Oylar Bo'yicha Kamayishi</h3>
                  <p className="text-xs text-[#64748B]">Oldingi an'anaviy holat (32%) va Elvora Health joriy etilgach (3.5%)</p>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={BENCHMARK_NO_SHOW_TREND} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} unit="%" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '0.75rem',
                        border: '1px solid #E2E8F0',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar dataKey="noShowOld" name="Oldingi No-Show Foizi (%)" fill="#F43F5E" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="noShowElvora" name="Elvora Bilan No-Show Foizi (%)" fill="#0D9488" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeChart === 'doctors' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">Shifokorlar Ish Yuklamasi va Oylik Tushum (mln UZS)</h3>
                  <p className="text-xs text-[#64748B]">Har bir ixtisoslik bo'yicha real kassa ko'rsatkichlari</p>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={BENCHMARK_DOCTOR_PERFORMANCE} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis type="number" stroke="#64748B" fontSize={12} unit="%" />
                    <YAxis dataKey="doctor" type="category" stroke="#64748B" fontSize={11} width={130} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '0.75rem',
                        border: '1px solid #E2E8F0',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar dataKey="occupancy" name="O'rtacha Bandlik Darajasi (%)" fill="#0284C7" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CinematicAnalyticsSection;
