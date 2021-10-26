import {
  Context,
  Logger,
  useUserBillingFactory,
  UseUserBillingFactoryParams,
} from '@absolute-web/vsf-core';

import { CustomerAddress } from '@absolute-web/magento-api';
import useUser from '../useUser';
import { transformUserCreateAddressInput, transformUserUpdateAddressInput } from '../../helpers/userAddressManipulator';

const factoryParams: UseUserBillingFactoryParams<any, any> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  addAddress: async (context: Context, params?) => {
    Logger.debug('[Magento]: add billing address', { params });

    const { data } = await context.$magento.api.createCustomerAddress(transformUserCreateAddressInput(params), params?.customQuery || {});

    Logger.debug('[Result]:', { data });

    return data.createCustomerAddress;
  },

  deleteAddress: async (context: Context, params?) => {
    Logger.debug('[Magento] delete billing address', { params });

    const { data } = await context.$magento.api.deleteCustomerAddress(params.address.id, params?.customQuery || {});

    Logger.debug('[Result]:', { data });

    return data.deleteCustomerAddress;
  },

  updateAddress: async (context: Context, params?) => {
    Logger.debug('[Magento] update billing address', { params });

    const { data } = await context.$magento.api.updateCustomerAddress(transformUserUpdateAddressInput(params), params?.customQuery || {});

    Logger.debug('[Result]:', { data });

    return data.updateCustomerAddress;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, _params?) => {
    Logger.debug('[Magento] load user address');

    if (!context.user.user?.value?.id) {
      await context.user.load();
    }

    return context.user.user?.value;
  },

  setDefaultAddress: async (context: Context, params?) => {
    Logger.debug('[Magento] setDefaultAddress');

    const { data } = await context.$magento.api.updateCustomerAddress(transformUserUpdateAddressInput(params), params?.customQuery || {});

    Logger.debug('[Result]:', { data });

    return data.updateCustomerAddress;
  },

};

export default useUserBillingFactory<any, CustomerAddress>(factoryParams);
