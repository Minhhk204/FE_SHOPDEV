import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tổng Quan', path: '/admin' },
    { icon: Package, label: 'Sản Phẩm', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Đơn Hàng', path: '/admin/orders' },
    { icon: Users, label: 'Khách Hàng', path: '/admin/customers' },
    { icon: BarChart3, label: 'Thống Kê', path: '/admin/analytics' },
    { icon: Settings, label: 'Cài Đặt', path: '/admin/settings' },
  ];

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen relative`}>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 bg-gray-900 text-white rounded-full p-1 border-2 border-gray-700 hover:bg-gray-800 transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <Link to="/admin" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          {!isCollapsed && <span className="text-xl font-bold">MSneaker Admin</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
                isActive ? 'bg-primary-600 text-white border-r-2 border-primary-400' : ''
              }`}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors rounded-lg">
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Đăng Xuất</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;