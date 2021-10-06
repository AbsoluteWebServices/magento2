import { computed, Ref } from 'vue-demi';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { PlatformApi } from '@vue-storefront/core/lib/src/types';
import { UseCustomerReturns, UseCustomerReturnsErrors } from '../types/composables';
import { Returns } from '@vue-storefront/magento-api';

export interface UseCustomerReturnsFactory<CUSTOMER_RETURNS_DATA, API extends PlatformApi = any> extends FactoryParams<API> {
  search: (context: Context, params: any) => Promise<CUSTOMER_RETURNS_DATA>;
}

export function useCustomerReturnsFactory<CUSTOMER_RETURNS_DATA, API extends PlatformApi = any>(
  factoryParams: UseCustomerReturnsFactory<CUSTOMER_RETURNS_DATA, API>,
) {
  return function useCustomerReturns(id: string = ''): UseCustomerReturns<CUSTOMER_RETURNS_DATA, API> {
    // @ts-ignore
    const ssrKey = id || 'useCustomerReturns';
    const result = sharedRef<Returns | null>(null, `${ssrKey}-result`);
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef<UseCustomerReturnsErrors>({
      search: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    // eslint-disable-next-line consistent-return
    const search = async (params: any): Promise<CUSTOMER_RETURNS_DATA> => {
      Logger.debug(`useCustomerReturns/${ssrKey}/search`);

      try {
        loading.value = true;

        const data = await _factoryParams.search(params);

        result.value = data.customer?.returns;

        error.value.search = null;

        return data;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useCustomerReturns/${ssrKey}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
