import { useState, useEffect } from 'react';
import { commitMutation, useRelayEnvironment } from 'react-relay/hooks';
import { ShoppingListAddItemsToCartMutation } from '../graphql/ShoppingList';

function useLocalStorage(key, initialValue) {
  const environment = useRelayEnvironment();

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        const cart = JSON.parse(window.localStorage.getItem('cart')) || [];
        const cartItems = cart.map(item => ({id: item.id, quantity: item.cartQuantity}));
        commitMutation(
          environment,
          {
            mutation: ShoppingListAddItemsToCartMutation,
            variables: {
              items: cartItems,
            },
            onCompleted: (response, errors) => {
              console.log(response);
            },
            onError: err => console.error(err),
          },
        );
      } catch (error) {
        console.log(error);
      }
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return [storedValue, setValue];
}

export default useLocalStorage;