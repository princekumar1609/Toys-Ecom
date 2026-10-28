import React from 'react';

export default function Input({
  label,
  id,
  type = 'text',
  error,
  helperText,
  icon: Icon,
  className = '',
  required = false,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-[#292A26] tracking-wide flex items-center gap-1">
          {label}
          {required && <span className="text-[#C98268]">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#77766F]">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          required={required}
          className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-md text-[#292A26] placeholder:text-[#77766F]/60 focus:outline-none transition-all ${
            Icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-[#C98268] text-[#C98268] focus:border-[#C98268] focus:ring-1 focus:ring-[#C98268]'
              : 'border-[#E8E4DC] hover:border-[#77766F]/60 focus:border-[#292A26] focus:ring-1 focus:ring-[#292A26]'
          }`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-[#C98268] font-medium mt-0.5">{error}</p>}
      {!error && helperText && <p className="text-xs text-[#77766F] mt-0.5">{helperText}</p>}
    </div>
  );
}
