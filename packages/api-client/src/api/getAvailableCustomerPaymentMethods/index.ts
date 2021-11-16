import { ApolloQueryResult } from '@apollo/client';
import gql from 'graphql-tag';
import { CustomQuery } from '@absolute-web/vsf-core';
import { Context } from '../../types/context';
import CustomerAvailablePaymentMethods from './CustomerPaymentMethods';
import { CustomerAvailablePaymentMethodsQueryFocus } from '../../types/GraphQL';

export default async (
  context: Context,
  params: {
    cartId: string;
  },
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<CustomerAvailablePaymentMethodsQueryFocus>> => {
  const { paymentMethods } = context.extendQuery(customQuery,
    {
      paymentMethods: {
        query: CustomerAvailablePaymentMethods,
      },
    });

  return context.client.query<CustomerAvailablePaymentMethodsQueryFocus>({
    query: gql`${paymentMethods.query}`,
    fetchPolicy: 'no-cache',
  });
};
