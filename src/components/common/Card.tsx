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
      className={`bg-white rounded-2xl border border-[#E6EBEF] shadow-xs p-5 transition-all duration-200 ${
        hoverable ? 'hover:shadow-md hover:border-[#D0D9DF]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
