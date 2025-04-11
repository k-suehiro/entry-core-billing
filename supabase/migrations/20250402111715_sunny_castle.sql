-- Function to generate random dates between 2024-01-01 and now
CREATE OR REPLACE FUNCTION random_date(start_date date, end_date date)
RETURNS date AS $$
BEGIN
  RETURN start_date + floor(random() * (end_date - start_date + 1))::integer;
END;
$$ LANGUAGE plpgsql;

-- Update product names to include product numbers
DO $$ 
BEGIN
  UPDATE products p
  SET name = CONCAT('(', pn.number, ') ', p.name)
  FROM product_numbers pn
  WHERE p.id = pn.product_id
    AND p.name NOT LIKE '(%';
END $$;

-- Insert 100 sample sales invoices
DO $$ 
DECLARE
  v_customer_ids uuid[];
  v_product_number_ids uuid[];
  v_employee_names text[];
  v_department_ids uuid[];
  v_quantity integer;
  v_unit_price integer;
  v_amount integer;
  i integer;
BEGIN
  -- Get arrays of IDs and names
  SELECT array_agg(id) INTO v_customer_ids FROM customers;
  SELECT array_agg(id) INTO v_product_number_ids FROM product_numbers;
  SELECT array_agg(name) INTO v_employee_names FROM employees;
  SELECT array_agg(id) INTO v_department_ids FROM departments;

  -- Insert 100 records
  FOR i IN 1..100 LOOP
    -- Generate random values
    v_quantity := 1 + floor(random() * 10)::integer;
    v_unit_price := 10000 + floor(random() * 40000)::integer;
    v_amount := (v_quantity * v_unit_price * 1.1)::integer;

    -- Insert the record
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
      v_customer_ids[1 + floor(random() * array_length(v_customer_ids, 1))::integer],
      random_date('2024-01-01'::date, CURRENT_DATE),
      v_product_number_ids[1 + floor(random() * array_length(v_product_number_ids, 1))::integer],
      v_quantity,
      v_unit_price,
      v_amount,
      v_employee_names[1 + floor(random() * array_length(v_employee_names, 1))::integer],
      v_department_ids[1 + floor(random() * array_length(v_department_ids, 1))::integer]
    );
  END LOOP;
END $$;

-- Drop the temporary function
DROP FUNCTION IF EXISTS random_date(date, date);