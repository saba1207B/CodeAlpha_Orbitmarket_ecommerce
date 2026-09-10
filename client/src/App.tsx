import { useCallback, useEffect, useState } from "react";
import { Route, Router, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { StoreProvider } from "./contexts/StoreContext";
import Home, { AuthDialog, CartDrawer, CheckoutDialog, Footer, OrderSuccess, ProductDetails, StoreHeader } from "./pages/Home";

function useHashLocation(): [string, (to: string) => void] {
  const read = () => typeof window === "undefined" ? "/" : window.location.hash.replace(/^#/, "") || "/";
  const [location, setLocation] = useState(read);
  useEffect(() => {
    const onHashChange = () => setLocation(read());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const navigate = useCallback((to: string) => {
    window.location.hash = to.startsWith("/") ? to : `/${to}`;
  }, []);
  return [location, navigate];
}

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  return <div className="app-shell"><StoreHeader onCart={() => setCartOpen(true)} onAuth={() => setAuthOpen(true)} /><Switch><Route path="/" component={Home} /><Route path="/product/:id" component={ProductDetails} /><Route component={Home} /></Switch><Footer /><CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }} /><AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} /><CheckoutDialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)} onSuccess={(id) => { setCheckoutOpen(false); setOrderId(id); }} />{orderId && <OrderSuccess orderId={orderId} onClose={() => setOrderId(null)} />}</div>;
}

export default function App() {
  return <ErrorBoundary><StoreProvider><TooltipProvider><Toaster /><Router hook={useHashLocation}><AppContent /></Router></TooltipProvider></StoreProvider></ErrorBoundary>;
}
