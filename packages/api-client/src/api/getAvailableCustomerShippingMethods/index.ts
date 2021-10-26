import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';

import { Context } from '../../types/context';
import CustomerAvailableShippingMethods from './CustomerShippingMethods';
import {
  CustomerAvailableShippingMethodsQuery,
} from '../../types/GraphQL';

export default async (
  context: Context,
  customQuery: CustomQuery = { shippingMethods: 'shippingMethods' },
): Promise<ApolloQueryResult<CustomerAvailableShippingMethodsQuery>> => {
  const { shippingMethods } = context.extendQuery(
    customQuery,
    {
      shippingMethods: {
        query: CustomerAvailableShippingMethods,
      },
    },
  );

  try {
    return await context.client.query<CustomerAvailableShippingMethodsQuery>({
      query: shippingMethods.query,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
