import { ApolloQueryResult } from 'apollo-client';
import { CategoryQuery, CategorySearchQueryVariables } from '../../types/GraphQL';
import category from './category';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: CategorySearchQueryVariables,
): Promise<ApolloQueryResult<CategoryQuery>> => client
  .query<CategoryQuery, CategorySearchQueryVariables>({
  query: category,
  variables: { ...params },
  fetchPolicy: 'cache-first',
});
