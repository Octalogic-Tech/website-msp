'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useQuote } from './QuoteContext';

interface MobileCTAProps {
    showOnPages?: string[];
}

const MobileCTA: React.FC<MobileCTAProps> = ({
    showOnPages = ['/shop', '/parts-finder']
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const { itemCount: cartCount } = useCart();
    const { itemCount: quoteCount } = useQuote();

    useEffect(() => {
        const checkVisibility = () => {
            const isMobile = window.innerWidth <= 768;
            const isOnTargetPage = showOnPages.some(page =>
                window.location.pathname.startsWith(page)
            );
            setIsVisible(isMobile && isOnTargetPage);
        };

        checkVisibility();
        window.addEventListener('resize', checkVisibility);

        // Listen for route changes
        const handleRouteChange = () => {
            checkVisibility();
        };

        window.addEventListener('popstate', handleRouteChange);

        return () => {
            window.removeEventListener('resize', checkVisibility);
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []); // Remove showOnPages from dependency array

    const handleCall = () => {
        window.location.href = 'tel:+1-800-MACHINERY';
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent('Hi, I\'m interested in your machinery products. Can you help me?');
        window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
    };

    const handleQuote = () => {
        window.location.href = '/quote-cart';
    };

    const handleCart = () => {
        window.location.href = '/cart';
    };

    if (!isVisible) return null;

    return (
        <div className="mobile-cta-container">
            <div className="mobile-cta-buttons">
                <button
                    className="mobile-cta-btn call-btn"
                    onClick={handleCall}
                    title="Call Now"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    <span>Call</span>
                </button>

                <button
                    className="mobile-cta-btn whatsapp-btn"
                    onClick={handleWhatsApp}
                    title="WhatsApp"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    <span>WhatsApp</span>
                </button>

                <button
                    className="mobile-cta-btn quote-btn"
                    onClick={handleQuote}
                    title="Quote Cart"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                        <polyline points="14,2 14,8 20,8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10,9 9,9 8,9" />
                    </svg>
                    <span>Quote</span>
                    {quoteCount > 0 && <span className="cta-badge">{quoteCount}</span>}
                </button>

                <button
                    className="mobile-cta-btn cart-btn"
                    onClick={handleCart}
                    title="Shopping Cart"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 4V2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2H2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7h1a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-1V2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2H7zM6 4h12v1H6V4zm1 3h10v13H7V7z" />
                    </svg>
                    <span>Cart</span>
                    {cartCount > 0 && <span className="cta-badge">{cartCount}</span>}
                </button>
            </div>
        </div>
    );
};

export default MobileCTA;