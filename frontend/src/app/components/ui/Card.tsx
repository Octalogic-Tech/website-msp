import React from 'react';

interface CardProps {
    variant?: 'default' | 'elevated' | 'bordered' | 'primary';
    className?: string;
    children: React.ReactNode;
}

interface CardHeaderProps {
    className?: string;
    children: React.ReactNode;
}

interface CardBodyProps {
    className?: string;
    children: React.ReactNode;
}

interface CardFooterProps {
    className?: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> & {
    Header: React.FC<CardHeaderProps>;
    Body: React.FC<CardBodyProps>;
    Footer: React.FC<CardFooterProps>;
} = ({ variant = 'default', className = '', children }) => {
    const baseClasses = 'card';
    const variantClasses = {
        default: '',
        elevated: 'card-elevated',
        bordered: 'card-bordered',
        primary: 'card-primary'
    };

    const classes = [
        baseClasses,
        variantClasses[variant],
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

const CardHeader: React.FC<CardHeaderProps> = ({ className = '', children }) => {
    return (
        <div className={`card-header ${className}`}>
            {children}
        </div>
    );
};

const CardBody: React.FC<CardBodyProps> = ({ className = '', children }) => {
    return (
        <div className={`card-body ${className}`}>
            {children}
        </div>
    );
};

const CardFooter: React.FC<CardFooterProps> = ({ className = '', children }) => {
    return (
        <div className={`card-footer ${className}`}>
            {children}
        </div>
    );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;