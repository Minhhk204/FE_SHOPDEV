import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { getCurrentUser } from "./store/userSlice";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Chatbot from "./components/Chatbot";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { ToastContainer } from "react-toastify";

// Admin Components
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminProductDetail from "./components/Admin/Products/ProductDetail";
import { fetchCart } from "./store/cartSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);

  // Kiểm tra token khi app khởi động
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn) {
      dispatch(getCurrentUser());
      dispatch(fetchCart());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Admin Routes - Chỉ admin mới truy cập được */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/:id" element={<AdminProductDetail />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route
              path="customers"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Quản Lý Khách Hàng</h1>
                </div>
              }
            />
            <Route
              path="analytics"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Thống Kê</h1>
                </div>
              }
            />
            <Route
              path="settings"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Cài Đặt</h1>
                </div>
              }
            />
          </Route>

          {/* Protected Routes - Cần đăng nhập */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex flex-col font-inter">
                  <Header />
                  <main className="flex-1">
                    <Cart />
                  </main>
                  <Footer />
                  <Chatbot />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen flex flex-col font-inter">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
                <Chatbot />
              </div>
            }
          />
        </Routes>
        <ToastContainer />
      </Router>
    </CartProvider>
  );
}

export default App;
