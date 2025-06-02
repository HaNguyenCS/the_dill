export interface Product {
  id: string;
  image: string | { default: string };
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  isPopular?: boolean;
}

export type ProductCategory = 'banh-mi' | 'drinks' | 'sides' | 'desserts';