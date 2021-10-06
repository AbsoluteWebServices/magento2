import {
    Context,
  } from '@vue-storefront/core';
import { CustomerReturnsQuery } from '@vue-storefront/magento-api';
import { UseCustomerReturns } from '../../types/composables';
import { UseCustomerReturnsFactory, useCustomerReturnsFactory } from '../../factories/useCustomerReturnsFactory';
const factoryParams: UseCustomerReturnsFactory<CustomerReturnsQuery> = {
  search: async (context: Context, params): Promise<CustomerReturnsQuery> => {
    const { data } = await context.$magento.api.customerReturns(params);
    return data;
  },
};
const useCustomerReturns:
  (cacheId?: string) => UseCustomerReturns<CustomerReturnsQuery> = useCustomerReturnsFactory<CustomerReturnsQuery>(factoryParams);
export default useCustomerReturns;
