export interface Product {
  id: string;
  image: string | { default: string };
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  isPopular?: boolean;
}

export enum ProductCategory {
  BANH_MI = 'banh-mi',
  DRINK = 'drink',
  SIDE = 'side',
  DESSERT = 'dessert',
  COMBO = 'combo'
}