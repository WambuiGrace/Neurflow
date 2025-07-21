const { body, param, query, validationResult } = require('express-validator');
const mongoose = require('mongoose');

/**
 * @desc    Validate MongoDB ObjectId
 * @param   {string} id - The ID to validate
 * @returns {boolean} Whether the ID is valid
 */
exports.isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * @desc    Check for validation errors in request
 * @param   {object} req - Request object
 * @param   {object} res - Response object
 * @param   {function} next - Next middleware function
 * @returns {object|void} Error response or proceed to next middleware
 */
exports.checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

/**
 * @desc    Validation rules for user registration
 * @returns {array} Array of validation rules
 */
exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

/**
 * @desc    Validation rules for user login
 * @returns {array} Array of validation rules
 */
exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
];

/**
 * @desc    Validation rules for project creation/update
 * @returns {array} Array of validation rules
 */
exports.projectValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Project name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Project name must be between 2 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  
  body('status')
    .optional()
    .isIn(['planning', 'in-progress', 'completed', 'on-hold']).withMessage('Invalid project status'),
  
  body('teamId')
    .optional()
    .custom(value => {
      if (value && !exports.isValidObjectId(value)) {
        throw new Error('Invalid team ID');
      }
      return true;
    }),
  
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid date')
];

/**
 * @desc    Validation rules for task creation/update
 * @returns {array} Array of validation rules
 */
exports.taskValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Task title is required')
    .isLength({ min: 2, max: 100 }).withMessage('Task title must be between 2 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  
  body('status')
    .optional()
    .isIn(['to-do', 'in-progress', 'review', 'completed']).withMessage('Invalid task status'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid task priority'),
  
  body('projectId')
    .notEmpty().withMessage('Project ID is required')
    .custom(value => {
      if (!exports.isValidObjectId(value)) {
        throw new Error('Invalid project ID');
      }
      return true;
    }),
  
  body('assigneeId')
    .optional()
    .custom(value => {
      if (value && !exports.isValidObjectId(value)) {
        throw new Error('Invalid assignee ID');
      }
      return true;
    }),
  
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid date')
];

/**
 * @desc    Validation rules for team creation/update
 * @returns {array} Array of validation rules
 */
exports.teamValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Team name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Team name must be between 2 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  
  body('status')
    .optional()
    .isIn(['active', 'archived']).withMessage('Invalid team status')
];

/**
 * @desc    Validation rules for event creation/update
 * @returns {array} Array of validation rules
 */
exports.eventValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Event title is required')
    .isLength({ min: 2, max: 100 }).withMessage('Event title must be between 2 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  
  body('date')
    .notEmpty().withMessage('Event date is required')
    .isISO8601().withMessage('Event date must be a valid date'),
  
  body('startTime')
    .notEmpty().withMessage('Start time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Start time must be in HH:MM format'),
  
  body('endTime')
    .notEmpty().withMessage('End time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('End time must be in HH:MM format')
    .custom((value, { req }) => {
      if (value <= req.body.startTime) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
  
  body('type')
    .optional()
    .isIn(['meeting', 'deadline', 'reminder', 'other']).withMessage('Invalid event type'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Location cannot exceed 200 characters'),
  
  body('attendees')
    .optional()
    .isArray().withMessage('Attendees must be an array')
    .custom(value => {
      if (value && value.some(id => !exports.isValidObjectId(id))) {
        throw new Error('One or more attendee IDs are invalid');
      }
      return true;
    }),
  
  body('projectId')
    .optional()
    .custom(value => {
      if (value && !exports.isValidObjectId(value)) {
        throw new Error('Invalid project ID');
      }
      return true;
    }),
  
  body('teamId')
    .optional()
    .custom(value => {
      if (value && !exports.isValidObjectId(value)) {
        throw new Error('Invalid team ID');
      }
      return true;
    })
];

/**
 * @desc    Validation for ID parameters
 * @param   {string} paramName - Name of the parameter to validate
 * @returns {array} Array of validation rules
 */
exports.validateIdParam = (paramName = 'id') => [
  param(paramName)
    .notEmpty().withMessage(`${paramName} is required`)
    .custom(value => {
      if (!exports.isValidObjectId(value)) {
        throw new Error(`Invalid ${paramName}`);
      }
      return true;
    })
];

/**
 * @desc    Validation for pagination parameters
 * @returns {array} Array of validation rules
 */
exports.paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];