import { ApolloQueryResult } from '@apollo/client';
import { ProductReviewRatingsMetadataQueryFocus } from '../../types/GraphQL';
import productReviewRatingsMetadata from './productReviewRatingsMetadata';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<ProductReviewRatingsMetadataQueryFocus>> => client
  .query<ProductReviewRatingsMetadataQueryFocus>({
  query: productReviewRatingsMetadata,
  fetchPolicy: 'no-cache',
});
