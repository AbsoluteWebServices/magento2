import {
  useCategoryFactory,
  Context,
  UseCategoryFactoryParams, Logger,
} from '@absolute-web/vsf-core';
import { useCache } from '@absolute-web/vsf-cache';
import {
  CategoryTree as Category, CategorySearchQueryVariables,
  StagingPreviewQueryVariables,
} from '@absolute-web/magento-api';

const factoryParams: UseCategoryFactoryParams<Category, StagingPreviewQueryVariables<CategorySearchQueryVariables>> = {
  provide() {
    return {
      cache: useCache(),
    };
  },
  categorySearch: async (context: Context, params) => {
    Logger.debug('[Magento]: List available categories', { params });

    const { filters, preview, customQuery } = params;

    const { data } = await context.$magento.getApi.category({ filters, preview }, customQuery || {});

    if (data?.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    Logger.debug('[Result]:', { data });

    return data.categoryList;
  },
};

export default useCategoryFactory<Category, StagingPreviewQueryVariables<CategorySearchQueryVariables>>(factoryParams);
