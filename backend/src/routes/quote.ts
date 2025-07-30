import { Router } from 'express';
import { QuoteController } from '../controllers/quoteController';
import { validateRequest } from '../middleware/validateRequest';
import { quoteRequestSchema } from '../models/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Middleware for optional authentication
const optionalAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    // Try to authenticate, but don't fail if it doesn't work
    authenticateToken(req, res, (err) => {
      // Continue regardless of result
      next();
    });
  } else {
    next();
  }
};

// POST /quote - Create quote request (optionally authenticated)
router.post(
  '/',
  optionalAuth,
  validateRequest(quoteRequestSchema),
  QuoteController.createQuoteRequest
);

// GET /quote - Get all quote requests (optionally filter by email)
router.get('/', QuoteController.getQuoteRequests);

// GET /quote/:id - Get specific quote request
router.get('/:id', QuoteController.getQuoteRequest);

// PUT /quote/:id/status - Update quote status (admin only)
router.put('/:id/status', QuoteController.updateQuoteStatus);

// User-specific routes (require authentication)
router.get('/user/quotes', authenticateToken, QuoteController.getUserQuoteRequests);
router.get('/user/:id', authenticateToken, QuoteController.getUserQuoteById);

export default router;
