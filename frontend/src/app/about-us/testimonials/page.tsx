'use client';

import React from 'react';
import styles from '../about.module.css';

export default function Testimonials() {
    const testimonials = [
        {
            name: "Mike Johnson",
            company: "Johnson Construction LLC",
            role: "Project Manager",
            content: "ConstructPro has been our go-to supplier for over 5 years. Their equipment quality and customer service are unmatched in the industry.",
            rating: 5,
            image: "/images/testimonials/mike-j.jpg"
        },
        {
            name: "Sarah Chen",
            company: "Metro Infrastructure",
            role: "Operations Director",
            content: "The parts availability and quick delivery have saved us countless hours on job sites. Their technical support team is incredibly knowledgeable.",
            rating: 5,
            image: "/images/testimonials/sarah-c.jpg"
        },
        {
            name: "Robert Martinez",
            company: "Martinez Heavy Equipment",
            role: "Owner",
            content: "From excavators to bulldozers, ConstructPro provides reliable machinery that keeps our projects on schedule and within budget.",
            rating: 5,
            image: "/images/testimonials/robert-m.jpg"
        },
        {
            name: "Lisa Thompson",
            company: "Thompson Contractors",
            role: "Fleet Manager",
            content: "Their maintenance services and genuine parts have significantly reduced our equipment downtime. Highly recommended!",
            rating: 5,
            image: "/images/testimonials/lisa-t.jpg"
        }
    ];

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
                ★
            </span>
        ));
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Customer Testimonials</h1>
                <p className={styles.intro}>
                    Don't just take our word for it. Here's what our valued customers have to say
                    about their experience with ConstructPro.
                </p>

                <div className={styles.testimonialsGrid}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={styles.testimonialCard}>
                            <div className={styles.testimonialHeader}>
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className={styles.testimonialImage}
                                    onError={(e) => {
                                        e.currentTarget.src = '/images/default-avatar.png';
                                    }}
                                />
                                <div className={styles.testimonialInfo}>
                                    <h3>{testimonial.name}</h3>
                                    <p className={styles.company}>{testimonial.company}</p>
                                    <p className={styles.role}>{testimonial.role}</p>
                                </div>
                            </div>
                            <div className={styles.rating}>
                                {renderStars(testimonial.rating)}
                            </div>
                            <blockquote className={styles.testimonialContent}>
                                "{testimonial.content}&quot;
                            </blockquote>
                        </div>
                    ))}
                </div>

                <div className={styles.statsSection}>
                    <h2>Our Track Record</h2>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <h3>500+</h3>
                            <p>Satisfied Customers</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>98%</h3>
                            <p>Customer Satisfaction</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>15+</h3>
                            <p>Years of Experience</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>24/7</h3>
                            <p>Support Available</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}