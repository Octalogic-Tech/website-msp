/* ────────────────────────────────
   1. ENUM TYPES
   ────────────────────────────────*/
CREATE TYPE item_type    AS ENUM ('BUY_NOW', 'REQUEST_QUOTE');
CREATE TYPE quote_status AS ENUM ('PENDING',  'APPROVED', 'REJECTED', 'EXPIRED');


/* ────────────────────────────────
   2. CARTS
   ────────────────────────────────*/
CREATE TABLE carts (
  id          SERIAL       PRIMARY KEY,
  session_id  VARCHAR(255) NOT NULL,
  created_at  TIMESTAMP(6) NOT NULL DEFAULT now(),
  updated_at  TIMESTAMP(6) NOT NULL DEFAULT now()
);

-- unique index mapped from `@unique(map: "carts_session_id_idx")`
CREATE UNIQUE INDEX carts_session_id_idx ON carts (session_id);


/* ────────────────────────────────
   3. CART_ITEMS
   ────────────────────────────────*/
CREATE TABLE cart_items (
  id          SERIAL       PRIMARY KEY,
  cart_id     INT          NOT NULL,
  product_id  INT          NOT NULL,
  quantity    INT          NOT NULL DEFAULT 1,
  item_type   item_type    NOT NULL DEFAULT 'BUY_NOW',
  created_at  TIMESTAMP(6) NOT NULL DEFAULT now(),
  updated_at  TIMESTAMP(6) NOT NULL DEFAULT now(),

  -- composite uniqueness (@@unique)
  CONSTRAINT cart_items_cart_product_key
    UNIQUE (cart_id, product_id),

  -- FK → carts.id  (map: "cart_items_cart_fkey")
  CONSTRAINT cart_items_cart_fkey
    FOREIGN KEY (cart_id)
    REFERENCES carts(id)
    ON DELETE CASCADE,

  -- FK → products.id  (map: "cart_items_product_fkey")
  CONSTRAINT cart_items_product_fkey
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- helper indexes for the FKs
CREATE INDEX cart_items_cart_id_idx    ON cart_items (cart_id);
CREATE INDEX cart_items_product_id_idx ON cart_items (product_id);


/* ────────────────────────────────
   4. QUOTE_REQUESTS
   ────────────────────────────────*/
CREATE TABLE quote_requests (
  id             SERIAL        PRIMARY KEY,
  email          VARCHAR(255)  NOT NULL,
  customer_name  VARCHAR(255),
  company_name   VARCHAR(255),
  phone_number   VARCHAR(50),
  message        TEXT,
  status         quote_status  NOT NULL DEFAULT 'PENDING',
  total_amount   NUMERIC(10,2),
  created_at     TIMESTAMP(6)  NOT NULL DEFAULT now(),
  updated_at     TIMESTAMP(6)  NOT NULL DEFAULT now()
);


/* ────────────────────────────────
   5. QUOTE_ITEMS
   ────────────────────────────────*/
CREATE TABLE quote_items (
  id               SERIAL        PRIMARY KEY,
  quote_request_id INT           NOT NULL,
  product_id       INT           NOT NULL,
  quantity         INT           NOT NULL DEFAULT 1,
  unit_price       NUMERIC(10,2) NOT NULL,

  CONSTRAINT quote_items_req_prod_key
    UNIQUE (quote_request_id, product_id),

  -- FK → quote_requests.id  (map: "quote_items_request_fkey")
  CONSTRAINT quote_items_request_fkey
    FOREIGN KEY (quote_request_id)
    REFERENCES quote_requests(id)
    ON DELETE CASCADE,

  -- FK → products.id  (map: "quote_items_product_fkey")
  CONSTRAINT quote_items_product_fkey
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

CREATE INDEX quote_items_request_id_idx ON quote_items (quote_request_id);
CREATE INDEX quote_items_product_id_idx ON quote_items (product_id);


/* ────────────────────────────────
   6. SESSION  (Strapi‐style)
   ────────────────────────────────*/
CREATE TABLE session (
  sid    VARCHAR PRIMARY KEY,
  sess   JSON     NOT NULL,
  expire TIMESTAMP(6) NOT NULL
);

-- index from `@@index([expire], map: "IDX_session_expire")`
CREATE INDEX "IDX_session_expire" ON session (expire);