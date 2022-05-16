import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { CompleteCheckoutSessionMutation, CompleteCheckoutSessionMutationVariables } from '../../types/GraphQL';
import completeCheckoutSession from './completeCheckoutSession';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: CompleteCheckoutSessionMutationVariables,
  customQuery: CustomQuery = { completeCheckoutSession: 'completeCheckoutSession' },
): Promise<FetchResult<CompleteCheckoutSessionMutation>> => {
  const { completeCheckoutSession: completeCheckoutSessionGQL } = context.extendQuery(
    customQuery,
    {
      completeCheckoutSession: {
        query: completeCheckoutSession,
        variables: { ...input },
      },
    },
  );

  return context.client.mutate<CompleteCheckoutSessionMutation, CompleteCheckoutSessionMutationVariables>({
    mutation: completeCheckoutSessionGQL.query,
    variables: completeCheckoutSessionGQL.variables,
  });
};
