"use client";

import React, { useEffect, useState } from 'react';
import { useCart } from '../../../components/shop/CartContext';
import { useQuote } from '../../../components/shop/QuoteContext';
import { useToast } from '../../../components/shop/ToastContext';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import '../../shop.css';
import './product-detail.css';
import ProductCard from '@/app/components/shop/ProductCard';


type Product = {
    id: string;
    name: string;
    slug: string;
    price: string;
    images?: string[];
    description?: string;
    category?: { name: string; slug: string };
    brand?: { name: string; slug: string };
    condition: number;
    specs?: Record<string, string | number | string[]>;
    documents?: { name: string; url: string }[];
    stockQty?: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";

export default function ProductPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
    const { showToast } = useToast();

    const { addItem: addToCart, isLoading: isCartLoading } = useCart();
    const { addItem: addToQuote, isLoading: isQuoteLoading } = useQuote();

    // Image helper functions
    const getImageUrl = (image: string) => {
        return image.startsWith('http') ? image : `${API_BASE.replace('/api', '')}${image}`;
    };

    const handleImageError = (index: number) => {
        setImageError(prev => ({ ...prev, [index]: true }));
    };

    const nextImage = () => {
        if (product?.images && product.images.length > 1) {
            setSelectedImage((prev) => (prev + 1) % product.images!.length);
        }
    };

    const prevImage = () => {
        if (product?.images && product.images.length > 1) {
            setSelectedImage((prev) => (prev - 1 + product.images!.length) % product.images!.length);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (!params.slug) return;
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${API_BASE}/products/${params.slug}`);
                const data = await res.json();
                if (data.success) {
                    const fetchedProduct = data.data;
                    setProduct(fetchedProduct);
                    // Fetch related products
                    if (fetchedProduct.category?.slug) {
                        const relatedRes = await fetch(
                            `${API_BASE}/products?category=${fetchedProduct.category.slug}&limit=5`
                        );
                        const relatedData = await relatedRes.json();
                        if (relatedData.success) {
                            setRelatedProducts(
                                relatedData.data.filter((p: Product) => p.id !== fetchedProduct.id).slice(0, 4)
                            );
                        }
                    }
                } else {
                    setError(data.error || "Failed to fetch product.");
                }
            } catch (err) {
                setError("Network error. Please try again later.");
                console.error("Failed to fetch product:", err);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [params.slug]);

    const handleAddToCart = async () => {
        if (product) {
            try {
                const success = await addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.images?.[0]
                });

                if (success) {
                    showToast(`✅ ${product.name} added to cart`, 'success');
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
                showToast("❌ Failed to add item to cart", 'error');
            }
        }
    };

    const handleAddToQuote = async () => {
        if (product) {
            try {
                const success = await addToQuote({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.images?.[0]
                });

                if (success) {
                    showToast(`✅ ${product.name} added to quote`, 'success');
                }
            } catch (error) {
                console.error("Error adding to quote:", error);
                showToast("❌ Failed to add item to quote", 'error');
            }
        }
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loading-spinner-large"></div>
        </div>
    );

    if (error) return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-title">⚠️ {error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="retry-button"
                >
                    Try Again
                </button>
            </div>
        </div>
    );

    if (!product) return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="not-found-title">Product not found</div>
                <a href="/shop" className="back-link">← Back to Shop</a>
            </div>
        </div>
    );

    const isOutOfStock = product.stockQty !== undefined && product.stockQty <= 0;

    return (
        <div className="product-detail-container">
            {/* Breadcrumb */}
            <div className="breadcrumb-container">
                <div className="breadcrumb-wrapper">
                    <nav className="breadcrumb-nav">
                        <a href="/shop">Shop</a>
                        <span>›</span>
                        {product.category && (
                            <>
                                <a href={`/shop/${product.category.slug}`}>
                                    {product.category.name}
                                </a>
                                <span>›</span>
                            </>
                        )}
                        <span className="breadcrumb-current">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="product-main-wrapper">
                {/* Main Product Section */}
                <div className="product-main-card">
                    <div className="product-main-grid">
                        {/* Left Section - Product Images */}
                        <div className="product-images-section">
                            {/* Main Image Display */}
                            <div className="main-image-container">
                                <div className="main-image-wrapper">
                                    {product.images && product.images.length > 0 && !imageError[selectedImage] ? (
                                        <div className="main-image-wrapper">
                                            <Zoom>
                                                <Image
                                                    src={getImageUrl(product.images[selectedImage])}
                                                    alt={product.name}
                                                    fill
                                                    className="main-image"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    priority
                                                />
                                            </Zoom>

                                            {/* Navigation Arrows */}
                                            {product.images.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={prevImage}
                                                        className="image-nav-button prev"
                                                        aria-label="Previous image"
                                                    >
                                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={nextImage}
                                                        className="image-nav-button next"
                                                        aria-label="Next image"
                                                    >
                                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </>
                                            )}

                                            {/* Zoom Indicator */}
                                            <div className="zoom-indicator">
                                                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                </svg>
                                                <span>Click to zoom</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="no-image-placeholder">
                                            <div>
                                                <div className="no-image-icon">
                                                    <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <p>No Image Available</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail Strip */}
                            {product.images && product.images.length > 1 && (
                                <div className="thumbnail-strip">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`thumbnail-button ${selectedImage === index ? 'active' : ''}`}
                                            aria-label={`View image ${index + 1}`}
                                        >
                                            {!imageError[index] ? (
                                                <Image
                                                    src={getImageUrl(image)}
                                                    alt={`${product.name} - Thumbnail ${index + 1}`}
                                                    width={64}
                                                    height={64}
                                                    className="thumbnail-image"
                                                    onError={() => handleImageError(index)}
                                                />
                                            ) : (
                                                <div className="thumbnail-placeholder">
                                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Section - Product Info */}
                        <div className="product-info-section">
                            {/* Brand */}
                            {product.brand && (
                                <div className="product-brand">
                                    {product.brand.name}
                                </div>
                            )}

                            {/* Product Name */}
                            <h1 className="product-title">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="product-price-section">
                                <span className="product-price">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
                                        .format(parseInt(product.price))}
                                </span>
                                <span className="price-unit">per unit</span>
                            </div>

                            {/* Stock Status & Location */}
                            <div className="product-status-section">
                                {product.stockQty !== undefined && (
                                    product.stockQty === 0 ? (
                                        <span className="status-badge out-of-stock">
                                            <span className="status-dot red"></span>
                                            Out of Stock
                                        </span>
                                    ) : product.stockQty < 5 ? (
                                        <span className="status-badge low-stock">
                                            <span className="status-dot yellow"></span>
                                            Low Stock ({product.stockQty} left)
                                        </span>
                                    ) : (
                                        <span className="status-badge in-stock">
                                            <span className="status-dot green"></span>
                                            In Stock
                                        </span>
                                    )
                                )}
                                <span className="location-info">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Available Nationwide
                                </span>
                            </div>

                            {/* Key Highlights */}
                            {product.description && (
                                <div className="product-highlights">
                                    <h3 className="highlights-title">Product Highlights</h3>
                                    <p className="highlights-text">{product.description}</p>
                                </div>
                            )}

                            {/* Key Specifications Preview */}
                            {product.specs && Object.keys(product.specs).length > 0 && (
                                <div className="key-specs-section">
                                    <h3 className="key-specs-title">Key Specifications</h3>
                                    <div className="key-specs-list">
                                        {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                                            <div key={key} className="key-spec-item">
                                                <span className="spec-label">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </span>
                                                <span className="spec-value">
                                                    {Array.isArray(value) ? value.join(', ') : String(value)}
                                                </span>
                                            </div>
                                        ))}
                                        {Object.keys(product.specs).length > 4 && (
                                            <div className="more-specs">
                                                +{Object.keys(product.specs).length - 4} more specifications
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="action-buttons-section">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isOutOfStock || isCartLoading}
                                    className={`primary-action-btn add-to-cart ${isOutOfStock ? 'disabled' : ''}`}
                                >
                                    {isOutOfStock ? (
                                        <>
                                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Out of Stock
                                        </>
                                    ) : isCartLoading ? (
                                        <>
                                            <div className="loading-spinner"></div>
                                            Adding to Cart...
                                        </>
                                    ) : (
                                        <>
                                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                            </svg>
                                            Add to Cart
                                        </>
                                    )}
                                </button>

                                <div className="secondary-actions">
                                    <button
                                        onClick={handleAddToQuote}
                                        disabled={isQuoteLoading}
                                        className="secondary-action-btn quote"
                                    >
                                        {isQuoteLoading ? (
                                            <>
                                                <div className="loading-spinner"></div>
                                                Adding...
                                            </>
                                        ) : (
                                            <>
                                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Get Quote
                                            </>
                                        )}
                                    </button>

                                    <button className="secondary-action-btn contact">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Below Fold Content */}
                <div className="below-fold-content">
                    {/* Full Specifications */}
                    {product.specs && Object.keys(product.specs).length > 0 && (
                        <div className="section-card">
                            <div className="section-header">
                                <h2 className="section-title">Complete Specifications</h2>
                            </div>
                            <div className="section-content">
                                <div className="specs-grid">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key} className="spec-row">
                                            <span className="spec-label">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </span>
                                            <span className="spec-value">
                                                {Array.isArray(value) ? value.join(', ') : String(value)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Documents Section */}
                    {product.documents && product.documents.length > 0 && (
                        <div className="section-card">
                            <div className="section-header">
                                <h2 className="section-title">
                                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Documents & Downloads
                                </h2>
                            </div>
                            <div className="section-content">
                                <div className="documents-grid">
                                    {product.documents.map((doc, index) => (
                                        <a
                                            key={index}
                                            href={doc.url.startsWith('http') ? doc.url : `${API_BASE.replace('/api', '')}${doc.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="document-card"
                                            download
                                        >
                                            <div className="document-icon">
                                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div className="document-info">
                                                <div className="document-name">
                                                    {doc.name}
                                                </div>
                                                <div className="document-subtitle">
                                                    Click to download
                                                </div>
                                            </div>
                                            <div className="document-download-icon">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="section-card">
                            <div className="section-header">
                                <h2 className="section-title">Related Products</h2>
                            </div>
                            <div className="section-content">
                                <div className="related-products-grid">
                                    {relatedProducts.map((relatedProduct) => (
                                        <ProductCard key={relatedProduct.id} product={relatedProduct} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}