"use client";
import React, { useEffect, useState } from "react";
import ProductList from "../../components/shop/ProductList";
import FilterSidebar from "../../components/shop/FilterSidebar";
import SortSelect from "../../components/shop/SortSelect";
import "../../shop/shop.css";

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
  documents?: { name: string; url: string }[];
};

const getUnique = (products: Product[], key: 'category' | 'brand') => {
  const values = products
    .map(product => {
      if (key === 'category' && product.category) return { name: product.category.name, slug: product.category.slug };
      if (key === 'brand' && product.brand) return { name: product.brand.name, slug: product.brand.slug };
      return undefined;
    })
    .filter(Boolean) as { name: string; slug: string }[];
  // Remove duplicates by slug
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

const ShopCategoryPage: React.FC<{ categorySlug: string; categoryTitle: string }> = ({ categorySlug, categoryTitle }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({});
  const [sortBy, setSortBy] = useState<SortBy>("newest");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          category: categorySlug,
          ...filters,
          sortBy,
          page: "1",
          limit: "12",
          includeDocuments: "true"  // Add this parameter to request document data
        });
        const res = await fetch(`${API_BASE}/products?${params}`, { credentials: "include" });
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
  }, [filters, sortBy, categorySlug]);

  const categories = getUnique(products, 'category');
  const brands = getUnique(products, 'brand');
  const conditions = getUniqueConditions(products);

  return (
    <div className="shop-container">
      <header className="shop-header" style={{ marginBottom: 32 }}>
        <h1>{categoryTitle}</h1>
      </header>
      <div className="shop-content" style={{ display: "flex", gap: 32 }}>
        <aside style={{ minWidth: 260 }}>
          <FilterSidebar
            setFilters={setFilters}
            categories={categories}
            brands={brands}
            conditions={conditions}
            availabilities={availabilities}
          />
        </aside>
        <main style={{ flex: 1 }}>
          <div className="products-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <span style={{ fontWeight: 600, fontSize: 20 }}>{products.length}</span> products found
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
};

export default function LoadersPage() {
  return <ShopCategoryPage categorySlug="loaders" categoryTitle="Loaders" />;
}
