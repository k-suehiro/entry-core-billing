// 製番生成用の文字列配列（IをスキップしたA-M）
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M'];

// ランダムな製番を生成
function generateProductNumber() {
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const number = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `TK25${letter}${number}`;
}

// 得意先のモックデータ
export const mockCustomers = [
  { code: 'C001', name: '株式会社テスト' },
  { code: 'C002', name: '株式会社サンプル' },
  { code: 'C003', name: '株式会社開発' },
  { code: 'C004', name: '株式会社システム' },
  { code: 'C005', name: 'テクノ株式会社' },
];

// 仕入先のモックデータ
export const mockSuppliers = [
  { code: 'S001', name: '株式会社サプライ' },
  { code: 'S002', name: '株式会社部品' },
  { code: 'S003', name: '株式会社製造' },
  { code: 'S004', name: '株式会社工業' },
  { code: 'S005', name: 'テック株式会社' },
];

// 製品のモックデータ
export const mockProducts = [
  { code: 'P001', name: 'テスト部品A', basePrice: 15000 },
  { code: 'P002', name: 'テスト部品B', basePrice: 25000 },
  { code: 'P003', name: '制御基板X', basePrice: 35000 },
  { code: 'P004', name: 'センサーユニットY', basePrice: 45000 },
  { code: 'P005', name: 'モーターZ', basePrice: 55000 },
];

// 担当者のモックデータ
export const mockEmployees = [
  { id: 'E001', name: '山田太郎', department: '営業部' },
  { id: 'E002', name: '鈴木花子', department: '経理部' },
  { id: 'E003', name: '佐藤一郎', department: '購買部' },
  { id: 'E004', name: '田中美咲', department: '営業部' },
  { id: 'E005', name: '伊藤健一', department: '購買部' },
];

// ランダムな日付を生成（2024年1月1日から現在までの範囲で）
function getRandomDate() {
  const start = new Date('2024-01-01').getTime();
  const end = new Date().getTime();
  const randomDate = new Date(start + Math.random() * (end - start));
  return randomDate.toISOString().split('T')[0];
}

// 売上伝票のダミーデータを生成
export const mockSalesInvoices = Array.from({ length: 30 }, (_, index) => {
  const customer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
  const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
  const employee = mockEmployees[Math.floor(Math.random() * mockEmployees.length)];
  const quantity = Math.floor(1 + Math.random() * 10);
  const unitPrice = product.basePrice + Math.floor(Math.random() * 5000);
  const amount = quantity * unitPrice * 1.1; // 税込金額

  return {
    id: (index + 1).toString(),
    customerCode: customer.code,
    customerName: customer.name,
    date: getRandomDate(),
    productNumber: generateProductNumber(),
    partNumber: product.code,
    productName: product.name,
    productCode: product.code,
    quantity,
    unitPrice,
    amount,
    department: employee.department,
    employee: employee.name
  };
});

// 仕入伝票のダミーデータを生成
export const mockPurchaseInvoices = Array.from({ length: 30 }, (_, index) => {
  const supplier = mockSuppliers[Math.floor(Math.random() * mockSuppliers.length)];
  const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
  const employee = mockEmployees[Math.floor(Math.random() * mockEmployees.length)];
  const quantity = Math.floor(1 + Math.random() * 10);
  const unitPrice = product.basePrice - Math.floor(Math.random() * 3000); // 仕入価格は販売価格より低め
  const amount = quantity * unitPrice;
  const taxAmount = amount * 0.1;
  const totalAmount = amount + taxAmount;

  return {
    id: (index + 1).toString(),
    supplierCode: supplier.code,
    supplierName: supplier.name,
    date: getRandomDate(),
    productNumber: generateProductNumber(),
    partNumber: product.code,
    productName: product.name,
    productCode: product.code,
    quantity,
    unitPrice,
    amount,
    taxAmount,
    totalAmount,
    department: employee.department,
    employee: employee.name
  };
});