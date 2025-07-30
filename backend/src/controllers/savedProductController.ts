import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { SavedProductService } from '../services/savedProductService';

export class SavedProductController {
    static async getUserSavedProducts(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }

            const savedProducts = await SavedProductService.getUserSavedProducts(req.user.id);
            res.json({ savedProducts });
        } catch (error: any) {
            console.error('Get user saved products error:', error);
            res.status(500).json({ error: 'Failed to fetch saved products' });
        }
    }

    static async saveProduct(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }

            const { productId } = req.body;
            const savedProduct = await SavedProductService.saveProduct(req.user.id, productId);
            res.status(201).json({ savedProduct });
        } catch (error: any) {
            console.error('Save product error:', error);
            if (error.message === 'Product already saved') {
                res.status(409).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Failed to save product' });
        }
    }

    static async removeSavedProduct(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }

            const { productId } = req.params;
            await SavedProductService.removeSavedProduct(req.user.id, productId);
            res.json({ message: 'Product removed from saved list' });
        } catch (error: any) {
            console.error('Remove saved product error:', error);
            res.status(500).json({ error: 'Failed to remove saved product' });
        }
    }
}