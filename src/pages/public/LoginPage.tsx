import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { setCurrentRole, showToast } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@shifomed.uz');
  const [password, setPassword] = useState('elvora2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Elektron pochta va parolni kiriting');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Tizimga muvaffaqiyatli kirildi! (Demo rejim)', 'success');
      navigate('/app/dashboard');
    }, 400);
  };

  const handleDemoPreset = (presetRole: UserRole, presetEmail: string) => {
    setCurrentRole(presetRole);
    setEmail(presetEmail);
    setPassword('elvora2026');
    showToast(`Tanlangan rol bo'yicha kirish tayyorlandi: ${presetRole}`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EBF7FC]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#EFF6FF]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header Back to Home */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 space-y-4">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#008BFF] to-[#0D34B4] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
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
          </div>
          <span className="font-bold text-xl tracking-tight text-[#101C2C]">
            ELVORA <span className="text-[#008BFF]">HEALTH</span>
          </span>
        </Link>

        <div>
          <h2 className="text-2xl font-bold text-[#101C2C] tracking-tight">
            Klinika tizimiga kirish
          </h2>
          <p className="text-xs text-[#687586] mt-1">
            Boshqaruv paneliga ulanish uchun ma'lumotlaringizni kiriting
          </p>
        </div>
      </div>

      {/* Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 rounded-2xl border border-[#E6EBEF] shadow-lg space-y-6">
          {/* Demo Notice Banner */}
          <div className="p-3 rounded-xl bg-[#EBF7FC] border border-[#BAE6FD] text-xs text-[#0D34B4] flex items-start gap-2">
            <Sparkles size={16} className="text-[#008BFF] shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Demo namoyish rejimi:</strong> Istalgan profilni tanlab, to'g'ridan-to'g'ri tizimga kirishingiz mumkin.
            </p>
          </div>

            {/* Quick Preset Buttons for All 5 Roles */}
            <div>
              <span className="text-[11px] font-bold text-[#687586] uppercase tracking-wider block mb-2">
                Tezkor demo rollar (5 ta rol):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoPreset('owner', 'owner@elvora.uz')}
                  className="p-2 text-center rounded-xl bg-cyan-50/60 border border-cyan-200 hover:border-[#008BFF] hover:bg-cyan-100/50 transition-all text-xs font-semibold text-slate-800"
                >
                  Ta'sischi (Owner)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoPreset('admin', 'admin@elvora.uz')}
                  className="p-2 text-center rounded-xl bg-[#F8FAF8] border border-[#E6EBEF] hover:border-[#008BFF] hover:bg-[#EBF7FC]/30 transition-all text-xs font-semibold text-[#101C2C]"
                >
                  Bosh Vrach (Admin)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoPreset('accountant', 'buxgalter@elvora.uz')}
                  className="p-2 text-center rounded-xl bg-[#F8FAF8] border border-[#E6EBEF] hover:border-emerald-500 hover:bg-emerald-50 transition-all text-xs font-semibold text-[#101C2C]"
                >
                  Hisobchi (Finance)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoPreset('receptionist', 'reception@elvora.uz')}
                  className="p-2 text-center rounded-xl bg-[#F8FAF8] border border-[#E6EBEF] hover:border-[#008BFF] hover:bg-[#EBF7FC]/30 transition-all text-xs font-semibold text-[#101C2C]"
                >
                  Registrator
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoPreset('doctor', 'doctor@elvora.uz')}
                  className="p-2 text-center rounded-xl bg-[#F8FAF8] border border-[#E6EBEF] hover:border-[#008BFF] hover:bg-[#EBF7FC]/30 transition-all text-xs font-semibold text-[#101C2C]"
                >
                  Shifokor (Doctor)
                </button>
              </div>
            </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#101C2C] mb-1">
                Elektron pochta yoki login
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#687586]"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@shifomed.uz"
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#F8FAF8] border border-[#E6EBEF] rounded-xl text-[#101C2C] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#101C2C]">
                  Parol
                </label>
                <span className="text-[11px] text-[#008BFF] hover:underline cursor-pointer">
                  Parolni unutdingizmi?
                </span>
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#687586]"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-xs bg-[#F8FAF8] border border-[#E6EBEF] rounded-xl text-[#101C2C] focus:outline-none focus:ring-2 focus:ring-[#008BFF]/20 focus:border-[#008BFF]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#687586] hover:text-[#101C2C]"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-[#687586]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#008BFF] focus:ring-[#008BFF]"
                />
                <span>Meni eslab qol</span>
              </label>
            </div>

            {/* Error state */}
            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#008BFF] text-white text-xs font-bold hover:bg-[#0D34B4] shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Tizimga kirish</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Back to Home Link */}
          <div className="pt-2 text-center">
            <Link
              to="/"
              className="text-xs text-[#687586] hover:text-[#101C2C] font-medium"
            >
              ← Bosh sahifaga qaytish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
