'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../components/shop/CartContext';
import styles from './success.module.css';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState<string>('');

  // Generate order number on client side only
  useEffect(() => {
    // Generate a random order number
    const randomOrderNum = Math.floor(Math.random() * 10000).toString().padStart(5, '0');
    setOrderNumber(randomOrderNum);
    
    // Clear cart on successful checkout
    clearCart();
  }, [clearCart]);

  return (
    <div className={styles.successContainer}>
      <div className={styles.successCard}>
        <div className={styles.checkmarkCircle}>
          <div className={styles.checkmark}></div>
        </div>
        
        <h1>Order Placed Successfully!</h1>
        
        <p className={styles.message}>
          Thank you for your order. We have received your purchase and will process it shortly.
          A confirmation email has been sent to your email address.
        </p>
        
        <div className={styles.orderInfo}>
          <p>Your order number: <strong>#{orderNumber}</strong></p>
          <p>Estimated delivery: <strong>3-5 business days</strong></p>
        </div>
        
        <div className={styles.actions}>
          <Link href="/shop" className={styles.continueShoppingBtn}>
            Continue Shopping
          </Link>
          <button 
            onClick={() => router.push('/account/orders')}
            className={styles.viewOrderBtn}
          >
            View Order Status
          </button>
        </div>
      </div>
    </div>
  );
} 