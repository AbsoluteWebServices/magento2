import { Context } from '@vue-storefront/core';
import { Return, CustomerReturnQueryVariables } from '@vue-storefront/magento-api';
import { UseCustomerReturn } from '../../types/composables';
import { UseCustomerReturnFactory, useCustomerReturnFactory } from '../../factories/useCustomerReturnFactory';
const factoryParams: UseCustomerReturnFactory<Return, CustomerReturnQueryVariables> = {
  loadReturn: async (context: Context, params: CustomerReturnQueryVariables) => {
    const { data } = await context.$magento.api.customerReturn(params);
    return data?.customer?.return;
  },
};

const useCustomerReturn: (cacheId?: string) => UseCustomerReturn<Return, CustomerReturnQueryVariables> = useCustomerReturnFactory<
  Return,
  CustomerReturnQueryVariables
>(factoryParams);

export default useCustomerReturn;
