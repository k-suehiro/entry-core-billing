import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Edit, Plus, Trash2, ScrollText, Download } from 'lucide-react';
import { SearchableSelect } from '../common/SearchableSelect';
import { DeleteConfirmationDialog } from '../common/DeleteConfirmationDialog';
import { 
  mockSalesInvoices,
  mockCustomers,
  mockProductNumbers,
  mockEmployees,
  findEmployeeByName,
  findDepartmentById,
  findProductNumberByNumber
} from '../../lib/mockData';

interface DetailItem {
  id: string;
  productNumber: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

interface DetailRowProps {
  detail: DetailItem;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onDelete: () => void;
  onUpdate: (updatedDetail: DetailItem) => void;
}

const UNITS = ['式', '個', '冊'] as const;
type Unit = typeof UNITS[number];

function DetailRow({ detail, isEditing, onEdit, onSave, onDelete, onUpdate }: DetailRowProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const isValidProductNumber = detail.productNumber.length === 8;

  const handleQuantityChange = (value: string) => {
    const quantity = parseInt(value) || 0;
    onUpdate({
      ...detail,
      quantity,
      amount: quantity * detail.unitPrice
    });
  };

  const handleUnitPriceChange = (value: string) => {
    const unitPrice = parseInt(value) || 0;
    onUpdate({
      ...detail,
      unitPrice,
      amount: detail.quantity * unitPrice
    });
  };

  return (
    <tr>
      <td className="px-3 py-2 w-[220px]">
        {isEditing ? (
          <div className="flex gap-1 items-center">
            <input
              type="text"
              className="w-[90px] px-2 py-1 text-sm border border-blue-200 rounded font-mono"
              value={detail.productNumber}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                if (/^[A-Z0-9]*$/.test(value) && value.length <= 8) {
                  onUpdate({ ...detail, productNumber: value });
                }
              }}
              maxLength={8}
              placeholder="TK25X999"
            />
            <button
              onClick={() => {
                console.log('JobPub取得がクリックされました');
              }}
              disabled={!isValidProductNumber}
              className={`inline-flex items-center px-2 py-1 border rounded shadow-sm text-xs font-medium ${
                isValidProductNumber
                  ? 'border-blue-300 text-blue-700 bg-white hover:bg-blue-50'
                  : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
              }`}
              title={isValidProductNumber ? '' : '製番は8桁で入力してください'}
            >
              <Download className="w-3 h-3 mr-1" />
              JobPub
            </button>
          </div>
        ) : (
          <span className="text-sm font-mono">{detail.productNumber}</span>
        )}
      </td>
      <td className="px-3 py-2">
        {isEditing ? (
          <textarea
            className="w-full px-2 py-1 text-sm border border-blue-200 rounded resize-y h-[28px] min-h-[28px]"
            value={detail.productName}
            onChange={(e) => onUpdate({ ...detail, productName: e.target.value })}
            placeholder="品名を入力"
          />
        ) : (
          <span className="text-sm whitespace-pre-wrap">{detail.productName}</span>
        )}
      </td>
      <td className="px-3 py-2 text-right">
        {isEditing ? (
          <div className="flex items-center justify-end gap-1">
            <input
              type="number"
              className="w-[80px] px-2 py-1 text-sm text-right border border-blue-200 rounded"
              value={detail.quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              min="1"
            />
            <select
              className="px-2 py-1 text-sm border border-blue-200 rounded"
              value={detail.unit}
              onChange={(e) => onUpdate({ ...detail, unit: e.target.value })}
            >
              {UNITS.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        ) : (
          <span className="text-sm text-right block">{detail.quantity}{detail.unit}</span>
        )}
      </td>
      <td className="px-3 py-2 text-right">
        {isEditing ? (
          <input
            type="number"
            className="w-[100px] px-2 py-1 text-sm text-right border border-blue-200 rounded"
            value={detail.unitPrice}
            onChange={(e) => handleUnitPriceChange(e.target.value)}
            min="0"
          />
        ) : (
          <span className="text-sm text-right block">¥{detail.unitPrice.toLocaleString()}</span>
        )}
      </td>
      <td className="px-3 py-2">
        <span className="text-sm text-right block">¥{detail.amount.toLocaleString()}</span>
      </td>
      <td className="px-3 py-2">
        <div className="flex justify-center space-x-1">
          {isEditing ? (
            <button
              onClick={onSave}
              className="text-blue-600 hover:text-blue-800"
            >
              <Save className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
      <DeleteConfirmationDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={onDelete}
        message="この明細を削除してもよろしいですか？"
      />
    </tr>
  );
}

export function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center">
      <span className="block text-sm font-medium text-gray-700">{children}</span>
      <span className="ml-1 text-red-500">*</span>
    </div>
  );
}

const inputClass = "mt-1 block w-full px-3 py-2 text-sm bg-white border-2 border-blue-100 focus:ring-blue-500 focus:border-blue-500 rounded shadow-sm transition duration-150 ease-in-out hover:border-blue-200";
const readOnlyClass = "mt-1 block w-full px-3 py-2 text-sm bg-gray-50 border-2 border-gray-200 rounded shadow-inner text-gray-500";

function SalesInvoiceForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isHeaderEditing, setIsHeaderEditing] = useState(!id);
  const [headerData, setHeaderData] = useState({
    invoiceNumber: '',
    customerCode: '',
    customerName: '',
    customerTaxType: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    employee: '',
    department: ''
  });
  const [details, setDetails] = useState<DetailItem[]>([]);
  const [editingDetailIds, setEditingDetailIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (id) {
      const invoice = mockSalesInvoices.find(inv => inv.id === id);
      if (invoice) {
        const customer = mockCustomers.find(c => c.code === invoice.customerCode);
        setHeaderData({
          invoiceNumber: invoice.invoiceNumber,
          customerCode: invoice.customerCode,
          customerName: invoice.customerName,
          customerTaxType: customer?.taxType || '',
          invoiceDate: invoice.invoiceDate,
          employee: invoice.employee,
          department: invoice.department
        });
        setDetails(invoice.details.map(detail => ({
          ...detail,
          unit: detail.unit || '個',
          id: crypto.randomUUID()
        })));
      }
    }
  }, [id]);

  const customerOptions = mockCustomers.map(customer => ({
    value: customer.code,
    label: customer.name
  }));

  const employeeOptions = mockEmployees.map(employee => {
    const department = findDepartmentById(employee.department_id);
    return {
      value: employee.name,
      label: `${employee.name} (${department?.name || ''})`
    };
  });

  const handleCustomerSelect = (code: string) => {
    const customer = mockCustomers.find(c => c.code === code);
    if (customer) {
      setHeaderData(prev => ({
        ...prev,
        customerCode: customer.code,
        customerName: customer.name,
        customerTaxType: customer.taxType
      }));
    }
  };

  const handleEmployeeSelect = (name: string) => {
    const employee = findEmployeeByName(name);
    if (employee) {
      const department = findDepartmentById(employee.department_id);
      setHeaderData(prev => ({
        ...prev,
        employee: employee.name,
        department: department?.name || ''
      }));
    }
  };

  const handleHeaderSave = () => {
    setIsHeaderEditing(false);
  };

  const handleAddDetail = () => {
    const newDetail: DetailItem = {
      id: crypto.randomUUID(),
      productNumber: '',
      productName: '',
      quantity: 0,
      unit: '個',
      unitPrice: 0,
      amount: 0
    };
    setDetails([...details, newDetail]);
    setEditingDetailIds(new Set([...editingDetailIds, newDetail.id]));
  };

  const handleEditDetail = (id: string) => {
    setEditingDetailIds(new Set([...editingDetailIds, id]));
  };

  const handleSaveDetail = (id: string) => {
    const newEditingDetailIds = new Set(editingDetailIds);
    newEditingDetailIds.delete(id);
    setEditingDetailIds(newEditingDetailIds);
  };

  const handleDeleteDetail = (id: string) => {
    setDetails(details.filter(detail => detail.id !== id));
    const newEditingDetailIds = new Set(editingDetailIds);
    newEditingDetailIds.delete(id);
    setEditingDetailIds(newEditingDetailIds);
  };

  const handleUpdateDetail = (updatedDetail: DetailItem) => {
    setDetails(details.map(detail =>
      detail.id === updatedDetail.id ? updatedDetail : detail
    ));
  };

  const totalAmount = details.reduce((sum, detail) => sum + detail.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <ScrollText className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">
            {id ? '売上伝票詳細' : '売上伝票登録'}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/sales')}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            戻る
          </button>
          {id && (
            <button
              onClick={() => isHeaderEditing ? handleHeaderSave() : setIsHeaderEditing(true)}
              className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50"
            >
              {isHeaderEditing ? (
                <>
                  <Save className="w-4 h-4 mr-1" />
                  保存
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-1" />
                  編集
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="mb-4">
            <h3 className="text-base font-medium text-gray-900">基本情報</h3>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">請求番号</label>
              <input
                type="text"
                className={readOnlyClass}
                value={headerData.invoiceNumber || '(自動採番)'}
                readOnly
              />
            </div>

            <div className="col-span-8">
              <RequiredLabel>得意先</RequiredLabel>
              <SearchableSelect
                options={customerOptions}
                value={headerData.customerCode}
                onChange={handleCustomerSelect}
                placeholder="得意先を選択または検索"
                disabled={!isHeaderEditing}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">税区分</label>
              <div className={`${readOnlyClass} flex items-center justify-center`}>
                <span className={`text-sm font-medium ${
                  headerData.customerTaxType === '課税' ? 'text-blue-600' : 'text-green-600'
                }`}>
                  {headerData.customerTaxType || '-'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-2">
              <RequiredLabel>請求日</RequiredLabel>
              <input
                type="date"
                className={isHeaderEditing ? inputClass : readOnlyClass}
                value={headerData.invoiceDate}
                onChange={(e) => setHeaderData({ ...headerData, invoiceDate: e.target.value })}
                required
                disabled={!isHeaderEditing}
              />
            </div>

            <div className="col-span-6">
              <RequiredLabel>担当者</RequiredLabel>
              <SearchableSelect
                options={employeeOptions}
                value={headerData.employee}
                onChange={handleEmployeeSelect}
                placeholder="担当者を選択"
                disabled={!isHeaderEditing}
              />
            </div>

            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700">担当部門</label>
              <input
                type="text"
                className={readOnlyClass}
                value={headerData.department}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-medium text-gray-900">明細情報</h3>
            <button
              onClick={handleAddDetail}
              className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-1" />
              明細追加
            </button>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 w-[220px]">製番</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">品名</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">数量</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">単価</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">金額</th>
                <th className="w-20 px-3 py-2 text-center text-xs font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {details.map((detail) => (
                <DetailRow
                  key={detail.id}
                  detail={detail}
                  isEditing={editingDetailIds.has(detail.id)}
                  onEdit={() => handleEditDetail(detail.id)}
                  onSave={() => handleSaveDetail(detail.id)}
                  onDelete={() => handleDeleteDetail(detail.id)}
                  onUpdate={handleUpdateDetail}
                />
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={4} className="px-3 py-2 text-sm font-medium text-right">合計金額</td>
                <td className="px-3 py-2 text-sm font-medium text-right">¥{totalAmount.toLocaleString()}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesInvoiceForm;