import gql from 'graphql-tag';
import productDetailsFragment from '../../fragments/productDetailsFragment';

export default gql`
  query productDetailsPreview(
    $filter: ProductAttributeFilterInput
  ) {
    products(filter: $filter) {
      items {
        ${productDetailsFragment}
      }
    }
  }`;
