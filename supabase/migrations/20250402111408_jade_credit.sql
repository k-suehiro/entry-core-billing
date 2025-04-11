/*
  # Update product numbers customer relationship

  1. Changes
    - Add NOT NULL constraint to customer_id in product_numbers table
    - This ensures each product number is associated with exactly one customer

  2. Data Migration
    - Updates existing product numbers to ensure they have a customer_id
    - Uses the first customer if none is assigned

  3. Constraints
    - Adds NOT NULL constraint after data migration
*/

-- Ensure all product numbers have a customer_id
UPDATE product_numbers
SET customer_id = (
  SELECT id 
  FROM customers 
  ORDER BY code 
  LIMIT 1
)
WHERE customer_id IS NULL;

-- Make customer_id NOT NULL
ALTER TABLE product_numbers
  ALTER COLUMN customer_id SET NOT NULL;

-- Add comment explaining the relationship
COMMENT ON COLUMN product_numbers.customer_id IS 'Each product number must be associated with exactly one customer';