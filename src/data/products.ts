import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Air Jordan 1 Retro High OG',
    description: 'The Air Jordan 1 Retro High OG stays true to its roots with premium leather, comfortable cushioning and the iconic silhouette that started it all.',
    price: 170,
    stock: 50,
    imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoryId: 1,
    brandId: 1,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: 'Stan Smith Originals',
    description: 'Clean and simple, the Stan Smith shoe is a tennis-inspired sneaker that made its debut in 1971.',
    price: 80,
    stock: 75,
    imageUrl: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoryId: 2,
    brandId: 2,
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 3,
    name: 'Old Skool Classic',
    description: 'The Old Skool is Vans classic skate shoe and the first to bear the iconic sidestripe.',
    price: 65,
    stock: 60,
    imageUrl: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoryId: 3,
    brandId: 3,
    isActive: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: 4,
    name: 'Air Max 90',
    description: 'Featuring the same iconic Waffle sole, updated materials and original colorways.',
    price: 120,
    stock: 40,
    imageUrl: 'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoryId: 4,
    brandId: 1,
    isActive: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 5,
    name: 'Ultraboost 22',
    description: 'Experience incredible energy return with responsive BOOST midsole cushioning.',
    price: 180,
    stock: 30,
    imageUrl: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoryId: 4,
    brandId: 2,
    isActive: true,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 6,
    name: 'Authentic Canvas',
    description: 'The original and now iconic Vans silhouette, the Authentic was our first footwear design.',
    price: 50,
    stock: 100,
    imageUrl: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoryId: 2,
    brandId: 3,
    isActive: true,
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30')
  }
];