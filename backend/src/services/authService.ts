import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SignupData {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    company?: string;
    phone: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        company?: string;
        isVerified: boolean;
    };
    token: string;
}

export class AuthService {
    private static generateToken(userId: string): string {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET not configured');
        }

        return jwt.sign(
            { userId },
            JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
        );
    }

    static async signup(data: SignupData): Promise<AuthResponse> {
        const { email, password, firstName, lastName, company, phone } = data;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                firstName,
                lastName: lastName || '',
                company: company || '',
                phone,
                isActive: true,
                isVerified: false // Email verification can be added later
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                company: true,
                phone: true,
                isVerified: true,
                createdAt: true
            }
        });

        // Generate JWT token
        const token = this.generateToken(user.id);

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() }
        });

        return {
            user: {
                ...user,
                company: user.company || undefined
            },
            token
        };
    }

    static async login(data: LoginData): Promise<AuthResponse> {
        const { email, password } = data;

        // Find user
        const user = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
                isActive: true
            },
            select: {
                id: true,
                email: true,
                password: true,
                firstName: true,
                lastName: true,
                company: true,
                isVerified: true,
                isActive: true
            }
        });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }

        // Generate JWT token
        const token = this.generateToken(user.id);

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() }
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return {
            user: {
                ...userWithoutPassword,
                company: userWithoutPassword.company || undefined
            },
            token
        };
    }

    static async getUserProfile(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                company: true,
                phone: true,
                jobTitle: true,
                address: true,
                city: true,
                state: true,
                zipCode: true,
                country: true,
                website: true,
                taxId: true,
                preferredContact: true,
                marketingEmails: true,
                orderUpdates: true,
                quoteNotifications: true,
                isVerified: true,
                createdAt: true,
                lastLoginAt: true,
                _count: {
                    select: {
                        orders: true,
                        quotes: true,
                        savedProducts: true
                    }
                }
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    static async updateProfile(userId: string, data: any) {
        const allowedFields = [
            'firstName', 'lastName', 'company', 'phone', 'jobTitle',
            'address', 'city', 'state', 'zipCode', 'country', 'website', 'taxId',
            'preferredContact', 'marketingEmails', 'orderUpdates', 'quoteNotifications'
        ];

        const updateData: any = {};
        for (const field of allowedFields) {
            if (data[field] !== undefined) {
                updateData[field] = data[field];
            }
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                company: true,
                phone: true,
                jobTitle: true,
                address: true,
                city: true,
                state: true,
                zipCode: true,
                country: true,
                website: true,
                taxId: true,
                preferredContact: true,
                marketingEmails: true,
                orderUpdates: true,
                quoteNotifications: true,
                isVerified: true,
                updatedAt: true
            }
        });

        return user;
    }

    static async changePassword(userId: string, currentPassword: string, newPassword: string) {
        // Get current user
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { password: true }
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isValidPassword) {
            throw new Error('Current password is incorrect');
        }

        // Hash new password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update password
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        return { message: 'Password updated successfully' };
    }

    static async verifyToken(token: string) {
        try {
            const JWT_SECRET = process.env.JWT_SECRET;
            if (!JWT_SECRET) {
                throw new Error('JWT_SECRET not configured');
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
                    isVerified: true
                }
            });

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}