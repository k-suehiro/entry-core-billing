# Entry Core Billing システム データベース定義書

## 1. データベース概要

### 1.1 データベース名
entry_core_billing

### 1.2 データベース管理システム
MySQL 8.0以降

### 1.3 文字コード
UTF-8 (utf8mb4)

### 1.4 照合順序
utf8mb4_unicode_ci

---

## 2. テーブル一覧

| No | テーブル名 | 論理名 | 用途 |
|----|-----------|--------|------|
| 1 | departments | 部門マスター | 部門情報の管理 |
| 2 | employees | 担当者マスター | 担当者情報の管理 |
| 3 | customers | 得意先マスター | 得意先情報の管理 |
| 4 | suppliers | 仕入先マスター | 仕入先情報の管理 |
| 5 | products | 品名マスター | 品名情報の管理 |
| 6 | product_numbers | 製番マスター | 製番情報の管理 |
| 7 | sales_invoice_headers | 売上伝票ヘッダー | 売上伝票の基本情報 |
| 8 | sales_invoice_details | 売上伝票明細 | 売上伝票の明細情報 |
| 9 | purchase_invoice_headers | 仕入伝票ヘッダー | 仕入伝票の基本情報 |
| 10 | purchase_invoice_details | 仕入伝票明細 | 仕入伝票の明細情報 |
| 11 | work_codes | 作業コードマスター | 作業分類の管理 |

---

## 3. テーブル定義

### 3.1 departments（部門マスター）

| カラム名 | データ型 | 長さ | NULL | デフォルト | 主キー | 外部キー | 説明 |
|---------|---------|------|------|-----------|--------|----------|------|
| id | CHAR | 36 | NOT NULL | UUID() | ○ | - | 部門ID（UUID） |
| code | VARCHAR | 10 | NOT NULL | - | - | - | 部門コード |
| name | VARCHAR | 100 | NOT NULL | - | - | - | 部門名 |
| created_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | - | - | 作成日時 |
| updated_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | - | - | 更新日時 |

**インデックス**
- PRIMARY KEY (id)
- UNIQUE KEY uk_departments_code (code)
- UNIQUE KEY uk_departments_name (name)

**サンプルデータ**
```sql
INSERT INTO departments (id, code, name) VALUES
('dept-001', 'TKY', '東京事業所'),
('dept-002', 'HMM', '浜松事業所');
```

### 3.2 employees（担当者マスター）

| カラム名 | データ型 | 長さ | NULL | デフォルト | 主キー | 外部キー | 説明 |
|---------|---------|------|------|-----------|--------|----------|------|
| id | CHAR | 36 | NOT NULL | UUID() | ○ | - | 担当者ID（UUID） |
| code | VARCHAR | 10 | NOT NULL | - | - | - | 担当者コード |
| name | VARCHAR | 100 | NOT NULL | - | - | - | 担当者名 |
| department_id | CHAR | 36 | NOT NULL | - | - | departments.id | 部門ID |
| email | VARCHAR | 255 | NULL | - | - | - | メールアドレス |
| phone | VARCHAR | 20 | NULL | - | - | - | 電話番号 |
| is_active | BOOLEAN | - | NOT NULL | TRUE | - | - | 有効フラグ |
| created_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | - | - | 作成日時 |
| updated_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | - | - | 更新日時 |

**インデックス**
- PRIMARY KEY (id)
- UNIQUE KEY uk_employees_code (code)
- UNIQUE KEY uk_employees_name (name)
- KEY idx_employees_department_id (department_id)

**外部キー制約**
- FOREIGN KEY (department_id) REFERENCES departments(id)

### 3.3 customers（得意先マスター）

| カラム名 | データ型 | 長さ | NULL | デフォルト | 主キー | 外部キー | 説明 |
|---------|---------|------|------|-----------|--------|----------|------|
| id | CHAR | 36 | NOT NULL | UUID() | ○ | - | 得意先ID（UUID） |
| code | VARCHAR | 10 | NOT NULL | - | - | - | 得意先コード（C001形式） |
| name | VARCHAR | 200 | NOT NULL | - | - | - | 得意先名 |
| tax_type | ENUM | - | NOT NULL | '課税' | - | - | 税区分（'課税','不課税'） |
| postal_code | VARCHAR | 10 | NULL | - | - | - | 郵便番号 |
| address | VARCHAR | 500 | NULL | - | - | - | 住所 |
| phone | VARCHAR | 20 | NULL | - | - | - | 電話番号 |
| fax | VARCHAR | 20 | NULL | - | - | - | FAX番号 |
| email | VARCHAR | 255 | NULL | - | - | - | メールアドレス |
| contact_person | VARCHAR | 100 | NULL | - | - | - | 担当者名 |
| is_active | BOOLEAN | - | NOT NULL | TRUE | - | - | 有効フラグ |
| created_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | - | - | 作成日時 |
| updated_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | - | - | 更新日時 |

**インデックス**
- PRIMARY KEY (id)
- UNIQUE KEY uk_customers_code (code)
- KEY idx_customers_name (name)
- KEY idx_customers_tax_type (tax_type)

### 3.4 suppliers（仕入先マスター）

| カラム名 | データ型 | 長さ | NULL | デフォルト | 主キー | 外部キー | 説明 |
|---------|---------|------|------|-----------|--------|----------|------|
| id | CHAR | 36 | NOT NULL | UUID() | ○ | - | 仕入先ID（UUID） |
| code | VARCHAR | 10 | NOT NULL | - | - | - | 仕入先コード（V001形式） |
| name | VARCHAR | 200 | NOT NULL | - | - | - | 仕入先名 |
| postal_code | VARCHAR | 10 | NULL | - | - | - | 郵便番号 |
| address | VARCHAR | 500 | NULL | - | - | - | 住所 |
| phone | VARCHAR | 20 | NULL | - | - | - | 電話番号 |
| fax | VARCHAR | 20 | NULL | - | - | - | FAX番号 |
| email | VARCHAR | 255 | NULL | - | - | - | メールアドレス |
| contact_person | VARCHAR | 100 | NULL | - | - | - | 担当者名 |
| payment_terms | VARCHAR | 100 | NULL | - | - | - | 支払条件 |
| is_active | BOOLEAN | - | NOT NULL | TRUE | - | - | 有効フラグ |
| created_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | - | - | 作成日時 |
| updated_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | - | - | 更新日時 |

**インデックス**
- PRIMARY KEY (id)
- UNIQUE KEY uk_suppliers_code (code)
- KEY idx_suppliers_name (name)

### 3.5 products（品名マスター）

| カラム名 | データ型 | 長さ | NULL | デフォルト | 主キー | 外部キー | 説明 |
|---------|---------|------|------|-----------|--------|----------|------|
| id | CHAR | 36 | NOT NULL | UUID() | ○ | - | 品名ID（UUID） |
| code | VARCHAR | 20 | NOT NULL | - | - | - | 品名コード |
| name | VARCHAR | 500 | NOT NULL | - | - | - | 品名 |
| category | VARCHAR | 100 | NULL | - | - | - | 品目分類 |
| unit | VARCHAR | 10 | NOT NULL | '個' | - | - | 単位 |
| standard_price | DECIMAL | 10,2 | NULL | - | - | - | 標準単価 |
| description | TEXT | - | NULL | - | - | - | 説明 |
| is_active | BOOLEAN | - | NOT NULL | TRUE | - | - | 有効フラグ |
| created_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | - | - | 作成日時 |
| updated_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | - | - | 更新日時 |

**インデックス**
- PRIMARY KEY (id)
- UNIQUE KEY uk_products_code (code)
- KEY idx_products_name (name)
- KEY idx_products_category (category)

### 3.6 product_numbers（製番マスター）

| カラム名 | データ型 | 長さ | NULL | デフォルト | 主キー | 外部キー | 説明 |
|---------|---------|------|------|-----------|--------|----------|------|
| id | CHAR | 36 | NOT NULL | UUID() | ○ | - | 製番ID（UUID） |
| number | VARCHAR | 8 | NOT NULL | - | - | - | 製番（TK25X999形式） |
| product_id | CHAR | 36 | NOT NULL | - | - | products.id | 品名ID |
| customer_id | CHAR | 36 | NOT NULL | - | - | customers.id | 得意先ID |
| supplier_id | CHAR | 36 | NULL | - | - | suppliers.id | 仕入先ID |
| revision | VARCHAR | 10 | NULL | - | - | - | 版数 |
| status | ENUM | - | NOT NULL | 'active' | - | - | ステータス（'active','inactive','obsolete'） |
| created_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | - | - | 作成日時 |
| updated_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | - | - | 更新日時 |

**インデックス**
- PRIMARY KEY (id)
- UNIQUE KEY uk_product_numbers_number (number)
- KEY idx_product_numbers_product_id (product_id)
- KEY idx_product_numbers_customer_id (customer_id)
- KEY idx_product_numbers_supplier_id (supplier_id)

**外部キー制約**
- FOREIGN KEY (product_id) REFERENCES products(id)
- FOREIGN KEY (customer_id) REFERENCES customers(id)
- FOREIGN KEY (supplier_id) REFERENCES suppliers(id)

### 3.7 work_codes（作業コードマスター）

| カラム名 | データ型 | 長さ | NULL | デフォルト | 主キー | 外部キー | 説明 |
|---------|---------|------|------|-----------|--------|----------|------|
| id | CHAR | 36 | NOT NULL | UUID() | ○ | - | 作業コードID（UUID） |
| code | VARCHAR | 10 | NOT NULL | - | - | - | 作業コード |
| name | VARCHAR | 100 | NOT NULL | - | - | - | 作業名 |
| category | VARCHAR | 50 | NULL | - | - | - | 作業分類 |
| sort_order | INT | - | NOT NULL | 0 | - | - | 表示順序 |
| is_active | BOOLEAN | - | NOT NULL | TRUE | - | - | 有効フラグ |
| created_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | - | - | 作成日時 |
| updated_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | - | - | 更新日時 |

**インデックス**
- PRIMARY KEY (id)
- UNIQUE KEY uk_work_codes_code (code)
- KEY idx_work_codes_category (category)
- KEY idx_work_codes_sort_order (sort_order)

**サンプルデータ**
```sql
INSERT INTO work_codes (id, code, name, category, sort_order) VALUES
('wc-001', '10000', '原稿作成', '制作', 1),
('wc-002', '20000', '翻訳', '制作', 2),
('wc-003', '30000', '編集', '制作', 3),
('wc-004', '40000', 'デザイン', '制作', 4),
('wc-005', '50000', 'イラスト', '制作', 5),
('wc-006', '70000', 'DTP', '制作', 6),
('wc-007', '100000', '製版', '印刷', 7),
('wc-008', '105000', 'CD/DVD', '印刷', 8),
('wc-009', '110000', 'その他', '印刷', 9),
('wc-010', '130000', '印刷', '印刷', 10),
('wc-011', '150000', '製本', '印刷', 11);
```

### 3.8 sales_invoice_headers（売上伝票ヘッダー）

| カラム名 | データ型 | 長さ | NULL | デフォルト | 主キー | 外部キー | 説明 |
|---------|---------|------|------|-----------|--------|----------|------|
| id | CHAR | 36 | NOT NULL | UUID() | ○ | - | 売上伝票ID（UUID） |
| invoice_number | VARCHAR | 20 | NOT NULL | - | - | - | 請求番号（SI000001形式） |
| customer_id | CHAR | 36 | NOT NULL | - | - | customers.id | 得意先ID |
| invoice_date | DATE | - | NOT NULL | - | - | - | 請求日 |
| due_date | DATE | - | NULL | - | - | - | 支払期限 |
| employee_id | CHAR | 36 | NOT NULL | - | - | employees.id | 担当者ID |
| department_id | CHAR | 36 | NOT NULL | - | - | departments.id | 部門ID |
| subtotal_amount | DECIMAL | 12,2 | NOT NULL | 0 | - | - | 小計金額 |
| tax_amount | DECIMAL | 12,2 | NOT NULL | 0 | - | - | 消費税額 |
| total_amount | DECIMAL | 12,2 | NOT NULL | 0 | - | - | 合計金額 |
| status | ENUM | - | NOT NULL | 'draft' | - | - | ステータス（'draft','confirmed','billed','paid'） |
| notes | TEXT | - | NULL | - | - | - | 備考 |
| created_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | - | - | 作成日時 |
| updated_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | - | - | 更新日時 |

**インデックス**
- PRIMARY KEY (id)
- UNIQUE KEY uk_sales_invoice_headers_invoice_number (invoice_number)
- KEY idx_sales_invoice_headers_customer_id (customer_id)
- KEY idx_sales_invoice_headers_invoice_date (invoice_date)
- KEY idx_sales_invoice_headers_employee_id (employee_id)
- KEY idx_sales_invoice_headers_department_id (department_id)
- KEY idx_sales_invoice_headers_status (status)

**外部キー制約**
- FOREIGN KEY (customer_id) REFERENCES customers(id)
- FOREIGN KEY (employee_id) REFERENCES employees(id)
- FOREIGN KEY (department_id) REFERENCES departments(id)

### 3.9 sales_invoice_details（売上伝票明細）

| カラム名 | データ型 | 長さ | NULL | デフォルト | 主キー | 外部キー | 説明 |
|---------|---------|------|------|-----------|--------|----------|------|
| id | CHAR | 36 | NOT NULL | UUID() | ○ | - | 明細ID（UUID） |
| header_id | CHAR | 36 | NOT NULL | - | - | sales_invoice_headers.id | ヘッダーID |
| line_number | INT | - | NOT NULL | - | - | - | 行番号 |
| product_number_id | CHAR | 36 | NOT NULL | - | - | product_numbers.id | 製番ID |
| product_name | VARCHAR | 500 | NOT NULL | - | - | - | 品名 |
| quantity | DECIMAL | 10,3 | NOT NULL | - | - | - | 数量 |
| unit | VARCHAR | 10 | NOT NULL | '個' | - | - | 単位 |
| unit_price | DECIMAL | 10,2 | NOT NULL | - | - | - | 単価 |
| amount | DECIMAL | 12,2 | NOT NULL | - | - | - | 金額 |
| notes | VARCHAR | 500 | NULL | - | - | - | 備考 |
| created_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | - | - | 作成日時 |
| updated_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | - | - | 更新日時 |

**インデックス**
- PRIMARY KEY (id)
- UNIQUE KEY uk_sales_invoice_details_header_line (header_id, line_number)
- KEY idx_sales_invoice_details_product_number_id (product_number_id)

**外部キー制約**
- FOREIGN KEY (header_id) REFERENCES sales_invoice_headers(id) ON DELETE CASCADE
- FOREIGN KEY (product_number_id) REFERENCES product_numbers(id)

### 3.10 purchase_invoice_headers（仕入伝票ヘッダー）

| カラム名 | データ型 | 長さ | NULL | デフォルト | 主キー | 外部キー | 説明 |
|---------|---------|------|------|-----------|--------|----------|------|
| id | CHAR | 36 | NOT NULL | UUID() | ○ | - | 仕入伝票ID（UUID） |
| order_number | VARCHAR | 7 | NOT NULL | - | - | - | 発注番号（7桁数字） |
| supplier_id | CHAR | 36 | NOT NULL | - | - | suppliers.id | 仕入先ID |
| delivery_note_number | VARCHAR | 20 | NULL | - | - | - | 納品書番号 |
| invoice_date | DATE | - | NOT NULL | - | - | - | 日付 |
| delivery_date | DATE | - | NULL | - | - | - | 納期 |
| employee_id | CHAR | 36 | NOT NULL | - | - | employees.id | 担当者ID |
| department_id | CHAR | 36 | NOT NULL | - | - | departments.id | 部門ID |
| subtotal_amount | DECIMAL | 12,2 | NOT NULL | 0 | - | - | 小計金額 |
| tax_amount | DECIMAL | 12,2 | NOT NULL | 0 | - | - | 消費税額 |
| total_amount | DECIMAL | 12,2 | NOT NULL | 0 | - | - | 合計金額 |
| status | ENUM | - | NOT NULL | 'draft' | - | - | ステータス（'draft','confirmed','received','paid'） |
| notes | TEXT | - | NULL | - | - | - | 備考 |
| created_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | - | - | 作成日時 |
| updated_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | - | - | 更新日時 |

**インデックス**
- PRIMARY KEY (id)
- UNIQUE KEY uk_purchase_invoice_headers_order_number (order_number)
- KEY idx_purchase_invoice_headers_supplier_id (supplier_id)
- KEY idx_purchase_invoice_headers_invoice_date (invoice_date)
- KEY idx_purchase_invoice_headers_employee_id (employee_id)
- KEY idx_purchase_invoice_headers_department_id (department_id)
- KEY idx_purchase_invoice_headers_status (status)

**外部キー制約**
- FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
- FOREIGN KEY (employee_id) REFERENCES employees(id)
- FOREIGN KEY (department_id) REFERENCES departments(id)

### 3.11 purchase_invoice_details（仕入伝票明細）

| カラム名 | データ型 | 長さ | NULL | デフォルト | 主キー | 外部キー | 説明 |
|---------|---------|------|------|-----------|--------|----------|------|
| id | CHAR | 36 | NOT NULL | UUID() | ○ | - | 明細ID（UUID） |
| header_id | CHAR | 36 | NOT NULL | - | - | purchase_invoice_headers.id | ヘッダーID |
| line_number | INT | - | NOT NULL | - | - | - | 行番号 |
| product_number_id | CHAR | 36 | NOT NULL | - | - | product_numbers.id | 製番ID |
| product_name | VARCHAR | 500 | NOT NULL | - | - | - | 品名 |
| work_code_id | CHAR | 36 | NOT NULL | - | - | work_codes.id | 作業コードID |
| quantity | DECIMAL | 10,3 | NOT NULL | - | - | - | 数量 |
| unit | VARCHAR | 10 | NOT NULL | '個' | - | - | 単位 |
| unit_price | DECIMAL | 10,2 | NOT NULL | - | - | - | 単価 |
| amount | DECIMAL | 12,2 | NOT NULL | - | - | - | 金額 |
| notes | VARCHAR | 500 | NULL | - | - | - | 備考 |
| created_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP | - | - | 作成日時 |
| updated_at | TIMESTAMP | - | NOT NULL | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | - | - | 更新日時 |

**インデックス**
- PRIMARY KEY (id)
- UNIQUE KEY uk_purchase_invoice_details_header_line (header_id, line_number)
- KEY idx_purchase_invoice_details_product_number_id (product_number_id)
- KEY idx_purchase_invoice_details_work_code_id (work_code_id)

**外部キー制約**
- FOREIGN KEY (header_id) REFERENCES purchase_invoice_headers(id) ON DELETE CASCADE
- FOREIGN KEY (product_number_id) REFERENCES product_numbers(id)
- FOREIGN KEY (work_code_id) REFERENCES work_codes(id)

---

## 4. ビュー定義

### 4.1 v_sales_invoice_summary（売上伝票サマリービュー）

```sql
CREATE VIEW v_sales_invoice_summary AS
SELECT 
    h.id,
    h.invoice_number,
    h.invoice_date,
    c.code AS customer_code,
    c.name AS customer_name,
    c.tax_type,
    e.name AS employee_name,
    d.name AS department_name,
    h.total_amount,
    COUNT(dt.id) AS detail_count,
    h.status,
    h.created_at,
    h.updated_at
FROM sales_invoice_headers h
INNER JOIN customers c ON h.customer_id = c.id
INNER JOIN employees e ON h.employee_id = e.id
INNER JOIN departments d ON h.department_id = d.id
LEFT JOIN sales_invoice_details dt ON h.id = dt.header_id
GROUP BY h.id, h.invoice_number, h.invoice_date, c.code, c.name, c.tax_type, 
         e.name, d.name, h.total_amount, h.status, h.created_at, h.updated_at;
```

### 4.2 v_purchase_invoice_summary（仕入伝票サマリービュー）

```sql
CREATE VIEW v_purchase_invoice_summary AS
SELECT 
    h.id,
    h.order_number,
    h.invoice_date,
    s.code AS supplier_code,
    s.name AS supplier_name,
    h.delivery_note_number,
    e.name AS employee_name,
    d.name AS department_name,
    h.total_amount,
    COUNT(dt.id) AS detail_count,
    h.status,
    h.created_at,
    h.updated_at
FROM purchase_invoice_headers h
INNER JOIN suppliers s ON h.supplier_id = s.id
INNER JOIN employees e ON h.employee_id = e.id
INNER JOIN departments d ON h.department_id = d.id
LEFT JOIN purchase_invoice_details dt ON h.id = dt.header_id
GROUP BY h.id, h.order_number, h.invoice_date, s.code, s.name, h.delivery_note_number,
         e.name, d.name, h.total_amount, h.status, h.created_at, h.updated_at;
```

### 4.3 v_product_number_master（製番マスタービュー）

```sql
CREATE VIEW v_product_number_master AS
SELECT 
    pn.id,
    pn.number,
    p.code AS product_code,
    p.name AS product_name,
    p.unit,
    c.code AS customer_code,
    c.name AS customer_name,
    s.code AS supplier_code,
    s.name AS supplier_name,
    pn.revision,
    pn.status,
    pn.created_at,
    pn.updated_at
FROM product_numbers pn
INNER JOIN products p ON pn.product_id = p.id
INNER JOIN customers c ON pn.customer_id = c.id
LEFT JOIN suppliers s ON pn.supplier_id = s.id;
```

---

## 5. インデックス戦略

### 5.1 パフォーマンス重視インデックス

#### 5.1.1 売上伝票検索用
```sql
-- 得意先名・日付範囲での検索
CREATE INDEX idx_sales_search ON sales_invoice_headers (customer_id, invoice_date);

-- 製番での検索（明細テーブル）
CREATE INDEX idx_sales_details_product_search ON sales_invoice_details (product_number_id, header_id);
```

#### 5.1.2 仕入伝票検索用
```sql
-- 仕入先名・日付範囲での検索
CREATE INDEX idx_purchase_search ON purchase_invoice_headers (supplier_id, invoice_date);

-- 製番での検索（明細テーブル）
CREATE INDEX idx_purchase_details_product_search ON purchase_invoice_details (product_number_id, header_id);
```

#### 5.1.3 集計処理用
```sql
-- 月次集計用
CREATE INDEX idx_sales_monthly ON sales_invoice_headers (invoice_date, total_amount);
CREATE INDEX idx_purchase_monthly ON purchase_invoice_headers (invoice_date, total_amount);

-- 得意先別集計用
CREATE INDEX idx_sales_customer_amount ON sales_invoice_headers (customer_id, total_amount);

-- 仕入先別集計用
CREATE INDEX idx_purchase_supplier_amount ON purchase_invoice_headers (supplier_id, total_amount);
```

---

## 6. 制約定義

### 6.1 チェック制約

```sql
-- 売上伝票ヘッダー
ALTER TABLE sales_invoice_headers 
ADD CONSTRAINT chk_sales_amounts 
CHECK (subtotal_amount >= 0 AND tax_amount >= 0 AND total_amount >= 0);

-- 仕入伝票ヘッダー
ALTER TABLE purchase_invoice_headers 
ADD CONSTRAINT chk_purchase_amounts 
CHECK (subtotal_amount >= 0 AND tax_amount >= 0 AND total_amount >= 0);

-- 売上伝票明細
ALTER TABLE sales_invoice_details 
ADD CONSTRAINT chk_sales_detail_amounts 
CHECK (quantity > 0 AND unit_price >= 0 AND amount >= 0);

-- 仕入伝票明細
ALTER TABLE purchase_invoice_details 
ADD CONSTRAINT chk_purchase_detail_amounts 
CHECK (quantity > 0 AND unit_price >= 0 AND amount >= 0);

-- 製番形式チェック
ALTER TABLE product_numbers 
ADD CONSTRAINT chk_product_number_format 
CHECK (number REGEXP '^TK25[A-HJ-M][0-9]{3}$');

-- 発注番号形式チェック
ALTER TABLE purchase_invoice_headers 
ADD CONSTRAINT chk_order_number_format 
CHECK (order_number REGEXP '^[0-9]{7}$');
```

---

## 7. トリガー定義

### 7.1 売上伝票金額自動計算

```sql
DELIMITER //
CREATE TRIGGER tr_sales_detail_amount_calc
BEFORE INSERT ON sales_invoice_details
FOR EACH ROW
BEGIN
    SET NEW.amount = NEW.quantity * NEW.unit_price;
END//

CREATE TRIGGER tr_sales_detail_amount_update
BEFORE UPDATE ON sales_invoice_details
FOR EACH ROW
BEGIN
    SET NEW.amount = NEW.quantity * NEW.unit_price;
END//
DELIMITER ;
```

### 7.2 仕入伝票金額自動計算

```sql
DELIMITER //
CREATE TRIGGER tr_purchase_detail_amount_calc
BEFORE INSERT ON purchase_invoice_details
FOR EACH ROW
BEGIN
    SET NEW.amount = NEW.quantity * NEW.unit_price;
END//

CREATE TRIGGER tr_purchase_detail_amount_update
BEFORE UPDATE ON purchase_invoice_details
FOR EACH ROW
BEGIN
    SET NEW.amount = NEW.quantity * NEW.unit_price;
END//
DELIMITER ;
```

### 7.3 ヘッダー合計金額更新

```sql
DELIMITER //
CREATE TRIGGER tr_sales_header_total_update
AFTER INSERT ON sales_invoice_details
FOR EACH ROW
BEGIN
    UPDATE sales_invoice_headers 
    SET subtotal_amount = (
        SELECT COALESCE(SUM(amount), 0) 
        FROM sales_invoice_details 
        WHERE header_id = NEW.header_id
    ),
    tax_amount = subtotal_amount * 0.1,
    total_amount = subtotal_amount + tax_amount
    WHERE id = NEW.header_id;
END//

CREATE TRIGGER tr_sales_header_total_update_on_update
AFTER UPDATE ON sales_invoice_details
FOR EACH ROW
BEGIN
    UPDATE sales_invoice_headers 
    SET subtotal_amount = (
        SELECT COALESCE(SUM(amount), 0) 
        FROM sales_invoice_details 
        WHERE header_id = NEW.header_id
    ),
    tax_amount = subtotal_amount * 0.1,
    total_amount = subtotal_amount + tax_amount
    WHERE id = NEW.header_id;
END//

CREATE TRIGGER tr_sales_header_total_update_on_delete
AFTER DELETE ON sales_invoice_details
FOR EACH ROW
BEGIN
    UPDATE sales_invoice_headers 
    SET subtotal_amount = (
        SELECT COALESCE(SUM(amount), 0) 
        FROM sales_invoice_details 
        WHERE header_id = OLD.header_id
    ),
    tax_amount = subtotal_amount * 0.1,
    total_amount = subtotal_amount + tax_amount
    WHERE id = OLD.header_id;
END//
DELIMITER ;
```

---

## 8. ストアドプロシージャ

### 8.1 売上集計プロシージャ

```sql
DELIMITER //
CREATE PROCEDURE sp_get_sales_summary(
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_customer_id CHAR(36)
)
BEGIN
    SELECT 
        DATE_FORMAT(invoice_date, '%Y-%m') AS month,
        COUNT(*) AS invoice_count,
        SUM(total_amount) AS total_amount,
        AVG(total_amount) AS average_amount
    FROM sales_invoice_headers
    WHERE invoice_date BETWEEN p_start_date AND p_end_date
    AND (p_customer_id IS NULL OR customer_id = p_customer_id)
    GROUP BY DATE_FORMAT(invoice_date, '%Y-%m')
    ORDER BY month;
END//
DELIMITER ;
```

### 8.2 仕入集計プロシージャ

```sql
DELIMITER //
CREATE PROCEDURE sp_get_purchase_summary(
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_supplier_id CHAR(36)
)
BEGIN
    SELECT 
        DATE_FORMAT(invoice_date, '%Y-%m') AS month,
        COUNT(*) AS invoice_count,
        SUM(total_amount) AS total_amount,
        AVG(total_amount) AS average_amount
    FROM purchase_invoice_headers
    WHERE invoice_date BETWEEN p_start_date AND p_end_date
    AND (p_supplier_id IS NULL OR supplier_id = p_supplier_id)
    GROUP BY DATE_FORMAT(invoice_date, '%Y-%m')
    ORDER BY month;
END//
DELIMITER ;
```

---

## 9. バックアップ・復旧戦略

### 9.1 バックアップ方針
- **フルバックアップ**: 日次（深夜2:00実行）
- **差分バックアップ**: 6時間毎
- **トランザクションログバックアップ**: 15分毎
- **保存期間**: 30日間

### 9.2 バックアップスクリプト例

```bash
#!/bin/bash
# 日次フルバックアップ
DATE=$(date +%Y%m%d)
mysqldump --single-transaction --routines --triggers \
  --user=backup_user --password=backup_pass \
  entry_core_billing > /backup/entry_core_billing_${DATE}.sql

# 圧縮
gzip /backup/entry_core_billing_${DATE}.sql

# 30日以前のファイル削除
find /backup -name "entry_core_billing_*.sql.gz" -mtime +30 -delete
```

---

## 10. セキュリティ設定

### 10.1 ユーザー権限設定

```sql
-- アプリケーション用ユーザー
CREATE USER 'app_user'@'%' IDENTIFIED BY 'secure_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON entry_core_billing.* TO 'app_user'@'%';

-- 読み取り専用ユーザー（レポート用）
CREATE USER 'report_user'@'%' IDENTIFIED BY 'report_password';
GRANT SELECT ON entry_core_billing.* TO 'report_user'@'%';

-- バックアップ用ユーザー
CREATE USER 'backup_user'@'localhost' IDENTIFIED BY 'backup_password';
GRANT SELECT, LOCK TABLES, SHOW VIEW ON entry_core_billing.* TO 'backup_user'@'localhost';
```

### 10.2 監査ログ設定

```sql
-- 監査ログテーブル
CREATE TABLE audit_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(64) NOT NULL,
    operation ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    user_name VARCHAR(64) NOT NULL,
    old_values JSON,
    new_values JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_audit_log_table_operation (table_name, operation),
    INDEX idx_audit_log_created_at (created_at)
);
```

---

## 11. パフォーマンス最適化

### 11.1 クエリ最適化指針
- **SELECT文**: 必要なカラムのみ指定
- **JOIN**: 適切なインデックスの使用
- **WHERE句**: インデックスを活用した条件指定
- **ORDER BY**: インデックスを活用したソート
- **LIMIT**: ページング処理での使用

### 11.2 定期メンテナンス

```sql
-- インデックス統計更新
ANALYZE TABLE sales_invoice_headers, sales_invoice_details,
             purchase_invoice_headers, purchase_invoice_details;

-- テーブル最適化
OPTIMIZE TABLE sales_invoice_headers, sales_invoice_details,
               purchase_invoice_headers, purchase_invoice_details;
```

---

このデータベース定義書は、Entry Core Billingシステムの安定稼働と高いパフォーマンスを実現するための設計指針を示しています。運用開始後も定期的な見直しと最適化を行い、システムの品質向上を図ってください。