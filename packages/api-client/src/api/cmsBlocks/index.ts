import { ApolloQueryResult } from '@apollo/client';
import { CmsBlockQueryFocus, CmsBlockQueryVariables } from '../../types/GraphQL';
import cmsBlocks from './cmsBlocks';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  identifiers: string,
): Promise<ApolloQueryResult<CmsBlockQueryFocus>> => client
  .query<CmsBlockQueryFocus, CmsBlockQueryVariables>({
  query: cmsBlocks,
  variables: { identifiers },
  fetchPolicy: 'no-cache',
});
