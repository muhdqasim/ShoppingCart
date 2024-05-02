import React, { createContext, useState, useContext } from 'react';

const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItemsContext() {
  return useContext(ItemsContext);
}