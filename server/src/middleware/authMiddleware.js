const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes & verify JWT
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'toynest_secret_jwt_key_2026');

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User account no longer exists'
        });
      }

      if (req.user.status === 'BLOCKED') {
        return res.status(403).json({
          success: false,
          message: 'Account is blocked. Access denied.'
        });
      }

      next();
    } catch (error) {
      console.error('[Auth Error]', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token invalid or expired'
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no bearer token provided'
    });
  }
};

// Middleware for Admin authorization check
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Forbidden - Requires Administrator privileges'
    });
  }
};

module.exports = { protect, admin };
