import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { FetchPolicy } from 'apollo-client/core/watchQueryOptions';
import { Context } from '../../types/context';
import { BaseQuery } from '../../types/GraphQL';

export default async <QUERY = any, QUERY_VARIABLES = any>(
  { client }: Context,
  {
    query,
    queryVariables,
    fetchPolicy,
  }: {
    query: QUERY,
    queryVariables?: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
  },
): Promise<ApolloQueryResult<QUERY & BaseQuery>> => client
  .query<QUERY & BaseQuery, QUERY_VARIABLES>({
  query: gql`${query}`,
  variables: { ...queryVariables },
  fetchPolicy: fetchPolicy || 'no-cache',
});
