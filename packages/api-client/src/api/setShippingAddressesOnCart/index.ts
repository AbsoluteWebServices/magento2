import { FetchResult } from '@apollo/client/core';
import setShippingAddressesOnCart from './setShippingAddressesOnCart';
import {
  SetShippingAddressesOnCartInput,
  SetShippingAddressesOnCartMutationFocus,
  SetShippingAddressesOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: SetShippingAddressesOnCartInput,
): Promise<FetchResult<SetShippingAddressesOnCartMutationFocus>> => client
  .mutate<
SetShippingAddressesOnCartMutationFocus,
SetShippingAddressesOnCartMutationVariables>({
  mutation: setShippingAddressesOnCart,
  variables: { input },
});
