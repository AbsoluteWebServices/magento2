import { Context, Logger } from '@absolute-web/vsf-core';
import { Route } from '@absolute-web/magento-api';
import { useCache } from '@absolute-web/vsf-cache';
import { useUrlResolverFactory, UseUrlResolverFactoryParams } from '../../factories/useUrlResolverFactory';
import { UseUrlResolver } from '../../types/composables';

const factoryParams: UseUrlResolverFactoryParams<Route> = {
  provide() {
    return {
      cache: useCache(),
    };
  },

  search: async (context: Context, url: string) => {
    Logger.debug('[Magento] Find information based on URL', { url });
    const clearUrl = url.replace(/\/[cp|]\//gi, '');

    const { data } = await context.$magento.getApi.urlResolver(clearUrl);

    if (data.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    Logger.debug('[Result]:', { data });

    return data.urlResolver;
  },
};
const useUrlResolver: (cacheId?: string) => UseUrlResolver<Route> = useUrlResolverFactory<Route>(factoryParams);

export default useUrlResolver;
