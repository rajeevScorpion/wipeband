'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from './types';
import { STARTER_KIT_PRODUCT, ACTIVE_PRODUCTS } from './products';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  addStarterKit: (variantId?: string, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedPattern: string;
  setSelectedPattern: (patternId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const ALLOWED_SLUGS = new Set(ACTIVE_PRODUCTS.map((p) => p.slug));

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<string>('dinosaur');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wipeband_cart');
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        const validItems = parsed.filter((item) => ALLOWED_SLUGS.has(item.slug));
        setItems(validItems);
      }
    } catch {
      // localStorage may fail in restricted iframe environments
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    try {
      localStorage.setItem('wipeband_cart', JSON.stringify(items));
    } catch {
      // ignored
    }
  }, [items, hasLoaded]);

  const addItem = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    if (!ALLOWED_SLUGS.has(newItem.slug)) {
      return;
    }
    setItems((prev) => {
      const qtyToAdd = newItem.quantity || 1;
      const existingIndex = prev.findIndex(
        (i) => i.productId === newItem.productId && i.variantId === newItem.variantId
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qtyToAdd;
        return updated;
      }
      return [...prev, { ...newItem, quantity: qtyToAdd }];
    });
    setIsCartOpen(true);
  };

  const addStarterKit = (variantId?: string, quantity = 1) => {
    const targetVariantId = variantId || selectedPattern || 'dinosaur';
    const variantObj =
      STARTER_KIT_PRODUCT.variants?.find((v) => v.id === targetVariantId) ||
      STARTER_KIT_PRODUCT.variants?.[0];

    addItem({
      productId: STARTER_KIT_PRODUCT.id,
      slug: STARTER_KIT_PRODUCT.slug,
      name: STARTER_KIT_PRODUCT.name,
      price: STARTER_KIT_PRODUCT.price,
      quantity,
      image: STARTER_KIT_PRODUCT.image,
      variantId: variantObj?.id || 'dinosaur',
      variantName: variantObj?.name || 'Dinosaur',
    });
  };

  const removeItem = (productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
    );
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.productId === productId && i.variantId === variantId) {
          return { ...i, quantity };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addStarterKit,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
        isCartOpen,
        setIsCartOpen,
        selectedPattern,
        setSelectedPattern,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
