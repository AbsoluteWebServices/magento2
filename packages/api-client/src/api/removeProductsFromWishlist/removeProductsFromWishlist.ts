import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';
import PageInfoFragment from '../../fragments/pageInfoFragment';

export default gql`
  mutation removeProductsFromWishlist($id: ID!, $items: [ID!]!) {
    removeProductsFromWishlist(wishlistId: $id, wishlistItemsIds: $items) {
      wishlist {
        id
        items_count
        sharing_code
        items_v2 {
          items {
            id
            quantity
            description
            added_at
            product {
              ${productFragment}
            }
          }
          page_info {
            ${PageInfoFragment}
          }
        }
      }
    }
  }`;
