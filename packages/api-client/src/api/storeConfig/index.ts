import { ApolloQueryResult } from '@apollo/client';
import { StoreConfigQueryFocus } from '../../types/GraphQL';
import storeConfig from './storeConfig';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<StoreConfigQueryFocus>> => client
  .query<StoreConfigQueryFocus>({
  query: storeConfig,
});
