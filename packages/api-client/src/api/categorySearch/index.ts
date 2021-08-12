import { ApolloQueryResult } from 'apollo-client';
import { CategorySearchQueryFocus, CategorySearchQueryVariables } from '../../types/GraphQL';
import categorySearch from './categorySearch';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: CategorySearchQueryVariables,
): Promise<ApolloQueryResult<CategorySearchQueryFocus>> => client
  .query<CategorySearchQueryFocus, CategorySearchQueryVariables>({
  query: categorySearch,
  variables: { ...params },
  fetchPolicy: 'cache-first',
});
