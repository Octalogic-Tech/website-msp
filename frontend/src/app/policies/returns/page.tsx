'use client';

import React from 'react';
import Link from 'next/link';
import '../policies.css';

export default function ReturnsPolicy() {
    return (
        <div className="policies-container">
            <div className="policies-content">
                <nav className="policies-nav">
                    <Link href="/policies/warranty" className="nav-link">
                        Warranty Policy
                    </Link>
                    <Link href="/policies/shipping" className="nav-link">
                        Shipping Policy
                    </Link>
                    <Link href="/policies/returns" className="nav-link active">
                        Returns Policy
                    </Link>
                </nav>

                <div className="policy-content">
                    <h1>Returns Policy</h1>
                    <p className="policy-intro">
                        At ConstructPro, we want you to be completely satisfied with your purchase.
                        Our returns policy is designed to be fair and straightforward.
                    </p>

                    <section className="policy-section">
                        <h2>Return Window</h2>
                        <ul>
                            <li><strong>Parts & Accessories:</strong> 30 days from delivery date</li>
                            <li><strong>New Equipment:</strong> 7 days from delivery date</li>
                            <li><strong>Used Equipment:</strong> 3 days from delivery date</li>
                        </ul>
                    </section>

                    <section className="policy-section">
                        <h2>Return Conditions</h2>
                        <h3>Eligible for Return:</h3>
                        <ul>
                            <li>Items in original, unused condition</li>
                            <li>Original packaging and documentation included</li>
                            <li>Equipment with less than 10 operating hours</li>
                            <li>Parts in resalable condition</li>
                        </ul>

                        <h3>Not Eligible for Return:</h3>
                        <ul>
                            <li>Custom or special order items</li>
                            <li>Fluids, oils, and consumable materials</li>
                            <li>Items damaged by misuse or normal wear</li>
                            <li>Equipment with modifications or alterations</li>
                        </ul>
                    </section>

                    <section className="policy-section">
                        <h2>Return Process</h2>
                        <ol>
                            <li><strong>Contact Us:</strong> Call 1-800-RETURNS or email returns@constructpro.com</li>
                            <li><strong>Return Authorization:</strong> Obtain a Return Merchandise Authorization (RMA) number</li>
                            <li><strong>Package Items:</strong> Securely package items with RMA number clearly marked</li>
                            <li><strong>Ship Items:</strong> Use provided return shipping label or arrange pickup</li>
                            <li><strong>Processing:</strong> Allow 5-7 business days for inspection and refund processing</li>
                        </ol>
                    </section>

                    <section className="policy-section">
                        <h2>Refund Information</h2>
                        <ul>
                            <li><strong>Refund Method:</strong> Original payment method</li>
                            <li><strong>Processing Time:</strong> 5-10 business days after approval</li>
                            <li><strong>Restocking Fee:</strong> 15% may apply to certain items</li>
                            <li><strong>Return Shipping:</strong> Customer responsibility unless item is defective</li>
                        </ul>
                    </section>

                    <section className="policy-section">
                        <h2>Exchanges</h2>
                        <p>
                            We offer exchanges for defective items or incorrect shipments.
                            Contact our customer service team to arrange an exchange.
                        </p>
                    </section>

                    <section className="policy-section">
                        <h2>Contact Information</h2>
                        <div className="contact-info">
                            <p><strong>Returns Department:</strong></p>
                            <p>Phone: 1-800-RETURNS</p>
                            <p>Email: returns@constructpro.com</p>
                            <p>Hours: Monday-Friday 8:00 AM - 6:00 PM EST</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}