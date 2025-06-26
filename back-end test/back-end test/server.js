// server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import bicycleRoutes from './routes/bicycleRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import eventRoutes from './routes/eventRoutes.js';  // Correct import
import trackingRoutes from './routes/trackingRoutes.js'; // Optional, if you want to track events

// import { errorHandler } from './middlewares/errorHandler.js'; // Uncomment if you have global error handling

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bicycles', bicycleRoutes);  // Better to use /api/bicycles for consistency
app.use('/api/payments', paymentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tracking', trackingRoutes); // Optional, if you want to track events

// Test route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Global Error Handler (optional)
// app.use(errorHandler);

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  });

  
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
