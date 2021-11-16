import { ApolloQueryResult } from '@apollo/client';
import { CmsPageQueryVariables, CmsPageQueryFocus } from '../../types/GraphQL';
import cmsPage from './cmsPage';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  identifier: string,
): Promise<ApolloQueryResult<CmsPageQueryFocus>> => client
  .query<CmsPageQueryFocus, CmsPageQueryVariables>({
  query: cmsPage,
  variables: { identifier },
  fetchPolicy: 'no-cache',
});
