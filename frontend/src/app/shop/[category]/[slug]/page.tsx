"use client";

import React, { useEffect, useState } from 'react';
import { useCart } from '../../../components/shop/CartContext';
import { useQuote } from '../../../components/shop/QuoteContext';
import { useToast } from '../../../components/shop/ToastContext';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import ReactImageMagnify from 'react-image-magnify';
import styles from './ProductPage.module.css';
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
  condition?: string;
  stockQty?: number;
  specs?: Record<string, string | number | string[]>;
  documents?: { name: string; url: string }[];
};

const API_BASE = "http://localhost:5000/api";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { showToast } = useToast();

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

  const { addItem: addToCart, isLoading: isCartLoading } = useCart();
  const { addItem: addToQuote, isLoading: isQuoteLoading } = useQuote();

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
          showToast(`${product.name} added to cart`, 'success');
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        showToast("Failed to add item to cart", 'error');
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
          showToast(`${product.name} added to quote`, 'success');
        }
      } catch (error) {
        console.error("Error adding to quote:", error);
        showToast("Failed to add item to quote", 'error');
      }
    }
  };

  const renderStockStatus = () => {
    if (product?.stockQty === undefined) return null;
    if (product.stockQty === 0) {
      return <span className={`${styles.stockStatus} ${styles.stockStatusOutOfStock}`}>Out of Stock</span>;
    }
    if (product.stockQty < 5) {
      return <span className={`${styles.stockStatus} ${styles.stockStatusLowStock}`}>Low Stock - {product.stockQty} units left</span>;
    }
    return <span className={`${styles.stockStatus} ${styles.stockStatusInStock}`}>In Stock</span>;
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  const isOutOfStock = product.stockQty !== undefined && product.stockQty <= 0;

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Product Images */}
        <div className={styles.imageGallery}>
          <div className={styles.mainImageContainer}>
            {product.images && product.images.length > 0 ? (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: product.name,
                    isFluidWidth: true,
                    src: product.images[selectedImage].startsWith('http') ? product.images[selectedImage] : `http://localhost:5000${product.images[selectedImage]}`,
                  },
                  largeImage: {
                    src: product.images[selectedImage].startsWith('http') ? product.images[selectedImage] : `http://localhost:5000${product.images[selectedImage]}`,
                    width: 1200,
                    height: 1200,
                  },
                  enlargedImageContainerDimensions: {
                    width: '150%',
                    height: '120%'
                  }
                }}
              />
            ) : (
              <div className={styles.noImage}>No Image Available</div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.map((image, index) => (
                <button
                  key={index}
                  title={`View image ${index + 1}`}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.thumbnailSelected : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image.startsWith('http') ? image : `http://localhost:5000${image}`}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={100}
                    height={100}
                    style={{objectFit: "cover"}}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className={styles.productInfo}>
          {product.brand && (
            <div className={styles.brand}>{product.brand.name}</div>
          )}
          <h1>{product.name}</h1>
          <div className={styles.price}>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
              .format(parseInt(product.price))}
          </div>

          {renderStockStatus()}

          <div className={styles.description}>{product.description}</div>

          {/* Specifications */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className={styles.specifications}>
              <h2>Specifications</h2>
              <div className={styles.specGrid}>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className={styles.specItem}>
                    <span className={styles.specKey}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className={styles.specValue}>{Array.isArray(value) ? value.join(', ') : String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || isCartLoading}
              className={`${styles.actionButton} ${styles.primary}`}
              aria-label={isOutOfStock ? 'Out of Stock' : isCartLoading ? 'Adding to Cart' : 'Add to Cart'}
            >
              {isOutOfStock ? 'Out of Stock' : isCartLoading ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
            <button
              onClick={handleAddToQuote}
              disabled={isQuoteLoading}
              className={`${styles.actionButton} ${styles.secondary}`}
              aria-label={isQuoteLoading ? 'Adding to Quote' : 'Add to Quote'}
            >
              {isQuoteLoading ? 'Adding to Quote...' : 'Add to Quote'}
            </button>
          </div>

          {/* Downloadable Documents */}
          {product.documents && product.documents.length > 0 && (
            <div className={styles.documents}>
              <h2>Documents</h2>
              <div className={styles.documentList}>
                {product.documents.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url.startsWith('http') ? doc.url : `http://localhost:5000${doc.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.documentLink}
                    download
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className={styles.documentName}>{doc.name}</span>
                    <span className={styles.downloadButton}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      Download
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className={styles.relatedProducts}>
          <h2>Related Products</h2>
          <div className={styles.relatedProductsGrid}>
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}