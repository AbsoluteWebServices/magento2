import { ApolloQueryResult } from '@apollo/client/core';
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

  try {
    return await context.client.query<CustomerAvailablePaymentMethodsQueryFocus>({
      query: gql`${paymentMethods.query}`,

    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
