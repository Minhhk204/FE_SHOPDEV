import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import WelcomeMessage from '../components/WelcomeMessage';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* Welcome Message */}
      <div className="container mx-auto px-4">
        <WelcomeMessage />
      </div>

      <FeaturedProducts />

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Cập Nhật Tin Tức
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              Nhận thông tin mới nhất về sản phẩm mới, ưu đãi độc quyền và các bộ sưu tập giày thể thao.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;