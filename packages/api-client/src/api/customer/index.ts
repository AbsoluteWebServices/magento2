import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { CustomerQueryFocus } from '../../types/GraphQL';
import customer from './customer';
import { Context } from '../../types/context';

export default async (
  context: Context,
  customQuery: CustomQuery = { customer: 'customer' },
): Promise<ApolloQueryResult<CustomerQueryFocus>> => {
  const { customer: customerGQL } = context.extendQuery(
    customQuery,
    {
      customer: {
        query: customer,
      },
    },
  );

  return context.client.query<CustomerQueryFocus>({
    query: customerGQL.query,
  });
};
