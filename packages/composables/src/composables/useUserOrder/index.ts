/* istanbul ignore file */
import {
  Context,
  Logger,
  UseUserOrderFactoryParams,
} from '@vue-storefront/core';
import { CustomerOrders, CustomerOrdersQueryVariables } from '@vue-storefront/magento-api';
import { useUserOrderFactory } from '../../factories/useUserOrderFactory';
import useUser from '../useUser';

const factoryParams: UseUserOrderFactoryParams<CustomerOrders, CustomerOrdersQueryVariables> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, param): Promise<CustomerOrders> => {
    Logger.debug('[Magento] search user orders', { param });

    if (!context.user.user?.value?.id) {
      await context.user.load();
    }

    const { data } = await context.$magento.api.customerOrders(param);

    Logger.debug('[Result]:', { data });

    return (data.customer.orders || []) as unknown as CustomerOrders;
  },
};

export default useUserOrderFactory<CustomerOrders, CustomerOrdersQueryVariables>(factoryParams);
