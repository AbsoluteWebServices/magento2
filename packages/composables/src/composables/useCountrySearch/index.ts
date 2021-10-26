import {
  Context, Logger,
} from '@absolute-web/vsf-core';
import { useCache } from '@absolute-web/vsf-cache';
import { Countries, Country } from '@absolute-web/magento-api';
import { UseCountryFactoryParams, useCountrySearchFactory } from '../../factories/useCountrySearchFactory';
import { UseCountrySearch } from '../../types/composables';

const factoryParams: UseCountryFactoryParams<Countries, Country> = {
  provide() {
    return {
      cache: useCache(),
    };
  },

  load: async (context: Context): Promise<Countries[]> => {
    Logger.debug('[Magento]: Load available countries on store');

    const { data } = await context.$magento.getApi.countries();

    if (data.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    Logger.debug('[Result]:', { data });

    return data.countries;
  },
  search: async (context: Context, params): Promise<Country> => {
    Logger.debug('[Magento]: Search country information based on', { params });

    const { data } = await context.$magento.getApi.country(params.id);

    if (data.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    Logger.debug('[Result]:', { data });

    return data.country;
  },
};

const useCountrySearch: (cacheId?: string) => UseCountrySearch<Countries, Country> = useCountrySearchFactory<Countries, Country>(factoryParams);

export default useCountrySearch;
