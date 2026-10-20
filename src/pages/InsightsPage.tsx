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
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { insightsService } from '../services/insightsService';
import { InsightType } from '../types';

export const InsightsPage: React.FC = () => {
  const { appointments, transactions, doctors, currentPlan, refreshData, showToast } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'financial' | 'operational' | 'warning' | 'opportunity'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Compute live insights based on real application dataset
  const {
    insights,
    lastAnalyzedAt,
    totalAnalyzedAppointments,
    totalAnalyzedTransactions,
    hasSufficientData,
  } = useMemo(() => {
    return insightsService.generateInsights();
  }, [appointments, transactions, doctors]);

  const filteredInsights = useMemo(() => {
    if (activeFilter === 'all') return insights;
    return insights.filter((item) => item.type === activeFilter);
  }, [insights, activeFilter]);

  const handleManualReanalyze = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      refreshData();
      setIsRefreshing(false);
      showToast('Klinika operatsion ma\'lumotlari to\'liq qayta tahlil qilindi', 'success');
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#20312F] tracking-tight flex items-center gap-2">
              <Sparkles size={22} className="text-[#167D72]" />
              Elvora Insights™
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EAF6F2] text-[#125B54] border border-[#BCE3D7]">
              Eksklyuziv modul
            </span>
          </div>
          <p className="text-xs text-[#71817D] mt-0.5">
            Ichki kassa, qabullar va shifokorlar ish grafigi asosida hisoblangan amaliy xulosa va tavsiyalar
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

          <div className="text-[11px] text-[#71817D] bg-white px-3 py-1.5 rounded-xl border border-[#E4EBE8] shadow-2xs">
            Oxirgi tahlil: <strong>{lastAnalyzedAt}</strong>
          </div>
        </div>
      </div>

      {/* Investor Value Banner / Methodology Disclaimer */}
      <div className="p-4 rounded-2xl bg-linear-to-r from-[#FAFDFB] via-[#EAF6F2] to-[#E3F1EC] border border-[#BCE3D7] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#125B54] flex items-center gap-1.5">
              <Cpu size={15} className="text-[#167D72]" /> Shafoff qoidalarga asoslangan tahlil tizimi
            </span>
            <span className="text-[10px] bg-white text-[#125B54] font-semibold px-2 py-0.5 rounded border border-[#BCE3D7]">
              Zero-Data Leakage
            </span>
          </div>
          <p className="text-[#33534C] leading-relaxed max-w-3xl">
            Tavsiyalar tashqi sun'iy intellektga bemor ma'lumotlarini jo'natmasdan, bevosita klinika ichki tranzaksiyalari va qabullar jadvali ustida ishlovchi matematik algoritmlar orqali hisoblanadi.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-[11px] font-medium text-[#125B54]">
          <span className="flex items-center gap-1">
            <Database size={13} /> {totalAnalyzedAppointments} ta qabul
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 size={13} /> {totalAnalyzedTransactions} ta tranzaksiya
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center bg-white p-1 rounded-xl border border-[#E4EBE8] shadow-2xs overflow-x-auto">
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
                ? 'bg-[#167D72] text-white shadow-xs'
                : 'text-[#71817D] hover:text-[#20312F]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Insights Cards List */}
      <div className="space-y-4">
        {filteredInsights.length === 0 ? (
          <Card className="text-center py-12 text-[#71817D] text-xs">
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
                icon: <AlertTriangle size={18} className="text-rose-600" />,
                badgeText: 'Diqqat',
              },
              financial: {
                border: 'border-l-4 border-l-blue-600',
                badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
                icon: <TrendingDown size={18} className="text-blue-600" />,
                badgeText: 'Moliya tahlili',
              },
              operational: {
                border: 'border-l-4 border-l-amber-500',
                badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
                icon: <SlidersHorizontal size={18} className="text-amber-600" />,
                badgeText: 'Operatsion',
              },
            };

            const conf = typeConfig[insight.type] || typeConfig.operational;

            return (
              <Card
                key={insight.id}
                className={`p-5 transition-all hover:shadow-md ${conf.border}`}
              >
                <div className="space-y-4">
                  {/* Top Bar of Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${conf.badgeBg}`}>
                        {conf.icon}
                        {conf.badgeText}
                      </span>
                      <span className="text-[11px] font-medium text-[#71817D]">
                        Davr: {insight.dateRange}
                      </span>
                      {insight.isCalculatedFact && (
                        <span className="text-[10px] bg-[#F5F8F7] text-[#506360] px-2 py-0.5 rounded border border-[#E4EBE8]">
                          Haqiqiy tahlil
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        insight.priority === 'high'
                          ? 'bg-rose-100 text-rose-800'
                          : insight.priority === 'medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {insight.priority === 'high'
                        ? 'Yuqori ahamiyat'
                        : insight.priority === 'medium'
                        ? 'O\'rta ahamiyat'
                        : 'Past'}
                    </span>
                  </div>

                  {/* Title and What Happened */}
                  <div>
                    <h3 className="text-base font-bold text-[#20312F]">
                      {insight.title}
                    </h3>
                    <p className="text-xs text-[#506360] mt-1 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>

                  {/* 5 Structural Elements required by Section 13 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 border-t border-[#E4EBE8]">
                    {/* Supporting Records & Evidence */}
                    <div className="p-3 bg-[#FAFDFB] rounded-xl border border-[#E4EBE8] text-xs">
                      <span className="font-bold text-[#167D72] flex items-center gap-1.5 mb-1">
                        <Database size={13} /> 1. Asoslovchi ma'lumotlar va dalillar:
                      </span>
                      <p className="text-[#506360] leading-relaxed">
                        {insight.supportingData}
                      </p>
                    </div>

                    {/* Why It Matters & Business Impact */}
                    <div className="p-3 bg-[#FAFDFB] rounded-xl border border-[#E4EBE8] text-xs">
                      <span className="font-bold text-amber-800 flex items-center gap-1.5 mb-1">
                        <HelpCircle size={13} /> 2. Biznes uchun ahamiyati va ta'siri:
                      </span>
                      <p className="text-[#506360] leading-relaxed">
                        {insight.impactExplanation}
                      </p>
                    </div>
                  </div>

                  {/* Suggested Next Action & Link */}
                  <div className="p-3.5 bg-[#EAF6F2]/70 rounded-xl border border-[#BCE3D7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-[#125B54] flex items-center gap-1.5 mb-0.5">
                        <Lightbulb size={14} className="text-[#167D72]" /> Tavsiya etilgan amaliy harakat:
                      </span>
                      <p className="text-[#20312F]">{insight.suggestedAction}</p>
                    </div>

                    <Link to={insight.actionLink} className="shrink-0">
                      <Button
                        size="sm"
                        variant="primary"
                        className="text-xs"
                      >
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

      {/* Pro Tier Distinction Footnote */}
      <Card className="bg-[#FAFDFB] border-dashed border-[#BCE3D7] p-4 text-xs">
        <div className="flex items-start gap-3">
          <ShieldCheck size={20} className="text-[#167D72] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-[#20312F]">
              Investitsiya va texnologik xavfsizlik kafolati
            </h4>
            <p className="text-[#71817D] mt-0.5 leading-relaxed">
              Elvora Insights hech qanday tashqi pullik OpenAI yoki yopiq API larsiz to'liq lokal ishlaydi. Algoritmlar O'zbekiston shifoxonalari talablariga mos ravishda milliy valyuta (UZS) va ish jadvali parametrlari bilan to'liq integratsiya qilingan.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
