/*
  # Create departments table and update employees table

  1. New Tables
    - `departments`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Changes
    - Update `employees` table
      - Add `department_id` column (uuid, references departments)
      - Remove `department` column
      - Add unique constraint on `name`

  3. Security
    - Enable RLS on `departments` table
    - Add policy for authenticated users to read departments
*/

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to read departments"
  ON departments
  FOR SELECT
  TO authenticated
  USING (true);

-- Create trigger for updating updated_at
CREATE TRIGGER update_departments_updated_at
  BEFORE UPDATE ON departments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert sample departments
INSERT INTO departments (name) VALUES
  ('営業部'),
  ('経理部'),
  ('購買部')
ON CONFLICT (name) DO NOTHING;

-- Update employees table
ALTER TABLE employees 
  ADD COLUMN department_id uuid REFERENCES departments(id),
  ADD CONSTRAINT employees_name_key UNIQUE (name);

-- Update existing employees with department_id
UPDATE employees e
SET department_id = d.id
FROM departments d
WHERE e.department = d.name;

-- Make department_id NOT NULL after updating existing data
ALTER TABLE employees
  ALTER COLUMN department_id SET NOT NULL,
  DROP COLUMN department;

-- Update sales_invoices to use department_id
ALTER TABLE sales_invoices
  ADD COLUMN department_id uuid REFERENCES departments(id);

UPDATE sales_invoices s
SET department_id = d.id
FROM departments d, employees e
WHERE s.employee = e.name
  AND s.department = d.name;

ALTER TABLE sales_invoices
  ALTER COLUMN department_id SET NOT NULL,
  DROP COLUMN department;

-- Update purchase_invoices to use department_id
ALTER TABLE purchase_invoices
  ADD COLUMN department_id uuid REFERENCES departments(id);

UPDATE purchase_invoices p
SET department_id = d.id
FROM departments d, employees e
WHERE p.employee = e.name
  AND p.department = d.name;

ALTER TABLE purchase_invoices
  ALTER COLUMN department_id SET NOT NULL,
  DROP COLUMN department;