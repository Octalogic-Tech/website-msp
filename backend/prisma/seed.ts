import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'excavators' },
      update: {},
      create: {
        name: 'Excavators',
        slug: 'excavators',
        description: 'Heavy-duty excavators for construction and earthmoving',
        imageUrl: '/uploads/categories/excavators.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'loaders' },
      update: {},
      create: {
        name: 'Loaders',
        slug: 'loaders',
        description: 'Wheel loaders and track loaders for material handling',
        imageUrl: '/uploads/categories/loaders.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'spare-parts' },
      update: {},
      create: {
        name: 'Spare Parts',
        slug: 'spare-parts',
        description: 'Genuine and aftermarket spare parts for construction machinery',
        imageUrl: '/uploads/categories/spare-parts.jpg',
      },
    }),
  ]);

  console.log('✅ Categories created');

  // Create brands
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'caterpillar' },
      update: {},
      create: {
        name: 'Caterpillar',
        slug: 'caterpillar',
        description: 'Leading manufacturer of construction and mining equipment',
        logoUrl: '/uploads/brands/caterpillar.jpg',
        website: 'https://www.caterpillar.com',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'komatsu' },
      update: {},
      create: {
        name: 'Komatsu',
        slug: 'komatsu',
        description: 'Japanese multinational corporation that manufactures construction equipment',
        logoUrl: '/uploads/brands/komatsu.jpg',
        website: 'https://www.komatsu.com',
      },
    }),
  ]);

  console.log('✅ Brands created');

  // Create products
  const products = [
    // Excavators
    {
      name: 'CAT 320 Hydraulic Excavator',
      slug: 'cat-320-hydraulic-excavator',
      description: 'The Cat 320 delivers superior performance, fuel efficiency, and operator comfort for medium-sized excavation jobs.',
      price: 285000,
      stockQty: 5,
      images: [
        '/uploads/products/cat-320-1.jpg',
        '/uploads/products/cat-320-2.jpg',
        '/uploads/products/cat-320-3.jpg'
      ],
      specs: {
        enginePower: '122 kW (164 hp)',
        operatingWeight: '20500 kg',
        bucketCapacity: '0.6-1.2 m³',
        maxDigDepth: '6.5 m',
        maxReach: '9.9 m',
        fuelTankCapacity: '410 L',
        compatibleMakes: ['Caterpillar'],
        modelYear: 2024,
      },
      categoryId: categories[0].id, // Excavators
      brandId: brands[0].id, // Caterpillar
    },
    {
      name: 'Komatsu PC200 Excavator',
      slug: 'komatsu-pc200-excavator',
      description: 'Komatsu PC200 offers exceptional fuel efficiency and productivity with advanced hydraulic technology.',
      price: 275000,
      stockQty: 3,
      images: [
        '/uploads/products/komatsu-pc200-1.jpg',
        '/uploads/products/komatsu-pc200-2.jpg'
      ],
      specs: {
        enginePower: '110 kW (148 hp)',
        operatingWeight: '19800 kg',
        bucketCapacity: '0.8-1.0 m³',
        maxDigDepth: '6.4 m',
        maxReach: '9.8 m',
        fuelTankCapacity: '400 L',
        compatibleMakes: ['Komatsu'],
        modelYear: 2024,
      },
      categoryId: categories[0].id, // Excavators
      brandId: brands[1].id, // Komatsu
    },
    // Loaders
    {
      name: 'CAT 950M Wheel Loader',
      slug: 'cat-950m-wheel-loader',
      description: 'The Cat 950M Wheel Loader delivers outstanding performance and fuel efficiency for loading and material handling.',
      price: 320000,
      stockQty: 4,
      images: [
        '/uploads/products/cat-950m-1.jpg',
        '/uploads/products/cat-950m-2.jpg'
      ],
      specs: {
        enginePower: '164 kW (220 hp)',
        operatingWeight: '16200 kg',
        bucketCapacity: '2.6-3.8 m³',
        maxDumpHeight: '2.8 m',
        maxReach: '1.2 m',
        fuelTankCapacity: '325 L',
        compatibleMakes: ['Caterpillar'],
        modelYear: 2024,
      },
      categoryId: categories[1].id, // Loaders
      brandId: brands[0].id, // Caterpillar
    },
    {
      name: 'Komatsu WA380 Wheel Loader',
      slug: 'komatsu-wa380-wheel-loader',
      description: 'Komatsu WA380 provides excellent stability and lifting capacity for heavy-duty loading operations.',
      price: 310000,
      stockQty: 2,
      images: [
        '/uploads/products/komatsu-wa380-1.jpg'
      ],
      specs: {
        enginePower: '155 kW (208 hp)',
        operatingWeight: '15800 kg',
        bucketCapacity: '2.4-3.6 m³',
        maxDumpHeight: '2.7 m',
        maxReach: '1.1 m',
        fuelTankCapacity: '310 L',
        compatibleMakes: ['Komatsu'],
        modelYear: 2024,
      },
      categoryId: categories[1].id, // Loaders
      brandId: brands[1].id, // Komatsu
    },
    // Spare Parts
    {
      name: 'CAT Hydraulic Pump Assembly',
      slug: 'cat-hydraulic-pump-assembly',
      description: 'Genuine CAT hydraulic pump assembly suitable for 320 series excavators.',
      price: 8500,
      stockQty: 12,
      images: [
        '/uploads/products/cat-hydraulic-pump-1.jpg'
      ],
      specs: {
        partNumber: 'CAT-320-PUMP-001',
        weight: '45 kg',
        warranty: '12 months',
        compatibleMakes: ['Caterpillar'],
        compatibleModels: ['320', '320D', '320E', '320F'],
        genuine: true,
      },
      categoryId: categories[2].id, // Spare Parts
      brandId: brands[0].id, // Caterpillar
    },
    {
      name: 'Engine Filter Kit - Komatsu',
      slug: 'engine-filter-kit-komatsu',
      description: 'Complete engine filter kit including oil filter, fuel filter, and air filter for Komatsu excavators.',
      price: 285,
      stockQty: 25,
      images: [
        '/uploads/products/komatsu-filter-kit-1.jpg'
      ],
      specs: {
        partNumber: 'KOM-FILTER-KIT-001',
        weight: '2.5 kg',
        warranty: '6 months',
        compatibleMakes: ['Komatsu'],
        compatibleModels: ['PC200', 'PC210', 'PC220'],
        genuine: true,
        kitContents: ['Oil Filter', 'Fuel Filter', 'Air Filter', 'Installation Instructions'],
      },
      categoryId: categories[2].id, // Spare Parts
      brandId: brands[1].id, // Komatsu
    },
    {
      name: 'Universal Hydraulic Hose Set',
      slug: 'universal-hydraulic-hose-set',
      description: 'High-quality hydraulic hose set compatible with multiple excavator brands.',
      price: 425,
      stockQty: 18,
      images: [
        '/uploads/products/hydraulic-hose-set-1.jpg'
      ],
      specs: {
        partNumber: 'UNIV-HOSE-SET-001',
        weight: '8 kg',
        warranty: '24 months',
        compatibleMakes: ['Caterpillar', 'Komatsu', 'JCB', 'Volvo'],
        pressure: '350 bar',
        temperature: '-40°C to +100°C',
        genuine: false,
        aftermarket: true,
      },
      categoryId: categories[2].id, // Spare Parts
      brandId: brands[0].id, // Caterpillar (using as default)
    },
    {
      name: 'Track Chain Assembly - CAT',
      slug: 'track-chain-assembly-cat',
      description: 'Heavy-duty track chain assembly for CAT excavators, built for durability and performance.',
      price: 12500,
      stockQty: 6,
      images: [
        '/uploads/products/cat-track-chain-1.jpg',
        '/uploads/products/cat-track-chain-2.jpg'
      ],
      specs: {
        partNumber: 'CAT-TRACK-001',
        weight: '850 kg',
        warranty: '18 months',
        compatibleMakes: ['Caterpillar'],
        compatibleModels: ['320', '325', '330'],
        material: 'Heat-treated steel',
        genuine: true,
      },
      categoryId: categories[2].id, // Spare Parts
      brandId: brands[0].id, // Caterpillar
    },
    {
      name: 'Bucket Teeth Set - Universal',
      slug: 'bucket-teeth-set-universal',
      description: 'Durable bucket teeth set suitable for various excavator models and applications.',
      price: 185,
      stockQty: 30,
      images: [
        '/uploads/products/bucket-teeth-1.jpg'
      ],
      specs: {
        partNumber: 'UNIV-TEETH-001',
        weight: '15 kg',
        warranty: '12 months',
        compatibleMakes: ['Caterpillar', 'Komatsu', 'JCB', 'Hitachi'],
        material: 'Forged steel',
        setSize: '5 teeth + pins',
        genuine: false,
        aftermarket: true,
      },
      categoryId: categories[2].id, // Spare Parts
      brandId: brands[0].id, // Caterpillar (using as default)
    },
    {
      name: 'Komatsu Cab Glass Set',
      slug: 'komatsu-cab-glass-set',
      description: 'Complete cab glass replacement set for Komatsu excavators, including all windows.',
      price: 1250,
      stockQty: 8,
      images: [
        '/uploads/products/komatsu-glass-set-1.jpg'
      ],
      specs: {
        partNumber: 'KOM-GLASS-SET-001',
        weight: '65 kg',
        warranty: '36 months',
        compatibleMakes: ['Komatsu'],
        compatibleModels: ['PC200', 'PC210', 'PC220', 'PC240'],
        material: 'Tempered safety glass',
        setContents: ['Front windshield', 'Rear window', '2x Side windows', 'Door glass'],
        genuine: true,
      },
      categoryId: categories[2].id, // Spare Parts
      brandId: brands[1].id, // Komatsu
    },
  ];

  // Create products
  for (const productData of products) {
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData,
    });
  }

  console.log('✅ Products created');
  console.log(`📊 Database seeded with:`);
  console.log(`   - ${categories.length} categories`);
  console.log(`   - ${brands.length} brands`);
  console.log(`   - ${products.length} products`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
