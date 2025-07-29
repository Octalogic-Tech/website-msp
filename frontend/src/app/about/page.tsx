'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './about.css';

export default function AboutPage() {
    return (
        <div className="about-container">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>Building Tomorrow's Infrastructure</h1>
                        <p>
                            For over 25 years, we've been the trusted partner for construction
                            professionals worldwide, providing premium machinery and exceptional service.
                        </p>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">25+</span>
                                <span className="stat-label">Years Experience</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">10,000+</span>
                                <span className="stat-label">Machines Sold</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Countries Served</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-image">
                        <Image
                            src="/images/warehouse-hero.jpg"
                            alt="Our modern warehouse facility"
                            width={600}
                            height={400}
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="our-story">
                <div className="section-container">
                    <div className="story-content">
                        <div className="story-text">
                            <h2>Our Story</h2>
                            <p>
                                Founded in 1998, our company began as a small family business with a
                                simple mission: to provide construction professionals with reliable,
                                high-quality machinery at competitive prices.
                            </p>
                            <p>
                                Today, we've grown into one of the leading suppliers of construction
                                equipment globally, but our core values remain unchanged. We believe
                                in building lasting relationships with our customers through exceptional
                                service, technical expertise, and unwavering commitment to quality.
                            </p>
                            <div className="story-highlights">
                                <div className="highlight">
                                    <h3>Quality First</h3>
                                    <p>Every machine undergoes rigorous inspection and testing</p>
                                </div>
                                <div className="highlight">
                                    <h3>Expert Support</h3>
                                    <p>Our technical team provides 24/7 support and maintenance</p>
                                </div>
                                <div className="highlight">
                                    <h3>Global Reach</h3>
                                    <p>Serving customers across 50+ countries worldwide</p>
                                </div>
                            </div>
                        </div>
                        <div className="story-image">
                            <Image
                                src="/images/company-history.jpg"
                                alt="Company founders and early team"
                                width={500}
                                height={350}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities */}
            <section className="facilities">
                <div className="section-container">
                    <h2>Our Facilities</h2>
                    <div className="facilities-grid">
                        <div className="facility-card">
                            <div className="facility-image">
                                <Image
                                    src="/images/warehouse-interior.jpg"
                                    alt="Modern warehouse with organized machinery"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="facility-content">
                                <h3>Main Warehouse</h3>
                                <p>
                                    Our 200,000 sq ft climate-controlled warehouse houses over
                                    1,000 machines and 50,000 spare parts, ensuring quick delivery
                                    and optimal storage conditions.
                                </p>
                                <ul>
                                    <li>Climate-controlled environment</li>
                                    <li>Advanced inventory management</li>
                                    <li>24/7 security monitoring</li>
                                    <li>Automated sorting systems</li>
                                </ul>
                            </div>
                        </div>

                        <div className="facility-card">
                            <div className="facility-image">
                                <Image
                                    src="/images/service-center.jpg"
                                    alt="Technical service center with machinery"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="facility-content">
                                <h3>Service Center</h3>
                                <p>
                                    Our state-of-the-art service center is equipped with the latest
                                    diagnostic tools and staffed by certified technicians with
                                    decades of experience.
                                </p>
                                <ul>
                                    <li>Certified technicians</li>
                                    <li>Advanced diagnostic equipment</li>
                                    <li>Complete refurbishment services</li>
                                    <li>Quality assurance testing</li>
                                </ul>
                            </div>
                        </div>

                        <div className="facility-card">
                            <div className="facility-image">
                                <Image
                                    src="/images/parts-department.jpg"
                                    alt="Organized parts department with shelving"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="facility-content">
                                <h3>Parts Department</h3>
                                <p>
                                    Our comprehensive parts department stocks genuine OEM parts
                                    and high-quality aftermarket alternatives for all major
                                    machinery brands.
                                </p>
                                <ul>
                                    <li>50,000+ parts in stock</li>
                                    <li>Genuine OEM parts</li>
                                    <li>Same-day shipping available</li>
                                    <li>Global parts network</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="team">
                <div className="section-container">
                    <h2>Leadership Team</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <div className="member-image">
                                <Image
                                    src="/images/ceo-portrait.jpg"
                                    alt="CEO John Smith"
                                    width={200}
                                    height={200}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="member-info">
                                <h3>John Smith</h3>
                                <p className="member-title">Chief Executive Officer</p>
                                <p className="member-bio">
                                    With 30+ years in the construction industry, John leads our
                                    company with a vision for innovation and customer excellence.
                                </p>
                            </div>
                        </div>

                        <div className="team-member">
                            <div className="member-image">
                                <Image
                                    src="/images/cto-portrait.jpg"
                                    alt="CTO Sarah Johnson"
                                    width={200}
                                    height={200}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="member-info">
                                <h3>Sarah Johnson</h3>
                                <p className="member-title">Chief Technology Officer</p>
                                <p className="member-bio">
                                    Sarah drives our digital transformation and ensures we stay
                                    at the forefront of industry technology trends.
                                </p>
                            </div>
                        </div>

                        <div className="team-member">
                            <div className="member-image">
                                <Image
                                    src="/images/operations-director.jpg"
                                    alt="Operations Director Mike Chen"
                                    width={200}
                                    height={200}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="member-info">
                                <h3>Mike Chen</h3>
                                <p className="member-title">Director of Operations</p>
                                <p className="member-bio">
                                    Mike oversees our global operations, ensuring efficient
                                    logistics and exceptional customer service worldwide.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="values">
                <div className="section-container">
                    <h2>Our Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <h3>Excellence</h3>
                            <p>
                                We strive for excellence in everything we do, from the quality
                                of our machinery to the level of service we provide.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                                </svg>
                            </div>
                            <h3>Integrity</h3>
                            <p>
                                Honesty and transparency guide all our business relationships
                                and decision-making processes.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                                </svg>
                            </div>
                            <h3>Innovation</h3>
                            <p>
                                We continuously invest in new technologies and processes to
                                better serve our customers and improve efficiency.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7H16c-.8 0-1.5.7-1.5 1.5v6c0 .8.7 1.5 1.5 1.5h1v6h2zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4z" />
                                </svg>
                            </div>
                            <h3>Partnership</h3>
                            <p>
                                We build long-term partnerships with our customers, suppliers,
                                and employees based on mutual respect and shared success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <div className="section-container">
                    <div className="cta-content">
                        <h2>Ready to Work Together?</h2>
                        <p>
                            Join thousands of satisfied customers who trust us for their
                            construction equipment needs.
                        </p>
                        <div className="cta-buttons">
                            <Link href="/shop" className="cta-btn primary">
                                Browse Equipment
                            </Link>
                            <Link href="/contact" className="cta-btn secondary">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}