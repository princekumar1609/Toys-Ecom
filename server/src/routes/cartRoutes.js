const express = require('express');
const { validateCart, validateCoupon } = require('../controllers/cartController');

const router = express.Router();

router.post('/validate', validateCart);
router.post('/coupon', validateCoupon);

module.exports = router;
