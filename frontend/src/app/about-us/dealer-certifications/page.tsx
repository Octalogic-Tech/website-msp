'use client';

import React from 'react';
import styles from '../about.module.css';

export default function DealerCertifications() {
    const certifications = [
        {
            name: "Caterpillar Authorized Dealer",
            description: "Certified to sell and service Caterpillar equipment with factory-trained technicians.",
            logo: "/images/certifications/cat-logo.png",
            validUntil: "2025"
        },
        {
            name: "Komatsu Certified Partner",
            description: "Official partner for Komatsu construction and mining equipment.",
            logo: "/images/certifications/komatsu-logo.png",
            validUntil: "2025"
        },
        {
            name: "John Deere Construction Dealer",
            description: "Authorized dealer for John Deere construction equipment and parts.",
            logo: "/images/certifications/jd-logo.png",
            validUntil: "2024"
        },
        {
            name: "ISO 9001:2015 Certified",
            description: "Quality management system certification ensuring consistent service delivery.",
            logo: "/images/certifications/iso-logo.png",
            validUntil: "2026"
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Dealer Certifications</h1>
                <p className={styles.intro}>
                    Our certifications demonstrate our commitment to excellence and ensure you receive
                    the highest quality products and services from authorized manufacturers.
                </p>

                <div className={styles.certificationsGrid}>
                    {certifications.map((cert, index) => (
                        <div key={index} className={styles.certificationCard}>
                            <div className={styles.certLogo}>
                                <img src={cert.logo} alt={cert.name} onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }} />
                            </div>
                            <h3>{cert.name}</h3>
                            <p>{cert.description}</p>
                            <div className={styles.validity}>
                                Valid until: {cert.validUntil}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.certificationBenefits}>
                    <h2>What Our Certifications Mean for You</h2>
                    <ul>
                        <li>✓ Genuine parts and equipment guaranteed</li>
                        <li>✓ Factory-trained technicians</li>
                        <li>✓ Warranty coverage and support</li>
                        <li>✓ Access to latest product updates</li>
                        <li>✓ Competitive pricing from authorized dealers</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}