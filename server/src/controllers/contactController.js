const ContactMessage = require('../models/ContactMessage');

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill out all required fields (name, email, subject, message)'
      });
    }

    const contactMsg = await ContactMessage.create({
      name,
      email,
      phone: phone || '',
      subject,
      message,
      status: 'NEW'
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      data: contactMsg
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private/Admin
const getAllMessages = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (status && status !== 'ALL') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const skip = (pageNum - 1) * limitNum;

    const total = await ContactMessage.countDocuments(query);
    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      count: messages.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get message details by ID (Admin) & auto mark as READ
// @route   GET /api/contact/:id
// @access  Private/Admin
const getMessageById = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Support message not found' });
    }

    if (message.status === 'NEW') {
      message.status = 'READ';
      await message.save();
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reply to message & update status to REPLIED (Admin)
// @route   PUT /api/contact/:id/reply
// @access  Private/Admin
const replyToMessage = async (req, res, next) => {
  try {
    const { adminReply } = req.body;
    if (!adminReply) {
      return res.status(400).json({ success: false, message: 'Reply message text is required' });
    }

    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Support message not found' });
    }

    message.adminReply = adminReply;
    message.status = 'REPLIED';
    message.repliedAt = new Date();

    const updated = await message.save();

    res.json({
      success: true,
      message: 'Reply sent successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update message status (Admin)
// @route   PUT /api/contact/:id/status
// @access  Private/Admin
const updateMessageStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status || !['NEW', 'READ', 'REPLIED', 'CLOSED'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Valid status required (NEW, READ, REPLIED, CLOSED)' });
    }

    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Support message not found' });
    }

    message.status = status;
    const updated = await message.save();

    res.json({
      success: true,
      message: `Message status updated to ${status}`,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete support message (Admin)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Support message not found' });
    }

    await message.deleteOne();
    res.json({
      success: true,
      message: 'Support message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContactMessage,
  getAllMessages,
  getMessageById,
  replyToMessage,
  updateMessageStatus,
  deleteMessage
};
