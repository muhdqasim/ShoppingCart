import graphql from "babel-plugin-relay/macro";

export const ItemsQuery = graphql`
  query ItemsQuery {
    items {
      id
      name
      description
      quantity
      checked
      price
    }
  }
`;

export const SearchItemsQuery = graphql`
  query ItemsSearchQuery($searchValue: String!, $limit: Int!, $offset: Int!) {
    searchItems(searchValue: $searchValue, limit: $limit, offset: $offset) {
      items {
        id
        name
        description
        quantity
        checked
        price
      }
      totalCount
    }
  }
`;