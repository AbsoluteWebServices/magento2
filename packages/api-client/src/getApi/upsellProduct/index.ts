import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput, UpsellProductsQuery, UpsellProductsQueryVariables,
  CachedQuery,
} from '../../types/GraphQL';
import upsellProducts from './upsellProducts';
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
  customQuery: CustomQuery = { upsellProducts: 'upsellProducts' },
): Promise<ApolloQueryResult<CachedQuery<UpsellProductsQuery>>> => {
  const defaultParams = {
    pageSize: 10,
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

  const { upsellProducts: upsellProductsGQL } = context.extendQuery(customQuery, {
    upsellProducts: {
      query: upsellProducts,
      variables,
    },
  });

  const result = await context.client.query<CachedQuery<UpsellProductsQuery>, UpsellProductsQueryVariables>({
    query: upsellProductsGQL.query,
    variables: upsellProductsGQL.variables,
  });

  if (!result.data.products?.items?.length) {
    result.data.cacheTags = 'empty';
  }

  return result;
};
