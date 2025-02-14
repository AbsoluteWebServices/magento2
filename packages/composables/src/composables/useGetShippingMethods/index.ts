import {
  Context, Logger,
} from '@absolute-web/vsf-core';
import { ShippingMethod } from '@absolute-web/magento-api';
import { UseGetShippingMethodsFactory, useGetShippingMethodsFactory } from '../../factories/useGetShippingMethodsFactory';

const factoryParams: UseGetShippingMethodsFactory<ShippingMethod> = {
  load: async (context: Context, params): Promise<ShippingMethod[]> => {
    const apiState = context.$magento.config.state;
    Logger.debug('[Magento]: Load shipping methods', { params });
    const customerToken = apiState.getCustomerToken();

    const {
      customQuery,
      signal
    } = params;

    if (customerToken) {
      try {
        const { data: customerData } = await context.$magento.api.getAvailableCustomerShippingMethods(undefined, customQuery, signal);
        Logger.debug('[Result]:', { data: customerData });

        return customerData.customerCart.shipping_addresses.length > 0 ? customerData.customerCart.shipping_addresses[0].available_shipping_methods : [];
      } catch (err) {
        if (err.message.includes('Failed to fetch')) {
          throw err;
        }
        apiState.setCustomerToken();
      }
    }

    const cartId = apiState.getCartId();

    try {
      const { data } = await context.$magento.api.getAvailableShippingMethods({ cartId }, customQuery, signal);

      Logger.debug('[Result]:', { data });

      const methods = data.cart?.shipping_addresses[0]?.available_shipping_methods || [];

      return methods.filter((method) => method.available);
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        throw err;
      }
      apiState.setCartId();
    }
  },
};

const useGetShippingMethods = useGetShippingMethodsFactory<ShippingMethod>(factoryParams);

export default useGetShippingMethods;
