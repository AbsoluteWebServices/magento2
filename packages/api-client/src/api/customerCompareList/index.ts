import { ApolloQueryResult } from '@apollo/client/core';
import { CustomerCompareListQueryFocus } from '../../types/GraphQL';
import customerCompareList from './customerCompareList';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
): Promise<ApolloQueryResult<CustomerCompareListQueryFocus>> => client
  .query<CustomerCompareListQueryFocus>({
  query: customerCompareList,
  fetchPolicy: 'no-cache',
});
