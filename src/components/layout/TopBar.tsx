import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Search,
  Plus,
  Calendar,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Globe,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { UserRole, SubscriptionPlan } from '../../types';

interface TopBarProps {
  onOpenNewAppointment?: () => void;
  onOpenNewPatient?: () => void;
  onOpenNewPayment?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenNewAppointment,
  onOpenNewPatient,
  onOpenNewPayment,
}) => {
  const {
    userProfile,
    currentRole,
    setCurrentRole,
    currentPlan,
    setCurrentPlan,
    resetDemoData,
    appointments,
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [planMenuOpen, setPlanMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);

  // Uzbek formatted date
  const todayFormatted = new Date().toLocaleDateString('uz-UZ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const waitingCount = appointments.filter((a) => a.status === 'kutilmoqda').length;

  return (
    <header className="h-17 bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-2xs">
      {/* Left: Global Search & Current Date */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
          <input
            type="text"
            placeholder="Bemor ismi, telefon raqami yoki qabul ID..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] focus:bg-white transition-all"
          />
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#475569] bg-[#F8FAFC] px-3 py-1.5 rounded-xl border border-[#E2E8F0]">
          <Calendar size={14} className="text-[#0284C7]" />
          <span className="capitalize font-medium">{todayFormatted}</span>
        </div>
      </div>

      {/* Right Controls: Quick Actions, Role Switcher, Plan Switcher, Reset Demo, Profile */}
      <div className="flex items-center gap-2.5">
        {/* Quick Action Dropdown */}
        <div className="relative">
          <Button
            size="sm"
            variant="primary"
            icon={<Plus size={15} />}
            onClick={() => setQuickActionOpen(!quickActionOpen)}
          >
            <span className="hidden sm:inline">Tezkor amal</span>
          </Button>

          {quickActionOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setQuickActionOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#E2E8F0] py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => {
                    setQuickActionOpen(false);
                    onOpenNewAppointment?.();
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-[#0F172A] hover:bg-sky-50 hover:text-[#0284C7] flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-[#0284C7]"></span>
                  Yangi qabul belgilash
                </button>
                <button
                  onClick={() => {
                    setQuickActionOpen(false);
                    onOpenNewPatient?.();
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-[#0F172A] hover:bg-sky-50 hover:text-[#0284C7] flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-[#0D9488]"></span>
                  Yangi bemor qo'shish
                </button>
                <button
                  onClick={() => {
                    setQuickActionOpen(false);
                    onOpenNewPayment?.();
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-[#0F172A] hover:bg-sky-50 hover:text-[#0284C7] flex items-center gap-2 border-t border-[#E2E8F0] mt-1 pt-2 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  To'lov kiritish (Kirim)
                </button>
              </div>
            </>
          )}
        </div>

        {/* Investor Demo Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-sky-50 text-xs font-semibold text-[#0F172A] transition-all cursor-pointer shadow-2xs"
            title="Prezentatsiya uchun foydalanuvchi rolini o'zgartirish"
          >
            <ShieldCheck size={14} className="text-[#0284C7]" />
            <span className="hidden md:inline font-bold">Rol:</span>
            <span className="text-[#0284C7] capitalize font-bold">
              {currentRole === 'admin'
                ? 'Admin'
                : currentRole === 'receptionist'
                ? 'Registrator'
                : 'Shifokor'}
            </span>
            <ChevronDown size={13} className="text-[#64748B]" />
          </button>

          {roleMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setRoleMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E2E8F0] p-2 z-30">
                <div className="text-[10px] uppercase font-bold text-[#64748B] px-2 py-1 tracking-wider">
                  Demo rolini almashtirish
                </div>
                {(
                  [
                    { role: 'admin', label: 'Klinika rahbari (Admin)', desc: 'Barcha ruxsatlar' },
                    { role: 'receptionist', label: 'Registrator', desc: 'Bemorlar va qabullar' },
                    { role: 'doctor', label: 'Shifokor mutaxassis', desc: 'O\'z grafigi va ko\'riklar' },
                  ] as const
                ).map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setCurrentRole(r.role as UserRole);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                      currentRole === r.role
                        ? 'bg-sky-50 text-[#0284C7] font-bold'
                        : 'text-[#475569] hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-semibold">{r.label}</div>
                    <div className="text-[10px] text-[#64748B]">{r.desc}</div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Investor Demo Plan Switcher */}
        <div className="relative">
          <button
            onClick={() => setPlanMenuOpen(!planMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-sky-200 bg-sky-50 text-xs font-bold text-[#0284C7] hover:bg-sky-100 transition-all cursor-pointer shadow-2xs"
            title="Tarif imkoniyatlarini sinab ko'rish"
          >
            <Sparkles size={14} className="text-[#0D9488]" />
            <span>Tarif: {currentPlan.toUpperCase()}</span>
            <ChevronDown size={13} className="text-[#0284C7]" />
          </button>

          {planMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setPlanMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-2 z-30">
                <div className="text-[10px] uppercase font-bold text-[#64748B] px-2 py-1 tracking-wider">
                  Tarif rejasini almashtirish
                </div>
                {(
                  [
                    { plan: 'basic', label: 'Basic — Boshlang\'ich' },
                    { plan: 'pro', label: 'Pro — Professional (Aqlli)' },
                    { plan: 'business', label: 'Business — Tarmoq' },
                  ] as const
                ).map((p) => (
                  <button
                    key={p.plan}
                    onClick={() => {
                      setCurrentPlan(p.plan as SubscriptionPlan);
                      setPlanMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors ${
                      currentPlan === p.plan
                        ? 'bg-sky-50 text-[#0284C7] font-semibold'
                        : 'text-[#0F172A] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={resetDemoData}
          className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
          title="Namunaviy ma'lumotlarni qayta tiklash"
        >
          <RotateCcw size={16} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors relative cursor-pointer"
            title="Bildirishnomalar"
          >
            <Bell size={18} />
            {waitingCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {notificationOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setNotificationOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#E2E8F0] p-3 z-30 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                  <span className="text-xs font-bold text-[#0F172A]">
                    Operatsion bildirishnomalar
                  </span>
                  <span className="text-[10px] bg-teal-50 text-[#0D9488] px-2 py-0.5 rounded-full border border-teal-200 font-bold">
                    Jonli
                  </span>
                </div>
                <div className="divide-y divide-[#E2E8F0] mt-1 max-h-60 overflow-y-auto">
                  <div className="py-2 text-xs">
                    <p className="font-semibold text-[#0F172A]">
                      Navbatda {waitingCount} ta bemor kutmoqda
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      Kutish zalida qabulga tayyor bemorlar mavjud.
                    </p>
                  </div>
                  <div className="py-2 text-xs">
                    <p className="font-semibold text-[#0284C7]">
                      Bugungi tushum yangilandi
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      Tranzaksiyalar bo'yicha to'lovlar kvitansiyalari kiritilmoqda.
                    </p>
                  </div>
                  <div className="py-2 text-xs">
                    <p className="font-semibold text-[#0D9488]">
                      Elvora Insights tahlili tayyor
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      Shifokorlar bandligi va no-show ko'rsatkichlari yangilandi.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E2E8F0]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0284C7] to-[#0D9488] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {userProfile.fullName.slice(0, 2).toUpperCase()}
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-[#0F172A] leading-tight">
              {userProfile.fullName}
            </div>
            <div className="text-[10px] text-[#64748B]">
              {userProfile.roleTitleUz}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
