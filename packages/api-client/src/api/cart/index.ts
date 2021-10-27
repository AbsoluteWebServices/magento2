import { ApolloQueryResult } from '@apollo/client';
import { CartQueryFocus, CartQueryVariables } from '../../types/GraphQL';
import cart from './cart';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  cartId: string,
): Promise<ApolloQueryResult<CartQueryFocus>> => client
  .query<CartQueryFocus, CartQueryVariables>({
  query: cart,
  variables: { cartId },
  fetchPolicy: 'no-cache',
  errorPolicy: 'all',
});
