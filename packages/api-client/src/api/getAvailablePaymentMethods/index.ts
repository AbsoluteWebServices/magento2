import { ApolloQueryResult } from '@apollo/client';
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

  return context.client.query<GuestAvailablePaymentMethodsQueryFocus, GuestAvailablePaymentMethodsQueryVariables>({
    query: gql`${paymentMethods.query}`,
    variables: paymentMethods.variables,
    fetchPolicy: 'no-cache',
  });
};
