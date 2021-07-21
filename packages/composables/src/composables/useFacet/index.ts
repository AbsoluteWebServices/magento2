import {
  Context,
  FacetSearchResult,
  ProductsSearchParams,
} from '@vue-storefront/core';
import { GetProductSearchParams, ProductsQueryType } from '@vue-storefront/magento-api/src/types/API';
import { useFacetFactory } from '../../factories/useFacetFactory';

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
      const [priceFrom, priceTo] = inputFilters[key].split('-');

      price.from = priceFrom;

      if (priceTo) {
        price.to = priceTo;
      }

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any> & { input: { queryType: ProductsQueryType } }) => {
    const itemsPerPage = (params.input.itemsPerPage) ? params.input.itemsPerPage : 20;
    const inputFilters = (params.input.filters) ? params.input.filters : {};
    const categoryId = (params.input.categoryId) ? {
      category_uid: {
        ...(Array.isArray(params.input.categoryId)
          ? { in: params.input.categoryId }
          : { eq: params.input.categoryId }),
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
      offset: (params.input.page - 1) * itemsPerPage,
      page: params.input.page,
      search: (params.input.term) ? params.input.term : '',
      sort: constructSortObject(params.input.sort || ''),
    };

    const productSearchParams: GetProductSearchParams = {
      pageSize: productParams.perPage,
      search: productParams.search,
      filter: productParams.filter,
      sort: productParams.sort,
      currentPage: productParams.page,
    };

    let productResponse;
    switch(params.input.queryType || ProductsQueryType.List) {
      case ProductsQueryType.Filters:
        productResponse = await context.$magento.api.productsFilters(productSearchParams);
        break;
      default:
        productResponse = await context.$magento.api.products(productSearchParams);
        break;
    }


    const data = {
      items: productResponse?.data?.products?.items || [],
      total: productResponse?.data?.products?.total_count,
      availableFilters: productResponse?.data?.products?.aggregations,
      category: { id: params.input.categoryId },
      availableSortingOptions,
      perPageOptions: [10, 20, 50],
      itemsPerPage,
    };

    return data;
  },
};

export default useFacetFactory<any>(factoryParams);
