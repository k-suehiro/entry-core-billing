/*
  # 担当者テーブルの追加

  1. New Tables
    - `employees`
      - `id` (uuid, primary key)
      - `name` (text)
      - `department` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `employees` table
    - Add policy for authenticated users to read data
*/

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  department text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to read employees"
  ON employees
  FOR SELECT
  TO authenticated
  USING (true);

-- Create trigger for updating updated_at
CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert sample data
INSERT INTO employees (name, department) VALUES
  ('山田太郎', '営業部'),
  ('鈴木花子', '経理部'),
  ('佐藤一郎', '購買部'),
  ('田中美咲', '営業部'),
  ('伊藤健一', '購買部')
ON CONFLICT DO NOTHING;