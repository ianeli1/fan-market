import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Fan, CartItem } from "../types";

type CartContextValue = {
  cart: CartItem[];
  addToCart: (fan: Fan) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

// Where the cart is saved in the browser so it survives a page refresh.
const STORAGE_KEY = "fan-market-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  // Start the cart with whatever we saved last time.
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = window.localStorage.getItem("fanCart");
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  });

  // Every time the cart changes, save it again.
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(fan: Fan) {
    setCart((current) => [...current, { ...fan, quantity: 1 }]);
  }

  function removeFromCart(id: number) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function updateQuantity(id: number, quantity: number) {
    setCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// A small helper so pages can write `const { cart } = useCart()`.
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
