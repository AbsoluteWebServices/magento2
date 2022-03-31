import {
  Context,
} from '@absolute-web/vsf-core';
import { ShippingMethod } from '@absolute-web/magento-api';
import { UseEstimateShippingMethods } from '../../types/composables';
import { UseEstimateShippingMethodsFactory, useEstimateShippingMethodsFactory } from '../../factories/useEstimateShippingMethodsFactory';

const factoryParams: UseEstimateShippingMethodsFactory<ShippingMethod> = {
  load: async (context: Context, params): Promise<ShippingMethod[]> => {
    const { data } = await context.$magento.api.focusEstimateShippingMethods(params);
    const methods = data.focusEstimateShippingMethods || [];

    return methods.filter((method) => method.available);
  },
};

const useEstimateShippingMethods:
  (cacheId?: string) => UseEstimateShippingMethods<ShippingMethod> = useEstimateShippingMethodsFactory<ShippingMethod>(factoryParams);

export default useEstimateShippingMethods;
