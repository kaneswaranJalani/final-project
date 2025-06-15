// routes/orderRoutes.js

import express from 'express';
import { 
  createOrder, 
  getOrders, 
  getOrderById, 
  updateOrderStatus, 
  deleteOrder 
} from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get all orders
router.get('/', getOrders);

// Get order by ID
router.get('/:id', getOrderById);

// Update order status by ID
router.put('/:id', updateOrderStatus);

// Delete order by ID
router.delete('/:id', deleteOrder);

export default router;
