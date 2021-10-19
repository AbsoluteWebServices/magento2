import { ApolloQueryResult } from '@apollo/client/core';
import { CountriesListQuery } from '../../types/GraphQL';
import countriesList from './countriesList';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<CountriesListQuery>> => client
  .query<CountriesListQuery>({
  query: countriesList,
});
