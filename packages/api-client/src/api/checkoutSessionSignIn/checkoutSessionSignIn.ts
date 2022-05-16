import gql from 'graphql-tag';

export default gql`
query checkoutSessionSignIn($buyerToken: String!) {
  checkoutSessionSignIn(buyerToken: $buyerToken) {
    customer_id
    customer_email
    customer_firstname
    customer_last
    customer_bearer_token
    message
    success
  }
}
`;
