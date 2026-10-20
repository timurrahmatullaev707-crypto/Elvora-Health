import React, { useState } from 'react';
import {
  Users,
  Check,
  X,
  Plus,
  ShieldCheck,
  Lock,
  Sparkles,
  Sliders,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { UserRole } from '../types';
import { DEFAULT_ROLE_PERMISSIONS } from '../lib/permissions';

export const StaffPage: React.FC = () => {
  const { currentRole, setCurrentRole, currentPlan, doctors, showToast } = useApp();
  const [customRoleNotice, setCustomRoleNotice] = useState(false);

  const rolesList: { role: UserRole; label: string; desc: string }[] = [
    { role: 'owner', label: 'Ta\'sischi (Owner)', desc: 'To‘liq boshqaruv, moliya, xodimlar va obuna huquqi' },
    { role: 'admin', label: 'Bosh Vrach (Admin)', desc: 'Klinik jarayonlar, shifokorlar va qabullar nazorati' },
    { role: 'accountant', label: 'Hisobchi (Finance)', desc: 'Faqat moliya, to‘lovlar, kassa va hisobotlar' },
    { role: 'doctor', label: 'Shifokor (Doctor)', desc: 'Bemorlar kartasi, tashxislar va o‘z qabullari' },
    { role: 'receptionist', label: 'Registrator', desc: 'Qabulga yozish, jonli navbat va kassa cheklari' },
  ];

  const modulesList = [
    { key: 'dashboard', name: 'Boshqaruv paneli (Dashboard)', res: 'patients' as const },
    { key: 'patients', name: 'Bemorlar kartotekasi (Baza, tahrirlash)', res: 'patients' as const },
    { key: 'appointments', name: 'Qabullar va E-Navbat (Taqvim, navbat)', res: 'appointments' as const },
    { key: 'doctors', name: 'Shifokorlar va ish jadvali boshqaruvi', res: 'doctors' as const },
    { key: 'finance', name: 'Moliya va kassa amallari (Kirim, chiqim)', res: 'finance' as const },
    { key: 'insights', name: 'Elvora Insights™ (Strategik tahlil)', res: 'insights' as const },
    { key: 'reports', name: 'Klinik va moliyaviy hisobotlar', res: 'reports' as const },
    { key: 'staff', name: 'Xodimlar shtati va rollar matritsasi', res: 'staff' as const },
    { key: 'settings', name: 'Klinika parametrlari va tariflar', res: 'settings' as const },
  ];

  const demoStaffList = [
    {
      name: 'Farrux Zokirov',
      email: 'owner@elvora.uz',
      role: 'owner' as UserRole,
      roleTitle: 'Klinika Ta\'sischisi / Investor',
      phone: '+998 90 100 00 01',
      status: 'Faol',
    },
    {
      name: 'Dr. Azizbek Rahimov',
      email: 'admin@elvora.uz',
      role: 'admin' as UserRole,
      roleTitle: 'Bosh Shifokor / Klinika Rahbari',
      phone: '+998 90 999 00 11',
      status: 'Faol',
    },
    {
      name: 'Nodira Usmonova',
      email: 'buxgalter@elvora.uz',
      role: 'accountant' as UserRole,
      roleTitle: 'Bosh Hisobchi (Buxgalter)',
      phone: '+998 90 555 77 88',
      status: 'Faol',
    },
    {
      name: 'Dilnoza Karimova',
      email: 'reception1@elvora.uz',
      role: 'receptionist' as UserRole,
      roleTitle: 'Katta Registrator',
      phone: '+998 90 222 11 00',
      status: 'Faol',
    },
    ...doctors.slice(0, 3).map((d) => ({
      name: d.fullName,
      email: d.email || `${d.specialty.toLowerCase()}@elvora.uz`,
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
          <h1 className="text-xl font-bold text-[#132229] tracking-tight">
            Xodimlar va foydalanuvchi rollari
          </h1>
          <p className="text-xs text-[#5F737B] mt-0.5">
            Rolga asoslangan kirish huquqlari (RBAC) va xodimlar ruxsatnomalari matritsasi
          </p>
        </div>

        {/* Live Role Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-2xl border border-[#DFE8E4] shadow-xs">
          <span className="text-[11px] font-bold text-[#5F737B] pl-2 pr-1">
            Faol rol:
          </span>
          {rolesList.map((r) => (
            <button
              key={r.role}
              onClick={() => setCurrentRole(r.role)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                currentRole === r.role
                  ? 'bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white shadow-xs'
                  : 'text-[#5F737B] hover:text-[#132229] hover:bg-slate-50'
              }`}
            >
              {r.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Security Note Banner */}
      <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 text-xs text-slate-700 flex items-start gap-3">
        <ShieldCheck size={20} className="text-[#008BFF] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900">
            Xavfsizlik va ruxsatnomalar arxitekturasi:
          </p>
          <p className="leading-relaxed text-slate-600">
            Foydalanuvchi interfeysidagi har bir tugma, forma va eksport amali markaziy <code>can(user, action, resource)</code> orqali boshqariladi.
            Production tizimida ushbu tekshiruvlar FastAPI backend qatlamida avtorizatsiya tokenlari (JWT) bilan qat'iy tekshiriladi.
          </p>
        </div>
      </div>

      {/* Permissions Matrix Card */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 bg-[#F8FAF9] border-b border-[#DFE8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-[#132229] uppercase tracking-wider">
                Ruxsatlar va xavfsizlik darajalari matritsasi (5 ta rol)
              </h3>
              {currentPlan === 'business' ? (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold border border-emerald-300">
                  Business: Tahrirlash ochiq
                </span>
              ) : (
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold border border-slate-200">
                  Standart qat'iy matritsa
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#5F737B] mt-0.5">
              Har bir xodim o‘z vazifasiga mos modullarga kirish huquqiga ega
            </p>
          </div>

          {currentPlan !== 'business' && (
            <button
              onClick={() => setCustomRoleNotice(!customRoleNotice)}
              className="text-xs font-bold text-[#008BFF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sliders size={13} />
              <span>Matritsani o‘zgartirish haqida</span>
            </button>
          )}
        </div>

        {customRoleNotice && (
          <div className="p-3 bg-amber-50 border-b border-amber-200 text-xs text-amber-800 flex items-center justify-between">
            <span>
              ℹ️ Ruxsatnomalar matritsasini klinikangiz talablariga moslab tahrirlash <strong>Business</strong> tarifida mavjud.
            </span>
            <button
              onClick={() => setCustomRoleNotice(false)}
              className="font-bold text-amber-900 hover:underline"
            >
              Yopish
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF9] border-b border-[#DFE8E4] text-[#5F737B] font-semibold text-[10px] uppercase">
              <tr>
                <th className="px-5 py-3">Modul / Yo‘nalish</th>
                <th className="px-3 py-3 text-center">Owner</th>
                <th className="px-3 py-3 text-center">Admin</th>
                <th className="px-3 py-3 text-center">Hisobchi</th>
                <th className="px-3 py-3 text-center">Registrator</th>
                <th className="px-3 py-3 text-center">Shifokor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFE8E4]/60">
              {modulesList.map((m) => {
                const ownerOk = DEFAULT_ROLE_PERMISSIONS.owner[m.res]?.view;
                const adminOk = DEFAULT_ROLE_PERMISSIONS.admin[m.res]?.view;
                const accOk = DEFAULT_ROLE_PERMISSIONS.accountant[m.res]?.view;
                const recOk = DEFAULT_ROLE_PERMISSIONS.receptionist[m.res]?.view;
                const docOk = DEFAULT_ROLE_PERMISSIONS.doctor[m.res]?.view;

                return (
                  <tr key={m.key} className="hover:bg-[#F8FAF9]">
                    <td className="px-5 py-3 font-medium text-[#132229]">
                      {m.name}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <PermissionCheck isAllowed={ownerOk} />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <PermissionCheck isAllowed={adminOk} />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <PermissionCheck isAllowed={accOk} />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <PermissionCheck isAllowed={recOk} />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <PermissionCheck isAllowed={docOk} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Staff List */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 bg-[#F8FAF9] border-b border-[#DFE8E4] flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#132229] uppercase tracking-wider">
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
            <thead className="bg-[#F8FAF9] border-b border-[#DFE8E4] text-[#5F737B] font-semibold text-[10px] uppercase">
              <tr>
                <th className="px-5 py-3">Xodim F.I.SH.</th>
                <th className="px-4 py-3">Roli va lavozimi</th>
                <th className="px-4 py-3">Aloqa</th>
                <th className="px-4 py-3">Holati</th>
                <th className="px-5 py-3 text-right">Roli bilan sinash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFE8E4]/60">
              {demoStaffList.map((staff, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAF9]">
                  <td className="px-5 py-3 font-semibold text-[#132229]">
                    {staff.name}
                  </td>
                  <td className="px-4 py-3 text-[#5F737B]">
                    <div className="font-medium text-[#132229]">{staff.roleTitle}</div>
                    <span className="text-[10px] text-[#008BFF] uppercase font-bold">
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#5F737B] font-mono text-[11px]">
                    <div>{staff.phone}</div>
                    <div className="text-[10px] text-[#5F737B]">{staff.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => setCurrentRole(staff.role)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentRole === staff.role
                          ? 'bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white shadow-2xs'
                          : 'bg-white text-[#5F737B] border border-[#DFE8E4] hover:bg-slate-50'
                      }`}
                    >
                      {currentRole === staff.role ? 'Hozirgi profil ✓' : 'Tanlash'}
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

const PermissionCheck: React.FC<{ isAllowed?: boolean }> = ({ isAllowed }) => {
  if (isAllowed) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
        <Check size={14} />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400">
      <X size={14} />
    </span>
  );
};
