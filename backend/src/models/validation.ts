import { z } from 'zod';

// Product validation schemas
export const productQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.string().transform(val => val ? parseFloat(val) : undefined).optional(),
  maxPrice: z.string().transform(val => val ? parseFloat(val) : undefined).optional(),
  page: z.string().optional().transform(val => parseInt(val || '1') || 1),
  limit: z.string().optional().transform(val => parseInt(val || '10') || 10),
  sortBy: z.enum(['newest', 'price_asc', 'price_desc', 'name']).default('newest'),
});

// Cart item validation schemas
export const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  itemType: z.enum(['BUY_NOW', 'REQUEST_QUOTE']).default('BUY_NOW'),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  itemType: z.enum(['BUY_NOW', 'REQUEST_QUOTE']).optional(),
});

// Quote request validation schema
export const quoteRequestSchema = z.object({
  customerInfo: z.object({
    name: z.string().min(1, 'Customer name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().optional(),
    company: z.string().optional(),
  }),
  items: z.array(z.object({
    productId: z.string().min(1, 'Product ID is required'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  })).min(1, 'At least one item is required'),
  notes: z.string().optional(),
});

// Parts finder validation schema
export const partsFinderSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
});

export type ProductQuery = z.infer<typeof productQuerySchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
export type PartsFinderInput = z.infer<typeof partsFinderSchema>;
