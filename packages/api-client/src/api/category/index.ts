import { ApolloQueryResult } from '@apollo/client/core';
import { CategoryQueryFocus, CategorySearchQueryVariables, StagingPreviewParams } from '../../types/GraphQL';
import category from './category';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: CategorySearchQueryVariables,
  preview?: StagingPreviewParams,
): Promise<ApolloQueryResult<CategoryQueryFocus>> => client
  .query<CategoryQueryFocus, CategorySearchQueryVariables>({
  query: category,
  variables: { ...params },
  fetchPolicy: 'cache-first',
  ...(preview ? {
    context: {
      headers: {
        Authorization: `Bearer ${preview.accessToken}`,
        'Preview-Version': preview.version,
      },
    },
  } : {}),
});
