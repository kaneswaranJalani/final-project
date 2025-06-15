import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';  // Corrected 'controllers'

const router = express.Router();

// Routes
router.post('/', createEvent);          // Create Event
router.get('/', getEvents);             // Get All Events
router.get('/:id', getEventById);       // Get Event by ID
router.put('/:id', updateEvent);        // Update Event
router.delete('/:id', deleteEvent);     // Delete Event

export default router;
