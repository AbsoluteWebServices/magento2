import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { CheckoutSessionSignInQuery, CheckoutSessionSignInQueryVariables } from '../../types/GraphQL';
import checkoutSessionSignIn from './checkoutSessionSignIn';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: CheckoutSessionSignInQueryVariables,
  customQuery: CustomQuery = { checkoutSessionSignIn: 'checkoutSessionSignIn' },
): Promise<ApolloQueryResult<CheckoutSessionSignInQuery>> => {
  const { checkoutSessionSignIn: checkoutSessionSignInGQL } = context.extendQuery(
    customQuery,
    {
      checkoutSessionSignIn: {
        query: checkoutSessionSignIn,
        variables: { ...input },
      },
    },
  );

  return context.client.query<CheckoutSessionSignInQuery, CheckoutSessionSignInQueryVariables>({
    query: checkoutSessionSignInGQL.query,
    variables: checkoutSessionSignInGQL.variables,
  });
};
