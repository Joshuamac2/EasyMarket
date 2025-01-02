-- New tables for supabase

-- CREATE SEQUENCE users_admin_id_seq START 1;

CREATE TABLE users (
    admin_id INTEGER PRIMARY KEY DEFAULT nextval('users_admin_id_seq'),
    admin_email VARCHAR(255) NOT NULL,
    admin_password VARCHAR(255) NOT NULL,
    admin_registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_status VARCHAR(50) NOT NULL,
    admin_username VARCHAR(255) NOT NULL
);

CREATE TABLE stagingtable (
    id SERIAL PRIMARY KEY,
    reg_email VARCHAR(255) NOT NULL,
    reg_password VARCHAR(255) NOT NULL,
    reg_username VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP NOT NULL,
    ADD COLUMN reg_status VARCHAR(255) DEFAULT 'pending'
);

CREATE TABLE brand_Management (
    brand_id SERIAL PRIMARY KEY,
    brand_name VARCHAR(255) NOT NULL,
    tag_line TEXT NOT NULL,
    our_story TEXT NOT NULL,
    facebook_link TEXT NOT NULL,
    instagram_link TEXT NOT NULL
);

CREATE TABLE customer_service (
    customer_service_id SERIAL PRIMARY KEY,
    shipping_and_returns_policy TEXT NOT NULL,
    shipping_and_returns_dropdown TEXT NOT NULL,
    privacy_policy TEXT NOT NULL,
    shipping_options JSONB
);

CREATE TABLE home_page (
    home_page_id SERIAL PRIMARY KEY,
    home_image TEXT NOT NULL,
    home_logo TEXT NOT NULL,
    home_as_seen TEXT NOT NULL,
    home_story_image TEXT NOT NULL,
    home_story_text TEXT NOT NULL
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    product_details TEXT NOT NULL,
    size_and_fit TEXT NOT NULL,
    image_url TEXT NOT NULL,
    product_type VARCHAR(255) NOT NULL,
    product_location VARCHAR(255) NOT NULL,
    classification_name VARCHAR(255) NOT NULL,
    classification_colour VARCHAR(255) NOT NULL,
    product_linking VARCHAR(255)
);

CREATE TABLE pricing_options (
    pricing_option_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    api_key VARCHAR(255) NOT NULL,
    available_quantity INTEGER NOT NULL,
    sale INTEGER CHECK (sale BETWEEN 1 AND 99)
);

CREATE TABLE product_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT FALSE
);

CREATE TABLE email_templates (
    id SERIAL PRIMARY KEY,
    purchase_email INTEGER,
    newsletter_email INTEGER,
    contact_email INTEGER,
    my_email VARCHAR(255),
    list_id INTEGER
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  items JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  session_id VARCHAR(255),
  email VARCHAR(255),
  name VARCHAR(255),
  address JSONB NOT NULL,
  order_reference VARCHAR(255),
  shipping_options VARCHAR(255),
  subtotal DECIMAL(10, 2),
  total DECIMAL(10, 2),
  status VARCHAR(20) DEFAULT 'Processing',
  completed_date TIMESTAMP,
  completed_by VARCHAR(255),
  stripe_payment_intent VARCHAR(255)
);
