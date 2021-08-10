import {
  CustomQuery, Context, FactoryParams, PlatformApi, sharedRef, Logger, configureFactoryParams,
} from '@vue-storefront/core';
import { computed, Ref } from 'vue-demi';
import { UseCart, UseCartErrors } from '../types/composables';

export interface UseCartFactoryParams<CART, CART_ITEM, PRODUCT, GIFT_CARD_ACCOUNT, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params: { customQuery?: any; realCart?: boolean; }) => Promise<CART>;
  addItem: (
    context: Context,
    params: {
      currentCart: CART;
      product: PRODUCT;
      quantity: any;
      customQuery?: CustomQuery;
    }
  ) => Promise<CART>;
  removeItem: (context: Context, params: { currentCart: CART; product: CART_ITEM; customQuery?: CustomQuery }) => Promise<CART>;
  updateItemQty: (
    context: Context,
    params: { currentCart: CART; product: CART_ITEM; quantity: number; customQuery?: CustomQuery }
  ) => Promise<CART>;
  clear: (context: Context, params: { currentCart: CART }) => Promise<CART>;
  applyCoupon: (context: Context, params: { currentCart: CART; couponCode: string; customQuery?: CustomQuery }) => Promise<{ updatedCart: CART }>;
  removeCoupon: (
    context: Context,
    params: { currentCart: CART; couponCode: string; customQuery?: CustomQuery }
  ) => Promise<{ updatedCart: CART }>;
  checkGiftCard: (context: Context, params: { giftCardCode: string }) => Promise<GIFT_CARD_ACCOUNT>;
  applyGiftCard: (context: Context, params: { currentCart: CART; giftCardCode: string; customQuery?: CustomQuery }) => Promise<{ updatedCart: CART }>;
  removeGiftCard: (
    context: Context,
    params: { currentCart: CART; giftCardCode: string; customQuery?: CustomQuery }
  ) => Promise<{ updatedCart: CART }>;
  isInCart: (context: Context, params: { currentCart: CART; product: PRODUCT }) => boolean;
}

export const useCartFactory = <CART, CART_ITEM, PRODUCT, GIFT_CARD_ACCOUNT, API extends PlatformApi = any>(
  factoryParams: UseCartFactoryParams<CART, CART_ITEM, PRODUCT, GIFT_CARD_ACCOUNT, API>,
) => function useCart(): UseCart<CART, CART_ITEM, PRODUCT, GIFT_CARD_ACCOUNT, API> {
  const loading: Ref<boolean> = sharedRef(false, 'useCart-loading');
  const cart: Ref<CART> = sharedRef(null, 'useCart-cart');
  const error: Ref<UseCartErrors> = sharedRef({
    addItem: null,
    removeItem: null,
    updateItemQty: null,
    load: null,
    clear: null,
    applyCoupon: null,
    removeCoupon: null,
    checkGiftCard: null,
    applyGiftCard: null,
    removeGiftCard: null,
  }, 'useCart-error');

  // eslint-disable-next-line no-underscore-dangle,@typescript-eslint/naming-convention
  const _factoryParams = configureFactoryParams(
    factoryParams,
    {
      mainRef: cart,
      alias: 'currentCart',
      loading,
      error,
    },
  );

  const setCart = (newCart: CART) => {
    cart.value = newCart;
    Logger.debug('useCartFactory.setCart', newCart);
  };

  const addItem = async ({
    product,
    quantity,
    customQuery,
  }) => {
    Logger.debug('useCart.addItem', {
      product,
      quantity,
    });

    try {
      loading.value = true;
      const updatedCart = await _factoryParams.addItem({
        currentCart: cart.value,
        product,
        quantity,
        customQuery,
      });
      error.value.addItem = null;
      cart.value = updatedCart;
    } catch (err) {
      error.value.addItem = err;
      Logger.error('useCart/addItem', err);
    } finally {
      loading.value = false;
    }
  };

  const removeItem = async ({
    product,
    customQuery,
  }) => {
    Logger.debug('useCart.removeItem', { product });

    try {
      loading.value = true;
      const updatedCart = await _factoryParams.removeItem({
        currentCart: cart.value,
        product,
        customQuery,
      });
      error.value.removeItem = null;
      cart.value = updatedCart;
    } catch (err) {
      error.value.removeItem = err;
      Logger.error('useCart/removeItem', err);
    } finally {
      loading.value = false;
    }
  };

  const updateItemQty = async ({
    product,
    quantity,
    customQuery,
  }) => {
    Logger.debug('useCart.updateItemQty', {
      product,
      quantity,
    });

    if (quantity && quantity > 0) {
      try {
        loading.value = true;
        const updatedCart = await _factoryParams.updateItemQty({
          currentCart: cart.value,
          product,
          quantity,
          customQuery,
        });
        error.value.updateItemQty = null;
        cart.value = updatedCart;
      } catch (err) {
        error.value.updateItemQty = err;
        Logger.error('useCart/updateItemQty', err);
      } finally {
        loading.value = false;
      }
    }
  };

  const load = async ({ customQuery } = { customQuery: undefined }) => {
    Logger.debug('useCart.load');

    if (cart.value) {
      /**
         * Triggering change for hydration purpose,
         * temporary issue related with cpapi plugin
         */
      loading.value = false;
      error.value.load = null;
      cart.value = { ...cart.value };
      return;
    }
    try {
      loading.value = true;
      cart.value = await _factoryParams.load({ customQuery });
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('useCart/load', err);
    } finally {
      loading.value = false;
    }
  };

  const clear = async () => {
    Logger.debug('useCart.clear');

    try {
      loading.value = true;
      const updatedCart = await _factoryParams.clear({ currentCart: cart.value });
      error.value.clear = null;
      cart.value = updatedCart;
    } catch (err) {
      error.value.clear = err;
      Logger.error('useCart/clear', err);
    } finally {
      loading.value = false;
    }
  };

  const isInCart = ({ product }) => _factoryParams.isInCart({
    currentCart: cart.value,
    product,
  });

  const applyCoupon = async ({
    couponCode,
    customQuery,
  }) => {
    Logger.debug('useCart.applyCoupon');

    try {
      loading.value = true;
      const { updatedCart } = await _factoryParams.applyCoupon({
        currentCart: cart.value,
        couponCode,
        customQuery,
      });
      error.value.applyCoupon = null;
      cart.value = updatedCart;
    } catch (err) {
      error.value.applyCoupon = err;
      Logger.error('useCart/applyCoupon', err);
    } finally {
      loading.value = false;
    }
  };

  const removeCoupon = async ({
    couponCode,
    customQuery,
  }) => {
    Logger.debug('useCart.removeCoupon');

    try {
      loading.value = true;
      const { updatedCart } = await _factoryParams.removeCoupon({
        currentCart: cart.value,
        couponCode,
        customQuery,
      });
      error.value.removeCoupon = null;
      cart.value = updatedCart;
      loading.value = false;
    } catch (err) {
      error.value.removeCoupon = err;
      Logger.error('useCart/removeCoupon', err);
    } finally {
      loading.value = false;
    }
  };

  const checkGiftCard = async ({ giftCardCode }) => {
    Logger.debug('useCart.checkGiftCard');

    try {
      loading.value = true;
      const result = await _factoryParams.checkGiftCard({
        giftCardCode
      });
      error.value.checkGiftCard = null;
      return result;
    } catch (err) {
      error.value.checkGiftCard = err;
      Logger.error('useCart/checkGiftCard', err);
    } finally {
      loading.value = false;
    }
  };

  const applyGiftCard = async ({ giftCardCode, customQuery }) => {
    Logger.debug('useCart.applyGiftCard');

    try {
      loading.value = true;
      const { updatedCart } = await _factoryParams.applyGiftCard({
        currentCart: cart.value,
        giftCardCode,
        customQuery
      });
      error.value.applyGiftCard = null;
      cart.value = updatedCart;
    } catch (err) {
      error.value.applyGiftCard = err;
      Logger.error('useCart/applyGiftCard', err);
    } finally {
      loading.value = false;
    }
  };

  const removeGiftCard = async ({ giftCardCode, customQuery }) => {
    Logger.debug('useCart.removeGiftCard');

    try {
      loading.value = true;
      const { updatedCart } = await _factoryParams.removeGiftCard({
        currentCart: cart.value,
        giftCardCode,
        customQuery
      });
      error.value.removeGiftCard = null;
      cart.value = updatedCart;
      loading.value = false;
    } catch (err) {
      error.value.removeGiftCard = err;
      Logger.error('useCart/removeGiftCard', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    api: _factoryParams.api,
    setCart,
    cart: computed(() => cart.value),
    isInCart,
    addItem,
    load,
    removeItem,
    clear,
    updateItemQty,
    applyCoupon,
    removeCoupon,
    checkGiftCard,
    applyGiftCard,
    removeGiftCard,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};
