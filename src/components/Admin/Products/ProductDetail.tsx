import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import productApi from "../../../api/productApi";
import productSizeApi from "../../../api/productSizeApi";
import { Product, ProductSizeAttributes } from "../../../types";
import { showErrorToast } from "../../../utils/toast";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddSizeForm, setShowAddSizeForm] = useState(false);
  const [editingSize, setEditingSize] = useState<ProductSizeAttributes | null>(
    null
  );
  const [sizeForm, setSizeForm] = useState({ size: "", stock: "" });

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await productApi.getById(Number(id));
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSize = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productSizeApi.create({
        productId: Number(id),
        size: Number(sizeForm.size),
        stock: Number(sizeForm.stock),
      });
      setSizeForm({ size: "", stock: "" });
      setShowAddSizeForm(false);
      fetchProduct();
    } catch (error: any) {}
  };

  const handleEditSize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSize) return;

    try {
      await productSizeApi.update(editingSize.id, {
        size: Number(sizeForm.size),
        stock: Number(sizeForm.stock),
      });
      setSizeForm({ size: "", stock: "" });
      setEditingSize(null);
      fetchProduct();
    } catch (error: any) {}
  };

  const handleDeleteSize = async (sizeId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa size này?")) {
      try {
        await productSizeApi.delete(sizeId);
        fetchProduct();
      } catch (error: any) {}
    }
  };

  const startEditSize = (size: ProductSizeAttributes) => {
    setEditingSize(size);
    setSizeForm({
      size: size.size.toString(),
      stock: size.stock.toString(),
    });
    setShowAddSizeForm(true);
  };

  const cancelEdit = () => {
    setEditingSize(null);
    setSizeForm({ size: "", stock: "" });
    setShowAddSizeForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Đang tải...</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-red-500">Không tìm thấy sản phẩm</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Quay lại
        </button>
        <h1 className="text-2xl font-bold">Chi tiết sản phẩm</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={
                product.image ||
                product.imageUrl ||
                "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500"
              }
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Giá:</span> ${product.price}
              </p>
              <p>
                <span className="font-medium">Thương hiệu:</span>{" "}
                {typeof product.brand === "object"
                  ? product.brand?.name
                  : product.brand}
              </p>
              <p>
                <span className="font-medium">Danh mục:</span>{" "}
                {typeof product.category === "object"
                  ? product.category?.name
                  : product.category}
              </p>
              <p>
                <span className="font-medium">Tổng kho:</span> {product.stock}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Quản lý Size</h3>
          <button
            onClick={() => setShowAddSizeForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Size</span>
          </button>
        </div>

        {showAddSizeForm && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium mb-3">
              {editingSize ? "Sửa Size" : "Thêm Size Mới"}
            </h4>
            <form
              onSubmit={editingSize ? handleEditSize : handleAddSize}
              className="flex gap-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Size</label>
                <input
                  type="number"
                  value={sizeForm.size}
                  onChange={(e) =>
                    setSizeForm({ ...sizeForm, size: e.target.value })
                  }
                  required
                  className="px-3 py-2 border rounded-md w-20"
                  placeholder="41"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Số lượng
                </label>
                <input
                  type="number"
                  value={sizeForm.stock}
                  onChange={(e) =>
                    setSizeForm({ ...sizeForm, stock: e.target.value })
                  }
                  required
                  className="px-3 py-2 border rounded-md w-24"
                  placeholder="10"
                />
              </div>
              <div className="flex items-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {editingSize ? "Cập nhật" : "Thêm"}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Số lượng
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {product.product_sizes?.map((size) => (
                <tr key={size.id}>
                  <td className="px-4 py-3 text-sm">{size.size}</td>
                  <td className="px-4 py-3 text-sm">{size.stock}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditSize(size)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSize(size.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!product.product_sizes || product.product_sizes.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              Chưa có size nào được thêm
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
