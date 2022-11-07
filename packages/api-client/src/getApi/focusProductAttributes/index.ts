import { ApolloQueryResult } from '@apollo/client/core';
import { FocusProductAttributesQuery, FocusProductAttributesQueryVariables } from '../../types/GraphQL';
import focusProductAttributes from './focusProductAttributes';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  attribute_codes: string[],
): Promise<ApolloQueryResult<FocusProductAttributesQuery>> => client
  .query<FocusProductAttributesQuery, FocusProductAttributesQueryVariables>({
  query: focusProductAttributes,
  variables: { attribute_codes },
});
