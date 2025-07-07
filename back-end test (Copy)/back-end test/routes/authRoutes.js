// routes/authRoutes.js
import express from "express";
import { register, login } from "../controllers/authController.js";
import { registerPartner, updatePartner } from "../controllers/partnerController.js";

const router = express.Router();

// General user routes
router.post("/register", register);         // For user
router.post("/login", login);               // For user

// Partner registration route
router.post("/register/partner", registerPartner);

// Partner profile update route (PUT /partners)
router.put("/partners", updatePartner);

export default router;
