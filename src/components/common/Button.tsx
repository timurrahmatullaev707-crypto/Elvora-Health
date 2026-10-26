import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'mint';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2 gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-sm shadow-[#0F172A]/15 active:scale-[0.98]',
    secondary:
      'bg-sky-50 text-[#0284C7] hover:bg-sky-100 active:bg-sky-200 border border-sky-200',
    mint:
      'bg-teal-50 text-[#0D9488] border border-teal-200 hover:bg-teal-100',
    outline:
      'border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-slate-50 hover:border-[#CBD5E1]',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 shadow-sm active:bg-rose-800',
    ghost:
      'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
