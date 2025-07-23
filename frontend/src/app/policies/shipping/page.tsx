'use client';

import React from 'react';
import Link from 'next/link';
import '../policies.css';

export default function ShippingPage() {
    return (
        <div className="policies-container">
            <div className="policies-header">
                <div className="header-content">
                    <h1>Shipping Policy</h1>
                    <p>Fast, reliable delivery of your construction equipment worldwide</p>
                </div>
            </div>

            <div className="policies-content">
                <nav className="policies-nav">
                    <Link href="/policies/warranty" className="nav-link">
                        Warranty Policy
                    </Link>
                    <Link href="/policies/shipping" className="nav-link active">
                        Shipping Policy
                    </Link>
                    <Link href="/policies/returns" className="nav-link">
                        Returns Policy
                    </Link>
                </nav>

                <main className="policies-main">
                    <section className="policy-section">
                        <h2>Shipping Options</h2>
                        <p>
                            We offer flexible shipping solutions to meet your project timelines
                            and budget requirements. All shipments are fully insured and tracked.
                        </p>

                        <div className="shipping-options">
                            <div className="shipping-card">
                                <h3>Standard Delivery</h3>
                                <div className="shipping-time">5-7 Business Days</div>
                                <div className="shipping-cost">Free on orders over $5,000</div>
                                <ul>
                                    <li>Ground transportation</li>
                                    <li>Full insurance coverage</li>
                                    <li>Real-time tracking</li>
                                    <li>Delivery confirmation</li>
                                </ul>
                            </div>

                            <div className="shipping-card">
                                <h3>Express Delivery</h3>
                                <div className="shipping-time">2-3 Business Days</div>
                                <div className="shipping-cost">Starting at $299</div>
                                <ul>
                                    <li>Priority handling</li>
                                    <li>Expedited transport</li>
                                    <li>SMS/Email updates</li>
                                    <li>Guaranteed delivery date</li>
                                </ul>
                            </div>

                            <div className="shipping-card">
                                <h3>White Glove Service</h3>
                                <div className="shipping-time">Scheduled</div>
                                <div className="shipping-cost">Quote on request</div>
                                <ul>
                                    <li>Professional setup</li>
                                    <li>On-site training</li>
                                    <li>Equipment inspection</li>
                                    <li>Packaging removal</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="policy-section">
                        <h2>Shipping Zones & Rates</h2>
                        <div className="zones-grid">
                            <div className="zone-card">
                                <h4>Zone 1 - Local</h4>
                                <p className="zone-area">Within 100 miles</p>
                                <div className="zone-rates">
                                    <div className="rate-item">
                                        <span>Small Parts</span>
                                        <span>$25</span>
                                    </div>
                                    <div className="rate-item">
                                        <span>Large Equipment</span>
                                        <span>$150</span>
                                    </div>
                                    <div className="rate-item">
                                        <span>Same-day available</span>
                                        <span>+$100</span>
                                    </div>
                                </div>
                            </div>

                            <div className="zone-card">
                                <h4>Zone 2 - Regional</h4>
                                <p className="zone-area">100-500 miles</p>
                                <div className="zone-rates">
                                    <div className="rate-item">
                                        <span>Small Parts</span>
                                        <span>$45</span>
                                    </div>
                                    <div className="rate-item">
                                        <span>Large Equipment</span>
                                        <span>$350</span>
                                    </div>
                                    <div className="rate-item">
                                        <span>Express available</span>
                                        <span>+$200</span>
                                    </div>
                                </div>
                            </div>

                            <div className="zone-card">
                                <h4>Zone 3 - National</h4>
                                <p className="zone-area">500+ miles</p>
                                <div className="zone-rates">
                                    <div className="rate-item">
                                        <span>Small Parts</span>
                                        <span>$75</span>
                                    </div>
                                    <div className="rate-item">
                                        <span>Large Equipment</span>
                                        <span>$650</span>
                                    </div>
                                    <div className="rate-item">
                                        <span>Express available</span>
                                        <span>+$400</span>
                                    </div>
                                </div>
                            </div>

                            <div className="zone-card">
                                <h4>International</h4>
                                <p className="zone-area">Worldwide shipping</p>
                                <div className="zone-rates">
                                    <div className="rate-item">
                                        <span>Air freight</span>
                                        <span>Quote</span>
                                    </div>
                                    <div className="rate-item">
                                        <span>Ocean freight</span>
                                        <span>Quote</span>
                                    </div>
                                    <div className="rate-item">
                                        <span>Customs handling</span>
                                        <span>Included</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="policy-section">
                        <h2>Delivery Process</h2>
                        <div className="process-steps">
                            <div className="step">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h4>Order Processing</h4>
                                    <p>Orders are processed within 24 hours of payment confirmation.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h4>Preparation</h4>
                                    <p>Equipment is inspected, tested, and prepared for shipment.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h4>Shipping Notification</h4>
                                    <p>You'll receive tracking information and estimated delivery date.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-number">4</div>
                                <div className="step-content">
                                    <h4>In Transit</h4>
                                    <p>Track your shipment in real-time with regular status updates.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-number">5</div>
                                <div className="step-content">
                                    <h4>Delivery</h4>
                                    <p>Professional delivery team ensures safe equipment placement.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="policy-section">
                        <h2>Special Handling Requirements</h2>
                        <div className="handling-grid">
                            <div className="handling-item">
                                <h4>Oversized Equipment</h4>
                                <p>Equipment exceeding standard dimensions requires special permits and routing.</p>
                                <ul>
                                    <li>Route planning included</li>
                                    <li>Permit acquisition</li>
                                    <li>Escort vehicles if required</li>
                                    <li>Additional 3-5 days for planning</li>
                                </ul>
                            </div>

                            <div className="handling-item">
                                <h4>Hazardous Materials</h4>
                                <p>Equipment with fluids or batteries requires specialized handling.</p>
                                <ul>
                                    <li>DOT compliance certification</li>
                                    <li>Specialized carriers</li>
                                    <li>Additional documentation</li>
                                    <li>Environmental protection</li>
                                </ul>
                            </div>

                            <div className="handling-item">
                                <h4>Remote Locations</h4>
                                <p>Deliveries to remote or difficult-access locations.</p>
                                <ul>
                                    <li>Site accessibility assessment</li>
                                    <li>Alternative delivery methods</li>
                                    <li>Additional equipment if needed</li>
                                    <li>Custom delivery solutions</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="policy-section">
                        <h2>International Shipping</h2>
                        <p>
                            We ship construction equipment worldwide with comprehensive
                            logistics support and customs handling.
                        </p>

                        <div className="international-info">
                            <div className="info-section">
                                <h4>Documentation</h4>
                                <ul>
                                    <li>Commercial invoices</li>
                                    <li>Export declarations</li>
                                    <li>Certificates of origin</li>
                                    <li>Technical specifications</li>
                                    <li>Safety compliance certificates</li>
                                </ul>
                            </div>

                            <div className="info-section">
                                <h4>Customs & Duties</h4>
                                <ul>
                                    <li>Customs clearance assistance</li>
                                    <li>Duty calculation support</li>
                                    <li>Import permit guidance</li>
                                    <li>Local agent coordination</li>
                                    <li>Delivery to final destination</li>
                                </ul>
                            </div>

                            <div className="info-section">
                                <h4>Transit Times</h4>
                                <ul>
                                    <li>Air freight: 3-7 days</li>
                                    <li>Ocean freight: 15-45 days</li>
                                    <li>Express air: 1-3 days</li>
                                    <li>Customs clearance: 2-5 days</li>
                                    <li>Final delivery: 1-3 days</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="policy-section">
                        <h2>Delivery Requirements</h2>
                        <div className="requirements-list">
                            <div className="requirement-item">
                                <h4>Site Preparation</h4>
                                <p>Ensure adequate space and access for delivery vehicle and equipment placement.</p>
                            </div>
                            <div className="requirement-item">
                                <h4>Receiving Personnel</h4>
                                <p>Authorized personnel must be present to receive and inspect the equipment.</p>
                            </div>
                            <div className="requirement-item">
                                <h4>Unloading Equipment</h4>
                                <p>Customer responsible for providing adequate unloading equipment (crane, forklift, etc.).</p>
                            </div>
                            <div className="requirement-item">
                                <h4>Inspection</h4>
                                <p>Immediate inspection required upon delivery. Report any damage within 24 hours.</p>
                            </div>
                        </div>
                    </section>

                    <section className="policy-section contact-section">
                        <h2>Shipping Support</h2>
                        <div className="contact-options">
                            <div className="contact-option">
                                <h4>Logistics Team</h4>
                                <p>+1-800-SHIPPING</p>
                                <span>Mon-Fri 8AM-6PM</span>
                            </div>
                            <div className="contact-option">
                                <h4>Track Shipment</h4>
                                <p>logistics@machinery.com</p>
                                <span>Real-time tracking</span>
                            </div>
                            <div className="contact-option">
                                <h4>Emergency Delivery</h4>
                                <p>+1-800-URGENT</p>
                                <span>24/7 emergency support</span>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}