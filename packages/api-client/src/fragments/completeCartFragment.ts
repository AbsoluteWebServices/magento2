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
    ... on ConfigurableCartItem {
      configurable_options {
        configurable_product_option_uid
        option_label
        configurable_product_option_value_uid
        value_label
      }
    }
    ... on SimpleCartItem {
      customizable_options {
        customizable_option_uid
        label
        values {
          customizable_option_value_uid
          value
        }
      }
    }
    ... on BundleCartItem {
      bundle_options {
        uid
        label
        type
        values {
          id
          label
          price
          quantity
        }
      }
    }
  }
  item_groups {
    group_id
    group_type
    item_uids
    additional_data {
      location_code
      pickup_date
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
