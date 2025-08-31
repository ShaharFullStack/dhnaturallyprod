import { useState, useEffect } from 'react';
import { useLanguage } from '../Contexts/language-context';
import { useToast } from './use-toast';
import { t } from '../lib/i18b';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

function getSessionId(): string {
  let sessionId = localStorage.getItem('dh-session-id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('dh-session-id', sessionId);
  }
  return sessionId;
}

export function useCart() {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('dh-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('dh-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setIsLoading(true);
    try {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.productId === product.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          const newItem: CartItem = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            productId: product.id,
            quantity,
            product
          };
          return [...prevItems, newItem];
        }
      });
      
      toast({
        title: t('success.cart.added', language),
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: t('common.error', language),
        description: 'Failed to add item to cart',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = ({ id, quantity }: { id: string; quantity: number }) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cartItems,
    isLoading,
    totalPrice,
    totalItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    isAddingToCart: isLoading,
  };
}