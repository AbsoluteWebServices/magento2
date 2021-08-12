import { Context } from '@vue-storefront/core';
import { useCache } from '@absolute-web/vsf-cache';
import { Page } from '@vue-storefront/magento-api';
import { useContentFactory, UseContentFactoryParams } from '../../factories/useContentFactory';

const factoryParams: UseContentFactoryParams<Page> = {
  provide() {
    return {
      cache: useCache(),
    };
  },

  loadContent: async (context: Context, identifier: string) => {
    const result = await context.$magento.api.cmsPage(identifier);

    if (result.data.cacheTags) {
      context.cache.addTags(result.data.cacheTags);
    }

    return result.data.cmsPage;
  },
};

export default useContentFactory<Page>(factoryParams);
