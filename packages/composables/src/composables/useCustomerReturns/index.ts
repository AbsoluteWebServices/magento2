import {
    Context,
  } from '@vue-storefront/core';
import { CustomerReturnsQueryFocus } from '@vue-storefront/magento-api';
import { UseCustomerReturns } from '../../types/composables';
import { UseCustomerReturnsFactory, useCustomerReturnsFactory } from '../../factories/useCustomerReturnsFactory';
const factoryParams: UseCustomerReturnsFactory<CustomerReturnsQueryFocus> = {
  search: async (context: Context, params): Promise<CustomerReturnsQueryFocus> => {
    const { data } = await context.$magento.api.customerReturns(params);
    return data;
  },
};
const useCustomerReturns:
  (cacheId?: string) => UseCustomerReturns<CustomerReturnsQueryFocus> = useCustomerReturnsFactory<CustomerReturnsQueryFocus>(factoryParams);
export default useCustomerReturns;
