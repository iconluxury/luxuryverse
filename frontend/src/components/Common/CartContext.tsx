import { createContext, useContext, useState, useEffect } from 'react';

// Define the CartItem interface
interface CartItem {
  customer_id: string | null;
  product_id: string;
  variant_id: string;
  title: string;
  brand: string;
  price: string;
  full_price: string;
  image: string;
  size: string;
  quantity: number;
}

// Define the CartContext type
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.every((item) => item.product_id && item.variant_id)) {
          return parsed;
        }
      }
      return [];
    } catch (err) {
      console.error('Failed to parse cart from localStorage:', err);
      return [];
    }
  });

  const [cartCount, setCartCount] = useState(0);

  // Update cart count and localStorage whenever cart changes
  useEffect(() => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    if (!newItem.product_id || !newItem.variant_id) {
      console.error('Invalid item added to cart:', newItem);
      return;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product_id === newItem.product_id && item.variant_id === newItem.variant_id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product_id === newItem.product_id && item.variant_id === newItem.variant_id
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item
        );
      }
      return [...prevCart, { ...newItem, quantity: newItem.quantity || 1 }];
    });
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.product_id === productId && item.variant_id === variantId)));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);