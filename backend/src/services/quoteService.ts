import { prisma } from '../config/database';
import { QuoteRequestInput } from '../models/validation';

export class QuoteService {
  static async createQuoteRequest(input: QuoteRequestInput) {
    const { customerInfo, items, notes } = input;
    const { email, name: customerName, company: companyName, phone: phoneNumber } = customerInfo;

    // Validate all products exist
    const productIds = items.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { 
        id: { in: productIds },
        isActive: true,
      },
    });

    if (products.length !== productIds.length) {
      throw new Error('One or more products not found');
    }

    // Calculate total amount
    let totalAmount = 0;
    const quoteItems = items.map(item => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const product = products.find((p: any) => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      
      const itemTotal = Number(product.price) * item.quantity;
      totalAmount += itemTotal;
      
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.price,
      };
    });

    // Create quote request with items
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        email,
        customerName,
        companyName,
        phoneNumber,
        message: notes || '',
        totalAmount,
        items: {
          create: quoteItems,
        },
      },
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

    return quoteRequest;
  }

  static async getQuoteRequest(id: string) {
    const quoteRequest = await prisma.quoteRequest.findUnique({
      where: { id },
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

    if (!quoteRequest) {
      throw new Error('Quote request not found');
    }

    return quoteRequest;
  }

  static async getQuoteRequests(email?: string) {
    return await prisma.quoteRequest.findMany({
      where: email ? { email } : {},
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
      orderBy: { createdAt: 'desc' },
    });
  }

  static async updateQuoteStatus(id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED') {
    const quoteRequest = await prisma.quoteRequest.findUnique({
      where: { id },
    });

    if (!quoteRequest) {
      throw new Error('Quote request not found');
    }

    return await prisma.quoteRequest.update({
      where: { id },
      data: { status },
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
}
