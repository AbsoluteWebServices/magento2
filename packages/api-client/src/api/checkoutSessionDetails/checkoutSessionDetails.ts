import gql from 'graphql-tag';

export default gql`
query checkoutSessionDetails($amazonSessionId: String!, $queryTypes: [String!]) {
  checkoutSessionDetails(amazonSessionId: $amazonSessionId, queryTypes: $queryTypes) {
    response
  }
}
`;
