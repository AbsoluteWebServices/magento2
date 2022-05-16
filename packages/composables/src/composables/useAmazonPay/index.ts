import {
  Context,
} from '@absolute-web/vsf-core';
import {
  CheckoutSessionConfigOutput,
  CheckoutSessionDetailsOutput,
} from '@absolute-web/magento-api';
import { useAmazonPayFactory, UseAmazonPayFactoryParams } from '../../factories/useAmazonPayFactory';

const factoryParams: UseAmazonPayFactoryParams<CheckoutSessionConfigOutput, CheckoutSessionDetailsOutput> = {
  loadConfig: async (context: Context, params) => {
    const {
      customQuery,
      signal,
    } = params;

    const apiState = context.$magento.config.state;
    const cartId = apiState.getCartId();
    const input = {
      cartId
    }
    const { data } = await context.$magento.api.checkoutSessionConfig(input, customQuery, signal);
    return data.checkoutSessionConfig;
  },
  loadSession: async (context: Context, params) => {
    const {
      customQuery,
      signal,
      amazonSessionId,
      queryTypes,
    } = params;

    const loadParams = {
      amazonSessionId,
      queryTypes: queryTypes || ['shipping', 'billing', 'payment'],
    };

    const { data } = await context.$magento.api.checkoutSessionDetails(loadParams, customQuery, signal);
    return data.checkoutSessionDetails;
  },
  updateSession: async (context: Context, params) => {
    const {
      customQuery,
      signal,
      amazonSessionId,
    } = params;

    const apiState = context.$magento.config.state;
    const cartId = apiState.getCartId();
    const input = {
      amazonSessionId,
      cartId
    }
    const { data } = await context.$magento.api.updateCheckoutSession(input, customQuery, signal);
    return data.updateCheckoutSession?.redirectUrl;
  },
};

const useAmazonPay = useAmazonPayFactory<CheckoutSessionConfigOutput, CheckoutSessionDetailsOutput>(factoryParams);

export default useAmazonPay;
