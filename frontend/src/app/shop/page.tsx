"use client";

import React, { useEffect, useState } from "react";
import ProductList from "../components/shop/ProductList";
import FilterSidebar from "../components/shop/FilterSidebar";
import SortSelect from "../components/shop/SortSelect";
import "./shop.css";

const API_BASE = "http://localhost:5000/api";

type Filters = {
  category?: string;
  brand?: string;
  priceRange?: string;
  condition?: string;
  availability?: string;
};

type SortBy = "newest" | "price_asc" | "price_desc" | "name" | "popularity";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: string;
  images?: string[];
  description?: string;
  category?: { name: string; slug: string };
  brand?: { name: string; slug: string };
  condition?: string;
  stockQty?: number;
};

const getUnique = (products: Product[], key: 'category' | 'brand') => {
  const values = products
    .map(product => {
      if (key === 'category' && product.category) return { name: product.category.name, slug: product.category.slug };
      if (key === 'brand' && product.brand) return { name: product.brand.name, slug: product.brand.slug };
      return undefined;
    })
    .filter(Boolean) as { name: string; slug: string }[];
  const seen = new Set();
  return values.filter(opt => {
    if (seen.has(opt.slug)) return false;
    seen.add(opt.slug);
    return true;
  });
};

const getUniqueConditions = (products: Product[]): { name: string; slug: string }[] => {
  const values = products
    .map(product => product.condition ? { name: product.condition, slug: product.condition.toLowerCase() } : undefined)
    .filter(Boolean) as { name: string; slug: string }[];
  const seen = new Set();
  return values.filter(opt => {
    if (seen.has(opt.slug)) return false;
    seen.add(opt.slug);
    return true;
  });
};

const availabilities = [
  { value: 'in-stock', label: 'In Stock' },
  { value: 'low-stock', label: 'Low Stock' },
  { value: 'out-of-stock', label: 'Out of Stock' },
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({});
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let minPrice = undefined;
        let maxPrice = undefined;
        if (filters.priceRange) {
          switch (filters.priceRange) {
            case 'under-25k': maxPrice = '25000'; break;
            case '25k-50k': minPrice = '25000'; maxPrice = '50000'; break;
            case '50k-100k': minPrice = '50000'; maxPrice = '100000'; break;
            case '100k-250k': minPrice = '100000'; maxPrice = '250000'; break;
            case 'over-250k': minPrice = '250000'; break;
            default: break;
          }
        }
        const params = new URLSearchParams({
          ...filters,
          ...(minPrice && { minPrice }),
          ...(maxPrice && { maxPrice }),
          sortBy,
          page: "1",
          limit: "24", // Show more products on the main page
        });
        params.delete('priceRange');
        
        const res = await fetch(`${API_BASE}/products?${params.toString()}`, { credentials: "include" });
        const data = await res.json();

        if (data.success) {
          setProducts(data.data);
        } else {
          setError(data.error || "Failed to fetch products.");
        }
      } catch {
        setError("Network error. Please try again later.");
      }
      setLoading(false);
    };
    fetchProducts();
  }, [filters, sortBy]);

  const categories = getUnique(products, 'category');
  const brands = getUnique(products, 'brand');
  const conditions = getUniqueConditions(products);

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>All Products</h1>
      </header>

      <button className="filters-toggle" onClick={toggleFilters}>
        {isFilterOpen ? 'Close Filters' : 'Show Filters'}
      </button>

      <div className="shop-content">
        <aside className={`filters-section ${isFilterOpen ? 'active' : ''}`}>
          {isFilterOpen && (
            <button className="filters-close" onClick={toggleFilters}>×</button>
          )}
          <FilterSidebar
            setFilters={setFilters}
            categories={categories}
            brands={brands}
            conditions={conditions}
            availabilities={availabilities}
          />
        </aside>

        <main>
          <div className="products-header">
            <div className="products-count">
              <span>{products.length}</span> products found
            </div>
            <SortSelect onChange={setSortBy} />
          </div>
          {loading && <div className="loading">Loading products...</div>}
          {error && <div className="text-red-600">{error}</div>}
          {!loading && !error && <ProductList products={products} />}
        </main>
      </div>
    </div>
  );
}