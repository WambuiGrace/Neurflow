const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projects');
const { getProjectTasks, createTask } = require('../controllers/tasks');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// Project routes
router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

// Task routes for a project
router.route('/:projectId/tasks')
  .get(getProjectTasks)
  .post(createTask);

module.exports = router;