import gql from 'graphql-tag';

export default gql`
query customerReturns($currentPage: Int = 1, $pageSize: Int = 20) {
  customer {
    returns(currentPage: $currentPage, pageSize: $pageSize) {
      items {
        uid
        number
        created_at
        status
        order {
          number
        }
        items {
          uid
          order_item {
            product_sku
            product_name
          }
          request_quantity
          quantity
          sellercloud_resolutions
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
}`;
