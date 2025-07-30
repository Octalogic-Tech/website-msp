import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/signup', AuthController.signupValidation, AuthController.signup);
router.post('/login', AuthController.loginValidation, AuthController.login);
router.post('/verify-token', AuthController.verifyToken);

// Protected routes
router.get('/profile', authenticateToken, AuthController.getProfile);
router.put('/profile', authenticateToken, AuthController.updateProfile);
router.post('/change-password', authenticateToken, AuthController.changePasswordValidation, AuthController.changePassword);
router.post('/logout', authenticateToken, AuthController.logout);

export default router;