const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(error.error || `HTTP ${response.status}`);
    }
    return response.json();
};

// Saved Products API
export const savedProductsApi = {
    getUserSavedProducts: async () => {
        const response = await fetch(`${API_BASE_URL}/saved-products`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    saveProduct: async (productId: string) => {
        const response = await fetch(`${API_BASE_URL}/saved-products`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ productId }),
        });
        return handleResponse(response);
    },

    removeSavedProduct: async (productId: string) => {
        const response = await fetch(`${API_BASE_URL}/saved-products/${productId}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },
};

// Orders API
export const ordersApi = {
    getUserOrders: async () => {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    getOrderById: async (orderId: string) => {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    getUserStats: async () => {
        const response = await fetch(`${API_BASE_URL}/orders/stats`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },
};

// Quotes API
export const quotesApi = {
    getUserQuoteRequests: async () => {
        const response = await fetch(`${API_BASE_URL}/quote/user/quotes`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    getUserQuoteById: async (quoteId: string) => {
        const response = await fetch(`${API_BASE_URL}/quote/user/${quoteId}`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    createQuoteRequest: async (quoteData: any) => {
        const response = await fetch(`${API_BASE_URL}/quote`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(quoteData),
        });
        return handleResponse(response);
    },
};