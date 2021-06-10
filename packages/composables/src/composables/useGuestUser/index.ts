import { SetGuestEmailOnCartInput } from '@vue-storefront/magento-api';
import { useGuestUserFactory, UseGuestUserFactoryParams } from '../../factories/useGuestUserFactory';
import useCart from '../useCart';

const factoryParams: UseGuestUserFactoryParams<any, any> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  attachToCart: async (context, params) => {
    const emailOnCartInput: SetGuestEmailOnCartInput = {
      email: params.email,
      cart_id: context.cart.cart.value.id,
    };

    // workaround to save email to the cart,
    // so in case load() will be called email will be populated correctly
    context.cart.setCart({
      ...context.cart.cart.value,
      email: params.email
    });

    await context.$magento.api.setGuestEmailOnCart(emailOnCartInput);
  },
};

export default useGuestUserFactory<any, any>(factoryParams);
