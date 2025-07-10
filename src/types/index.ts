export interface Product {
  id: string;
  name: string;
  brand: 'Nike' | 'Adidas' | 'Vans';
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  category: string;
  sizes: number[];
  colors: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  size: number;
  color: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}