import { ApolloQueryResult } from '@apollo/client/core';
import { CustomerCartQueryFocus } from '../../types/GraphQL';
import customerCart from './customerCart';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<CustomerCartQueryFocus>> => client
  .query<CustomerCartQueryFocus>({
  query: customerCart,
});
