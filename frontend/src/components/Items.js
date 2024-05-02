import React, { useState, useEffect, Suspense, useTransition } from 'react';
import { Divider, Typography, Pagination, Stack } from '@mui/material';
import { SearchItemsQuery } from '../graphql/Items';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Container,  ItemList, Loader, LoaderOverlay } from "../helpers/styles";
import SearchBar from './SearchBar';
import { useLocalStorageContext } from '../context/LocalStorageContext';
import { useItemsContext } from '../context/ItemsContext';
import Item from './Item';

/**
 * Render the main component for the Items
 * @returns Items component
 * @param {function} addToCart
*/
function Items({ addToCart }) {
    const { items, setItems } = useItemsContext();
    const [searchValue, setSearch] = useState('');
    let [page, setPage] = useState(1);
    let [pageCount, setPageCount] = useState(1);
    const [isPending, startTransition] = useTransition();
    const { cart, setCart } = useLocalStorageContext('cart', []);

    /**
     * The number of items to display per page
     */
    const ITEMS_PER_PAGE = 20;
    let offset = (page - 1) * ITEMS_PER_PAGE;

    const data = useLazyLoadQuery(SearchItemsQuery, {searchValue, limit: ITEMS_PER_PAGE, offset: offset});

    /**
     * Update the items and page count when the data is fetched
     */
    useEffect(() => {
      if(data && data.searchItems) {
        setItems(data.searchItems.items.filter(item => item.quantity > 0));
        setPageCount(Math.ceil(data.searchItems.totalCount / ITEMS_PER_PAGE));
        setPage(page);
        updateCartMaxQuantity(data.searchItems.items);
      }
    }, [data, page, pageCount]);

    /**
     * update the cart with the maximum quantity of the items returned from the search
     * @param {*} items 
     */
    const updateCartMaxQuantity = (items) => {
      const newCart = cart.map(cartItem => {
        const item = items.find(item => item.id === cartItem.id);
        if(item) {
          return {...cartItem, quantity: item.quantity};
        }
        return cartItem;
      });
      setCart(newCart);
    };


    /**
     * trigger the search with the value from the search bar
     * @param {*} value 
     */
    function handleSearchTrigger(value) {
      setSearch(value);
    }

    /**
     * Change the page
     * @param {*} event 
     * @param {*} value 
     */
    const handleChange = (event, value) => {
      startTransition(() => {
        setPage(value);
      });
    }

    return (
      <Suspense fallback={<LoaderOverlay>
          <Loader />  
        </LoaderOverlay>
      }>
        <Container style={{flexDirection: 'column'}}>
          <SearchBar onChangeCallback={handleSearchTrigger} />
          <ItemList>
            <Typography variant="h4" style={{marginBottom: '20px'}}>Choose from our range of Farm Fresh Products</Typography>
            <div>
              {items.length > 0 ?  
                items.map((item, index) => (
                    <div key={index} style={{paddingRight: '20px'}}>
                      <Item item={item} onAddToCart={addToCart} />
                      <Divider />
                    </div>
                )) 
                : 
                <LoaderOverlay>
                  <Loader />
                </LoaderOverlay>
              }
            </div>

          </ItemList>
          <Stack spacing={2} style={{marginRight: '17%'}}>
            <Pagination 
              count={pageCount} 
              shape="rounded"
              size="large"
              page={page}
              onChange={handleChange}
              showFirstButton 
              showLastButton 
            />
          </Stack>
        </Container>
      </Suspense>
    );
  }
  
  export default Items;