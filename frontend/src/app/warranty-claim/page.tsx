'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WarrantyClaim() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        phone: '',
        company: '',
        equipmentModel: '',
        serialNumber: '',
        purchaseDate: '',
        dealerName: '',
        issueDescription: '',
        attachments: null as FileList | null
    });

    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            console.log('Warranty claim submitted:', formData);
            setSubmitStatus('success');

            // Redirect after successful submission
            setTimeout(() => {
                router.push('/contact-us/returns-warranty');
            }, 3000);
        } catch (error) {
            console.error('Error submitting warranty claim:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        }
    };

    const containerStyle: React.CSSProperties = {
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif'
    };

    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#212121'
    };

    const formStyle: React.CSSProperties = {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
    };

    const formGroupStyle: React.CSSProperties = {
        marginBottom: '1.5rem'
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '500',
        color: '#374151'
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        fontSize: '1rem',
        boxSizing: 'border-box'
    };

    const textareaStyle: React.CSSProperties = {
        ...inputStyle,
        minHeight: '120px',
        resize: 'vertical'
    };

    const buttonStyle: React.CSSProperties = {
        backgroundColor: '#f9a825',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '0.875rem 2rem',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    };

    const successStyle: React.CSSProperties = {
        backgroundColor: '#ecfdf5',
        color: '#065f46',
        padding: '1rem',
        borderRadius: '6px',
        border: '1px solid #a7f3d0',
        marginTop: '1rem'
    };

    const errorStyle: React.CSSProperties = {
        backgroundColor: '#fef2f2',
        color: '#991b1b',
        padding: '1rem',
        borderRadius: '6px',
        border: '1px solid #fecaca',
        marginTop: '1rem'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Warranty Claim Form</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#6b7280' }}>
                Submit your warranty claim and we'll process it as quickly as possible.
            </p>

            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <div style={formGroupStyle}>
                        <label htmlFor="customerName" style={labelStyle}>Customer Name *</label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={formGroupStyle}>
                        <label htmlFor="email" style={labelStyle}>Email Address *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={formGroupStyle}>
                        <label htmlFor="phone" style={labelStyle}>Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            style={inputStyle}
                        />
                    </div>

                    <div style={formGroupStyle}>
                        <label htmlFor="company" style={labelStyle}>Company</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            style={inputStyle}
                        />
                    </div>

                    <div style={formGroupStyle}>
                        <label htmlFor="equipmentModel" style={labelStyle}>Equipment Model *</label>
                        <input
                            type="text"
                            id="equipmentModel"
                            name="equipmentModel"
                            value={formData.equipmentModel}
                            onChange={handleInputChange}
                            style={inputStyle}
                            placeholder="e.g., CAT 320D, Komatsu PC200"
                            required
                        />
                    </div>

                    <div style={formGroupStyle}>
                        <label htmlFor="serialNumber" style={labelStyle}>Serial Number *</label>
                        <input
                            type="text"
                            id="serialNumber"
                            name="serialNumber"
                            value={formData.serialNumber}
                            onChange={handleInputChange}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={formGroupStyle}>
                        <label htmlFor="purchaseDate" style={labelStyle}>Purchase Date *</label>
                        <input
                            type="date"
                            id="purchaseDate"
                            name="purchaseDate"
                            value={formData.purchaseDate}
                            onChange={handleInputChange}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={formGroupStyle}>
                        <label htmlFor="dealerName" style={labelStyle}>Dealer Name</label>
                        <input
                            type="text"
                            id="dealerName"
                            name="dealerName"
                            value={formData.dealerName}
                            onChange={handleInputChange}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="issueDescription" style={labelStyle}>Issue Description *</label>
                    <textarea
                        id="issueDescription"
                        name="issueDescription"
                        value={formData.issueDescription}
                        onChange={handleInputChange}
                        style={textareaStyle}
                        placeholder="Please describe the issue in detail, including when it started, symptoms, and any error codes..."
                        required
                    />
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="attachments" style={labelStyle}>Supporting Documents</label>
                    <input
                        type="file"
                        id="attachments"
                        name="attachments"
                        onChange={handleFileChange}
                        style={inputStyle}
                        multiple
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    />
                    <small style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem', display: 'block' }}>
                        Upload photos, receipts, or other supporting documentation
                    </small>
                </div>

                <button
                    type="submit"
                    style={buttonStyle}
                    disabled={submitStatus === 'submitting'}
                >
                    {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Warranty Claim'}
                </button>

                {submitStatus === 'success' && (
                    <div style={successStyle}>
                        ✅ Warranty claim submitted successfully! We'll review your claim and contact you within 2-3 business days.
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div style={errorStyle}>
                        ❌ Failed to submit warranty claim. Please try again or contact our support team.
                    </div>
                )}
            </form>
        </div>
    );
}