import { computed, Ref } from '@vue/composition-api';
import { Context, FactoryParams, PlatformApi, sharedRef, Logger, configureFactoryParams, ComposableFunctionArgs } from '@absolute-web/vsf-core';
import { UseMakeOrder, UseMakeOrderErrors } from '../types/composables';

export interface UseMakeOrderFactoryParams<ORDER, PAYMENT_METHOD, API extends PlatformApi = any> extends FactoryParams<API> {
  make: (context: Context, params: ComposableFunctionArgs<{}>) => Promise<ORDER>;
  setPaymentAndMake: (context: Context, params: ComposableFunctionArgs<{ paymentMethod: PAYMENT_METHOD }>) => Promise<ORDER>;
  completeAmazonPay: (context: Context, params: ComposableFunctionArgs<{ amazonSessionId: string }>) => Promise<ORDER>;
}

export const useMakeOrderFactory = <ORDER, PAYMENT_METHOD, API extends PlatformApi = any>(
  factoryParams: UseMakeOrderFactoryParams<ORDER, PAYMENT_METHOD, API>
) => {
  return function useMakeOrder(): UseMakeOrder<ORDER, PAYMENT_METHOD, API> {
    const order: Ref<ORDER> = sharedRef(null, 'useMakeOrder-order');
    const loading: Ref<boolean> = sharedRef(false, 'useMakeOrder-loading');
    const error: Ref<UseMakeOrderErrors> = sharedRef({
      make: null,
      setPaymentAndMake: null,
      completeAmazonPay: null,
    }, 'useMakeOrder-error');

    const _factoryParams = configureFactoryParams(
      factoryParams,
      { mainRef: order, alias: 'currentOrder', loading, error }
    );

    const make = async (params = { customQuery: null }) => {
      Logger.debug('useMakeOrder.make');

      try {
        loading.value = true;
        const createdOrder = await _factoryParams.make(params);
        error.value.make = null;
        order.value = createdOrder;
      } catch (err) {
        error.value.make = err;
        Logger.error('useMakeOrder.make', err);
      } finally {
        loading.value = false;
      }
    };

    const setPaymentAndMake = async (params = {}) => {
      Logger.debug('useMakeOrder.setPaymentAndMake', params);

      try {
        loading.value = true;
        const createdOrder = await _factoryParams.setPaymentAndMake(params);
        error.value.setPaymentAndMake = null;
        order.value = createdOrder;
      } catch (err) {
        error.value.setPaymentAndMake = err;
        Logger.error('useMakeOrder.setPaymentAndMake', err);
      } finally {
        loading.value = false;
      }
    };

    const completeAmazonPay = async (params = {}) => {
      Logger.debug('useMakeOrder.completeAmazonPay', params);

      try {
        loading.value = true;
        order.value = await _factoryParams.completeAmazonPay(params);
        error.value.completeAmazonPay = null;
      } catch (err) {
        error.value.completeAmazonPay = err;
        Logger.error('useMakeOrder.completeAmazonPay', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      api: _factoryParams.api,
      order,
      make,
      setPaymentAndMake,
      completeAmazonPay,
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
};
