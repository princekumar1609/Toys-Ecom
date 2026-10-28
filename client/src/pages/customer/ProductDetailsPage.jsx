import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import Button from '../../components/common/Button';
import LoadingState from '../../components/common/LoadingState';
import ProductCard from '../../components/customer/ProductCard';
import { productApi } from '../../services/api';
import { useCart } from '../../context/CartContext';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [addedMessage, setAddedMessage] = useState('');

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      try {
        const res = await productApi.getProductByIdOrSlug(id);
        if (res.success) {
          const fetchedProduct = res.data;
          setProduct(fetchedProduct);

          // Set initial active main image
          const initialMainImg = fetchedProduct.images && fetchedProduct.images.length > 0
            ? fetchedProduct.images[0]
            : fetchedProduct.thumbnailUrl;
          setSelectedImage(initialMainImg);

          // Fetch related toys
          const relRes = await productApi.getProducts({ limit: 4 });
          if (relRes.success) {
            setRelatedProducts(relRes.data.filter((p) => p._id !== fetchedProduct._id).slice(0, 4));
          }
        }
      } catch (err) {
        console.error('[Product Details Error]', err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAddedMessage('Added to your shopping bag.');
    setTimeout(() => setAddedMessage(''), 3000);
  };

  if (isLoading) {
    return <LoadingState text="Loading toy specifications..." className="py-24" />;
  }

  if (!product) {
    return (
      <Container className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-display font-medium text-[#292A26]">Product Not Found</h2>
        <p className="text-xs text-[#77766F]">The toy you are looking for does not exist or has been archived.</p>
        <Link to="/shop">
          <Button variant="primary" size="md">Return To Catalog →</Button>
        </Link>
      </Container>
    );
  }

  const effectivePrice = product.discountPrice > 0 ? product.discountPrice : product.price;

  // Build full list of gallery images
  const galleryImages = (product.images && product.images.length > 0)
    ? product.images
    : [product.thumbnailUrl];

  return (
    <div className="py-8 space-y-16">
      <Container>
        <Breadcrumb items={[{ label: 'Catalog', path: '/shop' }, { label: product.name }]} />

        {/* PRODUCT HERO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 bg-white p-6 sm:p-10 rounded-lg border border-[#E8E4DC] mt-4">
          {/* IMAGE GALLERY & THUMBNAIL LIST (7 cols on large desktop, 6 on standard) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Featured Display Image */}
            <div className="aspect-square bg-[#FAF8F3] rounded-md overflow-hidden border border-[#E8E4DC] flex items-center justify-center p-6 relative">
              <img
                src={selectedImage || product.thumbnailUrl}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 ease-out"
              />
              {product.discountPrice > 0 && (
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wider font-semibold bg-[#C98268] text-white px-2 py-0.5 rounded-sm">
                  Special Offer
                </span>
              )}
            </div>

            {/* Thumbnail Track */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto py-2">
                {galleryImages.map((img, idx) => {
                  const isActive = (selectedImage || product.thumbnailUrl) === img;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      onMouseEnter={() => setSelectedImage(img)}
                      className={`w-18 h-18 rounded-md border overflow-hidden flex-shrink-0 bg-[#FAF8F3] p-1.5 transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'border-[#292A26] ring-1 ring-[#292A26]'
                          : 'border-[#E8E4DC] hover:border-[#77766F] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Gallery preview ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* PRODUCT INFO COLUMN (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Brand Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-[#77766F]">
                <span className="font-semibold text-[#292A26]">{product.brand || 'Toys Ecom'}</span>
                <span>•</span>
                <span>SKU: {product.sku}</span>
                {product.ageGroup && (
                  <>
                    <span>•</span>
                    <span>Age: {product.ageGroup}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-light text-[#292A26] leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs text-[#77766F]">
                <span className="text-[#C98268]">★</span>
                <span className="font-semibold text-[#292A26]">{product.rating || '5.0'}</span>
                <span>•</span>
                <span>{product.numReviews || 12} Verified Reviews</span>
              </div>

              {/* Price & Stock Banner */}
              <div className="p-4 bg-[#FAF8F3] rounded-md border border-[#E8E4DC] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-display font-medium text-[#292A26]">
                      ₹{effectivePrice}
                    </span>
                    {product.discountPrice > 0 && (
                      <span className="text-sm text-[#77766F] line-through font-normal">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#77766F] block mt-0.5">Inclusive of all taxes</span>
                </div>

                <div className="text-right">
                  <span className={`text-xs uppercase tracking-wider font-semibold block ${product.stock > 0 ? 'text-[#3B5135]' : 'text-[#C98268]'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                  </span>
                  <span className="text-[10px] text-[#77766F] block mt-0.5">Dispatches in 24 hours</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-[#77766F] leading-relaxed">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#292A26]">Design &amp; Details</h3>
                <p>{product.description}</p>
              </div>

              {/* Material & Safety Specs */}
              <div className="pt-4 border-t border-[#E8E4DC] grid grid-cols-2 gap-3 text-xs text-[#77766F]">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#292A26] block">Material Quality</span>
                  <span>Non-Toxic, BPA-Free Certified</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#292A26] block">Returns</span>
                  <span>30-Day Hassle-Free Returns</span>
                </div>
              </div>
            </div>

            {/* PURCHASING ACTIONS */}
            <div className="pt-4 border-t border-[#E8E4DC] space-y-4">
              {addedMessage && (
                <div className="p-3 bg-[#A8B5A0]/20 border border-[#A8B5A0]/40 text-[#2E4229] text-xs rounded-md font-medium text-center">
                  ✓ {addedMessage}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center justify-between border border-[#E8E4DC] rounded-md bg-[#FAF8F3] px-1 py-1 w-full sm:w-32">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-[#292A26] hover:bg-[#E8E4DC]/50 rounded-sm cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="text-xs font-semibold text-[#292A26]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-[#292A26] hover:bg-[#E8E4DC]/50 rounded-sm cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1 py-3"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  {product.stock <= 0 ? 'Out of Stock' : 'Add To Shopping Bag'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-12">
            <div className="flex items-end justify-between border-b border-[#E8E4DC] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#77766F] block mb-1">
                  Complementary
                </span>
                <h3 className="text-2xl font-display font-medium text-[#292A26]">
                  Related Pieces You May Appreciate
                </h3>
              </div>
              <Link to="/shop" className="text-xs uppercase tracking-wider font-semibold text-[#292A26] hover:text-[#C98268]">
                Explore All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
