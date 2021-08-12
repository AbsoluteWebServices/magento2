import { ApolloQueryResult } from '@apollo/client/core';
import { CountryInformationQueryFocus, CountryInformationQueryVariables } from '../../types/GraphQL';
import countryInformation from './countryInformation';
import { Context } from '../../types/context';

export default async ({ client }: Context, id: string): Promise<ApolloQueryResult<CountryInformationQueryFocus>> => client
  .query<CountryInformationQueryFocus, CountryInformationQueryVariables>({
  query: countryInformation,
  variables: {
    id,
  },
});
