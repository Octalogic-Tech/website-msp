'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './success.module.css';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');

  // Get order details from URL parameters
  useEffect(() => {
    const orderNumFromUrl = searchParams.get('orderNumber');
    const orderIdFromUrl = searchParams.get('orderId');

    if (orderNumFromUrl) {
      setOrderNumber(orderNumFromUrl);
    } else {
      // Fallback: redirect to cart if no order number
      router.push('/cart');
      return;
    }

    if (orderIdFromUrl) {
      setOrderId(orderIdFromUrl);
    }
  }, [searchParams, router]);

  if (!orderNumber) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successCard}>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

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