import React from 'react';

export default function Badge({
  children,
  variant = 'amber',
  size = 'md',
  className = '',
}) {
  const variants = {
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    rose: 'bg-rose-100 text-rose-800 border-rose-200',
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variants[variant] || variants.amber} ${sizes[size] || sizes.md} ${className}`}
    >
      {children}
    </span>
  );
}
