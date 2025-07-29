'use client';

import React from "react";
import '../../shop/shop.css';
import ProductCard from "./ProductCard";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: string;
  images?: string[];
  description?: string;
  category?: { name: string; slug: string };
  brand?: { name: string; slug: string };
  stockQty?: number;
  specs?: Record<string, string | number | string[]>;
};

interface ProductListProps {
  products: Product[];
  viewMode?: 'grid' | 'list';
  compareList?: Product[];
  onAddToCompare?: (product: Product) => void;
  onRemoveFromCompare?: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  viewMode = 'grid',
  compareList = [],
  onAddToCompare,
  onRemoveFromCompare
}) => {
  if (!products.length) {
    return <div className="no-products">No products found.</div>;
  }

  const isInCompare = (productId: string) => compareList.some(p => p.id === productId);

  return (
    <div className={`products-container ${viewMode}`}>
      <div className={viewMode === 'grid' ? 'products-grid' : 'products-list'}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            isInCompare={isInCompare(product.id)}
            onAddToCompare={onAddToCompare}
            onRemoveFromCompare={onRemoveFromCompare}
            showCompareButton={compareList.length < 4 || isInCompare(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;