const Project = require('../models/Project');
const Task = require('../models/Task');
const Team = require('../models/Team');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Get date range
    const range = req.query.range || '30d';
    const date = new Date();
    let startDate;

    switch (range) {
      case '7d':
        startDate = new Date(date.setDate(date.getDate() - 7));
        break;
      case '14d':
        startDate = new Date(date.setDate(date.getDate() - 14));
        break;
      case '30d':
        startDate = new Date(date.setDate(date.getDate() - 30));
        break;
      case '90d':
        startDate = new Date(date.setDate(date.getDate() - 90));
        break;
      default:
        startDate = new Date(date.setDate(date.getDate() - 30));
    }

    // Get projects count
    const projectsCount = await Project.countDocuments({
      createdAt: { $gte: startDate },
    });

    // Get tasks count by status
    const tasksByStatus = await Task.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get tasks count by priority
    const tasksByPriority = await Task.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get projects by status
    const projectsByStatus = await Project.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get tasks completed over time
    const tasksCompletedOverTime = await Task.aggregate([
      {
        $match: {
          status: 'done',
          updatedAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        projectsCount,
        tasksByStatus,
        tasksByPriority,
        projectsByStatus,
        tasksCompletedOverTime,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get productivity analytics
// @route   GET /api/analytics/productivity
// @access  Private
exports.getProductivityData = async (req, res, next) => {
  try {
    // Get date range
    const range = req.query.range || '7d';
    const date = new Date();
    let startDate;

    switch (range) {
      case '7d':
        startDate = new Date(date.setDate(date.getDate() - 7));
        break;
      case '14d':
        startDate = new Date(date.setDate(date.getDate() - 14));
        break;
      case '30d':
        startDate = new Date(date.setDate(date.getDate() - 30));
        break;
      default:
        startDate = new Date(date.setDate(date.getDate() - 7));
    }

    // Get tasks created by day
    const tasksCreatedByDay = await Task.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Get tasks completed by day
    const tasksCompletedByDay = await Task.aggregate([
      {
        $match: {
          status: 'done',
          updatedAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Get tasks assigned to current user
    const userTasks = await Task.find({
      assignee: req.user.id,
      createdAt: { $gte: startDate },
    }).countDocuments();

    // Get tasks completed by current user
    const userCompletedTasks = await Task.find({
      assignee: req.user.id,
      status: 'done',
      updatedAt: { $gte: startDate },
    }).countDocuments();

    res.status(200).json({
      success: true,
      data: {
        tasksCreatedByDay,
        tasksCompletedByDay,
        userTasks,
        userCompletedTasks,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get team performance analytics
// @route   GET /api/analytics/team-performance
// @access  Private
exports.getTeamPerformance = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    
    // Check if team exists
    const team = await Team.findById(teamId);
    
    if (!team) {
      return next(
        new ErrorResponse(`Team not found with id of ${teamId}`, 404)
      );
    }
    
    // Make sure user is team member or admin
    const isMember = team.members.some(
      member => member.user.toString() === req.user.id
    );
    
    if (!isMember && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to view this team's performance`,
          401
        )
      );
    }

    // Get date range
    const range = req.query.range || '30d';
    const date = new Date();
    let startDate;

    switch (range) {
      case '7d':
        startDate = new Date(date.setDate(date.getDate() - 7));
        break;
      case '14d':
        startDate = new Date(date.setDate(date.getDate() - 14));
        break;
      case '30d':
        startDate = new Date(date.setDate(date.getDate() - 30));
        break;
      case '90d':
        startDate = new Date(date.setDate(date.getDate() - 90));
        break;
      default:
        startDate = new Date(date.setDate(date.getDate() - 30));
    }

    // Get team projects
    const teamProjects = await Project.find({ team: teamId });
    const projectIds = teamProjects.map(project => project._id);

    // Get tasks by project
    const tasksByProject = await Task.aggregate([
      {
        $match: {
          project: { $in: projectIds },
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: '$project',
          count: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'done'] }, 1, 0] },
          },
        },
      },
      {
        $lookup: {
          from: 'projects',
          localField: '_id',
          foreignField: '_id',
          as: 'project',
        },
      },
      {
        $unwind: '$project',
      },
      {
        $project: {
          projectName: '$project.name',
          count: 1,
          completed: 1,
          completionRate: {
            $cond: [
              { $eq: ['$count', 0] },
              0,
              { $multiply: [{ $divide: ['$completed', '$count'] }, 100] },
            ],
          },
        },
      },
    ]);

    // Get tasks by member
    const tasksByMember = await Task.aggregate([
      {
        $match: {
          project: { $in: projectIds },
          assignee: { $ne: null },
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: '$assignee',
          count: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'done'] }, 1, 0] },
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          userName: '$user.name',
          userAvatar: '$user.avatar',
          count: 1,
          completed: 1,
          completionRate: {
            $cond: [
              { $eq: ['$count', 0] },
              0,
              { $multiply: [{ $divide: ['$completed', '$count'] }, 100] },
            ],
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        tasksByProject,
        tasksByMember,
      },
    });
  } catch (err) {
    next(err);
  }
};