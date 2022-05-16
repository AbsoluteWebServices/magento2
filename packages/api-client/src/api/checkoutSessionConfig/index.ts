import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { CheckoutSessionConfigQuery, CheckoutSessionConfigQueryVariables } from '../../types/GraphQL';
import checkoutSessionConfig from './checkoutSessionConfig';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: CheckoutSessionConfigQueryVariables,
  customQuery: CustomQuery = { checkoutSessionConfig: 'checkoutSessionConfig' },
): Promise<ApolloQueryResult<CheckoutSessionConfigQuery>> => {
  const { checkoutSessionConfig: checkoutSessionConfigGQL } = context.extendQuery(
    customQuery,
    {
      checkoutSessionConfig: {
        query: checkoutSessionConfig,
        variables: { ...input },
      },
    },
  );

  return context.client.query<CheckoutSessionConfigQuery, CheckoutSessionConfigQueryVariables>({
    query: checkoutSessionConfigGQL.query,
    variables: checkoutSessionConfigGQL.variables,
  });
};
