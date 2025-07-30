'use client';

import React from "react";
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

interface FilterSidebarProps {
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
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

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, categories, brands, conditions, availabilities }) => {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value || undefined }));
  };

  const handleClear = () => {
    setFilters({});
  };

  return (
    <div className="filters-grid">
      <h2>Filter Products</h2>
      
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={filters.category || ''}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="brand">Brand</label>
        <select
          id="brand"
          name="brand"
          value={filters.brand || ''}
          onChange={handleChange}
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b.slug} value={b.slug}>{b.name}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priceRange">Price Range</label>
        <select
          id="priceRange"
          name="priceRange"
          value={filters.priceRange || ''}
          onChange={handleChange}
        >
          {priceRanges.map(pr => (
            <option key={pr.value} value={pr.value}>{pr.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="condition">Condition</label>
        <select
          id="condition"
          name="condition"
          value={filters.condition || ''}
          onChange={handleChange}
        >
          <option value="">All Conditions</option>
          {conditions.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="availability">Availability</label>
        <select
          id="availability"
          name="availability"
          value={filters.availability || ''}
          onChange={handleChange}
        >
          <option value="">All Availability</option>
          {availabilities.map(a => (
            <option key={a.value} value={a.value}>{a.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-actions">
        <button
          className="clear-filters-btn"
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

export default FilterSidebar;