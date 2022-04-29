import { Ref, computed } from '@vue/composition-api';
import {
  CustomQuery, Context, FactoryParams, sharedRef, Logger, configureFactoryParams, ComposableFunctionArgs,
} from '@absolute-web/vsf-core';
import { UseCompareList, UseCompareListErrors } from '../types/composables';

export interface UseCompareListFactoryParams<COMPARE_LIST, PRODUCT> extends FactoryParams {
  load: (context: Context, params: ComposableFunctionArgs<{ uid: string }>) => Promise<COMPARE_LIST>;
  loadCustomerCompareList: (context: Context, params: ComposableFunctionArgs<{}>) => Promise<COMPARE_LIST>;
  create: (context: Context, params: ComposableFunctionArgs<{ products: PRODUCT[] }>) => Promise<COMPARE_LIST>;
  clear: (context: Context, params: ComposableFunctionArgs<{ currentCompareList: COMPARE_LIST }>) => Promise<boolean>;
  assignToCustomer: (context: Context, params: ComposableFunctionArgs<{ currentCompareList: COMPARE_LIST }>) => Promise<COMPARE_LIST>;
  addItems: (
    context: Context,
    params: ComposableFunctionArgs<{
      currentCompareList: COMPARE_LIST;
      products: PRODUCT[];
    }>
  ) => Promise<COMPARE_LIST>;
  removeItems:
  (context: Context, params: ComposableFunctionArgs<{ currentCompareList: COMPARE_LIST; products: PRODUCT[] }>) => Promise<COMPARE_LIST>;
  isInCompareList: (context: Context, params: { currentCompareList: COMPARE_LIST; product: PRODUCT }) => boolean;
}

export const useCompareListFactory = <COMPARE_LIST, PRODUCT>(
  factoryParams: UseCompareListFactoryParams<COMPARE_LIST, PRODUCT>,
) => function useCompareList(id: string = ''): UseCompareList<COMPARE_LIST, PRODUCT> {
  const ssrKey = id || 'useCompareList';
  const loading: Ref<boolean> = sharedRef(false, `${ssrKey}-loading`);
  const compareList: Ref<COMPARE_LIST> = sharedRef(null, `${ssrKey}-compareList`);
  const error: Ref<UseCompareListErrors> = sharedRef({
    load: null,
    loadCustomerCompareList: null,
    create: null,
    clear: null,
    assignToCustomer: null,
    addItems: null,
    removeItems: null,
  }, `${ssrKey}-error`);

  // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
  const _factoryParams = configureFactoryParams(
    factoryParams,
  );

  const reset = () => {
    loading.value = false;
    compareList.value = null;
    error.value = {
      load: null,
      loadCustomerCompareList: null,
      create: null,
      clear: null,
      assignToCustomer: null,
      addItems: null,
      removeItems: null,
    };
  };

  const load = async (params: ComposableFunctionArgs<{ uid }>) => {
    Logger.debug(`useCompareList/${ssrKey}/load`, params);

    try {
      loading.value = true;
      compareList.value = await _factoryParams.load(params);
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error(`useCompareList/${ssrKey}/load`, err);
    } finally {
      loading.value = false;
    }
  };

  const loadCustomerCompareList = async (params: ComposableFunctionArgs<{}> = {}) => {
    Logger.debug(`useCompareList/${ssrKey}/loadCustomerCompareList`);

    try {
      loading.value = true;
      compareList.value = await _factoryParams.loadCustomerCompareList(params);
      error.value.loadCustomerCompareList = null;
    } catch (err) {
      error.value.loadCustomerCompareList = err;
      Logger.error(`useCompareList/${ssrKey}/loadCustomerCompareList`, err);
    } finally {
      loading.value = false;
    }
  };

  const create = async (params: ComposableFunctionArgs<{ products }>) => {
    Logger.debug(`useCompareList/${ssrKey}/create`, params);

    try {
      loading.value = true;
      compareList.value = await _factoryParams.create(params);
      error.value.create = null;
    } catch (err) {
      error.value.create = err;
      Logger.error(`useCompareList/${ssrKey}/create`, err);
    } finally {
      loading.value = false;
    }
  };

  const clear = async (params: ComposableFunctionArgs<{}> = {}) => {
    Logger.debug(`useCompareList/${ssrKey}/clear`);

    try {
      loading.value = true;
      const result = await _factoryParams.clear({ currentCompareList: compareList.value, ...params });
      error.value.clear = null;
      if (result) {
        compareList.value = null;
      }
      return result;
    } catch (err) {
      error.value.clear = err;
      Logger.error(`useCompareList/${ssrKey}/clear`, err);
    } finally {
      loading.value = false;
    }
    return false;
  };

  const assignToCustomer = async (params: ComposableFunctionArgs<{}> = {}) => {
    Logger.debug(`useCompareList/${ssrKey}/assignToCustomer`);

    try {
      loading.value = true;
      const updatedCompareList = await _factoryParams.assignToCustomer({ currentCompareList: compareList.value, ...params });
      error.value.assignToCustomer = null;
      compareList.value = updatedCompareList;
    } catch (err) {
      error.value.assignToCustomer = err;
      Logger.error(`useCompareList/${ssrKey}/assignToCustomer`, err);
    } finally {
      loading.value = false;
    }
  };

  const addItems = async (params: ComposableFunctionArgs<{ products }>) => {
    Logger.debug(`useCompareList/${ssrKey}/addItems`, params);

    try {
      loading.value = true;
      const updatedCompareList = await _factoryParams.addItems({
        currentCompareList: compareList.value,
        ...params,
      });
      error.value.addItems = null;
      compareList.value = updatedCompareList;
    } catch (err) {
      error.value.addItems = err;
      Logger.error(`useCompareList/${ssrKey}/addItems`, err);
    } finally {
      loading.value = false;
    }
  };

  const removeItems = async (params: ComposableFunctionArgs<{ products }>) => {
    Logger.debug(`useCompareList/${ssrKey}/removeItems`, params);

    try {
      loading.value = true;
      const updatedCompareList = await _factoryParams.removeItems({
        currentCompareList: compareList.value,
        ...params,
      });
      error.value.removeItems = null;
      compareList.value = updatedCompareList;
    } catch (err) {
      error.value.removeItems = err;
      Logger.error(`useCompareList/${ssrKey}/removeItems`, err);
    } finally {
      loading.value = false;
    }
  };

  const isInCompareList = ({ product }) => _factoryParams.isInCompareList({
    currentCompareList: compareList.value,
    product,
  });

  return {
    compareList: computed(() => compareList.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    reset,
    load,
    loadCustomerCompareList,
    create,
    clear,
    assignToCustomer,
    addItems,
    removeItems,
    isInCompareList,
  };
};
