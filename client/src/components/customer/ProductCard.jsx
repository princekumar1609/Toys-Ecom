import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product, onAddToCart }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const productId = product._id || product.id || product.slug;
  const categoryName = product.category?.name || product.categoryName || 'Toys';
  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <Card hoverEffect className="h-full flex flex-col group border border-[#E8E4DC] bg-white rounded-lg overflow-hidden transition-all duration-300">
      {/* Thumbnail Container */}
      <Link
        to={`/product/${productId}`}
        className="relative aspect-square overflow-hidden bg-[#FAF8F3] block border-b border-[#E8E4DC]"
      >
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Minimal Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="text-[10px] tracking-wider uppercase font-semibold bg-white/95 backdrop-blur-xs text-[#292A26] border border-[#E8E4DC] px-2 py-0.5 rounded-sm shadow-2xs">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="text-[10px] tracking-wider uppercase font-semibold bg-[#A8B5A0]/90 backdrop-blur-xs text-white border border-[#A8B5A0] px-2 py-0.5 rounded-sm shadow-2xs">
              New
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-[10px] tracking-wider uppercase font-semibold bg-[#C98268]/90 backdrop-blur-xs text-white border border-[#C98268] px-2 py-0.5 rounded-sm shadow-2xs">
              -{discountPercent}%
            </span>
          )}
        </div>
      </Link>

      {/* Product Information Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#77766F]">
            <span className="truncate max-w-[120px] font-medium">{categoryName}</span>
            {product.ageGroup && <span>Age: {product.ageGroup}</span>}
          </div>

          {/* Title */}
          <Link to={`/product/${productId}`} className="block">
            <h3 className="font-medium text-[#292A26] text-sm line-clamp-2 hover:text-[#C98268] transition-colors leading-snug min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Star Rating Indicator */}
          <div className="flex items-center gap-1.5 text-xs text-[#77766F] pt-0.5">
            <span className="text-[#C98268] text-xs">★</span>
            <span className="font-medium text-[#292A26]">{product.rating || '5.0'}</span>
            <span className="text-[11px] text-[#77766F]">({product.numReviews || 12})</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-[#E8E4DC]/60 space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-semibold text-[#292A26]">
              ₹{product.discountPrice || product.price}
            </span>
            {product.discountPrice > 0 && (
              <span className="text-xs text-[#77766F] line-through font-normal">
                ₹{product.price}
              </span>
            )}
          </div>

          <Button
            variant={isAdded ? "secondary" : "primary"}
            size="sm"
            className="w-full text-[11px] uppercase tracking-wider py-2 transition-all duration-200"
            onClick={handleAddToCart}
          >
            {isAdded ? '✓ In Bag' : 'Add to Bag'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
