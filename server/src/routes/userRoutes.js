const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  getAllCustomers,
  getCustomerById,
  updateCustomerStatus
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Customer Profile & Address Routes (Protected)
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/addresses', protect, addAddress);
router.put('/addresses/:addressId', protect, updateAddress);
router.delete('/addresses/:addressId', protect, deleteAddress);

// Admin Customer Management Routes (Protected + Admin)
router.get('/', protect, admin, getAllCustomers);
router.get('/:id', protect, admin, getCustomerById);
router.put('/:id/status', protect, admin, updateCustomerStatus);

module.exports = router;
