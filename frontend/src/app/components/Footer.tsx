import React from 'react';
import Link from 'next/link';
import './footer.css';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Company Info */}
                    <div className="footer-column">
                        <div className="footer-logo">
                            <Link href="/">
                                <span className="footer-logo-text">ConstructPro</span>
                            </Link>
                        </div>
                        <p className="footer-description">
                            Your trusted partner for construction machinery, parts, and equipment. Serving the industry with quality products since 1985.
                        </p>
                        <div className="footer-social">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"></path>
                                </svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"></path>
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h3 className="footer-heading">Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link href="/shop">Shop</Link></li>
                            <li><Link href="/parts-finder">Parts Finder</Link></li>
                            <li><Link href="/about-us">About Us</Link></li>
                            <li><Link href="/contact-us">Contact Us</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="footer-column">
                        <h3 className="footer-heading">Categories</h3>
                        <ul className="footer-links">
                            <li><Link href="/shop/excavators">Excavators</Link></li>
                            <li><Link href="/shop/loaders">Wheel Loaders</Link></li>
                            <li><Link href="/shop/bulldozers">Bulldozers</Link></li>
                            <li><Link href="/shop/cranes">Cranes</Link></li>
                            <li><Link href="/shop/parts">Replacement Parts</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-column">
                        <h3 className="footer-heading">Contact Us</h3>
                        <address className="footer-contact">
                            <div className="contact-item">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>123 Construction Way, Industry Park, CA 90001</span>
                            </div>
                            <div className="contact-item">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>1-800-MACHINERY (622-4467)</span>
                            </div>
                            <div className="contact-item">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>info@constructpro.com</span>
                            </div>
                            <div className="contact-item">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Mon-Fri: 8AM-6PM, Sat: 9AM-4PM</span>
                            </div>
                        </address>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="footer-newsletter">
                    <h3 className="newsletter-heading">Subscribe to Our Newsletter</h3>
                    <p className="newsletter-text">Stay updated with our latest products, special offers, and industry news.</p>
                    <form className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="newsletter-input"
                            aria-label="Email for newsletter"
                            required
                        />
                        <button type="submit" className="newsletter-button">Subscribe</button>
                    </form>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <div className="footer-copyright">
                        &copy; {currentYear} ConstructPro. All rights reserved.
                    </div>
                    <div className="footer-policies">
                        <Link href="/policies/privacy">Privacy Policy</Link>
                        <Link href="/policies/terms">Terms of Service</Link>
                        <Link href="/policies/shipping">Shipping Policy</Link>
                        <Link href="/policies/returns">Returns & Refunds</Link>
                    </div>
                    <div className="footer-payment">
                        <span className="payment-label">We Accept:</span>
                        <div className="payment-icons">
                            <span className="payment-icon" title="Visa">
                                <svg width="28" height="20" viewBox="0 0 28 20" fill="currentColor">
                                    <path d="M25.5 0h-23C1.1 0 0 1.1 0 2.5v15C0 18.9 1.1 20 2.5 20h23c1.4 0 2.5-1.1 2.5-2.5v-15C28 1.1 26.9 0 25.5 0zM8.3 13.8H5.9L4 6.2h2.1l1.2 5.2 2.9-5.2h2.1L8.3 13.8zm4.6 0h-2l1.6-7.6h2L12.9 13.8zm7.9-5.1c-.7-.3-1.1-.5-1.1-.9 0-.3.3-.6.9-.6.7 0 1.2.1 1.6.3l.2.1.3-1.8c-.4-.2-1-.3-1.8-.3-2 0-3.4 1-3.4 2.5 0 1.1 1 1.7 1.8 2 .8.4 1 .6 1 .9 0 .5-.6.7-1.2.7-.8 0-1.5-.2-1.9-.4l-.3-.1-.3 1.8c.5.2 1.3.4 2.2.4 2.1 0 3.5-1 3.5-2.6.1-1-.6-1.7-1.5-2zm5.7 5.1h-1.7l-1.5-7.6h2l1.5 7.6h-.3z" />
                                </svg>
                            </span>
                            <span className="payment-icon" title="Mastercard">
                                <svg width="28" height="20" viewBox="0 0 28 20" fill="currentColor">
                                    <path d="M25.5 0h-23C1.1 0 0 1.1 0 2.5v15C0 18.9 1.1 20 2.5 20h23c1.4 0 2.5-1.1 2.5-2.5v-15C28 1.1 26.9 0 25.5 0zm-7.2 13.4c0 2.7-2.2 4.9-4.9 4.9s-4.9-2.2-4.9-4.9 2.2-4.9 4.9-4.9 4.9 2.2 4.9 4.9zm-9.8 0c0-2.7 2.2-4.9 4.9-4.9s4.9 2.2 4.9 4.9-2.2 4.9-4.9 4.9-4.9-2.2-4.9-4.9z" />
                                </svg>
                            </span>
                            <span className="payment-icon" title="American Express">
                                <svg width="28" height="20" viewBox="0 0 28 20" fill="currentColor">
                                    <path d="M25.5 0h-23C1.1 0 0 1.1 0 2.5v15C0 18.9 1.1 20 2.5 20h23c1.4 0 2.5-1.1 2.5-2.5v-15C28 1.1 26.9 0 25.5 0zM13.2 7.6l1.3-3.2 1.3 3.2H13.2zM14.5 12l1.5-3.6h2.3l-2.3 5.4h-3l-2.3-5.4h2.3L14.5 12zm-4.3-3.6h4.6l-2.3 5.4H7.9v-5.4h2.3zm10.5 5.4v-5.4h4.6v1.1h-3.2v1h3.1v1.1h-3.1v1.1h3.2v1.1h-4.6z" />
                                </svg>
                            </span>
                            <span className="payment-icon" title="PayPal">
                                <svg width="28" height="20" viewBox="0 0 28 20" fill="currentColor">
                                    <path d="M25.5 0h-23C1.1 0 0 1.1 0 2.5v15C0 18.9 1.1 20 2.5 20h23c1.4 0 2.5-1.1 2.5-2.5v-15C28 1.1 26.9 0 25.5 0zM20.1 6.5c0 1.4-.6 2.5-1.8 3.3-1.2.8-2.8 1.1-4.8 1.1h-.9l-.6 3.9h-2.1l2.3-14.2h3.5c1.4 0 2.5.3 3.2.9.8.6 1.2 1.5 1.2 2.7v2.3zm-3.4-.1c0-.5-.1-.9-.4-1.1-.3-.2-.7-.3-1.3-.3h-.9l-.7 4.2h.8c.8 0 1.4-.2 1.8-.5.5-.4.7-.9.7-1.7V6.4z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;