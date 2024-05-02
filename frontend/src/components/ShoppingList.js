import React from 'react';
import { Container, Divider } from '@mui/material';
import { Cart, Items } from './';
import { useLocalStorageContext } from '../context/LocalStorageContext';


/**
 * Render the main component for the ShoppingList
 * @returns ShoppingList component
 */
const ShoppingList = () => {
  const { cart, setCart } = useLocalStorageContext('cart', []);

  /**
   * Add an item to the cart or increase the quantity if the item is already in the cart
   * @param {*} item 
   */
  const handleAddToCart = item => { 
    setCart(prevCart => {
      const itemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      if (itemIndex === -1) {
        return [...prevCart, { ...item, cartQuantity: 1 }];
      }
      const newCart = [...prevCart];
      if(newCart[itemIndex].cartQuantity + 1 > newCart[itemIndex].quantity) {
        return newCart;
      }
      newCart[itemIndex].cartQuantity++;
      return newCart;
    });
  }

  return (
    <Container style={{marginRight: '10%'}}>
      <Items addToCart={handleAddToCart} />
      <Divider />
      <Cart cartItems={cart} />
    </Container>
  );
}

export default ShoppingList;