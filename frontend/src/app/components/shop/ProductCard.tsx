import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import SaveButton from './SaveButton';

interface ProductCardProps {
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
  onAddToCart?: (productId: string) => void;
  onAddToQuote?: (productId: string) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToQuote,
  className = ''
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

  const isInStock = stockQty > 0;
  const isLowStock = stockQty > 0 && stockQty <= 5;
  const formattedPrice = typeof price === 'number'
    ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart && isInStock) {
      onAddToCart(id);
    }
  };

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToQuote) {
      onAddToQuote(id);
    }
  };

  const productUrl = category
    ? `/shop/${category.slug}/${slug}`
    : `/shop/uncategorized/${slug}`;

  return (
    <Link href={productUrl} className={`product-card ${className}`}>
      <div className="product-image">
        {images && images.length > 0 ? (
          <Image
            src={images[0]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority={false}
          />
        ) : (
          <div className="no-image-placeholder">
            <div className="no-image-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p>No Image Available</p>
          </div>
        )}

        {!isInStock && (
          <div className="out-of-stock-badge">Out of Stock</div>
        )}

        {isLowStock && (
          <Badge variant="warning" className="low-stock-badge">
            Low Stock: {stockQty} left
          </Badge>
        )}

        <div className="save-button-overlay-left">
          <SaveButton
            productId={id}
            size="sm"
            className="save-button--overlay"
          />
        </div>
      </div>

      <div className="product-info">
        {brand && <div className="product-brand">{brand.name}</div>}
        <h3 className="product-name">{name}</h3>
        {category && <div className="product-category">{category.name}</div>}

        {description && (
          <div className="product-description">{description}</div>
        )}

        <div className="product-footer">
          <div className="product-price">
            <span className="currency">$</span>
            {formattedPrice}
            <span className="unit">/unit</span>
          </div>

          <div className="product-actions">
            <button
              className={`add-to-cart-btn ${!isInStock ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!isInStock}
              aria-label={isInStock ? `Add ${name} to cart` : `${name} is out of stock`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {isInStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <button
              className="add-to-quote-btn"
              onClick={handleAddToQuote}
              aria-label={`Request quote for ${name}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      </div>
    </Link>
  );
};

export default ProductCard;