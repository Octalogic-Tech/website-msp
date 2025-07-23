import React from "react";
import { FormSelect } from "../ui";
import '../../shop/shop.css';

type SortOption = "newest" | "price_asc" | "price_desc" | "name" | "popularity";

interface SortSelectProps {
  onChange: (sortBy: SortOption) => void;
  value?: SortOption;
  className?: string;
}

const SortSelect: React.FC<SortSelectProps> = ({ onChange, value = "newest", className = "" }) => {
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price_asc", label: "Price (Low to High)" },
    { value: "price_desc", label: "Price (High to Low)" },
    { value: "name", label: "Name (A-Z)" },
    { value: "popularity", label: "Popularity (Coming Soon)", disabled: true }
  ];

  const handleChange = (selectedValue: string) => {
    onChange(selectedValue as SortOption);
  };

  return (
    <div className={`sort-select ${className}`}>
      <FormSelect
        label="Sort By:"
        options={sortOptions}
        value={value}
        onChange={handleChange}
        aria-label="Sort products"
      />
    </div>
  );
};

export default SortSelect;