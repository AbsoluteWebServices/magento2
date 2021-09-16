import {
  Context,
} from '@vue-storefront/core';
import { ShippingMethod } from '@vue-storefront/magento-api';
import { UseEstimateShippingMethods } from '../../types/composables';
import { UseEstimateShippingMethodsFactory, useEstimateShippingMethodsFactory } from '../../factories/useEstimateShippingMethodsFactory';

const factoryParams: UseEstimateShippingMethodsFactory<ShippingMethod> = {
  load: async (context: Context, params): Promise<ShippingMethod[]> => {
    const { data } = await context.$magento.api.focusEstimateShippingMethods(params);
    return data.focusEstimateShippingMethods || [];
  },
};

const useEstimateShippingMethods:
  (cacheId?: string) => UseEstimateShippingMethods<ShippingMethod> = useEstimateShippingMethodsFactory<ShippingMethod>(factoryParams);

export default useEstimateShippingMethods;
