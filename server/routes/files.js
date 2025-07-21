const express = require('express');
const {
  uploadFile,
  uploadMultipleFiles,
  getFiles,
  deleteFile
} = require('../controllers/files');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// File routes
router.route('/')
  .get(getFiles);

router.route('/upload')
  .post(uploadFile);

router.route('/upload-multiple')
  .post(uploadMultipleFiles);

router.route('/:id')
  .delete(deleteFile);

module.exports = router;