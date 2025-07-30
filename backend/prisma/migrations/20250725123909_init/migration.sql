-- CreateEnum
CREATE TYPE "item_type" AS ENUM ('BUY_NOW', 'REQUEST_QUOTE');

-- CreateEnum
CREATE TYPE "quote_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'EXPIRED');

-- CreateTable
CREATE TABLE "cart_items" (
    "id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "item_type" "item_type" NOT NULL DEFAULT 'BUY_NOW',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" SERIAL NOT NULL,
    "session_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories_products_lnk" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER,
    "product_id" INTEGER,
    "product_ord" DOUBLE PRECISION,

    CONSTRAINT "categories_products_lnk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "machine_makes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "machine_makes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "machine_makes_machine_models_lnk" (
    "id" SERIAL NOT NULL,
    "machine_make_id" INTEGER,
    "machine_model_id" INTEGER,
    "machine_model_ord" DOUBLE PRECISION,

    CONSTRAINT "machine_makes_machine_models_lnk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "machine_models" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "machine_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "machine_models_compatible_parts_lnk" (
    "id" SERIAL NOT NULL,
    "machine_model_id" INTEGER,
    "product_id" INTEGER,
    "product_ord" DOUBLE PRECISION,
    "machine_model_ord" DOUBLE PRECISION,

    CONSTRAINT "machine_models_compatible_parts_lnk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "description" TEXT,
    "stock_status" TEXT,
    "specs" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_items" (
    "id" SERIAL NOT NULL,
    "quote_request_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unit_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "quote_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_requests" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "customer_name" VARCHAR(255),
    "company_name" VARCHAR(255),
    "phone_number" VARCHAR(50),
    "message" TEXT,
    "status" "quote_status" NOT NULL DEFAULT 'PENDING',
    "total_amount" DECIMAL(10,2),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quote_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cart_product_key" ON "cart_items"("cart_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "carts_session_id_key" ON "carts"("session_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_products_lnk_fk" ON "categories_products_lnk"("category_id");

-- CreateIndex
CREATE INDEX "categories_products_lnk_ifk" ON "categories_products_lnk"("product_id");

-- CreateIndex
CREATE INDEX "categories_products_lnk_ofk" ON "categories_products_lnk"("product_ord");

-- CreateIndex
CREATE UNIQUE INDEX "categories_products_lnk_uq" ON "categories_products_lnk"("category_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "machine_makes_name_key" ON "machine_makes"("name");

-- CreateIndex
CREATE INDEX "machine_makes_machine_models_lnk_fk" ON "machine_makes_machine_models_lnk"("machine_make_id");

-- CreateIndex
CREATE INDEX "machine_makes_machine_models_lnk_ifk" ON "machine_makes_machine_models_lnk"("machine_model_id");

-- CreateIndex
CREATE INDEX "machine_makes_machine_models_lnk_ofk" ON "machine_makes_machine_models_lnk"("machine_model_ord");

-- CreateIndex
CREATE UNIQUE INDEX "machine_makes_machine_models_lnk_uq" ON "machine_makes_machine_models_lnk"("machine_make_id", "machine_model_id");

-- CreateIndex
CREATE UNIQUE INDEX "machine_models_name_key" ON "machine_models"("name");

-- CreateIndex
CREATE INDEX "machine_models_compatible_parts_lnk_fk" ON "machine_models_compatible_parts_lnk"("machine_model_id");

-- CreateIndex
CREATE INDEX "machine_models_compatible_parts_lnk_ifk" ON "machine_models_compatible_parts_lnk"("product_id");

-- CreateIndex
CREATE INDEX "machine_models_compatible_parts_lnk_ofk" ON "machine_models_compatible_parts_lnk"("product_ord");

-- CreateIndex
CREATE INDEX "machine_models_compatible_parts_lnk_oifk" ON "machine_models_compatible_parts_lnk"("machine_model_ord");

-- CreateIndex
CREATE UNIQUE INDEX "machine_models_compatible_parts_lnk_uq" ON "machine_models_compatible_parts_lnk"("machine_model_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "quote_items_req_prod_key" ON "quote_items"("quote_request_id", "product_id");

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_products_lnk" ADD CONSTRAINT "categories_products_lnk_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_products_lnk" ADD CONSTRAINT "categories_products_lnk_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "machine_makes_machine_models_lnk" ADD CONSTRAINT "machine_makes_machine_models_lnk_machine_make_id_fkey" FOREIGN KEY ("machine_make_id") REFERENCES "machine_makes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "machine_makes_machine_models_lnk" ADD CONSTRAINT "machine_makes_machine_models_lnk_machine_model_id_fkey" FOREIGN KEY ("machine_model_id") REFERENCES "machine_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "machine_models_compatible_parts_lnk" ADD CONSTRAINT "machine_models_compatible_parts_lnk_machine_model_id_fkey" FOREIGN KEY ("machine_model_id") REFERENCES "machine_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "machine_models_compatible_parts_lnk" ADD CONSTRAINT "machine_models_compatible_parts_lnk_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_items" ADD CONSTRAINT "quote_items_product_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_items" ADD CONSTRAINT "quote_items_request_fkey" FOREIGN KEY ("quote_request_id") REFERENCES "quote_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
