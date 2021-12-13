import {
  Context, Logger,
} from '@absolute-web/vsf-core';
import { useForgotPasswordFactory, UseForgotPasswordFactoryParams } from '../../factories/useForgotPasswordFactory';

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword: async (context: Context, { currentResult, email, customQuery }) => {
    Logger.debug('[Magento]: Reset user password', { email, customQuery });

    const { data } = await context.$magento.api.requestPasswordResetEmail({ email }, customQuery);

    Logger.debug('[Result]:', { data });

    return {
      ...currentResult,
      resetPasswordResult: data.requestPasswordResetEmail,
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNewPassword: async (context: Context, {
    currentResult,
    tokenValue,
    newPassword,
    email,
    customQuery,
  }) => {
    Logger.debug('[Magento]: Define new user password', { tokenValue, email, customQuery });

    const { data } = await context.$magento.api.resetPassword({
      email,
      newPassword,
      resetPasswordToken: tokenValue,
    }, customQuery);

    Logger.debug('[Result]:', { data });

    return {
      ...currentResult,
      setNewPasswordResult: data.resetPassword,
    };
  },
};

export const useForgotPassword = useForgotPasswordFactory<any>(factoryParams);
export default useForgotPassword;
