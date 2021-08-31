import gql from 'graphql-tag';

export default gql`fragment CategoryChildData on CategoryTree {
  level
  name
  position
  product_count
  uid
}`;
