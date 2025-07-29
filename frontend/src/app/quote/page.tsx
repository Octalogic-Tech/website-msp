"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuote } from '../components/shop/QuoteContext';
import styles from './quote.module.css';

type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

export default function QuotePage() {
  const { items, removeItem, updateQuantity, clearQuote, itemCount, submitQuote, isLoading } = useQuote();
  const router = useRouter();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof CustomerInfo]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};
    
    if (!customerInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await submitQuote(customerInfo);
      setSubmitted(true);
      clearQuote();
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/quote/success');
      }, 1500);
    } catch (error) {
      console.error('Failed to submit quote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  if (isLoading && !submitted) {
    return (
      <div className={styles.loadingContainer || styles.emptyQuoteContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Processing your quote request...</p>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className={styles.emptyQuoteContainer}>
        <h1>Your Quote Request is Empty</h1>
        <p>Add products to your quote request to receive a custom price quote.</p>
        <Link href="/shop" className={styles.browseCatalogBtn}>
          Browse Our Catalog
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className={styles.successContainer}>
        <h1>Quote Request Submitted</h1>
        <p>Thank you for your quote request. Our team will review your inquiry and get back to you shortly.</p>
        <div className={styles.successActions}>
          <Link href="/shop" className={styles.browseCatalogBtn}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quotePageContainer}>
      <h1 className={styles.quoteTitle}>Request a Quote</h1>
      
      <div className={styles.quoteContent}>
        <div className={styles.quoteItems}>
          <h2>Items in Your Quote Request</h2>
          
          {items.map((item) => (
            <div key={item.id} className={styles.quoteItem}>
              <div className={styles.itemInfo}>
                {item.image ? (
                  <div className={styles.itemImage}>
                    <img 
                      src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} 
                      alt={item.name}
                    />
                  </div>
                ) : (
                  <div className={styles.itemImagePlaceholder} />
                )}
                
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <div className={styles.quantityContainer}>
                    <span>Quantity:</span>
                    <div className={styles.quantityControls}>
                      <button 
                        className={styles.quantityBtn}
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button 
                        className={styles.quantityBtn}
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.itemActions}>
                <button 
                  className={styles.removeBtn}
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.quoteForm}>
          <h2>Your Information</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerInfo.name}
                onChange={handleCustomerInfoChange}
                className={errors.name ? styles.inputError : ''}
                placeholder="Enter your full name"
              />
              {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={customerInfo.email}
                onChange={handleCustomerInfoChange}
                className={errors.email ? styles.inputError : ''}
                placeholder="Enter your email address"
              />
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleCustomerInfoChange}
                className={errors.phone ? styles.inputError : ''}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="company">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                value={customerInfo.company}
                onChange={handleCustomerInfoChange}
                placeholder="Enter your company name (optional)"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">Additional Information</label>
              <textarea
                id="message"
                name="message"
                value={customerInfo.message}
                onChange={handleCustomerInfoChange}
                rows={4}
                placeholder="Include any specific requirements or questions"
              ></textarea>
            </div>
            
            <div className={styles.formFooter}>
              <p className={styles.requiredFields}>* Required fields</p>
              <div className={styles.formActions}>
                <Link href="/shop" className={styles.cancelBtn}>
                  Cancel
                </Link>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div className={styles.quoteInfo}>
        <h3>What happens next?</h3>
        <ol>
          <li>Our team will review your quote request</li>
          <li>We'll prepare a detailed quote based on your requirements</li>
          <li>You'll receive the quote via email within 24-48 business hours</li>
          <li>A sales representative may contact you to discuss specific needs</li>
        </ol>
      </div>
    </div>
  );
}