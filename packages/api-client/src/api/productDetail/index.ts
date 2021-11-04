import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client';
import { CustomQuery } from '@absolute-web/vsf-core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductDetailsQueryFocus,
  ProductDetailsQueryVariables,
  StagingPreviewParams,
} from '../../types/GraphQL';
import detailQuery from './productDetailsQuery';
import previewDetailQuery from './productDetailsQueryPreview';
import { Context } from '../../types/context';
import { GetProductSearchParams } from '../../types/API';

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

export default async (
  context: Context,
  searchParams?: GetProductSearchParams,
  customQuery?: CustomQuery,
  preview?: StagingPreviewParams,
): Promise<ApolloQueryResult<ProductDetailsQueryFocus>> => {
  const defaultParams = {
    pageSize: 20,
    currentPage: 1,
    ...searchParams,
  };

  const variables: Variables = {
    pageSize: defaultParams.pageSize,
    currentPage: defaultParams.currentPage,
  };

  if (defaultParams.search) variables.search = defaultParams.search;

  if (defaultParams.filter) variables.filter = defaultParams.filter;

  if (defaultParams.sort) variables.sort = defaultParams.sort;

  const { products } = context.extendQuery(
    customQuery, {
      products: {
        query: preview ? previewDetailQuery : detailQuery,
        variables: defaultParams,
      },
    },
  );

  const query = customQuery ? gql`${products.query}` : products.query;

  const result = await context.client.query<ProductDetailsQueryFocus, ProductDetailsQueryVariables>({
    query,
    variables: products.variables,
    fetchPolicy: 'no-cache',
    ...(preview ? {
      context: {
        headers: {
          Authorization: `Bearer ${preview.accessToken}`,
          'Preview-Version': preview.version,
        },
      },
    } : {}),
  });

  if (result.data.products.items.length === 0) throw new Error('No products found');

  return result;
};
