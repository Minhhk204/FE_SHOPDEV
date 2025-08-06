export interface ProductAttributes {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId?: number;
  brandId?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductSizeAttributes {
  id: number;
  size: number;
  productId: number;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId?: number;
  brandId?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
  brand?: Brand;
}

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: "user" | "admin";
}

export interface UserCreationAttributes {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  lastLogin?: string;
  role: "user" | "admin";
  avatar?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ProductSize {
  productSizeId: number;
  productId: Product;
}

export interface CartItem {
  productSizeId: number;
  quantity: number;
  productSize: ProductSize;
}

export interface CartItemAttributies {
  productSizeId: number;
  quantity: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
