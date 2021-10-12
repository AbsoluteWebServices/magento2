import {
  Context,
  CustomQuery, Logger,
  ProductsSearchParams,
} from '@absolute-web/vsf-core';
import {
  GetProductSearchParams,
  RelatedProductQuery,
} from '@absolute-web/magento-api';
import { useCache } from '@absolute-web/vsf-cache';
import { UseRelatedProducts } from '../../types/composables';
import {
  useRelatedProductsFactory,
  UseRelatedProductsFactoryParams,
} from '../../factories/useRelatedProductsFactory';

const factoryParams: UseRelatedProductsFactoryParams<RelatedProductQuery['products']['items'][0]['related_products'], ProductsSearchParams> = {
  provide() {
    return {
      cache: useCache(),
    };
  },
  productsSearch: async (context: Context,
    params: GetProductSearchParams & {
      customQuery?: CustomQuery;
    }) => {
    Logger.debug('[Magento] Load related products based on ', { params });

    const {
      customQuery,
      ...searchParams
    } = params;

    const { data } = await context
      .$magento
      .getApi
      .relatedProduct(searchParams as GetProductSearchParams, (customQuery || {}));

    Logger.debug('[Result]:', { data });

    if (data.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    return data.products?.items[0]?.related_products;
  },
};

const useRelatedProducts:
(cacheId?: string) => UseRelatedProducts<RelatedProductQuery['products']['items'][0]['related_products'],
ProductsSearchParams> = useRelatedProductsFactory<RelatedProductQuery['products']['items'][0]['related_products'],
ProductsSearchParams>(factoryParams);

export default useRelatedProducts;
