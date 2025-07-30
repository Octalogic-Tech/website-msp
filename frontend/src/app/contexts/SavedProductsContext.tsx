'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { savedProductsApi } from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from '../components/shop/ToastContext';

interface SavedProduct {
    id: string;
    userId: string;
    productId: string;
    createdAt: string;
    product: {
        id: string;
        name: string;
        price: number;
        description?: string;
        isActive: boolean;
        category?: {
            id: string;
            name: string;
        };
        brand?: {
            id: string;
            name: string;
        };
    };
}

interface SavedProductsContextType {
    savedProducts: SavedProduct[];
    savedProductIds: Set<string>;
    isProductSaved: (productId: string) => boolean;
    toggleSaveProduct: (productId: string) => Promise<void>;
    loading: boolean;
    refreshSavedProducts: () => Promise<void>;
}

const SavedProductsContext = createContext<SavedProductsContextType | undefined>(undefined);

export function SavedProductsProvider({ children }: { children: ReactNode }) {
    const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
    const [savedProductIds, setSavedProductIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const { showToast } = useToast();

    // Load saved products from localStorage on mount (for persistence)
    useEffect(() => {
        const storedSavedIds = localStorage.getItem('savedProductIds');
        if (storedSavedIds) {
            try {
                const ids = JSON.parse(storedSavedIds);
                setSavedProductIds(new Set(ids));
            } catch (error) {
                console.error('Error parsing saved product IDs from localStorage:', error);
            }
        }
    }, []);

    // Fetch saved products from API when user is available
    useEffect(() => {
        if (user) {
            refreshSavedProducts();
        } else {
            // Clear saved products when user logs out
            setSavedProducts([]);
            setSavedProductIds(new Set());
        }
    }, [user]);

    // Save to localStorage whenever savedProductIds changes
    useEffect(() => {
        localStorage.setItem('savedProductIds', JSON.stringify(Array.from(savedProductIds)));
    }, [savedProductIds]);

    const refreshSavedProducts = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const response = await savedProductsApi.getUserSavedProducts();
            const products = response.savedProducts || [];
            setSavedProducts(products);

            // Update the Set of saved product IDs
            const ids = new Set(products.map((item: SavedProduct) => item.productId));
            setSavedProductIds(ids);
        } catch (error) {
            console.error('Failed to fetch saved products:', error);
            showToast('Failed to load saved products', 'error');
        } finally {
            setLoading(false);
        }
    };

    const isProductSaved = (productId: string): boolean => {
        return savedProductIds.has(productId);
    };

    const toggleSaveProduct = async (productId: string) => {
        const isSaved = isProductSaved(productId);

        // Optimistic update
        const newSavedIds = new Set(savedProductIds);
        if (isSaved) {
            newSavedIds.delete(productId);
        } else {
            newSavedIds.add(productId);
        }
        setSavedProductIds(newSavedIds);

        try {
            if (user) {
                // If user is logged in, sync with backend
                if (isSaved) {
                    await savedProductsApi.removeSavedProduct(productId);
                    showToast('Product removed from saved items', 'success');
                } else {
                    await savedProductsApi.saveProduct(productId);
                    showToast('Product saved to your wishlist', 'success');
                }

                // Refresh the full list to stay in sync
                await refreshSavedProducts();
            } else {
                // If user is not logged in, just show a message
                if (isSaved) {
                    showToast('Product removed from saved items', 'success');
                } else {
                    showToast('Product saved locally. Sign in to sync across devices.', 'info');
                }
            }
        } catch (error) {
            // Revert optimistic update on error
            setSavedProductIds(savedProductIds);
            console.error('Failed to toggle save product:', error);
            showToast('Failed to update saved products', 'error');
        }
    };

    return (
        <SavedProductsContext.Provider
            value={{
                savedProducts,
                savedProductIds,
                isProductSaved,
                toggleSaveProduct,
                loading,
                refreshSavedProducts,
            }}
        >
            {children}
        </SavedProductsContext.Provider>
    );
}

export function useSavedProducts() {
    const context = useContext(SavedProductsContext);
    if (context === undefined) {
        throw new Error('useSavedProducts must be used within a SavedProductsProvider');
    }
    return context;
}