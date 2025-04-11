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
  code: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  departmentId: string;
}

export interface SalesInvoice {
  id: string;
  customerCode: string;
  customerName: string;
  date: string;
  productNumber: string;
  partNumber: string;
  productName: string;
  productCode: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  department: string;
  employee: string;
}

export interface PurchaseInvoice {
  id: string;
  supplierCode: string;
  supplierName: string;
  date: string;
  productNumber: string;
  partNumber: string;
  productName: string;
  productCode: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  department: string;
  employee: string;
}