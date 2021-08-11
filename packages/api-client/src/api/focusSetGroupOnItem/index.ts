import { FetchResult } from '@apollo/client';
import focusSetGroupOnItem from './focusSetGroupOnItem';
import {
  FocusSetGroupOnItemInput,
  FocusSetGroupOnItemMutation,
  FocusSetGroupOnItemMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
import { print } from 'graphql';

export default async (
  { client }: Context,
  input: FocusSetGroupOnItemInput,
): Promise<FetchResult<FocusSetGroupOnItemMutation>> => client
  .mutate<FocusSetGroupOnItemMutation, FocusSetGroupOnItemMutationVariables>({
  mutation: focusSetGroupOnItem,
  variables: { input },
});
