import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "../../types";
import { showSuccessToast } from "../../utils/toast";
import { formatPrice, getTotalStock } from "../../utils/format.price";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const getImageUrl = (product: Product) => {
    if (product.imageUrl) {
      return product.imageUrl;
    }
    // Fallback image nếu không có imageUrl
    return "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500";
  };
  const handleAddToCart = () => {
    dispatch(
      addToCart({ productSizeId: product.product_sizes[0].id, quantity: 1 })
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl(product)}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
            <ShoppingCart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Stock Badge */}
        {product.stock <= 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Hết hàng
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category and Brand */}
        <div className="flex items-center space-x-2 mb-2">
          {product.category && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {product.category.name}
            </span>
          )}
          {product.brand && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {product.brand.name}
            </span>
          )}
        </div>

        {/* Product Name */}
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price and Stock */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-gray-500">
              Còn lại: {getTotalStock(product)} sản phẩm
            </p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={product.stock <= 0}
          onClick={handleAddToCart}
          className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.stock <= 0 ? "Hết hàng" : "Thêm vào giỏ"}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
