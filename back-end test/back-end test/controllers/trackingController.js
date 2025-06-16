// controllers/trackingController.js
import Tracking from '../models/Tracking.js';

export const createTracking = async (req, res) => {
  try {
    const tracking = new Tracking({
      userId: req.user?.id || null,  // if user is logged in
      event: req.body.event,
      metadata: req.body.metadata
    });
    await tracking.save();
    res.status(201).json({ message: 'Tracking saved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save tracking' });
  }
};
