import { ApolloQueryResult } from '@apollo/client/core';
import gql from 'graphql-tag';
import { CustomQuery } from '@absolute-web/vsf-core';

import { Context } from '../../types/context';
import CustomerAvailableShippingMethods from './CustomerShippingMethods';
import {
  CustomerAvailableShippingMethodsQueryFocus,
} from '../../types/GraphQL';

export default async (
  context: Context,
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<CustomerAvailableShippingMethodsQueryFocus>> => {
  const { shippingMethods } = context.extendQuery(customQuery,
    {
      shippingMethods: {
        query: CustomerAvailableShippingMethods,
      },
    });

  try {
    return await context.client.query<CustomerAvailableShippingMethodsQueryFocus>({
      query: gql`${shippingMethods.query}`,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
