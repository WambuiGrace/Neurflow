const Team = require('../models/Team');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all teams
// @route   GET /api/teams
// @access  Private
exports.getTeams = async (req, res, next) => {
  try {
    let query;

    // For regular users, only show teams they are a member of
    if (req.user.role !== 'admin') {
      query = Team.find({ 'members.user': req.user.id });
    } else {
      query = Team.find();
    }

    // Execute query with population
    const teams = await query
      .populate({
        path: 'members.user',
        select: 'name avatar email',
      })
      .populate({
        path: 'projects',
        select: 'name description status progress dueDate',
      })
      .populate({
        path: 'createdBy',
        select: 'name avatar',
      });

    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single team
// @route   GET /api/teams/:id
// @access  Private
exports.getTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate({
        path: 'members.user',
        select: 'name avatar email',
      })
      .populate({
        path: 'projects',
        select: 'name description status progress dueDate',
      })
      .populate({
        path: 'createdBy',
        select: 'name avatar',
      });

    if (!team) {
      return next(
        new ErrorResponse(`Team not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is team member or admin
    const isMember = team.members.some(
      member => member.user._id.toString() === req.user.id
    );

    if (!isMember && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to view this team`,
          401
        )
      );
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new team
// @route   POST /api/teams
// @access  Private
exports.createTeam = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    // Add current user as a team member with admin role
    if (!req.body.members) {
      req.body.members = [];
    }

    req.body.members.push({
      user: req.user.id,
      role: 'admin',
    });

    const team = await Team.create(req.body);

    // Update user's teams array
    await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { teams: team._id } },
      { new: true }
    );

    // Update other members' teams array
    for (const member of req.body.members) {
      if (member.user.toString() !== req.user.id) {
        await User.findByIdAndUpdate(
          member.user,
          { $addToSet: { teams: team._id } },
          { new: true }
        );
      }
    }

    res.status(201).json({
      success: true,
      data: team,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update team
// @route   PUT /api/teams/:id
// @access  Private
exports.updateTeam = async (req, res, next) => {
  try {
    let team = await Team.findById(req.params.id);

    if (!team) {
      return next(
        new ErrorResponse(`Team not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is team admin or site admin
    const isTeamAdmin = team.members.some(
      member =>
        member.user.toString() === req.user.id && member.role === 'admin'
    );

    if (!isTeamAdmin && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this team`,
          401
        )
      );
    }

    team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete team
// @route   DELETE /api/teams/:id
// @access  Private
exports.deleteTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return next(
        new ErrorResponse(`Team not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is team admin or site admin
    const isTeamAdmin = team.members.some(
      member =>
        member.user.toString() === req.user.id && member.role === 'admin'
    );

    if (!isTeamAdmin && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this team`,
          401
        )
      );
    }

    // Remove team from all members' teams array
    for (const member of team.members) {
      await User.findByIdAndUpdate(
        member.user,
        { $pull: { teams: team._id } },
        { new: true }
      );
    }

    await team.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add team member
// @route   POST /api/teams/:id/members
// @access  Private
exports.addTeamMember = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return next(
        new ErrorResponse(`Team not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is team admin or site admin
    const isTeamAdmin = team.members.some(
      member =>
        member.user.toString() === req.user.id && member.role === 'admin'
    );

    if (!isTeamAdmin && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to add members to this team`,
          401
        )
      );
    }

    // Check if user exists
    const user = await User.findById(req.body.userId);

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.body.userId}`, 404)
      );
    }

    // Check if user is already a member
    const isMember = team.members.some(
      member => member.user.toString() === req.body.userId
    );

    if (isMember) {
      return next(
        new ErrorResponse(
          `User ${req.body.userId} is already a member of this team`,
          400
        )
      );
    }

    // Add user to team
    team.members.push({
      user: req.body.userId,
      role: req.body.role || 'member',
    });

    await team.save();

    // Add team to user's teams array
    await User.findByIdAndUpdate(
      req.body.userId,
      { $addToSet: { teams: team._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Remove team member
// @route   DELETE /api/teams/:id/members/:userId
// @access  Private
exports.removeTeamMember = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return next(
        new ErrorResponse(`Team not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is team admin or site admin
    const isTeamAdmin = team.members.some(
      member =>
        member.user.toString() === req.user.id && member.role === 'admin'
    );

    if (!isTeamAdmin && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to remove members from this team`,
          401
        )
      );
    }

    // Check if user is a member
    const memberIndex = team.members.findIndex(
      member => member.user.toString() === req.params.userId
    );

    if (memberIndex === -1) {
      return next(
        new ErrorResponse(
          `User ${req.params.userId} is not a member of this team`,
          400
        )
      );
    }

    // Don't allow removing the last admin
    const isLastAdmin =
      team.members[memberIndex].role === 'admin' &&
      team.members.filter(member => member.role === 'admin').length === 1;

    if (isLastAdmin) {
      return next(
        new ErrorResponse(
          `Cannot remove the last admin from the team`,
          400
        )
      );
    }

    // Remove user from team
    team.members.splice(memberIndex, 1);

    await team.save();

    // Remove team from user's teams array
    await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { teams: team._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (err) {
    next(err);
  }
};