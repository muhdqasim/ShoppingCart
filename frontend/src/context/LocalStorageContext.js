// context/LocalStorageContext.js
import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const LocalStorageContext = createContext();

export function LocalStorageProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', []);

  return (
    <LocalStorageContext.Provider value={{ cart, setCart }}>
      {children}
    </LocalStorageContext.Provider>
  );
}

export function useLocalStorageContext() {
  return useContext(LocalStorageContext);
}