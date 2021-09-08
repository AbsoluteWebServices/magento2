import gql from 'graphql-tag';
import ProductThumbnailData from './productThumbnailFragment';
import ProductPriceRangeData from './productPriceRangeFragment';
import ProductUrlFragmentData from './productUrlFragment';
import ProductCategoriesData from './productCategoriesFragment';
import ConfigurableProductOptionsData from './configurableProductOptionsFragment';

export default gql`
  ${ProductThumbnailData}
  ${ProductPriceRangeData}
  ${ProductUrlFragmentData}
  ${ProductCategoriesData}
  ${ConfigurableProductOptionsData}

fragment ProductData on ProductInterface {
  id
  uid
  __typename
  sku
  manufacturer_sku
  name
  stock_status
  only_x_left_in_stock
  rating_summary
  short_description {
    html
  }
  ...ProductThumbnailData
  ...ProductPriceRangeData
  ...ProductUrlFragmentData
  ...ProductCategoriesData
  ...ConfigurableProductOptionsData
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
  itar_compliance
  required_age_verification
}`;
