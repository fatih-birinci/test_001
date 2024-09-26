import { Router } from "express";
import { getUsers } from "../controllers/userController";
import { authenticateToken } from '../common/middleware';

const router = Router();

// /api/users
router.get("/",authenticateToken, getUsers);
// router.get("/:id", getUserById);

export default router;