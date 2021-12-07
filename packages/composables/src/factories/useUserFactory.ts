import { Ref, computed } from '@vue/composition-api';
import {
  UseUser,
  Context,
  FactoryParams,
  CustomQuery,
  PlatformApi,
  sharedRef,
  Logger,
  mask,
  configureFactoryParams,
} from '@absolute-web/vsf-core';
import { GraphQLError } from 'graphql';
import { UseUserErrors } from '../types/composables';

export interface UseUserFactoryParams<
  USER,
  UPDATE_USER_PARAMS,
  REGISTER_USER_PARAMS,
  API extends PlatformApi = any,
> extends FactoryParams<API> {
  load: (context: Context, params?: { customQuery: CustomQuery }) => Promise<USER>;
  logOut: (context: Context, params?: { currentUser: USER }) => Promise<void>;
  updateUser: (context: Context, params: { currentUser: USER; updatedUserData: UPDATE_USER_PARAMS; customQuery?: CustomQuery }) => Promise<USER>;
  register: (
    context: Context,
    params: REGISTER_USER_PARAMS & { customQuery?: CustomQuery }
  ) => Promise<{ userData: USER, errors?: readonly GraphQLError[] }>;
  logIn: (
    context: Context,
    params: { username: string; password: string; customQuery?: CustomQuery }
  ) => Promise<{ userData: USER, errors?: readonly GraphQLError[] }>;
  changePassword: (
    context: Context,
    params: { currentUser: USER; currentPassword: string; newPassword: string; customQuery?: CustomQuery }
  ) => Promise<USER>;
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

  const user: Ref<USER> = sharedRef(null, 'useUser-user');
  const loading: Ref<boolean> = sharedRef(false, 'useUser-loading');
  const isAuthenticated = computed(() => Boolean(user.value));
  const error: Ref<UseUserErrors> = sharedRef(errorsFactory(), 'useUser-error');

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

  const updateUser = async ({ user: providedUser, customQuery }) => {
    Logger.debug('useUserFactory.updateUser', providedUser);
    resetErrorValue();

    try {
      loading.value = true;
      user.value = await _factoryParams.updateUser({ currentUser: user.value, updatedUserData: providedUser, customQuery });
      error.value.updateUser = null;
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
      const { userData, errors } = await _factoryParams.register({ ...providedUser, customQuery });
      if (errors) {
        error.value.cart = errors;
      }
      user.value = userData;
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
      const { userData, errors } = await _factoryParams.logIn({ ...providedUser, customQuery });
      if (errors) {
        error.value.cart = errors;
      }
      user.value = userData;
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
    } catch (err) {
      error.value.changePassword = err;
      Logger.error('useUser/changePassword', err);
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
  };
};
