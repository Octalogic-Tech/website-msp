// app/shop/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import './shop.css';

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  category: { id: string; name: string };
  brand: { id: string; name: string };
  condition?: string; // Added for filtering
  availability?: 'in-stock' | 'out-of-stock' | 'low-stock'; // Added for filtering
};

type Filters = {
  category: string;
  brand: string;
  priceRange: string;
  condition: string;
  availability: string;
};

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:5000/api/products', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();
  return data.data;
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
        const price = parseFloat(product.price);
        switch (filters.priceRange) {
          case 'under-25':
            return price < 25;
          case '25-50':
            return price >= 25 && price <= 50;
          case '50-100':
            return price >= 50 && price <= 100;
          case 'over-100':
            return price > 100;
          default:
            return true;
        }
      });
    }

    if (filters.condition) {
      filtered = filtered.filter(product => product.condition === filters.condition);
    }

    if (filters.availability) {
      filtered = filtered.filter(product => product.availability === filters.availability);
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

  const getUniqueValues = (key: 'category' | 'brand' | 'condition' | 'availability'): string[] => {
    const values = products.map(product => {
      if (key === 'category' || key === 'brand') {
        return product[key].name;
      }
      return product[key];
    });
    return [...new Set(values)].filter(Boolean) as string[];
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
        <h1>SHOP</h1>
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
              <option value="under-25">Under $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="over-100">Over $100</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Condition</label>
            <select
              value={filters.condition}
              onChange={(e) => handleFilterChange('condition', e.target.value)}
            >
              <option value="">All Conditions</option>
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="refurbished">Refurbished</option>
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
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img
                    src={`http://localhost:5000${product.images[0]}`}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.jpg';
                    }}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-brand">{product.brand.name}</p>
                  <p className="product-category">{product.category.name}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    {product.availability && (
                      <span className={`availability-badge ${product.availability}`}>
                        {product.availability.replace('-', ' ')}
                      </span>
                    )}
                  </div>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}