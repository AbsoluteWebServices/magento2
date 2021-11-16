import { ApolloQueryResult } from '@apollo/client';
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

  return context.client.query<CustomerAvailableShippingMethodsQueryFocus>({
    query: gql`${shippingMethods.query}`,
    fetchPolicy: 'no-cache',
  });
};
