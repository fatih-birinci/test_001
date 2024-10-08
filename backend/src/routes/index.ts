import { Router } from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import { authenticateToken } from '../common/middleware';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;