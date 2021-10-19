import { ApolloQueryResult } from '@apollo/client/core';
import { UrlResolverQuery, UrlResolverQueryVariables } from '../../types/GraphQL';
import urlResolver from './urlResolver';
import { Context } from '../../types/context';

export default async ({ client }: Context, url: string): Promise<ApolloQueryResult<UrlResolverQuery>> => client
  .query<UrlResolverQuery, UrlResolverQueryVariables>({
  query: urlResolver,
  variables: { url },
});
