import {
  Context,
  CustomQuery, Logger,
  ProductsSearchParams,
} from '@absolute-web/vsf-core';
import {
  GetProductSearchParams,
  RelatedProductQuery,
} from '@absolute-web/magento-api';
import { UseRelatedProducts } from '../../types/composables';
import {
  useRelatedProductsFactory,
  UseRelatedProductsFactoryParams,
} from '../../factories/useRelatedProductsFactory';

const factoryParams: UseRelatedProductsFactoryParams<RelatedProductQuery['products']['items'][0]['related_products'], ProductsSearchParams> = {
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

    return data.products?.items[0]?.related_products;
  },
};

const useRelatedProducts:
(cacheId?: string) => UseRelatedProducts<RelatedProductQuery['products']['items'][0]['related_products'],
ProductsSearchParams> = useRelatedProductsFactory<RelatedProductQuery['products']['items'][0]['related_products'],
ProductsSearchParams>(factoryParams);

export default useRelatedProducts;
