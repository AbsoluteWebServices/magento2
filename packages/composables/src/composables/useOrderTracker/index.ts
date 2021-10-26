import {
  Context,
  UseUserOrderFactoryParams
} from '@absolute-web/vsf-core';
import { useUserOrderFactory } from '../../factories/useUserOrderFactory';
import { CustomerOrders, FocusTrackedOrdersQueryVariables } from '@absolute-web/magento-api';

const factoryParams: UseUserOrderFactoryParams<CustomerOrders, FocusTrackedOrdersQueryVariables> = {
  searchOrders: async (context: Context, param): Promise<CustomerOrders> => {
    const { data } = await context.$magento.api.orderTracker(param);

    return (data.trackedOrder || {}) as unknown as CustomerOrders;
  },
};

export default useUserOrderFactory<CustomerOrders, FocusTrackedOrdersQueryVariables>(factoryParams);
