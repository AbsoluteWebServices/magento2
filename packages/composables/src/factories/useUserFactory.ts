import { computed } from '@vue/composition-api';
import {
  ComposableFunctionArgs,
  Context,
  FactoryParams,
  PlatformApi,
  sharedRef,
  Logger,
  mask,
  configureFactoryParams,
} from '@absolute-web/vsf-core';
import { GraphQLError } from 'graphql';
import { UseUser, UseUserErrors } from '../types/composables';

export interface UseUserFactoryParams<
  USER,
  UPDATE_USER_PARAMS,
  REGISTER_USER_PARAMS,
  API extends PlatformApi = any,
> extends FactoryParams<API> {
  load: (context: Context, params?: ComposableFunctionArgs<{}>) => Promise<USER>;
  logOut: (context: Context, params?: ComposableFunctionArgs<{ currentUser: USER }>) => Promise<void>;
  updateUser: (context: Context, params: ComposableFunctionArgs<{ currentUser: USER; updatedUserData: UPDATE_USER_PARAMS }>) => Promise<USER>;
  register: (
    context: Context,
    params: ComposableFunctionArgs<REGISTER_USER_PARAMS>
  ) => Promise<void>;
  logIn: (
    context: Context,
    params: ComposableFunctionArgs<{ username: string; password: string }>
  ) => Promise<void>;
  changePassword: (
    context: Context,
    params: ComposableFunctionArgs<{ currentUser: USER; currentPassword: string; newPassword: string }>
  ) => Promise<USER>;
  getContext: (context: Context) => string;
  getCustomerToken: (context: Context) => string;
  setCustomerToken: (context: Context, token: string) => void;
  mergeCustomerCart: (context: Context, params: ComposableFunctionArgs<{}>) => Promise<{ errors?: readonly GraphQLError[] }>;
}

export const useUserFactory = <
  USER,
  UPDATE_USER_PARAMS,
  REGISTER_USER_PARAMS extends { email: string; password: string },
  API extends PlatformApi = any,
>(
  factoryParams: UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS, API>,
) => function useUser(): UseUser<USER, UPDATE_USER_PARAMS, API> {
  const errorsFactory = (): UseUserErrors => ({
    updateUser: null,
    register: null,
    login: null,
    logout: null,
    changePassword: null,
    load: null,
    cart: null,
  });

  const user = sharedRef<USER>(null, 'useUser-user');
  const loading = sharedRef<boolean>(false, 'useUser-loading');
  const isAuthenticated = computed(() => Boolean(user.value));
  const error = sharedRef<UseUserErrors>(errorsFactory(), 'useUser-error');
  const context = sharedRef<string>(null, 'useUser-context');
  const token = sharedRef<string>(null, 'useUser-token');

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  const _factoryParams = configureFactoryParams(
    factoryParams,
    {
      mainRef: user, alias: 'currentUser', loading, error,
    },
  );

  const setUser = (newUser: USER) => {
    user.value = newUser;
    Logger.debug('useUserFactory.setUser', newUser);
  };

  const resetErrorValue = () => {
    error.value = errorsFactory();
  };

  const updateToken = () => {
    const _token = _factoryParams.getCustomerToken();
    if (!token.value !== !_token) {
      token.value = _token;
    }
  };

  const setToken = (_token: string) => {
    if (!token.value !== !_token) {
      token.value = _token;
      _factoryParams.setCustomerToken(_token);
    }
  };

  const updateContext = () => {
    const _context = _factoryParams.getContext();
    if (context.value !== _context) {
      context.value = _context;
    }
  };

  const updateUser = async ({ user: providedUser, customQuery }) => {
    Logger.debug('useUserFactory.updateUser', providedUser);
    resetErrorValue();

    try {
      loading.value = true;
      user.value = await _factoryParams.updateUser({ currentUser: user.value, updatedUserData: providedUser, customQuery });
      error.value.updateUser = null;
      updateContext();
    } catch (err) {
      error.value.updateUser = err;
      Logger.error('useUser/updateUser', err);
    } finally {
      loading.value = false;
    }
  };

  const register = async ({ user: providedUser, customQuery }) => {
    Logger.debug('useUserFactory.register', providedUser);
    resetErrorValue();

    try {
      loading.value = true;
      error.value.register = null;
      await _factoryParams.register({ ...providedUser, customQuery });
      updateToken();
      updateContext();
    } catch (err) {
      error.value.register = err;
      Logger.error('useUser/register', err);
    } finally {
      loading.value = false;
    }
  };

  const login = async ({ user: providedUser, customQuery }) => {
    Logger.debug('useUserFactory.login', providedUser);
    resetErrorValue();

    try {
      loading.value = true;
      error.value.login = null;
      await _factoryParams.logIn({ ...providedUser, customQuery });
      updateToken();
      updateContext();
    } catch (err) {
      error.value.login = err;
      Logger.error('useUser/login', err);
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    Logger.debug('useUserFactory.logout');
    resetErrorValue();

    try {
      await _factoryParams.logOut({ currentUser: user.value });
      error.value.logout = null;
      user.value = null;
      updateToken();
      updateContext();
    } catch (err) {
      error.value.logout = err;
      Logger.error('useUser/logout', err);
    }
  };

  const changePassword = async (params) => {
    Logger.debug('useUserFactory.changePassword', { currentPassword: mask(params.current), newPassword: mask(params.new) });
    resetErrorValue();

    try {
      loading.value = true;
      user.value = await _factoryParams.changePassword({
        currentUser: user.value,
        currentPassword: params.current,
        newPassword: params.new,
        customQuery: params.customQuery,
      });
      error.value.changePassword = null;
      updateContext();
    } catch (err) {
      error.value.changePassword = err;
      Logger.error('useUser/changePassword', err);
    } finally {
      loading.value = false;
    }
  };

  const mergeCart = async ({ customQuery } = { customQuery: undefined }) => {
    Logger.debug('useUserFactory.loadCart');
    resetErrorValue();

    try {
      loading.value = true;
      error.value.cart = null;
      const cartErrors = await _factoryParams.mergeCustomerCart({ customQuery });

      if (cartErrors?.length) {
        error.value.cart = cartErrors;
      }

      updateContext();
    } catch (err) {
      error.value.cart = err;
      Logger.error('useUser/cart', err);
    } finally {
      loading.value = false;
    }
  };

  const load = async ({ customQuery } = { customQuery: undefined }) => {
    Logger.debug('useUserFactory.load');
    resetErrorValue();

    try {
      loading.value = true;
      user.value = await _factoryParams.load({ customQuery });
      error.value.load = null;
      updateToken();
      updateContext();
    } catch (err) {
      error.value.load = err;
      Logger.error('useUser/load', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    api: _factoryParams.api,
    setUser,
    user: computed(() => user.value),
    updateUser,
    register,
    login,
    logout,
    isAuthenticated,
    changePassword,
    load,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    context: computed(() => context.value),
    updateContext,
    token: computed(() => token.value),
    updateToken,
    setToken,
    mergeCart,
  };
};
