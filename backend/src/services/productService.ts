/* src/services/product.service.ts
   ------------------------------------------------------------------ */
   import { prisma } from '../config/database';
   import { Prisma } from '@prisma/client';
   import { ProductQuery } from '../models/validation';
   
   type Where  = Prisma.productsWhereInput;
   type Order  = Prisma.productsOrderByWithRelationInput;
   
   export class ProductService {
     /* ================================================================ */
     /** Paginated product list with rich filtering                     */
     static async getProducts(query: ProductQuery) {
       const {
         search,
         category,
         brand,
         minPrice,
         maxPrice,
         page  = 1,
         limit = 10,
         sortBy = 'newest',
       } = query;
   
       /* -----------------------  WHERE -------------------------------- */
       const AND: Where[] = [];
   
       if (search) {
         AND.push({
           OR: [
             { name:        { contains: search, mode: 'insensitive' } },
             { description: { contains: search, mode: 'insensitive' } },
           ],
         });
       }
   
       if (category) {
         AND.push({
           categories_products_lnk: {
             some: { categories: { slug: category } },
           },
         });
       }
   
       if (brand) {
         AND.push({ brand });
       }
   
       if (query.condition) {
         AND.push({
           specs: {
             path: ['condition'],
             equals: query.condition,
             not: undefined,
           } as Prisma.JsonFilter,
         });
       }
   
       if (query.availability) {
         const statusMap: Record<string, string | undefined> = {
           'in-stock'     : 'IN_STOCK',
           'low-stock'    : 'LOW_STOCK',
           'out-of-stock' : 'OUT_OF_STOCK',
         };
         const wanted = statusMap[query.availability];
         if (wanted) AND.push({ stock_status: wanted });
       }
   
       /* Pre-defined price ranges */
       if (query.priceRange) {
         const priceFilter: Prisma.DecimalFilter = {};
         switch (query.priceRange) {
           case 'under-25k':    priceFilter.lt  = 25000; break;
           case '25k-50k':      priceFilter.gte = 25000; priceFilter.lte = 50000;  break;
           case '50k-100k':     priceFilter.gte = 50000; priceFilter.lte = 100000; break;
           case '100k-250k':    priceFilter.gte = 100000; priceFilter.lte = 250000; break;
           case 'over-250k':    priceFilter.gt  = 250000; break;
         }
         AND.push({ price: priceFilter });
       }
   
       /* Custom min / max price */
       if (minPrice || maxPrice) {
         AND.push({
           price: {
             ...(minPrice && { gte: minPrice }),
             ...(maxPrice && { lte: maxPrice }),
           },
         });
       }
   
       const where: Where = AND.length ? { AND } : {};
   
       /* ----------------------  ORDER BY ------------------------------ */
       let orderBy: Order | Order[] = { created_at: 'desc' };
   
       switch (sortBy) {
         case 'price_asc':  orderBy = { price: 'asc'  }; break;
         case 'price_desc': orderBy = { price: 'desc' }; break;
         case 'name':       orderBy = { name:  'asc'  }; break;
         case 'newest':
         default:           orderBy = { created_at: 'desc' };
       }
   
       /* ---------------------  PAGINATION ----------------------------- */
       const skip = (page - 1) * limit;
       const take = limit;
   
       /* ---------------------  QUERY DB ------------------------------- */
       const [products, total] = await Promise.all([
         prisma.products.findMany({
           where,
           include: {
             categories_products_lnk: {
               include: { categories: true },
             },
           },
           orderBy,
           skip,
           take,
         }),
         prisma.products.count({ where }),
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
   
     /* ================================================================ */
     /** Get a single product by its unique slug                        */
     static async getProductBySlug(slug: string) {
       const product = await prisma.products.findUnique({
         where: { slug },
         include: {
           categories_products_lnk: {
             include: { categories: true },
           },
         },
       });
   
       if (!product) throw new Error('Product not found');
       return product;
     }
   
     /* ================================================================ */
     /** Search spare parts by machine make / (optional) model          */
     static async searchPartsByMake(make: string, model?: string) {
       const OR: Where[] = [
         { name:        { contains: make, mode: 'insensitive' } },
         { description: { contains: make, mode: 'insensitive' } },
         { specs: { path: ['compatibleMakes'], array_contains: make } as any },
       ];
   
       if (model) {
         OR.push(
           { name:        { contains: model, mode: 'insensitive' } },
           { description: { contains: model, mode: 'insensitive' } },
           { specs: { path: ['compatibleModels'], array_contains: model } as any },
         );
       }
   
       const products = await prisma.products.findMany({
         where: {
           categories_products_lnk: {
             some: {
               categories: {
                 name: { contains: 'Spare Parts', mode: 'insensitive' },
               },
             },
           },
           OR,
         },
         include: {
           categories_products_lnk: {
             include: { categories: true },
           },
         },
         take: 50,
       });
   
       return products;
     }
   }