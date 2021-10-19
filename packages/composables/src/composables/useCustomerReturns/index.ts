import { Context } from '@vue-storefront/core';
import { Returns, CustomerReturnsQueryVariables } from '@vue-storefront/magento-api';
import { UseCustomerReturns } from '../../types/composables';
import { UseCustomerReturnsFactory, useCustomerReturnsFactory } from '../../factories/useCustomerReturnsFactory';
const factoryParams: UseCustomerReturnsFactory<Returns, CustomerReturnsQueryVariables> = {
  loadReturns: async (context: Context, params: CustomerReturnsQueryVariables) => {
    const { data } = await context.$magento.api.customerReturns(params);
    return data?.customer?.returns;
  },
};

const useCustomerReturns: (cacheId?: string) => UseCustomerReturns<Returns, CustomerReturnsQueryVariables> = useCustomerReturnsFactory<
  Returns,
  CustomerReturnsQueryVariables
>(factoryParams);

export default useCustomerReturns;
