import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">MSneaker</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Điểm đến hàng đầu cho giày thể thao cao cấp từ Nike, Adidas và Vans.
              Chất lượng, thoải mái và phong cách trong từng bước chân.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thương Hiệu</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?brand=nike" className="text-gray-400 hover:text-nike transition-colors text-sm">
                  Nike
                </Link>
              </li>
              <li>
                <Link to="/products?brand=adidas" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Adidas
                </Link>
              </li>
              <li>
                <Link to="/products?brand=vans" className="text-gray-400 hover:text-vans transition-colors text-sm">
                  Vans
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thông Tin Liên Hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="text-gray-400">Mộc Hoàn - Vân Côn - Hoài Đức - Hà Nội</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="text-gray-400">0968399602</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="text-gray-400">MinhSneaker.vn</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 MSneaker. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Chính Sách Bảo Mật
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
              Điều Khoản Dịch Vụ
            </Link>
            <Link to="/returns" className="text-gray-400 hover:text-white transition-colors text-sm">
              Đổi Trả
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;