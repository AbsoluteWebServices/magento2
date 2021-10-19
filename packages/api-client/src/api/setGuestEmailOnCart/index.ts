import { FetchResult } from '@apollo/client/core';
import setGuestEmailOnCart from './setGuestEmailOnCart';
import {
  SetGuestEmailOnCartInput, SetGuestEmailOnCartMutation, SetGuestEmailOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async ({ client }: Context, input: SetGuestEmailOnCartInput): Promise<FetchResult<SetGuestEmailOnCartMutation>> => client
  .mutate<SetGuestEmailOnCartMutation, SetGuestEmailOnCartMutationVariables>({
  mutation: setGuestEmailOnCart,
  variables: { input },
});
