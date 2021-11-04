import {
  useCategoryFactory,
  Context,
  UseCategoryFactoryParams, Logger,
} from '@absolute-web/vsf-core';
import { useCache } from '@absolute-web/vsf-cache';
import {
  Category,
} from '@absolute-web/magento-api';

const factoryParams: UseCategoryFactoryParams<Category, any> = {
  provide() {
    return {
      cache: useCache(),
    };
  },

  categorySearch: async (context: Context, params) => {
    Logger.debug('[Magento]: List available categories', { params });

    const {
      preview,
      ...searchParams
    } = params;

    const filters = {};

    for (const key in searchParams) {
      if (Object.prototype.hasOwnProperty.call(searchParams, key)) {
        const value = searchParams[key];

        if (key === 'name') {
          filters[key] = { match: value };
        } else if (Array.isArray(value)) {
          filters[key] = { in: value };
        } else {
          filters[key] = { eq: value };
        }
      }
    }

    const { data } = await context.$magento.getApi.category({ filters }, preview);

    if (data.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    Logger.debug('[Result]:', { data });

    return data.categoryList;
  },
};

export default useCategoryFactory<Category, any>(factoryParams);
