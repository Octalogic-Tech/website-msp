import React from 'react';
import '../../shop/shop.css';

type SortBy = "newest" | "price_asc" | "price_desc" | "name" | "popularity";

interface SortSelectEnhancedProps {
    onChange: (sortBy: SortBy) => void;
    value?: SortBy;
}

const SortSelectEnhanced: React.FC<SortSelectEnhancedProps> = ({ onChange, value = "newest" }) => {
    return (
        <div className="sort-select-enhanced">
            <label htmlFor="sort-select">Sort by:</label>
            <select
                id="sort-select"
                value={value}
                onChange={(e) => onChange(e.target.value as SortBy)}
            >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="popularity">Popularity</option>
            </select>
        </div>
    );
};

export default SortSelectEnhanced;