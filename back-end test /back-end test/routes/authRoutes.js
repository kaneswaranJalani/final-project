import express from "express";
import {
  registerUser,
  registerPartner,
  login,
  getUserById,
  updateUserById,
  getAllUsers,
  deleteUserById,
  updateUserRole
} from "../controllers/authController.js";

const router = express.Router();

// Auth Routes
router.post("/register/user", registerUser);
router.post("/register/partner", registerPartner);
router.post("/login", login);

// User Routes
router.get("/all", getAllUsers);
router.get("/:id", getUserById);           // e.g., GET /api/users/688ee85...
router.put("/:id", updateUserById);        // e.g., PUT /api/users/688ee85...
router.delete("/:id", deleteUserById);
router.put("/:id/role", updateUserRole);   // PUT /api/users/688ee85/role

export default router;
