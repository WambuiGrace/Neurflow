const Event = require('../models/Event');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all events
// @route   GET /api/events
// @access  Private
exports.getEvents = async (req, res, next) => {
  try {
    let query = {};

    // Filter by date range if provided
    if (req.query.start && req.query.end) {
      query.date = {
        $gte: new Date(req.query.start),
        $lte: new Date(req.query.end),
      };
    }

    // Get events where user is creator or attendee
    query.$or = [
      { createdBy: req.user.id },
      { 'attendees.user': req.user.id },
    ];

    const events = await Event.find(query)
      .populate({
        path: 'attendees.user',
        select: 'name avatar',
      })
      .populate({
        path: 'project',
        select: 'name',
      })
      .populate({
        path: 'team',
        select: 'name',
      })
      .sort({ date: 1, 'time.start': 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Private
exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate({
        path: 'attendees.user',
        select: 'name avatar email',
      })
      .populate({
        path: 'project',
        select: 'name description',
      })
      .populate({
        path: 'team',
        select: 'name description',
      })
      .populate({
        path: 'createdBy',
        select: 'name avatar',
      });

    if (!event) {
      return next(
        new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is creator, attendee, or admin
    const isAttendee = event.attendees.some(
      attendee => attendee.user._id.toString() === req.user.id
    );

    if (
      event.createdBy._id.toString() !== req.user.id &&
      !isAttendee &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to view this event`,
          401
        )
      );
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private
exports.createEvent = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    // Add creator as an attendee if not already included
    if (!req.body.attendees) {
      req.body.attendees = [];
    }

    const isCreatorIncluded = req.body.attendees.some(
      attendee => attendee.user.toString() === req.user.id
    );

    if (!isCreatorIncluded) {
      req.body.attendees.push({
        user: req.user.id,
        status: 'accepted',
      });
    }

    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
exports.updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return next(
        new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is event creator or admin
    if (
      event.createdBy.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this event`,
          401
        )
      );
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(
        new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is event creator or admin
    if (
      event.createdBy.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this event`,
          401
        )
      );
    }

    await event.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update attendee status
// @route   PUT /api/events/:id/attendees/:userId
// @access  Private
exports.updateAttendeeStatus = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(
        new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
      );
    }

    // Find attendee
    const attendeeIndex = event.attendees.findIndex(
      attendee => attendee.user.toString() === req.params.userId
    );

    if (attendeeIndex === -1) {
      return next(
        new ErrorResponse(
          `User ${req.params.userId} is not an attendee of this event`,
          404
        )
      );
    }

    // Make sure user is updating their own status or is admin
    if (
      req.params.userId !== req.user.id &&
      req.user.role !== 'admin' &&
      event.createdBy.toString() !== req.user.id
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this attendee status`,
          401
        )
      );
    }

    // Update status
    event.attendees[attendeeIndex].status = req.body.status;
    await event.save();

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    next(err);
  }
};