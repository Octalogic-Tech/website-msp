import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { OrderService } from '../services/orderService';

export class OrderController {
    static async getUserOrders(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }

            const orders = await OrderService.getUserOrders(req.user.id);
            res.json({ orders });
        } catch (error: any) {
            console.error('Get user orders error:', error);
            res.status(500).json({ error: 'Failed to fetch orders' });
        }
    }

    static async getOrderById(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }

            const { orderId } = req.params;
            const order = await OrderService.getOrderById(orderId, req.user.id);

            if (!order) {
                res.status(404).json({ error: 'Order not found' });
                return;
            }

            res.json({ order });
        } catch (error: any) {
            console.error('Get order by ID error:', error);
            res.status(500).json({ error: 'Failed to fetch order' });
        }
    }

    static async createOrder(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }

            const { cartItems } = req.body;
            if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
                res.status(400).json({ error: 'Cart items are required' });
                return;
            }

            const order = await OrderService.createOrder(req.user.id, cartItems);
            res.status(201).json({
                success: true,
                order,
                message: 'Order created successfully'
            });
        } catch (error: any) {
            console.error('Create order error:', error);
            res.status(500).json({ error: 'Failed to create order' });
        }
    }

    static async getUserStats(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }

            const stats = await OrderService.getUserStats(req.user.id);
            res.json({ stats });
        } catch (error: any) {
            console.error('Get user stats error:', error);
            res.status(500).json({ error: 'Failed to fetch user stats' });
        }
    }
}