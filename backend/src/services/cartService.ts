import { prisma } from '../config/database';
import { AddToCartInput, UpdateCartItemInput } from '../models/validation';
import { item_type } from '@prisma/client';

export class CartService {
  static async getOrCreateCart(sessionId: string) {
    let cart = await prisma.carts.findUnique({
      where: { session_id: sessionId },
      include: {
        cart_items: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.carts.create({
        data: { session_id: sessionId },
        include: {
          cart_items: {
            include: {
              products: true,
            },
          },
        },
      });
    }

    return cart;
  }

  static async addToCart(sessionId: string, input: AddToCartInput) {
    const { productId: productIdStr, quantity, itemType } = input;
    const productId = Number(productIdStr);

    // Check if product exists
    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    // Get or create cart
    const cart = await this.getOrCreateCart(sessionId);

    // Check if item already exists in cart
    const existingItem = await prisma.cart_items.findUnique({
      where: {
        cart_id_product_id: {
          cart_id: cart.id,
          product_id: productId,
        },
      },
    });

    if (existingItem) {
      // Update existing item
      return await prisma.cart_items.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
          item_type: itemType as item_type,
        },
        include: {
          products: true,
        },
      });
    } else {
      // Create new item
      return await prisma.cart_items.create({
        data: {
          cart_id: cart.id,
          product_id: productId,
          quantity,
          item_type: itemType as item_type,
        },
        include: {
          products: true,
        },
      });
    }
  }

  static async updateCartItem(sessionId: string, itemId: string, input: UpdateCartItemInput) {
    const { quantity, itemType } = input;

    // Find the cart item and verify it belongs to the session
    const cartItem = await prisma.cart_items.findFirst({
      where: {
        id: Number(itemId),
        carts: { session_id: sessionId },
      },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    return await prisma.cart_items.update({
      where: { id: Number(itemId) },
      data: {
        quantity,
        ...(itemType && { item_type: itemType as item_type }),
      },
      include: {
        products: true,
      },
    });
  }

  static async removeFromCart(sessionId: string, itemId: string) {
    // Find the cart item and verify it belongs to the session
    const cartItem = await prisma.cart_items.findFirst({
      where: {
        id: Number(itemId),
        carts: { session_id: sessionId },
      },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    await prisma.cart_items.delete({
      where: { id: Number(itemId) },
    });

    return { success: true };
  }

  static async getCart(sessionId: string) {
    return await this.getOrCreateCart(sessionId);
  }

  static async clearCart(sessionId: string) {
    const cart = await prisma.carts.findUnique({
      where: { session_id: sessionId },
    });

    if (cart) {
      await prisma.cart_items.deleteMany({
        where: { cart_id: cart.id },
      });
    }

    return { success: true };
  }
}
