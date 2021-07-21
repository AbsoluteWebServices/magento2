import { ApolloQueryResult } from 'apollo-client';
import { CategoryQuery, CategoryQueryVariables } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: CategoryQueryVariables,
): Promise<ApolloQueryResult<CategoryQuery>> => client
  .query<CategoryQuery, CategoryQueryVariables>({
  query,
  variables: { ...params },
  fetchPolicy: 'cache-first',
});
