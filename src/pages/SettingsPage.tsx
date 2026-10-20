import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Clock,
  Bell,
  RotateCcw,
  Save,
  CheckCircle2,
  DollarSign,
  Globe,
  Shield,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetDemoData, userProfile, showToast } = useApp();

  const [clinicName, setClinicName] = useState(settings.clinicName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [address, setAddress] = useState(settings.address);
  const [phone, setPhone] = useState(settings.phone);
  const [workingDays, setWorkingDays] = useState(settings.workingDays);
  const [workingHours, setWorkingHours] = useState(settings.workingHours);
  const [defaultDuration, setDefaultDuration] = useState(settings.defaultAppointmentDuration);
  const [smsEnabled, setSmsEnabled] = useState(settings.smsRemindersEnabled);
  const [telegramEnabled, setTelegramEnabled] = useState(settings.telegramBotConnected);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      clinicName,
      tagline,
      address,
      phone,
      workingDays,
      workingHours,
      defaultAppointmentDuration: Number(defaultDuration),
      smsRemindersEnabled: smsEnabled,
      telegramBotConnected: telegramEnabled,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#20312F] tracking-tight">
            Klinika sozlamalari
          </h1>
          <p className="text-xs text-[#71817D] mt-0.5">
            Tibbiyot muassasasi rekvizitlari, ish soatlari, eslatmalar va tizim parametrlari
          </p>
        </div>

        <Button
          variant="outline"
          icon={<RotateCcw size={14} />}
          onClick={resetDemoData}
        >
          Namunaviy ma'lumotlarni tiklash
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Clinic General Profile */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E4EBE8]">
            <Building2 size={18} className="text-[#167D72]" />
            <h3 className="text-sm font-bold text-[#20312F]">
              Klinika umumiy ma'lumotlari
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#20312F] mb-1">
                Klinika rasmiy nomi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F] focus:outline-none focus:ring-2 focus:ring-[#167D72]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#20312F] mb-1">
                Klinika shiori / Toifasi
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F] focus:outline-none focus:ring-2 focus:ring-[#167D72]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#20312F] mb-1">
                Aloqa telefoni (Call-markaz)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F] focus:outline-none focus:ring-2 focus:ring-[#167D72]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#20312F] mb-1">
                Asosiy valyuta
              </label>
              <input
                type="text"
                disabled
                value="O'zbek so'mi (UZS)"
                className="w-full px-3 py-2 text-xs bg-gray-100 border border-[#E4EBE8] rounded-xl text-[#71817D] cursor-not-allowed"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#20312F] mb-1">
                Bosh bino manzili
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F] focus:outline-none focus:ring-2 focus:ring-[#167D72]/20"
              />
            </div>
          </div>
        </Card>

        {/* Operating Schedule & Service Durations */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E4EBE8]">
            <Clock size={18} className="text-[#167D72]" />
            <h3 className="text-sm font-bold text-[#20312F]">
              Ish vaqti va qabul davomiyligi
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#20312F] mb-1">
                Klinika ish kunlari
              </label>
              <input
                type="text"
                value={workingDays}
                onChange={(e) => setWorkingDays(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#20312F] mb-1">
                Ish soatlari (Kassa va qabullar)
              </label>
              <input
                type="text"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#20312F] mb-1">
                Standart qabul vaqti (daqiqa)
              </label>
              <select
                value={defaultDuration}
                onChange={(e) => setDefaultDuration(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#F5F8F7] border border-[#E4EBE8] rounded-xl text-[#20312F]"
              >
                <option value={15}>15 daqiqa</option>
                <option value={20}>20 daqiqa</option>
                <option value={30}>30 daqiqa (standart)</option>
                <option value={45}>45 daqiqa</option>
                <option value={60}>60 daqiqa</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Notifications & Automation Integrations */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E4EBE8]">
            <Bell size={18} className="text-[#167D72]" />
            <h3 className="text-sm font-bold text-[#20312F]">
              Eslatmalar va integratsiyalar (Simulyatsiya)
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAFDFB] border border-[#E4EBE8]">
              <div>
                <h4 className="text-xs font-bold text-[#20312F]">
                  SMS orqali qabul eslatmalarini yuborish
                </h4>
                <p className="text-[11px] text-[#71817D]">
                  Bemorlarga qabuldan 24 soat va 2 soat oldin avtomatik eslatma jo'natish
                </p>
              </div>
              <input
                type="checkbox"
                checked={smsEnabled}
                onChange={(e) => setSmsEnabled(e.target.checked)}
                className="w-4 h-4 text-[#167D72] rounded focus:ring-[#167D72]"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAFDFB] border border-[#E4EBE8]">
              <div>
                <h4 className="text-xs font-bold text-[#20312F]">
                  Telegram Bot integratsiyasi
                </h4>
                <p className="text-[11px] text-[#71817D]">
                  Shifokorlarga yangi navbat va o'zgarishlar haqida bepul Telegram xabarnoma yuborish
                </p>
              </div>
              <input
                type="checkbox"
                checked={telegramEnabled}
                onChange={(e) => setTelegramEnabled(e.target.checked)}
                className="w-4 h-4 text-[#167D72] rounded focus:ring-[#167D72]"
              />
            </div>
          </div>
        </Card>

        {/* Save button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            icon={<Save size={15} />}
          >
            Sozlamalarni saqlash
          </Button>
        </div>
      </form>
    </div>
  );
};
