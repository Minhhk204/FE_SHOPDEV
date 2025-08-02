import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import { RootState } from '../../store';
import ProductCard from '../Product/ProductCard';

const FeaturedProducts: React.FC = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Lấy 6 sản phẩm đầu tiên để hiển thị
  const featuredProducts = products.slice(0, 6);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-gray-600">Khám phá những sản phẩm được yêu thích nhất</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm animate-pulse">
                <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-red-600">Có lỗi xảy ra khi tải sản phẩm: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sản Phẩm Nổi Bật</h2>
          <p className="text-gray-600">Khám phá những sản phẩm được yêu thích nhất</p>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Chưa có sản phẩm nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            Xem Tất Cả Sản Phẩm
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;