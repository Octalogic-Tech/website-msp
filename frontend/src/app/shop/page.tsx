// app/shop/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import './shop.css';

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stockQty: number;
  images: string[];
  category: { id: string; name: string; slug: string };
  brand: { id: string; name: string; slug: string };
  condition: string;
  specs: {
    modelYear?: number;
    compatibleMakes?: string[];
    warranty?: string;
    genuine?: boolean;
    [key: string]: any;
  };
};

type Filters = {
  category: string;
  brand: string;
  priceRange: string;
  condition: string;
  availability: string;
};

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();
  return data;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    category: '',
    brand: '',
    priceRange: '',
    condition: '',
    availability: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(product => product.category.name === filters.category);
    }

    if (filters.brand) {
      filtered = filtered.filter(product => product.brand.name === filters.brand);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(product => {
        switch (filters.priceRange) {
          case 'under-25k':
            return product.price < 25000;
          case '25k-50k':
            return product.price >= 25000 && product.price <= 50000;
          case '50k-100k':
            return product.price >= 50000 && product.price <= 100000;
          case '100k-250k':
            return product.price >= 100000 && product.price <= 250000;
          case 'over-250k':
            return product.price > 250000;
          default:
            return true;
        }
      });
    }

    if (filters.condition) {
      filtered = filtered.filter(product => product.condition === filters.condition);
    }

    if (filters.availability) {
      filtered = filtered.filter(product => {
        if (filters.availability === 'in-stock') return product.stockQty > 5;
        if (filters.availability === 'low-stock') return product.stockQty > 0 && product.stockQty <= 5;
        if (filters.availability === 'out-of-stock') return product.stockQty === 0;
        return true;
      });
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      priceRange: '',
      condition: '',
      availability: '',
    });
  };

  const getUniqueValues = (key: 'category' | 'brand' | 'condition'): string[] => {
    const values = products.map(product => {
      if (key === 'category' || key === 'brand') {
        return product[key].name;
      }
      return product[key];
    });
    return [...new Set(values)].filter(Boolean) as string[];
  };

  const getAvailabilityStatus = (stockQty: number): string => {
    if (stockQty === 0) return 'out-of-stock';
    if (stockQty <= 5) return 'low-stock';
    return 'in-stock';
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="shop-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>Heavy Equipment Marketplace</h1>
      </header>

      <div className="filters-section">
        <h2>Filter Products</h2>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {getUniqueValues('category').map((category, index) => (
                <option key={`category-${index}`} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Brand</label>
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
            >
              <option value="">All Brands</option>
              {getUniqueValues('brand').map((brand, index) => (
                <option key={`brand-${index}`} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="under-25k">Under $25K</option>
              <option value="25k-50k">$25K - $50K</option>
              <option value="50k-100k">$50K - $100K</option>
              <option value="100k-250k">$100K - $250K</option>
              <option value="over-250k">Over $250K</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Condition</label>
            <select
              value={filters.condition}
              onChange={(e) => handleFilterChange('condition', e.target.value)}
            >
              <option value="">All Conditions</option>
              {getUniqueValues('condition').map((condition, index) => (
                <option key={`condition-${index}`} value={condition.toLowerCase()}>
                  {condition}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Availability</label>
            <select
              value={filters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
            >
              <option value="">All Availability</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>
      </div>

      <div className="products-section">
        <div className="products-header">
          <h2>Products ({filteredProducts.length})</h2>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found matching your filters.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const availability = getAvailabilityStatus(product.stockQty);
              return (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img
                      src={product.images[0] || '/placeholder-image.jpg'}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-meta">
                      <span className="product-brand">{product.brand.name}</span>
                      <span className="product-category">{product.category.name}</span>
                      {product.specs.modelYear && (
                        <span className="product-year">Year: {product.specs.modelYear}</span>
                      )}
                    </div>
                    <p className="product-description">
                      {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description}
                    </p>
                    <div className="product-footer">
                      <span className="product-price">{formatPrice(product.price)}</span>
                      <span className={`availability-badge ${availability}`}>
                        {availability.replace('-', ' ')}
                      </span>
                    </div>
                    <button className="add-to-cart-btn">Request Quote</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}