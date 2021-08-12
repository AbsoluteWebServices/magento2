import {
  useCategoryFactory,
  Context,
  UseCategoryFactoryParams, Logger,
} from '@vue-storefront/core';
import { useCache } from '@absolute-web/vsf-cache';
import {
  Category,
} from '@vue-storefront/magento-api';

const factoryParams: UseCategoryFactoryParams<Category, any> = {
  provide() {
    return {
      cache: useCache(),
    };
  },

  categorySearch: async (context: Context, params) => {
    Logger.debug('[Magento]: List available categories', { params });

    const { data } = await context.$magento.api.categoryList(params);

    if (data.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    Logger.debug('[Result]:', { data });

    return data.categories.items;
  },
};

export default useCategoryFactory<Category, any>(factoryParams);
