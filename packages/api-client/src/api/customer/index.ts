import { ApolloQueryResult } from '@apollo/client/core';
import { CustomerQueryFocus } from '../../types/GraphQL';
import customer from './customer';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<CustomerQueryFocus>> => client
  .query<CustomerQueryFocus>({
  query: customer,
});
