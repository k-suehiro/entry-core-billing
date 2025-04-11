/*
  # Add sample employee data

  1. Changes
    - Insert sample employees with department relationships
*/

-- Insert sample employees
INSERT INTO employees (name, department_id) VALUES
  ('山田太郎', (SELECT id FROM departments WHERE name = '営業部')),
  ('鈴木花子', (SELECT id FROM departments WHERE name = '経理部')),
  ('佐藤一郎', (SELECT id FROM departments WHERE name = '購買部')),
  ('田中美咲', (SELECT id FROM departments WHERE name = '営業部')),
  ('伊藤健一', (SELECT id FROM departments WHERE name = '購買部'))
ON CONFLICT (name) DO UPDATE
SET department_id = EXCLUDED.department_id;