import React from 'react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  badge?: React.ReactNode;
  iconBgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  badge,
  iconBgColor = 'bg-[#DDF5EB] text-[#0D7C74]',
}) => {
  return (
    <Card className="flex flex-col justify-between" hoverable>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#687586] tracking-wide uppercase">
            {title}
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-[#101C2C] mt-1 tracking-tight">
            {value}
          </div>
        </div>
        <div className={`p-3 rounded-xl shrink-0 ${iconBgColor}`}>
          {icon}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E6EBEF] flex items-center justify-between text-xs">
        {subtitle && <span className="text-[#687586]">{subtitle}</span>}
        {trend && (
          <span
            className={`font-semibold inline-flex items-center gap-0.5 ${
              trend.isPositive ? 'text-emerald-700' : 'text-rose-600'
            }`}
          >
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
        )}
        {badge}
      </div>
    </Card>
  );
};
