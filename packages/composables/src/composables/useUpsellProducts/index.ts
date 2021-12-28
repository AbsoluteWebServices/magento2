import {
  ComposableFunctionArgs,
  Context,
  Logger,
  ProductsSearchParams,
} from '@absolute-web/vsf-core';
import {
  GetProductSearchParams,
  UpsellProductsQuery,
} from '@absolute-web/magento-api';
import { useCache } from '@absolute-web/vsf-cache';
import {
  useUpsellProductsFactory,
  UseUpsellProductsFactoryParams,
} from '../../factories/useUpsellProductsFactory';
import { UseUpsellProducts } from '../../types/composables';

const factoryParams: UseUpsellProductsFactoryParams<UpsellProductsQuery['products']['items'][0]['upsell_products'], ProductsSearchParams> = {
  provide() {
    return {
      cache: useCache(),
    };
  },
  productsSearch: async (
    context: Context,
    params: ComposableFunctionArgs<GetProductSearchParams>,
  ) => {
    Logger.debug('[Magento] Find upsell products based on ', { params });

    const {
      customQuery,
      ...searchParams
    } = {
      ...params,
    };

    const { data } = await context
      .$magento
      .api
      .upsellProduct(searchParams as GetProductSearchParams);

    Logger.debug('[Result]:', { data });

    if (data?.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    return data.products?.items[0]?.upsell_products;
  },
};

const useUpsellProducts:
(cacheId?: string) => UseUpsellProducts<UpsellProductsQuery['products']['items'][0]['upsell_products'],
ProductsSearchParams> = useUpsellProductsFactory<UpsellProductsQuery['products']['items'][0]['upsell_products'],
ProductsSearchParams>(factoryParams);

export default useUpsellProducts;
