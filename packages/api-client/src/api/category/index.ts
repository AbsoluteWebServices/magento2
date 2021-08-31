import { ApolloQueryResult } from 'apollo-client';
import { CategoryQuery, CategoryQueryVariables } from '../../types/GraphQL';
import category from './category';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: CategoryQueryVariables,
): Promise<ApolloQueryResult<CategoryQuery>> => client
  .query<CategoryQuery, CategoryQueryVariables>({
  query: category,
  variables: { ...params },
  fetchPolicy: 'cache-first',
});
