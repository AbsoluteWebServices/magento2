import { ApolloQueryResult } from '@apollo/client';
import { CustomQuery } from '@absolute-web/vsf-core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductsFiltersQuery,
  ProductsListQueryVariables,
} from '../../types/GraphQL';
import productsFiltersQuery from './productsFiltersQuery';
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
): Promise<ApolloQueryResult<ProductsFiltersQuery>> => {
  const defaultParams = {
    pageSize: 1,
    currentPage: 1,
    ...searchParams,
  };

  const variables: Variables = {
    pageSize: defaultParams.pageSize <= 0 ? 1 : defaultParams.pageSize,
    currentPage: defaultParams.currentPage <= 0 ? 1 : defaultParams.currentPage,
  };

  if (defaultParams.search) variables.search = defaultParams.search;

  if (defaultParams.filter) variables.filter = defaultParams.filter;

  if (defaultParams.sort) variables.sort = defaultParams.sort;

  const { products } = context.extendQuery(
    customQuery, {
      products: {
        query: productsFiltersQuery,
        variables: defaultParams,
      },
    },
  );

  return context.client.query<ProductsFiltersQuery, ProductsListQueryVariables>({
    query: products.query,
    variables: products.variables,
    fetchPolicy: 'cache-first',
  });
};
