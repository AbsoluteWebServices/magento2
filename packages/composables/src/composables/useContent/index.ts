import { Context, Logger } from '@absolute-web/vsf-core';
import { Page, CmsBlock } from '@absolute-web/magento-api';
import { useCache } from '@absolute-web/vsf-cache';
import { useContentFactory, UseContentFactoryParams } from '../../factories/useContentFactory';

const factoryParams: UseContentFactoryParams<Page, CmsBlock> = {
  provide() {
    return {
      cache: useCache(),
    };
  },
  loadContent: async (context: Context, params) => {
    Logger.debug('[Magento]: Load CMS Page content', { params });

    const {
      customQuery,
      signal,
      identifier
    } = params;

    const { data } = await context.$magento.getApi.cmsPage(identifier, customQuery, signal);

    if (data?.cacheTags) {
      context.cache.addTagsFromString(data.cacheTags);
    }

    Logger.debug('[Result]:', { data });

    return data.cmsPage;
  },
  loadBlocks: async (context: Context, params) => {
    Logger.debug('[Magento]: Load CMS Blocks content', { params });

    const {
      customQuery,
      signal,
      identifiers
    } = params;

    const { data } = await context.$magento.getApi.cmsBlocks(identifiers, customQuery, signal);

    if (data?.cacheTags) {
      context.cache.addTagsFromString(data.cacheTags);
    }

    Logger.debug('[Result]:', { data });

    return data.cmsBlocks.items;
  },
};

export default useContentFactory<Page, CmsBlock>(factoryParams);
