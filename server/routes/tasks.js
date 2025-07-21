const express = require('express');
const {
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/tasks');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// Task routes
router.route('/')
  .get(getTasks);

router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;