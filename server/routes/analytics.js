const express = require('express');
const {
  getDashboardStats,
  getProductivityData,
  getTeamPerformance
} = require('../controllers/analytics');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// Analytics routes
router.route('/dashboard')
  .get(getDashboardStats);

router.route('/productivity')
  .get(getProductivityData);

router.route('/team-performance/:teamId')
  .get(getTeamPerformance);

module.exports = router;