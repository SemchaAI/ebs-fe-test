import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { IProduct } from '@/models/product';

interface ICartProduct extends IProduct {
  quantity: number;
}

interface CartContextValue {
  cart: ICartProduct[];
  addItem: (product: IProduct) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  totalAmount: string;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ICartProduct[]>(
    JSON.parse(localStorage.getItem('cart') || '[]')
  );

  // useEffect(() => {
  //   const storedCart = localStorage.getItem('cart');
  //   if (storedCart) setCart(JSON.parse(storedCart));
  // }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const totalAmount = useMemo(() => {
    return cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  }, [cart]);

  const addItem = (product: IProduct, quantity: number = 1) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (!existingItem) setCart([...cart, { ...product, quantity: 1 }]);
    else {
      setCart(
        cart.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        })
      );
    }
  };
  const updateQuantity = useCallback((id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        updateQuantity,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
