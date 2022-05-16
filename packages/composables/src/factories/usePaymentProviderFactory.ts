import { Ref, computed } from '@vue/composition-api';
import {
  ComposableFunctionArgs,
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  PlatformApi,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UsePaymentProvider, UsePaymentProviderErrors } from '../types/composables';

export interface UsePaymentProviderParams<STATE, PAYMENT_METHOD, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params?: ComposableFunctionArgs<{ state: Ref<STATE> }>) => Promise<STATE>;
  save: (context: Context, params: ComposableFunctionArgs<{ state: Ref<STATE>, paymentMethod: PAYMENT_METHOD }>) => Promise<STATE>;
}

export const usePaymentProviderFactory = <STATE, PAYMENT_METHOD, API extends PlatformApi = any>(
  factoryParams: UsePaymentProviderParams<STATE, PAYMENT_METHOD, API>,
) => function usePaymentProvider(): UsePaymentProvider<STATE, PAYMENT_METHOD, API> {
  const loading: Ref<boolean> = sharedRef(false, 'usePaymentProvider-loading');
  const state: Ref<STATE> = sharedRef(null, 'usePaymentProvider-response');
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);
  const error: Ref<UsePaymentProviderErrors> = sharedRef({
    load: null,
    save: null,
  }, 'usePaymentProvider-error');

  const setState = (newState: STATE) => {
    state.value = newState;
    Logger.debug('usePaymentProvider.setState', newState);
  };

  const save = async (params = {}) => {
    Logger.debug('usePaymentProvider.save');

    try {
      loading.value = true;
      state.value = await _factoryParams.save({
        state,
        ...params,
      });
      error.value.save = null;
    } catch (err) {
      error.value.save = err;
      Logger.error('usePaymentProvider/save', err);
    } finally {
      loading.value = false;
    }
  };

  const load = async (params?: ComposableFunctionArgs<{}>) => {
    Logger.debug('usePaymentProvider.load');

    try {
      loading.value = true;
      state.value = await _factoryParams.load({
        state,
        ...params,
      });
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('usePaymentProvider/load', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    state,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    load,
    save,
    setState,
  };
};
