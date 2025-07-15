import { Request, Response, NextFunction } from 'express';
import { CartService } from '../services/cartService';
import { createError } from '../middleware/errorHandler';

export class CartController {
  private static getSessionId(req: Request): string {
    // Get session ID from session or create a temporary one
    if (req.session?.id) {
      return req.session.id;
    }
    
    // Generate a temporary session ID if no session exists
    return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = CartController.getSessionId(req);
      const cart = await CartService.getCart(sessionId);
      
      res.json({
        success: true,
        data: cart,
      });
    } catch (error) {
      next(createError((error as Error).message, 500));
    }
  }

  static async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = CartController.getSessionId(req);
      const input = req.body; // Validated by middleware
      
      const cartItem = await CartService.addToCart(sessionId, input);
      
      res.status(201).json({
        success: true,
        data: cartItem,
        message: 'Item added to cart',
      });
    } catch (error) {
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
