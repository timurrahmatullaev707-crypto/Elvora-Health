import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  DollarSign,
  Calculator,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

export const CinematicRoiCalculator: React.FC = () => {
  const [doctorsCount, setDoctorsCount] = useState<number>(8);
  const [dailyPatientsPerDoctor, setDailyPatientsPerDoctor] = useState<number>(14);
  const [avgFee, setAvgFee] = useState<number>(150000);
  const [noShowRate, setNoShowRate] = useState<number>(26);

  // Math Calculations (assuming 26 working days per month)
  const calculation = useMemo(() => {
    const workingDays = 26;
    const totalMonthlyAppointments = doctorsCount * dailyPatientsPerDoctor * workingDays;
    const monthlyGrossPotential = totalMonthlyAppointments * avgFee;

    // Monthly money lost without Elvora (No-Show)
    const monthlyLostOld = monthlyGrossPotential * (noShowRate / 100);

    // Elvora recovers ~88% of no-shows through automated multi-channel reminders and instant slot rebooking
    const monthlyRecovered = monthlyLostOld * 0.88;
    const annualRecovered = monthlyRecovered * 12;

    // Approximate cost of Elvora Pro plan (e.g. 1.2 mln UZS/month)
    const elvoraCostMonthly = 1200000;
    const roiMultiplier = Math.round(monthlyRecovered / elvoraCostMonthly);

    return {
      totalMonthlyAppointments,
      monthlyGrossPotential,
      monthlyLostOld,
      monthlyRecovered,
      annualRecovered,
      roiMultiplier,
    };
  }, [doctorsCount, dailyPatientsPerDoctor, avgFee, noShowRate]);

  return (
    <section id="roi-kalkulyator" className="py-24 lg:py-32 bg-white relative overflow-hidden border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <Calculator size={13} />
            <span>Klinika ROI Kalkulyatori</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
            Klinikangiz Qancha{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Mablag' Saqlab Qoladi?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            O'z klinikangiz ko'rsatkichlarini kiriting va Elvora Health orqali tiklanadigan oylik va yillik sof daromadni ko'ring.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Input Sliders (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm space-y-7">
            {/* Slider 1: Doctors Count */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
                <span>Shifokorlar Soni:</span>
                <span className="px-3 py-1 rounded-lg bg-white border border-[#CBD5E1] text-sm font-black text-[#0284C7]">
                  {doctorsCount} nafar
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={doctorsCount}
                onChange={(e) => setDoctorsCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0284C7]"
              />
              <div className="flex justify-between text-[11px] text-[#94A3B8]">
                <span>1 ta</span>
                <span>25 ta</span>
                <span>50 ta</span>
              </div>
            </div>

            {/* Slider 2: Daily Patients per Doctor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
                <span>Har bir shifokorga kunlik bemorlar:</span>
                <span className="px-3 py-1 rounded-lg bg-white border border-[#CBD5E1] text-sm font-black text-[#0284C7]">
                  {dailyPatientsPerDoctor} bemor
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="35"
                value={dailyPatientsPerDoctor}
                onChange={(e) => setDailyPatientsPerDoctor(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0284C7]"
              />
              <div className="flex justify-between text-[11px] text-[#94A3B8]">
                <span>4 bemor</span>
                <span>20 bemor</span>
                <span>35 bemor</span>
              </div>
            </div>

            {/* Slider 3: Average Consultation Fee */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
                <span>O'rtacha qabul / xizmat narxi (UZS):</span>
                <span className="px-3 py-1 rounded-lg bg-white border border-[#CBD5E1] text-sm font-black text-[#0D9488]">
                  {avgFee.toLocaleString('uz-UZ')} UZS
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="400000"
                step="10000"
                value={avgFee}
                onChange={(e) => setAvgFee(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D9488]"
              />
              <div className="flex justify-between text-[11px] text-[#94A3B8]">
                <span>50 000 UZS</span>
                <span>200 000 UZS</span>
                <span>400 000 UZS</span>
              </div>
            </div>

            {/* Slider 4: Current No-Show Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
                <span>Hozirgi No-Show (kelmagan bemorlar) foizi:</span>
                <span className="px-3 py-1 rounded-lg bg-rose-50 border border-rose-200 text-sm font-black text-rose-600">
                  {noShowRate}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                value={noShowRate}
                onChange={(e) => setNoShowRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[11px] text-[#94A3B8]">
                <span>10% (Kam)</span>
                <span>25% (O'rtacha)</span>
                <span>45% (Yuqori)</span>
              </div>
            </div>
          </div>

          {/* Right: Output Financial Impact (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#0F172A] text-white shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Moliyaviy Xulosa
                </span>
                <span className="text-[11px] font-mono text-slate-400">26 ish kuni</span>
              </div>

              {/* Monthly money lost */}
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/40 mb-4">
                <div className="text-[11px] text-rose-300 font-semibold">
                  Hozirda har oy yo'qotilayotgan tushum:
                </div>
                <div className="text-xl font-extrabold text-rose-400 mt-1">
                  ~ {Math.round(calculation.monthlyLostOld).toLocaleString('uz-UZ')} UZS
                </div>
              </div>

              {/* Monthly money saved with Elvora */}
              <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 mb-4">
                <div className="text-xs text-emerald-300 font-bold flex items-center gap-1.5">
                  <Sparkles size={14} className="text-teal-300" />
                  Elvora orqali oylik tiklanadigan mablag':
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                  + {Math.round(calculation.monthlyRecovered).toLocaleString('uz-UZ')} UZS
                </div>
                <div className="text-[11px] text-emerald-200/80 mt-1">
                  Avtomatik eslatmalar va bo'sh slotlarni qayta to'ldirish hisobiga
                </div>
              </div>

              {/* Annual figure */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-300">Klinika uchun yillik qo'shimcha daromad:</div>
                <div className="text-lg font-extrabold text-teal-300 mt-0.5">
                  + {Math.round(calculation.annualRecovered).toLocaleString('uz-UZ')} UZS
                </div>
              </div>
            </div>

            {/* ROI Multiplier Badge */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Investitsiya qaytishi (ROI):
              </div>
              <div className="text-sm font-extrabold text-teal-300 bg-teal-950 px-3 py-1 rounded-full border border-teal-500/30">
                ~ {calculation.roiMultiplier}x Barobar
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicRoiCalculator;
