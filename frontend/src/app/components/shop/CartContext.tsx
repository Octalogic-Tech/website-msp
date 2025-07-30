'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from '../../contexts/AuthContext';

type CartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<boolean>;
  removeItem: (itemId: string) => Promise<boolean>;
  updateQuantity: (itemId: string, quantity: number) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  checkout: () => Promise<{ success: boolean; orderNumber?: string; orderId?: string }>;
  total: number;
  itemCount: number;
  isLoading: boolean;
  error: string | null;
};

type BackendCartItem = {
  id: string;
  product: {
    id: string;
    name: string;
    price: string;
    images?: string[];
  };
  quantity: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { user, isLoading: authLoading } = useAuth();

  // Clear cart when user logs out
  useEffect(() => {
    if (!authLoading && !user && isInitialized) {
      console.log('🛒 User logged out, clearing cart');
      setItems([]);
      localStorage.removeItem('cart');
    }
  }, [user, authLoading, isInitialized]);

  // Initialize cart from localStorage first, then try to sync with backend
  useEffect(() => {
    // Wait for auth to initialize before initializing cart
    if (authLoading) return;

    const initializeCart = async () => {
      setIsLoading(true);
      setError(null);

      // Only load from localStorage if user is authenticated
      if (user) {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            const localItems = JSON.parse(savedCart);
            console.log('🛒 Loading cart from localStorage:', localItems);
            setItems(localItems);
          } catch (e) {
            console.error("Failed to parse cart from localStorage:", e);
          }
        }
      } else {
        // If no user, ensure cart is empty and localStorage is cleared
        console.log('🛒 No user authenticated, ensuring cart is empty');
        setItems([]);
        localStorage.removeItem('cart');
      }

      // Then try to sync with backend (only if user is authenticated)
      if (user) {
        try {
          console.log('🛒 Attempting to sync with backend...');
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

          const res = await fetch(`${API_BASE}/cart`, {
            credentials: 'include',
            headers: getAuthHeaders(),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);
          console.log('🛒 Backend sync response status:', res.status);

          if (res.ok) {
            const data = await res.json();
            console.log('🛒 Backend sync response data:', data);

            if (data.success && data.data.items) {
              // Transform backend cart items to our format
              const cartItems = data.data.items.map((item: BackendCartItem) => ({
                id: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
                image: item.product.images?.[0],
              }));
              console.log('🛒 Synced cart items from backend:', cartItems);
              setItems(cartItems);
            }
          } else {
            console.log('🛒 Backend sync failed, continuing with localStorage');
          }
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            console.log("🛒 Backend sync timed out, continuing with localStorage");
          } else {
            console.log("🛒 Backend sync failed, continuing with localStorage:", error);
          }
          // Don't set error state for backend sync failures - just continue with localStorage
        }
      }

      setIsLoading(false);
      setIsInitialized(true);
    };

    initializeCart();
  }, [authLoading, user]);

  // Save cart to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    // Only save to localStorage after initialization to prevent infinite loops
    if (!isInitialized) return;

    // Only save to localStorage if we have items or if we're explicitly clearing
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items));
    } else {
      // Only remove from localStorage if it exists
      const existing = localStorage.getItem('cart');
      if (existing) {
        localStorage.removeItem('cart');
      }
    }
  }, [items, isInitialized]);

  const addItem = async (newItem: CartItem): Promise<boolean> => {
    // Prevent adding items if user is not authenticated
    if (!user) {
      setError('Please log in to add items to cart');
      return false;
    }

    // Prevent multiple simultaneous calls
    if (isLoading) return false;

    setIsLoading(true);
    setError(null);

    // Always update local state first for immediate UI feedback
    console.log('🛒 Adding item to local cart:', newItem);
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

    // Try to sync with backend (optional)
    try {
      console.log('🛒 Syncing add to backend...');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(`${API_BASE}/cart/items`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({
          productId: newItem.id,
          quantity: newItem.quantity || 1,
          itemType: 'BUY_NOW'
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('🛒 Backend add response status:', res.status);

      if (res.ok) {
        const data = await res.json();
        console.log('🛒 Backend add successful:', data);
      } else {
        console.log('🛒 Backend add failed, but local state updated');
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log("🛒 Backend add timed out, but local state updated");
      } else {
        console.log("🛒 Backend add failed, but local state updated:", error);
      }
    } finally {
      setIsLoading(false);
    }

    return true;
  };

  const removeItem = async (itemId: string): Promise<boolean> => {
    // Prevent multiple simultaneous calls
    if (isLoading) return false;

    setIsLoading(true);
    setError(null);

    // Update local state immediately
    console.log('🛒 Removing item from local cart:', itemId);
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));

    // Try to sync with backend (optional)
    try {
      console.log('🛒 Syncing remove to backend...');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      // First get the cart to find the backend item ID
      const cartRes = await fetch(`${API_BASE}/cart`, {
        credentials: 'include',
        headers: getAuthHeaders(),
        signal: controller.signal,
      });

      if (cartRes.ok) {
        const cartData = await cartRes.json();
        if (cartData.success && cartData.data.items) {
          const cartItem = cartData.data.items.find((item: BackendCartItem) => item.product.id === itemId);

          if (cartItem) {
            const deleteRes = await fetch(`${API_BASE}/cart/items/${cartItem.id}`, {
              method: 'DELETE',
              credentials: 'include',
              signal: controller.signal,
            });

            if (deleteRes.ok) {
              console.log('🛒 Backend remove successful');
            } else {
              console.log('🛒 Backend remove failed, but local state updated');
            }
          }
        }
      }

      clearTimeout(timeoutId);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log("🛒 Backend remove timed out, but local state updated");
      } else {
        console.log("🛒 Backend remove failed, but local state updated:", error);
      }
    } finally {
      setIsLoading(false);
    }

    return true;
  };

  const updateQuantity = async (itemId: string, quantity: number): Promise<boolean> => {
    if (quantity < 1) {
      return removeItem(itemId);
    }

    // Prevent multiple simultaneous calls
    if (isLoading) return false;

    setIsLoading(true);
    setError(null);

    // Update local state immediately
    console.log('🛒 Updating quantity in local cart:', itemId, quantity);
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );

    // Try to sync with backend (optional)
    try {
      console.log('🛒 Syncing quantity update to backend...');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      // First get the cart to find the backend item ID
      const cartRes = await fetch(`${API_BASE}/cart`, {
        credentials: 'include',
        headers: getAuthHeaders(),
        signal: controller.signal,
      });

      if (cartRes.ok) {
        const cartData = await cartRes.json();
        if (cartData.success && cartData.data.items) {
          const cartItem = cartData.data.items.find((item: BackendCartItem) => item.product.id === itemId);

          if (cartItem) {
            const updateRes = await fetch(`${API_BASE}/cart/items/${cartItem.id}`, {
              method: 'PUT',
              headers: getAuthHeaders(),
              credentials: 'include',
              body: JSON.stringify({ quantity }),
              signal: controller.signal,
            });

            if (updateRes.ok) {
              console.log('🛒 Backend quantity update successful');
            } else {
              console.log('🛒 Backend quantity update failed, but local state updated');
            }
          }
        }
      }

      clearTimeout(timeoutId);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log("🛒 Backend quantity update timed out, but local state updated");
      } else {
        console.log("🛒 Backend quantity update failed, but local state updated:", error);
      }
    } finally {
      setIsLoading(false);
    }

    return true;
  };

  const clearCart = async (): Promise<boolean> => {
    // Prevent multiple simultaneous calls
    if (isLoading) return false;

    setIsLoading(true);
    setError(null);

    // Clear local state immediately
    console.log('🛒 Clearing local cart');
    setItems([]);

    // Try to sync with backend (optional)
    try {
      console.log('🛒 Syncing clear to backend...');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(`${API_BASE}/cart`, {
        method: 'DELETE',
        credentials: 'include',
        headers: getAuthHeaders(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        console.log('🛒 Backend clear successful');
      } else {
        console.log('🛒 Backend clear failed, but local state cleared');
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log("🛒 Backend clear timed out, but local state cleared");
      } else {
        console.log("🛒 Backend clear failed, but local state cleared:", error);
      }
    } finally {
      setIsLoading(false);
    }

    return true;
  };

  const checkout = async (): Promise<{ success: boolean; orderNumber?: string; orderId?: string }> => {
    if (items.length === 0) {
      setError('Cannot checkout with empty cart');
      return { success: false };
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🛒 Processing checkout...');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ cartItems: items }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        console.log('🛒 Order created successfully:', data);

        // Clear cart after successful order
        await clearCart();

        return {
          success: true,
          orderNumber: data.order.orderNumber,
          orderId: data.order.id
        };
      } else {
        const errorData = await res.json().catch(() => ({ error: 'Checkout failed' }));
        throw new Error(errorData.error || 'Checkout failed');
      }
    } catch (error) {
      console.error('🛒 Checkout error:', error);
      setError((error as Error).message || 'Checkout failed');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const total = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    checkout,
    total,
    itemCount,
    isLoading,
    error,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}