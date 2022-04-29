/* istanbul ignore file */
import {
  Context, Logger,
} from '@absolute-web/vsf-core';
import { Customer, CustomerCreateInput, CustomerUpdateInput } from '@absolute-web/magento-api';
import useCart from '../useCart';
import { generateUserData } from '../../helpers/userDataGenerator';
import { UseUserFactoryParams, useUserFactory } from '../../factories/useUserFactory';

const factoryParams: UseUserFactoryParams<
Customer,
CustomerUpdateInput & { email?: string; password?: string },
CustomerCreateInput & { email: string; password: string }
> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  getContext(context: Context) {
    return context.$magento.config.state.getContext();
  },
  getCustomerToken(context: Context) {
    return context.$magento.config.state.getCustomerToken();
  },
  setCustomerToken(context: Context, token: string) {
    return context.$magento.config.state.setCustomerToken(token);
  },
  load: async (context: Context, params) => {
    Logger.debug('[Magento] Load user information');
    const apiState = context.$magento.config.state;

    const {
      customQuery,
      signal
    } = params;

    if (!apiState.getCustomerToken()) {
      return null;
    }
    try {
      const { data } = await context.$magento.api.customer(undefined, customQuery, signal);

      apiState.setContext(data.cacheId || null);

      Logger.debug('[Result]:', { data });

      return data.customer as unknown as Customer;
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        throw err;
      }
      // eslint-disable-next-line no-void
      // @ts-ignore
      await factoryParams.logOut(context, { signal });
    }

    return null;
  },
  logOut: async (context: Context, params) => {
    const apiState = context.$magento.config.state;
    const oldContext = apiState.getContext();

    const {
      customQuery,
      signal
    } = params;

    await context.$magento.api.revokeCustomerToken(undefined, customQuery, signal);

    const newContext = apiState.getContext();
    if (newContext === oldContext) {
      apiState.setContext(null);
    }
    apiState.setCustomerToken(null);
    apiState.setCartId(null);
    context.cart.setCart(null);
    context.cart.updateToken();
  },
  updateUser: async (context: Context, params) => {
    Logger.debug('[Magento] Update user information', { params });

    const {
      customQuery,
      signal,
      currentUser,
      updatedUserData
    } = params;

    const { email: oldEmail } = currentUser;
    const { email, password, ...updateData } = updatedUserData;

    const userData = generateUserData(updateData);

    if (email && email !== oldEmail) {
      await context.$magento.api.updateCustomerEmail({
        email,
        password,
      }, undefined, signal);
    }

    const { data } = await context.$magento.api.updateCustomer(userData, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.updateCustomerV2.customer as unknown as Customer;
  },
  register: async (context: Context, params) => {
    const {
      customQuery,
      signal,
      ...userData
    } = params;

    const { email, password, ...baseData } = generateUserData(userData);

    const { data, errors } = await context.$magento.api.createCustomer(
      { email, password, ...baseData },
      undefined,
      signal
    );

    Logger.debug('[Result]:', { data });

    if (errors) {
      Logger.error(errors);

      throw new Error(errors.map((e) => e.message).join(','));
    }
    if (!data.createCustomerV2 || !data.createCustomerV2.customer) {
      throw new Error('Customer registration error');
    }

    return factoryParams.logIn(context, { username: email, password, customQuery, signal });
  },
  mergeCustomerCart: async (context: Context, params) => {
    // merge existing cart with customer cart
    const apiState = context.$magento.config.state;

    if (!apiState.getCustomerToken()) {
      return null;
    }

    const {
      customQuery,
      signal
    } = params;

    const currentCartId = apiState.getCartId();
    const cart = await context.$magento.api.customerCart(undefined, customQuery, signal);
    const newCartId = cart.data.customerCart.id;
    let errors;

    if (cart.errors?.length) {
      errors = cart.errors;
    }

    if (newCartId) {
      if (currentCartId && currentCartId !== newCartId) {
        const { data: dataMergeCart, errors: errorsMergeCart } = await context.$magento.api.mergeCarts(
          {
            sourceCartId: currentCartId,
            destinationCartId: newCartId,
          },
          undefined,
          signal
        );

        if (errorsMergeCart?.length) {
          errors = errors ? [
            ...errors,
            ...errorsMergeCart,
          ] : errorsMergeCart;
        }

        context.cart.setCart(dataMergeCart.mergeCarts);

        apiState.setCartId(dataMergeCart.mergeCarts.id);
      } else {
        context.cart.setCart(cart.data.customerCart);

        apiState.setCartId(newCartId);
      }
      context.cart.updateToken();
    }

    return errors;
  },
  logIn: async (context: Context, params) => {
    Logger.debug('[Magento] Authenticate user');
    const apiState = context.$magento.config.state;

    const {
      customQuery,
      signal,
      username: email,
      password,
    } = params;

    const { data, errors } = await context.$magento.api.generateCustomerToken(
      {
        email,
        password,
      },
      customQuery,
      signal
    );

    Logger.debug('[Result]:', { data });

    if (errors) {
      Logger.error(errors);

      throw new Error(errors.map((e) => e.message).join(','));
    }
    if (!data.generateCustomerToken || !data.generateCustomerToken.token) {
      throw new Error('Customer sign-in error');
    }
    apiState.setCustomerToken(data.generateCustomerToken.token);
  },
  changePassword: async (context: Context, params) => {
    Logger.debug('[Magento] changing user password');

    const {
      customQuery,
      signal,
      ...updateParams
    } = params;

    const { data, errors } = await context.$magento.api.changeCustomerPassword(updateParams, customQuery, signal);

    if (errors) {
      Logger.error(errors);

      throw new Error(errors.map((e) => e.message).join(','));
    }

    Logger.debug('[Result] ', { data });

    return data?.changeCustomerPassword as unknown as Customer;
  },
};

export default useUserFactory<
Customer,
CustomerUpdateInput & { email?: string; password?: string },
CustomerCreateInput & { email: string; password: string }
>(factoryParams);
