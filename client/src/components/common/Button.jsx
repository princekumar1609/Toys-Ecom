import React from 'react';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  icon: Icon,
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-wide rounded-md transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#292A26] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-[#292A26] hover:bg-[#45463F] active:bg-[#1E1F1C] text-white shadow-xs',
    secondary: 'border border-[#292A26] text-[#292A26] bg-transparent hover:bg-[#292A26] hover:text-white',
    outline: 'border border-[#E8E4DC] text-[#292A26] bg-white hover:bg-[#F1EEE7] hover:border-[#77766F]',
    ghost: 'text-[#77766F] hover:text-[#292A26] hover:bg-[#F1EEE7]',
    danger: 'bg-[#C98268] hover:bg-[#A35D43] text-white shadow-xs',
    sage: 'bg-[#A8B5A0] hover:bg-[#7E8F75] text-white shadow-xs',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs uppercase tracking-wider font-semibold px-5 py-2.5 gap-2',
    lg: 'text-sm uppercase tracking-wider font-semibold px-7 py-3.5 gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!isLoading && Icon && <Icon className="w-4 h-4" />}
      <span>{children}</span>
    </button>
  );
}
