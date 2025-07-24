import React, { useState } from "react";
import '../../shop/shop.css';

interface CategoryOption { name: string; slug: string; }
interface BrandOption { name: string; slug: string; }

type Filters = {
    category?: string;
    brand?: string;
    priceRange?: string;
    condition?: string;
    availability?: string;
};

interface FilterSidebarEnhancedProps {
    setFilters: (filters: Filters) => void;
    categories: CategoryOption[];
    brands: BrandOption[];
    conditions: { name: string; slug: string }[];
    availabilities: { value: string; label: string }[];
}

const priceRanges = [
    { value: '', label: 'All Prices' },
    { value: 'under-25k', label: 'Under $25K' },
    { value: '25k-50k', label: '$25K - $50K' },
    { value: '50k-100k', label: '$50K - $100K' },
    { value: '100k-250k', label: '$100K - $250K' },
    { value: 'over-250k', label: 'Over $250K' },
];

const FilterSidebarEnhanced: React.FC<FilterSidebarEnhancedProps> = ({
    setFilters,
    categories,
    brands,
    conditions,
    availabilities
}) => {
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [condition, setCondition] = useState('');
    const [availability, setAvailability] = useState('');

    // Real-time filtering - update filters whenever any value changes
    const updateFilters = (newFilters: {
        category?: string;
        brand?: string;
        priceRange?: string;
        condition?: string;
        availability?: string;
    }) => {
        const filters: Filters = {};
        if (newFilters.category) filters.category = newFilters.category;
        if (newFilters.brand) filters.brand = newFilters.brand;
        if (newFilters.priceRange) filters.priceRange = newFilters.priceRange;
        if (newFilters.condition) filters.condition = newFilters.condition;
        if (newFilters.availability) filters.availability = newFilters.availability;

        setFilters(filters);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
        updateFilters({ category: value, brand, priceRange, condition, availability });
    };

    const handleBrandChange = (value: string) => {
        setBrand(value);
        updateFilters({ category, brand: value, priceRange, condition, availability });
    };

    const handlePriceRangeChange = (value: string) => {
        setPriceRange(value);
        updateFilters({ category, brand, priceRange: value, condition, availability });
    };

    const handleConditionChange = (value: string) => {
        setCondition(value);
        updateFilters({ category, brand, priceRange, condition: value, availability });
    };

    const handleAvailabilityChange = (value: string) => {
        setAvailability(value);
        updateFilters({ category, brand, priceRange, condition, availability: value });
    };

    const handleClear = () => {
        setCategory('');
        setBrand('');
        setPriceRange('');
        setCondition('');
        setAvailability('');
        setFilters({});
    };

    return (
        <div className="filters-section-enhanced">
            <h2>Filters</h2>

            <div className="filter-group-enhanced">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={e => handleCategoryChange(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group-enhanced">
                <label htmlFor="brand">Brand</label>
                <select
                    id="brand"
                    value={brand}
                    onChange={e => handleBrandChange(e.target.value)}
                >
                    <option value="">All Brands</option>
                    {brands.map((b) => (
                        <option key={b.slug} value={b.slug}>{b.name}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group-enhanced">
                <label htmlFor="priceRange">Price Range</label>
                <select
                    id="priceRange"
                    value={priceRange}
                    onChange={e => handlePriceRangeChange(e.target.value)}
                >
                    {priceRanges.map(pr => (
                        <option key={pr.value} value={pr.value}>{pr.label}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group-enhanced">
                <label htmlFor="condition">Condition</label>
                <select
                    id="condition"
                    value={condition}
                    onChange={e => handleConditionChange(e.target.value)}
                >
                    <option value="">All Conditions</option>
                    {conditions.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group-enhanced">
                <label htmlFor="availability">Availability</label>
                <select
                    id="availability"
                    value={availability}
                    onChange={e => handleAvailabilityChange(e.target.value)}
                >
                    <option value="">All Availability</option>
                    {availabilities.map(a => (
                        <option key={a.value} value={a.value}>{a.label}</option>
                    ))}
                </select>
            </div>

            <div className="filter-actions-enhanced">
                <button
                    className="clear-filters-btn-enhanced"
                    onClick={handleClear}
                    type="button"
                    aria-label="Clear all filters"
                >
                    Clear All
                </button>
            </div>
        </div>
    );
};

export default FilterSidebarEnhanced;