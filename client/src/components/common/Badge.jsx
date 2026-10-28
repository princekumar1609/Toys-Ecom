import React from 'react';

export default function Badge({
  children,
  variant = 'amber',
  size = 'md',
  className = '',
}) {
  const variants = {
    amber: 'bg-[#A8B5A0]/15 text-[#4D6346] border-[#A8B5A0]/40',
    indigo: 'bg-[#292A26]/8 text-[#292A26] border-[#292A26]/20',
    rose: 'bg-[#C98268]/15 text-[#A35338] border-[#C98268]/35',
    emerald: 'bg-[#A8B5A0]/20 text-[#3B5135] border-[#A8B5A0]/50',
    gray: 'bg-[#F1EEE7] text-[#77766F] border-[#E8E4DC]',
    sage: 'bg-[#A8B5A0]/20 text-[#3B5135] border-[#A8B5A0]/50',
    terracotta: 'bg-[#C98268]/15 text-[#A35338] border-[#C98268]/35',
  };

  const sizes = {
    sm: 'text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5',
    md: 'text-[11px] tracking-wider uppercase font-semibold px-2.5 py-0.5',
    lg: 'text-xs tracking-wider uppercase font-semibold px-3 py-1',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-sm border ${variants[variant] || variants.amber} ${sizes[size] || sizes.md} ${className}`}
    >
      {children}
    </span>
  );
}
