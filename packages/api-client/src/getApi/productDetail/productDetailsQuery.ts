import gql from 'graphql-tag';
import productDetailsFragment from '../../fragments/productDetailsFragment';

export default gql`
  query productDetails(
    $filter: ProductAttributeFilterInput,
    $pageSize: Int = 10,
    $currentPage: Int = 1,
    $sort: ProductAttributeSortInput
  ) {
    products(filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
      items {
        ${productDetailsFragment}
      }
      aggregations {
        attribute_code
        label
        options {
          label
          value
        }
      }
    }
    cacheTags @client
  }
`;
