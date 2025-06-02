import { Product } from '../../data/product';
// import { products } from '../../data/product';

const products = [
  {
    id: '1',
    image: require('../../asset/Banh-Mi-Thit-Nuong.jpg'),
    title: 'Classic Banh Mi',
    description: 'Traditional Vietnamese sandwich with pâté, pickled vegetables, cilantro, and mayo',
    price: 6.99,
    category: 'banh-mi',
    isPopular: true
  },
  {
    id: '2',
    image: require('../../asset/caphe.webp'),
    title: 'Grilled Pork Banh Mi',
    description: 'Marinated grilled pork with classic toppings and house special sauce',
    price: 9.99,
    category: 'banh-mi',
    isPopular: true
  },
];

export class ProductFacade {

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