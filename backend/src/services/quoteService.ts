/* src/services/quote.service.ts
   --------------------------------------------------------------- */
   import { prisma } from '../config/database';
   import { QuoteRequestInput } from '../models/validation';
   import { Prisma, quote_status } from '@prisma/client';
   
   export class QuoteService {
     /* ----------------------------------------------------------------- */
     /** Create a new quote-request (with its quote_items) */
     static async createQuoteRequest(input: QuoteRequestInput) {
       const { customerInfo, items, notes } = input;
       const {
         email,
         name:    customerName,
         company: companyName,
         phone:   phoneNumber,
       } = customerInfo;
   
       /* 1. Validate that all requested product IDs exist */
       const productIds = items.map(i => Number(i.productId));
       const productsFound = await prisma.products.findMany({
         where: { id: { in: productIds } },
         select: { id: true },
       });
   
       if (productsFound.length !== productIds.length) {
         throw new Error('One or more products not found');
       }
   
       /* 2. Build quote_items payload */
       const quoteItemsData = items.map(item => ({
         product_id: Number(item.productId),
         quantity:   item.quantity,
         unit_price: new Prisma.Decimal(0), // price is not stored on product
       }));
   
       /* 3. Persist quote_request + its items */
       const quoteRequest = await prisma.quote_requests.create({
         data: {
           email,
           customer_name:  customerName,
           company_name:   companyName,
           phone_number:   phoneNumber,
           message:        notes ?? '',
           quote_items:    { create: quoteItemsData },
         },
         include: {
           quote_items: {
             include: {
               products: {
                 include: {
                   categories_products_lnk: {
                     include: { categories: true },
                   },
                 },
               },
             },
           },
         },
       });
   
       return quoteRequest;
     }
   
     /* ----------------------------------------------------------------- */
     /** Fetch a single quote-request by ID */
     static async getQuoteRequest(id: string) {
       const quoteRequest = await prisma.quote_requests.findUnique({
         where: { id: Number(id) },
         include: {
           quote_items: {
             include: {
               products: {
                 include: {
                   categories_products_lnk: {
                     include: { categories: true },
                   },
                 },
               },
             },
           },
         },
       });
   
       if (!quoteRequest) throw new Error('Quote request not found');
       return quoteRequest;
     }
   
     /* ----------------------------------------------------------------- */
     /** List quote-requests (optionally filtered by customer e-mail) */
     static async getQuoteRequests(email?: string) {
       return prisma.quote_requests.findMany({
         where: email ? { email } : {},
         include: {
           quote_items: {
             include: {
               products: {
                 include: {
                   categories_products_lnk: {
                     include: { categories: true },
                   },
                 },
               },
             },
           },
         },
         orderBy: { created_at: 'desc' },
       });
     }
   
     /* ----------------------------------------------------------------- */
     /** Update status of a quote-request */
     static async updateQuoteStatus(
       id: string,
       status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED',
     ) {
       /* Verify it exists first (to return 404-like error) */
       const exists = await prisma.quote_requests.findUnique({
         where: { id: Number(id) },
         select: { id: true },
       });
       if (!exists) throw new Error('Quote request not found');
   
       return prisma.quote_requests.update({
         where: { id: Number(id) },
         data:  { status: status as quote_status },
         include: {
           quote_items: {
             include: {
               products: {
                 include: {
                   categories_products_lnk: {
                     include: { categories: true },
                   },
                 },
               },
             },
           },
         },
       });
     }
   }