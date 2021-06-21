import {
  Context,
  Logger,
  useShippingFactory,
  UseShippingParams,
} from '@vue-storefront/core';
import {
  SetShippingAddressesOnCartInput,
} from '@vue-storefront/magento-api';
import useCart from '../useCart';
import useGetShippingMethods from '../useGetShippingMethods';

const factoryParams: UseShippingParams<any, any> = {
  provide() {
    return {
      useGetShippingMethods: useGetShippingMethods(),
      cart: useCart(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    Logger.debug('[Magento] loadShipping');

    if (!context.cart.cart?.value?.shipping_addresses) {
      await context.cart.load({ customQuery });
    }

    return context.cart.cart.value.shipping_addresses[0];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, saveParams) => {
    Logger.debug('[Magento] setShippingAddress');
    Logger.debug(context);

    const { id } = context.cart.cart.value;
    const {
      apartment,
      ...address
    } = saveParams.shippingDetails;

    const shippingAddressInput: SetShippingAddressesOnCartInput = {
      cart_id: id,
      shipping_addresses: [
        {
          address: {
            ...address,
            street: [address.street, apartment],
          },
        },
      ],
    };

    const { data } = await context
      .$magento
      .api
      .setShippingAddressesOnCart(shippingAddressInput);

    context.useGetShippingMethods.setState(data
      .setShippingAddressesOnCart
      .cart
      .shipping_addresses[0]
      .available_shipping_methods);

    // workaround to save shipping address and totals to the cart,
    // so in case load() will be called shipping address will be populated correctly
    const prices = context.cart.cart?.value?.prices;

    context.cart.setCart({
      ...context.cart.cart.value,
      shipping_addresses: data.setShippingAddressesOnCart.cart.shipping_addresses,
      prices: {
        ...prices,
        ...data.setShippingAddressesOnCart.cart.prices
      }
    });

    return data
      .setShippingAddressesOnCart
      .cart
      .shipping_addresses[0];
  },
};

export default useShippingFactory<any, any>(factoryParams);
