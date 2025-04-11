/*
  # Create suppliers and invoice tables

  1. New Tables
    - `suppliers` (仕入先)
      - `id` (uuid, primary key)
      - `code` (text, unique, 仕入先コード)
      - `name` (text, 仕入先名)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `sales_invoices` (売上伝票)
      - `id` (uuid, primary key)
      - `customer_id` (uuid, foreign key to customers)
      - `date` (date, 日付)
      - `product_number_id` (uuid, foreign key to product_numbers)
      - `quantity` (integer, 数量)
      - `unit_price` (integer, 単価)
      - `amount` (integer, 金額)
      - `employee` (text, 担当者)
      - `department` (text, 担当部門)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `purchase_invoices` (仕入伝票)
      - `id` (uuid, primary key)
      - `supplier_id` (uuid, foreign key to suppliers)
      - `date` (date, 日付)
      - `product_number_id` (uuid, foreign key to product_numbers)
      - `quantity` (integer, 数量)
      - `unit_price` (integer, 単価)
      - `amount` (integer, 金額)
      - `tax_amount` (integer, 消費税)
      - `total_amount` (integer, 合計金額)
      - `employee` (text, 担当者)
      - `department` (text, 担当部門)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read and write data
*/

-- Create suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read suppliers"
  ON suppliers
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample suppliers
INSERT INTO suppliers (code, name) VALUES
  ('S001', '株式会社サプライ'),
  ('S002', '株式会社部品'),
  ('S003', '株式会社製造'),
  ('S004', '株式会社工業'),
  ('S005', 'テック株式会社')
ON CONFLICT (code) DO NOTHING;

-- Create sales_invoices table
CREATE TABLE IF NOT EXISTS sales_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE RESTRICT,
  date date NOT NULL,
  product_number_id uuid REFERENCES product_numbers(id) ON DELETE RESTRICT,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price integer NOT NULL CHECK (unit_price >= 0),
  amount integer NOT NULL CHECK (amount >= 0),
  employee text NOT NULL,
  department text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sales_invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read sales invoices"
  ON sales_invoices
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert sales invoices"
  ON sales_invoices
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update sales invoices"
  ON sales_invoices
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create purchase_invoices table
CREATE TABLE IF NOT EXISTS purchase_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid REFERENCES suppliers(id) ON DELETE RESTRICT,
  date date NOT NULL,
  product_number_id uuid REFERENCES product_numbers(id) ON DELETE RESTRICT,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price integer NOT NULL CHECK (unit_price >= 0),
  amount integer NOT NULL CHECK (amount >= 0),
  tax_amount integer NOT NULL CHECK (tax_amount >= 0),
  total_amount integer NOT NULL CHECK (total_amount >= 0),
  employee text NOT NULL,
  department text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE purchase_invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read purchase invoices"
  ON purchase_invoices
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert purchase invoices"
  ON purchase_invoices
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update purchase invoices"
  ON purchase_invoices
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add triggers for updating updated_at timestamp
CREATE TRIGGER update_suppliers_updated_at
  BEFORE UPDATE ON suppliers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_sales_invoices_updated_at
  BEFORE UPDATE ON sales_invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_purchase_invoices_updated_at
  BEFORE UPDATE ON purchase_invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();