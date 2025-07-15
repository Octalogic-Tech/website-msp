import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/productService';
import { createError } from '../middleware/errorHandler';

interface ValidatedRequest extends Request {
  validatedData?: {
    search?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    page: number;
    limit: number;
    sortBy: 'newest' | 'price_asc' | 'price_desc' | 'name';
  };
}

export class ProductController {
  static async getProducts(req: ValidatedRequest, res: Response, next: NextFunction) {
    try {
      const query = req.validatedData!; // Use validated data from middleware
      const result = await ProductService.getProducts(query);
      
      res.json({
        success: true,
        data: result.products,
        pagination: result.pagination,
      });
    } catch (error) {
      next(createError((error as Error).message, 500));
    }
  }

  static async getProductBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const product = await ProductService.getProductBySlug(slug);
      
      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      const message = (error as Error).message;
      const statusCode = message === 'Product not found' ? 404 : 500;
      next(createError(message, statusCode));
    }
  }

  static async searchPartsByMake(req: Request, res: Response, next: NextFunction) {
    try {
      const { make, model } = req.query as { make: string; model: string };
      
      if (!make || !model) {
        return next(createError('Make and model are required', 400));
      }

      const products = await ProductService.searchPartsByMake(make, model);
      
      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(createError((error as Error).message, 500));
    }
  }
}
