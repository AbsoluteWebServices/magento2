import gql from 'graphql-tag';

export default gql`
query GuestAvailableShippingMethods($cartId: String!) {
  cart(cart_id:$cartId) {
    shipping_addresses {
      available_shipping_methods {
        amount {
          currency
          value
        }
        available
        carrier_code
        carrier_title
        error_message
        method_code
        method_title
        price_excl_tax {
          currency
          value
        }
        price_incl_tax {
          currency
          value
        }
        additional_data
        description
      }
    }
  }
}`;
