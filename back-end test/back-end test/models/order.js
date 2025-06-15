// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  bicycle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bicycle',
    required: [true, 'Bicycle is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'At least one bicycle must be ordered']
  },
  orderTime: {
    type: Date,
    required: [true, 'Order time is required']
  },
  returnTime: {
    type: Date,
    required: [true, 'Return time is required']
  },
  hours: {
    type: Number,
    required: [true, 'Rental days are required']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
