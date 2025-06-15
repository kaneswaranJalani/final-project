// routes/feedbackRoutes.js
import express from 'express';
import {
  createFeedback,
  getFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
} from '../controllers/feedbackController.js';
// import { protect } from '../middlewares/authMiddleware.js';  // Optional if you have auth

const router = express.Router();

router.route('/')
  .post( createFeedback)
  .get( getFeedbacks);

router.route('/:id')
  .get( getFeedbackById)
  .put( updateFeedback)
  .delete(deleteFeedback);

export default router;
