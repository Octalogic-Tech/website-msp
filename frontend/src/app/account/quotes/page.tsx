'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { quotesApi } from '../../services/api';
import '../account.css';

interface Quote {
    id: string;
    status: 'PENDING' | 'REVIEWED' | 'QUOTED' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED';
    totalAmount?: number;
    validUntil?: string;
    message?: string;
    createdAt: string;
    updatedAt: string;
    items: Array<{
        id: string;
        quantity: number;
        unitPrice: number;
        product: {
            id: string;
            name: string;
            price: number;
        };
    }>;
}

const QuoteRequests = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Redirect if not authenticated
    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/auth');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        const fetchQuotes = async () => {
            if (user) {
                try {
                    const response = await quotesApi.getUserQuoteRequests();
                    setQuotes(response.data || []);
                } catch (error) {
                    console.error('Failed to fetch quotes:', error);
                    // Fallback to empty array on error
                    setQuotes([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchQuotes();
    }, [user]);

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            PENDING: { className: 'status-badge status-pending', text: 'Pending Review' },
            REVIEWED: { className: 'status-badge status-processing', text: 'Under Review' },
            QUOTED: { className: 'status-badge status-shipped', text: 'Quote Ready' },
            ACCEPTED: { className: 'status-badge status-delivered', text: 'Accepted' },
            DECLINED: { className: 'status-badge status-cancelled', text: 'Declined' },
            EXPIRED: { className: 'status-badge', text: 'Expired' }
        };

        const config = statusConfig[status as keyof typeof statusConfig];
        return (
            <span className={config.className}>
                {config.text}
            </span>
        );
    };

    const filteredQuotes = quotes.filter(quote => {
        const matchesSearch = quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.items.some(item => item.product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getMainProductName = (quote: Quote) => {
        if (quote.items.length === 1) {
            return quote.items[0].product.name;
        }
        return `${quote.items.length} items`;
    };

    const getTotalQuantity = (quote: Quote) => {
        return quote.items.reduce((total, item) => total + item.quantity, 0);
    };

    if (isLoading || loading) {
        return (
            <div className="page-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Loading quotes...</div>
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
                            <h1 className="page-title">Quote Requests</h1>
                            <p className="page-subtitle">Manage your machinery quote requests and responses</p>
                        </div>
                        <div className="header-actions">
                            <Link href="/shop">
                                <button className="btn btn-primary">Request New Quote</button>
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
                            <label className="form-label">Search Quotes</label>
                            <input
                                type="text"
                                placeholder="Enter quote number or product name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="filter-item">
                            <label className="form-label">Filter by Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="form-input"
                            >
                                <option value="all">All Quotes</option>
                                <option value="PENDING">Pending</option>
                                <option value="REVIEWED">Under Review</option>
                                <option value="QUOTED">Quote Ready</option>
                                <option value="ACCEPTED">Accepted</option>
                                <option value="DECLINED">Declined</option>
                                <option value="EXPIRED">Expired</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Quotes List */}
                <div className="quotes-list">
                    {filteredQuotes.map((quote) => (
                        <div key={quote.id} className="quote-card">
                            <div className="quote-content">
                                <div className="quote-main">
                                    <div className="quote-header">
                                        <h3 className="quote-title">Quote #{quote.id}</h3>
                                        {getStatusBadge(quote.status)}
                                    </div>

                                    <div className="quote-product-info">
                                        <h4 className="quote-product-name">{getMainProductName(quote)}</h4>
                                        <p className="quote-product-details">
                                            Total Quantity: {getTotalQuantity(quote)} unit(s)
                                        </p>
                                    </div>

                                    <div className="quote-info-grid">
                                        <div className="info-card">
                                            <div className="info-card-label">Request Date</div>
                                            <div className="info-card-value">
                                                {new Date(quote.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                        {quote.totalAmount && (
                                            <div className="info-card">
                                                <div className="info-card-label">Quote Value</div>
                                                <div className="info-card-value order-amount">
                                                    ${Number(quote.totalAmount).toLocaleString()}
                                                </div>
                                            </div>
                                        )}
                                        {quote.validUntil && (
                                            <div className="info-card">
                                                <div className="info-card-label">Valid Until</div>
                                                <div className="info-card-value">
                                                    {new Date(quote.validUntil).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Quote Items */}
                                    <div className="quote-items-section">
                                        <h4 className="section-title">Requested Items</h4>
                                        <div className="quote-items">
                                            {quote.items.map((item) => (
                                                <div key={item.id} className="quote-item">
                                                    <div className="item-info">
                                                        <span className="item-name">{item.product.name}</span>
                                                        <span className="item-quantity">× {item.quantity}</span>
                                                    </div>
                                                    {item.unitPrice > 0 && (
                                                        <div className="item-price">
                                                            ${Number(item.unitPrice * item.quantity).toLocaleString()}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {quote.message && (
                                        <div className="quote-notes">
                                            <div className="quote-notes-title">Notes</div>
                                            <div className="quote-notes-content">{quote.message}</div>
                                        </div>
                                    )}
                                </div>

                                <div className="quote-actions">
                                    <button className="btn btn-outline btn-sm">View Details</button>
                                    {quote.status === 'QUOTED' && (
                                        <>
                                            <button className="btn btn-success btn-sm">Accept Quote</button>
                                            <button className="btn btn-outline btn-sm">Decline Quote</button>
                                        </>
                                    )}
                                    {quote.status === 'PENDING' && (
                                        <button className="btn btn-outline btn-sm">Edit Request</button>
                                    )}
                                    {quote.status === 'ACCEPTED' && (
                                        <button className="btn btn-primary btn-sm">Place Order</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredQuotes.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-state-icon">💼</div>
                        <h3 className="empty-state-title">No Quote Requests Found</h3>
                        <p className="empty-state-description">
                            {searchTerm || statusFilter !== 'all'
                                ? 'No quotes match your current filters. Try adjusting your search criteria.'
                                : "You haven't requested any quotes yet. Browse our catalog and request quotes for the machinery you need."
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

export default QuoteRequests;