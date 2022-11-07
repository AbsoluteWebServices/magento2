import { Context } from '@absolute-web/vsf-core';
import { FocusDeliveryTime, FocusDeliveryTimeForAddressInput } from '@absolute-web/magento-api';
import { UseDeliveryTimeFactoryParams, useDeliveryTimeFactory } from '../../factories/useDeliveryTimeFactory';

const factoryParams: UseDeliveryTimeFactoryParams<FocusDeliveryTime, FocusDeliveryTimeForAddressInput> = {
  search: async (context: Context, params): Promise<FocusDeliveryTime[]> => {
    const {
      customQuery,
      signal,
      ...searchParams
    } = params;

    const { data } = await context.$magento.getApi.focusDeliveryTimeForAddress(searchParams, customQuery, signal);

    return data.focusDeliveryTimeForAddress;
  },
};

const useDeliveryTime = useDeliveryTimeFactory<FocusDeliveryTime, FocusDeliveryTimeForAddressInput>(factoryParams);

export default useDeliveryTime;
