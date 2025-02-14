import { ApolloQueryResult } from '@apollo/client/core';
import {
  CategoryQuery, CategorySearchQueryVariables, CachedQuery, StagingPreviewQueryVariables,
} from '../../types/GraphQL';
import category from './category';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  {
    filters,
    preview,
  }: StagingPreviewQueryVariables<CategorySearchQueryVariables>,
): Promise<ApolloQueryResult<CachedQuery<CategoryQuery>>> => {
  const result = await client
    .query<CachedQuery<CategoryQuery>, CategorySearchQueryVariables>({
    query: category,
    variables: { filters },
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

  if (!result.data.categoryList?.length) {
    result.data.cacheTags = 'empty';
  }

  return result;
}
