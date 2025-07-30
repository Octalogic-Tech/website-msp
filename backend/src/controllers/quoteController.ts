import { Request, Response, NextFunction } from 'express';
import { QuoteService } from '../services/quoteService';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export class QuoteController {
  static async createQuoteRequest(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const input = req.body; // Validated by middleware

      // Add user ID if user is authenticated
      const userId = req.user?.id || null;
      const quoteRequest = await QuoteService.createQuoteRequest(input, userId);

      res.status(201).json({
        success: true,
        data: quoteRequest,
        message: 'Quote request created successfully',
      });
    } catch (error) {
      const message = (error as Error).message;
      const statusCode = message.includes('not found') ? 404 : 500;
      next(createError(message, statusCode));
    }
  }

  static async getQuoteRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const quoteRequest = await QuoteService.getQuoteRequest(id);

      res.json({
        success: true,
        data: quoteRequest,
      });
    } catch (error) {
      const message = (error as Error).message;
      const statusCode = message === 'Quote request not found' ? 404 : 500;
      next(createError(message, statusCode));
    }
  }

  static async getQuoteRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.query as { email?: string };
      const quoteRequests = await QuoteService.getQuoteRequests(email);

      res.json({
        success: true,
        data: quoteRequests,
      });
    } catch (error) {
      next(createError((error as Error).message, 500));
    }
  }

  static async updateQuoteStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body as { status: 'PENDING' | 'REVIEWED' | 'QUOTED' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED' };

      const quoteRequest = await QuoteService.updateQuoteStatus(id, status);

      res.json({
        success: true,
        data: quoteRequest,
        message: 'Quote status updated',
      });
    } catch (error) {
      const message = (error as Error).message;
      const statusCode = message === 'Quote request not found' ? 404 : 500;
      next(createError(message, statusCode));
    }
  }

  static async getUserQuoteRequests(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return next(createError('User not authenticated', 401));
      }

      const quoteRequests = await QuoteService.getUserQuoteRequests(req.user.id);

      res.json({
        success: true,
        data: quoteRequests,
      });
    } catch (error) {
      next(createError((error as Error).message, 500));
    }
  }

  static async getUserQuoteById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return next(createError('User not authenticated', 401));
      }

      const { id } = req.params;
      const quoteRequest = await QuoteService.getUserQuoteById(id, req.user.id);

      if (!quoteRequest) {
        return next(createError('Quote request not found', 404));
      }

      res.json({
        success: true,
        data: quoteRequest,
      });
    } catch (error) {
      next(createError((error as Error).message, 500));
    }
  }
}
