'use client';

import React, { useState } from 'react';
import styles from '../contact.module.css';

export default function TechnicalSupport() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        equipmentModel: '',
        serialNumber: '',
        issueType: '',
        priority: '',
        description: '',
        attachments: null as FileList | null
    });

    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            attachments: e.target.files
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus('submitting');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Technical support request submitted:', formData);
            setSubmitStatus('success');

            // Reset form after successful submission
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    equipmentModel: '',
                    serialNumber: '',
                    issueType: '',
                    priority: '',
                    description: '',
                    attachments: null
                });
                setSubmitStatus('idle');
            }, 3000);
        } catch (error) {
            console.error('Error submitting technical support request:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Technical Support</h1>
                <p className={styles.intro}>
                    Get expert technical assistance for your construction equipment. Our certified
                    technicians are here to help resolve any issues quickly and efficiently.
                </p>

                <div className={styles.supportOptions}>
                    <div className={styles.supportCard}>
                        <h3>🔧 Emergency Support</h3>
                        <p>24/7 emergency technical support for critical equipment failures</p>
                        <strong>Call: 1-800-SUPPORT</strong>
                    </div>
                    <div className={styles.supportCard}>
                        <h3>💬 Live Chat</h3>
                        <p>Instant support during business hours (8 AM - 6 PM EST)</p>
                        <button className={styles.chatButton}>Start Live Chat</button>
                    </div>
                    <div className={styles.supportCard}>
                        <h3>📧 Email Support</h3>
                        <p>Submit detailed technical questions and receive expert responses</p>
                        <strong>support@constructpro.com</strong>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.supportForm}>
                    <h2>Submit Technical Support Request</h2>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="company">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="equipmentModel">Equipment Model *</label>
                            <input
                                type="text"
                                id="equipmentModel"
                                name="equipmentModel"
                                value={formData.equipmentModel}
                                onChange={handleInputChange}
                                placeholder="e.g., CAT 320D, Komatsu PC200"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="serialNumber">Serial Number</label>
                            <input
                                type="text"
                                id="serialNumber"
                                name="serialNumber"
                                value={formData.serialNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="issueType">Issue Type *</label>
                            <select
                                id="issueType"
                                name="issueType"
                                value={formData.issueType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Issue Type</option>
                                <option value="engine">Engine Problems</option>
                                <option value="hydraulic">Hydraulic Issues</option>
                                <option value="electrical">Electrical Problems</option>
                                <option value="transmission">Transmission Issues</option>
                                <option value="cooling">Cooling System</option>
                                <option value="tracks">Track/Undercarriage</option>
                                <option value="attachments">Attachment Issues</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="priority">Priority Level *</label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Priority</option>
                                <option value="low">Low - General Question</option>
                                <option value="medium">Medium - Non-Critical Issue</option>
                                <option value="high">High - Equipment Down</option>
                                <option value="critical">Critical - Safety Issue</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Problem Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={6}
                            placeholder="Please provide detailed information about the issue, including error codes, symptoms, and any troubleshooting steps already taken..."
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="attachments">Attachments</label>
                        <input
                            type="file"
                            id="attachments"
                            name="attachments"
                            onChange={handleFileChange}
                            multiple
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        />
                        <small>Upload photos, error logs, or documentation (Max 10MB per file)</small>
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={submitStatus === 'submitting'}
                    >
                        {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Support Request'}
                    </button>

                    {submitStatus === 'success' && (
                        <div className={styles.successMessage}>
                            ✅ Support request submitted successfully! We'll respond within 2 hours for high priority issues.
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className={styles.errorMessage}>
                            ❌ Failed to submit request. Please try again or call our support line.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}