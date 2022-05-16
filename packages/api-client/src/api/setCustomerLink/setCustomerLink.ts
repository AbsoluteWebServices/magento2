import gql from 'graphql-tag';

export default gql`
mutation setCustomerLink($buyerToken: String!, $password: String!) {
  setCustomerLink(buyerToken: $buyerToken, password: $password) {
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
