import gql from 'graphql-tag';
import customerFragment from '../../fragments/customerFragment';

export default gql`
  mutation createCustomer($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        ${customerFragment}
      }
    }
  }`;
