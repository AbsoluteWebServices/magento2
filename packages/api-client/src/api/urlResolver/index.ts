import { ApolloQueryResult } from '@apollo/client/core';
import { UrlResolverQueryFocus, UrlResolverQueryVariables } from '../../types/GraphQL';
import urlResolver from './urlResolver';
import { Context } from '../../types/context';

export default async ({ client }: Context, url: string): Promise<ApolloQueryResult<UrlResolverQueryFocus>> => client
  .query<UrlResolverQueryFocus, UrlResolverQueryVariables>({
  query: urlResolver,
  variables: { url },
});
