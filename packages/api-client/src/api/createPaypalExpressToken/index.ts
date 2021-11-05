import { FetchResult } from '@apollo/client';
import createPaypalExpressToken from './createPaypalExpressToken';
import {
  MutationCreatePaypalExpressTokenArgs,
  PaypalExpressTokenInput,
  PaypalExpressTokenMutation,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: PaypalExpressTokenInput,
): Promise<FetchResult<PaypalExpressTokenMutation>> => client
  .mutate<PaypalExpressTokenMutation, MutationCreatePaypalExpressTokenArgs>({
  mutation: createPaypalExpressToken,
  variables: { input },
});
