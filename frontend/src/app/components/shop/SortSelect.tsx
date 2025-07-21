import React from "react";
import '../../shop/shop.css';

interface SortSelectProps {
  onChange: (sortBy: "newest" | "price_asc" | "price_desc" | "name" | "popularity") => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ onChange }) => {
  return (
    <div className="sort-select">
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        onChange={e => onChange(e.target.value as "newest" | "price_asc" | "price_desc" | "name" | "popularity")}
      >
        <option value="newest">Newest</option>
        <option value="price_asc">Price (Low to High)</option>
        <option value="price_desc">Price (High to Low)</option>
        <option value="name">Name (A-Z)</option>
        <option value="popularity" disabled>Popularity (Coming Soon)</option>
      </select>
    </div>
  );
};

export default SortSelect; 