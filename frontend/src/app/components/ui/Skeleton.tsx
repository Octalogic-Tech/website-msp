import React from 'react';

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

interface SkeletonTextProps {
    lines?: number;
    className?: string;
}

interface SkeletonAvatarProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

interface SkeletonButtonProps {
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> & {
    Text: React.FC<SkeletonTextProps>;
    Avatar: React.FC<SkeletonAvatarProps>;
    Button: React.FC<SkeletonButtonProps>;
} = ({ className = '', width, height }) => {
    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;

    return (
        <div
            className={`skeleton ${className}`}
            style={style}
            aria-label="Loading..."
        />
    );
};

const SkeletonText: React.FC<SkeletonTextProps> = ({ lines = 3, className = '' }) => {
    return (
        <div className={className}>
            {Array.from({ length: lines }, (_, index) => (
                <div
                    key={index}
                    className="skeleton skeleton-text"
                    style={{ width: index === lines - 1 ? '60%' : '100%' }}
                />
            ))}
        </div>
    );
};

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    return (
        <div className={`skeleton skeleton-avatar ${sizeClasses[size]} ${className}`} />
    );
};

const SkeletonButton: React.FC<SkeletonButtonProps> = ({ className = '' }) => {
    return (
        <div className={`skeleton skeleton-button ${className}`} />
    );
};

Skeleton.Text = SkeletonText;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Button = SkeletonButton;

export default Skeleton;