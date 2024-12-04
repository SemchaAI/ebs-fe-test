import { createContext, useState, type ReactNode } from 'react';
import type { IProduct } from '@/models/product';

interface CartContextValue {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (product: IProduct) => void;
  removeAllFromCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<IProduct[]>([]);

  const addToCart = (product: IProduct) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product: IProduct) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const removeAllFromCart = () => {
    setCart([]);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeAllFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
