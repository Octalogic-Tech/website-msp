'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    company?: string;
    phone?: string;
    jobTitle?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    website?: string;
    taxId?: string;
    preferredContact?: string;
    marketingEmails?: boolean;
    orderUpdates?: boolean;
    quoteNotifications?: boolean;
    isActive?: boolean;
    isVerified: boolean;
    createdAt?: string;
    updatedAt?: string;
    lastLoginAt?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => void;
    updateProfile: (data: any) => Promise<void>;
}

interface SignupData {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    company?: string;
    phone: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Demo user for when backend is unavailable
const createDemoUser = (signupData: SignupData): User => ({
    id: 'demo-user-' + Date.now(),
    email: signupData.email,
    firstName: signupData.firstName,
    lastName: signupData.lastName || '',
    company: signupData.company || '',
    phone: signupData.phone,
    isVerified: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedToken = localStorage.getItem('auth_token');
                const storedUser = localStorage.getItem('auth_user');

                if (storedToken && storedUser) {
                    // Try to verify with backend first
                    try {
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), 3000); // Shorter timeout

                        const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${storedToken}`,
                                'Content-Type': 'application/json',
                            },
                            signal: controller.signal,
                        });

                        clearTimeout(timeoutId);

                        if (response.ok) {
                            const data = await response.json();
                            setUser(data.user);
                            setToken(storedToken);
                            localStorage.setItem('auth_user', JSON.stringify(data.user));
                            console.log('🔐 Token verified with backend');
                        } else {
                            console.log('🔐 Token invalid, clearing stored auth');
                            localStorage.removeItem('auth_token');
                            localStorage.removeItem('auth_user');
                        }
                    } catch (error) {
                        if (error instanceof Error && error.name === 'AbortError') {
                            console.log('🔐 Token verification timed out, clearing stored auth');
                        } else {
                            console.log('🔐 Token verification failed, clearing stored auth:', error);
                        }
                        // Clear stored auth if verification fails
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('auth_user');
                    }
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            setUser(data.user);
            setToken(data.token);
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('auth_user', JSON.stringify(data.user));
            console.log('🔐 Login successful');
        } catch (error) {
            console.error('Login error:', error);
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Login request timed out. Please check your connection and try again.');
            } else if (error instanceof TypeError && error.message.includes('fetch')) {
                // Backend unavailable - check for demo credentials
                if (email === 'demo@constructpro.com' && password === 'demo123') {
                    console.log('🔐 Backend unavailable, using demo login');
                    const demoUser: User = {
                        id: 'demo-user-123',
                        email: 'demo@constructpro.com',
                        firstName: 'Demo',
                        lastName: 'User',
                        company: 'ConstructPro Demo',
                        isVerified: true,
                    };
                    const demoToken = 'demo-token-' + Date.now();

                    setUser(demoUser);
                    setToken(demoToken);
                    localStorage.setItem('auth_token', demoToken);
                    localStorage.setItem('auth_user', JSON.stringify(demoUser));
                    console.log('🔐 Demo login successful');
                    return; // Don't throw error, continue with demo user
                } else {
                    throw new Error('Unable to connect to server. For demo purposes, use: demo@constructpro.com / demo123');
                }
            }
            throw error;
        }
    };

    const signup = async (signupData: SignupData) => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            const data = await response.json();

            if (!response.ok) {
                // Handle validation errors with details
                if (data.error === 'Validation failed' && data.details) {
                    const errorMessages = data.details.map((detail: any) => detail.msg).join('. ');
                    throw new Error(errorMessages);
                }
                throw new Error(data.error || 'Signup failed');
            }

            setUser(data.user);
            setToken(data.token);
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('auth_user', JSON.stringify(data.user));
            console.log('🔐 Signup successful');
        } catch (error) {
            console.error('Signup error:', error);
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Signup request timed out. Please check your connection and try again.');
            } else if (error instanceof TypeError && error.message.includes('fetch')) {
                // Backend unavailable - create demo user for development
                console.log('🔐 Backend unavailable, creating demo user');
                const demoUser = createDemoUser(signupData);
                const demoToken = 'demo-token-' + Date.now();

                setUser(demoUser);
                setToken(demoToken);
                localStorage.setItem('auth_token', demoToken);
                localStorage.setItem('auth_user', JSON.stringify(demoUser));
                console.log('🔐 Demo signup successful');
                return; // Don't throw error, continue with demo user
            }
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        console.log('🔐 Logged out');
    };

    const updateProfile = async (profileData: any) => {
        try {
            if (!token) {
                throw new Error('No authentication token');
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(profileData),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Profile update failed');
            }

            setUser(data.user);
            localStorage.setItem('auth_user', JSON.stringify(data.user));
            console.log('🔐 Profile updated');
            return data.user;
        } catch (error) {
            console.error('Profile update error:', error);
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Profile update timed out. Please check your connection and try again.');
            } else if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new Error('Unable to connect to server. Please check your connection and try again.');
            }
            throw error;
        }
    };

    const value = {
        user,
        token,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}