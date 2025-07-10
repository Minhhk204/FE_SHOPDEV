import React from 'react';
import ProductTable from '../../components/Admin/Products/ProductTable';

const AdminProducts: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản Lý Sản Phẩm</h1>
        <p className="text-gray-600 mt-1">Quản lý toàn bộ sản phẩm trong cửa hàng</p>
      </div>
      
      <ProductTable />
    </div>
  );
};

export default AdminProducts;