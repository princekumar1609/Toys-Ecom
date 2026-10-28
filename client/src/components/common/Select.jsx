import React from 'react';

export default function Select({
  label,
  id,
  options = [],
  error,
  helperText,
  placeholder = 'Select an option',
  className = '',
  required = false,
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-xs font-medium text-[#292A26] tracking-wide flex items-center gap-1">
          {label}
          {required && <span className="text-[#C98268]">*</span>}
        </label>
      )}
      <select
        id={selectId}
        required={required}
        className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-md text-[#292A26] focus:outline-none transition-all ${
          error
            ? 'border-[#C98268] text-[#C98268] focus:border-[#C98268] focus:ring-1 focus:ring-[#C98268]'
            : 'border-[#E8E4DC] hover:border-[#77766F]/60 focus:border-[#292A26] focus:ring-1 focus:ring-[#292A26]'
        }`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt, idx) => {
          const value = typeof opt === 'object' ? opt.value : opt;
          const labelText = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={idx} value={value}>
              {labelText}
            </option>
          );
        })}
      </select>
      {error && <p className="text-xs text-red-600 font-medium mt-0.5">{error}</p>}
      {!error && helperText && <p className="text-xs text-gray-500 mt-0.5">{helperText}</p>}
    </div>
  );
}
