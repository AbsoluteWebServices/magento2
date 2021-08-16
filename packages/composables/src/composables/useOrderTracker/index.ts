import {
  Context,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import { useUserOrderFactory } from '../../factories/useUserOrderFactory';
import { CustomerOrders, FocusTrackedOrdersQueryVariables } from '@vue-storefront/magento-api';

const factoryParams: UseUserOrderFactoryParams<CustomerOrders, FocusTrackedOrdersQueryVariables> = {
  searchOrders: async (context: Context, param): Promise<CustomerOrders> => {
    const { data } = await context.$magento.api.orderTracker(param);

    return (data.trackedOrder || {}) as unknown as CustomerOrders;
  },
};

export default useUserOrderFactory<CustomerOrders, FocusTrackedOrdersQueryVariables>(factoryParams);
