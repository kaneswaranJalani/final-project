// routes/trackingRoutes.js
import express from 'express';
import { createTracking } from '../controllers/trackingController.js';
import auth from '../middlewares/authMiddleware.js'; // optional if you want authenticated tracking

const router = express.Router();

router.post('/', auth, createTracking);

export default router;
