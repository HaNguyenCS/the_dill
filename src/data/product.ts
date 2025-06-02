export interface Product {
  id: string;
  image: string | { default: string };
  title: string;
  description: string;
  price: number;
  category: string;
  isPopular?: boolean;
}