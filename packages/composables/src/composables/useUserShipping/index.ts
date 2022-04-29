import {
  Context,
  Logger,
  useUserShippingFactory,
  UseUserShippingFactoryParams,
} from '@absolute-web/vsf-core';
import useUser from '../useUser';
import { transformUserCreateAddressInput, transformUserUpdateAddressInput } from '../../helpers/userAddressManipulator';

const factoryParams: UseUserShippingFactoryParams<any, any> = {
  provide() {
    return {
      user: useUser(),
    };
  },

  addAddress: async (context: Context, params) => {
    Logger.debug('[Magento]: add shipping address', { params });

    const {
      customQuery,
      signal,
      ...userData
    } = params;

    const { data } = await context.$magento.api.createCustomerAddress(
      transformUserCreateAddressInput(userData),
      customQuery,
      signal
    );

    Logger.debug('[Result]:', { data });

    return data.createCustomerAddress;
  },

  deleteAddress: async (context: Context, params) => {
    Logger.debug('[Magento] delete shipping address', { params });

    const {
      customQuery,
      signal,
      address
    } = params;

    const { data } = await context.$magento.api.deleteCustomerAddress(address.id, customQuery, signal);

    return data.deleteCustomerAddress;
  },

  updateAddress: async (context: Context, params) => {
    Logger.debug('[Magento] update shipping address', { params });

    const {
      customQuery,
      signal,
      ...userData
    } = params;

    const { data } = await context.$magento.api.updateCustomerAddress(transformUserUpdateAddressInput(userData), customQuery, signal);

    return data.updateCustomerAddress;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params) => {
    Logger.debug('[Magento] load user address');

    const {
      customQuery,
      signal
    } = params;

    if (!context.user.user?.value?.email) {
      await context.user.load(undefined, customQuery, signal);
    }

    return context.user.user?.value;
  },

  setDefaultAddress: async (context: Context, params) => {
    Logger.debug('[Magento] set default shipping address');

    const {
      customQuery,
      signal,
      ...userData
    } = params;

    const { data } = await context.$magento.api.updateCustomerAddress(transformUserUpdateAddressInput(userData), customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.updateCustomerAddress;
  },
};

export default useUserShippingFactory<any, any>(factoryParams);
