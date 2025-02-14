import { FetchResult } from '@apollo/client/core';
import { CustomQuery, Logger } from '@absolute-web/vsf-core';
import requestPasswordResetEmailMutation from './requestPasswordResetEmail';
import {
  RequestPasswordResetEmailMutation,
  RequestPasswordResetEmailMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: RequestPasswordResetEmailMutationVariables,
  customQuery: CustomQuery = { requestPasswordResetEmail: 'requestPasswordResetEmail' },
): Promise<FetchResult<RequestPasswordResetEmailMutation>> => {
  const { requestPasswordResetEmail } = context.extendQuery(customQuery, {
    requestPasswordResetEmail: {
      query: requestPasswordResetEmailMutation,
      variables: { ...input },
    },
  });

  Logger.debug('[VSF: Magento] requestPasswordResetEmail', JSON.stringify(input, null, 2));
  const result = await context.client
    .mutate<RequestPasswordResetEmailMutation, RequestPasswordResetEmailMutationVariables>({
    mutation: requestPasswordResetEmail.query,
    variables: requestPasswordResetEmail.variables,
  });

  if (!result.data.requestPasswordResetEmail) throw new Error('Email was not found, or not available.');

  return result;
};
