import { ApolloQueryResult } from '@apollo/client';
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

  return context.client.query<GuestAvailableShippingMethodsQueryFocus,
  GuestAvailableShippingMethodsQueryVariables>({
    query: gql`${shippingMethods.query}`,
    variables: shippingMethods.variables,
    fetchPolicy: 'no-cache',
  });
};
