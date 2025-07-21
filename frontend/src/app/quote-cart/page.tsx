'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuote } from '../components/shop/QuoteContext';
import styles from './QuoteCartPage.module.css';

export default function QuoteCartPage() {
  const { items, removeItem, updateQuantity, itemCount, submitQuote } = useQuote();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await submitQuote(customerInfo);
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  if (itemCount === 0 && submitStatus !== 'success') {
    return (
      <div className={styles.container}>
        <div className={styles.emptyCart}>
          <p>Your quote cart is currently empty.</p>
          <Link href="/shop" className={styles.continueShoppingButton}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  if (submitStatus === 'success') {
    return (
      <div className={styles.container}>
        <div className={styles.message + ' ' + styles.success}>
            <h2>Thank you!</h2>
            <p>Your quote request has been submitted successfully. We will get back to you shortly.</p>
            <Link href="/shop" className={styles.continueShoppingButton} style={{marginTop: '1rem'}}>
                Continue Shopping
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Request a Quote</h1>
      <div className={styles.grid}>
        <div className={styles.quoteItems}>
          {items.map((item) => (
            <div key={item.id} className={styles.quoteItem}>
              <div className={styles.imageContainer}>
                <Image
                  src={`http://localhost:5000${item.image}` || '/placeholder.png'}
                  alt={item.name}
                  width={100}
                  height={100}
                  objectFit="cover"
                />
              </div>
              <div className={styles.itemInfo}>
                <Link href={`/shop/product/${item.id}`} className={styles.itemName}>
                  {item.name}
                </Link>
              </div>
              <div className={styles.itemActions}>
                <div className={styles.quantitySelector}>
                  <input
                    type="number"
                    min="1"
                    title={`Quantity for ${item.name}`}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className={styles.quantityInput}
                  />
                </div>
                <button onClick={() => removeItem(item.id)} className={styles.removeButton}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className={styles.formSection}>
          <h2>Your Information</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="company">Company (Optional)</label>
              <input type="text" id="company" name="company" onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Additional Message (Optional)</label>
              <textarea id="message" name="message" rows={4} onChange={handleInputChange}></textarea>
            </div>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
            </button>
            {submitStatus === 'error' && (
              <div className={styles.message + ' ' + styles.error}>
                <p>There was an error submitting your quote. Please try again.</p>
              </div>
            )}
          </form>
        </aside>
      </div>
    </div>
  );
} 