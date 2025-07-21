'use client';

import React from 'react';
import Link from 'next/link';
import styles from '../quote.module.css';

export default function QuoteSuccessPage() {
  return (
    <div className={styles.successContainer}>
      <div className={styles.successIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      
      <h1>Quote Request Submitted Successfully!</h1>
      
      <p>
        Thank you for submitting your quote request. Our team will review your inquiry 
        and prepare a detailed quote based on your requirements.
      </p>
      
      <div className={styles.infoBox}>
        <h3>What happens next?</h3>
        <ol>
          <li>Our team will review your quote request details</li>
          <li>We'll prepare a personalized quote for your specific needs</li>
          <li>You'll receive your quote via email within 24-48 business hours</li>
          <li>A sales representative may contact you to discuss any specific requirements</li>
        </ol>
      </div>
      
      <div className={styles.successActions}>
        <Link href="/shop" className={styles.browseCatalogBtn}>
          Continue Shopping
        </Link>
        <Link href="/" className={styles.homeLink}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}