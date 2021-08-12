import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import {
  CustomerProductReviewQueryFocus,
  CustomerProductReviewQueryVariables,
} from '../../types/GraphQL';
import customerProductReview from './customerProductReview';
import { Context } from '../../types/context';

export type CustomerProductReviewParams = {
  pageSize: number;
  currentPage: number;
};

export default async (
  context: Context,
  searchParams?: CustomerProductReviewParams,
  customQuery?: CustomQuery,
): Promise<ApolloQueryResult<CustomerProductReviewQueryFocus>> => {
  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
    ...searchParams,
  };

  const variables: CustomerProductReviewParams = {
    pageSize: defaultParams.pageSize,
    currentPage: defaultParams.currentPage,
  };

  const { reviews } = context.extendQuery(
    customQuery, {
      reviews: {
        query: customerProductReview,
        variables,
      },
    },
  );

  try {
    return await context.client.query<CustomerProductReviewQueryFocus, CustomerProductReviewQueryVariables>({
      query: gql`${reviews.query}`,
      variables: reviews.variables,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
