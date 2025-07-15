import { prisma } from '../config/database';
import { ProductQuery } from '../models/validation';

export class ProductService {
  static async getProducts(query: ProductQuery) {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sortBy = 'newest',
    } = query;

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      isActive: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(category && {
        category: { slug: category },
      }),
      ...(brand && {
        brand: { slug: brand },
      }),
      ...(minPrice || maxPrice) && {
        price: {
          ...(minPrice && { gte: minPrice }),
          ...(maxPrice && { lte: maxPrice }),
        },
      },
    };

    // Build order by clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = {};
    switch (sortBy) {
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'name':
        orderBy = { name: 'asc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    const skip = (page - 1) * limit;

    // Execute queries
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          brand: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug, isActive: true },
      include: {
        category: true,
        brand: true,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  static async searchPartsByMake(make: string, model?: string) {
    // Search for products that are spare parts and match the make/model
    // This is a simplified implementation - in reality, you'd have more complex logic
    
    // Build OR conditions for make
    const makeConditions = [
      { name: { contains: make, mode: 'insensitive' as const } },
      { description: { contains: make, mode: 'insensitive' as const } },
      { specs: { path: ['compatibleMakes'], array_contains: [make] } },
    ];

    // Add model conditions if provided
    if (model) {
      makeConditions.push(
        { name: { contains: model, mode: 'insensitive' as const } },
        { description: { contains: model, mode: 'insensitive' as const } },
        { specs: { path: ['compatibleModels'], array_contains: [model] } }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        category: {
          name: { contains: 'Spare Parts', mode: 'insensitive' as const },
        },
        OR: makeConditions,
      },
      include: {
        category: true,
        brand: true,
      },
      take: 50,
    });

    return products;
  }
}
