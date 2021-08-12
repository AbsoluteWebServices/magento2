import { ApolloQueryResult } from 'apollo-client';
import { WishlistQueryFocus, WishlistQueryVariables } from '../../types/GraphQL';
import wishlist from './wishlist';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  queryParams: WishlistQueryVariables,
): Promise<ApolloQueryResult<WishlistQueryFocus>> => client
  .query<WishlistQueryFocus, WishlistQueryVariables>({
  query: wishlist,
  fetchPolicy: 'no-cache',
  variables: queryParams,
});
