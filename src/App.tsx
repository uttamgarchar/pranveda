import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart, { CartItem } from "@/components/Cart";
import LoadingAnimation from "@/components/LoadingAnimation";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import Products from "./pages/Products";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import Auth from "./pages/Auth";
import OrderHistory from "./pages/OrderHistory";
import { Product } from "@/components/ProductCard";
import ScrollToTop from "./components/ScrollTop";

const queryClient = new QueryClient();

const AnimatedRoutes = ({ onAddToCart }: { onAddToCart: (product: Product) => void }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/products" element={<PageTransition><Products onAddToCart={onAddToCart} /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/orders" element={<PageTransition><OrderHistory /></PageTransition>} />
        <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminPanel /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  if (isLoading) {
    return <LoadingAnimation onLoadingComplete={() => setIsLoading(false)} />;
  }

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
      variant: "destructive",
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const message = `Hello! I'd like to order the following from PRANVEDA:\n\n${cartItems
      .map((item) => `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}`)
      .join("\n")}\n\n*Total: ₹${total}*\n\nPlease confirm my order.`;

    const whatsappUrl = `https://wa.me/919725417154?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <AnimatedRoutes onAddToCart={handleAddToCart} />
      <Footer />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
