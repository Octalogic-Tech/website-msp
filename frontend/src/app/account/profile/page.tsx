'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import styles from './profile.module.css';

interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    jobTitle: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    website: string;
    taxId: string;
    preferredContact: 'email' | 'phone';
    marketingEmails: boolean;
    orderUpdates: boolean;
    quoteNotifications: boolean;
}

const ProfileSettings = () => {
    const { user, updateProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('personal');
    const [profileData, setProfileData] = useState<ProfileData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        website: '',
        taxId: '',
        preferredContact: 'email',
        marketingEmails: true,
        orderUpdates: true,
        quoteNotifications: true
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Initialize profile data from user context
    useEffect(() => {
        if (user) {
            setProfileData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                company: user.company || '',
                jobTitle: user.jobTitle || '',
                address: user.address || '',
                city: user.city || '',
                state: user.state || '',
                zipCode: user.zipCode || '',
                country: user.country || '',
                website: user.website || '',
                taxId: user.taxId || '',
                preferredContact: (user.preferredContact as 'email' | 'phone') || 'email',
                marketingEmails: user.marketingEmails ?? true,
                orderUpdates: user.orderUpdates ?? true,
                quoteNotifications: user.quoteNotifications ?? true
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await updateProfile(profileData);
            setMessage('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            setMessage('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: '👤' },
        { id: 'company', label: 'Company Details', icon: '🏢' },
        { id: 'preferences', label: 'Preferences', icon: '⚙️' },
        { id: 'security', label: 'Security', icon: '🔒' }
    ];

    return (
        <div className={styles.profileSettings}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerInfo}>
                        <h1>Profile Settings</h1>
                        <p>Manage your account information and preferences</p>
                    </div>
                    <Link href="/account" className={styles.backButton}>
                        ← Back to Account
                    </Link>
                </div>

                <div className={styles.layout}>
                    {/* Sidebar Navigation */}
                    <div className={styles.sidebar}>
                        <div className={styles.sidebarContent}>
                            <nav className={styles.tabNavigation}>
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
                                    >
                                        <span className={styles.tabIcon}>{tab.icon}</span>
                                        <span className={styles.tabLabel}>{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className={styles.mainContent}>
                        <div className={styles.contentPadding}>
                            {message && (
                                <div className={`${styles.message} ${message.includes('successfully') ? styles.messageSuccess : styles.messageError}`}>
                                    <span>{message.includes('successfully') ? '✅' : '❌'}</span>
                                    {message}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className={styles.form}>
                                {activeTab === 'personal' && (
                                    <div className={`${styles.formSection} ${styles.fadeIn}`}>
                                        <h2 className={styles.sectionTitle}>Personal Information</h2>

                                        <div className={styles.formGrid}>
                                            <div className={styles.formGroup}>
                                                <label className={styles.formLabel}>First Name *</label>
                                                <input
                                                    className={styles.formInput}
                                                    name="firstName"
                                                    type="text"
                                                    value={profileData.firstName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label className={styles.formLabel}>Last Name *</label>
                                                <input
                                                    className={styles.formInput}
                                                    name="lastName"
                                                    type="text"
                                                    value={profileData.lastName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Email Address *</label>
                                            <input
                                                className={styles.formInput}
                                                name="email"
                                                type="email"
                                                value={profileData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Phone Number *</label>
                                            <input
                                                className={styles.formInput}
                                                name="phone"
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Job Title</label>
                                            <input
                                                className={styles.formInput}
                                                name="jobTitle"
                                                type="text"
                                                value={profileData.jobTitle}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'company' && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold mb-4">Company Details</h2>

                                        <FormInput
                                            label="Company Name"
                                            name="company"
                                            type="text"
                                            value={profileData.company}
                                            onChange={handleInputChange}
                                            required
                                        />

                                        <FormInput
                                            label="Website"
                                            name="website"
                                            type="url"
                                            value={profileData.website}
                                            onChange={handleInputChange}
                                        />

                                        <FormInput
                                            label="Tax ID"
                                            name="taxId"
                                            type="text"
                                            value={profileData.taxId}
                                            onChange={handleInputChange}
                                        />

                                        <FormInput
                                            label="Address"
                                            name="address"
                                            type="text"
                                            value={profileData.address}
                                            onChange={handleInputChange}
                                            required
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <FormInput
                                                label="City"
                                                name="city"
                                                type="text"
                                                value={profileData.city}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <FormInput
                                                label="State"
                                                name="state"
                                                type="text"
                                                value={profileData.state}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <FormInput
                                                label="ZIP Code"
                                                name="zipCode"
                                                type="text"
                                                value={profileData.zipCode}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <FormInput
                                            label="Country"
                                            name="country"
                                            type="text"
                                            value={profileData.country}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                )}

                                {activeTab === 'preferences' && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold mb-4">Communication Preferences</h2>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Preferred Contact Method
                                            </label>
                                            <select
                                                name="preferredContact"
                                                value={profileData.preferredContact}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                            >
                                                <option value="email">Email</option>
                                                <option value="phone">Phone</option>
                                            </select>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Email Notifications</h3>

                                            <div className="space-y-3">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="orderUpdates"
                                                        checked={profileData.orderUpdates}
                                                        onChange={handleInputChange}
                                                        className="mr-3"
                                                    />
                                                    <span className="text-sm">Order updates and shipping notifications</span>
                                                </label>

                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="quoteNotifications"
                                                        checked={profileData.quoteNotifications}
                                                        onChange={handleInputChange}
                                                        className="mr-3"
                                                    />
                                                    <span className="text-sm">Quote request updates</span>
                                                </label>

                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="marketingEmails"
                                                        checked={profileData.marketingEmails}
                                                        onChange={handleInputChange}
                                                        className="mr-3"
                                                    />
                                                    <span className="text-sm">Marketing emails and product updates</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'security' && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold mb-4">Security Settings</h2>

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Change Password</h3>

                                            <FormInput
                                                label="Current Password"
                                                name="currentPassword"
                                                type="password"
                                                placeholder="Enter current password"
                                            />

                                            <FormInput
                                                label="New Password"
                                                name="newPassword"
                                                type="password"
                                                placeholder="Enter new password"
                                            />

                                            <FormInput
                                                label="Confirm New Password"
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="Confirm new password"
                                            />
                                        </div>

                                        <div className="border-t pt-6">
                                            <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Add an extra layer of security to your account
                                            </p>
                                            <Button variant="outline">Enable 2FA</Button>
                                        </div>

                                        <div className="border-t pt-6">
                                            <h3 className="text-lg font-medium mb-4 text-red-600">Danger Zone</h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Once you delete your account, there is no going back. Please be certain.
                                            </p>
                                            <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                                                Delete Account
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                <div className={styles.formActions}>
                                    <button
                                        type="button"
                                        className={`${styles.button} ${styles.buttonSecondary}`}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={`${styles.button} ${styles.buttonPrimary}`}
                                        disabled={loading}
                                    >
                                        {loading && <span className={styles.loadingSpinner}></span>}
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;