import React from 'react';
import { DollarSign, Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import StatsCard from '../../components/Admin/Dashboard/StatsCard';
import RecentOrders from '../../components/Admin/Dashboard/RecentOrders';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Tổng Doanh Thu',
      value: '$45,231',
      change: '12%',
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Đơn Hàng',
      value: '1,234',
      change: '8%',
      changeType: 'increase' as const,
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      title: 'Sản Phẩm',
      value: '156',
      change: '3%',
      changeType: 'decrease' as const,
      icon: Package,
      color: 'bg-purple-500'
    },
    {
      title: 'Khách Hàng',
      value: '2,847',
      change: '15%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Doanh Thu Theo Tháng</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg">
                7 ngày
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                30 ngày
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                90 ngày
              </button>
            </div>
          </div>

          {/* Mock Chart */}
          <div className="h-64 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-primary-500 mx-auto mb-2" />
              <p className="text-gray-600">Biểu đồ doanh thu sẽ được hiển thị ở đây</p>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sản Phẩm Bán Chạy</h3>
          <div className="space-y-4">
            {[
              { name: 'Nike Air Jordan 1', sales: 234, revenue: '$39,780' },
              { name: 'Adidas Stan Smith', sales: 189, revenue: '$15,120' },
              { name: 'Vans Old Skool', sales: 156, revenue: '$10,140' },
              { name: 'Nike Air Max 90', sales: 134, revenue: '$16,080' },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} đã bán</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
};

export default AdminDashboard;