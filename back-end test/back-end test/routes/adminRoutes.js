import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import { allowRoles } from '../middlewares/roleMiddleware.js';
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/adminController.js';

const router = express.Router();

router.use(auth, allowRoles('admin'));
router.get('/users', getAllUsers);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
