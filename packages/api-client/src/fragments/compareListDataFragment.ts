import gql from 'graphql-tag';
import ProductCategoriesData from './productCategoriesFragment';
import ProductPriceRangeData from './productPriceRangeFragment';
import ProductThumbnailData from './productThumbnailFragment';
import ProductUrlFragmentData from './productUrlFragment';

export default gql`
  ${ProductCategoriesData}
  ${ProductPriceRangeData}
  ${ProductThumbnailData}
  ${ProductUrlFragmentData}

  fragment CompareListData on CompareList {
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
      ...on ConfigurableProduct {
        configurable_options {
          attribute_code
          attribute_uid
          label
          position
          uid
          use_default
          values {
            label
            swatch_data {
              value
            }
            uid
          }
        }
      }
      ... on BundleProduct {
        items {
          sku
          title
          options {
            uid
            quantity
            product {
              uid
              sku
              name
              ...ProductPriceRangeData
            }
          }
        }
      }
      id
      uid
      __typename
      sku
      manufacturer_sku
      name
      stock_status
      only_x_left_in_stock
      rating_summary
      ...ProductCategoriesData
      ...ProductPriceRangeData
      ...ProductThumbnailData
      ...ProductUrlFragmentData
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
    }
  }
}`;
