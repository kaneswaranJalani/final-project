import express from 'express';
import { getPartnerById } from '../controllers/partnerController.js';

const router = express.Router();

// GET /api/partners/:id
router.get('/:id', getPartnerById);

export default router;
