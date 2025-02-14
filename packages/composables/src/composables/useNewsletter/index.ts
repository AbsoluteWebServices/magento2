/* istanbul ignore file */
import {
  Context, Logger,
} from '@absolute-web/vsf-core';
import useUser from '../useUser';
import { useNewsletterFactory, UseNewsletterFactoryParams } from '../../factories/useNewsletterFactory';

const factoryParams: UseNewsletterFactoryParams<any, string> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  updateSubscription: async (context: Context, params) => {
    Logger.debug('[Magento]: Update user newsletter subscription', { params });

    const {
      customQuery,
      signal,
      email
    } = params;

    const { data } = await context.$magento.api.subscribeEmailToNewsletter(
      {
        email,
      },
      customQuery,
      signal,
    );

    Logger.debug('[Result]:', { data });

    return data.subscribeEmailToNewsletter.status;
  },
};

export default useNewsletterFactory<any, string>(factoryParams);
