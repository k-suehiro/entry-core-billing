import React, { useState } from 'react';
import { 
  createBrowserRouter, 
  RouterProvider,
  Navigate,
  Link
} from 'react-router-dom';
import { FileText, ShoppingCart, ScrollText, UserCircle2 } from 'lucide-react';
import SalesInvoiceList from './components/sales/SalesInvoiceList';
import SalesInvoiceForm from './components/sales/SalesInvoiceForm';
import PurchaseInvoiceList from './components/purchase/PurchaseInvoiceList';
import PurchaseInvoiceForm from './components/purchase/PurchaseInvoiceForm';
import { UserProfileModal } from './components/common/UserProfileModal';
import { mockPurchaseInvoices } from './lib/mockData';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <ScrollText className="h-10 w-10 text-white" />
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-white">Entry Core Billing</h1>
                  <span className="text-base text-gray-400">伝票管理台帳</span>
                </div>
              </div>
              <div className="ml-16 flex space-x-2">
                <NavLink to="/sales">
                  <FileText className="w-5 h-5 mr-2" />
                  売上伝票
                </NavLink>
                <NavLink to="/purchases">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  仕入伝票
                </NavLink>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-base text-gray-400 mr-6">
                最終更新: {new Date().toLocaleDateString('ja-JP')}
              </div>
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-white hover:bg-gray-700 rounded-md transition-colors"
              >
                <UserCircle2 className="w-6 h-6" />
                <span>山田 太郎</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const isActive = window.location.pathname.startsWith(to);
  const colorClass = to === '/sales' ? 'blue' : 'green';
  
  return (
    <Link
      to={to}
      className={`inline-flex items-center px-5 py-2.5 text-base font-medium rounded-md ${
        isActive
          ? `bg-${colorClass}-600 text-white`
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/sales" replace />,
  },
  {
    path: '/sales',
    element: (
      <Layout>
        <SalesInvoiceList />
      </Layout>
    ),
  },
  {
    path: '/sales/new',
    element: (
      <Layout>
        <SalesInvoiceForm />
      </Layout>
    ),
  },
  {
    path: '/sales/:id',
    element: (
      <Layout>
        <SalesInvoiceForm />
      </Layout>
    ),
  },
  {
    path: '/purchases',
    element: (
      <Layout>
        <PurchaseInvoiceList invoices={mockPurchaseInvoices} />
      </Layout>
    ),
  },
  {
    path: '/purchases/new',
    element: (
      <Layout>
        <PurchaseInvoiceForm />
      </Layout>
    ),
  },
  {
    path: '/purchases/:id',
    element: (
      <Layout>
        <PurchaseInvoiceForm />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;