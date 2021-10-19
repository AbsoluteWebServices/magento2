import { ApolloQueryResult } from '@apollo/client/core';
import { CustomerCartQuery } from '../../types/GraphQL';
import customerCart from './customerCart';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<CustomerCartQuery>> => client
  .query<CustomerCartQuery>({
  query: customerCart,
});
