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
    // New categories
    prisma.category.upsert({
      where: { slug: 'dumptrucks' },
      update: {},
      create: {
        name: 'Dump Trucks',
        slug: 'dumptrucks',
        description: 'Heavy-duty dump trucks for material transportation',
        imageUrl: '/uploads/categories/dumptrucks.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'hydraulics' },
      update: {},
      create: {
        name: 'Hydraulics',
        slug: 'hydraulics',
        description: 'Hydraulic components and systems for heavy equipment',
        imageUrl: '/uploads/categories/hydraulics.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'filters' },
      update: {},
      create: {
        name: 'Filters',
        slug: 'filters',
        description: 'Air, oil, fuel and hydraulic filters for construction equipment',
        imageUrl: '/uploads/categories/filters.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'undercarriage' },
      update: {},
      create: {
        name: 'Undercarriage',
        slug: 'undercarriage',
        description: 'Track chains, rollers, idlers and other undercarriage components',
        imageUrl: '/uploads/categories/undercarriage.jpg',
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
    // Additional brands
    prisma.brand.upsert({
      where: { slug: 'volvo' },
      update: {},
      create: {
        name: 'Volvo',
        slug: 'volvo',
        description: 'Swedish manufacturer of construction equipment and trucks',
        logoUrl: '/uploads/brands/volvo.jpg',
        website: 'https://www.volvoce.com',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'hitachi' },
      update: {},
      create: {
        name: 'Hitachi',
        slug: 'hitachi',
        description: 'Japanese manufacturer of construction and mining equipment',
        logoUrl: '/uploads/brands/hitachi.jpg',
        website: 'https://www.hitachicm.com',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'john-deere' },
      update: {},
      create: {
        name: 'John Deere',
        slug: 'john-deere',
        description: 'American corporation that manufactures agricultural and construction equipment',
        logoUrl: '/uploads/brands/john-deere.jpg',
        website: 'https://www.deere.com',
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
        condition: 'New',
        availability: 'In stock'
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
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[0].id, // Excavators
      brandId: brands[1].id, // Komatsu
    },
    {
      name: 'Volvo EC220E Excavator',
      slug: 'volvo-ec220e-excavator',
      description: 'Volvo EC220E delivers high performance with excellent fuel efficiency and operator comfort.',
      price: 290000,
      stockQty: 2,
      images: [
        '/uploads/products/volvo-ec220e-1.jpg',
        '/uploads/products/volvo-ec220e-2.jpg'
      ],
      specs: {
        enginePower: '128 kW (172 hp)',
        operatingWeight: '22500 kg',
        bucketCapacity: '0.7-1.3 m³',
        maxDigDepth: '6.7 m',
        maxReach: '10.1 m',
        fuelTankCapacity: '420 L',
        compatibleMakes: ['Volvo'],
        modelYear: 2023,
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[0].id, // Excavators
      brandId: brands[2].id, // Volvo
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
        condition: 'New',
        availability: 'In stock'
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
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[1].id, // Loaders
      brandId: brands[1].id, // Komatsu
    },
    // Dump Trucks
    {
      name: 'CAT 740 Articulated Dump Truck',
      slug: 'cat-740-articulated-dump-truck',
      description: 'The Cat 740 ADT delivers exceptional performance in the most demanding off-road hauling applications.',
      price: 450000,
      stockQty: 3,
      images: [
        '/uploads/products/cat-740-1.jpg',
        '/uploads/products/cat-740-2.jpg'
      ],
      specs: {
        enginePower: '276 kW (370 hp)',
        operatingWeight: '22300 kg',
        payloadCapacity: '23.5 metric tons',
        heapedCapacity: '14.3 m³',
        fuelTankCapacity: '450 L',
        compatibleMakes: ['Caterpillar'],
        modelYear: 2023,
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[3].id, // Dump Trucks
      brandId: brands[0].id, // Caterpillar
    },
    {
      name: 'Volvo A30G Articulated Hauler',
      slug: 'volvo-a30g-articulated-hauler',
      description: 'Volvo A30G offers high productivity, fuel efficiency and operator comfort for demanding hauling applications.',
      price: 435000,
      stockQty: 2,
      images: [
        '/uploads/products/volvo-a30g-1.jpg',
        '/uploads/products/volvo-a30g-2.jpg'
      ],
      specs: {
        enginePower: '261 kW (350 hp)',
        operatingWeight: '21500 kg',
        payloadCapacity: '28 metric tons',
        heapedCapacity: '16.7 m³',
        fuelTankCapacity: '430 L',
        compatibleMakes: ['Volvo'],
        modelYear: 2023,
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[3].id, // Dump Trucks
      brandId: brands[2].id, // Volvo
    },
    // Hydraulics
    {
      name: 'CAT Hydraulic Cylinder Kit',
      slug: 'cat-hydraulic-cylinder-kit',
      description: 'Complete hydraulic cylinder kit for CAT excavators, including seals and mounting hardware.',
      price: 3850,
      stockQty: 8,
      images: [
        '/uploads/products/cat-hydraulic-cylinder-1.jpg'
      ],
      specs: {
        partNumber: 'CAT-HYD-CYL-001',
        weight: '85 kg',
        warranty: '12 months',
        compatibleMakes: ['Caterpillar'],
        compatibleModels: ['320', '325', '330'],
        pressureRating: '350 bar',
        genuine: true,
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[4].id, // Hydraulics
      brandId: brands[0].id, // Caterpillar
    },
    {
      name: 'Komatsu Hydraulic Pump Rebuild Kit',
      slug: 'komatsu-hydraulic-pump-rebuild-kit',
      description: 'Complete rebuild kit for Komatsu hydraulic pumps, includes all necessary seals and components.',
      price: 1250,
      stockQty: 12,
      images: [
        '/uploads/products/komatsu-pump-kit-1.jpg'
      ],
      specs: {
        partNumber: 'KOM-HYD-PUMP-KIT-001',
        weight: '5.5 kg',
        warranty: '6 months',
        compatibleMakes: ['Komatsu'],
        compatibleModels: ['PC200', 'PC210', 'PC220'],
        pressureRating: '320 bar',
        genuine: true,
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[4].id, // Hydraulics
      brandId: brands[1].id, // Komatsu
    },
    // Filters
    {
      name: 'CAT Engine Oil Filter Kit',
      slug: 'cat-engine-oil-filter-kit',
      description: 'Complete engine oil filter kit for CAT equipment, includes all necessary gaskets and seals.',
      price: 145,
      stockQty: 25,
      images: [
        '/uploads/products/cat-oil-filter-1.jpg'
      ],
      specs: {
        partNumber: 'CAT-OIL-FILTER-001',
        weight: '3.2 kg',
        warranty: '12 months',
        compatibleMakes: ['Caterpillar'],
        compatibleModels: ['320', '950', '740'],
        micronRating: '10 microns',
        genuine: true,
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[5].id, // Filters
      brandId: brands[0].id, // Caterpillar
    },
    {
      name: 'Komatsu Air Filter Assembly',
      slug: 'komatsu-air-filter-assembly',
      description: 'Complete air filter assembly for Komatsu equipment, includes pre-cleaner and mounting hardware.',
      price: 225,
      stockQty: 15,
      images: [
        '/uploads/products/komatsu-air-filter-1.jpg'
      ],
      specs: {
        partNumber: 'KOM-AIR-FILTER-001',
        weight: '4.8 kg',
        warranty: '12 months',
        compatibleMakes: ['Komatsu'],
        compatibleModels: ['PC200', 'WA380', 'HD785'],
        filtrationEfficiency: '99.9%',
        genuine: true,
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[5].id, // Filters
      brandId: brands[1].id, // Komatsu
    },
    // Undercarriage
    {
      name: 'CAT Track Roller Assembly',
      slug: 'cat-track-roller-assembly',
      description: 'Complete track roller assembly for CAT excavators, built for durability in tough conditions.',
      price: 2850,
      stockQty: 6,
      images: [
        '/uploads/products/cat-track-roller-1.jpg'
      ],
      specs: {
        partNumber: 'CAT-TRACK-ROLLER-001',
        weight: '125 kg',
        warranty: '12 months',
        compatibleMakes: ['Caterpillar'],
        compatibleModels: ['320', '325', '330'],
        material: 'Forged steel',
        genuine: true,
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[6].id, // Undercarriage
      brandId: brands[0].id, // Caterpillar
    },
    {
      name: 'Komatsu Track Link Assembly',
      slug: 'komatsu-track-link-assembly',
      description: 'Heavy-duty track link assembly for Komatsu excavators, designed for extended service life.',
      price: 3200,
      stockQty: 4,
      images: [
        '/uploads/products/komatsu-track-link-1.jpg'
      ],
      specs: {
        partNumber: 'KOM-TRACK-LINK-001',
        weight: '180 kg',
        warranty: '12 months',
        compatibleMakes: ['Komatsu'],
        compatibleModels: ['PC200', 'PC210', 'PC220'],
        material: 'Heat-treated alloy steel',
        genuine: true,
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[6].id, // Undercarriage
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
        condition: 'New',
        availability: 'In stock'
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
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[2].id, // Spare Parts
      brandId: brands[1].id, // Komatsu
    },
    // Additional products
    {
      name: 'Hitachi ZX350LC-6 Excavator',
      slug: 'hitachi-zx350lc-6-excavator',
      description: 'Hitachi ZX350LC-6 offers superior digging power and fuel efficiency with advanced hydraulic system.',
      price: 345000,
      stockQty: 2,
      images: [
        '/uploads/products/hitachi-zx350-1.jpg',
        '/uploads/products/hitachi-zx350-2.jpg'
      ],
      specs: {
        enginePower: '194 kW (260 hp)',
        operatingWeight: '34900 kg',
        bucketCapacity: '1.4-2.1 m³',
        maxDigDepth: '7.8 m',
        maxReach: '11.4 m',
        fuelTankCapacity: '600 L',
        compatibleMakes: ['Hitachi'],
        modelYear: 2023,
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[0].id, // Excavators
      brandId: brands[3].id, // Hitachi
    },
    {
      name: 'John Deere 644K Wheel Loader',
      slug: 'john-deere-644k-wheel-loader',
      description: 'John Deere 644K offers excellent visibility, comfort and productivity for material handling applications.',
      price: 335000,
      stockQty: 3,
      images: [
        '/uploads/products/john-deere-644k-1.jpg',
        '/uploads/products/john-deere-644k-2.jpg'
      ],
      specs: {
        enginePower: '174 kW (233 hp)',
        operatingWeight: '17300 kg',
        bucketCapacity: '3.1-4.2 m³',
        maxDumpHeight: '3.0 m',
        maxReach: '1.3 m',
        fuelTankCapacity: '350 L',
        compatibleMakes: ['John Deere'],
        modelYear: 2023,
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[1].id, // Loaders
      brandId: brands[4].id, // John Deere
    },
    {
      name: 'Volvo L90H Wheel Loader',
      slug: 'volvo-l90h-wheel-loader',
      description: 'Volvo L90H delivers high performance with excellent fuel efficiency and operator comfort.',
      price: 325000,
      stockQty: 2,
      images: [
        '/uploads/products/volvo-l90h-1.jpg',
        '/uploads/products/volvo-l90h-2.jpg'
      ],
      specs: {
        enginePower: '168 kW (225 hp)',
        operatingWeight: '16700 kg',
        bucketCapacity: '2.9-4.0 m³',
        maxDumpHeight: '2.9 m',
        maxReach: '1.2 m',
        fuelTankCapacity: '340 L',
        compatibleMakes: ['Volvo'],
        modelYear: 2023,
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[1].id, // Loaders
      brandId: brands[2].id, // Volvo
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
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[4].id, // Hydraulics
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
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[6].id, // Undercarriage
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
        condition: 'New',
        availability: 'In stock'
      },
      categoryId: categories[6].id, // Undercarriage
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
        condition: 'New',
        availability: 'In stock'
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