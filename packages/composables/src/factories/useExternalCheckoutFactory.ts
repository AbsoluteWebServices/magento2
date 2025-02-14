import {
  ComposableFunctionArgs,
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  PlatformApi,
  sharedRef,
} from '@absolute-web/vsf-core';
import { computed } from '@vue/composition-api';
import { UseExternalCheckout } from '../types/composables';

export interface UseExternalCheckoutFactoryParams<API extends PlatformApi = any> extends FactoryParams<API> {
  initializeCheckout: (context: Context, params: ComposableFunctionArgs<{ baseUrl: string }>) => Promise<string>;
}

export const useExternalCheckoutFactory = <API extends PlatformApi = any>(
  factoryParams: UseExternalCheckoutFactoryParams<API>,
) => {
  function useExternalCheckout(ssrKey = 'useExternalCheckout'): UseExternalCheckout<API> {
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef({
      initializeCheckout: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    // eslint-disable-next-line @typescript-eslint/require-await,consistent-return
    const initializeCheckout = async (params: ComposableFunctionArgs<{ baseUrl: string }>): Promise<string> => {
      Logger.debug(`useExternalCheckout/${ssrKey}/initializeCheckout`);
      loading.value = true;

      try {
        return _factoryParams.initializeCheckout(params);
      } catch (err) {
        error.value.initializeCheckout = err;

        Logger.error(`useExternalCheckout/${ssrKey}/initializeCheckout`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      initializeCheckout,
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  }

  return useExternalCheckout;
};
