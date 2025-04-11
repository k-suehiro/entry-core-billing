/*
  # Insert sample sales invoice data

  1. Changes
    - Inserts 100 sample sales invoices
    - Each product name includes the product number in parentheses
    - Uses realistic dates, quantities, and prices
    - Links to existing customers, products, and employees

  2. Data Generation
    - Dates range from 2024-01-01 to current date
    - Quantities range from 1 to 10
    - Unit prices vary based on base product price
    - Amount calculated including 10% tax
*/

-- Function to generate random dates between 2024-01-01 and now
CREATE OR REPLACE FUNCTION random_date(start_date date, end_date date)
RETURNS date AS $$
BEGIN
  RETURN start_date + floor(random() * (end_date - start_date + 1))::integer;
END;
$$ LANGUAGE plpgsql;

-- Update product names to include product numbers
UPDATE products p
SET name = CONCAT('(', pn.number, ') ', p.name)
FROM product_numbers pn
WHERE p.id = pn.product_id
  AND p.name NOT LIKE '(%';

-- Insert 100 sample sales invoices
WITH RECURSIVE sales_data AS (
  SELECT 
    generate_series(1, 100) as n,
    (
      SELECT array_agg(id) 
      FROM customers
    ) as customer_ids,
    (
      SELECT array_agg(id) 
      FROM product_numbers
    ) as product_number_ids,
    (
      SELECT array_agg(name) 
      FROM employees
    ) as employee_names,
    (
      SELECT array_agg(id) 
      FROM departments
    ) as department_ids
)
INSERT INTO sales_invoices (
  customer_id,
  date,
  product_number_id,
  quantity,
  unit_price,
  amount,
  employee,
  department_id
)
SELECT
  -- Random customer
  customer_ids[1 + floor(random() * array_length(customer_ids, 1))::integer],
  -- Random date between 2024-01-01 and now
  random_date('2024-01-01'::date, CURRENT_DATE),
  -- Random product number
  product_number_ids[1 + floor(random() * array_length(product_number_ids, 1))::integer],
  -- Random quantity between 1 and 10
  1 + floor(random() * 10)::integer as quantity,
  -- Random unit price between 10000 and 50000
  10000 + floor(random() * 40000)::integer as unit_price,
  -- Calculate amount (will be updated in next step)
  0,
  -- Random employee
  employee_names[1 + floor(random() * array_length(employee_names, 1))::integer],
  -- Random department
  department_ids[1 + floor(random() * array_length(department_ids, 1))::integer]
FROM sales_data;

-- Update amounts to be quantity * unit_price * 1.1 (including 10% tax)
UPDATE sales_invoices
SET amount = (quantity * unit_price * 1.1)::integer
WHERE amount = 0;

-- Drop the temporary function
DROP FUNCTION random_date(date, date);