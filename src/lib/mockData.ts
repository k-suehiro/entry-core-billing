// 月を表すアルファベットの配列（Iを除く）
const MONTH_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M'];

// 発注番号を生成する関数
function generateOrderNumber(date: Date, sequence: number): string {
  const year = date.getFullYear().toString().slice(-2);
  const monthLetter = MONTH_LETTERS[date.getMonth()];
  const sequenceStr = sequence.toString().padStart(4, '0');
  return `${year}${monthLetter}${sequenceStr}`;
}

// 製番生成用の文字列配列（IをスキップしたA-M）
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M'];

// ランダムな製番を生成
function generateProductNumber() {
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const number = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `TK25${letter}${number}`;
}

// 部門のモックデータ
export const mockDepartments = [
  { id: 'dept1', name: '東京事業所' },
  { id: 'dept2', name: '浜松事業所' },
];

// Mock employees data
const mockEmployees = [
  { id: 'emp1', name: '山田 太郎', department_id: 'dept1' },
  { id: 'emp2', name: '鈴木 花子', department_id: 'dept1' },
  { id: 'emp3', name: '佐藤 次郎', department_id: 'dept2' },
];

// Mock customers data (得意先)
const mockCustomers = [
  { id: 'cust1', code: 'C001', name: '[C] トヨタ自動車株式会社', taxType: '課税' },
  { id: 'cust2', code: 'C002', name: '[C] 本田技研工業株式会社', taxType: '課税' },
  { id: 'cust3', code: 'C003', name: '[C] スズキ株式会社', taxType: '不課税' },
  { id: 'cust4', code: 'C004', name: '[C] 日産自動車株式会社', taxType: '課税' },
  { id: 'cust5', code: 'C005', name: '[C] ヤマハ発動機株式会社', taxType: '不課税' },
  { id: 'cust6', code: 'C006', name: '[C] 三菱電機株式会社', taxType: '課税' },
  { id: 'cust7', code: 'C007', name: '[C] パナソニック株式会社', taxType: '課税' },
  { id: 'cust8', code: 'C008', name: '[C] シャープ株式会社', taxType: '不課税' },
  { id: 'cust9', code: 'C009', name: '[C] ソニー株式会社', taxType: '課税' },
  { id: 'cust10', code: 'C010', name: '[C] 日立製作所株式会社', taxType: '課税' },
  { id: 'cust11', code: 'C011', name: '[C] 富士通株式会社', taxType: '不課税' },
  { id: 'cust12', code: 'C012', name: '[C] キヤノン株式会社', taxType: '課税' },
  { id: 'cust13', code: 'C013', name: '[C] 東芝株式会社', taxType: '課税' },
  { id: 'cust14', code: 'C014', name: '[C] 川崎重工業株式会社', taxType: '不課税' },
  { id: 'cust15', code: 'C015', name: '[C] 三菱重工業株式会社', taxType: '課税' },
  { id: 'cust16', code: 'C016', name: '[C] ダイキン工業株式会社', taxType: '課税' },
  { id: 'cust17', code: 'C017', name: '[C] コマツ製作所株式会社', taxType: '不課税' },
  { id: 'cust18', code: 'C018', name: '[C] 日本電気株式会社', taxType: '課税' },
  { id: 'cust19', code: 'C019', name: '[C] リコー株式会社', taxType: '課税' },
  { id: 'cust20', code: 'C020', name: '[C] ブラザー工業株式会社', taxType: '不課税' },
];

// Mock suppliers data (仕入先)
export const mockSuppliers = [
  { id: 'sup1', code: 'V001', name: '[V] 株式会社トウキョウメディアワークス' },
  { id: 'sup2', code: 'V002', name: '[V] オオサカコンテンツラボ' },
  { id: 'sup3', code: 'V003', name: '[V] 名古屋ドキュメントサービス' },
  { id: 'sup4', code: 'V004', name: '[V] さいたま翻訳センター' },
  { id: 'sup5', code: 'V005', name: '[V] 神奈川ローカライズ合同会社' },
  { id: 'sup6', code: 'V006', name: '[V] シズオカテクニカルライティング' },
  { id: 'sup7', code: 'V007', name: '[V] 京都インフォメーションサービス' },
  { id: 'sup8', code: 'V008', name: '[V] 福岡トランスレーションオフィス' },
  { id: 'sup9', code: 'V009', name: '[V] 株式会社ヒロシマドキュメント' },
  { id: 'sup10', code: 'V010', name: '[V] 新潟マニュアルスタジオ' },
  { id: 'sup11', code: 'V011', name: '[V] Gunma Words（フリーランス）' },
  { id: 'sup12', code: 'V012', name: '[V] Ibaraki Multilingual Solutions' },
  { id: 'sup13', code: 'V013', name: '[V] 長野テクニカル文書社' },
  { id: 'sup14', code: 'V014', name: '[V] 岡山コンテンツパートナーズ' },
  { id: 'sup15', code: 'V015', name: '[V] 栃木ローカリゼーションサービス' },
  { id: 'sup16', code: 'V016', name: '[V] 山口トランスクリエイト合同会社' },
  { id: 'sup17', code: 'V017', name: '[V] Aichi Creative Words（個人事業）' },
  { id: 'sup18', code: 'V018', name: '[V] 三重マニュアルワークス' },
  { id: 'sup19', code: 'V019', name: '[V] 千葉テクニカルサービス' },
  { id: 'sup20', code: 'V020', name: '[V] 北海道ローカルワードスタジオ' },
];

// Mock products data (製品)
const mockProducts = [
  { id: 'prod1', name: 'エアコン制御基板 KXG-6680EV ユーザーマニュアル 日本語版 新規制作', basePrice: 15000 },
  { id: 'prod2', name: '冷蔵庫インバーター ZRF-3001HX サービスマニュアル 英語版 改訂制作', basePrice: 25000 },
  { id: 'prod3', name: '洗濯機モーター TWM-9200L 保守マニュアル スペイン語翻訳 新規制作', basePrice: 35000 },
  { id: 'prod4', name: '電子レンジセンサー RMW-1202SN 取扱説明書 日本語版 改訂制作', basePrice: 12000 },
  { id: 'prod5', name: '自動車ECU DVE-450X システムガイド 英語版 新規制作', basePrice: 45000 },
  { id: 'prod6', name: 'バイクメーター MTR-701FX インストールマニュアル オランダ語翻訳 新規制作', basePrice: 28000 },
  { id: 'prod7', name: 'プリンター基板 PBD-1130V 技術マニュアル 日本語版 改訂制作', basePrice: 18000 },
  { id: 'prod8', name: 'スマートロック SML-220K ユーザーガイド 英語版 改訂制作', basePrice: 22000 },
  { id: 'prod9', name: 'セキュリティカメラ SCC-9600HD 操作マニュアル スペイン語翻訳 新規制作', basePrice: 32000 },
  { id: 'prod10', name: 'ドローン制御装置 DRC-5500A パイロットマニュアル 日本語版 新規制作', basePrice: 55000 },
  { id: 'prod11', name: '産業用ロボット部品 IRB-780X フィールドサービスマニュアル 英語版 改訂制作', basePrice: 78000 },
  { id: 'prod12', name: '医療機器センサー MDS-6532CT 調整・点検マニュアル オランダ語翻訳 新規制作', basePrice: 65000 },
  { id: 'prod13', name: '太陽光パネル制御装置 SPC-420D 導入マニュアル 日本語版 改訂制作', basePrice: 42000 },
  { id: 'prod14', name: 'EV充電器基板 EVC-3821R 機能マニュアル 英語版 新規制作', basePrice: 38000 },
  { id: 'prod15', name: 'スマートメーター SMT-250NX 導入・設定マニュアル スペイン語翻訳 改訂制作', basePrice: 25000 },
];

// Mock product numbers data
const mockProductNumbers = [
  { id: 'pn1', number: 'TK25A001' },
  { id: 'pn2', number: 'TK25B002' },
];

// 作業コードの定義
const WORK_CODES = [
  { code: '70000', name: 'DTP' },
  { code: '20000', name: '翻訳' },
  { code: '30000', name: '編集' },
  { code: '10000', name: '原稿作成' },
  { code: '50000', name: 'イラスト' },
  { code: '40000', name: 'デザイン' },
  { code: '105000', name: 'CD/DVD' },
  { code: '130000', name: '印刷' },
  { code: '100000', name: '製版' },
  { code: '130000', name: 'ラベル/袋' },
  { code: '150000', name: '製本' },
  { code: '110000', name: 'その他' },
  { code: '110000', name: 'ブリスター' },
  { code: '130000', name: '箱関連' },
  { code: '20000', name: '翻訳校正' },
] as const;

// Helper functions for finding data
export const findDepartmentById = (id: string) => {
  return mockDepartments.find(department => department.id === id);
};

export const findEmployeeByName = (name: string) => {
  return mockEmployees.find(employee => employee.name === name);
};

export const findProductNumberByNumber = (number: string) => {
  return mockProductNumbers.find(pn => pn.number === number);
};

// 売上伝票のモックデータ
export const mockSalesInvoices = Array.from({ length: 50 }, (_, index) => {
  const customer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
  const employee = mockEmployees[Math.floor(Math.random() * mockEmployees.length)];
  const department = mockDepartments.find(d => d.id === employee.department_id)!;
  
  // 過去3ヶ月のランダムな日付を生成
  const date = new Date();
  date.setMonth(date.getMonth() - Math.floor(Math.random() * 3));
  
  // 明細を1-5件生成
  const details = Array.from({ length: 1 + Math.floor(Math.random() * 5) }, () => {
    const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    const quantity = Math.floor(1 + Math.random() * 10);
    const unitPrice = product.basePrice + Math.floor(Math.random() * 3000);
    return {
      productNumber: generateProductNumber(),
      productName: product.name,
      quantity,
      unit: '個',
      unitPrice,
      amount: quantity * unitPrice
    };
  });

  return {
    id: generateOrderNumber(date, index + 1),
    invoiceNumber: `SI${String(index + 1).padStart(6, '0')}`,
    customerCode: customer.code,
    customerName: customer.name,
    customerTaxType: customer.taxType,
    invoiceDate: date.toISOString().split('T')[0],
    details,
    totalAmount: details.reduce((sum, detail) => sum + detail.amount, 0),
    employee: employee.name,
    department: department.name
  };
});

// 仕入伝票のモックデータ
export const mockPurchaseInvoices = Array.from({ length: 30 }, (_, index) => {
  const supplier = mockSuppliers[Math.floor(Math.random() * mockSuppliers.length)];
  const employee = mockEmployees[Math.floor(Math.random() * mockEmployees.length)];
  const department = mockDepartments.find(d => d.id === employee.department_id)!;
  
  // 過去3ヶ月のランダムな日付を生成
  const date = new Date();
  date.setMonth(date.getMonth() - Math.floor(Math.random() * 3));

  // 明細を1-5件生成
  const details = Array.from({ length: 1 + Math.floor(Math.random() * 5) }, () => {
    const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    const quantity = Math.floor(1 + Math.random() * 10);
    const unitPrice = product.basePrice - Math.floor(Math.random() * 3000);
    const amount = quantity * unitPrice;
    const workCode = WORK_CODES[Math.floor(Math.random() * WORK_CODES.length)].code;
    return {
      id: crypto.randomUUID(),
      productNumber: generateProductNumber(),
      productName: product.name,
      workCode,
      quantity,
      unit: '個',
      unitPrice,
      amount
    };
  });

  // 明細の合計金額を計算
  const totalAmount = details.reduce((sum, detail) => sum + detail.amount, 0);
  
  return {
    id: generateOrderNumber(date, index + 1),
    supplierCode: supplier.code,
    supplierName: supplier.name,
    date: date.toISOString().split('T')[0],
    details,
    totalAmount,
    employee: employee.name,
    department: department.name
  };
});

export { mockCustomers, mockProductNumbers, mockEmployees }