import React, { createContext, useContext, useState } from 'react';
import { Cart, CartItem } from '../data/cart';

interface CartContextType {
    cart: Cart;
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
}

const initialCart: Cart = {
    items: [],
    totalAmount: 0
};

const CartContext = createContext<CartContextType>({
    cart: initialCart,
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {}
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Cart>({ items: [], totalAmount: 0 });

    const addToCart = (item: CartItem) => {
        setCart(prev => ({
            items: [...prev.items, item],
            totalAmount: prev.totalAmount + item.totalPrice
        }));
    };

    const removeFromCart = (itemId: string) => {
        setCart(prev => {
            const item = prev.items.find(i => i.id === itemId);
            return {
                items: prev.items.filter(i => i.id !== itemId),
                totalAmount: prev.totalAmount - (item?.totalPrice || 0)
            };
        });
    };

    const clearCart = () => {
        setCart({ items: [], totalAmount: 0 });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
};