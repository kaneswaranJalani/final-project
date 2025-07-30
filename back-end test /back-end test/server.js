// server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import bicycleRoutes from './routes/bicycleRoutes.js'; // Import bicycle routes
import bikeRoutes from './routes/bikeRoutes.js'; // Import bicycle routes
import paymentRoutes from './routes/paymentRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // Import admin routes
import partnerRoutes from './routes/partnerRoutes.js'; // Import partner routes
import uploadRoute from './routes/upload.js'; // Import upload routes
import otpRoutes from './routes/otpRoutes.js'; // Import OTP routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes); 
app.use('/api/bicycles', bicycleRoutes); // Assuming you have a bicycle model and routes
app.use('/api/bike', bikeRoutes); // Bicycle selection routes
app.use('/api/payments', paymentRoutes); // Payment routes
app.use('/api/stripe', stripeRoutes);
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/partners', partnerRoutes); // Partner routes
app.use('/api/upload', uploadRoute);
app.use('/api/otp', otpRoutes); // OTP routes



app.get('/', (req, res) => {
  res.send('Hello, Express!');
});



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
