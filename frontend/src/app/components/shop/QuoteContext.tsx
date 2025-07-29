'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type QuoteItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image?: string;
  make?: string;
  model?: string;
  year?: string;
  specifications?: Record<string, string>;
};

type QuoteContextType = {
  items: QuoteItem[];
  addItem: (item: QuoteItem) => Promise<boolean>;
  removeItem: (itemId: string) => Promise<boolean>;
  updateQuantity: (itemId: string, quantity: number) => Promise<boolean>;
  clearQuote: () => Promise<boolean>;
  itemCount: number;
  submitQuote: (customerInfo: CustomerInfo) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
};

type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
};

const API_BASE = "http://localhost:5000/api";

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load quote from localStorage on mount
  useEffect(() => {
    const savedQuote = localStorage.getItem('quote');
    if (savedQuote) {
      try {
        setItems(JSON.parse(savedQuote));
      } catch (e) {
        console.error("Failed to parse quote from localStorage:", e);
      }
    }
  }, []);

  // Save quote to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quote', JSON.stringify(items));
  }, [items]);

  const addItem = async (newItem: QuoteItem): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // For quotes, we're using local storage only for now
      // But we could add API integration here in the future
      setItems(currentItems => {
        const existingItem = currentItems.find(item => item.id === newItem.id);
        if (existingItem) {
          return currentItems.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
              : item
          );
        }
        return [...currentItems, { ...newItem, quantity: newItem.quantity || 1 }];
      });
      
      // Show success feedback (could be a toast notification in a real app)
      console.log('Item added to quote successfully');
      return true;
    } catch (error) {
      console.error("Failed to add item to quote:", error);
      setError((error as Error).message || 'Failed to add item to quote');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (itemId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      setItems(currentItems => currentItems.filter(item => item.id !== itemId));
      console.log('Item removed from quote successfully');
      return true;
    } catch (error) {
      console.error("Failed to remove item from quote:", error);
      setError((error as Error).message || 'Failed to remove item from quote');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      if (quantity < 1) {
        return removeItem(itemId);
      }
      
      setItems(currentItems =>
        currentItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
      console.log(`Item quantity updated to ${quantity}`);
      return true;
    } catch (error) {
      console.error("Failed to update item quantity:", error);
      setError((error as Error).message || 'Failed to update item quantity');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearQuote = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      setItems([]);
      console.log('Quote cleared successfully');
      return true;
    } catch (error) {
      console.error("Failed to clear quote:", error);
      setError((error as Error).message || 'Failed to clear quote');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const submitQuote = async (customerInfo: CustomerInfo): Promise<boolean> => {
    if (items.length === 0) {
      setError('Cannot submit an empty quote');
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      // Format data according to backend API expectations
      const quoteData = {
        customerInfo: {
          name: customerInfo.name.trim(),
          email: customerInfo.email.trim(),
          phone: customerInfo.phone.trim(),
          company: customerInfo.company?.trim() || '',
        },
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        notes: customerInfo.message?.trim() || '',
      };
      
      console.log('Submitting quote data:', quoteData);
      
      const response = await fetch(`${API_BASE}/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(quoteData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Failed to submit quote:', errorData);
        throw new Error(errorData.error || `Failed to submit quote: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        console.error('API returned success: false', data);
        throw new Error(data.error || 'Failed to submit quote');
      }
      
      console.log('Quote submitted successfully:', data.message || 'Success');
      
      // Clear quote on successful submission
      await clearQuote();
      return true;
    } catch (error) {
      console.error('Error submitting quote:', error);
      setError((error as Error).message || 'Failed to submit quote');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearQuote,
    itemCount,
    submitQuote,
    isLoading,
    error,
  };

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}