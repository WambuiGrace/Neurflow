const express = require('express');
const {
  getProfile,
  updateProfile,
  updatePassword,
  uploadAvatar,
  getUsers,
  getUser,
} = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');
const { uploadSingleFile } = require('../middleware/upload');

const router = express.Router();

// Protected routes
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/password', updatePassword);
router.post('/avatar', uploadSingleFile('avatar'), uploadAvatar);

// Admin only routes
router.use(authorize('admin'));

router.get('/', getUsers);
router.get('/:id', getUser);

module.exports = router;