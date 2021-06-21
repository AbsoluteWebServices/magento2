import { FetchResult } from '@apollo/client';
import setShippingMethodsOnCart from './setShippingMethodsOnCart';
import {
  SetShippingMethodsOnCartInput,
  SetShippingMethodsOnCartMutationFocus,
  SetShippingMethodsOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: SetShippingMethodsOnCartInput,
): Promise<FetchResult<SetShippingMethodsOnCartMutationFocus>> => client
  .mutate<SetShippingMethodsOnCartMutationFocus, SetShippingMethodsOnCartMutationVariables>({
  mutation: setShippingMethodsOnCart,
  variables: { input },
});
