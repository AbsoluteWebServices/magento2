import {
  Context,
} from '@absolute-web/vsf-core';
import { CustomerOrders, FocusTrackedOrdersQueryVariables } from '@absolute-web/magento-api';
import { useUserOrderFactory, UseUserOrderFactoryParams } from '../../factories/useUserOrderFactory';

const factoryParams: UseUserOrderFactoryParams<CustomerOrders, FocusTrackedOrdersQueryVariables> = {
  searchOrders: async (context: Context, params): Promise<CustomerOrders> => {
    const {
      customQuery,
      signal,
      ...searchParams
    } = params;

    const { data } = await context.$magento.api.orderTracker(searchParams, customQuery, signal);

    return (data.trackedOrder || {}) as unknown as CustomerOrders;
  },
};

export default useUserOrderFactory<CustomerOrders, FocusTrackedOrdersQueryVariables>(factoryParams);
