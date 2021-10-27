/* istanbul ignore file */
/* eslint-disable no-param-reassign */
import {
  Context,
  Logger,
} from '@absolute-web/vsf-core';
import {
  AddConfigurableProductsToCartInput,
  AddProductsToCartInput,
  Cart,
  CartItem,
  GiftCardAccount,
  Product,
  RemoveItemFromCartInput,
  UpdateCartItemsInput,
} from '@absolute-web/magento-api';
import {
  UseCartFactoryParams,
  useCartFactory,
} from '../../factories/useCartFactory';
import { cartGetters } from '../../getters';

const filterNullCartItems = (cart: Cart) => {
  if (cart?.items?.length) {
    cart.items = cart.items.filter((item) => item);
  }
  return cart;
};

const factoryParams: UseCartFactoryParams<Cart, CartItem, Product, GiftCardAccount> = {
  load: async (context: Context, params: {
    customQuery?: any;
    realCart?: boolean;
  }) => {
    const apiState = context.$magento.config.state;
    Logger.debug('[Magento Storefront]: Loading Cart');

    const customerToken = apiState.getCustomerToken();
    const virtual = !params.realCart;

    const createVirtualCart = () => (null as Cart);

    const createRealCart = async (): Promise<string> => {
      Logger.debug('[Magento Storefront]: useCart.load.createNewCart');

      apiState.setCartId();

      const { data } = await context.$magento.api.createEmptyCart();
      Logger.debug('[Result]:', { data });

      apiState.setCartId(data.createEmptyCart);

      return data.createEmptyCart;
    };

    const getCartData = async (id: string) => {
      Logger.debug('[Magento Storefront]: useCart.load.getCartData ID->', id);

      const { data, errors } = await context.$magento.api.cart(id);
      Logger.debug('[Result]:', { data, errors });

      return {
        updatedCart: filterNullCartItems(data.cart as unknown as Cart),
        errors,
      };
    };

    const getCart = async (virtualCart: boolean, cartId?: string) => {
      if (!cartId) {
        if (virtualCart) {
          return {
            updatedCart: createVirtualCart(),
          };
        }

        cartId = await createRealCart();
        apiState.setCartId(cartId);
      }

      return getCartData(cartId);
    };

    // Try to load cart for existing customer, clean customer token if not possible
    if (customerToken) {
      try {
        const { data, errors } = await context.$magento.api.customerCart();
        apiState.setCartId(data.customerCart.id);

        return {
          updatedCart: filterNullCartItems(data.customerCart as unknown as Cart),
          errors,
        };
      } catch {
        apiState.setCustomerToken();
      }
    }

    try {
      // If it's not existing customer check if cart id is set and try to load it
      const cartId = apiState.getCartId();
      return await getCart(virtual, cartId);
    } catch {
      apiState.setCartId();
      return await getCart(virtual);
    }
  },

  addItem: async (context: Context, {
    product,
    quantity,
    enteredOptions,
    currentCart,
  }) => {
    Logger.debug('[Magento]: Add item to cart', { product, quantity, currentCart });

    const apiState = context.$magento.config.state;
    let currentCartId = apiState.getCartId();
    if (!currentCartId) {
      await factoryParams.load(context, {
        realCart: true,
      });

      currentCartId = apiState.getCartId();
    }

    if (!product) {
      return { updatedCart: currentCart };
    }

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

        Logger.debug('[Result]:', { data: simpleProduct.data, errors: simpleProduct.errors });

        return {
          updatedCart: filterNullCartItems(simpleProduct.data.addProductsToCart.cart as unknown as Cart),
          errors: simpleProduct.errors,
        };
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

        Logger.debug('[Result]:', { data: configurableProduct.data, errors: configurableProduct.errors });

        return {
          updatedCart: filterNullCartItems(configurableProduct.data.addConfigurableProductsToCart.cart as unknown as Cart),
          errors: configurableProduct.errors,
        };
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

        Logger.debug('[Result]:', { data: bundleProduct.data, errors: bundleProduct.errors });

        return {
          updatedCart: filterNullCartItems(bundleProduct.data.addProductsToCart.cart as unknown as Cart),
          errors: bundleProduct.errors,
        };
      default:
        // todo implement other options
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        throw new Error(`Product Type ${product.__typename} not supported in add to cart yet`);
    }
  },
  addItems: async (context: Context, {
    products,
    currentCart,
  }) => {
    Logger.debug('[Magento]: Add items to cart', { products, currentCart });

    const apiState = context.$magento.config.state;
    let currentCartId = apiState.getCartId();

    if (!currentCartId) {
      await factoryParams.load(context, {});

      currentCartId = apiState.getCartId();
    }

    if (!products) {
      return { updatedCart: currentCart };
    }

    await factoryParams.focusUnsetPickupDate(context, { currentCart });

    const cartInput: AddProductsToCartInput = {
      cartId: currentCartId,
      cartItems: products.map(({ product, quantity, enteredOptions }) => {
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        switch (product.__typename) {
          case 'SimpleProduct':
            return {
              quantity,
              sku: product.sku,
              entered_options: enteredOptions,
            };
          case 'ConfigurableProduct':
            return {
              parent_sku: product.sku,
              quantity,
              sku: product.configurable_product_options_selection?.variant?.sku || '',
              entered_options: enteredOptions,
            };
          case 'BundleProduct':
            return {
              quantity,
              sku: product.sku,
              entered_options: [
                // @ts-ignore
                ...product.bundle_options,
              ],
            };
          default:
            // todo implement other options
            // @ts-ignore
            // eslint-disable-next-line no-underscore-dangle
            throw new Error(`Product Type ${product.__typename} not supported in add to cart yet`);
        }
      }),
    };

    const { data, errors } = await context.$magento.api.addProductsToCart(cartInput);

    Logger.debug('[Result]:', { data, errors });

    return {
      updatedCart: filterNullCartItems(data.addProductsToCart.cart as unknown as Cart),
      errors,
    };
  },
  removeItem: async (context: Context, {
    currentCart,
    product,
  }) => {
    Logger.debug('[Magento]: Remove item from cart', { product, currentCart });

    const item = currentCart.items.find((cartItem) => cartItem.uid === product.uid);

    if (!item) {
      return { updatedCart: currentCart };
    }

    await factoryParams.focusUnsetPickupDate(context, { currentCart });

    const removeItemParams: RemoveItemFromCartInput = {
      cart_id: currentCart.id,
      cart_item_uid: item.uid,
    };

    const { data, errors } = await context.$magento.api.removeItemFromCart(removeItemParams);

    Logger.debug('[Result]:', { data, errors });

    // eslint-disable-next-line consistent-return
    return {
      updatedCart: filterNullCartItems(data.removeItemFromCart.cart as unknown as Cart),
      errors,
    };
  },

  updateItemQty: async (context: Context, {
    currentCart,
    product,
    quantity,
  }) => {
    Logger.debug('[Magento]: Update product quantity on cart', { product, quantity, currentCart });

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

    try {
      const { data, errors } = await context.$magento.api.updateCartItems(updateCartParams);

      Logger.debug('[Result]:', { data, errors });

      return {
        updatedCart: filterNullCartItems(data.updateCartItems.cart as unknown as Cart),
        errors,
      };
    } catch {
      // If we can't change quantity, the card could be expired on Magento side, try to reload
      return await factoryParams.load(context, {
        realCart: true,
      });
    }
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
    Logger.debug('[Magento]: Apply coupon on cart', { couponCode, currentCart });

    await factoryParams.focusUnsetPickupDate(context, { currentCart });

    const { data, errors } = await context.$magento.api.applyCouponToCart({
      cart_id: currentCart.id,
      coupon_code: couponCode,
    });

    Logger.debug('[Result]:', { data, errors });

    return {
      updatedCart: filterNullCartItems(data.applyCouponToCart.cart as unknown as Cart),
      updatedCoupon: { code: couponCode },
      errors,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart }) => {
    Logger.debug('[Magento]: Remove coupon from cart', { currentCart });

    await factoryParams.focusUnsetPickupDate(context, { currentCart });

    const { data, errors } = await context.$magento.api.removeCouponFromCart({
      cart_id: currentCart.id,
    });

    Logger.debug('[Result]:', { data, errors });

    return {
      updatedCart: filterNullCartItems(data.removeCouponFromCart.cart as unknown as Cart),
      updatedCoupon: { code: '' },
      errors,
    };
  },
  checkGiftCard: async (context: Context, {
    giftCardCode,
  }) => {
    Logger.debug('[Magento]: Check gift cart account', { giftCardCode });

    const { data, errors } = await context.$magento.api.giftCardAccount(giftCardCode);

    Logger.debug('[Result]:', { data, errors });

    return data.giftCardAccount;
  },
  applyGiftCard: async (context: Context, {
    currentCart,
    giftCardCode,
  }) => {
    Logger.debug('[Magento]: Apply gift card on cart', { giftCardCode });

    await factoryParams.focusUnsetPickupDate(context, { currentCart });

    const { data, errors } = await context.$magento.api.applyGiftCardToCart({
      cart_id: currentCart.id,
      gift_card_code: giftCardCode,
    });

    Logger.debug('[Result]:', { data, errors });

    return {
      updatedCart: filterNullCartItems(data.applyGiftCardToCart.cart as unknown as Cart),
      errors,
    };
  },
  removeGiftCard: async (context: Context, { currentCart, giftCardCode }) => {
    Logger.debug('[Magento]: Remove gift card from cart', { giftCardCode });

    await factoryParams.focusUnsetPickupDate(context, { currentCart });

    const { data, errors } = await context.$magento.api.removeGiftCardFromCart({
      cart_id: currentCart.id,
      gift_card_code: giftCardCode,
    });

    Logger.debug('[Result]:', { data, errors });

    return {
      updatedCart: filterNullCartItems(data.removeGiftCardFromCart.cart as unknown as Cart),
      errors,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (
    context: Context,
    {
      currentCart,
      product,
    },
  ) => !!currentCart?.items.find((cartItem) => cartItem?.product.uid === product.uid),

  focusSetGroupOnItem: async (context: Context, { currentCart, product, groupType }) => {
    Logger.debug('[Magento FOCUS]: Set group on cart item', { currentCart, product, groupType });

    const { data, errors } = await context.$magento.api.focusSetGroupOnItem({
      cart_id: currentCart.id,
      item_uid: product.uid,
      group_type: groupType,
    });

    Logger.debug('[Result]:', { data, errors });

    return {
      updatedCart: filterNullCartItems(data.focusSetGroupOnItem as unknown as Cart),
      errors,
    };
  },

  focusUpdateCartGroup: async (context: Context, { currentCart, groupType, data: additional_data }) => {
    Logger.debug('[Magento FOCUS]: Set update cart group', { currentCart, groupType, data: additional_data });

    const { data, errors } = await context.$magento.api.focusUpdateCartGroup({
      cart_id: currentCart.id,
      group_type: groupType,
      additional_data,
    });

    Logger.debug('[Result]:', { data, errors });

    return {
      updatedCart: filterNullCartItems(data.focusUpdateCartGroup as unknown as Cart),
      errors,
    };
  },

  focusUnsetPickupDate: async (context: Context, { currentCart }) => {
    Logger.debug('[Magento FOCUS]: Set unset pickup date on cart', { currentCart });

    if (!cartGetters.isPickupDateSelected(currentCart)) {
      return {
        updatedCart: currentCart,
      };
    }

    const { data, errors } = await context.$magento.api.focusUpdateCartGroup({
      cart_id: currentCart.id,
      group_type: 'pickup',
      additional_data: {
        pickup_date: null,
      },
    });

    Logger.debug('[Result]:', { data, errors });

    return {
      updatedCart: filterNullCartItems(data.focusUpdateCartGroup as unknown as Cart),
      errors,
    };
  },
};

export default useCartFactory<Cart, CartItem, Product, GiftCardAccount>(factoryParams);
