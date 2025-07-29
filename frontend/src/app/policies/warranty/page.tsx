'use client';

import React from 'react';
import Link from 'next/link';
import '../policies.css';

export default function WarrantyPage() {
    return (
        <div className="policies-container">
            <div className="policies-header">
                <div className="header-content">
                    <h1>Warranty Policy</h1>
                    <p>Comprehensive warranty coverage for your peace of mind</p>
                </div>
            </div>

            <div className="policies-content">
                <nav className="policies-nav">
                    <Link href="/policies/warranty" className="nav-link active">
                        Warranty Policy
                    </Link>
                    <Link href="/policies/shipping" className="nav-link">
                        Shipping Policy
                    </Link>
                    <Link href="/policies/returns" className="nav-link">
                        Returns Policy
                    </Link>
                </nav>

                <main className="policies-main">
                    <section className="policy-section">
                        <h2>Warranty Coverage Overview</h2>
                        <p>
                            We stand behind the quality of our construction machinery and parts.
                            Our comprehensive warranty program ensures that you receive reliable
                            equipment that performs as expected.
                        </p>

                        <div className="warranty-types">
                            <div className="warranty-card">
                                <h3>New Equipment Warranty</h3>
                                <div className="warranty-duration">24 Months</div>
                                <ul>
                                    <li>Full manufacturer warranty coverage</li>
                                    <li>Parts and labor included</li>
                                    <li>On-site service available</li>
                                    <li>24/7 emergency support</li>
                                </ul>
                            </div>

                            <div className="warranty-card">
                                <h3>Used Equipment Warranty</h3>
                                <div className="warranty-duration">12 Months</div>
                                <ul>
                                    <li>Comprehensive inspection included</li>
                                    <li>Major components covered</li>
                                    <li>Parts replacement guarantee</li>
                                    <li>Technical support included</li>
                                </ul>
                            </div>

                            <div className="warranty-card">
                                <h3>Parts Warranty</h3>
                                <div className="warranty-duration">6-12 Months</div>
                                <ul>
                                    <li>Genuine OEM parts: 12 months</li>
                                    <li>Aftermarket parts: 6 months</li>
                                    <li>Installation support</li>
                                    <li>Defect replacement guarantee</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="policy-section">
                        <h2>What's Covered</h2>
                        <div className="coverage-grid">
                            <div className="coverage-item covered">
                                <h4>✅ Manufacturing Defects</h4>
                                <p>Any defects in materials or workmanship under normal use conditions.</p>
                            </div>
                            <div className="coverage-item covered">
                                <h4>✅ Component Failures</h4>
                                <p>Engine, transmission, hydraulic system, and electrical component failures.</p>
                            </div>
                            <div className="coverage-item covered">
                                <h4>✅ Parts Replacement</h4>
                                <p>Free replacement of defective parts during warranty period.</p>
                            </div>
                            <div className="coverage-item covered">
                                <h4>✅ Labor Costs</h4>
                                <p>Qualified technician labor for warranty repairs and maintenance.</p>
                            </div>
                            <div className="coverage-item not-covered">
                                <h4>❌ Normal Wear & Tear</h4>
                                <p>Regular maintenance items like filters, fluids, and wear parts.</p>
                            </div>
                            <div className="coverage-item not-covered">
                                <h4>❌ Misuse or Abuse</h4>
                                <p>Damage caused by improper operation or exceeding specifications.</p>
                            </div>
                            <div className="coverage-item not-covered">
                                <h4>❌ Environmental Damage</h4>
                                <p>Damage from floods, fires, accidents, or acts of nature.</p>
                            </div>
                            <div className="coverage-item not-covered">
                                <h4>❌ Unauthorized Repairs</h4>
                                <p>Repairs performed by non-authorized service providers.</p>
                            </div>
                        </div>
                    </section>

                    <section className="policy-section">
                        <h2>Warranty Claims Process</h2>
                        <div className="process-steps">
                            <div className="step">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h4>Contact Support</h4>
                                    <p>Call our warranty hotline at +1-800-WARRANTY or submit an online claim.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h4>Provide Information</h4>
                                    <p>Share your equipment serial number, purchase date, and issue description.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h4>Initial Assessment</h4>
                                    <p>Our technical team will assess the issue and determine warranty coverage.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-number">4</div>
                                <div className="step-content">
                                    <h4>Service Scheduling</h4>
                                    <p>We'll schedule on-site service or arrange for equipment pickup.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-number">5</div>
                                <div className="step-content">
                                    <h4>Repair & Return</h4>
                                    <p>Qualified technicians perform repairs and return equipment to service.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="policy-section">
                        <h2>Extended Warranty Options</h2>
                        <p>
                            Protect your investment with our extended warranty plans, available
                            for purchase at the time of equipment delivery or within the first
                            90 days of ownership.
                        </p>

                        <div className="extended-warranty">
                            <div className="extended-option">
                                <h4>Extended Coverage Plan</h4>
                                <p>Extends warranty coverage up to 5 years with comprehensive protection.</p>
                                <ul>
                                    <li>All major components covered</li>
                                    <li>Preventive maintenance included</li>
                                    <li>Priority service scheduling</li>
                                    <li>Loaner equipment available</li>
                                </ul>
                            </div>

                            <div className="extended-option">
                                <h4>Service Contract</h4>
                                <p>Complete maintenance and repair coverage with predictable costs.</p>
                                <ul>
                                    <li>All maintenance included</li>
                                    <li>Wear parts coverage</li>
                                    <li>Fluid analysis program</li>
                                    <li>Performance monitoring</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="policy-section">
                        <h2>Important Terms & Conditions</h2>
                        <div className="terms-list">
                            <div className="term-item">
                                <h4>Registration Required</h4>
                                <p>Equipment must be registered within 30 days of delivery to activate warranty.</p>
                            </div>
                            <div className="term-item">
                                <h4>Maintenance Records</h4>
                                <p>Regular maintenance must be performed and documented to maintain warranty coverage.</p>
                            </div>
                            <div className="term-item">
                                <h4>Authorized Service</h4>
                                <p>Warranty repairs must be performed by authorized service technicians.</p>
                            </div>
                            <div className="term-item">
                                <h4>Geographic Coverage</h4>
                                <p>Warranty service available in all 50 US states and Canada.</p>
                            </div>
                        </div>
                    </section>

                    <section className="policy-section contact-section">
                        <h2>Need Warranty Support?</h2>
                        <div className="contact-options">
                            <div className="contact-option">
                                <h4>Warranty Hotline</h4>
                                <p>+1-800-WARRANTY</p>
                                <span>Available 24/7</span>
                            </div>
                            <div className="contact-option">
                                <h4>Email Support</h4>
                                <p>warranty@machinery.com</p>
                                <span>Response within 2 hours</span>
                            </div>
                            <div className="contact-option">
                                <h4>Online Claims</h4>
                                <p>Submit warranty claims online</p>
                                <Link href="/warranty-claim" className="claim-link">File a Claim</Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}