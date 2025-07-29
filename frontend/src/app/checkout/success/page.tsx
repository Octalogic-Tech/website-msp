'use client';

import React from 'react';
import Link from 'next/link';
import styles from '../../cart/cart.module.css';

export default function CheckoutSuccessPage() {
  return (
    <div className={styles.successContainer || styles.emptyCartContainer}>
      <div className={styles.successIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      
      <h1>Order Placed Successfully!</h1>
      
      <p>
        Thank you for your order. Your payment has been processed successfully, and your
        order has been confirmed.
      </p>
      
      <div className={styles.orderInfo}>
        <h3>Order Information</h3>
        <p>Order confirmation and details have been sent to your email.</p>
        <p>Your order will be processed and shipped as soon as possible.</p>
      </div>
      
      <div className={styles.successActions}>
        <Link href="/shop" className={styles.continueShoppingBtn}>
          Continue Shopping
        </Link>
        <Link href="/" className={styles.homeLink}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}