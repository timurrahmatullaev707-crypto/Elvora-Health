import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-[#E4EBE8] shadow-xs p-5 transition-all duration-200 ${
        hoverable ? 'hover:shadow-md hover:border-[#CBD7D3]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
