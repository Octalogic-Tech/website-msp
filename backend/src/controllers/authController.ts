import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthService } from '../services/authService';
import { AuthRequest } from '../middleware/auth';

export class AuthController {
    // Validation rules
    static signupValidation = [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email address'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
            .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
        body('firstName')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('First name must be between 2 and 50 characters'),
        body('lastName')
            .optional()
            .trim()
            .isLength({ max: 50 })
            .withMessage('Last name must not exceed 50 characters'),
        body('phone')
            .trim()
            .isMobilePhone('any')
            .withMessage('Please provide a valid mobile phone number'),
        body('company')
            .optional()
            .trim()
            .isLength({ max: 100 })
            .withMessage('Company name must not exceed 100 characters')
    ];

    static loginValidation = [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email address'),
        body('password')
            .notEmpty()
            .withMessage('Password is required')
    ];

    static changePasswordValidation = [
        body('currentPassword')
            .notEmpty()
            .withMessage('Current password is required'),
        body('newPassword')
            .isLength({ min: 8 })
            .withMessage('New password must be at least 8 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
            .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number')
    ];

    static async signup(req: Request, res: Response): Promise<void> {
        try {
            // Check validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    error: 'Validation failed',
                    details: errors.array()
                });
                return;
            }

            const { email, password, firstName, lastName, company, phone } = req.body;

            const result = await AuthService.signup({
                email,
                password,
                firstName,
                lastName,
                company,
                phone
            });

            res.status(201).json({
                message: 'Account created successfully',
                user: result.user,
                token: result.token
            });
        } catch (error: any) {
            console.error('Signup error:', error);

            if (error.message === 'User with this email already exists') {
                res.status(409).json({ error: error.message });
                return;
            }

            res.status(500).json({ error: 'Failed to create account' });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            // Check validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    error: 'Validation failed',
                    details: errors.array()
                });
                return;
            }

            const { email, password } = req.body;

            const result = await AuthService.login({ email, password });

            res.json({
                message: 'Login successful',
                user: result.user,
                token: result.token
            });
        } catch (error: any) {
            console.error('Login error:', error);

            if (error.message === 'Invalid email or password') {
                res.status(401).json({ error: error.message });
                return;
            }

            res.status(500).json({ error: 'Login failed' });
        }
    }

    static async getProfile(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }

            const profile = await AuthService.getUserProfile(req.user.id);
            res.json({ user: profile });
        } catch (error: any) {
            console.error('Get profile error:', error);
            res.status(500).json({ error: 'Failed to get profile' });
        }
    }

    static async updateProfile(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }

            const updatedUser = await AuthService.updateProfile(req.user.id, req.body);
            res.json({
                message: 'Profile updated successfully',
                user: updatedUser
            });
        } catch (error: any) {
            console.error('Update profile error:', error);
            res.status(500).json({ error: 'Failed to update profile' });
        }
    }

    static async changePassword(req: AuthRequest, res: Response): Promise<void> {
        try {
            // Check validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    error: 'Validation failed',
                    details: errors.array()
                });
                return;
            }

            if (!req.user) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }

            const { currentPassword, newPassword } = req.body;

            const result = await AuthService.changePassword(
                req.user.id,
                currentPassword,
                newPassword
            );

            res.json(result);
        } catch (error: any) {
            console.error('Change password error:', error);

            if (error.message === 'Current password is incorrect') {
                res.status(400).json({ error: error.message });
                return;
            }

            res.status(500).json({ error: 'Failed to change password' });
        }
    }

    static async verifyToken(req: Request, res: Response): Promise<void> {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                res.status(401).json({ error: 'Token required' });
                return;
            }

            const user = await AuthService.verifyToken(token);
            res.json({ user, valid: true });
        } catch (error: any) {
            console.error('Verify token error:', error);
            res.status(401).json({ error: 'Invalid token', valid: false });
        }
    }

    static async logout(req: AuthRequest, res: Response): Promise<void> {
        try {
            // For JWT tokens, logout is handled client-side by removing the token
            // Here we could add token blacklisting if needed
            res.json({ message: 'Logged out successfully' });
        } catch (error: any) {
            console.error('Logout error:', error);
            res.status(500).json({ error: 'Logout failed' });
        }
    }
}