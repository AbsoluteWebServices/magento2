import { integrationPlugin } from '@absolute-web/vsf-core'
import { mapConfigToSetupObject } from '@absolute-web/magento/nuxt/helpers';
import defaultConfig from '@absolute-web/magento/nuxt/defaultConfig';
import cookie from '@absolute-web/magento/nuxt/cookie';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default integrationPlugin(({ app, res, req, integration }) => {
  const cartCookieName = moduleOptions.cookies?.cartCookieName || defaultConfig.cookies.cartCookieName;
  const customerCookieName = moduleOptions.cookies?.customerCookieName || defaultConfig.cookies.customerCookieName;
  const storeCookieName = moduleOptions.cookies?.storeCookieName || defaultConfig.cookies.storeCookieName;
  const currencyCookieName = moduleOptions.cookies?.currencyCookieName || defaultConfig.cookies.currencyCookieName;
  const localeCookieName = moduleOptions.cookies?.localeCookieName || defaultConfig.cookies.localeCookieName;
  const contextCookieName = moduleOptions.cookies?.contextCookieName || defaultConfig.cookies.contextCookieName;

  const {
    setCookie,
    removeCookie,
    getCookies,
  } = cookie(req, res);

  const getCartId = () => getCookies(cartCookieName);

  const setCartId = (id) => {
    if (!id) {
      removeCookie(cartCookieName)
      // eslint-disable-next-line no-param-reassign
      return;
    }
    setCookie(cartCookieName, id);
  };

  const getCustomerToken = () => getCookies(customerCookieName);

  const setCustomerToken = (token) => {
    if (!token) {
      removeCookie(customerCookieName);
      return;
    }

    setCookie(customerCookieName, token);
  };

  const getStore = () => getCookies(storeCookieName);

  const setStore = (id) => {
    if (!id) {
      // eslint-disable-next-line no-param-reassign
      removeCookie(storeCookieName);
      return;
    }

    setCookie(storeCookieName, id);
  };

  const getCurrency = () => getCookies(currencyCookieName);

  const setCurrency = (id) => {
    if (!id) {
      // eslint-disable-next-line no-param-reassign
      removeCookie(currencyCookieName);
      return;
    }

    setCookie(currencyCookieName, id);
  };

  const getLocale = () => getCookies(localeCookieName);

  const setLocale = (id) => {
    if (!id) {
      // eslint-disable-next-line no-param-reassign
      removeCookie(localeCookieName);
      return;
    }

    setCookie(localeCookieName, id);
  };

  const getContext = () => getCookies(contextCookieName);

  const setContext = (id) => {
    if (!id) {
      // eslint-disable-next-line no-param-reassign
      removeCookie(contextCookieName);
      return;
    }

    setCookie(contextCookieName, id);
  };

  const settings = mapConfigToSetupObject({
    moduleOptions,
    app,
    additionalProperties: {
      state: {
        //Cart
        getCartId,
        setCartId,
        // Customer
        getCustomerToken,
        setCustomerToken,
        // Store
        getStore,
        setStore,
        getCurrency,
        setCurrency,
        getLocale,
        setLocale,
        // Magento cache context
        getContext,
        setContext,
      },
    }
  });

  integration.configure('magento', settings);
});
