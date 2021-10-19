import { ApolloQueryResult } from '@apollo/client';
import { FocusInventoryQuery, FocusInventoryQueryVariables } from '../../types/GraphQL';
import focusInventory from './focusInventory';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  params: FocusInventoryQueryVariables,
): Promise<ApolloQueryResult<FocusInventoryQuery>> => client
  .query<FocusInventoryQuery, FocusInventoryQueryVariables>({
  query: focusInventory,
  variables: { ...params },
  fetchPolicy: 'cache-first',
});
