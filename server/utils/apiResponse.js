/**
 * @desc    Send success response
 * @param   {object} res - Response object
 * @param   {string} message - Success message
 * @param   {object} data - Response data
 * @param   {number} statusCode - HTTP status code
 * @returns {object} Response object
 */
exports.successResponse = (res, message = 'Success', data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * @desc    Send error response
 * @param   {object} res - Response object
 * @param   {string} message - Error message
 * @param   {number} statusCode - HTTP status code
 * @returns {object} Response object
 */
exports.errorResponse = (res, message = 'Error', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

/**
 * @desc    Send paginated response
 * @param   {object} res - Response object
 * @param   {string} message - Success message
 * @param   {object} data - Response data
 * @param   {object} pagination - Pagination data
 * @param   {number} statusCode - HTTP status code
 * @returns {object} Response object
 */
exports.paginatedResponse = (res, message = 'Success', data = [], pagination = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    count: data.length,
    pagination,
    data,
  });
};