import { computed, Ref } from 'vue-demi';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseCustomerReturns, UseCustomerReturnsErrors } from '../types/composables';

export interface UseCustomerReturnsFactory<CUSTOMER_RETURNS_DATA, CUSTOMER_RETURNS_PARAMS> extends FactoryParams {
  loadReturns: (context: Context, params: CUSTOMER_RETURNS_PARAMS) => Promise<CUSTOMER_RETURNS_DATA>;
}


export const useCustomerReturnsFactory = <CUSTOMER_RETURNS_DATA, CUSTOMER_RETURNS_PARAMS>(
  factoryParams: UseCustomerReturnsFactory<CUSTOMER_RETURNS_DATA, CUSTOMER_RETURNS_PARAMS>,
) => {
  return function useCustomerReturns(id: string = ''): UseCustomerReturns<CUSTOMER_RETURNS_DATA, CUSTOMER_RETURNS_PARAMS> {
    // @ts-ignore
    const ssrKey = id || 'useCustomerReturns';
    const loading: Ref<boolean> = sharedRef(false, `${ssrKey}-loading`);
    const result: Ref<CUSTOMER_RETURNS_DATA> = sharedRef(null, `${ssrKey}-result`);
    const error: Ref<UseCustomerReturnsErrors> = sharedRef({
      loadReturns: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    // eslint-disable-next-line consistent-return
    const loadReturns = async (params: CUSTOMER_RETURNS_PARAMS): Promise<void> => {
      Logger.debug(`useCustomerReturns/${ssrKey}/loadReturns`, params);

      try {
        loading.value = true;
        result.value = await _factoryParams.loadReturns(params);
        error.value.loadReturns = null;
      } catch (err) {
        error.value.loadReturns = err;
        Logger.error(`useCustomerReturns/${ssrKey}/loadReturns`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      loadReturns,
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
