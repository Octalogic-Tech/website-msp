import { Request, Response, NextFunction } from 'express';
import { CartService } from '../services/cartService';
import { createError } from '../middleware/errorHandler';

export class CartController {
  private static getSessionId(req: Request): string {
    // Use the session ID from express-session
    // This will be consistent across requests for the same session
    return req.sessionID;
  }

  static async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = CartController.getSessionId(req);
      console.log('🛒 Getting cart for session:', sessionId);

      const cart = await CartService.getCart(sessionId);
      console.log('🛒 Cart retrieved:', {
        id: cart.id,
        sessionId: cart.sessionId,
        itemCount: cart.items?.length || 0,
        items: cart.items?.map(item => ({
          id: item.id,
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity
        }))
      });

      res.json({
        success: true,
        data: cart,
      });
    } catch (error) {
      console.error('🛒 Error getting cart:', error);
      next(createError((error as Error).message, 500));
    }
  }

  static async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = CartController.getSessionId(req);
      const input = req.body; // Validated by middleware

      console.log('🛒 Adding to cart for session:', sessionId, 'Input:', input);

      const cartItem = await CartService.addToCart(sessionId, input);

      console.log('🛒 Item added to cart:', {
        id: cartItem.id,
        productId: cartItem.product.id,
        productName: cartItem.product.name,
        quantity: cartItem.quantity
      });

      res.status(201).json({
        success: true,
        data: cartItem,
        message: 'Item added to cart',
      });
    } catch (error) {
      console.error('🛒 Error adding to cart:', error);
      const message = (error as Error).message;
      const statusCode = message === 'Product not found' ? 404 : 500;
      next(createError(message, statusCode));
    }
  }

  static async updateCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = CartController.getSessionId(req);
      const { id } = req.params;
      const input = req.body; // Validated by middleware

      const cartItem = await CartService.updateCartItem(sessionId, id, input);

      res.json({
        success: true,
        data: cartItem,
        message: 'Cart item updated',
      });
    } catch (error) {
      const message = (error as Error).message;
      const statusCode = message === 'Cart item not found' ? 404 : 500;
      next(createError(message, statusCode));
    }
  }

  static async removeFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = CartController.getSessionId(req);
      const { id } = req.params;

      await CartService.removeFromCart(sessionId, id);

      res.json({
        success: true,
        message: 'Item removed from cart',
      });
    } catch (error) {
      const message = (error as Error).message;
      const statusCode = message === 'Cart item not found' ? 404 : 500;
      next(createError(message, statusCode));
    }
  }

  static async clearCart(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = CartController.getSessionId(req);

      await CartService.clearCart(sessionId);

      res.json({
        success: true,
        message: 'Cart cleared',
      });
    } catch (error) {
      next(createError((error as Error).message, 500));
    }
  }
}
