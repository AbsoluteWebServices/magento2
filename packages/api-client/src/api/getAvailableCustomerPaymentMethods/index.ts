import { ApolloQueryResult } from '@apollo/client';
import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';
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

  try {
    return await context.client.query<CustomerAvailablePaymentMethodsQueryFocus>({
      query: gql`${paymentMethods.query}`,
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
