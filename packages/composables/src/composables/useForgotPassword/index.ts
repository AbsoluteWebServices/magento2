import {
  Context, Logger,
} from '@absolute-web/vsf-core';
import { useForgotPasswordFactory, UseForgotPasswordFactoryParams } from '../../factories/useForgotPasswordFactory';

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword: async (context: Context, { currentResult, ...params }) => {
    Logger.debug('[Magento]: Reset user password', { params });

    const {
      customQuery,
      signal,
      email
    } = params;

    const { data } = await context.$magento.api.requestPasswordResetEmail({ email }, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return {
      ...currentResult,
      resetPasswordResult: data.requestPasswordResetEmail,
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNewPassword: async (context: Context, { currentResult, ...params }) => {
    Logger.debug('[Magento]: Define new user password', { params });

    const {
      customQuery,
      signal,
      email,
      newPassword,
      tokenValue: resetPasswordToken
    } = params;

    const { data } = await context.$magento.api.resetPassword({
      email,
      newPassword,
      resetPasswordToken,
    }, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return {
      ...currentResult,
      setNewPasswordResult: data.resetPassword,
    };
  },
};

export const useForgotPassword = useForgotPasswordFactory<any>(factoryParams);
export default useForgotPassword;
