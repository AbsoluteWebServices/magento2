import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput, UsedProductsQuery, RelatedProductQueryVariables,
  CachedQuery,
} from '../../types/GraphQL';
import usedProducts from './usedProducts';
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
): Promise<ApolloQueryResult<CachedQuery<UsedProductsQuery>>> => {
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

  const { usedProduct: usedProductGQL } = context.extendQuery(customQuery, {
    usedProduct: {
      query: usedProducts,
      variables,
    },
  });

  try {
    return await context.client.query<CachedQuery<UsedProductsQuery>, RelatedProductQueryVariables>({
      query: usedProductGQL.query,
      variables: usedProductGQL.variables,
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
