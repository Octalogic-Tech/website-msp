import { Router } from 'express';
import { SavedProductController } from '../controllers/savedProductController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Get user's saved products
router.get('/', SavedProductController.getUserSavedProducts);

// Save a product
router.post('/', SavedProductController.saveProduct);

// Remove saved product
router.delete('/:productId', SavedProductController.removeSavedProduct);

export default router;