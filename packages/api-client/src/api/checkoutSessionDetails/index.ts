import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { CheckoutSessionDetailsQuery, CheckoutSessionDetailsQueryVariables } from '../../types/GraphQL';
import checkoutSessionDetails from './checkoutSessionDetails';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: CheckoutSessionDetailsQueryVariables,
  customQuery: CustomQuery = { checkoutSessionDetails: 'checkoutSessionDetails' },
): Promise<ApolloQueryResult<CheckoutSessionDetailsQuery>> => {
  const { checkoutSessionDetails: checkoutSessionDetailsGQL } = context.extendQuery(
    customQuery,
    {
      checkoutSessionDetails: {
        query: checkoutSessionDetails,
        variables: { ...input },
      },
    },
  );

  return context.client.query<CheckoutSessionDetailsQuery, CheckoutSessionDetailsQueryVariables>({
    query: checkoutSessionDetailsGQL.query,
    variables: checkoutSessionDetailsGQL.variables,
  });
};
