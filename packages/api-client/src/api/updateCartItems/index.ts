import { FetchResult } from '@apollo/client/core';
import updateCartItems from './updateCartItems';
import {
  UpdateCartItemsInput,
  UpdateCartItemsMutation,
  UpdateCartItemsMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: UpdateCartItemsInput,
): Promise<FetchResult<UpdateCartItemsMutation>> => client
  .mutate<
UpdateCartItemsMutation,
UpdateCartItemsMutationVariables>({
  mutation: updateCartItems,
  variables: { input },
  errorPolicy: 'all',
});
