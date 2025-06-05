import User from '../models/User.js';

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const { name } = req.body;
  await User.findByIdAndUpdate(req.user.id, { name });
  res.json({ message: 'Profile updated' });
};

export const deleteAccount = async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: 'Account deleted' });
};