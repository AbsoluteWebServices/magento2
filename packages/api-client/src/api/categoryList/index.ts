import { ApolloQueryResult } from '@apollo/client';
import { CategoryListQueryFocus, CategoryListQueryVariables } from '../../types/GraphQL';
import categoryList from './categoryList';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: CategoryListQueryVariables,
): Promise<ApolloQueryResult<CategoryListQueryFocus>> => client
  .query<CategoryListQueryFocus, CategoryListQueryVariables>({
  query: categoryList,
  variables: { ...params },
  fetchPolicy: 'cache-first',
});
