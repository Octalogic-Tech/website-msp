import React from 'react';

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'white' | 'dark';
    className?: string;
    text?: string;
}

const Loading: React.FC<LoadingProps> = ({
    size = 'md',
    color = 'primary',
    className = '',
    text
}) => {
    const sizeClasses = {
        sm: 'loading-spinner-sm',
        md: '',
        lg: 'loading-spinner-lg'
    };

    const colorClasses = {
        primary: 'loading-spinner-primary',
        white: 'loading-spinner-white',
        dark: 'loading-spinner-dark'
    };

    const classes = [
        'loading-spinner',
        sizeClasses[size],
        colorClasses[color],
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="loading-container">
            <div className={classes} aria-label="Loading"></div>
            {text && <p className="loading-text">{text}</p>}
        </div>
    );
};

export default Loading;