import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-full">
                Giày Thể Thao Cao Cấp
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Bước Vào
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                  Đẳng Cấp
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Khám phá bộ sưu tập giày thể thao cao cấp mới nhất từ Nike, Adidas và Vans. 
                Chất lượng, thoải mái và phong cách trong từng bước chân.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 group"
              >
                Mua Ngay
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                Tìm Hiểu Thêm
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Giao Hàng Nhanh</h4>
                  <p className="text-sm text-gray-400">Trong 2-3 ngày</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Hàng Chính Hãng</h4>
                  <p className="text-sm text-gray-400">100% authentic</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Đổi Trả Miễn Phí</h4>
                  <p className="text-sm text-gray-400">Trong 30 ngày</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Giày Thể Thao Cao Cấp"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
            {/* Background Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary-600 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary-400 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Brand Strip */}
      <div className="border-t border-gray-800 bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-12 opacity-60">
            <div className="text-2xl font-bold text-nike">NIKE</div>
            <div className="text-2xl font-bold text-white">ADIDAS</div>
            <div className="text-2xl font-bold text-vans">VANS</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;