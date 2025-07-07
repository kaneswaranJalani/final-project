import express from "express";
import {
  registerUser,
  getUsers,
  updateUserRole,
  deleteUser,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.post("/register", registerUser);

// Authenticated User Routes (✅ define before /:id!)
router.get("/me", authMiddleware, getCurrentUser);
router.put("/update", authMiddleware, updateCurrentUser);

// Admin Routes
router.get("/", getUsers);
router.put("/:id", updateUserRole);
router.delete("/:id", deleteUser);

export default router;
