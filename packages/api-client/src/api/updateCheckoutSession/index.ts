import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { UpdateCheckoutSessionMutation, UpdateCheckoutSessionMutationVariables } from '../../types/GraphQL';
import updateCheckoutSession from './updateCheckoutSession';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: UpdateCheckoutSessionMutationVariables,
  customQuery: CustomQuery = { updateCheckoutSession: 'updateCheckoutSession' },
): Promise<FetchResult<UpdateCheckoutSessionMutation>> => {
  const { updateCheckoutSession: updateCheckoutSessionGQL } = context.extendQuery(
    customQuery,
    {
      updateCheckoutSession: {
        query: updateCheckoutSession,
        variables: { ...input },
      },
    },
  );

  return context.client.mutate<UpdateCheckoutSessionMutation, UpdateCheckoutSessionMutationVariables>({
    mutation: updateCheckoutSessionGQL.query,
    variables: updateCheckoutSessionGQL.variables,
  });
};
