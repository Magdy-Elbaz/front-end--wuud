import { createContext, useState } from "react";

export const CartContext = createContext({});

export default function CartProvider({ children }) {
  const [isChange, setIsChange] = useState(false);

  return (
    <CartContext.Provider value={{ isChange, setIsChange }}>
      {children}
    </CartContext.Provider>
  );
}
