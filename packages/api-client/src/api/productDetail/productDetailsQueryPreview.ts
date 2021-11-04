import gql from 'graphql-tag';
import productDetailsFragment from '../../fragments/productDetailsFragment';

export default gql`
  query productDetailsPreview(
    $filter: ProductAttributeFilterInput,
    $configurations: [ID!]
  ) {
    products(filter: $filter) {
      items {
        ${productDetailsFragment}
      }
    }
  }
`;
