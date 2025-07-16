import 'dotenv/config';
import Shopify from 'shopify-api-node';

const shopify = new Shopify({
    shopName: process.env.SHOPIFY_SHOP_DOMAIN as string,
    apiKey: process.env.SHOPIFY_API_KEY as string,
    password: process.env.SHOPIFY_API_SECRET as string
});

export const createProduct = async (productData: Shopify.IProduct): Promise<Shopify.IProduct | void> => {
    try {
        const product = await shopify.product.create(productData);
        return product;
    } catch (error) {
        console.error(error);
    }
};

export const getLocations = async (): Promise<Shopify.ILocation[] | void> => {
    try {
        const locations = await shopify.location.list();
        return locations;
    } catch (error) {
        console.error(error);
    }
};

export const updateStock = async (location_id: number, inventory_item_id: number, available: number): Promise<Shopify.IInventoryLevel | void> => {
    try {
        const inventoryLevel = await shopify.inventoryLevel.set({
            location_id,
            inventory_item_id,
            available
        });
        return inventoryLevel;
    } catch (error) {
        console.error('error:', error);
    }
};

export const getProduct = async (productId: number): Promise<Shopify.IProduct | void> => {
    try {
        const product = await shopify.product.get(productId);
        return product;
    } catch (error) {
        console.error(error);
    }
};

export const getAllProducts = async (): Promise<Shopify.IProduct[] | void> => {
    try {
        const products = await shopify.product.list();
        return products;
    } catch (error) {
        console.error(error);
    }
};