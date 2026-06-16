"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  source: "aliexpress" | "amazon";
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  count: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QTY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      const items = existing
        ? state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const count = items.reduce((s, i) => s + i.quantity, 0);
      return { items, total, count };
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.id !== action.payload);
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const count = items.reduce((s, i) => s + i.quantity, 0);
      return { items, total, count };
    }
    case "UPDATE_QTY": {
      const items = state.items
        .map((i) =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        )
        .filter((i) => i.quantity > 0);
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const count = items.reduce((s, i) => s + i.quantity, 0);
      return { items, total, count };
    }
    case "CLEAR_CART":
      return { items: [], total: 0, count: 0 };
    case "LOAD_CART": {
      const items = action.payload;
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const count = items.reduce((s, i) => s + i.quantity, 0);
      return { items, total, count };
    }
    default:
      return state;
  }
}

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, count: 0 });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("luxeshop_cart");
      if (saved) dispatch({ type: "LOAD_CART", payload: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("luxeshop_cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, "quantity">) =>
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } });
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQty = (id: string, quantity: number) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
