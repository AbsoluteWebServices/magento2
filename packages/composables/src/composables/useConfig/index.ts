import { Context } from '@absolute-web/vsf-core';
import { StoreConfig } from '@absolute-web/magento-api';
import useUser from '../useUser';
import { useConfigFactory, UseConfigFactoryParams } from '../../factories/useConfigFactory';
import { UseConfig } from '../../types/composables';

const factoryParams: UseConfigFactoryParams<StoreConfig> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  loadConfig: async (context: Context, params) => {
    const { data } = await context.$magento.getApi.storeConfig();

    context.$magento.config.state.setContext(data.cacheId || null);
    context.user.updateContext();

    return data.storeConfig || {};
  },
};

const useConfig: (cacheId?: string) => UseConfig<StoreConfig> = useConfigFactory<StoreConfig>(factoryParams);

export default useConfig;
