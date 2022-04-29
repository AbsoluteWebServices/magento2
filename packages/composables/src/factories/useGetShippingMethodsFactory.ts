import { computed, Ref } from '@vue/composition-api';
import {
  ComposableFunctionArgs,
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  PlatformApi,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UseGetCartMethods, UseGetCartMethodsErrors } from '../types/composables';

export interface UseGetShippingMethodsFactory<METHOD, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params: ComposableFunctionArgs<{}>) => Promise<METHOD[]>;
}

export function useGetShippingMethodsFactory<METHOD, API extends PlatformApi = any>(
  factoryParams: UseGetShippingMethodsFactory<METHOD, API>,
) {
  return function useGetCartMethods(): UseGetCartMethods<METHOD, API> {
    const result: Ref<METHOD[]> = sharedRef(null, 'UseGetShippingMethods-result');
    const loading = sharedRef(false, `UseGetShippingMethods-loading`);
    const error = sharedRef<UseGetCartMethodsErrors>({
      load: null,
    }, `UseGetShippingMethods-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const setMethods = (newMethods: METHOD[]) => {
      result.value = newMethods;
      Logger.debug('useGetShippingMethods/setState', newMethods);
    };

    // eslint-disable-next-line consistent-return
    const load = async (params: ComposableFunctionArgs<{}> = {}) => {
      Logger.debug(`useGetShippingMethods/load`, { params });

      try {
        loading.value = true;

        result.value = await _factoryParams.load(params);

        error.value.load = null;
      } catch (err) {
        error.value.load = err;
        Logger.error(`useGetShippingMethods/load`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      setMethods,
      load,
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
