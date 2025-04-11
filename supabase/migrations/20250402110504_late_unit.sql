-- Drop existing sales_invoices table if it exists
DROP TABLE IF EXISTS sales_invoices CASCADE;

-- Recreate sales_invoices table with correct structure
CREATE TABLE sales_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE RESTRICT NOT NULL,
  date date NOT NULL,
  product_number_id uuid REFERENCES product_numbers(id) ON DELETE RESTRICT NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price integer NOT NULL CHECK (unit_price >= 0),
  amount integer NOT NULL CHECK (amount >= 0),
  employee text NOT NULL,
  department_id uuid REFERENCES departments(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sales_invoices ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Create trigger for updating updated_at
CREATE TRIGGER update_sales_invoices_updated_at
  BEFORE UPDATE ON sales_invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert sample data
INSERT INTO sales_invoices (
  customer_id,
  date,
  product_number_id,
  quantity,
  unit_price,
  amount,
  employee,
  department_id
) VALUES (
  (SELECT id FROM customers WHERE code = 'C001'),
  '2024-04-02',
  (SELECT id FROM product_numbers WHERE number = 'TK25A001'),
  2,
  15000,
  33000,
  '山田太郎',
  (SELECT id FROM departments WHERE name = '営業部')
);