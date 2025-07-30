'use client';

import React from 'react';
import styles from '../about.module.css';

export default function Partners() {
    const partners = [
        {
            name: "Caterpillar Inc.",
            category: "Equipment Manufacturer",
            description: "Global leader in construction and mining equipment, diesel and natural gas engines, industrial gas turbines and diesel-electric locomotives.",
            logo: "/images/partners/caterpillar.png",
            website: "https://www.caterpillar.com",
            partnership: "Authorized Dealer since 2010"
        },
        {
            name: "Komatsu Ltd.",
            category: "Heavy Machinery",
            description: "Japanese multinational corporation that manufactures construction, mining, forestry and military equipment.",
            logo: "/images/partners/komatsu.png",
            website: "https://www.komatsu.com",
            partnership: "Certified Partner since 2012"
        },
        {
            name: "John Deere",
            category: "Construction Equipment",
            description: "American corporation that manufactures agricultural machinery, heavy equipment, forestry machinery, diesel engines, drivetrains.",
            logo: "/images/partners/johndeere.png",
            website: "https://www.deere.com",
            partnership: "Authorized Dealer since 2015"
        },
        {
            name: "Volvo Construction Equipment",
            category: "Construction Machinery",
            description: "Swedish manufacturer of construction equipment including excavators, wheel loaders, articulated haulers and compactors.",
            logo: "/images/partners/volvo.png",
            website: "https://www.volvoce.com",
            partnership: "Strategic Partner since 2018"
        },
        {
            name: "Liebherr Group",
            category: "Heavy Equipment",
            description: "German-Swiss multinational equipment manufacturer based in Bulle, Switzerland, with its main production facilities in Germany.",
            logo: "/images/partners/liebherr.png",
            website: "https://www.liebherr.com",
            partnership: "Authorized Distributor since 2020"
        },
        {
            name: "Hitachi Construction Machinery",
            category: "Construction Equipment",
            description: "Japanese manufacturer of construction machinery including hydraulic excavators, wheel loaders and dump trucks.",
            logo: "/images/partners/hitachi.png",
            website: "https://www.hitachicm.com",
            partnership: "Regional Partner since 2019"
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Our Partners</h1>
                <p className={styles.intro}>
                    We work with industry-leading manufacturers to bring you the highest quality
                    construction equipment and machinery. Our partnerships ensure access to the
                    latest technology and comprehensive support.
                </p>

                <div className={styles.partnersGrid}>
                    {partners.map((partner, index) => (
                        <div key={index} className={styles.partnerCard}>
                            <div className={styles.partnerLogo}>
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                            <div className={styles.partnerInfo}>
                                <h3>{partner.name}</h3>
                                <span className={styles.category}>{partner.category}</span>
                                <p className={styles.description}>{partner.description}</p>
                                <div className={styles.partnership}>
                                    <strong>{partner.partnership}</strong>
                                </div>
                                <a
                                    href={partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.partnerLink}
                                >
                                    Visit Website →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.partnershipBenefits}>
                    <h2>Partnership Benefits</h2>
                    <div className={styles.benefitsGrid}>
                        <div className={styles.benefitItem}>
                            <h3>🏭 Direct Access</h3>
                            <p>Direct relationships with manufacturers ensure competitive pricing and priority support.</p>
                        </div>
                        <div className={styles.benefitItem}>
                            <h3>🔧 Technical Expertise</h3>
                            <p>Factory-trained technicians provide expert service and maintenance support.</p>
                        </div>
                        <div className={styles.benefitItem}>
                            <h3>📦 Genuine Parts</h3>
                            <p>Access to authentic OEM parts and components with full warranty coverage.</p>
                        </div>
                        <div className={styles.benefitItem}>
                            <h3>🚀 Latest Technology</h3>
                            <p>First access to new product launches and technological innovations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}