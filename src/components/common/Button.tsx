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
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#0D7C74]/25 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2 gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#0D7C74] text-white hover:bg-[#085F59] shadow-xs active:bg-[#064C47]',
    secondary:
      'bg-[#E6F5F0] text-[#085F59] hover:bg-[#D5EDE5] active:bg-[#C2E4D9]',
    mint:
      'bg-[#E6F5F0] text-[#0D7C74] border border-[#BCD4CC] hover:bg-[#D5EDE5]',
    outline:
      'border border-[#DFE8E4] bg-white text-[#132229] hover:bg-[#F4F7F5] hover:border-[#BCD4CC]',
    danger:
      'bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-xs active:bg-[#B91C1C]',
    ghost:
      'text-[#5F737B] hover:text-[#132229] hover:bg-[#F4F7F5]',
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
