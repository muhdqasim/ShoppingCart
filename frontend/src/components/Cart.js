import React, {useState} from 'react';
import { List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Container, CartStyle, ClearCartButton } from "../helpers/styles";
import { useLocalStorageContext } from '../context/LocalStorageContext';
import Error from './Error';


/**
 * @returns Cart component
 */
const Cart = () => {
    const { cart, setCart } = useLocalStorageContext('cart', []);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);

    /**
     * Clear the cart
     */
    function clearCart() {
        setCart([]);
    }
    
    /**
     * Increase the quantity of an item in the cart
     * @param {number} index 
     * @returns 
     */
    function increaseQuantity(index) {
        const item = cart[index];
        if(item.cartQuantity + 1 > item.quantity) {
            setErrorMessage('You cannot add more items than the available quantity.');
            setOpen(true);
            return;
        }
        const newCart = [...cart];
        newCart[index].cartQuantity++;
        setCart(newCart);
    }

    /**
     * Decrease the quantity of an item in the cart
     * @param {number} index 
     */
    function decreaseQuantity(index) {
        const newCart = [...cart];
        if (newCart[index].cartQuantity > 0) {
            newCart[index].cartQuantity--;
        }
        else {
            newCart.splice(index, 1);
        }
        setCart(newCart);
    }

    /**
     * Close the error message
     */
    const handleClose = () => {
        setOpen(false);
        setErrorMessage('');
      };

    return (
        <Container>
            <CartStyle>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
                    <Typography variant="h4" style={{textAlign: 'center'}}>Cart</Typography>
                    {cart.length > 0 && <ClearCartButton onClick={clearCart}>Clear Cart</ClearCartButton> }
                </div>
                <Error errorMessage={errorMessage} open={open} handleClose={handleClose} />
                <div style={{overflow: 'auto'}}>
                    <List>
                        {cart.length > 0 ? 
                            cart.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={item.name} secondary={item.description}/>
                                    <div style={{display: 'flex'}}>
                                        <IconButton onClick={() => increaseQuantity(index)}>
                                            <AddIcon />
                                        </IconButton>
                                        <Typography style={{alignContent: 'center'}} variant="body1">{item.cartQuantity}</Typography>
                                        <IconButton onClick={() => decreaseQuantity(index)}>
                                            <RemoveIcon />
                                        </IconButton>
                                    </div>
                                </ListItem>
                            ))
                            : 
                            <Typography variant="h6" style={{textAlign: 'center', paddingTop: '10px'}}>No items to dispaly</Typography>
                        }
                        {cart.length > 0 &&
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <Typography variant="h6" style={{textAlign: 'center', paddingTop: '10px'}}>Total: </Typography>
                            <Typography variant="h6" style={{textAlign: 'center', paddingTop: '10px'}}>${cart.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0).toFixed(2)}</Typography>
                        </div> 
                        }
                    </List>
                </div>
            </CartStyle>
        </Container>
    );
}

export default Cart;