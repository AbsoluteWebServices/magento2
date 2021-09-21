/* istanbul ignore file */
/* eslint-disable no-param-reassign */
import {
  Context,
  Logger,
} from '@vue-storefront/core';
import {
  AddConfigurableProductsToCartInput,
  AddProductsToCartInput,
  Cart,
  CartItem,
  Coupon,
  GiftCard,
  GiftCardAccount,
  Product,
  RemoveItemFromCartInput,
  UpdateCartItemsInput,
} from '@vue-storefront/magento-api';
import { UseCartFactoryParams, useCartFactory } from '../../factories/useCartFactory';
import { cartGetters } from '../getters';

const factoryParams: UseCartFactoryParams<Cart, CartItem, Product, Coupon, GiftCard, GiftCardAccount> = {
  load: async (context: Context) => {
    const apiState = context.$magento.config.state;
    Logger.debug('[Magento Storefront]: Loading Cart');
    const customerToken = apiState.getCustomerToken();

    const createNewCart = async (): Promise<string> => {
      Logger.debug('[Magento Storefront]: useCart.load.createNewCart');

      apiState.setCartId();

      const { data } = await context.$magento.api.createEmptyCart();

      apiState.setCartId(data.createEmptyCart);

      return data.createEmptyCart;
    };

    const getCartData = async (id?: string) => {
      const fetchData = async (cartId = id) => {
        apiState.setCartId(cartId);
        const cartResponse = await context.$magento.api.cart(cartId);

        Logger.debug(cartResponse);

        return cartResponse.data.cart as unknown as Cart;
      };

      let retries = 1;
      try {
        Logger.debug('[Magento Storefront]: useCart.load.getCartData ID->', id);

        return await fetchData();
      } catch (err) {
        if (retries-- > 0) {
          apiState.setCartId();

          const cartId = await createNewCart();

          return await fetchData(cartId);
        } else {
          throw err;
        }
      }
    };

    const generateCart = async (id?: string) => {
      const cartId = await createNewCart();

      return getCartData(id || apiState.getCartId() || cartId);
    };

    if (customerToken) {
      try {
        const result = await context.$magento.api.customerCart();

        apiState.setCartId(result.data.customerCart.id);

        return result.data.customerCart as unknown as Cart;
      } catch {
        apiState.setCustomerToken();

        return await generateCart();
      }
    }

    const cartId = apiState.getCartId();

    let retries = 1;
    try {
      if (!cartId) {
        return await generateCart();
      }

      return await getCartData(cartId);
    } catch (err) {
      if (retries-- > 0) {
        return generateCart();
      } else {
        throw err;
      }
    }
  },
  addItem: async (context: Context, {
    product,
    quantity,
    enteredOptions,
    currentCart,
    customQuery,
  }) => {
    const apiState = context.$magento.config.state;
    let currentCartId = apiState.getCartId();

    if (!currentCartId) {
      await factoryParams.load(context, {});

      currentCartId = apiState.getCartId();
    }

    if (!product) {
      return;
    }
    try {
      await factoryParams.focusUnsetPickupDate(context, { currentCart });

      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      switch (product.__typename) {
        case 'SimpleProduct':
          const simpleCartInput: AddProductsToCartInput = {
            cartId: currentCartId,
            cartItems: [
              {
                quantity,
                sku: product.sku,
                entered_options: enteredOptions,
              },
            ],
          };

          const simpleProduct = await context.$magento.api.addProductsToCart(simpleCartInput);

          // eslint-disable-next-line consistent-return
          return simpleProduct
            .data
            .addProductsToCart
            .cart as unknown as Cart;
        case 'ConfigurableProduct':
          const cartItems = [
            {
              parent_sku: product.sku,
              data: {
                quantity,
                sku: product.configurable_product_options_selection?.variant?.sku || '',
                entered_options: enteredOptions,
              },
            },
          ];

          const configurableCartInput: AddConfigurableProductsToCartInput = {
            cart_id: currentCartId,
            cart_items: cartItems,
          };

          const configurableProduct = await context.$magento.api.addConfigurableProductsToCart(configurableCartInput);

          // eslint-disable-next-line consistent-return
          return configurableProduct
            .data
            .addConfigurableProductsToCart
            .cart as unknown as Cart;
        case 'BundleProduct':
          const bundleCartInput: AddProductsToCartInput = {
            cartId: currentCartId,
            cartItems: [
              {
                quantity,
                sku: product.sku,
                entered_options: [
                  // @ts-ignore
                  ...product.bundle_options,
                ],
              },
            ],
          };

          const bundleProduct = await context.$magento.api.addProductsToCart(bundleCartInput);

          // eslint-disable-next-line consistent-return
          return bundleProduct
            .data
            .addProductsToCart
            .cart as unknown as Cart;
        default:
          // todo implement other options
          // @ts-ignore
          // eslint-disable-next-line no-underscore-dangle
          throw new Error(`Product Type ${product.__typename} not supported in add to cart yet`);
      }
    } catch (err) {
      throw err;
    }
  },
  addItems: async (context: Context, {
    products,
    currentCart,
    customQuery,
  }) => {
    const apiState = context.$magento.config.state;
    let currentCartId = apiState.getCartId();

    if (!currentCartId) {
      await factoryParams.load(context, {});

      currentCartId = apiState.getCartId();
    }

    if (!products) {
      return;
    }
    try {
      await factoryParams.focusUnsetPickupDate(context, { currentCart });

      const cartInput: AddProductsToCartInput = {
        cartId: currentCartId,
        cartItems: [],
      };

      for (const {product, quantity, enteredOptions} of products) {
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
        switch (product.__typename) {
          case 'SimpleProduct':
            cartInput.cartItems.push( {
              quantity,
              sku: product.sku,
              entered_options: enteredOptions,
            });
            break;
          case 'ConfigurableProduct':
            cartInput.cartItems.push({
              parent_sku: product.sku,
              quantity,
              sku: product.configurable_product_options_selection?.variant?.sku || '',
              entered_options: enteredOptions,
            });
            break;
          case 'BundleProduct':
            cartInput.cartItems.push({
              quantity,
              sku: product.sku,
              entered_options: [
                // @ts-ignore
                ...product.bundle_options,
              ],
            });
            break;
          default:
            // todo implement other options
            // @ts-ignore
            // eslint-disable-next-line no-underscore-dangle
            throw new Error(`Product Type ${product.__typename} not supported in add to cart yet`);
        }
      }

      const response = await context.$magento.api.addProductsToCart(cartInput);

      // eslint-disable-next-line consistent-return
      return response
        .data
        .addProductsToCart
        .cart as unknown as Cart;

    } catch (err) {
      throw err;
    }
  },
  removeItem: async (context: Context, {
    currentCart,
    product,
  }) => {
    const item = currentCart.items.find((cartItem) => cartItem.uid === product.uid);

    if (!item) {
      return;
    }

    await factoryParams.focusUnsetPickupDate(context, { currentCart });

    const removeItemParams: RemoveItemFromCartInput = {
      cart_id: currentCart.id,
      cart_item_uid: item.uid,
    };

    const { data } = await context.$magento.api.removeItemFromCart(removeItemParams);

    // eslint-disable-next-line consistent-return
    return data
      .removeItemFromCart
      .cart as unknown as Cart;
  },

  updateItemQty: async (context: Context, {
    currentCart,
    product,
    quantity,
  }) => {
    await factoryParams.focusUnsetPickupDate(context, { currentCart });

    const updateCartParams: UpdateCartItemsInput = {
      cart_id: currentCart.id,
      cart_items: [
        {
          cart_item_uid: product.uid,
          quantity,
        },
      ],
    };

    const { data } = await context.$magento.api.updateCartItems(updateCartParams);

    return data
      .updateCartItems
      .cart as unknown as Cart;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: (context: Context, _params = null) => {
    context.$magento.config.state.setCartId(null);

    return factoryParams.load(context, {});
  },
  applyCoupon: async (context: Context, {
    currentCart,
    couponCode,
  }) => {
    await factoryParams.focusUnsetPickupDate(context, { currentCart });

    const response = await context.$magento.api.applyCouponToCart({
      cart_id: currentCart.id,
      coupon_code: couponCode,
    });

    return {
      updatedCart: response.data.applyCouponToCart.cart as unknown as Cart,
      updatedCoupon: { code: couponCode },
    };
  },
  removeCoupon: async (context: Context, { currentCart }) => {
    await factoryParams.focusUnsetPickupDate(context, { currentCart });

    const response = await context.$magento.api.removeCouponFromCart({
      cart_id: currentCart.id,
    });

    return {
      updatedCart: response.data.removeCouponFromCart.cart as unknown as Cart,
      updatedCoupon: { code: '' },
    };
  },
  checkGiftCard: async (context: Context, {
    giftCardCode,
  }) => {
    const response = await context.$magento.api.giftCardAccount(giftCardCode);

    return response.data.giftCardAccount;
  },
  applyGiftCard: async (context: Context, {
    currentCart,
    giftCardCode,
  }) => {
    await factoryParams.focusUnsetPickupDate(context, { currentCart });

    const response = await context.$magento.api.applyGiftCardToCart({
      cart_id: currentCart.id,
      gift_card_code: giftCardCode,
    });

    return {
      updatedCart: response.data.applyGiftCardToCart.cart as unknown as Cart
    };
  },
  removeGiftCard: async (context: Context, { currentCart, giftCard }) => {
    await factoryParams.focusUnsetPickupDate(context, { currentCart });

    const response = await context.$magento.api.removeGiftCardFromCart({
      cart_id: currentCart.id,
      gift_card_code: giftCard.code,
    });

    return {
      updatedCart: response.data.removeGiftCardFromCart.cart as unknown as Cart,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (
    context: Context,
    {
      currentCart,
      product,
    },
  ) => !!currentCart
    ?.items
    ?.find((cartItem) => cartItem.product.uid === product.uid),

  focusSetGroupOnItem: async (context: Context, { currentCart, product, groupType }) => {
    const response = await context.$magento.api.focusSetGroupOnItem({
      cart_id: currentCart.id,
      item_uid: product.uid,
      group_type: groupType,
    });

    return {
      updatedCart: response.data.focusSetGroupOnItem as unknown as Cart,
    };
  },

  focusUpdateCartGroup: async (context: Context, { currentCart, groupType, data }) => {
    const response = await context.$magento.api.focusUpdateCartGroup({
      cart_id: currentCart.id,
      group_type: groupType,
      additional_data: data,
    });

    return {
      updatedCart: response.data.focusUpdateCartGroup as unknown as Cart,
    };
  },

  focusUnsetPickupDate: async (context: Context, { currentCart }) => {
    if (!cartGetters.isPickupDateSelected(currentCart)) {
      return {
        updatedCart: currentCart,
      }
    }

    const response = await context.$magento.api.focusUpdateCartGroup({
      cart_id: currentCart.id,
      group_type: 'pickup',
      additional_data: {
        pickup_date: null,
      },
    });

    return {
      updatedCart: response.data.focusUpdateCartGroup as unknown as Cart,
    };
  },
};

export default useCartFactory<Cart, CartItem, Product, Coupon, GiftCard, GiftCardAccount>(factoryParams);
