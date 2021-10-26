/* istanbul ignore file */
import { ApiClientExtension, apiClientFactory } from '@absolute-web/vsf-core';
import * as api from './api';
import { ClientInstance, Config } from './types/setup';
import { createMagentoConnection } from './helpers/magentoLink';
import { defaultSettings } from './helpers/apiClient/defaultSettings';
import { apolloClientFactory } from './helpers/magentoLink/graphQl';

const onCreate = (settings: Config): { config: Config; client: ClientInstance } => {
  const config = {
    ...defaultSettings,
    ...settings,
    state: settings.state || defaultSettings.state,
  } as unknown as Config;

  if (settings.client) {
    return {
      client: settings.client,
      config,
    };
  }

  if (settings.customOptions && settings.customOptions.link) {
    return {
      client: apolloClientFactory(settings.customOptions),
      config,
    };
  }

  const { apolloLink } = createMagentoConnection(config);

  const client = apolloClientFactory({
    link: apolloLink,
    ...settings.customOptions,
  });

  return {
    config,
    client,
  };
};

const tokenExtension: ApiClientExtension = {
  name: 'tokenExtension',
  hooks: (req, res) => ({
    beforeCreate: ({ configuration }) => {
      const cartCookieName = configuration.cookies?.cartCookieName || defaultSettings.cookies.cartCookieName;
      const customerCookieName = configuration.cookies?.customerCookieName || defaultSettings.cookies.customerCookieName;
      const storeCookieName = configuration.cookies?.storeCookieName || defaultSettings.cookies.storeCookieName;

      return {
        ...configuration,
        state: {
          getCartId: () => req.cookies[cartCookieName],
          setCartId: (id) => {
            if (!id) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies[cartCookieName];
              return;
            }
            res.cookie(cartCookieName, JSON.stringify(id));
          },
          getCustomerToken: () => req.cookies[customerCookieName],
          setCustomerToken: (token) => {
            if (!token) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies[customerCookieName];
              return;
            }
            res.cookie(customerCookieName, JSON.stringify(token));
          },
          getStore: () => req.cookies[storeCookieName],
          setStore: (id) => {
            if (!id) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies[storeCookieName];
              return;
            }
            res.cookie(storeCookieName, JSON.stringify(id));
          },
        },
      };
    },
    afterCall: ({ configuration, response }) => {
      if (response.data.cacheTags) {
        const cacheTagsHeaderName = configuration.headers?.cacheTagsHeaderName || defaultSettings.headers.cacheTagsHeaderName;
        res.header(cacheTagsHeaderName, response.data.cacheTags);
        response.data.cacheTags = response.data.cacheTags.split(',').map(tag => {
          const parts = tag.split('_');

          if (parts.length === 2) {
            return { prefix: `${parts[0]}_`, value: parts[1] }
          } else if(parts.length === 3) {
            return { prefix: `${parts[0]}_${parts[1]}_`, value: parts[2] }
          }
        });
      }
      return response;
    }
  }),
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api,
  extensions: [tokenExtension],
});

export {
  createApiClient,
};
