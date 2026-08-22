const express = require('express');
const {
  createContactMessage,
  getAllMessages,
  getMessageById,
  replyToMessage,
  updateMessageStatus,
  deleteMessage
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public submission route
router.post('/', createContactMessage);

// Admin protected management routes
router.get('/', protect, admin, getAllMessages);
router.get('/:id', protect, admin, getMessageById);
router.put('/:id/reply', protect, admin, replyToMessage);
router.put('/:id/status', protect, admin, updateMessageStatus);
router.delete('/:id', protect, admin, deleteMessage);

module.exports = router;
