import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/shop?category=${category.slug}`}>
      <Card hoverEffect className="h-full border border-gray-100 p-5 group flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-xs border ${category.color} group-hover:scale-110 transition-transform`}>
          {category.icon}
        </div>
        <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-amber-500 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{category.itemCount} Toys Available</p>
        <span className="text-xs font-semibold text-amber-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Explore Toys →
        </span>
      </Card>
    </Link>
  );
}
