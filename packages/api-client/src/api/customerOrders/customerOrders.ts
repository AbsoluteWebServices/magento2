import gql from 'graphql-tag';

export default gql`
  query customerOrders($currentPage: Int = 1, $filter: CustomerOrdersFilterInput = {}, $pageSize: Int = 10) {
    customer {
      orders(currentPage: $currentPage, filter: $filter, pageSize: $pageSize) {
        items {
          order_number
          id
          created_at
          grand_total
          total {
            discounts {
              amount {
                currency
                value
              }
              label
            }
            base_grand_total {
              currency
              value
            }
            shipping_handling {
              amount_excluding_tax {
                currency
                value
              }
              amount_including_tax {
                currency
                value
              }
              discounts {
                amount {
                  currency
                  value
                }
              }
              taxes {
                amount{
                  currency
                  value
                }
                rate
                title
              }
              total_amount {
                currency
                value
              }
            }
            subtotal {
              currency
              value
            }
            taxes {
              amount {
                currency
                value
              }
              rate
              title
            }
            total_shipping {
              currency
              value
            }
            total_tax {
              currency
              value
            }
            total_giftcard {
              currency
              value
            }
          }
          status
          comments {
            message
            timestamp
          }
          invoices {
            comments {
              message
              timestamp
            }
            id
            items {
              discounts {
                amount {
                  currency
                  value
                }
                label
              }
              id
              product_name
              product_sale_price {
                currency
                value
              }
              product_sku
              quantity_invoiced
            }
            number
            total {
              discounts {
                amount {
                  currency
                  value
                }
                label
              }
              base_grand_total {
                currency
                value
              }
              shipping_handling {
                amount_excluding_tax {
                  currency
                  value
                }
                amount_including_tax {
                  currency
                  value
                }
                discounts {
                  amount {
                    currency
                    value
                  }
                }
                taxes {
                  amount{
                    currency
                    value
                  }
                  rate
                  title
                }
                total_amount {
                  currency
                  value
                }
              }
              subtotal {
                currency
                value
              }
              taxes {
                amount {
                  currency
                  value
                }
                rate
                title
              }
              total_shipping {
                currency
                value
              }
              total_tax {
                currency
                value
              }
            }
          }
          items {
            discounts {
              amount {
                currency
                value
              }
              label
            }
            entered_options {
              label
              value
            }
            id
            product_name
            product_sale_price {
              currency
              value
            }
            product_sku
            product_type
            product_url_key
            quantity_canceled
            quantity_invoiced
            quantity_ordered
            quantity_refunded
            quantity_returned
            quantity_shipped
            selected_options {
              label
              value
            }
            status
            focus_product_image_url {
              label
              url
            }
            focus_product_thumbnail_url {
              label
              url
            }
            focus_product_small_image_url {
              label
              url
            }
          }
          payment_methods {
            name
            type
            card_data {
              card_type
              card_last_4
            }
            additional_data {
              name
              value
            }
          }
          shipments {
            comments {
              message
              timestamp
            }
            id
            number
            tracking {
              carrier
              number
              title
            }
            items {
              id
              product_name
              product_sale_price {
                currency
                value
              }
              product_sku
              quantity_shipped
            }
          }
          shipping_address {
            city
            country_code
            firstname
            lastname
            postcode
            prefix
            region
            street
            suffix
            telephone
          }
          shipping_method
          billing_address {
            city
            country_code
            firstname
            lastname
            postcode
            prefix
            region
            street
            suffix
            telephone
          }
          focus_can_create_rma {
            result
            reason
          }
          focus_shipping_additional_data
        }
        page_info {
            current_page
            total_pages
            page_size
        }
        total_count
      }
    }
  }
`;
