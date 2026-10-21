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
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#008BFF]/25 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2 gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#008BFF] to-[#0D34B4] text-white hover:opacity-95 shadow-xs active:scale-[0.98]',
    secondary:
      'bg-cyan-50 text-[#008BFF] hover:bg-cyan-100 active:bg-cyan-200 border border-cyan-200',
    mint:
      'bg-[#EBF7FC] text-[#008BFF] border border-cyan-200 hover:bg-[#E0F2FE]',
    outline:
      'border border-slate-200 bg-white text-slate-800 hover:bg-[#F8FBFE] hover:border-cyan-300',
    danger:
      'bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-xs active:bg-[#B91C1C]',
    ghost:
      'text-[#5F737B] hover:text-[#101C2C] hover:bg-[#F8FBFE]',
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
