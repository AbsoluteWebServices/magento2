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
  logInWithAmazon: (context: Context, params: ComposableFunctionArgs<{ currentUser: USER; buyerToken: string }>) => Promise<Partial<USER>>;
  linkAmazon: (context: Context, params: ComposableFunctionArgs<{ currentUser: USER; buyerToken: string; password: string; }>) => Promise<Partial<USER>>;
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
    logInWithAmazon: null,
    linkAmazon: null,
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

  const updateUser = async (params) => {
    Logger.debug('useUserFactory.updateUser', params);
    resetErrorValue();

    const {
      user: providedUser,
      customQuery,
      signal
    } = params;

    try {
      loading.value = true;
      user.value = await _factoryParams.updateUser({ currentUser: user.value, updatedUserData: providedUser, customQuery, signal });
      error.value.updateUser = null;
      updateContext();
    } catch (err) {
      error.value.updateUser = err;
      Logger.error('useUser/updateUser', err);
    } finally {
      loading.value = false;
    }
  };

  const register = async (params) => {
    Logger.debug('useUserFactory.register', params);
    resetErrorValue();

    const {
      user: providedUser,
      customQuery,
      signal
    } = params;

    try {
      loading.value = true;
      error.value.register = null;
      await _factoryParams.register({ ...providedUser, customQuery, signal });
      updateToken();
      updateContext();
    } catch (err) {
      error.value.register = err;
      Logger.error('useUser/register', err);
    } finally {
      loading.value = false;
    }
  };

  const login = async (params) => {
    Logger.debug('useUserFactory.login', params);
    resetErrorValue();

    const {
      user: providedUser,
      customQuery,
      signal
    } = params;

    try {
      loading.value = true;
      error.value.login = null;
      await _factoryParams.logIn({ ...providedUser, customQuery, signal });
      updateToken();
      updateContext();
    } catch (err) {
      error.value.login = err;
      Logger.error('useUser/login', err);
    } finally {
      loading.value = false;
    }
  };

  const logout = async (params = {}) => {
    Logger.debug('useUserFactory.logout');
    resetErrorValue();

    try {
      await _factoryParams.logOut({ currentUser: user.value, ...params });
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

    const {
      current: currentPassword,
      new: newPassword,
      customQuery,
      signal
    } = params;

    try {
      loading.value = true;
      user.value = await _factoryParams.changePassword({
        currentUser: user.value,
        currentPassword,
        newPassword,
        customQuery,
        signal
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

  const mergeCart = async (params = {}) => {
    Logger.debug('useUserFactory.loadCart');
    resetErrorValue();

    try {
      loading.value = true;
      error.value.cart = null;
      const cartErrors = await _factoryParams.mergeCustomerCart(params);

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

  const load = async (params = {}) => {
    Logger.debug('useUserFactory.load');
    resetErrorValue();

    try {
      loading.value = true;
      user.value = await _factoryParams.load(params);
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

  const logInWithAmazon = async (params = {}) => {
    Logger.debug('useUserFactory.logInWithAmazon');
    resetErrorValue();

    try {
      loading.value = true;
      user.value = await _factoryParams.logInWithAmazon({ currentUser: user.value, ...params });
      error.value.logInWithAmazon = null;
      updateToken();
      updateContext();
    } catch (err) {
      error.value.logInWithAmazon = err;
      Logger.error('useUser/logInWithAmazon', err);
    } finally {
      loading.value = false;
    }
  };

  const linkAmazon = async (params = {}) => {
    Logger.debug('useUserFactory.linkAmazon');
    resetErrorValue();

    try {
      loading.value = true;
      user.value = await _factoryParams.linkAmazon({ currentUser: user.value, ...params });
      error.value.linkAmazon = null;
      updateToken();
      updateContext();
    } catch (err) {
      error.value.linkAmazon = err;
      Logger.error('useUser/linkAmazon', err);
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
    logInWithAmazon,
    linkAmazon,
  };
};
