import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class OrderService {
    static async getUserOrders(userId: string) {
        return await prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    static async getOrderById(orderId: string, userId: string) {
        return await prisma.order.findFirst({
            where: {
                id: orderId,
                userId
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }

    static async createOrder(userId: string, cartItems: any[]) {
        // Generate order number
        const orderNumber = `MSP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

        // Calculate total amount
        const totalAmount = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

        // Create order with items
        const order = await prisma.order.create({
            data: {
                userId,
                orderNumber,
                status: 'PENDING',
                totalAmount,
                items: {
                    create: cartItems.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        unitPrice: parseFloat(item.price)
                    }))
                }
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        return order;
    }

    static async getUserStats(userId: string) {
        const [totalOrders, activeQuotes, savedProducts] = await Promise.all([
            prisma.order.count({
                where: { userId }
            }),
            prisma.quoteRequest.count({
                where: {
                    userId,
                    status: { in: ['PENDING', 'REVIEWED', 'QUOTED'] }
                }
            }),
            prisma.savedProduct.count({
                where: { userId }
            })
        ]);

        return {
            totalOrders,
            activeQuotes,
            savedProducts
        };
    }
}