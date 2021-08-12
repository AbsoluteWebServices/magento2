import {
  useCategoryFactory,
  Context,
  UseCategoryFactoryParams,
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

    const filters = {};

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key];

        if (key === 'name') {
          filters[key] = { match: value }
        }
        else if(Array.isArray(value)) {
          filters[key] = { in: value }
        }
        else {
          filters[key] = { eq: value }
        }
      }
    }

    const { data } = await context.$magento.api.category({ filters });

    if (data.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    return data.categoryList;
  },
};

export default useCategoryFactory<Category, any>(factoryParams);
