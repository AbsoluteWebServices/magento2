import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { SetCustomerLinkMutation, SetCustomerLinkMutationVariables } from '../../types/GraphQL';
import setCustomerLink from './setCustomerLink';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: SetCustomerLinkMutationVariables,
  customQuery: CustomQuery = { setCustomerLink: 'setCustomerLink' },
): Promise<FetchResult<SetCustomerLinkMutation>> => {
  const { setCustomerLink: setCustomerLinkGQL } = context.extendQuery(
    customQuery,
    {
      setCustomerLink: {
        query: setCustomerLink,
        variables: { ...input },
      },
    },
  );

  return context.client.mutate<SetCustomerLinkMutation, SetCustomerLinkMutationVariables>({
    mutation: setCustomerLinkGQL.query,
    variables: setCustomerLinkGQL.variables,
  });
};
