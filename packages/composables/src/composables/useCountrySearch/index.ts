import {
  Context,
} from '@vue-storefront/core';
import { useCache } from '@absolute-web/vsf-cache';
import { Countries, Country } from '@vue-storefront/magento-api';
import { UseCountryFactoryParams, useCountrySearchFactory } from '../../factories/useCountrySearchFactory';
import { UseCountrySearch } from '../../types/composables';

const factoryParams: UseCountryFactoryParams<Countries, Country> = {
  provide() {
    return {
      cache: useCache(),
    };
  },

  load: async (context: Context): Promise<Countries[]> => {
    const { data } = await context.$magento.api.countries();

    if (data.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    return data.countries;
  },
  search: async (context: Context, params): Promise<Country> => {
    const { data } = await context.$magento.api.country(params.id);

    if (data.cacheTags) {
      context.cache.addTags(data.cacheTags);
    }

    return data.country;
  },
};

const useCountrySearch: (cacheId?: string) => UseCountrySearch<Countries, Country> = useCountrySearchFactory<Countries, Country>(factoryParams);

export default useCountrySearch;
