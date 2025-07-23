import React from 'react';

interface BadgeProps {
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'gray';
    className?: string;
    children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
    variant = 'primary',
    className = '',
    children
}) => {
    const baseClasses = 'badge';
    const variantClasses = {
        primary: 'badge-primary',
        success: 'badge-success',
        warning: 'badge-warning',
        danger: 'badge-danger',
        gray: 'badge-gray'
    };

    const classes = [
        baseClasses,
        variantClasses[variant],
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={classes}>
            {children}
        </span>
    );
};

export default Badge;