import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartContext';
import '../../shop/shop.css';
import ProductCardEnhanced from "./ProductCardEnhanced";

type Product = {
    id: string;
    name: string;
    slug: string;
    price: string;
    images?: string[];
    description?: string;
    category?: { name: string; slug: string };
    brand?: { name: string; slug: string };
    stockQty?: number;
    specs?: Record<string, string | number | string[]>;
};

interface ProductListEnhancedProps {
    products: Product[];
    viewMode?: 'grid' | 'list';
    compareList?: Product[];
    onAddToCompare?: (product: Product) => void;
    onRemoveFromCompare?: (productId: string) => void;
    onAddToQuote?: (productId: string) => void;
}

const ProductCardList: React.FC<{
    product: Product;
    isInCompare: boolean;
    onAddToCompare?: (product: Product) => void;
    onRemoveFromCompare?: (productId: string) => void;
    onAddToQuote?: (productId: string) => void;
    showCompareButton: boolean;
}> = ({ product, isInCompare, onAddToCompare, onRemoveFromCompare, onAddToQuote, showCompareButton }) => {
    const { addItem } = useCart();
    const isInStock = product.stockQty !== undefined && product.stockQty > 0;
    const formattedPrice = parseInt(product.price).toLocaleString('en-US');

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInStock) {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.images?.[0]
            });
        }
    };

    const handleAddToQuote = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onAddToQuote) {
            onAddToQuote(product.id);
        }
    };

    const handleCompareToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isInCompare && onRemoveFromCompare) {
            onRemoveFromCompare(product.id);
        } else if (!isInCompare && onAddToCompare) {
            onAddToCompare(product);
        }
    };

    const productUrl = product.category
        ? `/shop/${product.category.slug}/${product.slug}`
        : `/shop/uncategorized/${product.slug}`;

    return (
        <Link href={productUrl} className="product-card-list">
            <div className="product-image-list">
                {product.images && product.images.length > 0 ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="200px"
                        style={{ objectFit: 'cover' }}
                        priority={false}
                    />
                ) : (
                    <div className="no-image-placeholder-list">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <p>No Image</p>
                    </div>
                )}

                {!isInStock && (
                    <div className="out-of-stock-badge">Out of Stock</div>
                )}

                {showCompareButton && (
                    <button
                        className={`compare-btn-list ${isInCompare ? 'active' : ''}`}
                        onClick={handleCompareToggle}
                        aria-label={isInCompare ? 'Remove from comparison' : 'Add to comparison'}
                        title={isInCompare ? 'Remove from comparison' : 'Add to comparison'}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {isInCompare ? (
                                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9m2-6l6 6m-6 0l6-6" />
                            ) : (
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                            )}
                        </svg>
                    </button>
                )}
            </div>

            <div className="product-info-list">
                <div className="product-header-list">
                    <div className="product-details-list">
                        {product.brand && <div className="product-brand-list">{product.brand.name}</div>}
                        <h3 className="product-name-list">{product.name}</h3>
                        {product.category && <div className="product-category-list">{product.category.name}</div>}
                        {product.description && (
                            <div className="product-description-list">{product.description}</div>
                        )}
                    </div>
                    <div className="product-price-list">
                        ${formattedPrice}
                    </div>
                </div>

                <div className="product-actions-list">
                    <button
                        className={`product-action-btn-list cart-btn-list ${!isInStock ? 'disabled' : ''}`}
                        onClick={handleAddToCart}
                        disabled={!isInStock}
                        aria-label={isInStock ? `Add ${product.name} to cart` : `${product.name} is out of stock`}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {isInStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>

                    <button
                        className="product-action-btn-list quote-btn-list"
                        onClick={handleAddToQuote}
                        aria-label={`Request quote for ${product.name}`}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                        Request Quote
                    </button>
                </div>
            </div>
        </Link>
    );
};

const ProductListEnhanced: React.FC<ProductListEnhancedProps> = ({
    products,
    viewMode = 'grid',
    compareList = [],
    onAddToCompare,
    onRemoveFromCompare,
    onAddToQuote
}) => {
    if (!products.length) {
        return <div className="no-products">No products found.</div>;
    }

    const isInCompare = (productId: string) => compareList.some(p => p.id === productId);

    if (viewMode === 'list') {
        return (
            <div className="products-container-enhanced list">
                <div className="products-list-enhanced">
                    {products.map(product => (
                        <ProductCardList
                            key={product.id}
                            product={product}
                            isInCompare={isInCompare(product.id)}
                            onAddToCompare={onAddToCompare}
                            onRemoveFromCompare={onRemoveFromCompare}
                            onAddToQuote={onAddToQuote}
                            showCompareButton={compareList.length < 4 || isInCompare(product.id)}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="products-container-enhanced grid">
            <div className="products-grid-enhanced">
                {products.map(product => (
                    <ProductCardEnhanced
                        key={product.id}
                        product={product}
                        isInCompare={isInCompare(product.id)}
                        onAddToCompare={onAddToCompare}
                        onRemoveFromCompare={onRemoveFromCompare}
                        onAddToQuote={onAddToQuote}
                        showCompareButton={compareList.length < 4 || isInCompare(product.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductListEnhanced;