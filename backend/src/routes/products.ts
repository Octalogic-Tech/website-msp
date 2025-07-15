import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { validateRequest } from '../middleware/validateRequest';
import { productQuerySchema, partsFinderSchema } from '../models/validation';

const router = Router();

// GET /products - List products with search and filters
router.get(
  '/',
  validateRequest(productQuerySchema),
  ProductController.getProducts
);

// GET /products/:slug - Get single product by slug
router.get('/:slug', ProductController.getProductBySlug);

// GET /parts-finder - Find spare parts by make and model
router.get(
  '/parts-finder',
  validateRequest(partsFinderSchema),
  ProductController.searchPartsByMake
);

export default router;
