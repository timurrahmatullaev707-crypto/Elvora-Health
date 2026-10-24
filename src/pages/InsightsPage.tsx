import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  HelpCircle,
  Database,
  RefreshCw,
  Bell,
  Send,
  MessageSquare,
  Clock,
  UserCheck,
  Ban,
  Activity,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { FeatureGate } from '../components/common/FeatureGate';
import { insightsService } from '../services/insightsService';
import { doctorService } from '../services/doctorService';
import { reminderService } from '../services/reminderService';
import { AiReminder } from '../types/ai';

export const InsightsPage: React.FC = () => {
  const { appointments, transactions, doctors, settings, refreshData, showToast } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'financial' | 'operational' | 'warning' | 'opportunity'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reminders, setReminders] = useState<AiReminder[]>(() => reminderService.getAll());
  const [dispatchingId, setDispatchingId] = useState<string | null>(null);

  // Compute live insights based on real application dataset
  const {
    insights,
    lastAnalyzedAt,
    totalAnalyzedAppointments,
    totalAnalyzedTransactions,
  } = useMemo(() => {
    return insightsService.generateInsights();
  }, [appointments, transactions, doctors]);

  // Compute AI Admin Metrics
  const metrics = useMemo(() => {
    const totalApts = appointments.length;
    const noShowApts = appointments.filter((a) => a.status === 'kelmagan');
    const noShowRate = totalApts > 0 ? ((noShowApts.length / totalApts) * 100).toFixed(1) : '0';

    // Lost revenue from no-shows
    const lostNoShowRevenue = noShowApts.reduce((sum, a) => sum + (a.fee || 130000), 0);

    // Calculate empty slots and occupancy across active doctors for today
    const today = new Date().toISOString().slice(0, 10);
    const todayApts = appointments.filter((a) => a.date === today);

    let totalWorkingMins = 0;
    let bookedMins = 0;
    let totalEmptySlotsToday = 0;

    doctors.filter((d) => d.isActive).forEach((doc) => {
      const occ = doctorService.calculateOccupancy(doc, todayApts);
      totalWorkingMins += occ.totalWorkingMinutes;
      bookedMins += occ.bookedMinutes;
      totalEmptySlotsToday += Math.max(0, occ.slotsCount - occ.bookedSlotsCount);
    });

    const averageUtilization =
      totalWorkingMins > 0 ? Math.round((bookedMins / totalWorkingMins) * 100) : 0;
    const lostEmptySlotsEstimate = totalEmptySlotsToday * 130000;

    return {
      totalApts,
      noShowCount: noShowApts.length,
      noShowRate,
      lostNoShowRevenue,
      averageUtilization,
      totalEmptySlotsToday,
      lostEmptySlotsEstimate,
      totalPotentialLoss: lostNoShowRevenue + lostEmptySlotsEstimate,
    };
  }, [appointments, doctors]);

  const filteredInsights = useMemo(() => {
    if (activeFilter === 'all') return insights;
    return insights.filter((item) => item.type === activeFilter);
  }, [insights, activeFilter]);

  const handleManualReanalyze = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      refreshData();
      setReminders(reminderService.getAll());
      setIsRefreshing(false);
      showToast('Klinika operatsion ma\'lumotlari to\'liq qayta tahlil qilindi', 'success');
    }, 400);
  };

  const handleDispatchReminder = async (id: string) => {
    setDispatchingId(id);
    const result = await reminderService.dispatchReminder(id);
    setReminders(reminderService.getAll());
    setDispatchingId(null);
    showToast(result.note, result.success ? 'success' : 'warning');
  };

  const handleToggleOptOut = (id: string, currentConsent: boolean) => {
    const updated = reminderService.toggleOptOut(id, currentConsent);
    if (updated) {
      setReminders(reminderService.getAll());
      showToast(
        currentConsent ? 'Bemor eslatmani rad etdi (Opt-out)' : 'Eslatmalarga qayta rozilik berildi',
        'info'
      );
    }
  };

  return (
    <FeatureGate feature="insights" requiredPlanName="Pro yoki Business">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#132229] tracking-tight flex items-center gap-2">
                <Sparkles size={22} className="text-[#008BFF]" />
                Elvora AI Insights™
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF7FC] text-[#0D34B4] border border-[#BAE6FD]">
                Klinik Neyro-Modul
              </span>
            </div>
            <p className="text-xs text-[#5F737B] mt-0.5">
              Ichki kassa, qabullar va shifokorlar ish grafigi asosida hisoblangan amaliy xulosa va bashoratlar
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              size="sm"
              variant="outline"
              icon={<RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />}
              onClick={handleManualReanalyze}
            >
              Qayta hisoblash
            </Button>

            <div className="text-[11px] text-[#5F737B] bg-white px-3 py-1.5 rounded-xl border border-[#DFE8E4] shadow-2xs">
              Oxirgi tahlil: <strong>{lastAnalyzedAt}</strong>
            </div>
          </div>
        </div>

        {/* AI Executive KPI Grid (distinguishing real facts from AI estimates) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: No-Show Rate */}
          <Card className="p-4 bg-white border border-[#DFE8E4] space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#5F737B]">Kelmagan bemorlar (No-Show)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF7FC] text-[#0D34B4] border border-[#BAE6FD]">
                FAKT
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#132229]">{metrics.noShowRate}%</span>
              <span className="text-xs text-[#E02D3C] font-semibold flex items-center">
                <TrendingDown size={14} /> {metrics.noShowCount} ta qabul
              </span>
            </div>
            <p className="text-[11px] text-[#5F737B] leading-tight">
              Rejalashtirilgan {metrics.totalApts} ta qabuldan kelmaganlar nisbati.
            </p>
          </Card>

          {/* Card 2: Estimated Revenue Loss */}
          <Card className="p-4 bg-white border border-[#DFE8E4] space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#5F737B]">Yo'qotilgan potentsial tushum</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                TAXMIL
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#DC2626]">
                ~{metrics.totalPotentialLoss.toLocaleString('uz-UZ')}
              </span>
              <span className="text-xs font-bold text-[#5F737B]">UZS</span>
            </div>
            <p className="text-[11px] text-[#5F737B] leading-tight">
              Kelmaganlar va bo'sh qolgan slotlar tahlili asosida hisoblangan.
            </p>
          </Card>

          {/* Card 3: Doctor Schedule Utilization */}
          <Card className="p-4 bg-white border border-[#DFE8E4] space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#5F737B]">Shifokorlar bandlik darajasi</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF7FC] text-[#0D34B4] border border-[#BAE6FD]">
                FAKT
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#059669]">{metrics.averageUtilization}%</span>
              <span className="text-xs text-[#059669] font-semibold flex items-center">
                <TrendingUp size={14} /> Bugungi quvvat
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#F0F4F2] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#059669] transition-all duration-500"
                style={{ width: `${Math.min(100, metrics.averageUtilization)}%` }}
              />
            </div>
          </Card>

          {/* Card 4: Empty Slots Detection */}
          <Card className="p-4 bg-white border border-[#DFE8E4] space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#5F737B]">Bugungi bo'sh qabul slotlari</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF7FC] text-[#0D34B4] border border-[#BAE6FD]">
                FAKT
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#008BFF]">{metrics.totalEmptySlotsToday}</span>
              <span className="text-xs text-[#5F737B] font-semibold">ta ochiq vaqt</span>
            </div>
            <p className="text-[11px] text-[#5F737B] leading-tight">
              Tavsiya: Telegram/SMS eslatmalar orqali zaxira quvvatni to'ldirish.
            </p>
          </Card>
        </div>

        {/* Methodology & Safety Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F8FAF9] via-[#EBF7FC] to-[#E3F1EC] border border-[#BAE6FD] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0D34B4] flex items-center gap-1.5">
                <Cpu size={15} className="text-[#008BFF]" /> Shafoff va xavfsiz klinik tahlil
              </span>
              <span className="text-[10px] bg-white text-[#0D34B4] font-semibold px-2 py-0.5 rounded border border-[#BAE6FD]">
                Zero-Data Leakage
              </span>
            </div>
            <p className="text-[#33534C] leading-relaxed max-w-3xl">
              Ushbu xulosalar O'zbekiston sog'liqni saqlash qonunlariga mos ravishda ichki klinik ma'lumotlar bazasi asosida yaratiladi. Bemorlarning shaxsiy tibbiy ma'lumotlari tashqariga chiqmaydi.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px] font-medium text-[#0D34B4]">
            <span className="flex items-center gap-1">
              <Database size={13} /> {totalAnalyzedAppointments} ta qabul
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={13} /> {totalAnalyzedTransactions} ta tranzaksiya
            </span>
          </div>
        </div>

        {/* AI Appointment Reminders & Messaging Hub */}
        <Card className="p-5 bg-white border border-[#DFE8E4] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0F4F2] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#008BFF]/10 text-[#008BFF] flex items-center justify-center">
                <Bell size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#132229] flex items-center gap-2">
                  AI Qabul Eslatmalari va Xabarnomalar Markazi
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E3F1EC] text-[#059669] border border-[#A7F3D0]">
                    Telegram & SMS
                  </span>
                </h3>
                <p className="text-xs text-[#5F737B]">
                  No-show ko'rsatkichini 28% dan 6% gacha kamaytiruvchi avtomatlashtirilgan eslatmalar
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-[#059669]">
                <span className="w-2 h-2 rounded-full bg-[#059669]" />
                <span>Telegram: {settings.telegramBotConnected ? 'Ulangan' : 'Ulanmagan'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#0D34B4]">
                <span className="w-2 h-2 rounded-full bg-[#008BFF]" />
                <span>SMS Gateway: {settings.smsRemindersEnabled ? 'Faol' : 'Faol emas'}</span>
              </div>
            </div>
          </div>

          {/* Reminders Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#DFE8E4] text-[#5F737B] font-semibold bg-[#F8FAF9]">
                  <th className="py-2.5 px-3">Bemor va Telefon</th>
                  <th className="py-2.5 px-3">Shifokor va Vaqt</th>
                  <th className="py-2.5 px-3">Kanal</th>
                  <th className="py-2.5 px-3">Holat</th>
                  <th className="py-2.5 px-3">Rozilik (Consent)</th>
                  <th className="py-2.5 px-3 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4F2]">
                {reminders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#5F737B]">
                      Hozircha rejalashtirilgan eslatmalar yo'q. Qabul yaratilganda avtomatik qo'shiladi.
                    </td>
                  </tr>
                ) : (
                  reminders.slice(0, 6).map((rem) => {
                    const statusConfig = {
                      rejalashtirilgan: { label: 'Rejalashtirilgan', bg: 'bg-[#EBF7FC] text-[#0D34B4] border-[#BAE6FD]' },
                      yuborildi: { label: 'Yuborilmoqda', bg: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]' },
                      yetkazildi: { label: 'Yetkazildi (Tasdiqlangan)', bg: 'bg-[#E3F1EC] text-[#059669] border-[#A7F3D0]' },
                      bekor_qilingan: { label: 'Bekor qilingan', bg: 'bg-[#F8FAF9] text-[#5F737B] border-[#DFE8E4]' },
                      rad_etildi: { label: 'Rad etilgan (Opt-out)', bg: 'bg-[#FEECEE] text-[#E02D3C] border-[#FECDD3]' },
                    }[rem.status];

                    return (
                      <tr key={rem.id} className="hover:bg-[#F8FAF9] transition-colors">
                        <td className="py-3 px-3 font-semibold text-[#132229]">
                          <div>{rem.patientName}</div>
                          <div className="text-[11px] text-[#5F737B] font-normal">{rem.patientPhone}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-[#132229]">{rem.doctorName}</div>
                          <div className="text-[11px] text-[#5F737B]">{rem.date} {rem.time}</div>
                        </td>
                        <td className="py-3 px-3 uppercase font-bold text-[10px] text-[#0D34B4]">
                          {rem.channel}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusConfig.bg}`}>
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <button
                            type="button"
                            onClick={() => handleToggleOptOut(rem.id, rem.consentObtained)}
                            className={`text-[11px] font-semibold cursor-pointer ${
                              rem.consentObtained ? 'text-[#059669] hover:underline' : 'text-[#E02D3C] hover:underline'
                            }`}
                          >
                            {rem.consentObtained ? '✓ Berilgan' : '✗ Rad etilgan'}
                          </button>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={dispatchingId === rem.id || rem.status === 'yetkazildi' || !rem.consentObtained}
                            icon={<Send size={12} className={dispatchingId === rem.id ? 'animate-spin' : ''} />}
                            onClick={() => handleDispatchReminder(rem.id)}
                            className="text-[11px]"
                          >
                            {rem.status === 'yetkazildi' ? 'Yetkazilgan' : 'Yuborish'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Filter Tabs */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-[#DFE8E4] shadow-2xs overflow-x-auto">
          {(
            [
              { key: 'all', label: `Barchasi (${insights.length})` },
              { key: 'opportunity', label: 'Zaxira quvvat va imkoniyatlar' },
              { key: 'warning', label: 'Operatsion ogohlantirishlar' },
              { key: 'financial', label: 'Moliyaviy taqsimot' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === tab.key
                  ? 'bg-[#008BFF] text-white shadow-xs'
                  : 'text-[#5F737B] hover:text-[#132229]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Insights Cards List */}
        <div className="space-y-4">
          {filteredInsights.length === 0 ? (
            <Card className="text-center py-12 text-[#5F737B] text-xs">
              Tanlangan toifa bo'yicha ogohlantirishlar topilmadi.
            </Card>
          ) : (
            filteredInsights.map((insight) => {
              const typeConfig = {
                opportunity: {
                  border: 'border-l-4 border-l-emerald-600',
                  badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                  icon: <Lightbulb size={18} className="text-emerald-700" />,
                  badgeText: 'Imkoniyat',
                },
                warning: {
                  border: 'border-l-4 border-l-rose-500',
                  badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
                  icon: <AlertTriangle size={18} className="text-rose-700" />,
                  badgeText: 'Ogohlantirish',
                },
                financial: {
                  border: 'border-l-4 border-l-blue-600',
                  badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
                  icon: <TrendingUp size={18} className="text-blue-700" />,
                  badgeText: 'Moliya',
                },
                operational: {
                  border: 'border-l-4 border-l-amber-500',
                  badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
                  icon: <Cpu size={18} className="text-amber-700" />,
                  badgeText: 'Operatsion',
                },
              }[insight.type] || {
                border: 'border-l-4 border-l-slate-400',
                badgeBg: 'bg-slate-50 text-slate-800 border-slate-200',
                icon: <Lightbulb size={18} className="text-slate-700" />,
                badgeText: 'Umumiy',
              };

              return (
                <Card
                  key={insight.id}
                  className={`p-5 transition-all hover:shadow-md ${typeConfig.border} bg-white`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-slate-50 shrink-0 mt-0.5">
                          {typeConfig.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${typeConfig.badgeBg}`}>
                              {typeConfig.badgeText}
                            </span>
                            <span className="text-[10px] text-[#5F737B] bg-[#F8FAF9] px-2 py-0.5 rounded border border-[#DFE8E4]">
                              {insight.dateRange}
                            </span>
                            <span className="text-[10px] font-semibold text-[#0D34B4] bg-[#EBF7FC] px-2 py-0.5 rounded">
                              {insight.isCalculatedFact ? 'Faktga asoslangan' : 'Simulyatsiya'}
                            </span>
                          </div>
                          <h3 className="font-bold text-sm text-[#132229]">
                            {insight.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="space-y-3 pt-2 border-t border-[#DFE8E4]">
                      <div className="p-3 bg-[#F8FAF9] rounded-xl border border-[#DFE8E4] text-xs">
                        <span className="font-bold text-[#132229] flex items-center gap-1.5 mb-1">
                          <Database size={13} className="text-[#008BFF]" /> 1. Aniqlangan ko'rsatkich va dalillar:
                        </span>
                        <p className="text-[#5F737B] leading-relaxed">
                          {insight.supportingData}
                        </p>
                      </div>

                      <div className="p-3 bg-[#F8FAF9] rounded-xl border border-[#DFE8E4] text-xs">
                        <span className="font-bold text-amber-800 flex items-center gap-1.5 mb-1">
                          <HelpCircle size={13} /> 2. Biznes uchun ahamiyati va ta'siri:
                        </span>
                        <p className="text-[#5F737B] leading-relaxed">
                          {insight.impactExplanation}
                        </p>
                      </div>
                    </div>

                    {/* Suggested Next Action */}
                    <div className="p-3.5 bg-[#EBF7FC]/70 rounded-xl border border-[#BAE6FD] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-[#0D34B4] flex items-center gap-1.5 mb-0.5">
                          <Lightbulb size={14} className="text-[#008BFF]" /> Tavsiya etilgan amaliy harakat:
                        </span>
                        <p className="text-[#132229]">{insight.suggestedAction}</p>
                      </div>

                      <Link to={insight.actionLink} className="shrink-0">
                        <Button size="sm" variant="primary" className="text-xs">
                          {insight.actionLabel}
                          <ArrowRight size={13} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Footnote */}
        <Card className="bg-[#F8FAF9] border-dashed border-[#BAE6FD] p-4 text-xs">
          <div className="flex items-start gap-3">
            <ShieldCheck size={20} className="text-[#008BFF] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#132229]">
                Investitsiya va texnologik xavfsizlik kafolati
              </h4>
              <p className="text-[#5F737B] mt-0.5 leading-relaxed">
                Elvora Insights O'zbekiston shifoxonalari talablariga mos ravishda milliy valyuta (UZS) va ish jadvali parametrlari bilan to'liq integratsiya qilingan. Barcha hisob-kitoblar ochiq va audit qilinadigan algoritmlarga tayanadi.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </FeatureGate>
  );
};
