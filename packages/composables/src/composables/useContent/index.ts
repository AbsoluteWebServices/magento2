import { Context } from '@vue-storefront/core';
import { Page, CmsBlock } from '@vue-storefront/magento-api';
import { useContentFactory, UseContentFactoryParams } from '../../factories/useContentFactory';
import { useCache } from '@absolute-web/vsf-cache';

const factoryParams: UseContentFactoryParams<Page, CmsBlock> = {
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
  loadBlocks: async (context: Context, identifiers: string[]) => {
    const result = await context.$magento.api.cmsBlocks(identifiers);
    return result.data.cmsBlocks.items;
  },
};

export default useContentFactory<Page, CmsBlock>(factoryParams);
