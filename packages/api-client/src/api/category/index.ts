import { ApolloQueryResult } from '@apollo/client';
import { CategoryQueryFocus, CategorySearchQueryVariables } from '../../types/GraphQL';
import category from './category';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: CategorySearchQueryVariables,
): Promise<ApolloQueryResult<CategoryQueryFocus>> => client
  .query<CategoryQueryFocus, CategorySearchQueryVariables>({
  query: category,
  variables: { ...params },
  fetchPolicy: 'cache-first',
});
