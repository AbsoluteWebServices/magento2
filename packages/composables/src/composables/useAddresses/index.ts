/* eslint-disable no-param-reassign, consistent-return */
import {
  Context,
  Logger,
} from '@absolute-web/vsf-core';
import { CustomerAddress, CustomerAddressInput } from '@absolute-web/magento-api';
import {
  transformUserCreateAddressInput,
  transformUserUpdateAddressInput,
} from '../../helpers/userAddressManipulator';
import { useAddressesFactory, UseAddressesParams } from '../../factories/useAddressesFactory';
import { CustomQueryParams } from '../../types/composables';

type SaveAddressInput = {
  address: CustomerAddressInput,
} & CustomQueryParams;

type UpdateAddressInput = {
  address: CustomerAddressInput,
} & CustomQueryParams;

type RemoveAddressInput = {
  address: {
    id: number;
  }
} & CustomQueryParams;

const factoryParams: UseAddressesParams<CustomerAddress,
CustomQueryParams,
SaveAddressInput,
UpdateAddressInput,
RemoveAddressInput> = {
  load: async (context: Context, params?: CustomQueryParams) => {
    Logger.debug('[Magento] load user addresses');

    const {
      customQuery,
      signal
    } = params;

    const { data } = await context.$magento.api.getCustomerAddresses(undefined, customQuery, signal);

    return data.customer.addresses;
  },
  save: async (context: Context, params) => {
    Logger.debug('[Magento] save user address:', params.address);

    const {
      customQuery,
      signal,
      ...saveParams
    } = params;

    const { data } = await context.$magento.api.createCustomerAddress(
      transformUserCreateAddressInput(saveParams),
      customQuery,
      signal
    );

    Logger.debug('[Result]:', { data });

    return data.createCustomerAddress;
  },
  remove: async (context: Context, params) => {
    Logger.debug('[Magento] remove user addresses');

    const {
      customQuery,
      signal,
      ...deleteParams
    } = params;

    const { data } = await context.$magento.api.deleteCustomerAddress(
      deleteParams.address.id,
      customQuery,
      signal
    );

    Logger.debug('[Result]:', { data });

    return !!data.deleteCustomerAddress;
  },
  update: async (context: Context, params) => {
    Logger.debug('[Magento] update user addresses', params);

    const {
      customQuery,
      signal,
      ...updateParams
    } = params;

    const { data } = await context.$magento.api.updateCustomerAddress(
      transformUserUpdateAddressInput(updateParams),
      customQuery,
      signal
    );

    Logger.debug('[Result]:', { data });

    return data.updateCustomerAddress;
  },
};

export default useAddressesFactory(factoryParams);
