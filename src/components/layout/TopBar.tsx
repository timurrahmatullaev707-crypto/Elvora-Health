import React, { useState } from 'react';
import {
  Bell,
  Search,
  Plus,
  Calendar,
  RotateCcw,
  UserCheck,
  ShieldCheck,
  Sparkles,
  ChevronDown,
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
    <header className="h-17 bg-white border-b border-[#E4EBE8] px-6 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-2xs">
      {/* Left: Global Search & Current Date */}
      <div className="flex items-center gap-5 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71817D]"
          />
          <input
            type="text"
            placeholder="Bemor ismi, telefon raqami yoki qabul ID..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F] placeholder-[#71817D] focus:outline-none focus:ring-2 focus:ring-[#167D72]/20 focus:border-[#167D72] focus:bg-white transition-all"
          />
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#71817D] bg-[#F5F8F7] px-3 py-1.5 rounded-xl border border-[#E4EBE8]">
          <Calendar size={14} className="text-[#167D72]" />
          <span className="capitalize">{todayFormatted}</span>
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
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E4EBE8] py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => {
                    setQuickActionOpen(false);
                    onOpenNewAppointment?.();
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-[#20312F] hover:bg-[#EAF6F2] hover:text-[#125B54] flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#167D72]"></span>
                  Yangi qabul belgilash
                </button>
                <button
                  onClick={() => {
                    setQuickActionOpen(false);
                    onOpenNewPatient?.();
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-[#20312F] hover:bg-[#EAF6F2] hover:text-[#125B54] flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Yangi bemor qo'shish
                </button>
                <button
                  onClick={() => {
                    setQuickActionOpen(false);
                    onOpenNewPayment?.();
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-[#20312F] hover:bg-[#EAF6F2] hover:text-[#125B54] flex items-center gap-2 border-t border-[#E4EBE8] mt-1 pt-2"
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E4EBE8] bg-[#F9FBFA] hover:bg-[#EAF6F2] text-xs font-medium text-[#20312F] transition-all cursor-pointer"
            title="Prezentatsiya uchun foydalanuvchi rolini o'zgartirish"
          >
            <ShieldCheck size={14} className="text-[#167D72]" />
            <span className="hidden md:inline font-semibold">Rol:</span>
            <span className="text-[#167D72] capitalize">
              {currentRole === 'admin'
                ? 'Admin'
                : currentRole === 'receptionist'
                ? 'Registrator'
                : 'Shifokor'}
            </span>
            <ChevronDown size={13} className="text-[#71817D]" />
          </button>

          {roleMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setRoleMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E4EBE8] p-2 z-30">
                <div className="text-[10px] uppercase font-bold text-[#71817D] px-2 py-1 tracking-wider">
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
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors ${
                      currentRole === r.role
                        ? 'bg-[#EAF6F2] text-[#125B54] font-semibold'
                        : 'text-[#20312F] hover:bg-[#F5F8F7]'
                    }`}
                  >
                    <div className="font-medium">{r.label}</div>
                    <div className="text-[10px] text-[#71817D]">{r.desc}</div>
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#BCE3D7] bg-[#EAF6F2] text-xs font-semibold text-[#125B54] hover:bg-[#DCF3EB] transition-all cursor-pointer"
            title="Tarif imkoniyatlarini sinab ko'rish"
          >
            <Sparkles size={14} className="text-[#167D72]" />
            <span>Tarif: {currentPlan.toUpperCase()}</span>
            <ChevronDown size={13} className="text-[#125B54]" />
          </button>

          {planMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setPlanMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-[#E4EBE8] p-2 z-30">
                <div className="text-[10px] uppercase font-bold text-[#71817D] px-2 py-1 tracking-wider">
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
                        ? 'bg-[#EAF6F2] text-[#125B54] font-semibold'
                        : 'text-[#20312F] hover:bg-[#F5F8F7]'
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
          className="p-2 rounded-xl text-[#71817D] hover:text-[#20312F] hover:bg-[#F5F8F7] transition-colors cursor-pointer"
          title="Namunaviy ma'lumotlarni qayta tiklash"
        >
          <RotateCcw size={16} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="p-2 rounded-xl text-[#71817D] hover:text-[#20312F] hover:bg-[#F5F8F7] transition-colors relative cursor-pointer"
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
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#E4EBE8] p-3 z-30 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#E4EBE8]">
                  <span className="text-xs font-bold text-[#20312F]">
                    Operatsion bildirishnomalar
                  </span>
                  <span className="text-[10px] bg-[#EAF6F2] text-[#125B54] px-1.5 py-0.5 rounded">
                    Jonli
                  </span>
                </div>
                <div className="divide-y divide-[#E4EBE8]/60 mt-1 max-h-60 overflow-y-auto">
                  <div className="py-2 text-xs">
                    <p className="font-semibold text-[#20312F]">
                      Navbatda {waitingCount} ta bemor kutmoqda
                    </p>
                    <p className="text-[11px] text-[#71817D] mt-0.5">
                      Kutish zalida qabulga tayyor bemorlar mavjud.
                    </p>
                  </div>
                  <div className="py-2 text-xs">
                    <p className="font-semibold text-emerald-800">
                      Bugungi tushum yangilandi
                    </p>
                    <p className="text-[11px] text-[#71817D] mt-0.5">
                      Tranzaksiyalar bo'yicha to'lovlar kvitansiyalari kiritilmoqda.
                    </p>
                  </div>
                  <div className="py-2 text-xs">
                    <p className="font-semibold text-teal-800">
                      Elvora Insights tahlili tayyor
                    </p>
                    <p className="text-[11px] text-[#71817D] mt-0.5">
                      Shifokorlar bandligi va no-show ko'rsatkichlari yangilandi.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E4EBE8]">
          <div className="w-8 h-8 rounded-full bg-[#167D72] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {userProfile.fullName.slice(0, 2).toUpperCase()}
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-[#20312F] leading-tight">
              {userProfile.fullName}
            </div>
            <div className="text-[10px] text-[#71817D]">
              {userProfile.roleTitleUz}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
