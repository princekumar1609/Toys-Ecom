import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';
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
    <Card hoverEffect className="h-full flex flex-col group border border-gray-100 bg-white">
      {/* Thumbnail Container */}
      <Link to={`/product/${productId}`} className="relative aspect-square overflow-hidden bg-gray-50 rounded-t-xl block">
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <Badge variant="amber" size="sm">🔥 Best Seller</Badge>
          )}
          {product.isNewArrival && (
            <Badge variant="indigo" size="sm">✨ New</Badge>
          )}
          {discountPercent > 0 && (
            <Badge variant="rose" size="sm">-{discountPercent}% OFF</Badge>
          )}
        </div>
      </Link>

      {/* Product Information Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              {categoryName}
            </span>
            <span>Age: {product.ageGroup}</span>
          </div>

          <Link to={`/product/${productId}`}>
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 hover:text-amber-600 transition-colors mb-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Star Rating */}
          <div className="flex items-center gap-1 text-xs text-amber-500 mb-3">
            <span>★</span>
            <span className="font-bold text-gray-800">{product.rating || 5.0}</span>
            <span className="text-gray-400">({product.numReviews || 12})</span>
          </div>
        </div>

        {/* Price & Add to Cart Footer */}
        <div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.discountPrice || product.price}
            </span>
            {product.discountPrice > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.price}
              </span>
            )}
          </div>

          <Button
            variant={isAdded ? "secondary" : "primary"}
            size="sm"
            className="w-full transition-all duration-200"
            onClick={handleAddToCart}
          >
            {isAdded ? '✓ Added!' : '🛒 Add to Cart'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
