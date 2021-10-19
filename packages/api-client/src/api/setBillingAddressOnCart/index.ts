import { FetchResult } from '@apollo/client/core';
import setBillingAddressOnCart from './setBillingAddressOnCart';
import {
  SetBillingAddressOnCartInput,
  SetBillingAddressOnCartMutation,
  SetBillingAddressOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: SetBillingAddressOnCartInput,
): Promise<FetchResult<SetBillingAddressOnCartMutation>> => client
  .mutate<
SetBillingAddressOnCartMutation,
SetBillingAddressOnCartMutationVariables>({
  mutation: setBillingAddressOnCart,
  variables: { input },
});
