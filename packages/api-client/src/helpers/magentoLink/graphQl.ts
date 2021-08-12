/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  ApolloClient, ApolloLink, HttpLink, InMemoryCache, from,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { setContext } from '@apollo/client/link/context';
import fetch from 'isomorphic-fetch';
import { Logger } from '@absolute-web/vsf-core';
import { handleRetry } from './linkHandlers';
import { Config } from '../../types/setup';
import possibleTypes from '../../types/fragmentTypes.json';

const createErrorHandler = () => onError(({
  graphQLErrors,
  networkError,
}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({
      message,
      locations,
      path,
    }) => {
      if (!message.includes('Resource Owner Password Credentials Grant')) {
        if (!locations) {
          Logger.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);
          return;
        }

        const parsedLocations = locations.map(({
          column,
          line,
        }) => `[column: ${column}, line: ${line}]`);

        Logger.error(`[GraphQL error]: Message: ${message}, Location: ${parsedLocations.join(', ')}, Path: ${path}`);
      }
    });
  }

  if (networkError) {
    Logger.error(`[Network error]: ${networkError}`);
  }
});

export const apolloLinkFactory = (settings: Config, handlers?: {
  apolloLink?: ApolloLink;
}) => {
  const baseLink = handlers?.apolloLink || setContext((apolloReq, { headers }) => ({
    headers: {
      ...headers,
    },
  }));

  const httpLink = new HttpLink({
    uri: settings.api,
    fetch,
    ...settings.customApolloHttpLinkOptions,
  });

  const onErrorLink = createErrorHandler();

  const errorRetry = new RetryLink({
    attempts: handleRetry(),
    delay: () => 0,
  });

  const afterwareLink = new ApolloLink((operation, forward) => forward(operation).map((response) => {
    const { response: { headers } } = operation.getContext();
    const cacheTags = headers.get('x-cache-tags');

    if (cacheTags) {
      // eslint-disable-next-line no-param-reassign
      response.data = {
        ...response.data,
        cacheTags,
      };
    }

    return response;
  }));

  return from([
    onErrorLink,
    errorRetry,
    afterwareLink,
    // eslint-disable-next-line unicorn/prefer-spread
    baseLink.concat(httpLink),
  ]);
};

export const apolloClientFactory = (customOptions: Record<string, any>) => new ApolloClient({
  cache: new InMemoryCache({
    possibleTypes,
    resultCaching: true,
  }),
  queryDeduplication: true,
  ssrMode: true,
  ...customOptions,
});
