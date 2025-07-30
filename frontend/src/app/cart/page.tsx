'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../components/shop/CartContext';
import { useToast } from '../components/shop/ToastContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from './cart.module.css';

export default function CartPage() {
  const { items, removeItem, updateQuantity, checkout, total, isLoading, error } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const success = await updateQuantity(itemId, newQuantity);
      if (!success) {
        showToast('Failed to update quantity', 'error');
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
      showToast('Failed to update quantity', 'error');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const success = await removeItem(itemId);
      if (success) {
        showToast('Item removed from cart', 'success');
      } else {
        showToast('Failed to remove item', 'error');
      }
    } catch (err) {
      console.error('Error removing item:', err);
      showToast('Failed to remove item', 'error');
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const result = await checkout();
      if (result.success && result.orderNumber) {
        // Redirect to success page with order number
        router.push(`/cart/success?orderNumber=${result.orderNumber}&orderId=${result.orderId}`);
      } else {
        showToast('Failed to process checkout', 'error');
        setIsCheckingOut(false);
      }
    } catch (err) {
      console.error('Error during checkout:', err);
      showToast('Failed to process checkout', 'error');
      setIsCheckingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.emptyCartContainer}>
        <h1>Error Loading Cart</h1>
        <p>{error}</p>
        <Link href="/shop" className={styles.continueShoppingBtn}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyCartContainer}>
        <h1>Your Cart is Empty</h1>
        <p>Looks like you have not added any products to your cart yet.</p>
        <Link href="/shop" className={styles.continueShoppingBtn}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cartPageContainer}>
      <h1 className={styles.cartTitle}>Shopping Cart</h1>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          <div className={styles.cartHeader}>
            <div className={styles.productCol}>Product</div>
            <div className={styles.priceCol}>Price</div>
            <div className={styles.quantityCol}>Quantity</div>
            <div className={styles.subtotalCol}>Subtotal</div>
            <div className={styles.actionCol}></div>
          </div>

          {items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.productCol}>
                <div className={styles.productInfo}>
                  {item.image ? (
                    <div className={styles.productImage}>
                      <Image
                        src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`}
                        alt={item.name}
                        width={80}
                        height={80}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div className={styles.productImagePlaceholder} />
                  )}
                  <div className={styles.productName}>{item.name}</div>
                </div>
              </div>

              <div className={styles.priceCol}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(parseInt(item.price))}
              </div>

              <div className={styles.quantityCol}>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>{item.quantity}</span>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.subtotalCol}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(parseInt(item.price) * item.quantity)}
              </div>

              <div className={styles.actionCol}>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <h2>Order Summary</h2>

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(total)}
            </span>
          </div>

          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
            <span>Estimated Total</span>
            <span>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(total)}
            </span>
          </div>

          <div className={styles.cartActions}>
            <button
              className={styles.checkoutBtn}
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            <Link href="/shop" className={styles.continueShoppingLink}>
              Continue Shopping
            </Link>
          </div>

          <div className={styles.cartNote}>
            <p>Need help with your order? <a href="/contact">Contact our team</a></p>
            <p>Shipping and taxes will be calculated at checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
} 