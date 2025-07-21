'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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

const API_BASE = "http://localhost:5000/api";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/cart`, {
          credentials: 'include',
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch cart: ${res.status}`);
        }
        
        const data = await res.json();
        if (data.success && data.data.items) {
          // Transform backend cart items to our format
          const cartItems = data.data.items.map((item: BackendCartItem) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.images?.[0],
          }));
          setItems(cartItems);
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        setError("Failed to load your cart. Using local storage instead.");
        
        // Fall back to localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart));
          } catch (e) {
            console.error("Failed to parse cart from localStorage:", e);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = async (newItem: CartItem): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // Add to backend
      const res = await fetch(`${API_BASE}/cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: newItem.id,
          quantity: newItem.quantity || 1,
          itemType: 'BUY_NOW'
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Failed to add item to cart: ${res.status}`);
      }

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to add item to cart');
      }

      // Refresh cart from backend
      const cartRes = await fetch(`${API_BASE}/cart`, {
        credentials: 'include',
      });
      
      if (!cartRes.ok) {
        throw new Error(`Failed to refresh cart: ${cartRes.status}`);
      }
      
      const cartData = await cartRes.json();
      if (cartData.success && cartData.data.items) {
        const cartItems = cartData.data.items.map((item: BackendCartItem) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images?.[0],
        }));
        setItems(cartItems);
        return true;
      }
      
      throw new Error('Failed to refresh cart after adding item');
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      setError((error as Error).message || 'Failed to add item to cart');
      
      // Fall back to local state update
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
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (itemId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // Find the cart item ID from the backend
      const res = await fetch(`${API_BASE}/cart`, {
        credentials: 'include',
      });
      
      if (!res.ok) {
        console.error(`Failed to fetch cart: ${res.status}`);
        throw new Error(`Failed to fetch cart: ${res.status}`);
      }
      
      const data = await res.json();
      if (!data.success) {
        console.error('API returned success: false when fetching cart', data);
        throw new Error(data.error || 'Failed to fetch cart');
      }
      
      if (!data.data.items) {
        console.error('Cart items not found in response', data);
        throw new Error('Cart items not found');
      }
      
      const cartItem = data.data.items.find((item: BackendCartItem) => item.product.id === itemId);
      
      if (!cartItem) {
        console.error('Cart item not found for product ID:', itemId);
        throw new Error('Cart item not found');
      }
      
      // Remove from backend
      const deleteRes = await fetch(`${API_BASE}/cart/items/${cartItem.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (!deleteRes.ok) {
        console.error(`Failed to remove item from cart: ${deleteRes.status}`);
        throw new Error(`Failed to remove item from cart: ${deleteRes.status}`);
      }
      
      const deleteData = await deleteRes.json();
      if (!deleteData.success) {
        console.error('API returned success: false when removing item', deleteData);
        throw new Error(deleteData.error || 'Failed to remove item from cart');
      }
      
      console.log('Item removed from cart successfully');
      
      // Update local state
      setItems(currentItems => currentItems.filter(item => item.id !== itemId));
      return true;
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      setError((error as Error).message || 'Failed to remove item from cart');
      
      // Fall back to local state update
      setItems(currentItems => currentItems.filter(item => item.id !== itemId));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number): Promise<boolean> => {
    if (quantity < 1) {
      return removeItem(itemId);
    }
    
    setIsLoading(true);
    setError(null);
    try {
      // Find the cart item ID from the backend
      const res = await fetch(`${API_BASE}/cart`, {
        credentials: 'include',
      });
      
      if (!res.ok) {
        console.error(`Failed to fetch cart: ${res.status}`);
        throw new Error(`Failed to fetch cart: ${res.status}`);
      }
      
      const data = await res.json();
      if (!data.success) {
        console.error('API returned success: false when fetching cart', data);
        throw new Error(data.error || 'Failed to fetch cart');
      }
      
      if (!data.data.items) {
        console.error('Cart items not found in response', data);
        throw new Error('Cart items not found');
      }
      
      const cartItem = data.data.items.find((item: BackendCartItem) => item.product.id === itemId);
      
      if (!cartItem) {
        console.error('Cart item not found for product ID:', itemId);
        throw new Error('Cart item not found');
      }
      
      // Update in backend
      const updateRes = await fetch(`${API_BASE}/cart/items/${cartItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          quantity,
        }),
      });
      
      if (!updateRes.ok) {
        console.error(`Failed to update item quantity: ${updateRes.status}`);
        throw new Error(`Failed to update item quantity: ${updateRes.status}`);
      }
      
      const updateData = await updateRes.json();
      if (!updateData.success) {
        console.error('API returned success: false when updating quantity', updateData);
        throw new Error(updateData.error || 'Failed to update item quantity');
      }
      
      console.log(`Item quantity updated to ${quantity}`);
      
      // Update local state
      setItems(currentItems =>
        currentItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
      return true;
    } catch (error) {
      console.error("Failed to update item quantity:", error);
      setError((error as Error).message || 'Failed to update item quantity');
      
      // Fall back to local state update
      setItems(currentItems =>
        currentItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // Clear cart in backend
      const res = await fetch(`${API_BASE}/cart`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (!res.ok) {
        console.error(`Failed to clear cart: ${res.status}`);
        throw new Error(`Failed to clear cart: ${res.status}`);
      }
      
      const data = await res.json();
      if (!data.success) {
        console.error('API returned success: false when clearing cart', data);
        throw new Error(data.error || 'Failed to clear cart');
      }
      
      console.log('Cart cleared successfully');
      
      // Clear local state
      setItems([]);
      return true;
    } catch (error) {
      console.error("Failed to clear cart:", error);
      setError((error as Error).message || 'Failed to clear cart');
      
      // Clear local state anyway
      setItems([]);
      return false;
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