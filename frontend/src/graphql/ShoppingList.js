import graphql from "babel-plugin-relay/macro";

export const ShoppingListQuery = graphql`
  query ShoppingListQuery {
    shoppingLists {
      id
      name
    }
  }
`;

export const ShoppingListAddItemsToCartMutation = graphql`
  mutation ShoppingListAddItemsToCartMutation($items: [CartItemInput]!) {
    addItemsToCart(items: $items)
  
  }
`;

