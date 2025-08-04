import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react";

// import { useCart } from '../context/CartContext';
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import { showInfoToast, showSuccessToast } from "../utils/toast";
import { formatPrice } from "../utils/format.price";
import { useDispatch } from "react-redux";
import { updateCartItem , deleteCartItem} from "../store/cartSlice";

const Cart: React.FC = () => {
  //   const { state, dispatch } = useCart();
  const dispatch = useDispatch()
  const { listCartItem, totalPrice, totalProduct } = useSelector(
    (state: RootState) => state.cart
  );

  const updateQuantity = (itemId: string, newQuantity: number) => {

    if (newQuantity <= 0) {
      //   dispatch({ type: 'REMOVE_ITEM', payload: itemId });
      showSuccessToast("Số lượng không thể nhỏ hơn 1");
    } else {
      //   dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity: newQuantity } });
      // update số lượng
	  dispatch(updateCartItem({id:itemId,cartItem: { quantity: newQuantity}}))
    }
  };

  const removeItem = (itemId: string) => {
    showSuccessToast(`Xóa Item ${itemId}`);
    // dispatch({ type: 'REMOVE_ITEM', payload: itemId });
	dispatch(deleteCartItem(itemId))
  };

  if (listCartItem.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-gray-600 mb-8">
              Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tiếp Tục Mua Sắm</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Giỏ Hàng</h1>
          <Link
            to="/products"
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tiếp Tục Mua Sắm</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {listCartItem.map((item) => {
              const productName = item.productSize.products.name;
              const imageProduct = item.productSize.products.imageUrl;
              const brand = item.productSize.products.brandId;
              const size = item.productSize.size;
              const itemPrice = item.productSize.products.price;
              const itemId = `${item.productSize.id}`;
              return (
                <div
                  key={itemId}
                  className="bg-white rounded-lg shadow-sm p-6 animate-fade-in"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={imageProduct}
                      alt={productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {productName}
                      </h3>
                      <p className="text-sm text-gray-600">{brand}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-600">
                          Size: {size}
                        </span>
                        {/* <span className="text-sm text-gray-600">Màu: {item.color}</span> */}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(itemPrice * item.quantity)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatPrice(itemPrice)} mỗi đôi
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Tóm Tắt Đơn Hàng
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    Tạm tính ({totalProduct} sản phẩm)
                  </span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span className="font-medium text-green-600">Miễn phí</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Thuế</span>
                  <span className="font-medium">
                    {formatPrice(totalPrice * 0.08)}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Tổng cộng
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {formatPrice(totalPrice * 1.08)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors transform hover:scale-105">
                Tiến Hành Thanh Toán
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Bảo mật SSL 256-bit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
