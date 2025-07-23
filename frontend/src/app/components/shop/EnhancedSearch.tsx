'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './enhanced-search.css';

interface SearchResult {
    id: string;
    name: string;
    slug: string;
    price: string;
    images?: string[];
    category?: { name: string; slug: string };
    brand?: { name: string; slug: string };
}

interface EnhancedSearchProps {
    onClose?: () => void;
    className?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({ onClose, className = '' }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Load recent searches from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            try {
                setRecentSearches(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse recent searches:', e);
            }
        }
    }, []);

    // Search suggestions and spell check
    const getSearchSuggestions = (searchTerm: string): string[] => {
        const commonTerms = [
            'excavator', 'wheel loader', 'bulldozer', 'crane', 'forklift',
            'caterpillar', 'komatsu', 'volvo', 'john deere', 'case',
            'hydraulic system', 'engine parts', 'transmission', 'undercarriage',
            'new equipment', 'used machinery', 'refurbished parts'
        ];

        return commonTerms
            .filter(term => term.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice(0, 5);
    };

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.trim().length >= 2) {
                performSearch(query);
                setSuggestions(getSearchSuggestions(query));
            } else {
                setResults([]);
                setSuggestions([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const performSearch = async (searchTerm: string) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                search: searchTerm,
                limit: '8'
            });

            const response = await fetch(`${API_BASE}/products?${params.toString()}`, {
                credentials: 'include'
            });

            const data = await response.json();
            if (data.success) {
                setResults(data.data);
                setShowResults(true);
            }
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setSelectedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showResults) return;

        const totalItems = results.length + suggestions.length;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % totalItems);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev <= 0 ? totalItems - 1 : prev - 1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    if (selectedIndex < results.length) {
                        handleResultClick(results[selectedIndex]);
                    } else {
                        const suggestionIndex = selectedIndex - results.length;
                        handleSuggestionClick(suggestions[suggestionIndex]);
                    }
                } else if (query.trim()) {
                    handleSearch();
                }
                break;
            case 'Escape':
                setShowResults(false);
                setSelectedIndex(-1);
                onClose?.();
                break;
        }
    };

    const handleResultClick = (result: SearchResult) => {
        const categorySlug = result.category?.slug || 'uncategorized';
        addToRecentSearches(result.name);
        router.push(`/shop/${categorySlug}/${result.slug}`);
        setQuery('');
        setShowResults(false);
        onClose?.();
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        addToRecentSearches(suggestion);
        performSearch(suggestion);
    };

    const handleSearch = () => {
        if (query.trim()) {
            addToRecentSearches(query);
            router.push(`/shop?search=${encodeURIComponent(query)}`);
            setShowResults(false);
            onClose?.();
        }
    };

    const addToRecentSearches = (searchTerm: string) => {
        const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={searchRef} className={`enhanced-search ${className}`}>
            <div className="search-input-container">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.length >= 2 && setShowResults(true)}
                    placeholder="Search for machinery, parts, or brands..."
                    className="search-input"
                />
                <button
                    onClick={handleSearch}
                    className="search-button"
                    disabled={!query.trim()}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                </button>
                {isLoading && (
                    <div className="search-loading">
                        <div className="loading-spinner-small"></div>
                    </div>
                )}
            </div>

            {showResults && (
                <div className="search-results">
                    {/* Recent Searches */}
                    {query.length === 0 && recentSearches.length > 0 && (
                        <div className="search-section">
                            <div className="section-header">
                                <span>Recent Searches</span>
                                <button onClick={clearRecentSearches} className="clear-btn">Clear</button>
                            </div>
                            {recentSearches.map((search, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(search)}
                                    className="search-item recent-search"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                                    </svg>
                                    {search}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                        <div className="search-section">
                            <div className="section-header">
                                <span>Suggestions</span>
                            </div>
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className={`search-item suggestion ${selectedIndex === results.length + index ? 'selected' : ''}`}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                    </svg>
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Search Results */}
                    {results.length > 0 && (
                        <div className="search-section">
                            <div className="section-header">
                                <span>Products</span>
                            </div>
                            {results.map((result, index) => (
                                <button
                                    key={result.id}
                                    onClick={() => handleResultClick(result)}
                                    className={`search-item product-result ${selectedIndex === index ? 'selected' : ''}`}
                                >
                                    <div className="result-image">
                                        <Image
                                            src="/images/cat-320-excavator-1.jpg"
                                            alt={result.name}
                                            width={40}
                                            height={40}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="result-info">
                                        <div className="result-name">{result.name}</div>
                                        <div className="result-details">
                                            {result.brand && <span className="result-brand">{result.brand.name}</span>}
                                            <span className="result-price">${parseInt(result.price).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                            {results.length >= 8 && (
                                <button onClick={handleSearch} className="view-all-btn">
                                    View all results for "{query}"
                                </button>
                            )}
                        </div>
                    )}

                    {/* No Results */}
                    {query.length >= 2 && !isLoading && results.length === 0 && suggestions.length === 0 && (
                        <div className="no-results">
                            <p>No results found for "{query}&quot;</p>
                            <p className="suggestion-text">
                                Try searching for: excavator, wheel loader, caterpillar, komatsu, hydraulic system
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EnhancedSearch;