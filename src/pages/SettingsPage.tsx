import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Clock,
  Bell,
  RotateCcw,
  Save,
  CheckCircle2,
  Send,
  Eye,
  EyeOff,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetDemoData, showToast } = useApp();

  const [clinicName, setClinicName] = useState(settings.clinicName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [address, setAddress] = useState(settings.address);
  const [phone, setPhone] = useState(settings.phone);
  const [workingDays, setWorkingDays] = useState(settings.workingDays);
  const [workingHours, setWorkingHours] = useState(settings.workingHours);
  const [defaultDuration, setDefaultDuration] = useState(settings.defaultAppointmentDuration);
  const [smsEnabled, setSmsEnabled] = useState(settings.smsRemindersEnabled);
  const [telegramEnabled, setTelegramEnabled] = useState(settings.telegramBotConnected);

  // Telegram bot settings
  const [botToken, setBotToken] = useState(() => {
    return localStorage.getItem('elvora_telegram_bot_token') || '';
  });
  const [botUsername, setBotUsername] = useState(() => {
    return localStorage.getItem('elvora_telegram_bot_username') || '@ElvoraHealthBot';
  });
  const [showToken, setShowToken] = useState(false);
  const [testChatId, setTestChatId] = useState('');
  const [isTestingBot, setIsTestingBot] = useState(false);

  const handleTestBot = async () => {
    if (!testChatId.trim()) {
      showToast('Iltimos, test xabari uchun Telegram Chat ID kiriting', 'error');
      return;
    }
    setIsTestingBot(true);
    try {
      const res = await fetch('/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: testChatId.trim(),
          customText: `🔔 <b>Elvora Health Test Xabarnomasi</b>\n\nTelegram boti tizim bilan to'liq integratsiya qilingan va ishlamoqda!\n\nVaqt: ${new Date().toLocaleTimeString('uz-UZ')}`,
        }),
      });
      const data = await res.json();
      if (data.delivered) {
        showToast('Test xabari Telegram orqali muvaffaqiyatli yetkazildi!', 'success');
      } else {
        showToast(data.note || data.error || 'Xabar yetkazilmadi. Token yoki Chat ID ni tekshiring.', 'info');
      }
    } catch {
      showToast('Telegram serveriga ulanishda xatolik', 'error');
    } finally {
      setIsTestingBot(false);
    }
  };

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

    localStorage.setItem('elvora_telegram_bot_token', botToken);
    localStorage.setItem('elvora_telegram_bot_username', botUsername);
    showToast('Klinika sozlamalari muvaffaqiyatli saqlandi!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Klinika sozlamalari
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Tibbiyot muassasasi rekvizitlari, ish soatlari, eslatmalar va Telegram boti parametrlari
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
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E2E8F0]">
            <Building2 size={18} className="text-[#0284C7]" />
            <h3 className="text-sm font-bold text-[#0F172A]">
              Klinika umumiy ma'lumotlari
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Klinika rasmiy nomi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Klinika shiori / Toifasi
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Aloqa telefoni (Call-markaz)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Asosiy valyuta
              </label>
              <input
                type="text"
                disabled
                value="O'zbek so'mi (UZS)"
                className="w-full px-3 py-2 text-xs bg-slate-100 border border-[#E2E8F0] rounded-xl text-[#64748B] cursor-not-allowed"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Bosh bino manzili
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20"
              />
            </div>
          </div>
        </Card>

        {/* Operating Schedule & Service Durations */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E2E8F0]">
            <Clock size={18} className="text-[#0284C7]" />
            <h3 className="text-sm font-bold text-[#0F172A]">
              Ish vaqti va qabul davomiyligi
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Klinika ish kunlari
              </label>
              <input
                type="text"
                value={workingDays}
                onChange={(e) => setWorkingDays(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Ish soatlari (Kassa va qabullar)
              </label>
              <input
                type="text"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Standart qabul vaqti (daqiqa)
              </label>
              <select
                value={defaultDuration}
                onChange={(e) => setDefaultDuration(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
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

        {/* Telegram Bot Automation & Credentials */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0088CC] text-white flex items-center justify-center font-bold text-xs">
                ✈️
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  Telegram Bot Avtomatizatsiyasi va Eslatmalar
                </h3>
                <p className="text-[11px] text-[#64748B]">
                  Qabullarni avtomatik tasdiqlash, 24 soat va 2 soat oldingi eslatmalar
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-teal-50 text-[#0D9488] font-bold px-2 py-0.5 rounded-full border border-teal-200">
              Jonli integratsiya
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-sky-50/60 border border-sky-100">
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">
                  Telegram avtomatik xabarnomalar xizmati
                </h4>
                <p className="text-[11px] text-[#475569]">
                  Bemorlar va shifokorlarga rasmiy qabul chiptalari va o'zgarishlar haqida bot orqali xabar yuborish
                </p>
              </div>
              <input
                type="checkbox"
                checked={telegramEnabled}
                onChange={(e) => setTelegramEnabled(e.target.checked)}
                className="w-4 h-4 text-[#0284C7] rounded focus:ring-[#0284C7] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Telegram Bot Username
                </label>
                <input
                  type="text"
                  placeholder="@ElvoraHealthBot"
                  value={botUsername}
                  onChange={(e) => setBotUsername(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20"
                />
                <span className="text-[10px] text-[#64748B] mt-0.5 block">
                  @BotFather orqali yaratilgan botingiz nomi
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Telegram Bot API Token (Server Environment)
                </label>
                <div className="relative">
                  <input
                    type={showToken ? 'text' : 'password'}
                    placeholder="123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ..."
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    className="w-full pr-9 px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] font-mono focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
                  >
                    {showToken ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <span className="text-[10px] text-[#64748B] mt-0.5 block">
                  Xavfsizlik: Barcha so'rovlar faqat serverless API orqali amalga oshiriladi.
                </span>
              </div>
            </div>

            {/* Test Bot Delivery */}
            <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex-1 max-w-sm">
                <span className="font-semibold text-[#0F172A] block text-[11px] mb-1">
                  Sinov xabari yuborish (Chat ID orqali):
                </span>
                <input
                  type="text"
                  placeholder="Masalan: 987654321"
                  value={testChatId}
                  onChange={(e) => setTestChatId(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#E2E8F0] rounded-lg"
                />
              </div>
              <button
                type="button"
                onClick={handleTestBot}
                disabled={isTestingBot}
                className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-60 cursor-pointer"
              >
                <Send size={13} />
                <span>{isTestingBot ? 'Yuborilmoqda...' : 'Botni sinash'}</span>
              </button>
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
