import { ApolloQueryResult } from '@apollo/client/core';
import { Returns, FocusGuestRmaListInput } from '../../types/GraphQL';
import focusGuestRmaList from './focusGuestRmaList';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  returnParams: FocusGuestRmaListInput,
): Promise<ApolloQueryResult<Returns>> => client
  .query<Returns, FocusGuestRmaListInput>({
  query: focusGuestRmaList,
  variables: returnParams,
  fetchPolicy: 'no-cache',
});
