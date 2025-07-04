// routes/userRoutes.js
import express from "express";
import { registerUser, getUsers, updateUserRole, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// POST /api/users/register
router.post("/register", registerUser);
router.get("/", getUsers);
router.put("/:id", updateUserRole);
router.delete("/:id", deleteUser);

export default router;
