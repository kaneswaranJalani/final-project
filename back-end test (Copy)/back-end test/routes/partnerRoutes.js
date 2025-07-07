// routes/partnerRoutes.js
import express from 'express';
import Partner from '../models/Partner.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_here'; // Change this to a secure env var

// Register partner
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, address, image } = req.body;
    const existing = await Partner.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const partner = new Partner({ name, email, password, phone, address, image });
    await partner.save();

    const token = jwt.sign({ id: partner._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      partner: {
        id: partner._id,
        name: partner.name,
        email: partner.email,
        phone: partner.phone,
        address: partner.address,
        image: partner.image,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login partner
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const partner = await Partner.findOne({ email });
    if (!partner) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await partner.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: partner._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      partner: {
        id: partner._id,
        name: partner.name,
        email: partner.email,
        phone: partner.phone,
        address: partner.address,
        image: partner.image,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
