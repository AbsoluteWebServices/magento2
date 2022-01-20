import { ApolloQueryResult } from '@apollo/client/core';
import { FocusGuestRmaOutput, FocusGuestRmaInput } from '../../types/GraphQL';
import focusGuestRma from './focusGuestRma';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  returnParams: FocusGuestRmaInput,
): Promise<ApolloQueryResult<FocusGuestRmaOutput>> => client
  .query<FocusGuestRmaOutput, FocusGuestRmaInput>({
  query: focusGuestRma,
  variables: returnParams,
  fetchPolicy: 'no-cache',
});
