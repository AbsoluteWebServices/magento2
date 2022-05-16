import {
  Context, Logger,
} from '@absolute-web/vsf-core';
import { Order, PaymentMethodInput } from '@absolute-web/magento-api';
import { useMakeOrderFactory, UseMakeOrderFactoryParams } from '../../factories/useMakeOrderFactory';
import useCart from '../useCart';

const factoryParams: UseMakeOrderFactoryParams<Order, PaymentMethodInput> = {
  provide() {
    return {
      cart: useCart(),
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, params): Promise<Order> => {
    Logger.debug('[Magento] Make Order', { params });
    const { compliance: { value: compliance }, cart: { value: { id } } } = context.cart;

    const {
      customQuery,
      signal
    } = params;

    const { data } = await context.$magento.api.placeOrder({ cart_id: id, ...compliance }, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.placeOrder.order;
  },

  setPaymentAndMake: async (context: Context, params): Promise<Order> => {
    Logger.debug('[Magento] Make Order', params);
    const { compliance: { value: compliance }, cart: { value: { id } } } = context.cart;

    const {
      customQuery,
      signal,
      paymentMethod
    } = params;

    const { data } = await context.$magento.api.setPaymentMethodAndPlaceOrder({
      setPaymentMethod: {
        cart_id: id,
        payment_method: {
          ...paymentMethod,
        },
      },
      placeOrder: {
        cart_id: id,
        ...compliance
      }
    }, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.placeOrder.order;
  },
  completeAmazonPay: async (context: Context, params): Promise<Order> => {
    Logger.debug('[Magento] Make Amazon Pay Order', { params });
    const { compliance: { value: compliance }, cart: { value: { id } } } = context.cart;

    const {
      customQuery,
      signal,
      amazonSessionId,
    } = params;

    const { data } = await context.$magento.api.completeCheckoutSession({
      cartId: id,
      amazonSessionId,
      ...compliance
    }, customQuery, signal);

    Logger.debug('[Result]:', { data });

    if (!data.completeCheckoutSession.success) {
      throw new Error(data.completeCheckoutSession.message);
    }

    return {
      order_number: data.completeCheckoutSession.increment_id
    };
  },
};

const useMakeOrder = useMakeOrderFactory<Order, PaymentMethodInput>(factoryParams);

export default useMakeOrder;
