import { prisma } from '../config/database';
import { AddToCartInput, UpdateCartItemInput } from '../models/validation';

export class CartService {
  static async getOrCreateCart(sessionId: string) {
    let cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
                brand: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { sessionId },
        include: {
          items: {
            include: {
              product: {
                include: {
                  category: true,
                  brand: true,
                },
              },
            },
          },
        },
      });
    }

    return cart;
  }

  static async addToCart(sessionId: string, input: AddToCartInput) {
    const { productId, quantity, itemType } = input;

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId, isActive: true },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    // Get or create cart
    const cart = await this.getOrCreateCart(sessionId);

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      // Update existing item
      return await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
          itemType,
        },
        include: {
          product: {
            include: {
              category: true,
              brand: true,
            },
          },
        },
      });
    } else {
      // Create new item
      return await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          itemType,
        },
        include: {
          product: {
            include: {
              category: true,
              brand: true,
            },
          },
        },
      });
    }
  }

  static async updateCartItem(sessionId: string, itemId: string, input: UpdateCartItemInput) {
    const { quantity, itemType } = input;

    // Find the cart item and verify it belongs to the session
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: { sessionId },
      },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    return await prisma.cartItem.update({
      where: { id: itemId },
      data: {
        quantity,
        ...(itemType && { itemType }),
      },
      include: {
        product: {
          include: {
            category: true,
            brand: true,
          },
        },
      },
    });
  }

  static async removeFromCart(sessionId: string, itemId: string) {
    // Find the cart item and verify it belongs to the session
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: { sessionId },
      },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return { success: true };
  }

  static async getCart(sessionId: string) {
    return await this.getOrCreateCart(sessionId);
  }

  static async clearCart(sessionId: string) {
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    return { success: true };
  }
}
