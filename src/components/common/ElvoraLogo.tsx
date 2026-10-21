import React from 'react';
import { Link } from 'react-router-dom';

interface ElvoraLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  showSubtitle?: boolean;
  to?: string;
  className?: string;
}

export const ElvoraLogo: React.FC<ElvoraLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
  to = '/',
  className = '',
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const subTextSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';

  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-[#172923]';
  const subtitleColor = isLight ? 'text-[#CDEBDD]' : 'text-[#68756F]';

  const content = (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Abstract Minimal Medical Symbol: Interlocking geometric health arcs */}
      <div
        className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer soothing rounded health diamond / petal */}
          <rect
            x="4"
            y="4"
            width="32"
            height="32"
            rx="10"
            fill="#CDEBDD"
            className="transition-colors group-hover:fill-[#BCE3D0]"
          />
          {/* Inner Deep Medical Green geometric cross / healing node */}
          <path
            d="M20 10V30M10 20H30"
            stroke="#176B55"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Central organic vital nucleus */}
          <circle cx="20" cy="20" r="3.2" fill="#FFFFFF" />
          <circle cx="20" cy="20" r="1.5" fill="#176B55" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight ${textSize} ${textColor}`}>
            ELVORA
          </span>
          <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#CDEBDD] text-[#0F4C3C]">
            HEALTH
          </span>
        </div>
        {showSubtitle && (
          <span className={`font-medium tracking-wide uppercase mt-0.5 ${subTextSize} ${subtitleColor}`}>
            Private Medical Care
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
};
