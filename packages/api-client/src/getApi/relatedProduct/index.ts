import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  RelatedProductQuery,
  RelatedProductQueryVariables,
  CachedQuery,
} from '../../types/GraphQL';
import relatedProduct from './relatedProduct';
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
  customQuery: CustomQuery = { relatedProduct: 'relatedProduct' },
): Promise<ApolloQueryResult<CachedQuery<RelatedProductQuery>>> => {
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

  const { relatedProduct: relatedProductGQL } = context.extendQuery(customQuery, {
    relatedProduct: {
      query: relatedProduct,
      variables,
    },
  });

  const result = await context.client.query<CachedQuery<RelatedProductQuery>, RelatedProductQueryVariables>({
    query: relatedProductGQL.query,
    variables: relatedProductGQL.variables,
  });

  if (!result.data.products?.items?.length) {
    result.data.cacheTags = 'empty';
  }

  return result;
};
