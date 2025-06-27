import Order from '../models/order.js';
import Bicycle from '../models/bicycle.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { bicycleId, pickupLocation, startDate, endDate, quantity } = req.body;

    // Validate required fields
    if (!bicycleId || !pickupLocation || !startDate || !endDate || !quantity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Fetch bicycle details
    const bicycle = await Bicycle.findById(bicycleId);
    if (!bicycle) {
      return res.status(404).json({ message: 'Bicycle not found' });
    }

    // Calculate total price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInHours = Math.max((end - start) / (1000 * 60 * 60), 1);
    const totalPrice = bicycle.price * durationInHours * quantity;

    // Create order
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
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('bicycle');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};
