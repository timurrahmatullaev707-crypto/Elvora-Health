import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Check,
  X,
  UserCheck,
  Plus,
  ShieldCheck,
  Key,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { UserRole } from '../types';

export const StaffPage: React.FC = () => {
  const { currentRole, setCurrentRole, userProfile, doctors, showToast } = useApp();

  const permissionsMatrix = [
    {
      module: 'Boshqaruv paneli (Dashboard)',
      admin: true,
      receptionist: true,
      doctor: true,
    },
    {
      module: 'Bemorlar kartotekasi (Qo\'shish, ko\'rish, tahrirlash)',
      admin: true,
      receptionist: true,
      doctor: true,
    },
    {
      module: 'Qabullar va navbat boshqaruvi',
      admin: true,
      receptionist: true,
      doctor: false,
    },
    {
      module: 'Moliya va kassa amallari (Kirim, chiqim, bekor qilish)',
      admin: true,
      receptionist: false,
      doctor: false,
    },
    {
      module: 'Elvora Insights™ (Strategik operatsion tahlil)',
      admin: true,
      receptionist: false,
      doctor: false,
    },
    {
      module: 'Klinik va moliyaviy hisobotlar (Eksport va chop etish)',
      admin: true,
      receptionist: false,
      doctor: false,
    },
    {
      module: 'Xodimlar shtati va huquqlar boshqaruvi',
      admin: true,
      receptionist: false,
      doctor: false,
    },
    {
      module: 'Klinika parametrlari va tarif sozlamalari',
      admin: true,
      receptionist: false,
      doctor: false,
    },
  ];

  const demoStaffList = [
    {
      name: 'Dr. Azizbek Rahimov',
      email: 'azizbek@shifomed.uz',
      role: 'admin' as UserRole,
      roleTitle: 'Bosh shifokor / Klinika rahbari',
      phone: '+998 90 999 00 11',
      status: 'Faol',
    },
    {
      name: 'Dilnoza Karimova',
      email: 'reception1@shifomed.uz',
      role: 'receptionist' as UserRole,
      roleTitle: 'Katta registrator',
      phone: '+998 90 222 11 00',
      status: 'Faol',
    },
    {
      name: 'Sardorbek Yoqubov',
      email: 'reception2@shifomed.uz',
      role: 'receptionist' as UserRole,
      roleTitle: 'Navbatchi registrator',
      phone: '+998 93 333 44 11',
      status: 'Faol',
    },
    ...doctors.slice(0, 3).map((d) => ({
      name: d.fullName,
      email: d.email || `${d.specialty.toLowerCase()}@shifomed.uz`,
      role: 'doctor' as UserRole,
      roleTitle: `Shifokor — ${d.specialty}`,
      phone: d.phone,
      status: 'Faol',
    })),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#20312F] tracking-tight">
            Xodimlar va foydalanuvchi rollari
          </h1>
          <p className="text-xs text-[#71817D] mt-0.5">
            Rolga asoslangan kirish huquqlari (RBAC) va xodimlar ruxsatnomalari matritsasi
          </p>
        </div>

        {/* Live Role Simulator */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#E4EBE8] shadow-2xs">
          <span className="text-[11px] font-bold text-[#71817D] pl-2 pr-1">
            Simulyatsiya:
          </span>
          {(
            [
              { role: 'admin', label: 'Admin' },
              { role: 'receptionist', label: 'Registrator' },
              { role: 'doctor', label: 'Shifokor' },
            ] as const
          ).map((r) => (
            <button
              key={r.role}
              onClick={() => setCurrentRole(r.role)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                currentRole === r.role
                  ? 'bg-[#167D72] text-white shadow-xs'
                  : 'text-[#71817D] hover:text-[#20312F]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Permissions Matrix Card */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 bg-[#FAFDFB] border-b border-[#E4EBE8] flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#20312F] uppercase tracking-wider">
              Ruxsatlar va xavfsizlik darajalari matritsasi
            </h3>
            <p className="text-[11px] text-[#71817D] mt-0.5">
              Production rejimida ushbu cheklovlar FastAPI backend darajasida qat'iy tekshiriladi
            </p>
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
            RBAC Enforced
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFDFB] border-b border-[#E4EBE8] text-[#71817D] font-semibold text-[10px] uppercase">
              <tr>
                <th className="px-5 py-3">Modul / Funksional huquq</th>
                <th className="px-4 py-3 text-center">Klinika rahbari (Admin)</th>
                <th className="px-4 py-3 text-center">Registratura xodimi</th>
                <th className="px-4 py-3 text-center">Shifokor mutaxassis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4EBE8]/60">
              {permissionsMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#FAFDFB]">
                  <td className="px-5 py-3 font-medium text-[#20312F]">
                    {item.module}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                      <Check size={14} />
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.receptionist ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                        <Check size={14} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-50 text-rose-400">
                        <X size={14} />
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.doctor ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                        <Check size={14} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-50 text-rose-400">
                        <X size={14} />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Staff List */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 bg-[#FAFDFB] border-b border-[#E4EBE8] flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#20312F] uppercase tracking-wider">
            Klinika xodimlari ro'yxati ({demoStaffList.length})
          </h3>
          <Button
            size="sm"
            variant="outline"
            icon={<Plus size={13} />}
            onClick={() => showToast('Yangi xodim qo\'shish admin huquqi bilan amalga oshiriladi', 'info')}
          >
            Yangi xodim qo'shish
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFDFB] border-b border-[#E4EBE8] text-[#71817D] font-semibold text-[10px] uppercase">
              <tr>
                <th className="px-5 py-3">Xodim F.I.SH.</th>
                <th className="px-4 py-3">Roli va lavozimi</th>
                <th className="px-4 py-3">Aloqa</th>
                <th className="px-4 py-3">Holati</th>
                <th className="px-5 py-3 text-right">Roli bilan kirish</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4EBE8]/60">
              {demoStaffList.map((staff, idx) => (
                <tr key={idx} className="hover:bg-[#FAFDFB]">
                  <td className="px-5 py-3 font-semibold text-[#20312F]">
                    {staff.name}
                  </td>
                  <td className="px-4 py-3 text-[#506360]">
                    <div className="font-medium text-[#20312F]">{staff.roleTitle}</div>
                    <span className="text-[10px] text-[#71817D] uppercase font-bold">
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#506360] font-mono text-[11px]">
                    <div>{staff.phone}</div>
                    <div className="text-[10px] text-[#71817D]">{staff.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => setCurrentRole(staff.role)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        currentRole === staff.role
                          ? 'bg-[#EAF6F2] text-[#125B54] border border-[#BCE3D7]'
                          : 'bg-white text-[#71817D] border border-[#E4EBE8] hover:bg-[#F5F8F7]'
                      }`}
                    >
                      {currentRole === staff.role ? 'Hozirgi profil' : 'Sinab ko\'rish'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
