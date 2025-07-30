import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        company?: string;
    };
}

export const authenticateToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            res.status(401).json({ error: 'Access token required' });
            return;
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            res.status(500).json({ error: 'JWT secret not configured' });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & { userId: string };

        // Verify user still exists and is active
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
                isActive: true
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                company: true,
                isActive: true,
                isVerified: true
            }
        });

        if (!user) {
            res.status(401).json({ error: 'Invalid or expired token' });
            return;
        }

        req.user = {
            ...user,
            company: user.company || undefined
        };
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(403).json({ error: 'Invalid token' });
    }
};

export const optionalAuth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            next();
            return;
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            next();
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & { userId: string };

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
                isActive: true
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                company: true,
                isActive: true,
                isVerified: true
            }
        });

        if (user) {
            req.user = {
                ...user,
                company: user.company || undefined
            };
        }

        next();
    } catch (error) {
        // If token is invalid, just continue without user
        next();
    }
};