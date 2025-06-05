import { Product } from './product';

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    selectedSides?: string[];
    notes?: string;
    totalPrice: number;
}

export interface Cart {
    items: CartItem[];
    totalAmount: number;
}