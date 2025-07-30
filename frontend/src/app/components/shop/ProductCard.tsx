'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import { useQuote } from './QuoteContext';
import { useToast } from './ToastContext';
import Image from 'next/image';
import '../../shop/shop.css';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  images?: string[];
  description?: string;
  category?: { name: string; slug: string };
  brand?: { name: string; slug: string };
  stockQty?: number;
  documents?: { name: string; url: string }[];
  specs?: Record<string, string | number | string[]>;
}

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  isInCompare?: boolean;
  onAddToCompare?: (product: Product) => void;
  onRemoveFromCompare?: (productId: string) => void;
  showCompareButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'grid',
  isInCompare = false,
  onAddToCompare,
  onRemoveFromCompare,
  showCompareButton = true
}) => {
  const router = useRouter();
  const { addItem: addToCart, isLoading: isCartLoading } = useCart();
  const { addItem: addToQuote, isLoading: isQuoteLoading } = useQuote();
  const { showToast } = useToast();

  const STRAPI_BASE_URL = "http://localhost:1337";

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const success = await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images?.[0],
      });

      if (success) {
        showToast(`✅ ${product.name} added to cart`, 'success');
      } else {
        showToast("❌ Failed to add item to cart", 'error');
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("❌ Failed to add item to cart", 'error');
    }
  };

  const handleAddToQuote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const success = await addToQuote({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images?.[0],
      });

      if (success) {
        showToast(`${product.name} added to quote`, 'success');
      }
    } catch (error) {
      console.error("Error adding to quote:", error);
      showToast("Failed to add item to quote", 'error');
    }
  };

  const handleDocumentClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url.startsWith('http') ? url : `${STRAPI_BASE_URL}${url}`, '_blank');
  };

  const handleClick = () => {
    const categorySlug = product.category?.slug || 'uncategorized';
    router.push(`/shop/${categorySlug}/${product.slug}`);
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCompare) {
      onRemoveFromCompare?.(product.id);
    } else {
      onAddToCompare?.(product);
    }
  };

  const isOutOfStock = product.stockQty !== undefined && product.stockQty <= 0;
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseInt(product.price));

  return (
    <div className={`product-card ${viewMode}-view ${isInCompare ? 'in-compare' : ''}`} onClick={handleClick}>
      <div className="product-image">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0].startsWith('http') ? product.images[0] : `${STRAPI_BASE_URL}${product.images[0]}`}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        ) : (
          <div className="product-image-placeholder">No Image</div>
        )}
        {isOutOfStock && (
          <div className="out-of-stock-badge">Out of Stock</div>
        )}
        {showCompareButton && onAddToCompare && (
          <button
            className={`compare-toggle ${isInCompare ? 'active' : ''}`}
            onClick={handleCompareToggle}
            title={isInCompare ? 'Remove from comparison' : 'Add to comparison'}
          >
            {isInCompare ? '✓' : '+'}
          </button>
        )}
      </div>

      <div className="product-info">
        {product.brand && (
          <div className="product-brand">{product.brand.name}</div>
        )}
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <div className="product-description">
            {product.description.slice(0, 100)}{product.description.length > 100 ? "..." : ""}
          </div>
        )}

        <div className="product-footer">
          <div className="product-price">{formattedPrice}</div>

          {viewMode === 'list' && product.specs && (
            <div className="product-specs-preview">
              {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <span className="spec-label">{key}:</span>
                  <span className="spec-value">{Array.isArray(value) ? value.join(', ') : String(value)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="product-actions">
            <button
              className={`add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock || isCartLoading}
              aria-label={isOutOfStock ? 'Out of Stock' : isCartLoading ? 'Adding to Cart' : 'Add to Cart'}
            >
              {isOutOfStock ? 'Out of Stock' : isCartLoading ? 'Adding...' : 'Add to Cart'}
            </button>
            <button
              className="add-to-quote-btn"
              onClick={handleAddToQuote}
              disabled={isQuoteLoading}
              aria-label={isQuoteLoading ? 'Adding to Quote' : 'Add to Quote'}
            >
              {isQuoteLoading ? 'Adding...' : 'Add to Quote'}
            </button>
          </div>

          {product.documents && product.documents.length > 0 && (
            <div className="product-documents">
              {product.documents.slice(0, 1).map((doc, index) => (
                <button
                  key={index}
                  className="document-button"
                  onClick={(e) => handleDocumentClick(e, doc.url)}
                  aria-label={`Download ${doc.name || 'Spec Sheet'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  {doc.name || "Download Spec Sheet"}
                </button>
              ))}
              {product.documents.length > 1 && (
                <div className="more-documents">+{product.documents.length - 1} more</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;