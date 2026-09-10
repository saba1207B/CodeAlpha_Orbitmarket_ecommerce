import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/lib/store";

type CartItem = { productId: string; quantity: number };
type Account = { name: string; email: string; password: string };
type Order = { id: string; items: CartItem[]; total: number; customer: { name: string; email: string; address: string }; createdAt: string };

type StoreContextValue = {
  cart: CartItem[];
  account: Omit<Account, "password"> | null;
  orders: Order[];
  wishlist: string[];
  cartCount: number;
  cartTotal: number;
  cartProducts: { product: Product; quantity: number }[];
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  register: (name: string, email: string, password: string) => { ok: boolean; message: string };
  login: (email: string, password: string) => { ok: boolean; message: string };
  logout: () => void;
  placeOrder: (customer: { name: string; email: string; address: string }) => Order;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => readStorage("orbit-market-cart", []));
  const [account, setAccount] = useState<Omit<Account, "password"> | null>(() => readStorage("orbit-market-session", null));
  const [orders, setOrders] = useState<Order[]>(() => readStorage("orbit-market-orders", []));
  const [wishlist, setWishlist] = useState<string[]>(() => readStorage("orbit-market-wishlist", []));

  useEffect(() => window.localStorage.setItem("orbit-market-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => {
    if (account) window.localStorage.setItem("orbit-market-session", JSON.stringify(account));
    else window.localStorage.removeItem("orbit-market-session");
  }, [account]);
  useEffect(() => window.localStorage.setItem("orbit-market-orders", JSON.stringify(orders)), [orders]);
  useEffect(() => window.localStorage.setItem("orbit-market-wishlist", JSON.stringify(wishlist)), [wishlist]);

  const cartProducts = useMemo(
    () =>
      cart
        .map((item) => ({ product: products.find((p) => p.id === item.productId), quantity: item.quantity }))
        .filter((item): item is { product: Product; quantity: number } => Boolean(item.product)),
    [cart]
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (productId: string, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) return current.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item));
      return [...current, { productId, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((current) => (quantity <= 0 ? current.filter((item) => item.productId !== productId) : current.map((item) => (item.productId === productId ? { ...item, quantity } : item))));
  };

  const removeFromCart = (productId: string) => setCart((current) => current.filter((item) => item.productId !== productId));
  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((current) => (current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]));
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const register = (name: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = readStorage<Account | null>("orbit-market-account", null);
    if (!name.trim() || !normalizedEmail || password.length < 6) return { ok: false, message: "Add your name, a valid email, and a 6+ character password." };
    if (existing?.email === normalizedEmail) return { ok: false, message: "An account already exists for this email. Try signing in." };
    window.localStorage.setItem("orbit-market-account", JSON.stringify({ name: name.trim(), email: normalizedEmail, password }));
    setAccount({ name: name.trim(), email: normalizedEmail });
    return { ok: true, message: "Welcome to Orbit Market." };
  };

  const login = (email: string, password: string) => {
    const existing = readStorage<Account | null>("orbit-market-account", null);
    if (!existing || existing.email !== email.trim().toLowerCase() || existing.password !== password) return { ok: false, message: "Those details don’t match an Orbit Market account." };
    setAccount({ name: existing.name, email: existing.email });
    return { ok: true, message: "You’re signed in." };
  };

  const logout = () => setAccount(null);
  const placeOrder = (customer: { name: string; email: string; address: string }) => {
    const order: Order = { id: `OM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, items: cart, total: cartTotal, customer, createdAt: new Date().toISOString() };
    setOrders((current) => [order, ...current]);
    clearCart();
    return order;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        account,
        orders,
        wishlist,
        cartCount,
        cartTotal,
        cartProducts,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        register,
        login,
        logout,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used within StoreProvider");
  return value;
}
