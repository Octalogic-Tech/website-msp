'use client';

import React, { useState } from 'react';
import styles from '../contact.module.css';

export default function ReturnsWarranty() {
    const [activeTab, setActiveTab] = useState<'returns' | 'warranty'>('returns');

    const [returnForm, setReturnForm] = useState({
        orderNumber: '',
        email: '',
        reason: '',
        description: '',
        condition: ''
    });

    const [warrantyForm, setWarrantyForm] = useState({
        serialNumber: '',
        model: '',
        purchaseDate: '',
        email: '',
        issueDescription: '',
        attachments: null as FileList | null
    });

    const handleReturnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Return request submitted:', returnForm);
        // Handle return request submission
    };

    const handleWarrantySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Warranty claim submitted:', warrantyForm);
        // Handle warranty claim submission
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Returns & Warranty</h1>
                <p className={styles.intro}>
                    We stand behind our products with comprehensive return policies and warranty coverage.
                    Find information about returns, exchanges, and warranty claims below.
                </p>

                <div className={styles.tabNavigation}>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'returns' ? styles.active : ''}`}
                        onClick={() => setActiveTab('returns')}
                    >
                        Returns & Exchanges
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'warranty' ? styles.active : ''}`}
                        onClick={() => setActiveTab('warranty')}
                    >
                        Warranty Claims
                    </button>
                </div>

                {activeTab === 'returns' && (
                    <div className={styles.tabContent}>
                        <div className={styles.policySection}>
                            <h2>Return Policy</h2>
                            <div className={styles.policyGrid}>
                                <div className={styles.policyCard}>
                                    <h3>🔄 Parts Returns</h3>
                                    <ul>
                                        <li>30-day return window</li>
                                        <li>Must be in original packaging</li>
                                        <li>Unused and in resalable condition</li>
                                        <li>15% restocking fee may apply</li>
                                    </ul>
                                </div>
                                <div className={styles.policyCard}>
                                    <h3>🚛 Equipment Returns</h3>
                                    <ul>
                                        <li>7-day return window for new equipment</li>
                                        <li>Must be in original condition</li>
                                        <li>Less than 10 operating hours</li>
                                        <li>Return shipping costs apply</li>
                                    </ul>
                                </div>
                                <div className={styles.policyCard}>
                                    <h3>❌ Non-Returnable Items</h3>
                                    <ul>
                                        <li>Custom or special order items</li>
                                        <li>Fluids and consumables</li>
                                        <li>Used or damaged items</li>
                                        <li>Items over 30 days old</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleReturnSubmit} className={styles.returnForm}>
                            <h3>Submit Return Request</h3>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="orderNumber">Order Number *</label>
                                    <input
                                        type="text"
                                        id="orderNumber"
                                        value={returnForm.orderNumber}
                                        onChange={(e) => setReturnForm({ ...returnForm, orderNumber: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="returnEmail">Email Address *</label>
                                    <input
                                        type="email"
                                        id="returnEmail"
                                        value={returnForm.email}
                                        onChange={(e) => setReturnForm({ ...returnForm, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="reason">Reason for Return *</label>
                                <select
                                    id="reason"
                                    value={returnForm.reason}
                                    onChange={(e) => setReturnForm({ ...returnForm, reason: e.target.value })}
                                    required
                                >
                                    <option value="">Select Reason</option>
                                    <option value="defective">Defective/Damaged</option>
                                    <option value="wrong-item">Wrong Item Received</option>
                                    <option value="not-needed">No Longer Needed</option>
                                    <option value="not-as-described">Not as Described</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="condition">Item Condition *</label>
                                <select
                                    id="condition"
                                    value={returnForm.condition}
                                    onChange={(e) => setReturnForm({ ...returnForm, condition: e.target.value })}
                                    required
                                >
                                    <option value="">Select Condition</option>
                                    <option value="unopened">Unopened/Original Packaging</option>
                                    <option value="opened-unused">Opened but Unused</option>
                                    <option value="lightly-used">Lightly Used</option>
                                    <option value="damaged">Damaged</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    value={returnForm.description}
                                    onChange={(e) => setReturnForm({ ...returnForm, description: e.target.value })}
                                    rows={4}
                                    placeholder="Please provide additional details about your return request..."
                                />
                            </div>

                            <button type="submit" className={styles.submitButton}>
                                Submit Return Request
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === 'warranty' && (
                    <div className={styles.tabContent}>
                        <div className={styles.warrantyInfo}>
                            <h2>Warranty Coverage</h2>
                            <div className={styles.warrantyGrid}>
                                <div className={styles.warrantyCard}>
                                    <h3>🆕 New Equipment</h3>
                                    <ul>
                                        <li>Full manufacturer warranty (1-3 years)</li>
                                        <li>Covers defects in materials and workmanship</li>
                                        <li>Includes parts and labor</li>
                                        <li>Extended warranty options available</li>
                                    </ul>
                                </div>
                                <div className={styles.warrantyCard}>
                                    <h3>🔧 Parts Warranty</h3>
                                    <ul>
                                        <li>OEM parts: 12 months</li>
                                        <li>Aftermarket parts: 6-12 months</li>
                                        <li>Labor warranty: 90 days</li>
                                        <li>Covers manufacturing defects</li>
                                    </ul>
                                </div>
                                <div className={styles.warrantyCard}>
                                    <h3>🛠️ Service Warranty</h3>
                                    <ul>
                                        <li>90-day warranty on repairs</li>
                                        <li>Covers workmanship issues</li>
                                        <li>Free re-repair if issue persists</li>
                                        <li>Parts and labor included</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleWarrantySubmit} className={styles.warrantyForm}>
                            <h3>Submit Warranty Claim</h3>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="serialNumber">Serial Number *</label>
                                    <input
                                        type="text"
                                        id="serialNumber"
                                        value={warrantyForm.serialNumber}
                                        onChange={(e) => setWarrantyForm({ ...warrantyForm, serialNumber: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="model">Equipment/Part Model *</label>
                                    <input
                                        type="text"
                                        id="model"
                                        value={warrantyForm.model}
                                        onChange={(e) => setWarrantyForm({ ...warrantyForm, model: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="purchaseDate">Purchase Date *</label>
                                    <input
                                        type="date"
                                        id="purchaseDate"
                                        value={warrantyForm.purchaseDate}
                                        onChange={(e) => setWarrantyForm({ ...warrantyForm, purchaseDate: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="warrantyEmail">Email Address *</label>
                                    <input
                                        type="email"
                                        id="warrantyEmail"
                                        value={warrantyForm.email}
                                        onChange={(e) => setWarrantyForm({ ...warrantyForm, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="issueDescription">Issue Description *</label>
                                <textarea
                                    id="issueDescription"
                                    value={warrantyForm.issueDescription}
                                    onChange={(e) => setWarrantyForm({ ...warrantyForm, issueDescription: e.target.value })}
                                    rows={6}
                                    placeholder="Please describe the issue in detail, including when it started, symptoms, and any error codes..."
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="warrantyAttachments">Supporting Documents</label>
                                <input
                                    type="file"
                                    id="warrantyAttachments"
                                    onChange={(e) => setWarrantyForm({ ...warrantyForm, attachments: e.target.files })}
                                    multiple
                                    accept=".jpg,.jpeg,.png,.pdf"
                                />
                                <small>Upload photos, receipts, or other supporting documentation</small>
                            </div>

                            <button type="submit" className={styles.submitButton}>
                                Submit Warranty Claim
                            </button>
                        </form>
                    </div>
                )}

                <div className={styles.contactInfo}>
                    <h2>Need Help?</h2>
                    <p>Our customer service team is here to assist with returns and warranty questions.</p>
                    <div className={styles.contactDetails}>
                        <div>📞 <strong>Phone:</strong> 1-800-RETURNS</div>
                        <div>📧 <strong>Email:</strong> returns@constructpro.com</div>
                        <div>🕒 <strong>Hours:</strong> Monday-Friday 8 AM - 6 PM EST</div>
                    </div>
                </div>
            </div>
        </div>
    );
}