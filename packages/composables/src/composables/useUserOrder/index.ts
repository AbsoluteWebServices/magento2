/* istanbul ignore file */
import {
  Context,
  Logger,
  UseUserOrderFactoryParams,
} from '@absolute-web/vsf-core';
import { GetOrdersSearchParams } from '@absolute-web/magento-api';
import useUser from '../useUser';
import { useUserOrderFactory } from '../../factories/useUserOrderFactory';

const factoryParams: UseUserOrderFactoryParams<any, GetOrdersSearchParams> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params) => {
    Logger.debug('[Magento] search user orders', { params });

    if (!context.user.user?.value?.id) {
      await context.user.load();
    }

    const { data } = await context.$magento.api.customerOrders(params, params?.customQuery || {});

    Logger.debug('[Result]:', { data });

    return data.customer.orders;
  },
};

export default useUserOrderFactory<any, GetOrdersSearchParams>(factoryParams);
