"use client";

import ShopPageEnhanced from "../components/shop/ShopPageEnhanced";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type Filters = {
  category?: string;
  brand?: string;
  priceRange?: string;
  condition?: string;
  availability?: string;
};

type SortBy = "newest" | "price_asc" | "price_desc" | "name" | "popularity";
type ViewMode = "grid" | "list";

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
  specs?: Record<string, string | number | string[]>;
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
  return <ShopPageEnhanced />;
}