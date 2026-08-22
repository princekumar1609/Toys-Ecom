import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items = [], className = '' }) {
  return (
    <nav className={`flex text-sm text-gray-500 py-3 ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
        <li className="inline-flex items-center">
          <Link to="/" className="text-gray-500 hover:text-amber-600 inline-flex items-center gap-1">
            <span>🏠</span> Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              <span className="mx-2 text-gray-300">/</span>
              {isLast || !item.path ? (
                <span className="font-medium text-gray-900">{item.label}</span>
              ) : (
                <Link to={item.path} className="text-gray-500 hover:text-amber-600">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
