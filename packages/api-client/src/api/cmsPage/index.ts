import { ApolloQueryResult } from '@apollo/client/core';
import { Logger } from '@absolute-web/vsf-core';
import { CmsPageQueryVariables, CmsPageQueryFocus } from '../../types/GraphQL';
import cmsPage from './cmsPage';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  identifier: string,
): Promise<ApolloQueryResult<CmsPageQueryFocus>> => {
  try {
    return await client
      .query<CmsPageQueryFocus, CmsPageQueryVariables>({
      query: cmsPage,
      variables: { identifier },
    });
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      Logger.debug(error);

      return {
        ...error,
        errors: error.graphQLErrors,
        data: null,
      };
    }
    Logger.error(error);
    throw error.networkError?.result || error;
  }
};
