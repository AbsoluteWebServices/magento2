/* istanbul ignore file */
import {
  Context,
  Logger,
} from '@absolute-web/vsf-core';
import { GetOrdersSearchParams } from '@absolute-web/magento-api';
import useUser from '../useUser';
import { useUserOrderFactory, UseUserOrderFactoryParams } from '../../factories/useUserOrderFactory';

const factoryParams: UseUserOrderFactoryParams<any, GetOrdersSearchParams> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params) => {
    Logger.debug('[Magento] search user orders', { params });

    const {
      customQuery,
      signal,
      ...searchParams
    } = params;

    if (!context.user.user?.value?.id) {
      await context.user.load({ signal });
    }

    const { data } = await context.$magento.api.customerOrders(searchParams, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.customer.orders;
  },
};

export default useUserOrderFactory<any, GetOrdersSearchParams>(factoryParams);
