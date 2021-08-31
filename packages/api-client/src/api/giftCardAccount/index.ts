import { ApolloQueryResult } from '@apollo/client/core';
import { GiftCardAccountInputArgs, GiftCardAccountQueryFocus } from '../../types/GraphQL';
import giftCardAccount from './giftCardAccount';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  code: string,
): Promise<ApolloQueryResult<GiftCardAccountQueryFocus>> => client
  .query<GiftCardAccountQueryFocus, GiftCardAccountInputArgs>({
  query: giftCardAccount,
  fetchPolicy: 'no-cache',
  variables: { input: { gift_card_code: code } },
});
