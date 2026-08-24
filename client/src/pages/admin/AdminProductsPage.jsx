import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import Pagination from '../../components/common/Pagination';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import { productApi, categoryApi } from '../../services/api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    brand: '',
    price: '',
    discountPrice: '',
    stock: '',
    minStockAlert: '5',
    ageGroup: '6-8 Years',
    description: '',
    images: ['https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80'],
    status: 'ACTIVE',
  });

  const loadCategories = async () => {
    try {
      const res = await categoryApi.getCategories();
      if (res.success) setCategories(res.data);
    } catch (err) {
      console.error('[Categories Load Error]', err.message);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 8,
      };
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory !== 'all') params.category = selectedCategory;
      if (statusFilter !== 'all') params.status = statusFilter;

      const res = await productApi.getProducts(params);
      if (res.success) {
        setProducts(res.data);
        setTotalPages(res.pages);
        setTotalProducts(res.total);
      }
    } catch (err) {
      console.error('[Admin Products Fetch Error]', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, statusFilter, currentPage]);

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      sku: `TN-${Math.floor(1000 + Math.random() * 9000)}`,
      category: categories[0]?._id || '',
      brand: 'ToyNest',
      price: '1499',
      discountPrice: '1299',
      stock: '25',
      minStockAlert: '5',
      ageGroup: '6-8 Years',
      description: 'High-quality non-toxic toy for creative learning.',
      images: [
        'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&auto=format&fit=crop&q=80'
      ],
      status: 'ACTIVE',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    const initialImages = product.images && product.images.length > 0
      ? product.images
      : [product.thumbnailUrl || 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80'];

    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category?._id || product.category || categories[0]?._id,
      brand: product.brand,
      price: product.price,
      discountPrice: product.discountPrice || '',
      stock: product.stock,
      minStockAlert: product.minStockAlert || 5,
      ageGroup: product.ageGroup,
      description: product.description,
      images: initialImages,
      status: product.status || 'ACTIVE',
    });
    setIsEditModalOpen(true);
  };

  const handleAddImageUrl = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ''],
    }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...(formData.images || [])];
    updatedImages[index] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = (formData.images || []).filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages.length > 0 ? updatedImages : [''] });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const validImages = (formData.images || []).filter((img) => img.trim() !== '');
      const firstThumbnail = validImages[0] || 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80';

      const res = await productApi.createProduct({
        ...formData,
        thumbnailUrl: firstThumbnail,
        images: validImages.length > 0 ? validImages : [firstThumbnail],
        price: Number(formData.price),
        discountPrice: Number(formData.discountPrice) || 0,
        stock: Number(formData.stock),
      });
      if (res.success) {
        setIsAddModalOpen(false);
        fetchProducts();
      }
    } catch (err) {
      alert(err.message || 'Failed to create product');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const validImages = (formData.images || []).filter((img) => img.trim() !== '');
      const firstThumbnail = validImages[0] || 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80';

      const res = await productApi.updateProduct(selectedProduct._id, {
        ...formData,
        thumbnailUrl: firstThumbnail,
        images: validImages.length > 0 ? validImages : [firstThumbnail],
        price: Number(formData.price),
        discountPrice: Number(formData.discountPrice) || 0,
        stock: Number(formData.stock),
      });
      if (res.success) {
        setIsEditModalOpen(false);
        fetchProducts();
      }
    } catch (err) {
      alert(err.message || 'Failed to update product');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await productApi.deleteProduct(selectedProduct._id);
      if (res.success) {
        setIsDeleteModalOpen(false);
        fetchProducts();
      }
    } catch (err) {
      alert(err.message || 'Failed to delete product');
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER & ADD BUTTON */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 font-display">
            Product Inventory Management 🎁
          </h1>
          <p className="text-xs text-gray-500 mt-1">Live REST API database CRUD operations for toy inventory.</p>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenAddModal}>
          + Add New Product
        </Button>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <Card className="p-4 border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
          <Input
            placeholder="Search toy name, SKU, brand..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-64"
          />

          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-48 text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Showing <strong className="text-gray-900">{totalProducts}</strong> products
        </div>
      </Card>

      {/* PRODUCTS TABLE */}
      <Card className="border border-gray-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <LoadingState message="Loading inventory database..." className="py-20" />
        ) : products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Toy</th>
                  <th className="py-3 px-4">SKU &amp; Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={p.thumbnailUrl} alt={p.name} className="w-12 h-12 object-cover rounded-xl border flex-shrink-0" />
                        <div>
                          <span className="font-bold text-gray-900 text-sm line-clamp-1">{p.name}</span>
                          <span className="text-[11px] text-gray-400">Brand: {p.brand}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold font-mono text-gray-900 block">{p.sku}</span>
                      <span className="text-[11px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-medium">{p.category?.name || 'Toys'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-gray-900 block">₹{p.discountPrice || p.price}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${p.stock < 10 ? 'text-rose-600' : 'text-gray-900'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={p.status || 'ACTIVE'} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenEditModal(p)} className="p-1.5 text-gray-500 hover:text-indigo-600 rounded-lg">✏️ Edit</button>
                        <button onClick={() => { setSelectedProduct(p); setIsDeleteModalOpen(true); }} className="p-1.5 text-gray-500 hover:text-rose-600 rounded-lg">🗑️ Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No Products Found" description="Try clearing your search term or category filters." />
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => setCurrentPage(p)} className="m-4" />
      </Card>

      {/* ADD MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Toy To Inventory">
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <Input label="Toy Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <div className="grid grid-cols-3 gap-3">
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={categories.map((c) => ({ value: c._id, label: c.name }))}
              placeholder="Select Category"
              required
            />
            <Input label="SKU" value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} required />
            <Input label="Brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} required />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Input label="Price (₹)" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
            <Input label="Discount Price (₹)" type="number" value={formData.discountPrice} onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })} />
            <Input label="Stock Units" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required />
          </div>

          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description, key features, material, safety info..."
              className="w-full px-3.5 py-2 text-xs bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent hover:border-gray-400 text-gray-900 resize-y transition-all"
              required
            />
          </div>

          {/* DYNAMIC MULTIPLE IMAGE URLS */}
          <div className="space-y-2 border-t pt-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-gray-800">Product Image Gallery URLs</label>
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="text-amber-600 hover:text-amber-700 text-xs font-bold flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200"
              >
                <span>+ Add Image URL</span>
              </button>
            </div>

            {(formData.images || []).map((imgUrl, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder={`Image URL #${index + 1}`}
                  value={imgUrl}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  required={index === 0}
                  className="flex-1"
                />
                {(formData.images || []).length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-2 text-rose-500 hover:text-rose-700 font-bold hover:bg-rose-50 rounded-lg text-xs"
                    title="Remove Image URL"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 border-t pt-3">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Save Product</Button>
          </div>
        </form>
      </Modal>

      {/* EDIT MODAL */}
      {selectedProduct && (
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`Edit ${selectedProduct.name}`}>
          <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
            <Input label="Toy Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <div className="grid grid-cols-3 gap-3">
              <Select
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                options={categories.map((c) => ({ value: c._id, label: c.name }))}
                placeholder="Select Category"
                required
              />
              <Input label="SKU" value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} required />
              <Input label="Brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} required />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Input label="Price (₹)" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
              <Input label="Discount Price (₹)" type="number" value={formData.discountPrice} onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })} />
              <Input label="Stock Units" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required />
            </div>

            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description..."
                className="w-full px-3.5 py-2 text-xs bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent hover:border-gray-400 text-gray-900 resize-y transition-all"
                required
              />
            </div>

            {/* DYNAMIC MULTIPLE IMAGE URLS */}
            <div className="space-y-2 border-t pt-3">
              <div className="flex items-center justify-between">
                <label className="font-bold text-gray-800">Product Image Gallery URLs</label>
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="text-amber-600 hover:text-amber-700 text-xs font-bold flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200"
                >
                  <span>+ Add Image URL</span>
                </button>
              </div>

              {(formData.images || []).map((imgUrl, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Image URL #${index + 1}`}
                    value={imgUrl}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    required={index === 0}
                    className="flex-1"
                  />
                  {(formData.images || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-2 text-rose-500 hover:text-rose-700 font-bold hover:bg-rose-50 rounded-lg text-xs"
                      title="Remove Image URL"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 border-t pt-3">
              <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" size="sm">Update Product</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {selectedProduct && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Product"
          message={`Are you sure you want to delete "${selectedProduct.name}"?`}
          confirmText="Delete"
          isDanger
        />
      )}
    </div>
  );
}
