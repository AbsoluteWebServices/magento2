import {
  Context, Logger,
} from '@absolute-web/vsf-core';
import { Countries, Country } from '@absolute-web/magento-api';
import { UseCountryFactoryParams, useCountrySearchFactory } from '../../factories/useCountrySearchFactory';
import { UseCountrySearch } from '../../types/composables';

const factoryParams: UseCountryFactoryParams<Countries, Country> = {
  load: async (context: Context, { customQuery, signal }): Promise<Countries[]> => {
    Logger.debug('[Magento]: Load available countries on store');

    const { data } = await context.$magento.getApi.countries(undefined, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.countries;
  },
  search: async (context: Context, params): Promise<Country> => {
    Logger.debug('[Magento]: Search country information based on', { params });

    const {
      customQuery,
      signal,
      id
    } = params;

    const { data } = await context.$magento.getApi.country(id, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.country;
  },
};

const useCountrySearch: (cacheId?: string) => UseCountrySearch<Countries, Country> = useCountrySearchFactory<Countries, Country>(factoryParams);

export default useCountrySearch;
