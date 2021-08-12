import { ApolloQueryResult } from '@apollo/client/core';
import gql from 'graphql-tag';
import { CustomQuery } from '@absolute-web/vsf-core';
import { Context } from '../../types/context';
import GuestAvailablePaymentMethods from './GuestAvailablePaymentMethods';
import {
  GuestAvailablePaymentMethodsQueryFocus,
  GuestAvailablePaymentMethodsQueryVariables,
} from '../../types/GraphQL';

export default async (
  context: Context,
  params: {
    cartId: string;
  },
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<GuestAvailablePaymentMethodsQueryFocus>> => {
  const defaultVariables = {
    cartId: params.cartId || '',
  };

  const { paymentMethods } = context.extendQuery(customQuery,
    {
      paymentMethods: {
        query: GuestAvailablePaymentMethods,
        variables: defaultVariables,
      },
    });

  try {
    return await context.client.query<GuestAvailablePaymentMethodsQueryFocus, GuestAvailablePaymentMethodsQueryVariables>({
      query: gql`${paymentMethods.query}`,
      variables: paymentMethods.variables,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
