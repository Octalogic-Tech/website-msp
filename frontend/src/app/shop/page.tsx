"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductList from "../components/shop/ProductList";
import FilterSidebar from "../components/shop/FilterSidebar";
import SortSelect from "../components/shop/SortSelect";
import EnhancedSearch from "../components/shop/EnhancedSearch";
import { useCart } from "../components/shop/CartContext";
import "./shop.css";

// Strapi REST API (v4) – we’ll fetch all products once and filter client-side
const API_BASE = "http://localhost:1337/api";

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

// Convert Strapi product shape → UI Product model
function mapStrapiProduct(item: any): Product {
  return {
    id: String(item.id),
    name: item.name,
    slug: item.slug,
    price: String(item.price),
    images: item.productImage ? [item.productImage.url] : [],
    documents: item.pdf ? [{ name: item.pdf.name, url: item.pdf.url }] : [],
    description: item.description,
    brand: item.brand ? { name: item.brand, slug: item.brand.toLowerCase() } : undefined,
    condition: item.condition,
    specs: item.specs,
    stockQty: item.stock_status === "In Stock" ? 10 : 0,
    // Strapi doesn’t embed category in this model; adjust if needed
    category: item.category ? { name: item.category.name, slug: item.category.slug } : undefined,
  };
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({});
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const router = useRouter();
  const { addItem: addToCart } = useCart();

  /* ------------------------------------------------------------------
   * Fetch all products from Strapi once on mount
   * ------------------------------------------------------------------ */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/products?populate=*&pagination[pageSize]=200`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (json.data) {
          const mapped = json.data.map((p: any) => mapStrapiProduct(p));
          setProducts(mapped);
        } else {
          setError("Failed to fetch products.");
        }
      } catch {
        setError("Network error. Please try again later.");
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  /* ------------------------------------------------------------------
   * Derive filtered + sorted list whenever products / filters / sortBy change
   * ------------------------------------------------------------------ */
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  useEffect(() => {
    let list = [...products];
    console.log('🔍 Filtering products:', { 
      totalProducts: products.length, 
      filters, 
      sampleProduct: products[0] 
    });

    // Apply category / brand / condition / availability
    if (filters.category) {
      console.log('Filtering by category:', filters.category);
      list = list.filter(p => p.category?.slug === filters.category);
      console.log('After category filter:', list.length);
    }
    
    if (filters.brand) {
      console.log('Filtering by brand:', filters.brand);
      list = list.filter(p => p.brand?.slug === filters.brand);
      console.log('After brand filter:', list.length);
    }
    
    if (filters.condition) {
      console.log('Filtering by condition:', filters.condition);
      list = list.filter(p => (p.condition?.toLowerCase() ?? '') === filters.condition);
      console.log('After condition filter:', list.length);
    }

    if (filters.availability) {
      console.log('Filtering by availability:', filters.availability);
      switch (filters.availability) {
        case 'in-stock':      list = list.filter(p => (p.stockQty ?? 0) > 5); break;
        case 'low-stock':     list = list.filter(p => (p.stockQty ?? 0) > 0 && (p.stockQty ?? 0) <= 5); break;
        case 'out-of-stock':  list = list.filter(p => (p.stockQty ?? 0) === 0); break;
      }
      console.log('After availability filter:', list.length);
    }

    // Price range
    const priceNum = (priceStr: string) => parseFloat(priceStr);
    if (filters.priceRange) {
      console.log('Filtering by price range:', filters.priceRange);
      list = list.filter(p => {
        const price = priceNum(p.price);
        console.log('Product price:', p.name, price);
        switch (filters.priceRange) {
          case 'under-25k':   return price < 25000;
          case '25k-50k':     return price >= 25000 && price <= 50000;
          case '50k-100k':    return price >= 50000 && price <= 100000;
          case '100k-250k':   return price >= 100000 && price <= 250000;
          case 'over-250k':   return price > 250000;
          default:            return true;
        }
      });
      console.log('After price filter:', list.length);
    }

    // Sorting
    list.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':  return parseFloat(a.price) - parseFloat(b.price);
        case 'price_desc': return parseFloat(b.price) - parseFloat(a.price);
        case 'name':       return a.name.localeCompare(b.name);
        case 'newest':
        default:           return 0; // Strapi data lacks createdAt here; adjust if needed
      }
    });

    console.log('Final filtered list:', list.length);
    setDisplayProducts(list);
  }, [products, filters, sortBy]);

  const categories  = getUnique(products, 'category');
  const brands      = getUnique(products, 'brand');
  const conditions  = getUniqueConditions(products);

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const addToCompare = (product: Product) => {
    if (compareList.length < 4 && !compareList.find(p => p.id === product.id)) {
      setCompareList([...compareList, product]);
    }
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(compareList.filter(p => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
    setShowCompare(false);
  };

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>All Products</h1>
        <div className="header-search">
          <EnhancedSearch />
        </div>
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
            filters={filters}
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
              <span>{displayProducts.length}</span> products found
            </div>
            <div className="products-controls">
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
                  </svg>
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                  </svg>
                </button>
              </div>
              {compareList.length > 0 && (
                <button
                  className="compare-btn"
                  onClick={() => setShowCompare(true)}
                >
                  Compare ({compareList.length})
                </button>
              )}
              <SortSelect onChange={setSortBy} />
            </div>
          </div>
          {loading && <div className="loading">Loading products...</div>}
          {error && <div className="text-red-600">{error}</div>}
          {!loading && !error && (
            <ProductList
              products={displayProducts}
              viewMode={viewMode}
              compareList={compareList}
              onAddToCompare={addToCompare}
              onRemoveFromCompare={removeFromCompare}
            />
          )}
        </main>
      </div>

      {/* Comparison Modal */}
      {showCompare && compareList.length > 0 && (
        <div className="compare-modal-overlay" onClick={() => setShowCompare(false)}>
          <div className="compare-modal" onClick={(e) => e.stopPropagation()}>
            <div className="compare-header">
              <h2>Product Comparison</h2>
              <button className="close-btn" onClick={() => setShowCompare(false)}>×</button>
            </div>
            <div className="compare-content">
              <div className="compare-table-scroll-hint">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                  <path fillRule="evenodd" d="M10.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L9.293 7.5H1.5a.5.5 0 0 0 0 1h7.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                  <path fillRule="evenodd" d="M10.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L9.293 7.5H1.5a.5.5 0 0 0 0 1h7.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" transform="translate(3.5, 0)" />
                </svg>
                Scroll horizontally to see more products
              </div>
              <div className="compare-table-container">
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th></th>
                      {compareList.map((product) => (
                        <th key={product.id}>
                          <button
                            className="remove-product-btn"
                            onClick={() => removeFromCompare(product.id)}
                            aria-label="Remove from comparison"
                          >
                            ×
                          </button>
                          <div className="product-image-cell">
                            <div className="product-image-container">
                              {product.images?.[0] && (
                                <img
                                  src={product.images[0].startsWith('http') ? product.images[0] : `http://localhost:5000${product.images[0]}`}
                                  alt={product.name}
                                />
                              )}
                            </div>
                          </div>
                          <div className="product-name">{product.name}</div>
                          <div className="product-price">${parseInt(product.price).toLocaleString()}</div>
                          <div className="product-actions">
                            <button
                              className="add-to-cart-btn small"
                              onClick={(e) => {
                                e.stopPropagation();
                                const item = {
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  quantity: 1,
                                  image: product.images?.[0],
                                };
                                addToCart(item);
                              }}
                            >
                              Add to Cart
                            </button>
                            <button
                              className="view-details-btn small"
                              onClick={(e) => {
                                e.stopPropagation();
                                const categorySlug = product.category?.slug || 'uncategorized';
                                router.push(`/shop/${categorySlug}/${product.slug}`);
                              }}
                            >
                              View Details
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Get all unique spec keys across all products */}
                    {(() => {
                      const allSpecs = new Set<string>();
                      compareList.forEach(product => {
                        if (product.specs) {
                          Object.keys(product.specs).forEach(key => allSpecs.add(key));
                        }
                      });

                      return Array.from(allSpecs).map(specKey => (
                        <tr key={specKey}>
                          <td className="spec-row-header">{specKey}</td>
                          {compareList.map(product => (
                            <td key={`${product.id}-${specKey}`}>
                              {product.specs && product.specs[specKey] !== undefined ?
                                (Array.isArray(product.specs[specKey])
                                  ? (product.specs[specKey] as string[]).join(', ')
                                  : String(product.specs[specKey]))
                                : '—'}
                            </td>
                          ))}
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
              <div className="compare-actions">
                <button className="clear-compare-btn" onClick={clearCompare}>
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}