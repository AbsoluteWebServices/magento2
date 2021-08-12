import { Context } from '@vue-storefront/core';
import { useCache } from '@absolute-web/vsf-cache';
import { Route } from '@vue-storefront/magento-api';
import { useUrlResolverFactory, UseUrlResolverFactoryParams } from '../../factories/useUrlResolverFactory';
import { UseUrlResolver } from '../../types/composables';

const factoryParams: UseUrlResolverFactoryParams<Route> = {
  provide() {
    return {
      cache: useCache(),
    };
  },

  search: async (context: Context, url: string) => {
    const clearUrl = url.replace(/\/[cp|]\//gi, '');

    const { data } = await context.$magento.api.urlResolver(clearUrl);

    if (data.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    return data.urlResolver;
  },
};
const useUrlResolver: (cacheId?: string) => UseUrlResolver<Route> = useUrlResolverFactory<Route>(factoryParams);

export default useUrlResolver;
