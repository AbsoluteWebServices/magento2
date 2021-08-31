import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';

export default gql`
  mutation addBundleProductsToCart($input: AddBundleProductsToCartInput) {
    addBundleProductsToCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
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
          uid
          product {
            ${productFragment}
          }
          prices {
            row_total {
              value
            }
            row_total_including_tax {
              value
            }
            total_item_discount {
              value
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
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
          mp_free_gifts {
            is_free_gift
            rule_id
            free_gift_message
            allow_notice
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
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
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
        selected_payment_method {
          code
          title
        }
      }
    }
  }`;
