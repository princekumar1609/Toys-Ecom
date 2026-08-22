import { request } from './apiClient';

// Auth APIs
export const authApi = {
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  adminLogin: (email, password) =>
    request('/auth/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  register: (name, email, password, phone) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, phone }) }),

  getMe: () => request('/auth/me', { method: 'GET' }),
};

// Category APIs
export const categoryApi = {
  getCategories: () => request('/categories', { method: 'GET' }),
  createCategory: (data) => request('/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id, data) => request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id) => request(`/categories/${id}`, { method: 'DELETE' }),
};

// Product APIs
export const productApi = {
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products?${query}`, { method: 'GET' });
  },
  getProductByIdOrSlug: (idOrSlug) => request(`/products/${idOrSlug}`, { method: 'GET' }),
  createProduct: (data) => request('/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id, data) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE' }),
};

// Cart APIs
export const cartApi = {
  validateCart: (items, couponCode) =>
    request('/cart/validate', { method: 'POST', body: JSON.stringify({ items, couponCode }) }),
  validateCoupon: (code, subtotal) =>
    request('/cart/coupon', { method: 'POST', body: JSON.stringify({ code, subtotal }) }),
};

// Order APIs
export const orderApi = {
  createOrder: (orderData) => request('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  getMyOrders: () => request('/orders/myorders', { method: 'GET' }),
  getOrderById: (id) => request(`/orders/${id}`, { method: 'GET' }),
  cancelOrder: (id) => request(`/orders/${id}/cancel`, { method: 'PUT' }),
  getAllOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/orders?${query}`, { method: 'GET' });
  },
  updateOrderStatus: (id, statusData) =>
    request(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify(statusData) }),
};

// User & Customer APIs
export const userApi = {
  getProfile: () => request('/users/profile', { method: 'GET' }),
  updateProfile: (data) => request('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),
  addAddress: (data) => request('/users/addresses', { method: 'POST', body: JSON.stringify(data) }),
  updateAddress: (addressId, data) => request(`/users/addresses/${addressId}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAddress: (addressId) => request(`/users/addresses/${addressId}`, { method: 'DELETE' }),
  getAllCustomers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/users?${query}`, { method: 'GET' });
  },
  updateCustomerStatus: (id, status) =>
    request(`/users/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

// Contact Message APIs
export const contactApi = {
  submitMessage: (data) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),
  getAllMessages: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/contact?${query}`, { method: 'GET' });
  },
  replyToMessage: (id, adminReply) =>
    request(`/contact/${id}/reply`, { method: 'PUT', body: JSON.stringify({ adminReply }) }),
  updateMessageStatus: (id, status) =>
    request(`/contact/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  deleteMessage: (id) => request(`/contact/${id}`, { method: 'DELETE' }),
};
