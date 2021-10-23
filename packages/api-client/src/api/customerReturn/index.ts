import { ApolloQueryResult } from '@apollo/client/core';
import { CustomerReturnQueryFocus, CustomerReturnQueryVariables } from '../../types/GraphQL';
import customerReturn from './customerReturn';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  returnParams: CustomerReturnQueryVariables,
): Promise<ApolloQueryResult<CustomerReturnQueryFocus>> => client
  .query<CustomerReturnQueryFocus, CustomerReturnQueryVariables>({
  query: customerReturn,
  variables: returnParams,
  fetchPolicy: 'no-cache',
});
