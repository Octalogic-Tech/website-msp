'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import { useQuote } from './QuoteContext';
import { useToast } from './ToastContext';
import Image from 'next/image';
import { FaShoppingCart, FaQuoteLeft, FaEye, FaCompressArrowsAlt } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';
import SaveButton from './SaveButton';

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
  condition?: string;
  availability?: string;
}

interface EnhancedProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  isInCompare?: boolean;
  onAddToCompare?: (product: Product) => void;
  onRemoveFromCompare?: (productId: string) => void;
  showCompareButton?: boolean;
  className?: string;
}

const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({
  product,
  viewMode = 'grid',
  isInCompare = false,
  onAddToCompare,
  onRemoveFromCompare,
  showCompareButton = true,
  className = ''
}) => {
  const router = useRouter();
  const { addItem: addToCart, isLoading: isCartLoading } = useCart();
  const { addItem: addToQuote, isLoading: isQuoteLoading } = useQuote();
  const { showToast } = useToast();

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

  const handleViewDetails = () => {
    const categorySlug = product.category?.slug || 'uncategorized';
    router.push(`/shop/${categorySlug}/${product.slug}`);
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCompare && onRemoveFromCompare) {
      onRemoveFromCompare(product.id);
    } else if (onAddToCompare) {
      onAddToCompare(product);
    }
  };

  const getAvailabilityBadge = () => {
    const availability = product.availability || 'Unknown';
    const stockQty = product.stockQty || 0;

    if (availability === 'In Stock' && stockQty > 0) {
      return <span className="badge badge-success">In Stock</span>;
    } else if (availability === 'Low Stock' || stockQty <= 5) {
      return <span className="badge badge-warning">Low Stock</span>;
    } else {
      return <span className="badge badge-error">Out of Stock</span>;
    }
  };

  const getConditionBadge = () => {
    const condition = product.condition || 'Used';
    return (
      <span className={`badge ${condition === 'New' ? 'badge-primary' : 'badge-warning'}`}>
        {condition}
      </span>
    );
  };

  if (viewMode === 'list') {
    return (
      <div className={`product-card-list ${className}`} onClick={handleViewDetails}>
        <div className="product-card-list-image">
          <Image
            src={product.images?.[0] || '/placeholder-image.jpg'}
            alt={product.name}
            width={120}
            height={120}
            className="object-cover"
          />
        </div>

        <div className="product-card-list-content">
          <div className="product-card-list-header">
            <h3 className="product-card-title">{product.name}</h3>
            <div className="product-badges">
              {getConditionBadge()}
              {getAvailabilityBadge()}
            </div>
          </div>

          <p className="product-card-description">
            {product.description || 'High-quality construction machinery part'}
          </p>

          <div className="product-card-meta">
            {product.brand && (
              <span className="text-steel">Brand: {product.brand.name}</span>
            )}
            {product.category && (
              <span className="text-steel">Category: {product.category.name}</span>
            )}
          </div>

          <div className="product-card-price-section">
            <span className="product-card-price">${product.price}</span>
            <div className="product-card-actions-list">
              <button
                onClick={handleAddToCart}
                disabled={isCartLoading}
                className="btn btn-primary btn-sm"
                title="Add to Cart"
              >
                <FaShoppingCart />
                {isCartLoading ? 'Adding...' : 'Add to Cart'}
              </button>

              <button
                onClick={handleAddToQuote}
                disabled={isQuoteLoading}
                className="btn btn-secondary btn-sm"
                title="Request Quote"
              >
                <FaQuoteLeft />
                Quote
              </button>

              <SaveButton
                productId={product.id}
                size="sm"
                variant="button"
                showText={false}
              />

              {showCompareButton && (
                <button
                  onClick={handleCompareToggle}
                  className={`btn btn-ghost btn-sm ${isInCompare ? 'active' : ''}`}
                  title={isInCompare ? 'Remove from Compare' : 'Add to Compare'}
                >
                  <FaCompressArrowsAlt />
                  {isInCompare ? 'Remove' : 'Compare'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`product-card ${className}`} onClick={handleViewDetails}>
      {/* Product Image */}
      <div className="product-card-image">
        <Image
          src={product.images?.[0] || '/placeholder-image.jpg'}
          alt={product.name}
          width={280}
          height={200}
          className="object-cover"
        />

        {/* Overlay Actions */}
        <div className="product-card-overlay">
          {/* Left side - Save Button */}
          <div className="overlay-left-actions">
            <SaveButton
              productId={product.id}
              size="sm"
              className="save-button--overlay"
            />
          </div>

          {/* Right side - Other Actions */}
          <div className="overlay-right-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
              className="btn btn-primary btn-sm"
              title="View Details"
            >
              <FaEye />
            </button>

            {showCompareButton && (
              <button
                onClick={handleCompareToggle}
                className={`btn btn-ghost btn-sm ${isInCompare ? 'active' : ''}`}
                title={isInCompare ? 'Remove from Compare' : 'Add to Compare'}
              >
                <FaCompressArrowsAlt />
              </button>
            )}
          </div>
        </div>

        {/* Status Badges */}
        <div className="product-card-badges">
          {getConditionBadge()}
          {getAvailabilityBadge()}
        </div>
      </div>

      {/* Product Content */}
      <div className="product-card-content">
        <h3 className="product-card-title">{product.name}</h3>

        {product.brand && (
          <p className="text-steel text-sm mb-2">by {product.brand.name}</p>
        )}

        <div className="product-card-price">${product.price}</div>

        {product.description && (
          <p className="text-steel text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {/* Key Specs */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="product-specs-preview">
            {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
              <div key={key} className="spec-item">
                <span className="spec-label">{key}:</span>
                <span className="spec-value">{Array.isArray(value) ? value.join(', ') : value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Documents */}
        {product.documents && product.documents.length > 0 && (
          <div className="product-documents">
            <HiOutlineDocumentText className="text-steel" />
            <span className="text-sm text-steel">{product.documents.length} document(s)</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="product-card-actions">
          <button
            onClick={handleAddToCart}
            disabled={isCartLoading}
            className="btn btn-primary flex-1"
          >
            <FaShoppingCart />
            {isCartLoading ? 'Adding...' : 'Add to Cart'}
          </button>

          <button
            onClick={handleAddToQuote}
            disabled={isQuoteLoading}
            className="btn btn-secondary flex-1"
          >
            <FaQuoteLeft />
            Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductCard;
