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
        <label htmlFor={selectId} className="text-sm font-medium text-gray-700 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={selectId}
        required={required}
        className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-transparent'
            : 'border-gray-300 text-gray-900 focus:ring-amber-500 focus:border-transparent hover:border-gray-400'
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
