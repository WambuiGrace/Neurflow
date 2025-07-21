/**
 * @desc    Create pagination object for API responses
 * @param   {object} req - Request object
 * @param   {number} total - Total number of documents
 * @param   {number} limit - Number of documents per page
 * @param   {number} page - Current page number
 * @returns {object} Pagination object
 */
exports.createPagination = (req, total, limit, page) => {
  const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;
  const lastPage = Math.ceil(total / limit) || 1;
  
  // Create pagination object
  const pagination = {
    total,
    limit,
    page,
    lastPage,
    prev: page > 1 ? page - 1 : null,
    next: page < lastPage ? page + 1 : null,
    links: {}
  };

  // Add first page link
  pagination.links.first = `${baseUrl}?page=1&limit=${limit}`;
  
  // Add last page link
  pagination.links.last = `${baseUrl}?page=${lastPage}&limit=${limit}`;
  
  // Add prev page link if available
  if (pagination.prev) {
    pagination.links.prev = `${baseUrl}?page=${pagination.prev}&limit=${limit}`;
  }
  
  // Add next page link if available
  if (pagination.next) {
    pagination.links.next = `${baseUrl}?page=${pagination.next}&limit=${limit}`;
  }
  
  return pagination;
};

/**
 * @desc    Parse pagination parameters from request query
 * @param   {object} req - Request object
 * @param   {number} defaultLimit - Default limit if not specified
 * @returns {object} Pagination parameters
 */
exports.getPaginationParams = (req, defaultLimit = 10) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || defaultLimit;
  const startIndex = (page - 1) * limit;
  
  return {
    page,
    limit,
    startIndex
  };
};