'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { savedProductsApi } from '../../services/api';
import '../account.css';

interface SavedProduct {
    id: string;
    userId: string;
    productId: string;
    createdAt: string;
    product: {
        id: string;
        name: string;
        price: number;
        description?: string;
        isActive: boolean;
        category?: {
            id: string;
            name: string;
        };
        brand?: {
            id: string;
            name: string;
        };
    };
}

const SavedProducts = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Redirect if not authenticated
    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/auth');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        const fetchSavedProducts = async () => {
            if (user) {
                try {
                    const response = await savedProductsApi.getUserSavedProducts();
                    setSavedProducts(response.savedProducts || []);
                } catch (error) {
                    console.error('Failed to fetch saved products:', error);
                    // Fallback to empty array on error
                    setSavedProducts([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchSavedProducts();
    }, [user]);

    const categories = ['all', ...Array.from(new Set(savedProducts.map(p => p.product.category?.name).filter(Boolean)))];

    const filteredProducts = savedProducts.filter(savedProduct => {
        const product = savedProduct.product;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.category?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category?.name === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleRemoveFromSaved = async (productId: string) => {
        try {
            await savedProductsApi.removeSavedProduct(productId);
            setSavedProducts(prev => prev.filter(p => p.productId !== productId));
        } catch (error) {
            console.error('Failed to remove saved product:', error);
            // You could add a toast notification here
        }
    };

    if (isLoading || loading) {
        return (
            <div className="page-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Loading saved products...</div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="page-container">
            <div className="page-content">
                {/* Header Section */}
                <div className="page-header">
                    <div className="header-content">
                        <div className="header-info">
                            <h1 className="page-title">Saved Products</h1>
                            <p className="page-subtitle">Your saved machinery and equipment for future reference</p>
                        </div>
                        <div className="header-actions">
                            <Link href="/shop">
                                <button className="btn btn-primary">Browse Products</button>
                            </Link>
                            <Link href="/account">
                                <button className="btn btn-outline">Back to Account</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="filter-section">
                    <div className="filter-grid">
                        <div className="filter-item">
                            <label className="form-label">Search Products</label>
                            <input
                                type="text"
                                placeholder="Enter product name or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="filter-item">
                            <label className="form-label">Filter by Category</label>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="form-input"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="products-grid">
                    {filteredProducts.map((savedProduct) => (
                        <div key={savedProduct.id} className="product-card">
                            <div className="product-image">
                                <div className="product-image-icon">🏭</div>
                                <div className="product-actions-overlay">
                                    <button
                                        onClick={() => handleRemoveFromSaved(savedProduct.productId)}
                                        className="remove-btn"
                                        title="Remove from saved"
                                    >
                                        <svg fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="product-status-overlay">
                                    {savedProduct.product.isActive ? (
                                        <span className="status-badge status-delivered">Available</span>
                                    ) : (
                                        <span className="status-badge status-cancelled">Unavailable</span>
                                    )}
                                </div>
                            </div>

                            <div className="product-info">
                                <div className="product-header">
                                    <h3 className="product-name">{savedProduct.product.name}</h3>
                                    <p className="product-category">
                                        {savedProduct.product.category?.name || 'Uncategorized'}
                                    </p>
                                </div>

                                <div className="product-pricing">
                                    <div className="product-price">
                                        ${Number(savedProduct.product.price).toLocaleString()}
                                    </div>
                                    <div className="product-saved-date">
                                        Saved on {new Date(savedProduct.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>

                                {savedProduct.product.description && (
                                    <div className="product-description">
                                        <p>{savedProduct.product.description}</p>
                                    </div>
                                )}

                                <div className="product-buttons">
                                    <Link href={`/shop/product/${savedProduct.productId}`}>
                                        <button className="btn btn-primary btn-sm">View Details</button>
                                    </Link>
                                    <button
                                        disabled={!savedProduct.product.isActive}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Quote
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-state-icon">❤️</div>
                        <h3 className="empty-state-title">No Saved Products</h3>
                        <p className="empty-state-description">
                            {searchTerm || categoryFilter !== 'all'
                                ? 'No products match your current filters. Try adjusting your search criteria.'
                                : "You haven't saved any products yet. Browse our catalog to save items for later reference and easy access."
                            }
                        </p>
                        <Link href="/shop">
                            <button className="btn btn-primary btn-lg">Browse Products</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedProducts;