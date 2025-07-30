// Enhanced test component to verify sticky filter behavior
import React, { useEffect, useState } from 'react';

const StickyFilterTest: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);
    const [filterPosition, setFilterPosition] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);

            const filterElement = document.querySelector('.filters-section');
            if (filterElement) {
                const rect = filterElement.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(filterElement);
                setFilterPosition(`
Position: ${computedStyle.position}
Top: ${rect.top}px
Left: ${rect.left}px
Sticky: ${rect.top <= 32 ? 'YES' : 'NO'}
                `);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.9)',
            color: 'white',
            padding: '15px',
            borderRadius: '8px',
            fontSize: '11px',
            zIndex: 2000,
            fontFamily: 'monospace',
            maxWidth: '250px',
            lineHeight: '1.4'
        }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🔧 Sticky Filter Debug</div>
            <div>Scroll Y: {scrollY}px</div>
            <div style={{ marginTop: '8px', whiteSpace: 'pre-line' }}>{filterPosition}</div>
            <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.8 }}>
                Filter should stick at top: 32px when scrolling
            </div>
        </div>
    );
};

export default StickyFilterTest;