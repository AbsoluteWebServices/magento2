import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';

export default gql`
  query productsList($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 10, $currentPage: Int = 1, $sort: ProductAttributeSortInput, $withAggregations: Boolean = false) {
    products(search: $search, filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
      aggregations @include(if: $withAggregations) {
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
        current_page
        page_size
        total_pages
      }
      total_count
    }
    cacheTags @client
  }
`;
