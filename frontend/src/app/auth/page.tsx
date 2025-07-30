'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import './auth.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        company: '',
        phone: ''
    });

    const { login, signup } = useAuth();
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            return false;
        }

        if (!isLogin) {
            if (!formData.firstName) {
                setError('First name is required');
                return false;
            }
            if (!formData.phone) {
                setError('Mobile number is required');
                return false;
            }
            // Basic phone validation (at least 10 digits)
            const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(formData.phone)) {
                setError('Please enter a valid mobile number');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return false;
            }
            if (formData.password.length < 8) {
                setError('Password must be at least 8 characters long');
                return false;
            }
            // Check for uppercase, lowercase, and number
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
                setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setError('');

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await signup({
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    company: formData.company,
                    phone: formData.phone
                });
            }

            // Redirect to account page on success
            router.push('/account');
        } catch (err: unknown) {
            setError(err.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Industrial Background Pattern */}
            <div className="auth-background">
                <div className="grid-pattern"></div>
                <div className="industrial-overlay"></div>
            </div>

            <div className="auth-container">
                {/* Auth Card */}
                <div className="auth-card">
                    <div className="card-header">
                        <div className="header-accent"></div>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="auth-form">
                            {/* Error Message */}
                            {error && (
                                <div className="error-message">
                                    <span>⚠️</span>
                                    {error}
                                </div>
                            )}

                            {/* All Fields */}
                            <div className={`form-section ${!isLogin ? 'signup-layout' : ''}`}>
                                {!isLogin && (
                                    <>
                                        <div className="form-group">
                                            <label className="form-label">
                                                <span className="label-text">First Name</span>
                                                <span className="label-required">*</span>
                                            </label>
                                            <input
                                                name="firstName"
                                                type="text"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required={!isLogin}
                                                placeholder="Enter first name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                <span className="label-text">Last Name</span>
                                                <span className="label-optional">(Optional)</span>
                                            </label>
                                            <input
                                                name="lastName"
                                                type="text"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                placeholder="Enter last name (optional)"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                <span className="label-text">Mobile Number</span>
                                                <span className="label-required">*</span>
                                            </label>
                                            <input
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required={!isLogin}
                                                placeholder="Enter mobile number"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                <span className="label-text">Company Name</span>
                                                <span className="label-optional">(Optional)</span>
                                            </label>
                                            <input
                                                name="company"
                                                type="text"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                placeholder="Enter company name (optional)"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                <span className="label-text">Email Address</span>
                                                <span className="label-required">*</span>
                                            </label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                <span className="label-text">Password</span>
                                                <span className="label-required">*</span>
                                            </label>
                                            <input
                                                name="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required
                                                placeholder="Enter your password"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                <span className="label-text">Confirm Password</span>
                                                <span className="label-required">*</span>
                                            </label>
                                            <input
                                                name="confirmPassword"
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required={!isLogin}
                                                placeholder="Confirm your password"
                                            />
                                        </div>
                                    </>
                                )}

                                {isLogin && (
                                    <>
                                        <div className="form-group">
                                            <label className="form-label">
                                                <span className="label-text">Email Address</span>
                                                <span className="label-required">*</span>
                                            </label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">
                                                <span className="label-text">Password</span>
                                                <span className="label-required">*</span>
                                            </label>
                                            <input
                                                name="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required
                                                placeholder="Enter your password"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="auth-button" disabled={isLoading}>
                                <span className="button-text">
                                    {isLoading
                                        ? (isLogin ? 'Signing In...' : 'Creating Account...')
                                        : (isLogin ? 'Sign In' : 'Create Account')
                                    }
                                </span>
                                <div className="button-shine"></div>
                            </button>
                        </form>

                        {/* Forgot Password Link */}
                        {isLogin && (
                            <div className="forgot-password">
                                <a href="#" className="forgot-link">
                                    Forgot your password?
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Card Footer */}
                    <div className="card-footer">
                        <div className="footer-divider"></div>
                        <p className="toggle-text">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="toggle-button"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Terms Notice */}
                <div className="terms-notice">
                    <p>
                        By continuing, you agree to our{' '}
                        <a href="#" className="terms-link">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="terms-link">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;