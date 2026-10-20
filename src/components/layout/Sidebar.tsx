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
      icon: <Sparkles size={19} className="text-[#0D7C74] animate-pulse" />,
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
      <div className="flex items-center justify-between h-17 px-4 border-b border-[#E6EBEF]">
        <Link to="/" className="flex items-center gap-3 overflow-hidden group">
          {/* Logo Mark */}
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#0D7C74] to-[#065F55] flex items-center justify-center shrink-0 shadow-xs text-white relative">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4v16m-8-8h16" />
            </svg>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
          </div>

          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-base tracking-tight text-[#101C2C] leading-none">
                ELVORA <span className="text-[#0D7C74]">HEALTH</span>
              </span>
              <span className="text-[10px] text-[#687586] mt-1 truncate">
                Tibbiyot SaaS
              </span>
            </div>
          )}
        </Link>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-[#687586] hover:text-[#101C2C] hover:bg-[#F8FAF8] transition-colors shrink-0 cursor-pointer"
          title={collapsed ? 'Kengaytirish' : 'Yig\'ish'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Clinic Selector / Current Clinic Info */}
      <div className="px-3.5 py-3 border-b border-[#E6EBEF] bg-[#F8FAF9]">
        <div
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-white border border-[#E6EBEF] ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <Building2 size={16} className="text-[#0D7C74] shrink-0" />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#101C2C] truncate">
                {settings.clinicName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] text-[#687586]">Bosh filial</span>
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
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-[#DDF5EB] text-[#065F55] font-semibold shadow-2xs'
                  : 'text-[#687586] hover:text-[#101C2C] hover:bg-[#F8FAF8]'
              } ${item.highlight ? 'relative overflow-hidden' : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`shrink-0 transition-colors ${
                    isActive ? 'text-[#0D7C74]' : 'text-[#687586] group-hover:text-[#101C2C]'
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
                        ? 'bg-[#0D7C74] text-white'
                        : item.badge === 'Jonli'
                        ? 'bg-amber-100 text-amber-800'
                        : item.badge === 'Pro'
                        ? 'bg-[#EAE7FF] text-[#5B46E8]'
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

      {/* Back to Public Site Link */}
      <div className="px-3 py-2 border-t border-[#E6EBEF]">
        <Link
          to="/"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#687586] hover:text-[#0D7C74] hover:bg-[#DDF5EB]/30 transition-colors ${
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
        <div className="p-3.5 m-3 rounded-xl bg-linear-to-br from-[#DDF5EB] to-[#E6F5F0] border border-[#BCE8D7]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#065F55] uppercase tracking-wider flex items-center gap-1">
              <Sparkle size={12} className="text-[#0D7C74]" /> Tarif: {currentPlan.toUpperCase()}
            </span>
            <span className="text-[10px] bg-white text-[#065F55] px-1.5 py-0.5 rounded-md font-medium border border-[#BCE8D7]">
              Demo
            </span>
          </div>
          <p className="text-[11px] text-[#33534C] italic leading-tight">
            "Your clinic. One intelligent system."
          </p>
        </div>
      )}
    </aside>
  );
};
