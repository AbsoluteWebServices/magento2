import {
    Context,
  } from '@vue-storefront/core';
import { FocusIDmeCustomerData } from '@vue-storefront/magento-api';
import { UseIDmeVerify } from '../../types/composables';
import { UseIDmeVerifyFactory, useIDmeVerifyFactory } from '../../factories/useIDmeVerifyFactory';
const factoryParams: UseIDmeVerifyFactory<FocusIDmeCustomerData> = {
  load: async (context: Context, params): Promise<FocusIDmeCustomerData> => {
    const { data } = await context.$magento.api.focusIDmeVerify(params);
    return data.focusIDmeVerify;
  },
};
const useIDmeVerify:
  (cacheId?: string) => UseIDmeVerify<FocusIDmeCustomerData> = useIDmeVerifyFactory<FocusIDmeCustomerData>(factoryParams);
export default useIDmeVerify;
