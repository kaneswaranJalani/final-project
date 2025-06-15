import express from 'express';
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePaymentStatus,
  deletePayment
} from '../controllers/paymentController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create payment
router.post('/', createPayment);

// Get all payments
router.get('/',isAdmin, getPayments);

// Get, update, delete payment by ID
router.route('/:id')
  .get(getPaymentById)
  .put(updatePaymentStatus)
  .delete(deletePayment);

export default router;
