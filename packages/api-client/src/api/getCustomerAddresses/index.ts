import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { GetCustomerAddressesQueryFocus } from '../../types/GraphQL';
import getCustomerAddressesQuery from './getCustomerAddresses';
import { Context } from '../../types/context';

export default async (context: Context, customQuery?: CustomQuery): Promise<ApolloQueryResult<GetCustomerAddressesQueryFocus>> => {
  const { getCustomerAddresses } = context.extendQuery(
    customQuery,
    {
      getCustomerAddresses: {
        query: getCustomerAddressesQuery,
      },
    },
  );

  const query = customQuery ? gql`${getCustomerAddresses.query}` : getCustomerAddresses.query;

  try {
    return await context.client.query<GetCustomerAddressesQueryFocus>({
      query,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
