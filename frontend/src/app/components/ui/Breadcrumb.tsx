import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
    return (
        <div className={`breadcrumb-container ${className}`}>
            <div className="breadcrumb-wrapper">
                <nav className="breadcrumb-nav" aria-label="Breadcrumb">
                    <Link href="/">Home</Link>
                    <span className="breadcrumb-separator">/</span>

                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        return isLast ? (
                            <span key={index} className="breadcrumb-current" aria-current="page">
                                {item.label}
                            </span>
                        ) : (
                            <React.Fragment key={index}>
                                {item.href ? (
                                    <Link href={item.href}>{item.label}</Link>
                                ) : (
                                    <span>{item.label}</span>
                                )}
                                <span className="breadcrumb-separator">/</span>
                            </React.Fragment>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default Breadcrumb;