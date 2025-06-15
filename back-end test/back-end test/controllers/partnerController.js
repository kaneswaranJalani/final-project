import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// GET all partners (users with role 'partner')
export const getAllPartners = async (req, res) => {
  try {
    const partners = await User.find({ role: 'partner' }).select('-password');
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET partner by ID
export const getPartnerById = async (req, res) => {
  try {
    const partner = await User.findById(req.params.id).select('-password');
    if (!partner || partner.role !== 'partner') {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// CREATE new partner
export const createPartner = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPartner = new User({
      name,
      email,
      password: hashedPassword,
      role: 'partner'
    });

    await newPartner.save();
    res.status(201).json({
      _id: newPartner._id,
      name: newPartner.name,
      email: newPartner.email,
      role: newPartner.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// UPDATE partner
export const updatePartner = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const partner = await User.findById(req.params.id);
    if (!partner || partner.role !== 'partner') {
      return res.status(404).json({ message: 'Partner not found' });
    }

    if (name) partner.name = name;
    if (email) partner.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      partner.password = await bcrypt.hash(password, salt);
    }

    const updatedPartner = await partner.save();

    res.json({
      _id: updatedPartner._id,
      name: updatedPartner.name,
      email: updatedPartner.email,
      role: updatedPartner.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE partner
export const deletePartner = async (req, res) => {
  try {
    const partner = await User.findById(req.params.id);
    if (!partner || partner.role !== 'partner') {
      return res.status(404).json({ message: 'Partner not found' });
    }

    await partner.deleteOne();
    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
