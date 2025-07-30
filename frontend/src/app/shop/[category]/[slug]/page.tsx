"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import '../../shop.css';
import './product-detail.css';
import ProductDetailPage from '../../../components/shop/ProductDetailPage';
import { Loading, Alert } from '@/app/components/ui';


type Product = {
    id: string;
    name: string;
    slug: string;
    price: string;
    images?: string[];
    description?: string;
    category?: { name: string; slug: string };
    brand?: { name: string; slug: string };
    condition: number;
    specs?: Record<string, string | number | string[]>;
    documents?: { name: string; url: string }[];
    stockQty?: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ProductPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    // No longer needed as these are handled in the ProductDetailPage component

    useEffect(() => {
        const fetchProduct = async () => {
            if (!params.slug) return;
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${API_BASE}/products/${params.slug}`);
                const data = await res.json();
                if (data.success) {
                    const fetchedProduct = data.data;
                    setProduct(fetchedProduct);
                    // Fetch related products
                    if (fetchedProduct.category?.slug) {
                        const relatedRes = await fetch(
                            `${API_BASE}/products?category=${fetchedProduct.category.slug}&limit=5`
                        );
                        const relatedData = await relatedRes.json();
                        if (relatedData.success) {
                            setRelatedProducts(
                                relatedData.data.filter((p: Product) => p.id !== fetchedProduct.id).slice(0, 4)
                            );
                        }
                    }
                } else {
                    setError(data.error || "Failed to fetch product.");
                }
            } catch (err) {
                setError("Network error. Please try again later.");
                console.error("Failed to fetch product:", err);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [params.slug]);

    // No longer needed as these are handled in the ProductDetailPage component

    if (loading) return (
        <div className="loading-container">
            <Loading size="lg" text="Loading product details..." />
        </div>
    );

    if (error) return (
        <div className="error-container">
            <Alert
                variant="error"
                title="Error Loading Product"
            >
                {error}
                <div className="mt-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="btn btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </Alert>
        </div>
    );

    if (!product) return (
        <div className="not-found-container">
            <Alert
                variant="warning"
                title="Product Not Found"
            >
                The product you&apos;re looking for could not be found.
                <div className="mt-4">
                    <Link href="/shop" className="btn btn-primary">
                        ← Back to Shop
                    </Link>
                </div>
            </Alert>
        </div>
    );

    return (
        <ProductDetailPage
            product={product}
            relatedProducts={relatedProducts}
            apiBase={API_BASE}
        />
    );
}