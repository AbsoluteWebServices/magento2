import gql from 'graphql-tag';
import pageInfoFragment from '../../fragments/pageInfoFragment';
import productFragment from '../../fragments/productFragment';

export default gql`
  query productsList($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 10, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
    products(search: $search, filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
      aggregations {
        attribute_code
        label
        options {
          label
          value
          count
        }
      }
      items {
        ${productFragment}
      }
      page_info {
        ${pageInfoFragment}
      }
      total_count
    }
  }
`;
