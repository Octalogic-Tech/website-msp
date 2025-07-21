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
};

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products.length) {
    return <div>No products found.</div>;
  }
  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;