import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Air Jordan 1 Retro High OG',
    brand: 'Nike',
    price: 170,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'The Air Jordan 1 Retro High OG stays true to its roots with premium leather, comfortable cushioning and the iconic silhouette that started it all.',
    category: 'Basketball',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Black/White', 'Bred', 'Royal Blue'],
    rating: 4.8,
    reviewCount: 1247,
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Stan Smith Originals',
    brand: 'Adidas',
    price: 80,
    image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Clean and simple, the Stan Smith shoe is a tennis-inspired sneaker that made its debut in 1971.',
    category: 'Lifestyle',
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['White/Green', 'White/Navy', 'All White'],
    rating: 4.6,
    reviewCount: 892,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Old Skool Classic',
    brand: 'Vans',
    price: 65,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'The Old Skool is Vans classic skate shoe and the first to bear the iconic sidestripe.',
    category: 'Skateboarding',
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    colors: ['Black/White', 'Navy/White', 'Burgundy/White'],
    rating: 4.7,
    reviewCount: 634,
    isFeatured: true
  },
  {
    id: '4',
    name: 'Air Max 90',
    brand: 'Nike',
    price: 120,
    originalPrice: 140,
    image: 'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Featuring the same iconic Waffle sole, updated materials and original colorways.',
    category: 'Running',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['White/Grey/Black', 'Infrared', 'Triple White'],
    rating: 4.5,
    reviewCount: 423
  },
  {
    id: '5',
    name: 'Ultraboost 22',
    brand: 'Adidas',
    price: 180,
    image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Experience incredible energy return with responsive BOOST midsole cushioning.',
    category: 'Running',
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Core Black', 'Cloud White', 'Solar Red'],
    rating: 4.9,
    reviewCount: 756,
    isNew: true
  },
  {
    id: '6',
    name: 'Authentic Canvas',
    brand: 'Vans',
    price: 50,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'The original and now iconic Vans silhouette, the Authentic was our first footwear design.',
    category: 'Lifestyle',
    sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    colors: ['Black', 'White', 'Navy', 'Red', 'Checkered'],
    rating: 4.4,
    reviewCount: 289
  }
];