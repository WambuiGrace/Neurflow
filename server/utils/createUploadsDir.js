const fs = require('fs');
const path = require('path');

/**
 * @desc    Create uploads directory if it doesn't exist
 * @returns {void}
 */
const createUploadsDir = () => {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  
  if (!fs.existsSync(uploadsDir)) {
    console.log('Creating uploads directory...');
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Uploads directory created successfully');
  }
};

module.exports = createUploadsDir;