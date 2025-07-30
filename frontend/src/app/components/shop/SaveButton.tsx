'use client';

import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSavedProducts } from '../../contexts/SavedProductsContext';
import './SaveButton.css';

interface SaveButtonProps {
    productId: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'icon' | 'button';
    showText?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
    productId,
    className = '',
    size = 'md',
    variant = 'icon',
    showText = false,
}) => {
    const { isProductSaved, toggleSaveProduct } = useSavedProducts();
    const isSaved = isProductSaved(productId);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await toggleSaveProduct(productId);
    };

    const getIconSize = () => {
        switch (size) {
            case 'sm':
                return 12;
            case 'lg':
                return 20;
            default:
                return 16;
        }
    };

    // Build CSS classes
    const buttonClasses = [
        'save-button',
        `save-button--${variant}`,
        `save-button--${size}`,
        isSaved ? 'save-button--saved' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            onClick={handleClick}
            className={buttonClasses}
            title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
            {isSaved ? (
                <FaHeart size={getIconSize()} />
            ) : (
                <FaRegHeart size={getIconSize()} />
            )}
            {showText && (
                <span className="save-button__text">
                    {isSaved ? 'Saved' : 'Save to Wishlist'}
                </span>
            )}
        </button>
    );
};

export default SaveButton;