import gql from 'graphql-tag';

export default gql`
mutation updateCheckoutSession($cartId: String!, $amazonSessionId: String!) {
  updateCheckoutSession(cartId: $cartId, amazonSessionId: $amazonSessionId) {
    redirectUrl
  }
}
`;
