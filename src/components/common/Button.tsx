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
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#176B55]/25 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2 gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#176B55] hover:bg-[#0F4C3C] text-white shadow-xs active:bg-[#0D3F32]',
    secondary:
      'bg-[#EBF6F0] text-[#176B55] hover:bg-[#CDEBDD] active:bg-[#BCE3D0] border border-[#CDEBDD]',
    mint:
      'bg-[#CDEBDD] text-[#0F4C3C] hover:bg-[#BCE3D0] border border-[#BCE3D0]',
    outline:
      'border border-[#E2E8E3] bg-white text-[#172923] hover:bg-[#F7F8F5] hover:border-[#176B55]/30',
    danger:
      'bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-xs active:bg-[#B91C1C]',
    ghost:
      'text-[#68756F] hover:text-[#172923] hover:bg-[#EBF6F0]',
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
