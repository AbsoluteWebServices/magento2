import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';

export default gql`
  query productsList($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 10, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
    products(search: $search, filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
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
