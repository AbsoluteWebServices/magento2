import gql from 'graphql-tag';

export default gql`
mutation revokeCustomerToken{
  revokeCustomerToken {
    result
  }
  cacheId @client
}`;
