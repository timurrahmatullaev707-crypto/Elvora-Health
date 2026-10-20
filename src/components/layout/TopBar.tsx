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
    <header className="h-17 bg-white border-b border-[#E6EBEF] px-6 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-2xs">
      {/* Left: Global Search & Current Date & Public Home link */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#687586]"
          />
          <input
            type="text"
            placeholder="Bemor ismi, telefon raqami yoki qabul ID..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F8FAF8] border border-[#E6EBEF] rounded-xl text-[#101C2C] placeholder-[#687586] focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/20 focus:border-[#0D7C74] focus:bg-white transition-all"
          />
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#687586] bg-[#F8FAF8] px-3 py-1.5 rounded-xl border border-[#E6EBEF]">
          <Calendar size={14} className="text-[#0D7C74]" />
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
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E6EBEF] py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => {
                    setQuickActionOpen(false);
                    onOpenNewAppointment?.();
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-[#101C2C] hover:bg-[#DDF5EB] hover:text-[#065F55] flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#0D7C74]"></span>
                  Yangi qabul belgilash
                </button>
                <button
                  onClick={() => {
                    setQuickActionOpen(false);
                    onOpenNewPatient?.();
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-[#101C2C] hover:bg-[#DDF5EB] hover:text-[#065F55] flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Yangi bemor qo'shish
                </button>
                <button
                  onClick={() => {
                    setQuickActionOpen(false);
                    onOpenNewPayment?.();
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-[#101C2C] hover:bg-[#DDF5EB] hover:text-[#065F55] flex items-center gap-2 border-t border-[#E6EBEF] mt-1 pt-2"
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E6EBEF] bg-[#F8FAF9] hover:bg-[#DDF5EB] text-xs font-medium text-[#101C2C] transition-all cursor-pointer"
            title="Prezentatsiya uchun foydalanuvchi rolini o'zgartirish"
          >
            <ShieldCheck size={14} className="text-[#0D7C74]" />
            <span className="hidden md:inline font-semibold">Rol:</span>
            <span className="text-[#0D7C74] capitalize">
              {currentRole === 'admin'
                ? 'Admin'
                : currentRole === 'receptionist'
                ? 'Registrator'
                : 'Shifokor'}
            </span>
            <ChevronDown size={13} className="text-[#687586]" />
          </button>

          {roleMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setRoleMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E6EBEF] p-2 z-30">
                <div className="text-[10px] uppercase font-bold text-[#687586] px-2 py-1 tracking-wider">
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
                        ? 'bg-[#DDF5EB] text-[#065F55] font-semibold'
                        : 'text-[#101C2C] hover:bg-[#F8FAF8]'
                    }`}
                  >
                    <div className="font-medium">{r.label}</div>
                    <div className="text-[10px] text-[#687586]">{r.desc}</div>
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#BCE8D7] bg-[#DDF5EB] text-xs font-semibold text-[#065F55] hover:bg-[#CFEFE2] transition-all cursor-pointer"
            title="Tarif imkoniyatlarini sinab ko'rish"
          >
            <Sparkles size={14} className="text-[#0D7C74]" />
            <span>Tarif: {currentPlan.toUpperCase()}</span>
            <ChevronDown size={13} className="text-[#065F55]" />
          </button>

          {planMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setPlanMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-[#E6EBEF] p-2 z-30">
                <div className="text-[10px] uppercase font-bold text-[#687586] px-2 py-1 tracking-wider">
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
                        ? 'bg-[#DDF5EB] text-[#065F55] font-semibold'
                        : 'text-[#101C2C] hover:bg-[#F8FAF8]'
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
          className="p-2 rounded-xl text-[#687586] hover:text-[#101C2C] hover:bg-[#F8FAF8] transition-colors cursor-pointer"
          title="Namunaviy ma'lumotlarni qayta tiklash"
        >
          <RotateCcw size={16} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="p-2 rounded-xl text-[#687586] hover:text-[#101C2C] hover:bg-[#F8FAF8] transition-colors relative cursor-pointer"
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
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#E6EBEF] p-3 z-30 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#E6EBEF]">
                  <span className="text-xs font-bold text-[#101C2C]">
                    Operatsion bildirishnomalar
                  </span>
                  <span className="text-[10px] bg-[#DDF5EB] text-[#065F55] px-1.5 py-0.5 rounded">
                    Jonli
                  </span>
                </div>
                <div className="divide-y divide-[#E6EBEF]/60 mt-1 max-h-60 overflow-y-auto">
                  <div className="py-2 text-xs">
                    <p className="font-semibold text-[#101C2C]">
                      Navbatda {waitingCount} ta bemor kutmoqda
                    </p>
                    <p className="text-[11px] text-[#687586] mt-0.5">
                      Kutish zalida qabulga tayyor bemorlar mavjud.
                    </p>
                  </div>
                  <div className="py-2 text-xs">
                    <p className="font-semibold text-emerald-800">
                      Bugungi tushum yangilandi
                    </p>
                    <p className="text-[11px] text-[#687586] mt-0.5">
                      Tranzaksiyalar bo'yicha to'lovlar kvitansiyalari kiritilmoqda.
                    </p>
                  </div>
                  <div className="py-2 text-xs">
                    <p className="font-semibold text-teal-800">
                      Elvora Insights tahlili tayyor
                    </p>
                    <p className="text-[11px] text-[#687586] mt-0.5">
                      Shifokorlar bandligi va no-show ko'rsatkichlari yangilandi.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E6EBEF]">
          <div className="w-8 h-8 rounded-full bg-[#0D7C74] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {userProfile.fullName.slice(0, 2).toUpperCase()}
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-[#101C2C] leading-tight">
              {userProfile.fullName}
            </div>
            <div className="text-[10px] text-[#687586]">
              {userProfile.roleTitleUz}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
