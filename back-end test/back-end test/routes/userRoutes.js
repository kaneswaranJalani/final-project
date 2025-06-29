import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  // addFeedback
} from '../controllers/userController.js';

import User from '../models/User.js'; // ✅ Import the User model

const router = express.Router();

// User routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUser);

// Feedback route
// router.post('/users/:userId/feedback', addFeedback);

// ✅ Role update route
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
