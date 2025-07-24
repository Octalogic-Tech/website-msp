import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartContext';

interface ProductCardEnhancedProps {
    product: {
        id: string;
        name: string;
        slug: string;
        description?: string | null;
        price: number | string;
        stockQty: number;
        images?: string[];
        category?: {
            name: string;
            slug: string;
        };
        brand?: {
            name: string;
            slug: string;
        };
    };
    onAddToQuote?: (productId: string) => void;
    isInCompare?: boolean;
    onAddToCompare?: (product: any) => void;
    onRemoveFromCompare?: (productId: string) => void;
    showCompareButton?: boolean;
}

const ProductCardEnhanced: React.FC<ProductCardEnhancedProps> = ({
    product,
    onAddToQuote,
    isInCompare = false,
    onAddToCompare,
    onRemoveFromCompare,
    showCompareButton = true
}) => {
    const {
        id,
        name,
        slug,
        description,
        price,
        stockQty,
        images,
        category,
        brand
    } = product;

    const { addItem } = useCart();
    const isInStock = stockQty > 0;
    const formattedPrice = typeof price === 'number'
        ? price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
        : parseInt(price as string).toLocaleString('en-US');

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInStock) {
            addItem({
                id,
                name,
                price,
                quantity: 1,
                image: images?.[0]
            });
        }
    };

    const handleAddToQuote = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onAddToQuote) {
            onAddToQuote(id);
        }
    };

    const handleCompareToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isInCompare && onRemoveFromCompare) {
            onRemoveFromCompare(id);
        } else if (!isInCompare && onAddToCompare) {
            onAddToCompare(product);
        }
    };

    const productUrl = category
        ? `/shop/${category.slug}/${slug}`
        : `/shop/uncategorized/${slug}`;

    return (
        <Link href={productUrl} className="product-card-enhanced">
            <div className="product-image-enhanced">
                {images && images.length > 0 ? (
                    <Image
                        src={images[0]}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        style={{ objectFit: 'cover' }}
                        priority={false}
                    />
                ) : (
                    <div className="no-image-placeholder">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                    </div>
                )}

                {!isInStock && (
                    <div className="out-of-stock-badge">Out of Stock</div>
                )}

                {showCompareButton && (
                    <button
                        className={`compare-btn-enhanced ${isInCompare ? 'active' : ''}`}
                        onClick={handleCompareToggle}
                        aria-label={isInCompare ? 'Remove from comparison' : 'Add to comparison'}
                        title={isInCompare ? 'Remove from comparison' : 'Add to comparison'}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {isInCompare ? (
                                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9m2-6l6 6m-6 0l6-6" />
                            ) : (
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                            )}
                        </svg>
                    </button>
                )}
            </div>

            <div className="product-info-enhanced">
                {brand && <div className="product-brand-enhanced">{brand.name}</div>}
                <h3 className="product-name-enhanced">{name}</h3>
                {category && <div className="product-category-enhanced">{category.name}</div>}

                {description && (
                    <div className="product-description-enhanced">{description}</div>
                )}

                <div className="product-footer-enhanced">
                    <div className="product-price-enhanced">
                        ${formattedPrice}
                    </div>

                    <div className="product-actions-enhanced">
                        <button
                            className={`product-action-btn cart-btn ${!isInStock ? 'disabled' : ''}`}
                            onClick={handleAddToCart}
                            disabled={!isInStock}
                            aria-label={isInStock ? `Add ${name} to cart` : `${name} is out of stock`}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            {isInStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>

                        <button
                            className="product-action-btn quote-btn"
                            onClick={handleAddToQuote}
                            aria-label={`Request quote for ${name}`}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                            Quote
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCardEnhanced;