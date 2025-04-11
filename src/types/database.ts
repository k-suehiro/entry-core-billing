// 既存のコード定数
export const SORTING_CODES = [
  '10000',
  '20000',
  '30000',
  '40000',
  '50000',
  '70000',
  '80000',
  '100000',
  '105000',
  '110000',
  '120000',
  '130000',
  '140000',
  '150000',
  '160000',
  '170000',
  '180000',
  '190000',
  '200000',
  '210000',
  '220000',
  '230000',
  '240000',
] as const;

export type SortingCode = typeof SORTING_CODES[number];

export const MANUFACTURING_CODES = {
  '10000': 'CA1',
  '20000': 'CA2',
  '30000': 'CA3',
  '40000': 'CB',
  '50000': 'CC',
  '70000': 'CD1',
  '80000': 'CD2',
  '100000': 'CF',
  '105000': 'CG',
  '110000': 'CZ',
  '120000': 'CH',
  '130000': 'CI1',
  '140000': 'CI2',
  '150000': 'CJ',
  '160000': 'CK',
  '170000': 'CL1',
  '180000': 'CL2',
  '190000': 'CL3',
  '200000': 'CL4',
  '210000': 'CM',
  '220000': 'CN',
  '230000': 'CO',
  '240000': 'CP',
} as const;

export type ManufacturingCode = typeof MANUFACTURING_CODES[keyof typeof MANUFACTURING_CODES];

// 基本エンティティの型定義
export interface Customer {
  id: string;
  code: string;
  name: string;
}

export interface Supplier {
  id: string;
  code: string;
  name: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  basePrice: number;
}

export interface Department {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  department_id: string;
}

export interface ProductNumber {
  id: string;
  number: string;
  product_id: string;
  customer_id: string;
  supplier_id: string;
  products: {
    id: string;
    name: string;
  };
  customers: {
    id: string;
    code: string;
    name: string;
  };
  suppliers: {
    id: string;
    code: string;
    name: string;
  };
}

// 売上伝票の型定義（請求ベース）
export interface SalesInvoice {
  id: string;
  invoiceNumber: string;
  customerCode: string;
  customerName: string;
  invoiceDate: string;
  totalAmount: number;
  employee: string;
  department: string;
  detailsCount: number;
  details: SalesInvoiceDetailItem[];
}

export interface SalesInvoiceDetailItem {
  id: string;
  productNumber: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

// 仕入伝票の型定義
export interface PurchaseInvoiceHeader {
  id: string;
  invoice_number: string;
  supplier_id: string;
  invoice_date: string;
  total_amount: number;
  tax_amount: number;
  total_with_tax: number;
  employee: string;
  department_id: string;
  sorting_code: SortingCode;
  manufacturing_code: ManufacturingCode;
  created_at: string;
  updated_at: string;
  suppliers: {
    code: string;
    name: string;
  };
  departments: {
    name: string;
  };
}

export interface PurchaseInvoiceDetail {
  id: string;
  header_id: string;
  product_number_id: string;
  quantity: number;
  unit_price: number;
  amount: number;
  created_at: string;
  updated_at: string;
  product_numbers: {
    number: string;
    products: {
      name: string;
    };
  };
}