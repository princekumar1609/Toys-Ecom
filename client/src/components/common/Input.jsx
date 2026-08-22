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
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          required={required}
          className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all ${
            Icon ? 'pl-9' : ''
          } ${
            error
              ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-transparent'
              : 'border-gray-300 text-gray-900 focus:ring-amber-500 focus:border-transparent hover:border-gray-400'
          }`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600 font-medium mt-0.5">{error}</p>}
      {!error && helperText && <p className="text-xs text-gray-500 mt-0.5">{helperText}</p>}
    </div>
  );
}
