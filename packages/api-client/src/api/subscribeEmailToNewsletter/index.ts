import { FetchResult } from '@apollo/client/core';
import subscribeEmailToNewsletter from './subscribeEmailToNewsletter';
import {
  SubscribeEmailToNewsletterMutation, SubscribeEmailToNewsletterMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  { email }: SubscribeEmailToNewsletterMutationVariables,
): Promise<FetchResult<SubscribeEmailToNewsletterMutation>> => client
  .mutate<
SubscribeEmailToNewsletterMutation,
SubscribeEmailToNewsletterMutationVariables>({
  mutation: subscribeEmailToNewsletter,
  variables: {
    email,
  },
});
