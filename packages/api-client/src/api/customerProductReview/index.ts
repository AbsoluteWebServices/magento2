import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client';
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
    pageSize: 20,
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

  return context.client.query<CustomerProductReviewQueryFocus, CustomerProductReviewQueryVariables>({
    query: gql`${reviews.query}`,
    variables: reviews.variables,
    fetchPolicy: 'no-cache',
  });
};
