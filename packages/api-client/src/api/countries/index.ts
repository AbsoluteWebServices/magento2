import { ApolloQueryResult } from '@apollo/client/core';
import { CountriesListQueryFocus } from '../../types/GraphQL';
import countriesList from './countriesList';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<CountriesListQueryFocus>> => client
  .query<CountriesListQueryFocus>({
  query: countriesList,
});
