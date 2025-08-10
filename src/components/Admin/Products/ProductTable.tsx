import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import productApi from "../../../api/productApi";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import { showErrorToast } from "../../../utils/toast";
import { formatPrice, getTotalStock } from "../../../utils/format.price";

const ProductTable: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [listProduct, setListProduct] = useState<any[] | undefined>();
  const itemsPerPage = 20;
  const [totalPages, setTotalaPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const category: any = [
    { _id: 1, name: "Running" },
    { _id: 2, name: "Sneakers" },
    { _id: 3, name: "Casual" },
  ];

  const brand = [
    { _id: 1, name: "Nike" },
    { _id: 2, name: "Vans" },
    { _id: 3, name: "Adidas" },
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    getListProduct();
  }, []);

  const getListProduct = async () => {
    const res = await productApi.getAll();
    console.log("res...", res);
    setListProduct(res);
    setTotalaPage(Math.ceil(res.length / itemsPerPage));
  };

  const getBrandColor = (brand: string) => {
    switch (brand) {
      case "Nike":
        return "bg-orange-100 text-orange-800";
      case "Adidas":
        return "bg-gray-100 text-gray-800";
      case "Vans":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setShowEditForm(true);
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await productApi.delete(productId);
        getListProduct();
      } catch (error: any) {
        console.error("Error deleting product:", error);
        const message =
          error.response?.data?.message || "Có lỗi xảy ra khi xóa sản phẩm";
        showErrorToast(message);
      }
    }
  };

  if (!listProduct) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Quản Lý Sản Phẩm
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Sản Phẩm</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sản Phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thương Hiệu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Danh Mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tổng Kho
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đánh Giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng Thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listProduct.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={
                        product.image ||
                        product.imageUrl ||
                        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500"
                      }
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {product.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBrandColor(
                      typeof product.brand === "object"
                        ? product.brand?.name
                        : product.brand
                    )}`}
                  >
                    {typeof product.brand === "object"
                      ? product.brand?.name
                      : product.brand}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {typeof product.category === "object"
                    ? product.category?.name
                    : product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatPrice(product.price)}
                  </div>
                  {product.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {getTotalStock(product)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">
                      {product.rating || "N/A"}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviewCount || 0})
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Hoạt động
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigate(`/admin/products/${product.id}`)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-green-600 hover:text-green-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Hiển thị {startIndex + 1} đến{" "}
          {Math.min(startIndex + itemsPerPage, listProduct.length)} trong tổng
          số {listProduct.length} sản phẩm
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded-md text-sm ${
                currentPage === page
                  ? "bg-primary-600 text-white border-primary-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      </div>

      <AddProductForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSuccess={getListProduct}
      />

      <EditProductForm
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        onSuccess={getListProduct}
        product={selectedProduct}
      />
    </div>
  );
};

export default ProductTable;
