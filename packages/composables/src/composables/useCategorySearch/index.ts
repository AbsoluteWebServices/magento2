import {
  Context, Logger,
} from '@absolute-web/vsf-core';
import { Category } from '@absolute-web/magento-api';
import { useCache } from '@absolute-web/vsf-cache';
import { UseCategorySearchFactory, useCategorySearchFactory } from '../../factories/useCategorySearchFactory';
import { UseCategorySearch } from '../../types/composables';

const factoryParams: UseCategorySearchFactory<Category> = {
  provide() {
    return {
      cache: useCache(),
    };
  },

  search: async (context: Context, params): Promise<Category[]> => {
    Logger.debug('[Magento]: Search for category using', { params });

    const { data } = await context.$magento.getApi.categorySearch({ filters: { name: { match: `${params.term}` } } });

    if (data.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    Logger.debug('[Result]:', { data });

    return data.categoryList;
  },
};

const useCategorySearch: (cacheId?: string) => UseCategorySearch<Category> = useCategorySearchFactory<Category>(factoryParams);

export default useCategorySearch;
