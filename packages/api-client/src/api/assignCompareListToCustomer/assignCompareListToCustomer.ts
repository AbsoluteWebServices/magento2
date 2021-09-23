import gql from 'graphql-tag';

export default gql`
mutation assignCompareListToCustomer($uid: ID!) {
  assignCompareListToCustomer(uid: $uid) {
    result
    compare_list {
      uid
      item_count
      attributes {
        code
        label
      }
      items {
        uid
        attributes {
          code
          value
        }
        product {
          id
          uid
          sku
          manufacturer_sku
          name
          stock_status
          only_x_left_in_stock
          rating_summary
          thumbnail {
            url
            position
            disabled
            label
          }
          url_key
          url_rewrites {
            url
            parameters {
              name
              value
            }
          }
          price_range {
            maximum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
            minimum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
          }
          categories {
            id
            uid
            name
            url_suffix
            url_path
            breadcrumbs {
              category_name,
              category_url_path
            }
          }
          review_count
          reviews {
            items {
              average_rating
              ratings_breakdown {
                name
                value
              }
            }
          }
          short_description {
            html
          }
        }
      }
    }
  }
}`;
