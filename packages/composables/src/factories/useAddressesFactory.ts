import {
  configureFactoryParams,
  Context,
  CustomQuery,
  FactoryParams,
  Logger,
  ComposableFunctionArgs,
  PlatformApi,
  sharedRef,
} from '@absolute-web/vsf-core';
import { computed, Ref } from '@vue/composition-api';
import { CustomQueryParams, UseAddresses, UseAddressesErrors } from '../types/composables';

export interface UseAddressesParams<ADDRESS,
  LOAD_ADDRESS_PARAMS extends { customQuery?: CustomQuery } =CustomQueryParams,
  SAVE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  UPDATE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  REMOVE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  API extends PlatformApi = any,
> extends FactoryParams<API> {
  load: (context: Context, params?: ComposableFunctionArgs<LOAD_ADDRESS_PARAMS>) => Promise<ADDRESS[]>;
  save: (context: Context, params: ComposableFunctionArgs<SAVE_ADDRESS_PARAMS>) => Promise<ADDRESS>;
  update: (context: Context, params: ComposableFunctionArgs<UPDATE_ADDRESS_PARAMS>) => Promise<ADDRESS>;
  remove: (context: Context, params: ComposableFunctionArgs<REMOVE_ADDRESS_PARAMS>) => Promise<boolean>;
}

export const useAddressesFactory = <ADDRESS,
  LOAD_ADDRESS_PARAMS extends { customQuery?: CustomQuery },
  SAVE_ADDRESS_PARAMS extends { customQuery?: CustomQuery },
  UPDATE_ADDRESS_PARAMS extends { customQuery?: CustomQuery },
  REMOVE_ADDRESS_PARAMS extends { customQuery?: CustomQuery },
  API extends PlatformApi = any,
>(
  factoryParams: UseAddressesParams<ADDRESS,
  LOAD_ADDRESS_PARAMS,
  SAVE_ADDRESS_PARAMS,
  UPDATE_ADDRESS_PARAMS,
  REMOVE_ADDRESS_PARAMS,
  API>,
) => function useAddresses(): UseAddresses<ADDRESS,
LOAD_ADDRESS_PARAMS,
SAVE_ADDRESS_PARAMS,
UPDATE_ADDRESS_PARAMS,
REMOVE_ADDRESS_PARAMS,
API> {
  const loading: Ref<boolean> = sharedRef(false, 'useAddresses-loading');
  const addresses: Ref<ADDRESS[]> = sharedRef(null, 'useAddresses-shipping');
  const error: Ref<UseAddressesErrors> = sharedRef({
    load: null,
    save: null,
    remove: null,
    update: null,
  }, 'useAddresses-error');

  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);

  const load = async (loadParams = {}) => {
    Logger.debug('useAddresses.load');

    try {
      loading.value = true;
      const addressesInfo = await _factoryParams.load(loadParams);
      error.value.load = null;
      addresses.value = addressesInfo;
    } catch (err) {
      error.value.load = err;
      Logger.error('useAddresses/load', err);
    } finally {
      loading.value = false;
    }
  };

  const save = async (saveParams = {}) => {
    Logger.debug('useAddresses.save');

    try {
      loading.value = true;
      await _factoryParams.save(saveParams);
      error.value.save = null;
      await load();
    } catch (err) {
      error.value.save = err;
      Logger.error('useAddresses/save', err);
    } finally {
      loading.value = false;
    }
  };

  const update = async (updateParams = {}) => {
    Logger.debug('useAddresses.update');

    try {
      loading.value = true;

      await _factoryParams.update(updateParams);

      error.value.update = null;

      await load();
    } catch (err) {
      error.value.update = err;

      Logger.error('useAddresses.delete', err);
    } finally {
      loading.value = false;
    }
  };

  const remove = async (removeParams = {}) => {
    Logger.debug('useAddresses.remove');

    try {
      loading.value = true;

      await _factoryParams.remove(removeParams);

      error.value.remove = null;

      await load();
    } catch (err) {
      error.value.remove = err;

      Logger.error('useAddresses.remove', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    addresses: computed(() => addresses.value),
    error: computed(() => error.value),
    load,
    loading: computed(() => loading.value),
    remove,
    save,
    update,
  };
};
