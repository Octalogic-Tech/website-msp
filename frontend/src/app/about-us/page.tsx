'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './about.module.css';

export default function AboutUsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About ConstructPro</h1>
          <p className={styles.heroSubtitle}>Building the future of construction equipment supply since 2005</p>
        </div>
      </div>
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <p className={styles.paragraph}>
            Founded in 2005, ConstructPro began as a small family business dedicated to providing quality construction equipment to local contractors. 
            Over the years, we've grown into a leading supplier of heavy machinery, parts, and services across the nation, while maintaining our 
            commitment to personalized customer service and technical expertise.
          </p>
          <p className={styles.paragraph}>
            With over 15 years of experience in the industry, we understand the challenges that construction professionals face. Our mission is to provide 
            reliable equipment and parts that keep your projects moving forward, minimizing downtime and maximizing productivity.
          </p>
        </div>
      </section>

      <section className={styles.section + ' ' + styles.altSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.paragraph}>
            At ConstructPro, our mission is to be the most trusted partner in the construction equipment industry by providing:
          </p>
          <ul className={styles.missionList}>
            <li>High-quality machinery and genuine parts</li>
            <li>Expert technical support and service</li>
            <li>Transparent pricing and business practices</li>
            <li>Innovative solutions for modern construction challenges</li>
            <li>Sustainable and environmentally responsible options</li>
          </ul>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>Our Core Values</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3>Quality</h3>
            <p>We never compromise on the quality of our products and services.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3>Integrity</h3>
            <p>Honest and ethical business practices in everything we do.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>Customer Focus</h3>
            <p>Putting our customers' needs at the center of our business.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
            </div>
            <h3>Innovation</h3>
            <p>Continuously improving our products and processes.</p>
          </div>
        </div>
      </section>

      <section className={styles.linkSection}>
        <h2 className={styles.sectionTitle}>Learn More About Us</h2>
        <div className={styles.linkGrid}>
          <Link href="/about-us/dealer-certifications" className={styles.linkCard}>
            <h3>Dealer Certifications</h3>
            <p>View our industry certifications and authorized dealerships</p>
            <span className={styles.linkArrow}>→</span>
          </Link>
          <Link href="/about-us/testimonials" className={styles.linkCard}>
            <h3>Customer Testimonials</h3>
            <p>Read what our customers say about their experience with us</p>
            <span className={styles.linkArrow}>→</span>
          </Link>
          <Link href="/about-us/partners" className={styles.linkCard}>
            <h3>Our Partners</h3>
            <p>Learn about our manufacturing and distribution partners</p>
            <span className={styles.linkArrow}>→</span>
          </Link>
          <Link href="/contact-us" className={styles.linkCard}>
            <h3>Contact Us</h3>
            <p>Get in touch with our team for any inquiries</p>
            <span className={styles.linkArrow}>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}