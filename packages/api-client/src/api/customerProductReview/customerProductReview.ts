import gql from 'graphql-tag';
import PageInfoFragment from '../../fragments/pageInfoFragment';

export default gql`
query customerProductReview($pageSize: Int = 20, $currentPage: Int = 1) {
  customer {
      reviews(pageSize: $pageSize, currentPage: $currentPage) {
        items {
          average_rating
          ratings_breakdown {
            name
            value
          }
          nickname
          summary
          text
          created_at
          product {
            name
            uid
          }
        }
        page_info {
          ${PageInfoFragment}
        }
      }
  }
}`;
