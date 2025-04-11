/*
  # Update departments and employees structure

  1. Changes
    - Create departments table if not exists
    - Add department relationships
    - Update existing data
    - Set NOT NULL constraints
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

-- Create policy if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'departments' 
    AND policyname = 'Allow authenticated users to read departments'
  ) THEN
    CREATE POLICY "Allow authenticated users to read departments"
      ON departments
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Create trigger for updating updated_at if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_departments_updated_at'
  ) THEN
    CREATE TRIGGER update_departments_updated_at
      BEFORE UPDATE ON departments
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;

-- Insert sample departments
INSERT INTO departments (name) VALUES
  ('営業部'),
  ('経理部'),
  ('購買部')
ON CONFLICT (name) DO NOTHING;

-- Update employees table
DO $$ 
BEGIN
  -- Add department_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'employees' AND column_name = 'department_id'
  ) THEN
    ALTER TABLE employees ADD COLUMN department_id uuid REFERENCES departments(id);
  END IF;

  -- Add name unique constraint if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'employees' AND constraint_name = 'employees_name_key'
  ) THEN
    ALTER TABLE employees ADD CONSTRAINT employees_name_key UNIQUE (name);
  END IF;
END $$;

-- Update existing employees with department_id
DO $$
DECLARE
  emp RECORD;
  dept_id uuid;
BEGIN
  FOR emp IN SELECT * FROM employees WHERE department_id IS NULL
  LOOP
    -- Get the department ID based on the employee's current department assignment
    SELECT id INTO dept_id 
    FROM departments 
    WHERE name = (
      SELECT department 
      FROM employees 
      WHERE id = emp.id
    );

    IF dept_id IS NOT NULL THEN
      UPDATE employees 
      SET department_id = dept_id 
      WHERE id = emp.id;
    END IF;
  END LOOP;
END $$;

-- Make department_id NOT NULL after updating existing data
ALTER TABLE employees
  ALTER COLUMN department_id SET NOT NULL;

-- Update purchase_invoices to use department_id
DO $$ 
BEGIN
  -- Add department_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'purchase_invoices' AND column_name = 'department_id'
  ) THEN
    ALTER TABLE purchase_invoices ADD COLUMN department_id uuid REFERENCES departments(id);
  END IF;
END $$;

-- Update purchase invoices with department_id
DO $$
DECLARE
  inv RECORD;
  dept_id uuid;
BEGIN
  FOR inv IN SELECT * FROM purchase_invoices WHERE department_id IS NULL
  LOOP
    -- Get the department ID based on the employee's department
    SELECT departments.id INTO dept_id
    FROM departments
    INNER JOIN employees ON employees.department_id = departments.id
    WHERE employees.name = inv.employee
    LIMIT 1;

    IF dept_id IS NOT NULL THEN
      UPDATE purchase_invoices 
      SET department_id = dept_id 
      WHERE id = inv.id;
    END IF;
  END LOOP;
END $$;

-- Make department_id NOT NULL after updating existing data
ALTER TABLE purchase_invoices
  ALTER COLUMN department_id SET NOT NULL;