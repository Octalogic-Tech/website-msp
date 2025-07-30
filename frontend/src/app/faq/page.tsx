'use client';

import React, { useState } from 'react';
import styles from './faq.module.css';

export default function FAQ() {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setOpenItems(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const faqCategories = [
        {
            category: "General Questions",
            items: [
                {
                    question: "What types of construction equipment do you sell?",
                    answer: "We offer a comprehensive range of construction equipment including excavators, bulldozers, wheel loaders, dump trucks, cranes, compactors, and specialized attachments from leading manufacturers like Caterpillar, Komatsu, John Deere, and Volvo."
                },
                {
                    question: "Do you sell both new and used equipment?",
                    answer: "Yes, we offer both new and certified pre-owned equipment. All used equipment undergoes thorough inspection and reconditioning to ensure reliability and performance."
                },
                {
                    question: "What are your business hours?",
                    answer: "Our showroom and parts department are open Monday-Friday 8:00 AM - 6:00 PM, Saturday 8:00 AM - 4:00 PM. Our service department operates Monday-Friday 7:00 AM - 7:00 PM. Emergency support is available 24/7."
                }
            ]
        },
        {
            category: "Purchasing & Financing",
            items: [
                {
                    question: "Do you offer financing options?",
                    answer: "Yes, we provide various financing solutions including equipment loans, leasing options, and rental-to-own programs. Our finance team works with multiple lenders to find the best rates and terms for your situation."
                },
                {
                    question: "Can I trade in my current equipment?",
                    answer: "Absolutely! We accept trade-ins and offer competitive valuations. Our team will assess your equipment and provide a fair market value that can be applied toward your new purchase."
                },
                {
                    question: "What is your delivery process?",
                    answer: "We offer delivery services within a 200-mile radius. Delivery fees vary based on distance and equipment size. For larger orders or distant locations, we can arrange specialized transport services."
                }
            ]
        },
        {
            category: "Service & Maintenance",
            items: [
                {
                    question: "Do you provide equipment maintenance services?",
                    answer: "Yes, we offer comprehensive maintenance services including preventive maintenance, repairs, inspections, and emergency service calls. Our certified technicians are trained on all major equipment brands."
                },
                {
                    question: "How often should I service my equipment?",
                    answer: "Service intervals vary by equipment type and usage. Generally, we recommend service every 250-500 operating hours or as specified in your equipment manual. We can create a custom maintenance schedule based on your usage patterns."
                },
                {
                    question: "Do you offer on-site service?",
                    answer: "Yes, we provide mobile service for equipment that cannot be transported to our facility. Our service trucks are fully equipped to handle most repairs and maintenance tasks at your job site."
                }
            ]
        },
        {
            category: "Parts & Warranty",
            items: [
                {
                    question: "Do you stock genuine OEM parts?",
                    answer: "Yes, we maintain an extensive inventory of genuine OEM parts from all major manufacturers. We also offer high-quality aftermarket alternatives when appropriate to help reduce costs."
                },
                {
                    question: "What warranty do you provide on new equipment?",
                    answer: "New equipment comes with full manufacturer warranty, typically 1-3 years depending on the brand and model. We also offer extended warranty options for additional coverage and peace of mind."
                },
                {
                    question: "How quickly can I get parts?",
                    answer: "Most common parts are in stock and available for immediate pickup or same-day delivery. Special order parts typically arrive within 1-3 business days. Emergency parts can often be expedited for next-day delivery."
                }
            ]
        },
        {
            category: "Rental & Leasing",
            items: [
                {
                    question: "Do you offer equipment rental?",
                    answer: "Yes, we offer short-term and long-term rental options for most equipment types. Rental periods range from daily to multi-year agreements with flexible terms to meet your project needs."
                },
                {
                    question: "What's included in the rental rate?",
                    answer: "Basic rental rates include the equipment and standard attachments. Additional services like delivery, operator training, maintenance, and insurance can be added based on your requirements."
                },
                {
                    question: "Can I rent-to-own equipment?",
                    answer: "Yes, we offer rent-to-own programs where a portion of your rental payments can be applied toward the purchase price if you decide to buy the equipment."
                }
            ]
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Frequently Asked Questions</h1>
                <p className={styles.intro}>
                    Find answers to common questions about our equipment, services, and policies.
                    If you don't find what you're looking for, please contact our support team.
                </p>

                <div className={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Search FAQs..."
                        className={styles.searchInput}
                    />
                </div>

                {faqCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className={styles.faqCategory}>
                        <h2 className={styles.categoryTitle}>{category.category}</h2>
                        <div className={styles.faqItems}>
                            {category.items.map((item, itemIndex) => {
                                const globalIndex = categoryIndex * 100 + itemIndex;
                                const isOpen = openItems.includes(globalIndex);

                                return (
                                    <div key={itemIndex} className={styles.faqItem}>
                                        <button
                                            className={`${styles.faqQuestion} ${isOpen ? styles.open : ''}`}
                                            onClick={() => toggleItem(globalIndex)}
                                        >
                                            <span>{item.question}</span>
                                            <span className={styles.toggleIcon}>
                                                {isOpen ? '−' : '+'}
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <div className={styles.faqAnswer}>
                                                <p>{item.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className={styles.contactSection}>
                    <h2>Still Have Questions?</h2>
                    <p>Can't find the answer you're looking for? Our support team is here to help.</p>
                    <div className={styles.contactOptions}>
                        <a href="/contact-us" className={styles.contactButton}>
                            Contact Us
                        </a>
                        <a href="/contact-us/technical-support" className={styles.contactButton}>
                            Technical Support
                        </a>
                        <a href="tel:1-800-SUPPORT" className={styles.contactButton}>
                            Call Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}