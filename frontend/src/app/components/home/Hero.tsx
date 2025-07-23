import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './hero.css';

interface HeroProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({
    title = "Industrial Machinery & Equipment",
    subtitle = "Quality construction equipment, parts, and service for professionals",
    ctaText = "Shop Now",
    ctaLink = "/shop",
    secondaryCtaText = "Request Quote",
    secondaryCtaLink = "/quote",
    backgroundImage = "/images/hero-background.jpg"
}) => {
    return (
        <section className="hero">
            <div className="hero-background">
                {backgroundImage && (
                    <Image
                        src={backgroundImage}
                        alt="Industrial machinery"
                        fill
                        priority
                        sizes="100vw"
                        style={{ objectFit: 'cover' }}
                        className="hero-image"
                    />
                )}
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">{title}</h1>
                    <p className="hero-subtitle">{subtitle}</p>

                    <div className="hero-actions">
                        <Link href={ctaLink} className="hero-cta primary">
                            {ctaText}
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>

                        <Link href={secondaryCtaLink} className="hero-cta secondary">
                            {secondaryCtaText}
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </Link>
                    </div>

                    <div className="hero-features">
                        <div className="hero-feature">
                            <div className="feature-icon">
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="feature-text">Fast Delivery</div>
                        </div>

                        <div className="hero-feature">
                            <div className="feature-icon">
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div className="feature-text">Quality Guarantee</div>
                        </div>

                        <div className="hero-feature">
                            <div className="feature-icon">
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="feature-text">Secure Shopping</div>
                        </div>

                        <div className="hero-feature">
                            <div className="feature-icon">
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div className="feature-text">24/7 Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;