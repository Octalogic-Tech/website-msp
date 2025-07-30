import { useEffect, useState, useRef, useCallback } from 'react';

export const useStickyFilter = () => {
    const [isSticky, setIsSticky] = useState(false);
    const filterRef = useRef<HTMLElement>(null);

    const handleScroll = useCallback(() => {
        if (filterRef.current) {
            const rect = filterRef.current.getBoundingClientRect();
            const isCurrentlySticky = rect.top <= 32; // 2rem offset
            setIsSticky(isCurrentlySticky);

            // FALLBACK: If CSS sticky isn't working, force it with JavaScript
            if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const filterParent = filterRef.current.parentElement;

                if (filterParent) {
                    const parentRect = filterParent.getBoundingClientRect();
                    const parentTop = parentRect.top + scrollTop;

                    // If we've scrolled past the original position, force sticky positioning
                    if (scrollTop > parentTop - 32) {
                        filterRef.current.style.position = 'fixed';
                        filterRef.current.style.top = '2rem';
                        filterRef.current.style.left = `${parentRect.left}px`;
                        filterRef.current.style.width = '260px';
                        filterRef.current.style.zIndex = '1000';
                    } else {
                        // Reset to normal positioning
                        filterRef.current.style.position = 'sticky';
                        filterRef.current.style.top = '2rem';
                        filterRef.current.style.left = 'auto';
                        filterRef.current.style.width = 'auto';
                    }
                }
            }
        }
    }, []);

    useEffect(() => {
        // Only add scroll listener on desktop
        if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
            // Use throttling for better performance
            let ticking = false;
            const throttledScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        handleScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            window.addEventListener('scroll', throttledScroll, { passive: true });
            window.addEventListener('resize', handleScroll, { passive: true });
            handleScroll(); // Check initial state

            return () => {
                window.removeEventListener('scroll', throttledScroll);
                window.removeEventListener('resize', handleScroll);
            };
        }
    }, [handleScroll]);

    return { isSticky, filterRef };
};