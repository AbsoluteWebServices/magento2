import {
  CustomQuery, Context, FactoryParams, PlatformApi, sharedRef, Logger, configureFactoryParams, ComposableFunctionArgs,
} from '@absolute-web/vsf-core';
import { computed, Ref } from '@vue/composition-api';
import { GraphQLError } from 'graphql';
import { UseCart, UseCartErrors, CartCompliance } from '../types/composables';

export interface UseCartFactoryParams<CART, CART_ITEM, PRODUCT, GIFT_CARD_ACCOUNT, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params: ComposableFunctionArgs<{ realCart?: boolean; }>) => Promise<{ updatedCart: CART, errors?: readonly GraphQLError[] }>;
  addItem: (
    context: Context,
    params: ComposableFunctionArgs<{
      currentCart: CART;
      product: PRODUCT;
      quantity: any;
      enteredOptions?: any;
    }>
  ) => Promise<{ updatedCart: CART, errors?: readonly GraphQLError[] }>;
  addItems: (
    context: Context,
    params: ComposableFunctionArgs<{
      currentCart: CART;
      products: {
        product: PRODUCT;
        quantity: any;
        enteredOptions?: any;
      }[];
    }>
  ) => Promise<{ updatedCart: CART, errors?: readonly GraphQLError[] }>;
  removeItem: (context: Context, params: ComposableFunctionArgs<{ currentCart: CART; product: CART_ITEM; }>) => Promise<{ updatedCart: CART, errors?: readonly GraphQLError[] }>;
  updateItemQty: (
    context: Context,
    params: ComposableFunctionArgs<{ currentCart: CART; product: CART_ITEM; quantity: number; }>
  ) => Promise<{ updatedCart: CART, errors?: readonly GraphQLError[] }>;
  clear: (context: Context, params: { currentCart: CART }) => Promise<{ updatedCart: CART, errors?: readonly GraphQLError[] }>;
  applyCoupon: (context: Context, params: ComposableFunctionArgs<{ currentCart: CART; couponCode: string; }>) => Promise<{ updatedCart: CART, errors?: readonly GraphQLError[] }>;
  removeCoupon: (
    context: Context,
    params: ComposableFunctionArgs<{ currentCart: CART; couponCode: string; }>
  ) => Promise<{ updatedCart: CART, errors?: readonly GraphQLError[] }>;
  checkGiftCard: (context: Context, params: ComposableFunctionArgs<{ giftCardCode: string }>) => Promise<GIFT_CARD_ACCOUNT>;
  applyGiftCard: (context: Context, params: ComposableFunctionArgs<{ currentCart: CART; giftCardCode: string; customQuery?: CustomQuery }>) => Promise<{ updatedCart: CART, errors?: readonly GraphQLError[] }>;
  removeGiftCard: (
    context: Context,
    params: ComposableFunctionArgs<{ currentCart: CART; giftCardCode: string; customQuery?: CustomQuery }>
  ) => Promise<{ updatedCart: CART, errors?: readonly GraphQLError[] }>;
  isInCart: (context: Context, params: { currentCart: CART; product: PRODUCT }) => boolean;
  focusSetGroupOnItem: (context: Context, params: ComposableFunctionArgs<{ currentCart: CART; product: CART_ITEM; groupType: string; }>) => Promise<{ updatedCart: CART, errors?: readonly GraphQLError[] }>;
  focusUpdateCartGroup: (context: Context, params: ComposableFunctionArgs<{ currentCart: CART; groupType: string; data: any }>) => Promise<{ updatedCart: CART, errors?: readonly GraphQLError[] }>;
  focusUnsetPickupDate: (context: Context, params: ComposableFunctionArgs<{ currentCart: CART }>) => Promise<{ updatedCart: CART, errors?: readonly GraphQLError[] }>;
  getCartToken: (context: Context) => string;
  setCartToken: (context: Context, token: string) => void;
}

export const useCartFactory = <CART, CART_ITEM, PRODUCT, GIFT_CARD_ACCOUNT, API extends PlatformApi = any>(
  factoryParams: UseCartFactoryParams<CART, CART_ITEM, PRODUCT, GIFT_CARD_ACCOUNT, API>,
) => function useCart(): UseCart<CART, CART_ITEM, PRODUCT, GIFT_CARD_ACCOUNT, API> {
  const loading: Ref<boolean> = sharedRef(false, 'useCart-loading');
  const cart: Ref<CART> = sharedRef(null, 'useCart-cart');
  const error: Ref<UseCartErrors> = sharedRef({
    addItem: null,
    addItems: null,
    removeItem: null,
    updateItemQty: null,
    load: null,
    clear: null,
    applyCoupon: null,
    removeCoupon: null,
    checkGiftCard: null,
    applyGiftCard: null,
    removeGiftCard: null,
    focusSetGroupOnItem: null,
    focusUpdateCartGroup: null,
    focusUnsetPickupDate: null,
  }, 'useCart-error');
  const token = sharedRef<string>(null, 'useCart-token');

  const compliance: Ref<CartCompliance> = sharedRef({
    itar: false,
    twenty_one_and_over: false,
  }, 'useCart-compliance');

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
    cart.value = null;
    let items = (newCart as any)?.items;
    if (items?.length) {
      items = items.filter((item) => item);
    }
    cart.value = newCart ? {
      ...newCart,
      ...(items ? { items } : {}),
    } : newCart;
    Logger.debug('useCartFactory.setCart', newCart);
  };

  const updateToken = () => {
    const _token = _factoryParams.getCartToken();
    if (!token.value !== !_token) {
      token.value = _token;
    }
  };

  const setToken = (_token: string) => {
    if (!token.value !== !_token) {
      token.value = _token;
      _factoryParams.setCartToken(_token);
    }
  };

  const setCompliance = (value: CartCompliance) => {
    compliance.value = {
      ...compliance.value,
      ...value,
    };
  };

  const addItems = async (params: ComposableFunctionArgs<{ products }>) => {
    Logger.debug('useCart.addItems', params);

    try {
      loading.value = true;
      error.value.addItems = null;
      const { updatedCart, errors } = await _factoryParams.addItems({
        currentCart: cart.value,
        ...params,
      });
      if (errors) {
        error.value.addItems = errors;
      }
      cart.value = updatedCart;
      updateToken();
    } catch (err) {
      error.value.addItems = err;
      Logger.error('useCart/addItems', err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * @deprecated
   */
  const addItem = async (params: ComposableFunctionArgs<{
    product,
    quantity,
    enteredOptions,
  }>) => {
    Logger.debug('useCart.addItem', params);

    const {
      product,
      quantity,
      enteredOptions,
      customQuery,
      signal
    } = params;

    try {
      loading.value = true;
      error.value.addItem = null;
      await addItems({ products: [{ product, quantity, enteredOptions }], customQuery, signal });

      if (error.value.addItems) {
        throw error.value.addItems;
      }
    } catch (err) {
      error.value.addItem = err;
      Logger.error('useCart/addItem', err);
    } finally {
      loading.value = false;
    }
  };

  const removeItem = async (params: ComposableFunctionArgs<{ product }>) => {
    Logger.debug('useCart.removeItem', params);

    try {
      loading.value = true;
      error.value.removeItem = null;
      const { updatedCart, errors } = await _factoryParams.removeItem({
        currentCart: cart.value,
        ...params,
      });
      if (errors) {
        error.value.removeItem = errors;
      }
      cart.value = updatedCart;
    } catch (err) {
      error.value.removeItem = err;
      Logger.error('useCart/removeItem', err);
    } finally {
      loading.value = false;
    }
  };

  const updateItemQty = async (params: ComposableFunctionArgs<{
    product,
    quantity,
  }>) => {
    Logger.debug('useCart.updateItemQty', params);

    const {
      product,
      quantity,
      customQuery,
      signal
    } = params;

    if (quantity && quantity > 0) {
      try {
        loading.value = true;
        error.value.updateItemQty = null;
        const { updatedCart, errors } = await _factoryParams.updateItemQty({
          currentCart: cart.value,
          product,
          quantity,
          customQuery,
          signal,
        });
        if (errors) {
          error.value.updateItemQty = errors;
        }
        cart.value = updatedCart;
        updateToken();
      } catch (err) {
        error.value.updateItemQty = err;
        Logger.error('useCart/updateItemQty', err);
      } finally {
        loading.value = false;
      }
    }
  };

  const load = async (params: ComposableFunctionArgs<{ forceReload: false }> = { forceReload: false }) => {
    Logger.debug('useCart.load');

    const {
      forceReload,
      customQuery,
      signal
    } = params;

    if (!forceReload && cart.value) {
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
      error.value.load = null;
      const { updatedCart, errors } = await _factoryParams.load({ customQuery, signal });
      if (errors) {
        error.value.load = errors;
      }
      cart.value = updatedCart;
      updateToken();
    } catch (err) {
      error.value.load = err;
      Logger.error('useCart/load', err);
    } finally {
      loading.value = false;
    }
  };

  const clear = async (params: ComposableFunctionArgs<{}>) => {
    Logger.debug('useCart.clear');

    try {
      loading.value = true;
      error.value.clear = null;
      const { updatedCart, errors } = await _factoryParams.clear({ currentCart: cart.value, ...params });
      if (errors) {
        error.value.clear = errors;
      }
      cart.value = updatedCart;
      updateToken();
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

  const applyCoupon = async (params: ComposableFunctionArgs<{ couponCode }>) => {
    Logger.debug('useCart.applyCoupon');

    try {
      loading.value = true;
      error.value.applyCoupon = null;
      const { updatedCart, errors } = await _factoryParams.applyCoupon({
        currentCart: cart.value,
        ...params,
      });
      if (errors) {
        error.value.applyCoupon = errors;
      }
      cart.value = updatedCart;
    } catch (err) {
      error.value.applyCoupon = err;
      Logger.error('useCart/applyCoupon', err);
    } finally {
      loading.value = false;
    }
  };

  const removeCoupon = async (params: ComposableFunctionArgs<{ couponCode }>) => {
    Logger.debug('useCart.removeCoupon');

    try {
      loading.value = true;
      error.value.removeCoupon = null;
      const { updatedCart, errors } = await _factoryParams.removeCoupon({
        currentCart: cart.value,
        ...params,
      });
      if (errors) {
        error.value.removeCoupon = errors;
      }
      cart.value = updatedCart;
      loading.value = false;
    } catch (err) {
      error.value.removeCoupon = err;
      Logger.error('useCart/removeCoupon', err);
    } finally {
      loading.value = false;
    }
  };

  const checkGiftCard = async (params: ComposableFunctionArgs<{ giftCardCode }>) => {
    Logger.debug('useCart.checkGiftCard');

    try {
      loading.value = true;
      const result = await _factoryParams.checkGiftCard(params);
      error.value.checkGiftCard = null;
      return result;
    } catch (err) {
      error.value.checkGiftCard = err;
      Logger.error('useCart/checkGiftCard', err);
    } finally {
      loading.value = false;
    }
    return null;
  };

  const applyGiftCard = async (params: ComposableFunctionArgs<{ giftCardCode }>) => {
    Logger.debug('useCart.applyGiftCard');

    try {
      loading.value = true;
      error.value.applyGiftCard = null;
      const { updatedCart, errors } = await _factoryParams.applyGiftCard({
        currentCart: cart.value,
        ...params,
      });
      if (errors) {
        error.value.applyGiftCard = errors;
      }
      cart.value = updatedCart;
    } catch (err) {
      error.value.applyGiftCard = err;
      Logger.error('useCart/applyGiftCard', err);
    } finally {
      loading.value = false;
    }
  };

  const removeGiftCard = async (params: ComposableFunctionArgs<{ giftCardCode }>) => {
    Logger.debug('useCart.removeGiftCard');

    try {
      loading.value = true;
      error.value.removeGiftCard = null;
      const { updatedCart, errors } = await _factoryParams.removeGiftCard({
        currentCart: cart.value,
        ...params,
      });
      if (errors) {
        error.value.removeGiftCard = errors;
      }
      cart.value = updatedCart;
    } catch (err) {
      error.value.removeGiftCard = err;
      Logger.error('useCart/removeGiftCard', err);
    } finally {
      loading.value = false;
    }
  };

  const focusSetGroupOnItem = async (params: ComposableFunctionArgs<{ product, groupType }>) => {
    Logger.debug('useCart.focusSetGroupOnItem');

    try {
      loading.value = true;
      error.value.focusSetGroupOnItem = null;
      const { updatedCart, errors } = await _factoryParams.focusSetGroupOnItem({
        currentCart: cart.value,
        ...params,
      });
      if (errors) {
        error.value.focusSetGroupOnItem = errors;
      }
      cart.value = updatedCart;
    } catch (err) {
      error.value.focusSetGroupOnItem = err;
      Logger.error('useCart/focusSetGroupOnItem', err);
    } finally {
      loading.value = false;
    }
  };

  const focusUpdateCartGroup = async (params: ComposableFunctionArgs<{ groupType, data }>) => {
    Logger.debug('useCart.focusUpdateCartGroup');

    try {
      loading.value = true;
      error.value.focusUpdateCartGroup = null;
      const { updatedCart, errors } = await _factoryParams.focusUpdateCartGroup({
        currentCart: cart.value,
        ...params,
      });
      if (errors) {
        error.value.focusUpdateCartGroup = errors;
      }
      cart.value = updatedCart;
    } catch (err) {
      error.value.focusUpdateCartGroup = err;
      Logger.error('useCart/focusUpdateCartGroup', err);
    } finally {
      loading.value = false;
    }
  };

  const focusUnsetPickupDate = async (params: ComposableFunctionArgs<{}>) => {
    Logger.debug('useCart.focusUnsetPickupDate');

    try {
      loading.value = true;
      error.value.focusUnsetPickupDate = null;
      const { updatedCart, errors } = await _factoryParams.focusUnsetPickupDate({
        currentCart: cart.value,
        ...params,
      });
      if (errors) {
        error.value.focusUnsetPickupDate = errors;
      }
      cart.value = updatedCart;
    } catch (err) {
      error.value.focusUnsetPickupDate = err;
      Logger.error('useCart/focusUnsetPickupDate', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    api: _factoryParams.api,
    setCart,
    cart: computed(() => cart.value),
    setCompliance,
    compliance: computed(() => compliance.value),
    isInCart,
    addItem,
    addItems,
    load,
    removeItem,
    clear,
    updateItemQty,
    applyCoupon,
    removeCoupon,
    checkGiftCard,
    applyGiftCard,
    removeGiftCard,
    focusSetGroupOnItem,
    focusUpdateCartGroup,
    focusUnsetPickupDate,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    token: computed(() => token.value),
    updateToken,
    setToken,
  };
};
