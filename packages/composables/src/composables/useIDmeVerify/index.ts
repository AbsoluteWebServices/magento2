import {
  Context,
} from '@absolute-web/vsf-core';
import { FocusIDmeCustomerData } from '@absolute-web/magento-api';
import { UseIDmeVerify } from '../../types/composables';
import { UseIDmeVerifyFactory, useIDmeVerifyFactory } from '../../factories/useIDmeVerifyFactory';

const factoryParams: UseIDmeVerifyFactory<FocusIDmeCustomerData> = {
  load: async (context: Context, params): Promise<FocusIDmeCustomerData> => {
    const {
      customQuery,
      signal,
      ...loadParams
    } = params;

    const { data } = await context.$magento.api.focusIDmeVerify(loadParams, customQuery, signal);
    return data.focusIDmeVerify;
  },
};
const useIDmeVerify: (cacheId?: string) => UseIDmeVerify<FocusIDmeCustomerData> = useIDmeVerifyFactory<FocusIDmeCustomerData>(factoryParams);
export default useIDmeVerify;
