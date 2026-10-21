import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
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
  Globe,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ElvoraLogo } from '../common/ElvoraLogo';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentPlan, settings } = useApp();

  const navigationItems = [
    {
      to: '/app/dashboard',
      label: 'Boshqaruv paneli',
      icon: <LayoutDashboard size={19} />,
      badge: null,
    },
    {
      to: '/app/patients',
      label: 'Bemorlar',
      icon: <Users size={19} />,
      badge: null,
    },
    {
      to: '/app/appointments',
      label: 'Qabullar va navbat',
      icon: <CalendarCheck2 size={19} />,
      badge: 'Jonli',
    },
    {
      to: '/app/doctors',
      label: 'Shifokorlar',
      icon: <Stethoscope size={19} />,
      badge: null,
    },
    {
      to: '/app/finance',
      label: 'Moliya',
      icon: <CircleDollarSign size={19} />,
      badge: null,
    },
    {
      to: '/app/insights',
      label: 'Elvora Insights',
      icon: <Sparkles size={19} className="text-[#176B55] animate-pulse" />,
      badge: 'Aqlli',
      highlight: true,
    },
    {
      to: '/app/reports',
      label: 'Hisobotlar',
      icon: <BarChart3 size={19} />,
      badge: currentPlan === 'basic' ? 'Pro' : null,
    },
    {
      to: '/app/staff',
      label: 'Xodimlar va rollar',
      icon: <ShieldAlert size={19} />,
      badge: null,
    },
    {
      to: '/app/subscription',
      label: 'Obuna va tariflar',
      icon: <CreditCard size={19} />,
      badge: currentPlan.toUpperCase(),
    },
    {
      to: '/app/settings',
      label: 'Sozlamalar',
      icon: <Settings size={19} />,
      badge: null,
    },
  ];

  return (
    <aside
      className={`relative flex flex-col bg-white border-r border-[#E2E8E3] transition-all duration-300 ease-in-out shrink-0 select-none z-20 ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-18 px-4 border-b border-[#E2E8E3]">
        {!collapsed ? (
          <ElvoraLogo size="sm" to="/" />
        ) : (
          <Link to="/" className="mx-auto">
            <div className="w-9 h-9 rounded-xl bg-[#CDEBDD] flex items-center justify-center text-[#176B55] font-bold">
              E
            </div>
          </Link>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
          title={collapsed ? 'Kengaytirish' : 'Yig\'ish'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Clinic Selector / Current Clinic Info */}
      <div className="px-3.5 py-3 border-b border-[#E2E8E3] bg-[#F7F8F5]">
        <div
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-white border border-[#E2E8E3] shadow-2xs ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <Building2 size={16} className="text-[#176B55] shrink-0" />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#172923] truncate">
                {settings.clinicName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#176B55] animate-pulse" />
                <span className="text-[10px] text-[#68756F] font-medium">Bosh filial</span>
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
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-[#EBF6F0] text-[#176B55] font-bold shadow-2xs'
                  : 'text-[#68756F] hover:text-[#172923] hover:bg-[#F7F8F5]'
              } ${item.highlight ? 'relative overflow-hidden' : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`shrink-0 transition-colors ${
                    isActive ? 'text-[#176B55]' : 'text-[#68756F] group-hover:text-[#172923]'
                  }`}
                >
                  {item.icon}
                </span>

                {!collapsed && (
                  <span className="flex-1 truncate tracking-tight">{item.label}</span>
                )}

                {!collapsed && item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-bold shrink-0 ${
                      item.badge === 'Aqlli'
                        ? 'bg-[#176B55] text-white'
                        : item.badge === 'Jonli'
                        ? 'bg-[#CDEBDD] text-[#0F4C3C]'
                        : item.badge === 'Pro'
                        ? 'bg-emerald-100 text-[#176B55]'
                        : 'bg-[#EBF6F0] text-[#176B55]'
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

      {/* Back to Public Site Link */}
      <div className="px-3 py-2 border-t border-[#E2E8E3]">
        <Link
          to="/"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#176B55] hover:bg-[#EBF6F0] transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Bosh sahifaga qaytish"
        >
          <Globe size={16} />
          {!collapsed && <span>Bosh sahifaga (Landing)</span>}
        </Link>
      </div>

      {/* Footer Info: Plan & Uzbek Tagline */}
      {!collapsed && (
        <div className="p-3.5 m-3 rounded-2xl bg-[#EBF6F0] border border-[#CDEBDD] shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#0F4C3C] uppercase tracking-wider flex items-center gap-1">
              <Sparkle size={12} className="text-[#176B55]" /> Tarif: {currentPlan.toUpperCase()}
            </span>
            <span className="text-[10px] bg-white text-[#176B55] px-2 py-0.5 rounded-md font-bold border border-[#CDEBDD]">
              Demo
            </span>
          </div>
          <p className="text-[11px] text-[#68756F] italic leading-tight">
            "Your clinic. One intelligent system."
          </p>
        </div>
      )}
    </aside>
  );
};
