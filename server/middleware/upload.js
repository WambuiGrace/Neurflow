const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const ErrorResponse = require('../utils/errorResponse');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // This directory should be created or use a different approach in production
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const fileExt = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    cb(null, fileName);
  }
});

// Check file type
const fileFilter = (req, file, cb) => {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new ErrorResponse('File type not supported', 400));
  }
};

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
});

// Middleware for single file upload
exports.uploadSingleFile = (fieldName) => {
  return (req, res, next) => {
    const uploadMiddleware = upload.single(fieldName);
    
    uploadMiddleware(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new ErrorResponse('File too large. Maximum size is 10MB', 400));
        }
        return next(new ErrorResponse(`Multer upload error: ${err.message}`, 400));
      } else if (err) {
        // An unknown error occurred
        return next(err);
      }
      
      // Everything went fine
      next();
    });
  };
};

// Middleware for multiple file upload
exports.uploadMultipleFiles = (fieldName, maxCount = 5) => {
  return (req, res, next) => {
    const uploadMiddleware = upload.array(fieldName, maxCount);
    
    uploadMiddleware(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new ErrorResponse('One or more files too large. Maximum size is 10MB', 400));
        } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return next(new ErrorResponse(`Too many files. Maximum is ${maxCount}`, 400));
        }
        return next(new ErrorResponse(`Multer upload error: ${err.message}`, 400));
      } else if (err) {
        // An unknown error occurred
        return next(err);
      }
      
      // Everything went fine
      next();
    });
  };
};