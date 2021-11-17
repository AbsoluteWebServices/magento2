import { computed, Ref } from 'vue-demi';
import { configureFactoryParams, Context, FactoryParams, Logger, sharedRef } from '@absolute-web/core';
import { UseCustomerReturn, UseCustomerReturnErrors } from '../types/composables';

export interface UseCustomerReturnFactory<CUSTOMER_RETURN_DATA, CUSTOMER_RETURN_PARAMS> extends FactoryParams {
  loadReturn: (context: Context, params: CUSTOMER_RETURN_PARAMS) => Promise<CUSTOMER_RETURN_DATA>;
}

export const useCustomerReturnFactory = <CUSTOMER_RETURN_DATA, CUSTOMER_RETURN_PARAMS>(
  factoryParams: UseCustomerReturnFactory<CUSTOMER_RETURN_DATA, CUSTOMER_RETURN_PARAMS>
) => {
  return function useCustomerReturn(id: string = ''): UseCustomerReturn<CUSTOMER_RETURN_DATA, CUSTOMER_RETURN_PARAMS> {
    // @ts-ignore
    const ssrKey = id || 'useCustomerReturn';
    const loading: Ref<boolean> = sharedRef(false, `${ssrKey}-loading`);
    const result: Ref<CUSTOMER_RETURN_DATA> = sharedRef(null, `${ssrKey}-result`);
    const error: Ref<UseCustomerReturnErrors> = sharedRef(
      {
        loadReturn: null,
      },
      `${ssrKey}-error`
    );
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    // eslint-disable-next-line consistent-return
    const loadReturn = async (params: CUSTOMER_RETURN_PARAMS): Promise<void> => {
      Logger.debug(`useCustomerReturn/${ssrKey}/loadReturn`, params);

      try {
        loading.value = true;
        result.value = await _factoryParams.loadReturn(params);
        error.value.loadReturn = null;
      } catch (err) {
        error.value.loadReturn = err;
        Logger.error(`useCustomerReturn/${ssrKey}/loadReturn`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      loadReturn,
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
};
