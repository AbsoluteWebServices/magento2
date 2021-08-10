import gql from 'graphql-tag';
import CartProductData from './cartProductFragment';
import CartAddress from './cartAddressFragment';

export default gql`
  ${CartAddress}
  ${CartProductData}
  fragment CompleteCartData on Cart {
  id
  email
  is_virtual
  applied_coupons {
    code
  }
  applied_gift_cards {
    applied_balance {
      value
      currency
    }
    code
    current_balance {
      value
      currency
    }
    expiration_date
  }
  prices {
    subtotal_excluding_tax {
      value
    },
    subtotal_including_tax {
      value
    },
    applied_taxes {
      amount {
        value
      },
      label
    }
    discounts {
      amount {
        value
      },
      label
    }
    grand_total {
      value
    }
  }
  items {
    ...CartProductData
    ... on ConfigurableCartItem{
      configurable_options {
        configurable_product_option_uid
        option_label
        configurable_product_option_value_uid
        value_label
      }
    }
  }
  total_quantity
  shipping_addresses {
    ...CartAddress
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
  billing_address {
    ...CartAddress
  }
}`;
