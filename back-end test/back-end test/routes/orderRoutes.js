import express from 'express';
import Order from '../models/order.js';
import Bicycle from '../models/bicycle.js';

const router = express.Router();

// POST: Create a new order
router.post('/', async (req, res) => {
  try {
    const { bicycleId, pickupLocation, startDate, endDate, quantity } = req.body;

    // Validate input
    if (!bicycleId || !pickupLocation || !startDate || !endDate || !quantity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if bicycle exists
    const bicycle = await Bicycle.findById(bicycleId);
    if (!bicycle) {
      return res.status(404).json({ message: 'Bicycle not found' });
    }

    // Calculate total price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const hours = Math.max((end - start) / (1000 * 60 * 60), 1); // Minimum 1 hour
    const totalPrice = bicycle.price * hours * quantity;

    // Create and save order
    const order = new Order({
      bicycle: bicycleId,
      pickupLocation,
      startDate,
      endDate,
      quantity,
      totalPrice,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
});

// GET: Get all orders with bicycle details
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('bicycle');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
});

export default router;
