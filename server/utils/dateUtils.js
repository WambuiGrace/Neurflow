/**
 * @desc    Format date to YYYY-MM-DD
 * @param   {Date} date - Date to format
 * @returns {string} Formatted date
 */
exports.formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * @desc    Format time to HH:MM
 * @param   {Date} date - Date to extract time from
 * @returns {string} Formatted time
 */
exports.formatTime = (date) => {
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * @desc    Format date and time to YYYY-MM-DD HH:MM
 * @param   {Date} date - Date to format
 * @returns {string} Formatted date and time
 */
exports.formatDateTime = (date) => {
  return `${exports.formatDate(date)} ${exports.formatTime(date)}`;
};

/**
 * @desc    Get start of day
 * @param   {Date} date - Date to get start of day from
 * @returns {Date} Start of day
 */
exports.getStartOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * @desc    Get end of day
 * @param   {Date} date - Date to get end of day from
 * @returns {Date} End of day
 */
exports.getEndOfDay = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

/**
 * @desc    Get start of week (Sunday)
 * @param   {Date} date - Date to get start of week from
 * @returns {Date} Start of week
 */
exports.getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * @desc    Get end of week (Saturday)
 * @param   {Date} date - Date to get end of week from
 * @returns {Date} End of week
 */
exports.getEndOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() + (6 - day));
  d.setHours(23, 59, 59, 999);
  return d;
};

/**
 * @desc    Get start of month
 * @param   {Date} date - Date to get start of month from
 * @returns {Date} Start of month
 */
exports.getStartOfMonth = (date) => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * @desc    Get end of month
 * @param   {Date} date - Date to get end of month from
 * @returns {Date} End of month
 */
exports.getEndOfMonth = (date) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
};

/**
 * @desc    Get date range for a given period
 * @param   {string} period - Period to get date range for (day, week, month, year)
 * @param   {Date} date - Date to get range from (defaults to today)
 * @returns {object} Object containing start and end dates
 */
exports.getDateRangeForPeriod = (period, date = new Date()) => {
  const d = new Date(date);
  
  switch (period) {
    case 'day':
      return {
        start: exports.getStartOfDay(d),
        end: exports.getEndOfDay(d)
      };
    case 'week':
      return {
        start: exports.getStartOfWeek(d),
        end: exports.getEndOfWeek(d)
      };
    case 'month':
      return {
        start: exports.getStartOfMonth(d),
        end: exports.getEndOfMonth(d)
      };
    case 'year':
      const startOfYear = new Date(d.getFullYear(), 0, 1, 0, 0, 0, 0);
      const endOfYear = new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999);
      return {
        start: startOfYear,
        end: endOfYear
      };
    default:
      return {
        start: d,
        end: d
      };
  }
};

/**
 * @desc    Check if a date is in the past
 * @param   {Date} date - Date to check
 * @returns {boolean} Whether the date is in the past
 */
exports.isDateInPast = (date) => {
  return new Date(date) < new Date();
};

/**
 * @desc    Check if a date is in the future
 * @param   {Date} date - Date to check
 * @returns {boolean} Whether the date is in the future
 */
exports.isDateInFuture = (date) => {
  return new Date(date) > new Date();
};

/**
 * @desc    Get days between two dates
 * @param   {Date} startDate - Start date
 * @param   {Date} endDate - End date
 * @returns {number} Number of days between the dates
 */
exports.getDaysBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};