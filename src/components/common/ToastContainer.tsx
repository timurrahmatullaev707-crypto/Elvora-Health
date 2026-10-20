import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />,
          error: <AlertCircle size={18} className="text-rose-600 shrink-0" />,
          warning: <AlertTriangle size={18} className="text-amber-600 shrink-0" />,
          info: <Info size={18} className="text-blue-600 shrink-0" />,
        };

        const bgStyles = {
          success: 'bg-[#F0FDF4] border-[#BBF7D0]',
          error: 'bg-[#FEF2F2] border-[#FECACA]',
          warning: 'bg-[#FFFBEB] border-[#FDE68A]',
          info: 'bg-[#EFF6FF] border-[#BFDBFE]',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg transition-all animate-in slide-in-from-right duration-200 ${
              bgStyles[toast.type]
            }`}
          >
            {icons[toast.type]}
            <p className="text-xs font-medium text-[#20312F] flex-1 leading-snug">
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#71817D] hover:text-[#20312F] transition-colors p-0.5"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
