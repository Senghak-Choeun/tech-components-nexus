
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { EnhancedProductCatalog } from '@/components/EnhancedProductCatalog';
import { PrachnaAI } from '@/components/PrachnaAI';
import { Footer } from '@/components/Footer';
import { ImprovedShoppingCart } from '@/components/ImprovedShoppingCart';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find((item: any) => item.id === product.id);
      if (existingItem) {
        return prev.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter((item: any) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map((item: any) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleSearchProduct = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header 
        cartItemsCount={cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <HeroSection />
      <EnhancedProductCatalog 
        onAddToCart={addToCart}
        searchQuery={searchQuery}
      />
      <PrachnaAI 
        onAddToCart={addToCart}
        onSearchProduct={handleSearchProduct}
      />
      <Footer />
      
      <ImprovedShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
      
      <Toaster />
    </div>
  );
};

export default Index;
