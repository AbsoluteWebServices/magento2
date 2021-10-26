import { Context, Logger } from '@absolute-web/vsf-core';
import { Page, CmsBlock } from '@absolute-web/magento-api';
import { useContentFactory, UseContentFactoryParams } from '../../factories/useContentFactory';

const factoryParams: UseContentFactoryParams<Page, CmsBlock> = {
  loadContent: async (context: Context, params) => {
    Logger.debug('[Magento]: Load CMS Page content', { params });

    const { data } = await context.$magento.api.cmsPage(params.identifier, params?.customQuery || {});

    Logger.debug('[Result]:', { data });

    return data.cmsPage;
  },
  loadBlocks: async (context: Context, params) => {
    Logger.debug('[Magento]: Load CMS Blocks content', { params });

    const { data } = await context.$magento.api.cmsBlocks(params.identifiers, params?.customQuery || {});

    Logger.debug('[Result]:', { data });

    return data.cmsBlocks.items;
  },
};

export default useContentFactory<Page, CmsBlock>(factoryParams);
