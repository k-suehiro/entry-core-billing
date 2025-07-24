import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Download, X, FileText, TrendingUp, Users } from 'lucide-react';
import { format, parseISO, getYear, getMonth, subMonths, isWithinInterval, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockSalesInvoices } from '../../lib/mockData';
import { Pagination } from '../common/Pagination';

type PeriodType = '全期間' | '月別' | '年別';

const inputClass = "block w-full px-2 py-1.5 text-sm border border-blue-100 focus:ring-blue-500 focus:border-blue-500 rounded shadow-sm transition duration-150 ease-in-out hover:border-blue-200";
const buttonClass = "inline-flex items-center px-3 py-1.5 border border-transparent rounded shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

const columnWidths = {
  invoiceNumber: 'w-[100px]',
  customer: 'w-[300px]',
  date: 'w-[100px]',
  detailCount: 'w-[80px]',
  amount: 'w-[120px]',
  employee: 'w-[120px]',
  department: 'w-[160px]',
};

function SalesInvoiceList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredInvoices, setFilteredInvoices] = useState(mockSalesInvoices);
  const [periodType, setPeriodType] = useState<PeriodType>('全期間');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const summaryData = useMemo(() => {
    let filtered = [...mockSalesInvoices];

    if (periodType === '月別') {
      const start = startOfMonth(new Date(selectedYear, selectedMonth - 1));
      const end = endOfMonth(new Date(selectedYear, selectedMonth - 1));
      filtered = mockSalesInvoices.filter(invoice => {
        const invoiceDate = parseISO(invoice.invoiceDate);
        return isWithinInterval(invoiceDate, { start, end });
      });
    } else if (periodType === '年別') {
      const start = startOfYear(new Date(selectedYear, 0));
      const end = endOfYear(new Date(selectedYear, 0));
      filtered = mockSalesInvoices.filter(invoice => {
        const invoiceDate = parseISO(invoice.invoiceDate);
        return isWithinInterval(invoiceDate, { start, end });
      });
    }

    return filtered;
  }, [periodType, selectedYear, selectedMonth, mockSalesInvoices]);

  useEffect(() => {
    let filtered = [...mockSalesInvoices];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(invoice => 
        invoice.customerName.toLowerCase().includes(searchLower) ||
        invoice.details.some(detail => 
          detail.productNumber.toLowerCase().includes(searchLower) ||
          detail.productName.toLowerCase().includes(searchLower)
        )
      );
    }

    if (dateRange.start) {
      filtered = filtered.filter(invoice => 
        invoice.invoiceDate >= dateRange.start
      );
    }
    if (dateRange.end) {
      filtered = filtered.filter(invoice => 
        invoice.invoiceDate <= dateRange.end
      );
    }

    setFilteredInvoices(filtered);
    setCurrentPage(1);
  }, [searchTerm, dateRange.start, dateRange.end]);

  const handleClear = () => {
    setSearchTerm('');
    setDateRange({ start: '', end: '' });
    setCurrentPage(1);
  };

  const handleRowClick = (id: string) => {
    navigate(`/sales/${id}`);
  };

  const handleExportCSV = () => {
    console.log('Exporting to CSV...');
  };

  const totalAmount = useMemo(() => 
    summaryData.reduce((sum, invoice) => sum + invoice.totalAmount, 0),
    [summaryData]
  );

  const averageAmount = useMemo(() => 
    summaryData.length > 0 ? totalAmount / summaryData.length : 0,
    [summaryData, totalAmount]
  );

  const customerCount = useMemo(() => 
    new Set(summaryData.map(invoice => invoice.customerCode)).size,
    [summaryData]
  );

  const getTop3Customers = () => {
    const customerTotals = summaryData.reduce((acc, invoice) => {
      const customerName = invoice.customerName;
      acc[customerName] = (acc[customerName] || 0) + invoice.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(customerTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
  };

  const monthlyData = useMemo(() => {
    const now = new Date();
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(now, i);
      return {
        month: format(date, 'yyyy/MM'),
        start: new Date(date.getFullYear(), date.getMonth(), 1),
        end: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      };
    }).reverse();

    return last6Months.map(({ month, start, end }) => {
      const monthlyInvoices = mockSalesInvoices.filter(invoice =>
        isWithinInterval(parseISO(invoice.invoiceDate), { start, end })
      );
      return {
        month,
        amount: monthlyInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
      };
    });
  }, [mockSalesInvoices]);

  const totalPages = Math.ceil(filteredInvoices.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentInvoices = filteredInvoices.slice(startIndex, endIndex);

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">売上伝票一覧</h2>
            </div>
            <Link
              to="/sales/new"
              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              新規作成
            </Link>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-1/2 flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        className={`${inputClass} pl-8`}
                        placeholder="得意先名、製番で検索"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <FileText className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    <button
                      onClick={handleClear}
                      className={`${buttonClass} text-white bg-red-400 hover:bg-red-500 focus:ring-red-400`}
                    >
                      <X className="w-4 h-4 mr-1" />
                      クリア
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      className={inputClass}
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                    <span className="text-gray-500">～</span>
                    <input
                      type="date"
                      className={inputClass}
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200">
              <div className="p-3 flex justify-between items-center bg-gray-50 border-b border-gray-200">
                <select
                  className="pl-2 pr-8 py-1.5 text-sm border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                >
                  <option value={10}>10件</option>
                  <option value={20}>20件</option>
                  <option value={50}>50件</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className={`${columnWidths.invoiceNumber} px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider`}>請求番号</th>
                      <th scope="col" className={`${columnWidths.customer} px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider`}>得意先</th>
                      <th scope="col" className={`${columnWidths.date} px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider`}>請求日</th>
                      <th scope="col" className={`${columnWidths.detailCount} px-3 py-3 text-center text-xs font-medium text-gray-500 tracking-wider`}>明細数</th>
                      <th scope="col" className={`${columnWidths.amount} px-3 py-3 text-right text-xs font-medium text-gray-500 tracking-wider`}>合計金額</th>
                      <th scope="col" className={`${columnWidths.employee} px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider`}>担当者</th>
                      <th scope="col" className={`${columnWidths.department} px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider`}>部門</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentInvoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        onClick={() => handleRowClick(invoice.id)}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className={`${columnWidths.invoiceNumber} px-3 py-3 whitespace-nowrap text-sm`}>
                          <div className="flex items-center text-blue-600">
                            <FileText className="w-4 h-4 mr-1" />
                            {invoice.invoiceNumber}
                          </div>
                        </td>
                        <td className={`${columnWidths.customer} px-3 py-3 whitespace-nowrap text-sm`}>
                          <div className="font-medium">{invoice.customerName}</div>
                        </td>
                        <td className={`${columnWidths.date} px-3 py-3 whitespace-nowrap text-sm font-mono`}>
                          {format(new Date(invoice.invoiceDate), 'yyyy/MM/dd')}
                        </td>
                        <td className={`${columnWidths.detailCount} px-3 py-3 whitespace-nowrap text-sm text-center`}>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {invoice.details.length}件
                          </span>
                        </td>
                        <td className={`${columnWidths.amount} px-3 py-3 whitespace-nowrap text-sm font-mono text-right`}>
                          ¥{invoice.totalAmount.toLocaleString()}
                        </td>
                        <td className={`${columnWidths.employee} px-3 py-3 whitespace-nowrap text-sm`}>
                          {invoice.employee}
                        </td>
                        <td className={`${columnWidths.department} px-3 py-3 whitespace-nowrap text-sm`}>
                          {invoice.department}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-[320px] min-w-[320px]">
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">月次推移</h4>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    fontSize={12}
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis 
                    fontSize={12}
                    tick={{ fill: '#6B7280' }}
                    tickFormatter={(value) => `¥${(value / 10000).toFixed(0)}万`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`¥${value.toLocaleString()}`, '金額']}
                    labelStyle={{ color: '#111827' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">集計情報</h3>
              <select
                className="w-24 text-sm border-2 border-blue-100 rounded-lg px-2 py-2"
                value={periodType}
                onChange={(e) => setPeriodType(e.target.value as PeriodType)}
              >
                <option>全期間</option>
                <option>月別</option>
                <option>年別</option>
              </select>
            </div>

            {periodType !== '全期間' && (
              <div className="mb-6">
                <div className="flex gap-2">
                  <select
                    className="flex-1 text-sm border-2 border-blue-100 rounded-lg px-2 py-2"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}年</option>
                    ))}
                  </select>
                  {periodType === '月別' && (
                    <select
                      className="flex-1 text-sm border-2 border-blue-100 rounded-lg px-2 py-2"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    >
                      {months.map(month => (
                        <option key={month} value={month}>{month}月</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center text-blue-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span>合計金額</span>
                </div>
                <span className="font-medium text-lg">¥{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-center text-indigo-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span>平均金額</span>
                </div>
                <span className="font-medium text-lg">¥{Math.round(averageAmount).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center text-purple-700">
                  <Users className="w-5 h-5 mr-2" />
                  <span>得意先数</span>
                </div>
                <span className="font-medium text-lg">{customerCount}社</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">得意先別金額トップ3</h4>
            <div className="space-y-3">
              {getTop3Customers().map(([customerName, amount], index) => (
                <div key={customerName} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="w-6 text-sm font-medium text-gray-500">{index + 1}.</span>
                    <span className="text-sm font-medium truncate" style={{ maxWidth: '150px' }}>
                      {customerName}
                    </span>
                  </div>
                  <span className="text-sm font-medium">¥{amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesInvoiceList;