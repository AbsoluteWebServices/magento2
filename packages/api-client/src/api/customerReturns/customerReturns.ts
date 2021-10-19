import gql from 'graphql-tag';
import CustomerReturnFragment from '../../fragments/customerReturnFragment';
import PageInfoFragment from '../../fragments/pageInfoFragment';

export default gql`
query customerReturns($currentPage: Int = 1, $pageSize: Int = 20) {
  customer {
    returns(currentPage: $currentPage, pageSize: $pageSize) {
      items {
        ${CustomerReturnFragment}
      }
      page_info {
        ${PageInfoFragment}
      }
      total_count
    }
  }
}`;
