'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './contact.module.css';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  company?: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

export default function ContactUsPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    company: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the form data to your backend here
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        company: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSubtitle}>Get in touch with our team for sales, support, or general inquiries</p>
        </div>
      </div>

      <div className={styles.contactGrid}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3>Call Us</h3>
            <p>Sales: <a href="tel:+18001234567">1-800-123-4567</a></p>
            <p>Support: <a href="tel:+18009876543">1-800-987-6543</a></p>
            <p>Mon-Fri: 8am - 6pm EST</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3>Email Us</h3>
            <p>Sales: <a href="mailto:sales@constructpro.com">sales@constructpro.com</a></p>
            <p>Support: <a href="mailto:support@constructpro.com">support@constructpro.com</a></p>
            <p>General: <a href="mailto:info@constructpro.com">info@constructpro.com</a></p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3>Visit Us</h3>
            <address>
              123 Construction Way<br />
              Building 4, Suite 300<br />
              Industry City, CA 90210
            </address>
            <p>Mon-Fri: 9am - 5pm PST</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3>Business Hours</h3>
            <p><strong>Monday-Friday:</strong> 8:00 AM - 6:00 PM</p>
            <p><strong>Saturday:</strong> 9:00 AM - 3:00 PM</p>
            <p><strong>Sunday:</strong> Closed</p>
          </div>
        </div>

        <div className={styles.contactForm}>
          <div className={styles.formContainer}>
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and we'll get back to you as soon as possible.</p>
            
            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <p>Your message has been sent successfully! We'll be in touch soon.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p>There was an error sending your message. Please try again or contact us directly.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className={submitStatus === 'success' ? styles.formHidden : ''}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? styles.inputError : ''}
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? styles.inputError : ''}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? styles.inputError : ''}
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="company">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? styles.inputError : ''}
                >
                  <option value="">Select a subject</option>
                  <option value="Sales Inquiry">Sales Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Parts Request">Parts Request</option>
                  <option value="Service Request">Service Request</option>
                  <option value="General Question">General Question</option>
                </select>
                {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? styles.inputError : ''}
                ></textarea>
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>
              
              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.mapSection}>
        <h2>Find Us</h2>
        <div className={styles.mapPlaceholder}>
          {/* In a real app, you would embed a Google Map or similar here */}
          <div className={styles.mapContent}>
            <p>Interactive Map</p>
            <p className={styles.mapSubtext}>123 Construction Way, Industry City, CA 90210</p>
          </div>
        </div>
      </div>

      <section className={styles.linkSection}>
        <h2>Additional Resources</h2>
        <div className={styles.linkGrid}>
          <Link href="/technical-support" className={styles.linkCard}>
            <h3>Technical Support</h3>
            <p>Get help with technical issues and equipment troubleshooting</p>
            <span className={styles.linkArrow}>→</span>
          </Link>
          <Link href="/faq" className={styles.linkCard}>
            <h3>FAQ</h3>
            <p>Find answers to commonly asked questions</p>
            <span className={styles.linkArrow}>→</span>
          </Link>
          <Link href="/returns-warranty" className={styles.linkCard}>
            <h3>Returns & Warranty</h3>
            <p>Information about our return policy and warranty coverage</p>
            <span className={styles.linkArrow}>→</span>
          </Link>
          <Link href="/about-us" className={styles.linkCard}>
            <h3>About Us</h3>
            <p>Learn more about our company and mission</p>
            <span className={styles.linkArrow}>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}