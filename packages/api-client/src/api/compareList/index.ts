import { ApolloQueryResult } from '@apollo/client/core';
import { CompareListQueryFocus, QueryCompareListArgs } from '../../types/GraphQL';
import compareList from './compareList';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  uid: string,
): Promise<ApolloQueryResult<CompareListQueryFocus>> => client
  .query<CompareListQueryFocus, QueryCompareListArgs>({
  query: compareList,
  fetchPolicy: 'no-cache',
  variables: { uid },
});
