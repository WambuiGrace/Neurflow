/**
 * File upload utility functions for handling file uploads to storage.
 * This implementation saves files to the local uploads directory.
 * In a production environment, you would implement file upload logic
 * using services like Cloudinary, AWS S3, or other storage solutions.
 */

const fs = require('fs');
const path = require('path');

/**
 * @desc    Upload file to local storage
 * @param   {object} file - File object from multer
 * @returns {object} Object containing upload result
 */
exports.uploadToStorage = async (file) => {
  try {
    // File is already saved by multer middleware to the uploads directory
    // We just need to return the file information
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const fileUrl = `/uploads/${file.filename}`;
    
    return {
      success: true,
      url: fileUrl,
      public_id: `uploads/${file.filename}`,
      format: file.originalname.split('.').pop(),
      size: file.size,
      resource_type: file.mimetype.split('/')[0],
    };
  } catch (error) {
    console.error('Error in uploadToStorage:', error);
    throw new Error('File upload failed');
  }
};

/**
 * @desc    Upload multiple files to storage
 * @param   {array} files - Array of file objects from multer
 * @returns {array} Array of upload results
 */
exports.uploadMultipleToStorage = async (files) => {
  const uploadPromises = files.map(file => this.uploadToStorage(file));
  return Promise.all(uploadPromises);
};

/**
 * @desc    Delete file from storage
 * @param   {string} publicId - Public ID of the file to delete
 * @returns {object} Object containing deletion result
 */
exports.deleteFromStorage = async (publicId) => {
  try {
    // Extract filename from publicId
    const filename = publicId.split('/').pop();
    const filePath = path.join(process.cwd(), 'uploads', filename);
    
    // Check if file exists
    if (fs.existsSync(filePath)) {
      // Delete file
      fs.unlinkSync(filePath);
    }
    
    return {
      success: true,
      result: 'ok',
    };
  } catch (error) {
    console.error('Error in deleteFromStorage:', error);
    throw new Error('File deletion failed');
  }
};

/**
 * @desc    Get file type from MIME type
 * @param   {string} mimeType - MIME type of the file
 * @returns {string} File type category
 */
exports.getFileTypeFromMime = (mimeType) => {
  if (!mimeType) return 'other';
  
  const type = mimeType.split('/')[0];
  
  switch (type) {
    case 'image':
      return 'image';
    case 'video':
      return 'video';
    case 'audio':
      return 'audio';
    case 'application':
      if (mimeType.includes('pdf')) return 'document';
      if (mimeType.includes('word') || mimeType.includes('document')) return 'document';
      if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'spreadsheet';
      if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'presentation';
      return 'other';
    case 'text':
      return 'document';
    default:
      return 'other';
  }
};