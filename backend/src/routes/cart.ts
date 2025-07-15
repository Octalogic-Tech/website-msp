import { Router } from 'express';
import { CartController } from '../controllers/cartController';
import { validateRequest } from '../middleware/validateRequest';
import { addToCartSchema, updateCartItemSchema } from '../models/validation';

const router = Router();

// GET /cart - Get current cart
router.get('/', CartController.getCart);

// POST /cart/items - Add item to cart
router.post(
  '/items',
  validateRequest(addToCartSchema),
  CartController.addToCart
);

// PUT /cart/items/:id - Update cart item
router.put(
  '/items/:id',
  validateRequest(updateCartItemSchema),
  CartController.updateCartItem
);

// DELETE /cart/items/:id - Remove item from cart
router.delete('/items/:id', CartController.removeFromCart);

// DELETE /cart - Clear entire cart
router.delete('/', CartController.clearCart);

export default router;
