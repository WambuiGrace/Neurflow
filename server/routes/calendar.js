const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  updateAttendeeStatus
} = require('../controllers/calendar');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// Calendar event routes
router.route('/')
  .get(getEvents)
  .post(createEvent);

router.route('/:id')
  .get(getEvent)
  .put(updateEvent)
  .delete(deleteEvent);

// Attendee status update route
router.route('/:id/attendees/:userId')
  .put(updateAttendeeStatus);

module.exports = router;