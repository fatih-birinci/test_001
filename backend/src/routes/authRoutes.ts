import { Router } from "express";
import passport from "passport";
import { register, health, login, logout, generatePasswordResetToken, resetPassword } from '../controllers/authController';
import { authenticateToken } from "../common/middleware";

const router = Router();

router.post('/register', register);
router.get('/health', health);
router.post('/login', passport.authenticate('local'), login);
router.post('/logout', authenticateToken, logout);
router.post('/request-password-reset', generatePasswordResetToken);
router.post('/reset-password', resetPassword);

export default router;
