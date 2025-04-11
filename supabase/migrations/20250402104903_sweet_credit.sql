/*
  # Add customer and supplier relationships to product numbers

  1. Changes
    - Add customer_id and supplier_id columns to product_numbers table
    - Add foreign key constraints to customers and suppliers tables
    - Add indexes for better query performance

  2. Security
    - Maintain existing RLS policies
*/

-- Add customer and supplier relationships to product_numbers
ALTER TABLE product_numbers
ADD COLUMN customer_id uuid REFERENCES customers(id) ON DELETE RESTRICT,
ADD COLUMN supplier_id uuid REFERENCES suppliers(id) ON DELETE RESTRICT;

-- Create indexes for better performance
CREATE INDEX idx_product_numbers_customer_id ON product_numbers(customer_id);
CREATE INDEX idx_product_numbers_supplier_id ON product_numbers(supplier_id);

-- Update sample data to link customers and suppliers
UPDATE product_numbers
SET customer_id = (SELECT id FROM customers WHERE code = 'C001'),
    supplier_id = (SELECT id FROM suppliers WHERE code = 'S001')
WHERE number = 'TK25A001';

UPDATE product_numbers
SET customer_id = (SELECT id FROM customers WHERE code = 'C002'),
    supplier_id = (SELECT id FROM suppliers WHERE code = 'S002')
WHERE number = 'TK25B002';

UPDATE product_numbers
SET customer_id = (SELECT id FROM customers WHERE code = 'C003'),
    supplier_id = (SELECT id FROM suppliers WHERE code = 'S003')
WHERE number = 'TK25C003';

UPDATE product_numbers
SET customer_id = (SELECT id FROM customers WHERE code = 'C004'),
    supplier_id = (SELECT id FROM suppliers WHERE code = 'S004')
WHERE number = 'TK25D004';

UPDATE product_numbers
SET customer_id = (SELECT id FROM customers WHERE code = 'C005'),
    supplier_id = (SELECT id FROM suppliers WHERE code = 'S005')
WHERE number = 'TK25E005';