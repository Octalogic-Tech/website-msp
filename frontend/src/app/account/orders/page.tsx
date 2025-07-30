'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ordersApi } from '../../services/api';
import '../account.css';

interface Order {
    id: string;
    orderNumber: string;
    status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    totalAmount: number;
    trackingNumber?: string;
    createdAt: string;
    updatedAt: string;
    shippedAt?: string;
    deliveredAt?: string;
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

const OrderHistory = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
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
        const fetchOrders = async () => {
            if (user) {
                try {
                    const response = await ordersApi.getUserOrders();
                    setOrders(response.orders || []);
                } catch (error) {
                    console.error('Failed to fetch orders:', error);
                    // Fallback to empty array on error
                    setOrders([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchOrders();
    }, [user]);

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            PENDING: { className: 'status-badge status-pending', text: 'Pending' },
            PROCESSING: { className: 'status-badge status-processing', text: 'Processing' },
            SHIPPED: { className: 'status-badge status-shipped', text: 'Shipped' },
            DELIVERED: { className: 'status-badge status-delivered', text: 'Delivered' },
            CANCELLED: { className: 'status-badge status-cancelled', text: 'Cancelled' }
        };

        const config = statusConfig[status as keyof typeof statusConfig];
        return (
            <span className={config.className}>
                {config.text}
            </span>
        );
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (isLoading || loading) {
        return (
            <div className="page-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Loading orders...</div>
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
                            <h1 className="page-title">Order History</h1>
                            <p className="page-subtitle">Track and manage your machinery orders</p>
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
                            <label className="form-label">Search Orders</label>
                            <input
                                type="text"
                                placeholder="Enter order number..."
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
                                <option value="all">All Orders</option>
                                <option value="PENDING">Pending</option>
                                <option value="PROCESSING">Processing</option>
                                <option value="SHIPPED">Shipped</option>
                                <option value="DELIVERED">Delivered</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="orders-list">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="order-card">
                            <div className="order-content">
                                <div className="order-main">
                                    <div className="order-header">
                                        <h3 className="order-title">Order #{order.orderNumber}</h3>
                                        {getStatusBadge(order.status)}
                                    </div>

                                    <div className="order-info-grid">
                                        <div className="info-card">
                                            <div className="info-card-label">Order Date</div>
                                            <div className="info-card-value">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                        <div className="info-card">
                                            <div className="info-card-label">Items</div>
                                            <div className="info-card-value">{order.items.length} item(s)</div>
                                        </div>
                                        <div className="info-card">
                                            <div className="info-card-label">Total Amount</div>
                                            <div className="info-card-value order-amount">
                                                ${Number(order.totalAmount).toLocaleString()}
                                            </div>
                                        </div>
                                        {order.trackingNumber && (
                                            <div className="info-card">
                                                <div className="info-card-label">Tracking</div>
                                                <div className="info-card-value tracking-number">
                                                    {order.trackingNumber}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Order Items */}
                                    <div className="order-items-section">
                                        <h4 className="section-title">Order Items</h4>
                                        <div className="order-items">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="order-item">
                                                    <div className="item-info">
                                                        <span className="item-name">{item.product.name}</span>
                                                        <span className="item-quantity">× {item.quantity}</span>
                                                    </div>
                                                    <div className="item-price">
                                                        ${Number(item.unitPrice * item.quantity).toLocaleString()}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="order-actions">
                                    <button className="btn btn-outline btn-sm">View Details</button>
                                    {order.status === 'DELIVERED' && (
                                        <button className="btn btn-outline btn-sm">Reorder</button>
                                    )}
                                    {order.trackingNumber && (
                                        <button className="btn btn-primary btn-sm">Track Package</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredOrders.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-state-icon">📦</div>
                        <h3 className="empty-state-title">No Orders Found</h3>
                        <p className="empty-state-description">
                            {searchTerm || statusFilter !== 'all'
                                ? 'No orders match your current filters. Try adjusting your search criteria.'
                                : "You haven't placed any orders yet. Browse our catalog to find the perfect machinery for your needs."
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

export default OrderHistory;