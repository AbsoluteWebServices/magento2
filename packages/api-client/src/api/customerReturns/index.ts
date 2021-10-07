import { ApolloQueryResult } from 'apollo-client';
import { CustomerReturnsQueryFocus, CustomerReturnsQueryVariables } from '../../types/GraphQL';
import customerReturns from './customerReturns';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  returnParams: CustomerReturnsQueryVariables,
): Promise<ApolloQueryResult<CustomerReturnsQueryFocus>> => client
  .query<CustomerReturnsQueryFocus, CustomerReturnsQueryVariables>({
  query: customerReturns,
  variables: returnParams,
  fetchPolicy: 'no-cache',
});
