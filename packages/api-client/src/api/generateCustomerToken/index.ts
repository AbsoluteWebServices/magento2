import { FetchResult } from '@apollo/client/core';
import generateCustomerToken from './generateCustomerToken';
import {
  GenerateCustomerTokenMutation,
  GenerateCustomerTokenMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  email: string,
  password: string,
): Promise<FetchResult<GenerateCustomerTokenMutation>> => client
  .mutate<GenerateCustomerTokenMutation, GenerateCustomerTokenMutationVariables>({
  mutation: generateCustomerToken,
  variables: {
    email,
    password,
  },
});
