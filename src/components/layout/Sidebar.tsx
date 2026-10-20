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
      icon: <Sparkles size={19} className="text-[#008BFF] animate-pulse" />,
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
      className={`relative flex flex-col bg-white border-r border-[#E6EBEF] transition-all duration-300 ease-in-out shrink-0 select-none z-20 ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-17 px-4 border-b border-[#E2E8F0]">
        <Link to="/" className="flex items-center gap-3 overflow-hidden group">
          {/* Logo Mark */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#008BFF] via-[#00B4D8] to-[#0D34B4] flex items-center justify-center shrink-0 shadow-md text-white relative group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M2 12h20M7 7l10 10M17 7 7 17" />
            </svg>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-cyan-400 rounded-full border-2 border-white animate-pulse" />
          </div>

          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-base tracking-tight text-[#101C2C] leading-none">
                ELVORA <span className="text-[#008BFF]">HEALTH</span>
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 truncate">
                Tibbiyot MIS
              </span>
            </div>
          )}
        </Link>

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
      <div className="px-3.5 py-3 border-b border-[#E2E8F0] bg-[#F8FBFE]">
        <div
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <Building2 size={16} className="text-[#008BFF] shrink-0" />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">
                {settings.clinicName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#008BFF] animate-pulse"></span>
                <span className="text-[10px] text-slate-500 font-medium">Bosh filial</span>
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
                  ? 'bg-cyan-50/90 text-[#008BFF] border-r-2 border-[#008BFF] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              } ${item.highlight ? 'relative overflow-hidden' : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`shrink-0 transition-colors ${
                    isActive ? 'text-[#008BFF]' : 'text-slate-500 group-hover:text-slate-900'
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
                        ? 'bg-[#008BFF] text-white'
                        : item.badge === 'Jonli'
                        ? 'bg-amber-100 text-amber-800'
                        : item.badge === 'Pro'
                        ? 'bg-blue-100 text-[#0D34B4]'
                        : 'bg-cyan-100 text-[#008BFF]'
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
      <div className="px-3 py-2 border-t border-[#E2E8F0]">
        <Link
          to="/"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#008BFF] hover:bg-cyan-50 transition-colors ${
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
        <div className="p-3.5 m-3 rounded-2xl bg-gradient-to-br from-[#EBF7FC] via-[#F0F8FD] to-white border border-cyan-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#0D34B4] uppercase tracking-wider flex items-center gap-1">
              <Sparkle size={12} className="text-[#008BFF]" /> Tarif: {currentPlan.toUpperCase()}
            </span>
            <span className="text-[10px] bg-white text-[#008BFF] px-2 py-0.5 rounded-md font-bold border border-cyan-200">
              Demo
            </span>
          </div>
          <p className="text-[11px] text-slate-600 italic leading-tight">
            "Your clinic. One intelligent system."
          </p>
        </div>
      )}
    </aside>
  );
};
