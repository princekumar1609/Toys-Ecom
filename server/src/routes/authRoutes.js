const express = require('express');
const {
  registerUser,
  loginUser,
  adminLogin,
  getUserProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin/login', adminLogin);

// Protected auth routes
router.get('/me', protect, getUserProfile);

module.exports = router;
