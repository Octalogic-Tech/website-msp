import 'dotenv/config';
import Shopify from 'shopify-api-node';

// Validate Shopify env vars early so we fail with a helpful message.
const {
  SHOPIFY_SHOP_DOMAIN,
  SHOPIFY_API_KEY,
  SHOPIFY_API_PASSWORD,
  SHOPIFY_ACCESS_TOKEN,
} = process.env;

if (!SHOPIFY_SHOP_DOMAIN || !(SHOPIFY_ACCESS_TOKEN || (SHOPIFY_API_KEY && SHOPIFY_API_PASSWORD))) {
  throw new Error(
    'Missing Shopify credentials. Set SHOPIFY_SHOP_DOMAIN and either SHOPIFY_ACCESS_TOKEN or SHOPIFY_API_KEY & SHOPIFY_API_PASSWORD in your .env',
  );
}

const shopify = new Shopify({
  shopName: SHOPIFY_SHOP_DOMAIN as string,
  ...(SHOPIFY_ACCESS_TOKEN
    ? { accessToken: SHOPIFY_ACCESS_TOKEN as string }
    : {
        apiKey: SHOPIFY_API_KEY as string,
        password: SHOPIFY_API_PASSWORD as string,
      }),
});

export const createProduct = async (productData: Shopify.IProduct): Promise<Shopify.IProduct | void> => {
  try {
    const product = await shopify.product.create(productData);
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
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

// ─────────────────────────────────────────────────────────────────────────────
// Types & helper to map Strapi product → Shopify product
// ----------------------------------------------------------------------------
export interface StrapiProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description?: string;
  brand?: string;
  price?: number; // stored in smallest currency unit (e.g. cents)
  productImage?: {
    url: string;
    alternativeText?: string;
    name?: string;
  };
}

const createFullImageUrl = (relativeOrAbsolute: string | undefined): string | undefined => {
  if (!relativeOrAbsolute) return undefined;
  // Already absolute → return as-is
  if (/^https?:\/\//i.test(relativeOrAbsolute)) return relativeOrAbsolute;

  const base = process.env.STRAPI_BASE_URL?.replace(/\/$/, ''); // remove trailing slash
  if (!base) {
    console.warn(
      '⚠️  STRAPI_BASE_URL is not set; image will be skipped because only a relative path was provided:',
      relativeOrAbsolute,
    );
    return undefined;
  }
  const path = relativeOrAbsolute.startsWith('/') ? relativeOrAbsolute : `/${relativeOrAbsolute}`;
  return `${base}${path}`;
};

const buildShopifyProductData = (product: StrapiProduct): Shopify.IProduct => {
  const fullImageUrl = createFullImageUrl(product.productImage?.url);

  const priceStr =
    typeof product.price === 'number'
      ? (product.price / 100).toFixed(2) // assume smallest currency unit
      : '0.00';

  return {
    title: product.name,
    body_html: product.description ?? '',
    vendor: product.brand ?? '',
    handle: product.slug,
    variants: [
      {
        sku: product.sku,
        price: priceStr,
        inventory_management: 'shopify',
      },
    ],
    images:
      fullImageUrl
        ? [
            {
              src: fullImageUrl,
              alt:
                product.productImage?.alternativeText ??
                product.productImage?.name ??
                product.name,
            },
          ]
        : [],
    published: false, // keep as draft; publish manually if desired
  } as unknown as Shopify.IProduct;
};

/**
 * Create a Shopify product from a Strapi payload, including the remote image.
 */
export const createProductFromStrapi = async (
  product: StrapiProduct,
): Promise<Shopify.IProduct | void> => {
  const productData = buildShopifyProductData(product);
  return await createProduct(productData);
};