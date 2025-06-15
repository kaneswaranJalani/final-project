// controllers/feedbackController.js
import Feedback from '../models/feedback.js';

// Create feedback
export const createFeedback = async (req, res, next) => {
  try {
    const feedback = new Feedback({
      // user: req.user.id,  // Assuming you have authentication
      user: req.body.user, // Use req.body.user for testing purposes
      message: req.body.message,
      rating: req.body.rating
    });
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    next(err);
  }
};

// Get all feedbacks
export const getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'name email');
    res.json(feedbacks);
  } catch (err) {
    next(err);
  }
};

// Get single feedback
export const getFeedbackById = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('user', 'name email');
    if (!feedback) {
      res.status(404);
      throw new Error('Feedback not found');
    }
    res.json(feedback);
  } catch (err) {
    next(err);
  }
};

// Update feedback
export const updateFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      res.status(404);
      throw new Error('Feedback not found');
    }

    feedback.message = req.body.message || feedback.message;
    feedback.rating = req.body.rating || feedback.rating;

    const updatedFeedback = await feedback.save();
    res.json(updatedFeedback);
  } catch (err) {
    next(err);
  }
};

// Delete feedback
export const deleteFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      res.status(404);
      throw new Error('Feedback not found');
    }

    await feedback.deleteOne();
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    next(err);
  }
};
