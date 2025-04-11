/*
  # Create reference tables for customers, products, and product numbers

  1. New Tables
    - `customers` (得意先マスター)
      - `id` (uuid, primary key)
      - `code` (text, unique, 得意先コード)
      - `name` (text, 得意先名)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `product_numbers` (製番マスター)
      - `id` (uuid, primary key)
      - `number` (text, unique, 製番)
      - `product_id` (uuid, foreign key to products)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `products` (品名マスター)
      - `id` (uuid, primary key)
      - `name` (text, 品名)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read customers"
  ON customers
  FOR SELECT
  TO authenticated
  USING (true);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

-- Create product_numbers table
CREATE TABLE IF NOT EXISTS product_numbers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text UNIQUE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE product_numbers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read product numbers"
  ON product_numbers
  FOR SELECT
  TO authenticated
  USING (true);

-- Add trigger for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_product_numbers_updated_at
  BEFORE UPDATE ON product_numbers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert sample data
INSERT INTO customers (code, name) VALUES
  ('C001', '株式会社テスト'),
  ('C002', '株式会社サンプル'),
  ('C003', '株式会社開発'),
  ('C004', '株式会社システム'),
  ('C005', 'テクノ株式会社')
ON CONFLICT (code) DO NOTHING;

INSERT INTO products (id, name) VALUES
  ('11111111-1111-1111-1111-111111111111', 'テスト部品A'),
  ('22222222-2222-2222-2222-222222222222', 'テスト部品B'),
  ('33333333-3333-3333-3333-333333333333', '制御基板X'),
  ('44444444-4444-4444-4444-444444444444', 'センサーユニットY'),
  ('55555555-5555-5555-5555-555555555555', 'モーターZ')
ON CONFLICT (id) DO NOTHING;

INSERT INTO product_numbers (number, product_id) VALUES
  ('TK25A001', '11111111-1111-1111-1111-111111111111'),
  ('TK25B002', '22222222-2222-2222-2222-222222222222'),
  ('TK25C003', '33333333-3333-3333-3333-333333333333'),
  ('TK25D004', '44444444-4444-4444-4444-444444444444'),
  ('TK25E005', '55555555-5555-5555-5555-555555555555')
ON CONFLICT (number) DO NOTHING;