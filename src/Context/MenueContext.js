import { createContext, useState } from "react";

export const Menue = createContext({});

export default function MenueProvider({ children }) {
  const [isOpen, setIsOpen] = useState(
    window.innerWidth <= "768" ? false : true,
  );

  return (
    <Menue.Provider value={{ isOpen, setIsOpen }}>{children}</Menue.Provider>
  );
}
