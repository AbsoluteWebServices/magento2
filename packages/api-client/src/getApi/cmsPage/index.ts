import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery, Logger } from '@absolute-web/vsf-core';
import { CmsPageQueryVariables, CmsPageQuery, CachedQuery } from '../../types/GraphQL';
import cmsPage from './cmsPage';
import { Context } from '../../types/context';

export default async (
  context: Context,
  identifier: string,
  customQuery: CustomQuery = { cmsPage: 'cmsPage' },
): Promise<ApolloQueryResult<CachedQuery<CmsPageQuery>>> => {
  try {
    const { cmsPage: cmsPageGQL } = context.extendQuery(
      customQuery,
      {
        cmsPage: {
          query: cmsPage,
          variables: { identifier },
        },
      },
    );

    return await context.client
      .query<CachedQuery<CmsPageQuery>, CmsPageQueryVariables>({
      query: cmsPageGQL.query,
      variables: cmsPageGQL.variables,
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
