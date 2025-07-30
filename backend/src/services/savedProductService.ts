import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SavedProductService {
    static async getUserSavedProducts(userId: string) {
        return await prisma.savedProduct.findMany({
            where: { userId },
            include: {
                product: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    static async saveProduct(userId: string, productId: string) {
        // Check if already saved
        const existing = await prisma.savedProduct.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        });

        if (existing) {
            throw new Error('Product already saved');
        }

        return await prisma.savedProduct.create({
            data: {
                userId,
                productId
            },
            include: {
                product: true
            }
        });
    }

    static async removeSavedProduct(userId: string, productId: string) {
        return await prisma.savedProduct.delete({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        });
    }
}