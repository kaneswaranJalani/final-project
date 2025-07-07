// server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bicycle from './models/bicycle.js';
import bikeRoutes from './routes/bikeRoutes.js'; // Import bicycle routes
import paymentRoutes from './routes/paymentRoutes.js';
import Partner from './models/Partner.js';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/bicycles', bicycle); // Assuming you have a bicycle model and routes
app.use('/api/bike', bikeRoutes); // Bicycle selection routes
app.use('/api/payments', paymentRoutes);
app.use('/api/partners', Partner); // Partner routes

app.use("/api/users", userRoutes); // ✅ includes /me route

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
