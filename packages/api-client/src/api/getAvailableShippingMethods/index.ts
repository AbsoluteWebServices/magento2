import { ApolloQueryResult } from '@apollo/client/core';
import gql from 'graphql-tag';
import { CustomQuery } from '@absolute-web/vsf-core';
import { Context } from '../../types/context';
import GuestAvailableShippingMethods from './GuestAvailableShippingMethods';
import {
  GuestAvailableShippingMethodsQueryFocus,
  GuestAvailableShippingMethodsQueryVariables,
} from '../../types/GraphQL';

export default async (
  context: Context,
  params: {
    cartId: string;
  },
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<GuestAvailableShippingMethodsQueryFocus>> => {
  const defaultVariables = params ? {
    cart_id: params.cartId,
  } : {};

  const { shippingMethods } = context.extendQuery(customQuery,
    {
      shippingMethods: {
        query: GuestAvailableShippingMethods,
        variables: defaultVariables,
      },
    });

  try {
    return await context.client.query<GuestAvailableShippingMethodsQueryFocus,
    GuestAvailableShippingMethodsQueryVariables>({
      query: gql`${shippingMethods.query}`,
      variables: shippingMethods.variables,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
