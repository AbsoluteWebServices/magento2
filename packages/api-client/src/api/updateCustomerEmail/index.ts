import { FetchResult } from '@apollo/client/core';
import updateCustomerEmail from './updateCustomerEmail';
import { Context } from '../../types/context';
import { UpdateCustomerEmailMutation, UpdateCustomerEmailMutationVariables } from '../../types/GraphQL';

export default async ({ client }: Context, input: UpdateCustomerEmailMutationVariables): Promise<FetchResult<UpdateCustomerEmailMutation>> => client
  .mutate<UpdateCustomerEmailMutation,
UpdateCustomerEmailMutationVariables>({
  mutation: updateCustomerEmail,
  variables: { ...input },
});
