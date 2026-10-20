import React from 'react';
import { AppointmentStatus } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-[#EBF7FC] text-[#0D34B4] border-[#BAE6FD]',
    success: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
    warning: 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]',
    danger: 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]',
    neutral: 'bg-[#F8FAF8] text-[#101C2C] border-[#E6EBEF]',
    info: 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export const AppointmentStatusBadge: React.FC<{ status: AppointmentStatus }> = ({ status }) => {
  switch (status) {
    case 'kutilmoqda':
      return (
        <Badge variant="warning">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          Kutilmoqda
        </Badge>
      );
    case 'qabulda':
      return (
        <Badge variant="info">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          Qabulda
        </Badge>
      );
    case 'yakunlandi':
      return (
        <Badge variant="success">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Yakunlandi
        </Badge>
      );
    case 'kelmagan':
      return (
        <Badge variant="danger">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
          Kelmagan
        </Badge>
      );
    case 'bekor_qilindi':
      return (
        <Badge variant="neutral">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
          Bekor qilindi
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};
