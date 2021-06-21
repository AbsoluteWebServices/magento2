import gql from 'graphql-tag';
import CartPricesData from '../../fragments/cartPricesFragment';

export default gql`
${CartPricesData}

mutation setShippingMethodsOnCart($input: SetShippingMethodsOnCartInput) {
  setShippingMethodsOnCart(input: $input) {
    cart {
      shipping_addresses {
        selected_shipping_method {
          carrier_code
          carrier_title
          method_code
          method_title
          amount {
            value
            currency
          }
        }
      }
      prices {
        ...CartPricesData
      }
    }
  }
}`;
