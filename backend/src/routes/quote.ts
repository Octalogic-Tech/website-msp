import { Router } from 'express';
import { QuoteController } from '../controllers/quoteController';
import { validateRequest } from '../middleware/validateRequest';
import { quoteRequestSchema } from '../models/validation';

const router = Router();

// POST /quote - Create quote request
router.post(
  '/',
  validateRequest(quoteRequestSchema),
  QuoteController.createQuoteRequest
);

// GET /quote - Get all quote requests (optionally filter by email)
router.get('/', QuoteController.getQuoteRequests);

// GET /quote/:id - Get specific quote request
router.get('/:id', QuoteController.getQuoteRequest);

// PUT /quote/:id/status - Update quote status (admin only)
router.put('/:id/status', QuoteController.updateQuoteStatus);

export default router;
