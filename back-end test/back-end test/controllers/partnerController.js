import User from '../models/User.js';

export const getProfile = async (req, res) => {
  const partner = await User.findById(req.user.id).select('-password');
  res.json(partner);
};

export const updateProfile = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, req.body);
  res.json({ message: 'Profile updated' });
};

export const getLinkedUsers = async (req, res) => {
  const users = await User.find({ role: 'user' });
  res.json(users);
};