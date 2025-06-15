import Order from '../models/order.js';
import Bicycle from '../models/bicycle.js';

export const createOrder = async (req, res, next) => {
  try {
    const { bicycleId, quantity, user, orderTime, returnTime } = req.body;

    // Check if bicycle exists
    const bicycle = await Bicycle.findById(bicycleId);
    if (!bicycle) {
      return res.status(404).json({ message: 'Bicycle not found' });
    }

    // Check stock
    if (bicycle.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Validate rental period
    const startDate = new Date(orderTime);
    const endDate = new Date(returnTime);
    const timeDiff = endDate.getTime() - startDate.getTime();

    if (timeDiff <= 0) {
      return res.status(400).json({ message: 'Invalid rental period' });
    }

    // Calculate rental hours
    const rentalHours = Math.ceil(timeDiff / (1000 * 60 * 60)); // convert ms to hours

    // Calculate total price (price per hour * quantity * hours)
    const totalPrice = rentalHours * bicycle.price * quantity;

    const order = new Order({
      user,
      bicycle: bicycleId,
      quantity,
      hours: rentalHours,
      orderTime: startDate,
      returnTime: endDate,
      totalPrice
    });

    // Reduce stock
    bicycle.stock -= quantity;
    await bicycle.save();

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('bicycle', 'brand model price');
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('bicycle', 'brand model price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Restock bicycle
    const bicycle = await Bicycle.findById(order.bicycle);
    if (bicycle) {
      bicycle.stock += order.quantity;
      await bicycle.save();
    }

    await order.deleteOne();
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
