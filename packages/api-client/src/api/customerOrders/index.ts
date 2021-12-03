import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import gql from 'graphql-tag';
import {
  CustomerOrdersFilterInput,
  CustomerOrdersQueryFocus,
  CustomerOrdersQueryVariables,
} from '../../types/GraphQL';
import customerOrdersQuery from './customerOrders';
import { Context } from '../../types/context';
import { GetOrdersSearchParams } from '../../types/API';

type Variables = {
  pageSize: number;
  currentPage: number;
  filter?: CustomerOrdersFilterInput;
};

export default async (
  context: Context,
  searchParams: GetOrdersSearchParams,
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<CustomerOrdersQueryFocus>> => {
  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
    ...searchParams,
  };

  const variables: Variables = {
    pageSize: defaultParams.pageSize <= 0 ? 10 : defaultParams.pageSize,
    currentPage: defaultParams.currentPage <= 0 ? 1 : defaultParams.currentPage,
  };

  if (defaultParams.filter) variables.filter = defaultParams.filter;

  const { customerOrders } = context.extendQuery(
    customQuery, {
      customerOrders: {
        query: customerOrdersQuery,
        variables,
      },
    },
  );

  try {
    return await context.client
      .query<CustomerOrdersQueryFocus, CustomerOrdersQueryVariables>({
      query: gql`${customerOrders.query}`,
      variables: customerOrders.variables,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
