import {
  ComposableFunctionArgs,
  Context,
  FacetSearchResult, Logger,
  ProductsSearchParams,
  useFacetFactory,
} from '@absolute-web/vsf-core';
import { GetProductSearchParams } from '@absolute-web/magento-api';
import { useCache } from '@absolute-web/vsf-cache';

const availableSortingOptions = [
  {
    label: 'Sort: Default',
    value: '',
  },
  {
    label: 'Sort: Name A-Z',
    value: 'name_ASC',
  },
  {
    label: 'Sort: Name Z-A',
    value: 'name_DESC',
  },
  {
    label: 'Sort: Price from low to high',
    value: 'price_ASC',
  }, {
    label: 'Sort: Price from high to low',
    value: 'price_DESC',
  },
];

const constructFilterObject = (inputFilters: Object) => {
  const filter = {};

  Object.keys(inputFilters).forEach((key) => {
    if (key === 'price') {
      const price = { from: 0, to: 0 };
      const flatPrices = inputFilters[key].flatMap((inputFilter) => inputFilter.split('_').map((str) => Number.parseFloat(str))).sort((a, b) => a - b);

      [price.from] = flatPrices;
      price.to = flatPrices[flatPrices.length - 1];

      filter[key] = price;
    } else if (typeof inputFilters[key] === 'string') {
      filter[key] = { in: [inputFilters[key]] };
    } else {
      filter[key] = { in: inputFilters[key] };
    }
  });

  return filter;
};

const constructSortObject = (sortData: string) => {
  const baseData = sortData.split(/_/gi);

  return baseData.length > 0 ? Object.fromEntries([baseData]) : {};
};

const factoryParams = {
  provide() {
    return {
      cache: useCache(),
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: ComposableFunctionArgs<FacetSearchResult<any>>) => {
    Logger.debug('[Magento] Load product facets', { params });

    const {
      customQuery,
      signal,
      input
    } = params;

    const itemsPerPage = (input.itemsPerPage) ? input.itemsPerPage : 20;
    const inputFilters = (input.filters) ? input.filters : {};
    const categoryId = (input.categoryId) ? {
      category_uid: {
        ...(Array.isArray(input.categoryId)
          ? { in: input.categoryId }
          : { eq: input.categoryId }),
      },
    } : {};

    const productParams: ProductsSearchParams = {
      filter: {
        ...categoryId,
        ...constructFilterObject({
          ...inputFilters,
        }),
      },
      perPage: itemsPerPage,
      offset: (input.page - 1) * itemsPerPage,
      page: input.page,
      search: (input.term) ? input.term : '',
      sort: constructSortObject(input.sort || ''),
    };

    const productSearchParams: GetProductSearchParams = {
      pageSize: productParams.perPage,
      search: productParams.search,
      filter: productParams.filter,
      sort: productParams.sort,
      currentPage: productParams.page,
      withAggregations: true,
    };

    const { data } = await context.$magento.getApi.products(productSearchParams, customQuery, signal);

    if (data?.cacheTags) {
      context.cache.addTagsFromString(data.cacheTags);
    }

    Logger.debug('[Result]:', { data });

    return {
      items: data?.products?.items || [],
      total: data?.products?.total_count,
      availableFilters: data?.products?.aggregations,
      category: { id: params.input.categoryId },
      availableSortingOptions,
      perPageOptions: [10, 20, 50],
      itemsPerPage,
    };
  },
};

export default useFacetFactory<any>(factoryParams);
