import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  ShoppingBag,
} from "lucide-react";
import productApi from "../api/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { formatPrice } from "../utils/format.price";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [dataProduct, setDataProduct] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("id...", id);
    getProductDetail(id);
  }, [id]);

  const getProductDetail = async (id: string) => {
    const response = await productApi.getById(parseInt(id));
    console.log("response productDEtail ...", response);
    setDataProduct(response);
  };

  if (!ProductDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Không Tìm Thấy Sản Phẩm
          </h2>
          <Link
            to="/products"
            className="text-primary-600 hover:text-primary-700"
          >
            Quay Lại Sản Phẩm
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn size và màu sắc");
      return;
    }

    // dispatch add to cart truyền vào sizeID
    dispatch(addToCart({ productSizeId: selectedSize, quantity: quantity }));
  };

  const brandColors = {
    Nike: "text-nike",
    Adidas: "text-adidas",
    Vans: "text-vans",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-600">
            Trang Chủ
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-600">
            Sản Phẩm
          </Link>
          <span>/</span>
          <span className="text-gray-900">{dataProduct?.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-sm">
              <img
                src={dataProduct?.imageUrl}
                alt={dataProduct?.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? 'border-primary-600' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div> */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-semibold`}>
                  {dataProduct?.brand.name}
                </span>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {dataProduct?.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(4.5)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {4.5} ({100} đánh giá)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(dataProduct?.price || 0)}
                </span>
                {/* {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded">
                    Tiết kiệm ${product.originalPrice - product.price}
                  </span>
                )} */}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {dataProduct?.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Size</h3>
                {selectedSize && (
                  <span className="text-sm text-gray-600">
                    Còn lại:{" "}
                    {dataProduct?.product_sizes.find(
                      (ps) => ps.id === selectedSize
                    )?.stock || 0}{" "}
                    sản phẩm
                  </span>
                )}
              </div>
              <div className="grid grid-cols-6 gap-2">
                {dataProduct?.product_sizes.map((productSize) => (
                  <button
                    key={productSize.size}
                    onClick={() => {
                      setSelectedSize(productSize.id);
                      setQuantity(Math.min(quantity, productSize.stock));
                    }}
                    disabled={productSize.stock === 0}
                    className={`py-3 px-2 text-center border rounded-lg transition-colors ${
                      selectedSize === productSize.id
                        ? "border-primary-600 bg-primary-50 text-primary-600"
                        : productSize.stock === 0
                        ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div>{productSize.size}</div>
                    {/* <div className="text-xs text-gray-500">{productSize.stock}</div> */}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {/* <div>
              <h3 className="font-semibold text-gray-900 mb-3">Màu Sắc</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedColor === color
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Số Lượng</h3>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => {
                      const maxStock =
                        dataProduct?.product_sizes.find(
                          (ps) => ps.id === selectedSize
                        )?.stock || 0;
                      setQuantity(Math.min(maxStock, quantity + 1));
                    }}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {selectedSize && (
                  <span className="text-sm text-gray-500">
                    Tối đa:{" "}
                    {dataProduct?.product_sizes.find(
                      (ps) => ps.id === selectedSize
                    )?.stock || 0}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center space-x-2 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors transform hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Thêm Vào Giỏ Hàng</span>
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium text-sm">Giao Hàng Miễn Phí</p>
                  <p className="text-xs text-gray-600">Đơn hàng trên $100</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium text-sm">Hàng Chính Hãng</p>
                  <p className="text-xs text-gray-600">100% authentic</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium text-sm">Đổi Trả Dễ Dàng</p>
                  <p className="text-xs text-gray-600">Trong 30 ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
