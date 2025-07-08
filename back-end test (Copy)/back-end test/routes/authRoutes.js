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

// POST routes
router.post("/register/user", registerUser);
router.post("/register/partner", registerPartner);
router.post("/login", login);


// GET route - Get user by ID
router.get("/user/:id", getUserById);

// GET all users
router.get("/all", getAllUsers);

// PUT route - Update user by ID
router.put("/user/:id", updateUserById);


// DELETE route - Delete user by ID
router.delete("/:id", deleteUserById);

//PUT route - Update user role
router.put("/:id", updateUserRole);

export default router;