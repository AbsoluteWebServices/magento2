import {
  Context,
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import { CustomerOrder, FocusTrackedOrdersQueryVariables } from '@vue-storefront/magento-api';

const factoryParams: UseUserOrderFactoryParams<CustomerOrder, FocusTrackedOrdersQueryVariables> = {
  searchOrders: async (context: Context, param): Promise<CustomerOrder> => {
    const { data } = await context.$magento.api.orderTracker(param);

    return (data?.trackedOrder?.items[0] || {}) as unknown as CustomerOrder;
  },
};

export default useUserOrderFactory<CustomerOrder, FocusTrackedOrdersQueryVariables>(factoryParams);
