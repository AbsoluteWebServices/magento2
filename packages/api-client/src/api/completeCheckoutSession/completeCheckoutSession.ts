import gql from 'graphql-tag';

export default gql`
mutation completeCheckoutSession($cartId: String!, $amazonSessionId: String!) {
  completeCheckoutSession(cartId: $cartId, amazonSessionId: $amazonSessionId) {
    increment_id
    message
    success
  }
}
`;
