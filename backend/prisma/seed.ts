import { PrismaClient, item_type, quote_status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱  Seeding database with test data...');

  // ---- Clean up existing data (optional for idempotent reruns) ----
  await prisma.cart_items.deleteMany();
  await prisma.categories_products_lnk.deleteMany();
  await prisma.machine_models_compatible_parts_lnk.deleteMany();
  await prisma.machine_makes_machine_models_lnk.deleteMany();
  await prisma.products.deleteMany();
  await prisma.categories.deleteMany();
  await prisma.carts.deleteMany();
  await prisma.quote_items.deleteMany();
  await prisma.quote_requests.deleteMany();

  // ---- Seed Categories ----
  const categories = await Promise.all([
    prisma.categories.create({
      data: {
        name: 'Hydraulics',
        slug: 'hydraulics',
      },
    }),
    prisma.categories.create({
      data: {
        name: 'Undercarriage',
        slug: 'undercarriage',
      },
    }),
  ]);

  // ---- Seed a Product ----
  const hydraulicPump = await prisma.products.create({
    data: {
      name: 'Hydraulic Pump',
      slug: 'hydraulic-pump',
      sku: 'HYD-PUMP-001',
      stock_status: 'IN_STOCK',
      description: 'High-pressure hydraulic pump compatible with multiple excavators',
      specs: {
        pressure: '350 bar',
        warranty: '24 months',
      },
    },
  });

  // Link product to a category via join table
  await prisma.categories_products_lnk.create({
    data: {
      category_id: categories[0].id, // Hydraulics
      product_id: hydraulicPump.id,
      product_ord: 1,
    },
  });

  // ---- Create a Cart and add the product ----
  const cart = await prisma.carts.create({
    data: { session_id: 'test-session-1' },
  });

  await prisma.cart_items.create({
    data: {
      cart_id: cart.id,
      product_id: hydraulicPump.id,
      quantity: 2,
      item_type: item_type.BUY_NOW,
    },
  });

  // ---- Quote request flow ----
  const quoteReq = await prisma.quote_requests.create({
    data: {
      email: 'john@example.com',
      customer_name: 'John Doe',
      company_name: 'JD Construction',
      phone_number: '+1-555-123-4567',
      message: 'Need bulk pricing on hydraulic pumps',
      status: quote_status.PENDING,
    },
  });

  await prisma.quote_items.create({
    data: {
      quote_request_id: quoteReq.id,
      product_id: hydraulicPump.id,
      quantity: 1,
      unit_price: 1200.0,
    },
  });

  console.log('✅  Seed completed successfully');
  console.log(`   • Categories: ${categories.length}`);
  console.log('   • Products : 1');
  console.log('   • Cart with items and quote request created');
}

main()
  .catch((e) => {
    console.error('❌  Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });