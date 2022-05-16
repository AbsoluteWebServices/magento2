import { computed } from '@vue/composition-api';
import {
  ComposableFunctionArgs,
  configureFactoryParams,
  Context,
  FactoryParams,
  PlatformApi,
  Logger,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UseAmazonPay, UseAmazonPayErrors } from '../types/composables';

export interface UseAmazonPayFactoryParams<CONFIG, SESSION, API extends PlatformApi = any> extends FactoryParams<API> {
  loadConfig: (context: Context, params: ComposableFunctionArgs<{}>) => Promise<CONFIG>;
  loadSession: (context: Context, params: ComposableFunctionArgs<{ amazonSessionId: string, queryTypes?: string[] }>) => Promise<SESSION>;
  updateSession: (context: Context, params: ComposableFunctionArgs<{ amazonSessionId: string }>) => Promise<string>;
}

export function useAmazonPayFactory<CONFIG, SESSION, API extends PlatformApi = any>(
  factoryParams: UseAmazonPayFactoryParams<CONFIG, SESSION, API>,
) {
  return function useAmazonPay(id: string = ''): UseAmazonPay<CONFIG, SESSION, API> {
    const ssrKey = id || 'useAmazonPay';
    const sessionId = sharedRef<string>(null, `${ssrKey}-sessionId`);
    const config = sharedRef<CONFIG>(null, `${ssrKey}-config`);
    const session = sharedRef<SESSION>(null, `${ssrKey}-session`);
    const redirectUrl = sharedRef<string>(null, `${ssrKey}-redirectUrl`);
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef<UseAmazonPayErrors>({
      loadConfig: null,
      loadSession: null,
      updateSession: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const reset = () => {
      sessionId.value = null;
      config.value = null;
      session.value = null;
      redirectUrl.value = null;
      loading.value = false;
      error.value = {
        loadConfig: null,
        loadSession: null,
        updateSession: null,
      };
    };

    const loadConfig = async (params = {}) => {
      Logger.debug(`useAmazonPay/${ssrKey}/loadConfig`);

      try {
        loading.value = true;
        config.value = await _factoryParams.loadConfig(params);
        error.value.loadConfig = null;
      } catch (err) {
        error.value.loadConfig = err;
        Logger.error(`useAmazonPay/${ssrKey}/loadConfig`, err);
      } finally {
        loading.value = false;
      }
    };

    const loadSession = async (params = {}) => {
      Logger.debug(`useAmazonPay/${ssrKey}/loadSession`);

      try {
        loading.value = true;
        session.value = await _factoryParams.loadSession(params);
        error.value.loadSession = null;
      } catch (err) {
        error.value.loadSession = err;
        Logger.error(`useAmazonPay/${ssrKey}/loadSession`, err);
      } finally {
        loading.value = false;
      }
    };

    const updateSession = async (params = {}) => {
      Logger.debug(`useAmazonPay/${ssrKey}/updateSession`);

      try {
        loading.value = true;
        redirectUrl.value = await _factoryParams.updateSession(params);
        error.value.updateSession = null;
      } catch (err) {
        error.value.updateSession = err;
        Logger.error(`useAmazonPay/${ssrKey}/updateSession`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      reset,
      loadConfig,
      loadSession,
      updateSession,
      sessionId,
      config: computed(() => config.value),
      session: computed(() => session.value),
      redirectUrl: computed(() => redirectUrl.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
