import { Logger } from '@absolute-web/vsf-core';
import { setContext } from '@apollo/client/link/context';
import { ConfigState } from '../../types/setup';

export const handleRetry = () => (count, operation, error) => {
  if (count > 3) {
    return false;
  }

  if ([502, 503].indexOf(error?.statusCode) !== -1) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    Logger.debug(`Apollo retry-link, the operation (${operation.operationName}) failed with ${error.statusCode} status code, retrying... (attempt: ${count})`);
    return true;
  }

  if (error?.result?.message === 'invalid_token') {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    Logger.debug(`Apollo retry-link, the operation (${operation.operationName}) sent with wrong token, creating a new one... (attempt: ${count})`);
    return true;
  }

  return false;
};

export const linkFactory = ({ state }: {
  state: ConfigState;
}) => setContext((apolloReq, { headers }) => {
  Logger.debug('Apollo linkFactory', apolloReq.operationName);

  const Store: string = state.getStore();
  const token: string = state.getCustomerToken();
  const currency: string = state.getCurrency();
  const context: string = ['productsList', 'productDetails'].includes(apolloReq.operationName) ? state.getContext() : '';
  const reqHeaders = state.getHeaders() || {};
  const headersWhitelist = state.getHeadersWhitelist().split(',').map(value => value?.toLowerCase().trim());

  if (currency) {
    Logger.debug('Apollo currencyLinkFactory, finished, currency: ', currency);
  }

  if (Store) {
    Logger.debug('Apollo storeLinkFactory, finished, storeId: ', Store);
  }

  if (token) {
    Logger.debug('Apollo authLinkFactory, finished, token: ', token);
  }

  if (context) {
    Logger.debug('Apollo contextLinkFactory, finished, context: ', context);
  }

  let additionalHeaders = {};
  if (headersWhitelist.length) {
    additionalHeaders = Object.keys(reqHeaders).reduce((acc, key) => ({
      ...acc,
      ...(headersWhitelist.includes(key) ? { [key]: reqHeaders[key] } : {}),
    }), additionalHeaders);
  }

  return {
    headers: {
      ...headers,
      ...additionalHeaders,
      ...(currency ? { 'Content-Currency': currency } : {}),
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...(Store ? { Store } : {}),
      ...(context ? { 'X-Magento-Cache-Id': context } : {}),
    },
  };
});
