'use client';

import React from 'react';
import { useCart } from '../components/shop/CartContext';
import { useQuote } from '../components/shop/QuoteContext';
import { useToast } from '../components/shop/ToastContext';
import Link from 'next/link';

export default function TestCartQuotePage() {
    const { items: cartItems, addItem: addToCart, itemCount: cartCount } = useCart();
    const { items: quoteItems, addItem: addToQuote, itemCount: quoteCount, submittedQuotes } = useQuote();
    const { showToast } = useToast();

    const testProduct = {
        id: 'test-product-123',
        name: 'Test Hydraulic Excavator',
        price: '50000',
        quantity: 1,
        image: '/test-image.jpg'
    };

    const handleAddToCart = async () => {
        const success = await addToCart(testProduct);
        if (success) {
            showToast(`${testProduct.name} added to cart!`, 'success');
        } else {
            showToast('Failed to add to cart', 'error');
        }
    };

    const handleAddToQuote = async () => {
        const success = await addToQuote(testProduct);
        if (success) {
            showToast(`${testProduct.name} added to quote!`, 'success');
        } else {
            showToast('Failed to add to quote', 'error');
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Cart & Quote Test Page</h1>

            <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h2>Test Product</h2>
                <p><strong>Name:</strong> {testProduct.name}</p>
                <p><strong>Price:</strong> ${parseInt(testProduct.price).toLocaleString()}</p>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        onClick={handleAddToCart}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Add to Cart
                    </button>

                    <button
                        onClick={handleAddToQuote}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Request Quote
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3>Cart Items ({cartCount})</h3>
                    <Link href="/cart" style={{ color: '#007bff', textDecoration: 'underline' }}>
                        → Go to Cart Page
                    </Link>
                    {cartItems.length === 0 ? (
                        <p>No items in cart</p>
                    ) : (
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index}>
                                    {item.name} - Qty: {item.quantity} - ${parseInt(item.price).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3>Quote Items ({quoteCount})</h3>
                    <Link href="/quote-cart" style={{ color: '#007bff', textDecoration: 'underline' }}>
                        → Go to Quote Cart
                    </Link>
                    {quoteItems.length === 0 ? (
                        <p>No items in quote</p>
                    ) : (
                        <ul>
                            {quoteItems.map((item, index) => (
                                <li key={index}>
                                    {item.name} - Qty: {item.quantity} - ${parseInt(item.price).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Submitted Quotes ({submittedQuotes.length})</h3>
                <Link href="/account/quotes" style={{ color: '#007bff', textDecoration: 'underline' }}>
                    → Go to Quote History
                </Link>
                {submittedQuotes.length === 0 ? (
                    <p>No submitted quotes</p>
                ) : (
                    <ul>
                        {submittedQuotes.map((quote) => (
                            <li key={quote.id}>
                                Quote #{quote.id.substring(0, 8)}... - Status: {quote.status} - Items: {quote.items.length}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3>Navigation Links</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link href="/cart" style={{ color: '#007bff', textDecoration: 'underline' }}>Cart Page</Link>
                    <Link href="/quote-cart" style={{ color: '#007bff', textDecoration: 'underline' }}>Quote Cart</Link>
                    <Link href="/account/quotes" style={{ color: '#007bff', textDecoration: 'underline' }}>Quote History</Link>
                    <Link href="/shop" style={{ color: '#007bff', textDecoration: 'underline' }}>Shop</Link>
                </div>
            </div>
        </div>
    );
}