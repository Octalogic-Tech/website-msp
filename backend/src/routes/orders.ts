import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Get user's orders
router.get('/', OrderController.getUserOrders);

// Get user stats (for dashboard)
router.get('/stats', OrderController.getUserStats);

// Create new order
router.post('/', OrderController.createOrder);

// Get specific order
router.get('/:orderId', OrderController.getOrderById);

export default router;