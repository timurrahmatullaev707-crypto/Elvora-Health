import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarCheck2,
  Stethoscope,
  CircleDollarSign,
  Sparkles,
  BarChart3,
  ShieldAlert,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  Sparkle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentPlan, settings } = useApp();

  const navigationItems = [
    {
      to: '/',
      label: 'Boshqaruv paneli',
      icon: <LayoutDashboard size={19} />,
      badge: null,
    },
    {
      to: '/patients',
      label: 'Bemorlar',
      icon: <Users size={19} />,
      badge: null,
    },
    {
      to: '/appointments',
      label: 'Qabullar va navbat',
      icon: <CalendarCheck2 size={19} />,
      badge: 'Jonli',
    },
    {
      to: '/doctors',
      label: 'Shifokorlar',
      icon: <Stethoscope size={19} />,
      badge: null,
    },
    {
      to: '/finance',
      label: 'Moliya',
      icon: <CircleDollarSign size={19} />,
      badge: null,
    },
    {
      to: '/insights',
      label: 'Elvora Insights',
      icon: <Sparkles size={19} className="text-teal-600 animate-pulse" />,
      badge: 'Aqlli',
      highlight: true,
    },
    {
      to: '/reports',
      label: 'Hisobotlar',
      icon: <BarChart3 size={19} />,
      badge: currentPlan === 'basic' ? 'Pro' : null,
    },
    {
      to: '/staff',
      label: 'Xodimlar va rollar',
      icon: <ShieldAlert size={19} />,
      badge: null,
    },
    {
      to: '/subscription',
      label: 'Obuna va tariflar',
      icon: <CreditCard size={19} />,
      badge: currentPlan.toUpperCase(),
    },
    {
      to: '/settings',
      label: 'Sozlamalar',
      icon: <Settings size={19} />,
      badge: null,
    },
  ];

  return (
    <aside
      className={`relative flex flex-col bg-white border-r border-[#E4EBE8] transition-all duration-300 ease-in-out shrink-0 select-none z-20 ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-17 px-4 border-b border-[#E4EBE8]">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Logo Mark */}
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#167D72] to-[#125B54] flex items-center justify-center shrink-0 shadow-sm text-white relative">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4v16m-8-8h16" />
            </svg>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
          </div>

          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-base tracking-tight text-[#167D72] leading-none">
                ELVORA <span className="text-[#20312F] font-semibold">HEALTH</span>
              </span>
              <span className="text-[10px] text-[#71817D] mt-1 truncate">
                Tibbiyot boshqaruvi
              </span>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-[#71817D] hover:text-[#20312F] hover:bg-[#F5F8F7] transition-colors shrink-0"
          title={collapsed ? 'Kengaytirish' : 'Yig\'ish'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Clinic Selector / Current Clinic Info */}
      <div className="px-3.5 py-3 border-b border-[#E4EBE8]/60 bg-[#FAFDFB]">
        <div
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-white border border-[#E4EBE8] ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <Building2 size={16} className="text-[#167D72] shrink-0" />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#20312F] truncate">
                {settings.clinicName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] text-[#71817D]">Faol filial</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-[#EAF6F2] text-[#125B54] font-semibold shadow-2xs'
                  : 'text-[#506360] hover:text-[#20312F] hover:bg-[#F5F8F7]'
              } ${item.highlight ? 'relative overflow-hidden' : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`shrink-0 transition-colors ${
                    isActive ? 'text-[#167D72]' : 'text-[#71817D] group-hover:text-[#20312F]'
                  }`}
                >
                  {item.icon}
                </span>

                {!collapsed && (
                  <span className="flex-1 truncate tracking-tight">{item.label}</span>
                )}

                {!collapsed && item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-semibold shrink-0 ${
                      item.badge === 'Aqlli'
                        ? 'bg-[#167D72] text-white'
                        : item.badge === 'Jonli'
                        ? 'bg-amber-100 text-amber-800'
                        : item.badge === 'Pro'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Info: Plan & Uzbek Tagline */}
      {!collapsed && (
        <div className="p-3.5 m-3 rounded-xl bg-linear-to-br from-[#EAF6F2] to-[#E2F2EC] border border-[#BCE3D7]/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#125B54] uppercase tracking-wider flex items-center gap-1">
              <Sparkle size={12} className="text-[#167D72]" /> Tarif: {currentPlan.toUpperCase()}
            </span>
            <span className="text-[10px] bg-white text-[#125B54] px-1.5 py-0.5 rounded-md font-medium border border-[#BCE3D7]">
              Demo
            </span>
          </div>
          <p className="text-[11px] text-[#33534C] italic leading-tight">
            "Bitta platforma. Klinikani samarali boshqarish."
          </p>
        </div>
      )}
    </aside>
  );
};
