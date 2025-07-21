const express = require('express');
const {
  getNotifications,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification
} = require('../controllers/notifications');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// Notification routes
router.route('/')
  .get(getNotifications)
  .post(createNotification);

router.route('/mark-all-read')
  .put(markAllAsRead);

router.route('/:id')
  .put(markAsRead)
  .delete(deleteNotification);

module.exports = router;