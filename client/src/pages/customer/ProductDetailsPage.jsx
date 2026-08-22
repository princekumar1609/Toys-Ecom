import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import Button from '../../components/common/Button';
import LoadingState from '../../components/common/LoadingState';
import ProductCard from '../../components/customer/ProductCard';
import { productApi } from '../../services/api';

export default function ProductDetailsPage() {
  const { id } = useParams();
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
    const existingCart = JSON.parse(localStorage.getItem('toynest_cart') || '[]');
    const existingIdx = existingCart.findIndex((i) => i.productId === product._id);

    if (existingIdx > -1) {
      existingCart[existingIdx].quantity += quantity;
    } else {
      existingCart.push({
        productId: product._id,
        name: product.name,
        thumbnailUrl: product.thumbnailUrl || selectedImage,
        price: product.discountPrice > 0 ? product.discountPrice : product.price,
        quantity,
      });
    }

    localStorage.setItem('toynest_cart', JSON.stringify(existingCart));
    setAddedMessage('✨ Toy added to your cart successfully!');
    setTimeout(() => setAddedMessage(''), 3000);
  };

  if (isLoading) {
    return <LoadingState message="Loading toy specifications..." className="py-20" />;
  }

  if (!product) {
    return (
      <Container className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-display text-gray-900">Toy Not Found</h2>
        <p className="text-xs text-gray-500">The product you are looking for does not exist or was removed.</p>
        <Link to="/shop">
          <Button variant="primary" size="md">Return To Shop Catalog →</Button>
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
    <div className="py-6 space-y-10">
      <Container>
        <Breadcrumb items={[{ label: 'Shop Catalog', link: '/shop' }, { label: product.name }]} />

        {/* PRODUCT HERO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs mt-4">
          {/* IMAGE GALLERY & THUMBNAIL LIST */}
          <div className="space-y-6">
            {/* Main Featured Display Image */}
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-4 shadow-inner">
              <img
                src={selectedImage || product.thumbnailUrl}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Below Thumbnail List Gallery */}
            {galleryImages.length > 1 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block px-1">
                  Product Gallery ({galleryImages.length} Images)
                </span>
                <div className="flex items-center gap-4 overflow-x-auto py-3 px-1.5">
                  {galleryImages.map((img, idx) => {
                    const isActive = (selectedImage || product.thumbnailUrl) === img;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImage(img)}
                        onMouseEnter={() => setSelectedImage(img)}
                        className={`w-20 h-20 rounded-2xl border-2 overflow-hidden flex-shrink-0 bg-white p-1.5 transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'border-amber-500 ring-4 ring-amber-300/50 shadow-md scale-105 -translate-y-1 z-10'
                            : 'border-gray-200 hover:border-amber-400 hover:scale-105 hover:-translate-y-1 opacity-80 hover:opacity-100 shadow-2xs'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* PRODUCT INFO */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                {product.brand}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 mt-2">
                {product.name}
              </h1>
              <p className="text-xs text-gray-400 font-mono mt-1">SKU: {product.sku} | Age: {product.ageGroup}</p>
            </div>

            {/* PRICING & STOCK */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border">
              <div>
                <span className="text-3xl font-extrabold text-gray-900 font-display">₹{effectivePrice}</span>
                {product.discountPrice > 0 && (
                  <span className="text-sm text-gray-400 line-through ml-2">₹{product.price}</span>
                )}
              </div>

              <div className="border-l border-gray-200 pl-4">
                <span className={`text-xs font-bold ${product.stock > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `✅ In Stock (${product.stock} units)` : '❌ Out of Stock'}
                </span>
                <span className="text-[10px] text-gray-400 block">Fast 3-Day Express Shipping</span>
              </div>
            </div>

            {/* ADD TO CART ACTION */}
            <div className="space-y-3">
              {addedMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold animate-fade-in">
                  {addedMessage}
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-200 rounded-l-xl"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-200 rounded-r-xl"
                  >
                    +
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  🛒 Add To Shopping Cart
                </Button>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2 border-t pt-4 text-xs text-gray-600 leading-relaxed">
              <h3 className="font-bold text-gray-900 uppercase">Description</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4 pt-10">
            <h3 className="text-xl font-bold font-display text-gray-900">Related Toys You Might Love</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
