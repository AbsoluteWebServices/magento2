import { ApolloQueryResult } from '@apollo/client';
import { CustomerOrdersQueryFocus, CustomerOrdersQueryVariables } from '../../types/GraphQL';
import customerOrders from './customerOrders';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  orderParams: CustomerOrdersQueryVariables,
): Promise<ApolloQueryResult<CustomerOrdersQueryFocus>> => client
  .query<CustomerOrdersQueryFocus, CustomerOrdersQueryVariables>({
  query: customerOrders,
  variables: orderParams,
  fetchPolicy: 'no-cache',
});
