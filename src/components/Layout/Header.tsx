import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, Heart, Settings, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/userSlice';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state: cartState } = useCart();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MSneaker</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Trang Chủ
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Sản Phẩm
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Thương Hiệu
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link to="/products?brand=nike" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-nike">
                    Nike
                  </Link>
                  <Link to="/products?brand=adidas" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-adidas">
                    Adidas
                  </Link>
                  <Link to="/products?brand=vans" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-vans">
                    Vans
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Giới Thiệu
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary-600 transition-colors">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-6 h-6 rounded-full" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  <span className="text-sm font-medium">{user?.fullName}</span>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {/* Admin Menu */}
                    {user?.role === 'admin' && (
                      <>
                        <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                          Dashboard
                        </Link>
                        <Link to="/admin/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                          Quản lý sản phẩm
                        </Link>
                        <Link to="/admin/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                          Quản lý đơn hàng
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                      </>
                    )}

                    {/* User Menu */}
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      Hồ Sơ
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      Đơn Hàng
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      Đăng Xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 p-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Đăng Nhập</span>
              </Link>
            )}

            <button className="p-2 text-gray-700 hover:text-primary-600 transition-colors">
              <Heart className="w-5 h-5" />
            </button>

            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartState.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartState.itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-slide-up">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
                Trang Chủ
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium">
                Sản Phẩm
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium">
                Giới Thiệu
              </Link>

              {/* Admin Mobile Menu */}
              {isLoggedIn && user?.role === 'admin' && (
                <>
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Admin Panel
                    </h3>
                    <Link to="/admin" className="block text-gray-700 hover:text-primary-600 font-medium">
                      Dashboard
                    </Link>
                    <Link to="/admin/products" className="block text-gray-700 hover:text-primary-600 font-medium">
                      Quản lý sản phẩm
                    </Link>
                    <Link to="/admin/orders" className="block text-gray-700 hover:text-primary-600 font-medium">
                      Quản lý đơn hàng
                    </Link>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  {isLoggedIn ? (
                    <span className="text-sm text-gray-600">Xin chào, {user?.fullName}</span>
                  ) : (
                    <Link to="/login" className="text-primary-600 font-medium">
                      Đăng Nhập
                    </Link>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-700">
                    <Heart className="w-5 h-5" />
                  </button>
                  <Link to="/cart" className="relative p-2 text-gray-700">
                    <ShoppingBag className="w-5 h-5" />
                    {cartState.itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                        {cartState.itemCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>

              {/* Mobile Logout */}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Đăng Xuất</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 animate-scale-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Tìm Kiếm Sản Phẩm</h3>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm giày thể thao..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
                <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Tìm Kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;