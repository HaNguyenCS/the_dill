import { Product } from '../../data/product';

const products: Product[] = [
  {
    id: '1',
    image: require('../../asset/banhmy.jpg'),
    title: 'Classic Banh Mi',
    description: 'Traditional Vietnamese sandwich with pâté, pickled vegetables, cilantro, and mayo',
    price: 6.99,
    category: 'banh-mi' as Product['category'],
    isPopular: true
  },
  {
    id: '2',
    image: require('../../asset/Banh-Mi-Thit-Nuong.jpg'),
    title: 'Grilled Pork Banh Mi',
    description: 'Marinated grilled pork with classic toppings and house special sauce',
    price: 9.99,
    category: 'banh-mi' as Product['category'],
    isPopular: true
  },
  {
    id: '3',
    image: require('../../asset/caphe.webp'),
    title: 'Coffee',
    description: '',
    price: 3.99,
    category: 'drink' as Product['category'],
    isPopular: true
  },
  {
    id: '4',
    image: require('../../asset/kumquat_tea.png'),
    title: 'Kumquat Tea',
    description: 'Marinated grilled pork with classic toppings and house special sauce',
    price: 9.99,
    category: 'drink' as Product['category'],
    isPopular: true
  },
  {
    id: '5',
    image: require('../../asset/caphe.webp'),
    title: 'Chicken Banh Mi',
    description: 'Marinated grilled pork with classic toppings and house special sauce',
    price: 9.99,
    category: 'banh-mi' as Product['category'],
    isPopular: false
  },
  {
    id: '6',
    image: require('../../asset/pate.jpg'),
    title: 'Patê',
    description: 'Marinated grilled pork with classic toppings and house special sauce',
    price: 0.99,
    category: 'side' as Product['category'],
    isPopular: false
  },
];

export class ProductFacade {

  getAllProducts(): Product[] {
    return products;
  }

  getPopularProducts(): Product[] {
    return products.filter(product => product.isPopular);
  }

  getProductsByCategory(category: Product['category']): Product[] {
    return products.filter(product => product.category === category);
  }

  getProductById(id: string): Product | undefined {
    return products.find(product => product.id === id);
  }
}

export const productFacade = new ProductFacade();