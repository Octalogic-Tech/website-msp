'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { savedProductsApi, ordersApi, quotesApi } from '../services/api';
import Link from 'next/link';
import './account.css';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    dateOfBirth: {
        day: string;
        month: string;
        year: string;
    };
    gender: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const MyAccountPage = () => {
    const { user, isLoading, updateProfile, logout } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        dateOfBirth: {
            day: '',
            month: '',
            year: ''
        },
        gender: 'Male',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [dashboardData, setDashboardData] = useState({
        savedProducts: [],
        recentOrders: [],
        recentQuotes: [],
        stats: {
            totalOrders: 0,
            totalSpent: 0,
            pendingQuotes: 0,
            savedProductsCount: 0
        }
    });
    const [dashboardLoading, setDashboardLoading] = useState(true);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/auth');
        }
    }, [user, isLoading, router]);

    // Initialize form data from user
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                company: user.company || '',
                address: user.address || '',
                city: user.city || '',
                state: user.state || '',
                zipCode: user.zipCode || '',
                country: user.country || '',
            }));
        }
    }, [user]);

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            if (user && activeSection === 'dashboard') {
                setDashboardLoading(true);
                try {
                    const [savedProductsRes, ordersRes, quotesRes] = await Promise.allSettled([
                        savedProductsApi.getUserSavedProducts(),
                        ordersApi.getUserOrders(),
                        quotesApi.getUserQuoteRequests()
                    ]);

                    const savedProducts = savedProductsRes.status === 'fulfilled' ? savedProductsRes.value.savedProducts || [] : [];
                    const orders = ordersRes.status === 'fulfilled' ? ordersRes.value.orders || [] : [];
                    const quotes = quotesRes.status === 'fulfilled' ? quotesRes.value.data || [] : [];

                    // Calculate stats
                    const totalSpent = orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
                    const pendingQuotes = quotes.filter(quote => quote.status === 'PENDING' || quote.status === 'REVIEWED').length;

                    setDashboardData({
                        savedProducts: savedProducts.slice(0, 3), // Show only first 3
                        recentOrders: orders.slice(0, 3), // Show only first 3
                        recentQuotes: quotes.slice(0, 3), // Show only first 3
                        stats: {
                            totalOrders: orders.length,
                            totalSpent,
                            pendingQuotes,
                            savedProductsCount: savedProducts.length
                        }
                    });
                } catch (error) {
                    console.error('Failed to fetch dashboard data:', error);
                } finally {
                    setDashboardLoading(false);
                }
            }
        };

        fetchDashboardData();
    }, [user, activeSection]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('dateOfBirth.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                dateOfBirth: {
                    ...prev.dateOfBirth,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Validate passwords if changing
            if (formData.newPassword) {
                if (formData.newPassword !== formData.confirmPassword) {
                    throw new Error('New passwords do not match');
                }
                if (formData.newPassword.length < 6) {
                    throw new Error('New password must be at least 6 characters');
                }
                if (!formData.currentPassword) {
                    throw new Error('Current password is required to change password');
                }
            }

            // Prepare update data
            const updateData: unknown = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: formData.country,
            };

            // Add password change if provided
            if (formData.newPassword) {
                updateData.currentPassword = formData.currentPassword;
                updateData.newPassword = formData.newPassword;
            }

            await updateProfile(updateData);
            setMessage('Profile updated successfully!');

            // Clear password fields
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
        } catch (error) {
            console.error('Failed to update profile:', error);
            setMessage(error instanceof Error ? error.message : 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                company: user.company || '',
                address: user.address || '',
                city: user.city || '',
                state: user.state || '',
                zipCode: user.zipCode || '',
                country: user.country || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
        }
        setMessage('');
    };

    const navigateToSection = (section: string) => {
        switch (section) {
            case 'dashboard':
                setActiveSection('dashboard');
                break;
            case 'account':
                setActiveSection('account');
                break;
            case 'saved':
                router.push('/account/saved');
                break;
            case 'orders':
                router.push('/account/orders');
                break;
            case 'quotes':
                router.push('/account/quotes');
                break;
            case 'settings':
                setActiveSection('settings');
                break;
            default:
                setActiveSection('dashboard');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                        <Link href="/" className="hover:text-orange-500 transition-colors">
                            <span>🏠 Home</span>
                        </Link>
                        <span className="mx-2">›</span>
                        <span className="text-gray-900 font-medium">My Account</span>
                    </div>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Menu</h2>
                                <nav className="space-y-2">
                                    <button
                                        onClick={() => navigateToSection('dashboard')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${activeSection === 'dashboard'
                                            ? 'bg-orange-50 text-orange-700 border border-orange-200'
                                            : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        style={activeSection === 'dashboard' ? { backgroundColor: '#fef3c7', color: '#f9a825', borderColor: '#f9a825' } : {}}
                                    >
                                        <span className="text-lg">📊</span>
                                        <span className={`text-sm ${activeSection === 'dashboard' ? 'font-semibold' : 'font-medium'}`}>Dashboard</span>
                                    </button>
                                    <Link
                                        href="/account/profile"
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
                                    >
                                        <span className="text-lg">👤</span>
                                        <span className="text-sm font-medium">Profile Settings</span>
                                    </Link>
                                    <button
                                        onClick={() => navigateToSection('saved')}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <span className="text-lg">❤️</span>
                                        <span className="text-sm font-medium">Saved Products</span>
                                    </button>
                                    <button
                                        onClick={() => navigateToSection('orders')}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <span className="text-lg">📦</span>
                                        <span className="text-sm font-medium">Order History</span>
                                    </button>
                                    <button
                                        onClick={() => navigateToSection('quotes')}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <span className="text-lg">💼</span>
                                        <span className="text-sm font-medium">Quote Requests</span>
                                    </button>
                                    <button
                                        onClick={() => navigateToSection('settings')}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <span className="text-lg">⚙️</span>
                                        <span className="text-sm font-medium">Settings</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm('Are you sure you want to logout?')) {
                                                logout();
                                                router.push('/');
                                            }
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-700 hover:bg-red-50 rounded-lg transition-colors border-t border-gray-200 mt-2 pt-4"
                                    >
                                        <span className="text-lg">🚪</span>
                                        <span className="text-sm font-medium">Logout</span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm border">
                            <div className="p-6">
                                {/* Page Title */}
                                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                                    {activeSection === 'dashboard' ? 'Dashboard' : 'My Account'}
                                </h1>

                                {/* Success/Error Message */}
                                {message && (
                                    <div className={`mb-6 p-4 rounded-md ${message.includes('successfully')
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : 'bg-red-50 text-red-700 border border-red-200'
                                        }`}>
                                        {message}
                                    </div>
                                )}

                                {/* Profile Section */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">
                                                {user.firstName ? user.firstName.charAt(0).toUpperCase() : '👤'}
                                            </span>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900">
                                                {user.firstName} {user.lastName}
                                            </h2>
                                            {activeSection === 'account' && (
                                                <button className="text-blue-600 text-sm hover:underline">
                                                    Edit display image
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Dashboard Content */}
                                {activeSection === 'dashboard' && (
                                    <div className="space-y-8">
                                        {dashboardLoading ? (
                                            <div className="flex items-center justify-center py-12">
                                                <div className="text-lg">Loading dashboard...</div>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Stats Cards */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 hover:shadow-lg transition-shadow">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <p className="text-orange-600 text-sm font-medium">Total Orders</p>
                                                                <p className="text-2xl font-bold text-orange-900">{dashboardData.stats.totalOrders}</p>
                                                            </div>
                                                            <span className="text-2xl">📦</span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-green-50 p-6 rounded-lg border border-green-200 hover:shadow-lg transition-shadow">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <p className="text-green-600 text-sm font-medium">Total Spent</p>
                                                                <p className="text-2xl font-bold text-green-900">
                                                                    ${dashboardData.stats.totalSpent.toLocaleString()}
                                                                </p>
                                                            </div>
                                                            <span className="text-2xl">💰</span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 hover:shadow-lg transition-shadow">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <p className="text-amber-600 text-sm font-medium">Pending Quotes</p>
                                                                <p className="text-2xl font-bold text-amber-900">{dashboardData.stats.pendingQuotes}</p>
                                                            </div>
                                                            <span className="text-2xl">💼</span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-rose-50 p-6 rounded-lg border border-rose-200 hover:shadow-lg transition-shadow">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <p className="text-rose-600 text-sm font-medium">Saved Products</p>
                                                                <p className="text-2xl font-bold text-rose-900">{dashboardData.stats.savedProductsCount}</p>
                                                            </div>
                                                            <span className="text-2xl">❤️</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Recent Activity Sections */}
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                    {/* Recent Saved Products */}
                                                    <div className="bg-white border rounded-lg p-6">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                                                <span>❤️</span>
                                                                Recent Saved Products
                                                            </h3>
                                                            <Link href="/account/saved" className="text-blue-600 text-sm hover:underline">
                                                                View All
                                                            </Link>
                                                        </div>
                                                        {dashboardData.savedProducts.length > 0 ? (
                                                            <div className="space-y-3">
                                                                {dashboardData.savedProducts.map((savedProduct) => (
                                                                    <div key={savedProduct.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                                                            <span className="text-sm">🏭</span>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                                {savedProduct.product.name}
                                                                            </p>
                                                                            <p className="text-xs text-gray-500">
                                                                                ${Number(savedProduct.product.price).toLocaleString()}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-gray-500 text-sm">No saved products yet</p>
                                                        )}
                                                    </div>

                                                    {/* Recent Orders */}
                                                    <div className="bg-white border rounded-lg p-6">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                                                <span>📦</span>
                                                                Recent Orders
                                                            </h3>
                                                            <Link href="/account/orders" className="text-blue-600 text-sm hover:underline">
                                                                View All
                                                            </Link>
                                                        </div>
                                                        {dashboardData.recentOrders.length > 0 ? (
                                                            <div className="space-y-3">
                                                                {dashboardData.recentOrders.map((order) => (
                                                                    <div key={order.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                                            <span className="text-sm">📦</span>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-sm font-medium text-gray-900">
                                                                                {order.orderNumber}
                                                                            </p>
                                                                            <p className="text-xs text-gray-500">
                                                                                ${Number(order.totalAmount).toLocaleString()} • {order.status}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-gray-500 text-sm">No orders yet</p>
                                                        )}
                                                    </div>

                                                    {/* Recent Quotes */}
                                                    <div className="bg-white border rounded-lg p-6">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                                                <span>💼</span>
                                                                Recent Quotes
                                                            </h3>
                                                            <Link href="/account/quotes" className="text-blue-600 text-sm hover:underline">
                                                                View All
                                                            </Link>
                                                        </div>
                                                        {dashboardData.recentQuotes.length > 0 ? (
                                                            <div className="space-y-3">
                                                                {dashboardData.recentQuotes.map((quote) => (
                                                                    <div key={quote.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                                                            <span className="text-sm">💼</span>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-sm font-medium text-gray-900">
                                                                                Quote #{quote.id}
                                                                            </p>
                                                                            <p className="text-xs text-gray-500">
                                                                                {quote.totalAmount ? `$${Number(quote.totalAmount).toLocaleString()}` : 'Pending'} • {quote.status}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-gray-500 text-sm">No quotes yet</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* Account Form */}
                                {activeSection === 'account' && (
                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-6">
                                            {/* Two Column Layout */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        First Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Date of Birth
                                                    </label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            name="dateOfBirth.day"
                                                            value={formData.dateOfBirth.day}
                                                            onChange={handleInputChange}
                                                            placeholder="DD"
                                                            maxLength={2}
                                                            className="w-16 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="dateOfBirth.month"
                                                            value={formData.dateOfBirth.month}
                                                            onChange={handleInputChange}
                                                            placeholder="MM"
                                                            maxLength={2}
                                                            className="w-16 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="dateOfBirth.year"
                                                            value={formData.dateOfBirth.year}
                                                            onChange={handleInputChange}
                                                            placeholder="YYYY"
                                                            maxLength={4}
                                                            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Gender
                                                    </label>
                                                    <select
                                                        name="gender"
                                                        value={formData.gender}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Contact
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Company
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="company"
                                                        value={formData.company}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        State
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>

                                            {/* Password Change Section */}
                                            <div className="pt-6 border-t">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Current Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            name="currentPassword"
                                                            value={formData.currentPassword}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter current password"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        />
                                                    </div>
                                                    <div></div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            New Password
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type={showPassword ? "text" : "password"}
                                                                name="newPassword"
                                                                value={formData.newPassword}
                                                                onChange={handleInputChange}
                                                                placeholder="Enter new password"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                                            >
                                                                {showPassword ? '🙈' : '👁️'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Confirm New Password
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type={showConfirmPassword ? "text" : "password"}
                                                                name="confirmPassword"
                                                                value={formData.confirmPassword}
                                                                onChange={handleInputChange}
                                                                placeholder="Confirm new password"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                                            >
                                                                {showConfirmPassword ? '🙈' : '👁️'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                disabled={loading}
                                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                                            >
                                                {loading ? 'Saving...' : 'Save Changes'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccountPage;