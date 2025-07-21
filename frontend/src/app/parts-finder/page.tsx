'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../components/shop/CartContext';
import { useQuote } from '../components/shop/QuoteContext';
import styles from './PartsFinderPage.module.css';

type Product = {
  id: string;
  name: string;
  slug: string;
  price: string;
  images?: string[];
  description?: string;
  category?: { name: string; slug: string };
  brand?: { name: string; slug: string };
  specs?: {
    compatibleMakes?: string[];
    compatibleModels?: string[];
    [key: string]: any;
  };
  stockQty?: number;
};

const API_BASE = "http://localhost:5000/api";

export default function PartsFinderPage() {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  const { addItem: addToCart } = useCart();
  const { addItem: addToQuote } = useQuote();

  // Fetch available makes on component mount
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        // In a real app, you'd have an endpoint for this
        // For now, we'll use hardcoded values from our seed data
        setMakes(['Caterpillar', 'Komatsu', 'Volvo', 'Hitachi', 'John Deere']);
      } catch (error) {
        console.error('Error fetching makes:', error);
      }
    };

    fetchMakes();
  }, []);

  // Update models when make changes
  useEffect(() => {
    const fetchModels = async () => {
      if (!selectedMake) {
        setModels([]);
        return;
      }
      
      try {
        // In a real app, you'd have an endpoint for this
        // For now, we'll use hardcoded values based on the selected make
        switch(selectedMake) {
          case 'Caterpillar':
            setModels(['320', '325', '330', '950', '740']);
            break;
          case 'Komatsu':
            setModels(['PC200', 'PC210', 'PC220', 'WA380']);
            break;
          case 'Volvo':
            setModels(['EC220E', 'L90H', 'A30G']);
            break;
          case 'Hitachi':
            setModels(['ZX350LC-6']);
            break;
          case 'John Deere':
            setModels(['644K']);
            break;
          default:
            setModels([]);
        }
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, [selectedMake]);

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(e.target.value);
    setSelectedModel(''); // Reset model when make changes
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMake || !selectedModel) {
      return;
    }
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      const res = await fetch(`${API_BASE}/parts-finder?make=${selectedMake}&model=${selectedModel}&includeDocuments=true`);
      const data = await res.json();
      
      if (data.success) {
        setResults(data.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error searching parts:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0]
    });
  };

  const handleAddToQuote = (product: Product) => {
    addToQuote({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0]
    });
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(parseFloat(price));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Parts Finder</h1>
      <p className={styles.subheader}>
        Find compatible spare parts for your machinery by selecting the make and model below.
      </p>
      
      <section className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.formGroup}>
            <label htmlFor="make">Machinery Make</label>
            <select 
              id="make" 
              value={selectedMake} 
              onChange={handleMakeChange}
              required
            >
              <option value="">Select Make</option>
              {makes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="model">Machinery Model</label>
            <select 
              id="model" 
              value={selectedModel} 
              onChange={handleModelChange}
              disabled={!selectedMake}
              required
            >
              <option value="">Select Model</option>
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
          
          <button type="submit" className={styles.searchButton} disabled={!selectedMake || !selectedModel}>
            Find Parts
          </button>
        </form>
      </section>
      
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      ) : hasSearched && (
        <section className={styles.resultsSection}>
          {results.length > 0 ? (
            <>
              <div className={styles.resultsHeader}>
                <div className={styles.resultsCount}>
                  {results.length} compatible part{results.length !== 1 ? 's' : ''} found
                </div>
              </div>
              
              <div className={styles.resultsGrid}>
                {results.map(product => (
                  <div key={product.id} className={styles.resultCard}>
                    <div className={styles.cardImage}>
                      <Link href={`/shop/${product.category?.slug}/${product.slug}`}>
                        <Image
                          src={`http://localhost:5000${product.images?.[0]}` || '/placeholder.png'}
                          alt={product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </Link>
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>
                        <Link href={`/shop/${product.category?.slug}/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <div className={styles.cardPrice}>
                        {formatPrice(product.price)}
                      </div>
                      <div className={styles.compatibleWith}>
                        Compatible with: {selectedMake} {selectedModel}
                      </div>
                      <div className={styles.cardActions}>
                        <button 
                          className={`${styles.cardButton} ${styles.primary}`}
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stockQty === 0}
                        >
                          Add to Cart
                        </button>
                        <button 
                          className={`${styles.cardButton} ${styles.secondary}`}
                          onClick={() => handleAddToQuote(product)}
                        >
                          Quote
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.noResults}>
              <p>No compatible parts found for {selectedMake} {selectedModel}.</p>
              <p>Please try a different make and model or contact our support team for assistance.</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
