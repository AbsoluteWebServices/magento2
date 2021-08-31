import gql from 'graphql-tag';

export default gql`
query productsFilters(
  $search: String = ""
  $filter: ProductAttributeFilterInput
  $pageSize: Int = 1
  $currentPage: Int = 1
  $sort: ProductAttributeSortInput
) {
  products(
    search: $search
    filter: $filter
    pageSize: $pageSize
    currentPage: $currentPage
    sort: $sort
  ) {
    aggregations {
      attribute_code
      label
      count
      options {
        label
        value
        count
      }
    }
  }
}`;
