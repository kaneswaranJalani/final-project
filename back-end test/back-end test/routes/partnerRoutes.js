// routes/partnerRoutes.js
import express from "express";
import { registerPartner } from "../controllers/partnerController.js";

const router = express.Router();

router.post("/register", registerPartner);

export default router;
